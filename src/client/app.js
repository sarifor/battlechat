const clientIo = io();

let inputForm = document.querySelector("form")
let inputTxt = document.getElementById("inputTxt");
let fromServer = document.getElementById("fromServer");
  
inputForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let message = inputTxt.value;
    inputTxt.value = "";

    clientIo.emit("messageFromClient", message);

    const meLine = document.createElement('div');
    meLine.textContent = message;
    fromServer.append(meLine);
});

clientIo.on("messageFromClient", (data) => {
    const meLine = document.createElement('div');
    meLine.textContent = data;
    fromServer.append(meLine);
});