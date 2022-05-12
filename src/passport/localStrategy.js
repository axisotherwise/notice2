import passport from "passport";
import passportLocal from "passport-local";
import bcrypt from "bcrypt";
import { db } from "../database/index.js";

const LocalStrategy = passportLocal.Strategy;

export default () => {
  passport.use(new LocalStrategy({
    usernameField: "name",
    passwordField: "password",
  }, async (name, password, done) => {
    try {
      const sql = `SELECT * FROM users WHERE name = "${name}"`;
      const [ exist ] = await db.query(sql);
      const user = exist[0];
      if (user) {
        const compare = await bcrypt.compare(password, user.password);
        if (compare) {
          done(null, user);
        } else {
          done(null, false, { message: "비밀번호 불일치" });
        }
      } else {
        done(null, false, { message: "가입되지 않은 회원" });
      }
    } catch (err) {
      console.error(err);
      done(err);
    }
  }));
};
