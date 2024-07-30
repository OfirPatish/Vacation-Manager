import mysql from "mysql2";
import config from "../Utils/databaseConfig";

const connection = mysql.createPool({
  host: config.mySQLHost,
  user: config.mySQLUser,
  password: config.mySQLPassword,
  database: config.mySQLDatabase,
});

console.log("Connected to MySQL database");

const execute = (sql: string, params?: any[]): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    connection.query(sql, params, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};

export default { execute };
