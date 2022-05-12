import express, { text } from "express";
import {
  indexRender,
  joinRender,
  mainRender,
  test,
} from "../controllers/indexController.js";

const router = express.Router();

router.get("/", indexRender);
router.get("/join", joinRender);
router.get("/main", mainRender);
router.post("/test", test);

export default router;

