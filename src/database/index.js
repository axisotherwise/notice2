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

const userQuery = {
  usersPosts: async () => {
    const [ sql ] = await db.query(`
      SELECT * FROM users U
      JOIN infos I
        ON U.user_id = I.fk_user_id
      JOIN posts P
        ON U.user_id = P.fk_user_id
    `);
    return sql;
  },
  searchId: async (id) => {
    const [ sql ] = await db.query(`
      SELECT * FROM users U
      JOIN infos I
        ON U.user_id = I.fk_user_id
      WHERE U.user_id = ${id}
    `);
    return sql;
  },
  searchName: async (name) => {
    const [ sql ] = await db.query(`
      SELECT * FROM users
      WHERE name = "${name}"
    `);
    return sql;
  },
}

const authQuery = {
  joinUser: async (name, password) => {
    const [ sql ] = await db.query(`
      INSERT INTO users
        (name, password)
        VALUES
        ("${name}", "${password}")
    `);
    return sql;
  },
  infoUser: async (fk, email, gender) => {
    const [ sql ] = await db.query(`
      INSERT INTO infos
        (fk_user_id, email, gender)
        VALUES
        (${fk}, "${email}", "${gender}")
    `);
  },
}

const postQuery = {
  searchId: async (id) => {
    const [ sql ] = await db.query(`
      SELECT * FROM users U
      JOIN posts P
        ON U.user_id = P.fk_user_id
      WHERE P.post_id = ${id}
    `);
    return sql;
  },
  writePost: async (fk, title,  content, image1, image2, image3) => {
    const[ sql ] = await db.query(`
      INSERT INTO posts 
        (fk_user_id, title, content, image1, image2, image3)   
        VALUES (${fk}, "${title}", "${content}", "${image1}", "${image2}", "${image3}")
    `);
    return sql;
  },
  deletePost: async (id) => {
    const [ sql ] = await db.query(`
      DELETE FROM posts
      WHERE post_id = ${id}
    `);
    return sql;
  },
  updatePost: async (id, title, content) => {
    const [ sql ] = await db.query(`
      UPDATE posts
      SET
        title = "${title}",
        content = "${content}"
      WHERE
        post_id = ${id}
    `);
    return sql;
  },
}

export {
  db,
  userQuery,
  authQuery,
  postQuery,
}