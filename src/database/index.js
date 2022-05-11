import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "practice",
  password: "axisotherwise",
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