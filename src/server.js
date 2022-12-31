import { createServer } from "http";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";

import express from "express";
import router from "./router";
import path from "path";

const app = express();
const port = 8080;
let fingers = [];

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
    const roomNames = [];
    const sids = io.of("/").adapter.sids; // io.sockets.adapter.sids is also available.
    const rooms = io.of("/").adapter.rooms;

    console.log("---- sids ----");
    console.log(sids);
    console.log("---- rooms ---- ");
    console.log(rooms);

    rooms.forEach((_, key) => {
        if (sids.get(key) === undefined) {
            roomNames.push(key);
        };
    });

    console.log("Room list: " + roomNames);

    io.emit("roomNames", roomNames);    

    socket.on("roomName", (roomName) => {
        socket.join(roomName);
        console.log("Client has joined " + roomName)
    });

    /* clients에서 roomName과 message를 받았을 때, 
    1) 기본적으로 같은 방에 전송자를 제외하고 브로드캐스팅하되,
    2) message가 rock/scissor/paper 셋 중 하나인 경우,
    socket id와 message를 key&value 배열에 한데 모으고, 
    배열 요소 2개가 모였을 때 두 client 간의 승패 비교하여, 진 쪽을 강퇴시킴 */
    socket.on("messageFromClient", (roomName, message, clientID) => {
        socket.to(roomName).emit("messageFromClient", message, clientID); // broadcast to all clients while the socket itself being excluded

        console.log("---- sids ----");
        console.log(sids);
        console.log("---- rooms ---- ");
        console.log(rooms);

        /* if (message === "rock" || message === "scissor" || message === "paper") {
            console.log("You give one of three");
            console.log(fingers);
            fingers.push({
                client: socket.id,
                finger: message
            });
            console.log(fingers);
        };

        if (fingers.length === 2) {
            // test: 첫 client가 scissor, 두 번째 client가 paper이고, 패배한 두 번째 client를 방에서 내보내기
            if (fingers[0].finger === "scissor" && fingers[1].finger === "paper") {
                console.log(fingers[0].client, "is win!!");
                
                const clients = io.sockets.adapter.rooms.get(roomName);
                const defeatedSocket = io.sockets.sockets.get(fingers[1].client);

                console.log(clients);
                defeatedSocket.leave(roomName);                
                console.log(clients);
            };
        }; */

    });

    socket.on("leaveRoom", (roomName) => {
        socket.leave(roomName);
    });

});

server.listen(port, () => { console.log(`http://localhost:${port}`) });