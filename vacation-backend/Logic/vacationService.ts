import { OkPacket } from "mysql";
import dal_mysql from "../DAL/dal_mysql";
import { VacationAlreadyExists, VacationNotFound } from "../Models/customErrors";

// Function to build SQL conditions based on filters
const buildConditions = (
  user_id: number,
  showFollowing: boolean,
  showUpcoming: boolean,
  showActive: boolean
): string[] => {
  const conditions: string[] = [];
  if (showFollowing) {
    conditions.push(
      `(SELECT COUNT(*) > 0 FROM Followers WHERE Followers.vacation_id = Vacations.vacation_id AND Followers.user_id = ${user_id})`
    );
  }
  if (showUpcoming) {
    conditions.push(`start_date > NOW()`);
  }
  if (showActive) {
    conditions.push(`start_date <= NOW() AND end_date >= NOW()`);
  }
  return conditions;
};

// Function to get all vacations with optional filters
const getAllVacations = async (
  user_id: number,
  page: number = 1,
  limit: number = 10,
  showFollowing: boolean = false,
  showUpcoming: boolean = false,
  showActive: boolean = false
) => {
  const offset = (page - 1) * limit;
  let sql = `
    SELECT Vacations.*, 
           (SELECT COUNT(*) FROM Followers WHERE Followers.vacation_id = Vacations.vacation_id) AS followers,
           (SELECT COUNT(*) > 0 FROM Followers WHERE Followers.vacation_id = Vacations.vacation_id AND Followers.user_id = ?) AS isFollowing
    FROM Vacations
  `;

  const conditions = buildConditions(user_id, showFollowing, showUpcoming, showActive);

  if (conditions.length > 0) {
    sql += ` WHERE ${conditions.join(" AND ")}`;
  }

  sql += ` ORDER BY start_date DESC LIMIT ? OFFSET ?`;

  const vacations = await dal_mysql.execute(sql, [user_id, limit, offset]);

  const countSql = `SELECT COUNT(*) AS total FROM Vacations`;
  const result = await dal_mysql.execute(countSql);
  const totalVacations = result[0].total;
  const totalPages = Math.ceil(totalVacations / limit);

  return { vacations, totalPages };
};

// Function to get all vacations without pagination
const getAllVacationsNoPagination = async () => {
  const sql = `
    SELECT Vacations.*, 
           (SELECT COUNT(*) FROM Followers WHERE Followers.vacation_id = Vacations.vacation_id) AS followers
    FROM Vacations
    ORDER BY start_date DESC
  `;
  const vacations = await dal_mysql.execute(sql);
  return vacations;
};

// Function to get a vacation by its ID
const getVacationById = async (vacation_id: number) => {
  const sql = `SELECT * FROM Vacations WHERE vacation_id = ${vacation_id}`;
  const result = await dal_mysql.execute(sql);
  if (result.length === 0) {
    throw new VacationNotFound();
  }
  return result[0];
};

// Function to add a new vacation
const addVacation = async (vacation: any) => {
  const { destination, summary, start_date, end_date, price, image_name } = vacation;

  // Check if a vacation with the same destination and dates already exists
  const sqlCheck = `SELECT * FROM Vacations WHERE destination = ? AND start_date = ? AND end_date = ?`;
  const existingVacations = await dal_mysql.execute(sqlCheck, [destination, start_date, end_date]);

  if (existingVacations.length > 0) {
    throw new VacationAlreadyExists();
  }

  const sqlInsert = `INSERT INTO Vacations (destination, summary, start_date, end_date, price, image_name) VALUES (?, ?, ?, ?, ?, ?)`;
  const result: OkPacket = await dal_mysql.execute(sqlInsert, [
    destination,
    summary,
    start_date,
    end_date,
    price,
    image_name,
  ]);
  return { id: result.insertId };
};

// Function to update an existing vacation
const updateVacation = async (vacation_id: number, vacation: any) => {
  const { destination, summary, start_date, end_date, price, image_name } = vacation;
  let sqlUpdate = `UPDATE Vacations SET destination = ?, summary = ?, start_date = ?, end_date = ?, price = ?`;
  let params = [destination, summary, start_date, end_date, price];

  if (image_name) {
    sqlUpdate += `, image_name = ?`;
    params.push(image_name);
  }

  sqlUpdate += ` WHERE vacation_id = ?`;
  params.push(vacation_id);

  const result = await dal_mysql.execute(sqlUpdate, params);

  if (result.affectedRows === 0) {
    throw new VacationNotFound();
  }
};

// Function to delete a vacation
const deleteVacation = async (vacation_id: number) => {
  const sqlDelete = `DELETE FROM Vacations WHERE vacation_id = ${vacation_id}`;
  const result = await dal_mysql.execute(sqlDelete);

  if (result.affectedRows === 0) {
    throw new VacationNotFound();
  }
};

// Function to follow a vacation
const followVacation = async (user_id: number, vacation_id: number) => {
  // Check if the user already follows the vacation
  const sqlCheck = `SELECT * FROM Followers WHERE user_id = ${user_id} AND vacation_id = ${vacation_id}`;
  const existingFollowers = await dal_mysql.execute(sqlCheck);

  if (existingFollowers.length > 0) {
    throw new Error("User already follows this vacation");
  }

  const sqlInsert = `INSERT INTO Followers (user_id, vacation_id) VALUES (${user_id}, ${vacation_id})`;
  await dal_mysql.execute(sqlInsert);
};

// Function to unfollow a vacation
const unfollowVacation = async (user_id: number, vacation_id: number) => {
  // Check if the user already unfollowed the vacation
  const sqlCheck = `SELECT * FROM Followers WHERE user_id = ${user_id} AND vacation_id = ${vacation_id}`;
  const existingFollowers = await dal_mysql.execute(sqlCheck);

  if (existingFollowers.length === 0) {
    throw new Error("User does not follow this vacation");
  }

  const sqlDelete = `DELETE FROM Followers WHERE user_id = ${user_id} AND vacation_id = ${vacation_id}`;
  await dal_mysql.execute(sqlDelete);
};

export {
  getAllVacations,
  getAllVacationsNoPagination,
  addVacation,
  getVacationById,
  updateVacation,
  deleteVacation,
  followVacation,
  unfollowVacation,
};
