import express, { text } from "express";
import {
  isAuthenticated,
  isNotAuthenticated,
} from "../middleware/middleware.js";
import {
  indexRender,
  joinRender,
  mainRender,
  detailRender,
  noticeRender,
  writeRender,
} from "../controllers/indexController.js";

const router = express.Router();

router.get("/", indexRender);
router.get("/join", isNotAuthenticated, joinRender);
router.get("/main",  mainRender);
router.get("/detail/:id", isAuthenticated, detailRender);
router.get("/notice", isAuthenticated, noticeRender);
router.get("/write", isAuthenticated, writeRender);

export default router;

