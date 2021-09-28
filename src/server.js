import ws from "websocket";
import http from "http";
const webSocketServer = ws.server;

const server = http.createServer((req, res) => {
    console.log("HTTP Connected");
    res.writeHead(200);
    // return res.send("hi");
    res.end();
});

server.listen(8080, () => {
    console.log("Server is listening on port 8080");
});

const wsServer = new webSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

wsServer.on("request", (req) => {
    const connection = req.accept("echo-protocol", req.origin);
    connection.on("connection", () => console.log("WS connected!"));
})