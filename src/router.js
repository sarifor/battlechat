import express from "express";
import { main } from "./controller";
import { createRoom } from "./controller";
import { chat } from "./controller";

const router = express.Router();

router.get("/", main);
router.get("/create-room", createRoom);
router.get("/chat", chat);

export default router;
