import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();
const pool = mysql.createPool({
  host: "localhost",
  user: process.env.DB_ID,
  database: process.env.DB,
  password: process.env.DB_PW,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection(async (err, conn) => {
  try {
    conn.release();
  }
  catch (err) {}
    err ? console.error(err) : console.log("db connect");
});

const db = pool.promise();

export {
  db,
}