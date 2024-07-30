import { User } from "../Models/userAccount";
import { generateToken } from "../Utils/JWTService";
import { UserAlreadyExists, UserNotFound, InvalidPasswordError } from "../Models/customErrors";
import { OkPacket } from "mysql";
import dal_mysql from "../DAL/dal_mysql";

const authenticateUser = async (credentials: User) => {
  try {
    // Query the database for the user by email
    const sqlCheck = `SELECT * FROM Users WHERE LOWER(email) = '${credentials.email.toLowerCase()}'`;
    const existingUsers = await dal_mysql.execute(sqlCheck);

    if (existingUsers.length === 0) {
      throw new UserNotFound();
    }

    const existingUser = existingUsers[0];

    // Check if the password matches
    if (existingUser.password === credentials.password) {
      const userInfo = {
        user_id: existingUser.user_id,
        first_name: existingUser.first_name,
        last_name: existingUser.last_name,
        email: existingUser.email,
        role: existingUser.role,
        jwt: generateToken(existingUser),
      };
      return userInfo;
    } else {
      throw new InvalidPasswordError();
    }
  } catch (error) {
    console.log("Authentication failed: User not found or password mismatch.");
    throw error;
  }
};

const registerUser = async (user: User) => {
  try {
    // Normalize the email to lowercase
    const normalizedEmail = user.email.toLowerCase();

    // Set default role to "User" if not provided
    const role = user.role || "User";

    // Check if the user already exists
    const sqlCheck = `SELECT * FROM Users WHERE LOWER(email) = '${normalizedEmail}'`;
    const existingUsers = await dal_mysql.execute(sqlCheck);

    if (existingUsers.length > 0) {
      throw new UserAlreadyExists();
    }

    // Insert the new user
    const sqlInsert = `INSERT INTO Users (user_id, first_name, last_name, email, password, role) VALUES (0, '${user.first_name}', '${user.last_name}', '${normalizedEmail}', '${user.password}', '${role}')`;
    const result: OkPacket = await dal_mysql.execute(sqlInsert);
    console.log(`Created user with id: ${result.insertId}`);
    user.user_id = +result.insertId;
    return "User was created";
  } catch (err) {
    if (err instanceof UserAlreadyExists) {
      return err.errorMessage;
    }
    throw err;
  }
};

export { registerUser, authenticateUser };
