const ws = new WebSocket("ws://localhost:8080/");

ws.addEventListener("open", () => {
    console.log("Client Connected!");
    ws.send("Hi, Server!");
});

ws.addEventListener("message", (event) => {
    let message = event.data;
    console.log("I've got server's message!");
    let chat = document.getElementById("chat");
    chat.innerText = message;
});