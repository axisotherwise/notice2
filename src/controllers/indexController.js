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

const detailRender = async (req, res) => {
  const query = `
    SELECT *
    FROM users U
    JOIN posts P
      ON U.user_id = P.fk_user_id
    WHERE P.post_id = ${req.params.id}
  `;
  const [ result ] = await db.query(query);
  res.render("detail", {
    post: result,
    user: req.user,
  });
  console.log(req.user);
}

const noticeRender = async (req, res) => {
  const query = `
    SELECT
      U.name, P.post_id, P.title, P.created
    FROM 
      users U 
    JOIN posts P
      ON U.user_id = P.fk_user_id
  `;
  const [ result ] = await db.query(query);
  res.render("notice", {
    posts: result,
  });
}

const writeRender = async (req, res) => {
  res.render("write");
}

const test = async (req, res) => {
  const query = `
    SELECT *
    FROM users U
    JOIN posts P
      ON U.user_id = P.fk_user_id
    WHERE P.post_id = 4
  `;
  const [ result ] = await db.query(query);
  console.log(result);
  res.end();
}

export {
  indexRender,
  joinRender,
  mainRender,
  detailRender,
  noticeRender,
  writeRender,
  test,
}