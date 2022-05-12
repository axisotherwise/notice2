import passport from "passport";
import local from "./localStrategy.js";

import { db } from "../database/index.js";

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user.user_id);
  });
  passport.deserializeUser((id, done) => {
    const user = `SELECT * FROM users WHERE user_id = ${id}`;
    db.query(user)
      .then(res => done(null, res[0]))
      .catch(err => done(err));
  });
  local();
}