const ws = new WebSocket("ws://localhost:8080/");
let inputForm = document.querySelector("form")
let inputTxt = document.getElementById("inputTxt");
let fromServer = document.getElementById("fromServer");

ws.addEventListener("open", () => {
    console.log("Client Connected!");
});

ws.addEventListener("message", (event) => {
    let me = event.data;
    console.log("I've got server's message!");
    fromServer.innerText = me;
});

inputForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = inputTxt.value;
    ws.send(message);
    console.log(message);
});