import { db } from "../database/index.js"
import bcrypt from "bcrypt";

const indexRender = async (req, res) => {
  res.render("index");
}

const joinRender = async (req, res) => {
  res.render("join");
}

const mainRender = async (req, res) => {
  res.render("main");
  console.log(req.user);
}

const test = async (req, res) => {
  const sql = `
    SELECT * FROM users U
    JOIN info I
      ON U.user_id = I.fk_user_id
    WHERE U.user_id = 12
  `;
  const [ result ] = await db.query(sql);
  res.json(result);
}

export {
  indexRender,
  joinRender,
  mainRender,
  test,
}