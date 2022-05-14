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
  try {
    // const result = req.files.image1?.[0].filename ?? "없습니다.";
    // console.log(result);
    const userId = req.user[0].user_id;
    const query = `
      INSERT INTO posts
        (fk_user_id, title, content, image1, image2, image3)
        VALUES (
          ${userId}, 
          "${req.body.title}", 
          "${req.body.content}", 
          "${req.files.image1?.[0].filename ?? null}",
          "${req.files.image2?.[0].filename ?? null}",
          "${req.files.image3?.[0].filename ?? null}"
          )
    `;
    const [ result ] = await db.query(query);
    console.log(result);
    return res.redirect("/notice");
  } catch (err) {
    console.error(err);
    next(err);
  }
}

const postUpdate = async (req, res) => {
  const query = `
    UPDATE posts
    SET 
      title = "${req.body.title}",
      content = "${req.body.content}"
    WHERE
      post_id = ${req.params.id}
  `;
  const [ result ] = await db.query(query);
  return res.send("success");
}

const postDelete = async (req, res) => {
  const query = `
    DELETE FROM posts
    WHERE post_id = ${req.params.id}
  `;
  const [ result ] = await db.query(query);
  return res.redirect("/notice");
}

export {
  postWrite,
  postUpdate,
  postDelete,
  multerNone,
  multerImage,
}