import passport from "passport";
import local from "./localStrategy.js";

import {
  db, 
  userQuery,
} from "../database/index.js";

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user.user_id);
  });
  passport.deserializeUser((id, done) => {
    const user = userQuery.searchId(id);
    user
      .then(res => done(null, res))
      .catch(err => done(err));
  });
  local();
}