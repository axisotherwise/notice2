import express from "express";
import {
  isAuthenticated,
  isNotAuthenticated,
} from "../middleware/middleware.js";
import {
  postWrite,
  postUpdate,
  postDelete,
  multerNone,
  multerImage,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/write", isAuthenticated, multerImage.fields([
  { name: "image1" },
  { name: "image2" },
  { name: "image3" },
]), postWrite);
router.put("/update/:id", isAuthenticated, postUpdate);
router.delete("/delete/:id", isAuthenticated, postDelete);


export default router;