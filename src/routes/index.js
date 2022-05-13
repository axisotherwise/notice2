import express, { text } from "express";
import {
  indexRender,
  joinRender,
  mainRender,
  noticeRender,
  writeRender,
  test,
} from "../controllers/indexController.js";

const router = express.Router();

router.get("/", indexRender);
router.get("/join", joinRender);
router.get("/main", mainRender);
router.get("/notice", noticeRender);
router.get("/write", writeRender);
router.post("/test", test);

export default router;

