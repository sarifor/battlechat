import { createServer } from "http";
import { Server } from "socket.io";
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
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("io connected!");    
    socket.on("messageFromClient", (done) => {
        done();
    });
  });

server.listen(port, () => { console.log("Express in HTTP connected!") });