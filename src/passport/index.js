import passport from "passport";
import local from "./localStrategy.js";

import { db } from "../database/index.js";

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    
  });
}