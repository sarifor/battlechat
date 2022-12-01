import express from "express";
import { test } from "./controller";
import { createRoom } from "./controller";
import { chat } from "./controller";

const router = express.Router();

router.get("/", test);
router.get("/create-room", createRoom);
router.get("/chat", chat);

export default router;
