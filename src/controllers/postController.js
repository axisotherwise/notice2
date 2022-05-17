import multer from "multer";
import path from "path";
import {
  userQuery,
  postQuery,
} from "../database/index.js";

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
  try {
    await postQuery.writePost(
      req.user[0].user_id,
      req.body.title,
      req.body.content,
      req.files["image1"]?.[0].filename ?? null,
      req.files["image2"]?.[0].filename ?? null,
      req.files["image3"]?.[0].filename ?? null
    );
    res.redirect("/notice");
  } catch (err) {
    console.error(err);
    next(err);
  }
}

const postUpdate = async (req, res, next) => {
  try {
    await postQuery.updatePost(
      req.params.id,
      req.body.title,
      req.body.content
    );
    res.redirect("/notice");
  } catch (err) {
    console.error(err);
    next(err);
  }
}

const postDelete = async (req, res, next) => {
  try {
    await postQuery.deletePost(req.params.id);
    res.redirect("/notice");
  } catch (err) {
    console.error(err);
    next(err);
  }
}

export {
  postWrite,
  postUpdate,
  postDelete,
  multerNone,
  multerImage,
}