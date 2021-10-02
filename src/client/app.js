const ws = new WebSocket("ws://localhost:8080/");
const submitBtn = document.getElementById("submitBtn");
let inputTxt = document.getElementById("inputTxt");

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

submitBtn.addEventListener("submit", () => {
    let inputTxt = document.getElementById("inputTxt");
    const message = inputTxt.value;
    ws.send(message);
    console.log(message);
});