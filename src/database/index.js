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

const query = {
  getUsers: async (name) => {
    const [ result ] = await db.query(`
      SELECT * FROM users
      WHERE name = "${name}"
    `);
    return result;
  },
  searchUser: async (name) => {
    const sql = await db.query(`
      SELECT * FROM users
      WHERE name = "${name}"
    `);
    return sql;
  },
  insertUser: async (a, b) => {
    const testing = `
      INSERT INTO users 
        (name, password) 
        VALUES ("${a}", "${b}") 
    `
    const [ result ] = await db.query(testing);
    return result;
  },
  insertInfo: async (foreignKey, email, gender) => {
    const sql = `
      INSERT INTO infos
        (fk_user_id, email, gender)
        VALUES (${foreignKey}, "${email}}", "${gender}")
    `
    const [ result ] = await db.query(sql);
    return result;
  },
};

export {
  db,
  query,

}