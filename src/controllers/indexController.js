import bcrypt from "bcrypt";
import { 
  userQuery,
  postQuery,
} from "../database/index.js"

const indexRender = async (req, res) => {
  res.render("index");
}

const joinRender = async (req, res) => {
  res.render("join");
}

const mainRender = async (req, res, next) => {
  res.render("main", {
    user: req.user,
  });
}

const detailRender = async (req, res, next) => {
  res.render("detail", {
    user: req.user,
    post: await postQuery.searchId(req.params.id),
  });
}

const noticeRender = async (req, res) => {
  res.render("notice", {
    posts: await userQuery.usersPosts(),
  });
}

const writeRender = async (req, res) => {
  res.render("write");
}

export {
  indexRender,
  joinRender,
  mainRender,
  detailRender,
  noticeRender,
  writeRender,
}