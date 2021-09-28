const ws = new WebSocket("ws://localhost:8080/");
ws.addEventListener("open", () => {
    console.log("Client Connected!");
});

/* import ws from "websocket";
const webSocketClient = ws.client;

const client = new webSocketClient();

client.on("connect", () => { console.log("Client Connected!") });

client.connect("ws://localhost:8080/", "echo-protocol");

*/