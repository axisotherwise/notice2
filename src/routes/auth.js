import express from "express";
import {
  isAuthenticated,
  isNotAuthenticated,
} from "../middleware/middleware.js";
import {
  authJoin,
  authLogin,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/join", isNotAuthenticated, authJoin);
router.post("/login", isNotAuthenticated, authLogin);

export default router;