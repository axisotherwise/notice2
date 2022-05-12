import express from "express";
import morgan from "morgan";
import nunjucks from "nunjucks";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";

import indexRouter from "./routes/index.js";
import authRouter from "./routes/auth.js";

dotenv.config();
const app = express();
const __dirname = path.resolve();
app.set("port", process.env.NODE_ENV || 1000);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));

app.use("/", indexRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  const error = new Error(`$${req.method} ${req.url} 존재하지 않습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

const server = app.listen(app.get("port"), () => {
  console.log("1000");
});