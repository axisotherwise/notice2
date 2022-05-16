import passport from "passport";
import bcrypt from "bcrypt";
import { 
  db,
  userQuery,
  authQuery,              
} from "../database/index.js";

const authJoin = async (req, res, next) => {
  const { name, password, email, gender } = req.body;
  try {
    await db.query("START TRANSACTION");
    const searchName = await userQuery.searchName(name);
    if (searchName.length > 0) return res.redirect("/?error=이미 가입된 회원입니다.");
    const hash = await bcrypt.hash(password, 12);
    const joinUser = await authQuery.joinUser(name, hash);
    const userId = joinUser.insertId;
    const user = await authQuery.infoUser(userId, email, gender);
    await db.query("COMMIT");
    res.json(user);
  } catch (err) {
    await db.query("ROLLBACK");
    console.error(err);
    next(err);
  }
}

const authLogin = async (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      next(authError);
    }
    if (!user) return res.redirect(`/?error=${ info.message }`);
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