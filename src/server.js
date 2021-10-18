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
        origin: ["https://admin.socket.io"],
        credentials: true
    }
});

instrument(io, {
    auth: false
});

io.on("connection", (socket) => {
    socket.on("roomName", (roomName) => {
        // socket에 roomName 추가 후, 모든 방의 Client에게 메시지 발송(=방 이름 보이기)
        socket.join(roomName);
        socket.broadcast.emit("roomName", roomName);
    });

    socket.on("messageFromClient", (message) => {
        // socket에서 roomName을 꺼내와서, 같은 방에 있는 Client에게만 메시지 발송       
        const roomsArray = [ ...socket.rooms ]; // Set(socket.rooms)에선 값 꺼내는 법이 없는 것 같기에, 배열로 변환하여 값 꺼냄
        console.log(roomsArray);
        const roomName = roomsArray[1];

        socket.to(roomName).emit("messageFromClient", message);
    });

    socket.on("judge", (done) => {
        console.log("Reached server side");
        done();
    });

    // Client로부터 이벤트를 받아, 채팅방 떠나게 하기
    socket.on("leaveRoom", () => {
        const roomsArray = [ ...socket.rooms ];
        console.log(roomsArray);
        const roomName = roomsArray[1];

        socket.leave(roomName);
        console.log(roomsArray);
    });

});

server.listen(port, () => { console.log("Express in HTTP connected!") });