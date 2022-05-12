import { db } from "../database/index.js";
import passport from "passport";
import bcrypt from "bcrypt";

const authJoin = async (req, res, next) => {
  const { name, password, age, email, phone, address, gender } = req.body;
  const married = req.body.married ? 1 : 0;
  try {
    const existQuery = `SELECT name FROM users WHERE name = "${name}"`;
    const [ exist ] = await db.query(existQuery);
    if (exist.length > 0) return res.status(409).redirect("/?error=이미 가입된 회원입니다.")
    await db.query("START TRANSACTION");
    const hash = await bcrypt.hash(password, 12);
    const joinQuery = `
      INSERT INTO users
        (name, password)
        VALUES ("${name}", "${hash}")
    `;
    const [ join ] = await db.query(joinQuery);
    const joinResult = join.insertId;
    const detailQuery = `
      INSERT INTO info
        (fk_user_id, email, age, phone, address, married, gender)
        VALUES (${joinResult}, "${email}", ${age}, "${phone}", "${address}", ${married}, "${gender}")
    `;
    const [ detail ] = await db.query(detailQuery);
    console.log(detail);
    await db.query("COMMIT");
    return res.status(201).redirect("/");
  } catch (err) {
    console.error(err);
    await db.query("ROLLBACK");
    next(err);
  }
}

const authLogin = async (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) return next(authError);
    if (!user) return res.redirect(`/?error=${info.message}`);
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        next(loginError);
      }
      return res.redirect("/main");
    });
  })(req, res, next);
}

export {
  authJoin,
  authLogin,
}