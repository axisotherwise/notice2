import passport from "passport";
import passportLocal from "passport-local";
import bcrypt from "bcrypt";
import { userQuery } from "../database/index.js";

const LocalStrategy = passportLocal.Strategy;

export default () => {
  passport.use(new LocalStrategy({
    usernameField: "name",
    passwordField: "password",
  }, async (name, password, done) => {
    try {
      const searchName = await userQuery.searchName(name);
      if (searchName) {
        const compare = await bcrypt.compare(password, searchName[0].password);
        if (compare) {
          done(null, searchName[0]);
        } else {
          done(null, false, { message: "비밀번호 불일치" });
        }
      } else {
        done(null, false, { message: "가입된 회원이 아닙니다." });
      }
    } catch (err) {
      console.error(err);
      done(err);
    }
  }));
};
