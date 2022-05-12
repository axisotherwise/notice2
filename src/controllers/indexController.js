import { db } from "../database/index.js"

const indexRender = async (req, res) => {
  res.render("index");
}

const joinRender = async (req, res) => {
  res.render("join");
}

const test = async (req, res) => {
  db.query("SELECT * FROM users")
    .then(res => console.log(res))
    .catch(err => console.error(err));
  res.end();
}

export {
  indexRender,
  joinRender,
  test,
}