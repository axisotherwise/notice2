import bcrypt from "bcrypt";
import {
  db,
  userQuery,
} from "../database/index.js";

const test = async (req, res) => {
  console.log(req.user);
}

export {
  test,
}