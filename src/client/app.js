const clientIo = io();

let inputForm = document.querySelector("form")
let inputMessage = document.getElementById("inputMessage");
let messages = document.getElementById("messages");

function addMessage (message) {
    const meLine = document.createElement('div');
    meLine.textContent = message;
    messages.append(meLine);
};

inputForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let message = inputMessage.value;
    inputMessage.value = "";

    clientIo.emit("messageFromClient", message);
    addMessage(message);
});

clientIo.on("messageFromClient", (message) => {
    addMessage(message);
});