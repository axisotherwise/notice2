import express from "express";
import {
  authJoin,
  authLogin,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/join", authJoin);
router.post("/login", authLogin);

export default router;