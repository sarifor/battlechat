import { WebSocketServer } from "ws";
import { createServer } from "http";
import express from "express";
import router from "./router";

const app = express();
const port = 8080;

app.use("/", router);
// app.listen(port, () => { console.log("Express Connected!") });

const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", () => { console.log("webSocket server connected!") });
server.listen(port, () => { console.log("Express in HTTP connected!") });