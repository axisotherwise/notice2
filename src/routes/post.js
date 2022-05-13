import express from "express";
import {
  postWrite,
  multerNone,
  multerImage,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/write", multerImage.single("image"), postWrite);

export default router;