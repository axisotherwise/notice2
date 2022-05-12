import express, { text } from "express";
import {
  indexRender,
  joinRender,
} from "../controllers/indexController.js";

const router = express.Router();

router.get("/", indexRender);
router.get("/join", joinRender);
router.get("/test", text);

export default router;

