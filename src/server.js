import { WebSocketServer } from "ws";
import { createServer } from "http";
import express from "express";
import router from "./router";
import path from "path";

const app = express();
const port = 8080;

app.use("/", router);
app.set("view engine", "pug");
app.set("views", path.join(process.cwd(), "/src/views"));
app.use("/client", express.static(__dirname + "/client"));

const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (socket) => { 
    console.log("webSocket server connected!"); 
    socket.on("message", (socket) => {
        console.log(socket);
        // socket.send("Hi, Nice to meet you!!!");
    })

    // wss.on("message", () => { console.log("Hi Client!") });
});

server.listen(port, () => { console.log("Express in HTTP connected!") });