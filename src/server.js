import { createServer } from "http";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";

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
const io = new Server(server, {
    cors: {
        origin: ["http://admin.socket.io"],
        credentials: true
    }
});

instrument(io, {
    auth: false
});

io.on("connection", (socket) => {
    socket.on("messageFromClient", (ms) => {
        socket.broadcast.emit("messageFromServer", ms);
    });
  });

server.listen(port, () => { console.log("Express in HTTP connected!") });