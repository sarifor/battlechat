const ws = new WebSocket("ws://localhost:8080/");
let inputForm = document.querySelector("form")
let inputTxt = document.getElementById("inputTxt");
let fromServer = document.getElementById("fromServer");

ws.addEventListener("open", () => {
    console.log("Client Connected!");
});

ws.addEventListener("message", (event) => {
    const me = event.data;
    const meLine = document.createElement('div');
    meLine.textContent = me;
    fromServer.append(meLine);
});

inputForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let message = inputTxt.value;
    ws.send(message);
    inputTxt.value = "";
});