import bcrypt from "bcrypt";
import { db } from "../database/index.js"

const indexRender = async (req, res) => {
  res.render("index");
}

const joinRender = async (req, res) => {
  res.render("join");
}

const mainRender = async (req, res) => {
  const query = `
    SELECT * FROM users U
    JOIN infos I
      ON U.user_id = I.fk_user_id
    WHERE U.user_id = ${req.user[0].user_id}
  `
  const [ result ] = await db.query(query);
  res.render("main", {
    user: result,
  });
}

const noticeRender = async (req, res) => {
  res.render("notice");
}

const writeRender = async (req, res) => {
  res.render("write");
}

const test = async (req, res) => {
  const query = `
    SELECT * FROM users U
    JOIN info I
      ON U.user_id = I.fk_user_id
    WHERE U.user_id = 12
  `;
  const [ result ] = await db.query(query);
  res.json(result);
}

export {
  indexRender,
  joinRender,
  mainRender,
  noticeRender,
  writeRender,
  test,
}