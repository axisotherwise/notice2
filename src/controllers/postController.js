import multer from "multer";
import path from "path";
import { db } from "../database/index.js";

const multerNone = multer();
const multerImage = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "images/")
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const postWrite = async (req, res, next) => {
  console.log(req.file);
}

export {
  postWrite,
  multerNone,
  multerImage,
}