import express from "express";
import { test } from "./controller";
import { createRoom } from "./controller";

const router = express.Router();

router.get("/", test);
router.get("/create-room", createRoom)

export default router;
