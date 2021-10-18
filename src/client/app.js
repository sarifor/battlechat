const clientIo = io();

let inputForm = document.querySelector("form")
let inputTxt = document.getElementById("inputTxt");
let fromServer = document.getElementById("fromServer");

function addMessage (message) {
    const meLine = document.createElement('div');
    meLine.textContent = message;
    fromServer.append(meLine);
};

inputForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let message = inputTxt.value;
    inputTxt.value = "";

    clientIo.emit("messageFromClient", message);
    addMessage(message);
});

clientIo.on("messageFromClient", (message) => {
    addMessage(message);
});