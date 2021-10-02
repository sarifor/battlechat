const ws = new WebSocket("ws://localhost:8080/");
let inputForm = document.querySelector("form")
let inputTxt = document.getElementById("inputTxt");
let fromServer = document.getElementById("fromServer");

ws.addEventListener("open", () => {
    console.log("Client Connected!");
    // ws.send("Hi, Server!");
});

ws.addEventListener("message", (event) => {
    let message = event.data;
    console.log("I've got server's message!");
    fromServer.innerText = message;
});

inputForm.addEventListener("submit", () => {
    const message = inputTxt.value;
    ws.send(message);
    console.log(message);
});