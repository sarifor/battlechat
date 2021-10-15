const clientIo = io();

let inputForm = document.querySelector("form")
let inputTxt = document.getElementById("inputTxt");
let fromServer = document.getElementById("fromServer");

socket.addEventListener("open", () => {
    console.log("Client Connected!");
});

clientIo.addEventListener("message", (event) => {
    const me = event.data;
    const meLine = document.createElement('div');
    meLine.textContent = me;
    fromServer.append(meLine);
});

inputForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let message = inputTxt.value;
    clientIo.send(message);
    inputTxt.value = "";
});