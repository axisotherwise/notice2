import bcrypt from "bcrypt";
import { userQuery } from "../database/index.js"

const indexRender = async (req, res) => {
  res.render("index");
}

const joinRender = async (req, res) => {
  res.render("join");
}

const mainRender = async (req, res, next) => {
  res.render("main");
}

const detailRender = async (req, res, next) => {

}

const noticeRender = async (req, res) => {

}

const writeRender = async (req, res) => {

}

export {
  indexRender,
  joinRender,
  mainRender,
  detailRender,
  noticeRender,
  writeRender,
}