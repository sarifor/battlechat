console.log("Client Opened");

const ws = new WebSocket("ws://localhost:8080/");
ws.addEventListener("open", () => {
    console.log("Client Connected!");
});