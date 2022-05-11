import express from "express";
import {
  indexRender,
} from "../controllers/indexController.js";

const router = express.Router();

router.get("/", indexRender);

export default router;

