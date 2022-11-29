const clientIo = io();

let inputRoomNameForm = document.getElementById("inputRoomNameForm");
let inputRoomName = document.getElementById("inputRoomName");

let inputMessageForm = document.getElementById("inputMessageForm");
let inputMessage = document.getElementById("inputMessage");

let leaveForm = document.getElementById("leaveForm");
let messages = document.getElementById("messages");

let roomName;

function addMessage (message) {
    const meLine = document.createElement('div');
    meLine.textContent = message;
    messages.append(meLine);
};

inputRoomNameForm.addEventListener("submit", (event) => {
    event.preventDefault();
    roomName = inputRoomName.value;

    clientIo.emit("roomName", roomName);
    inputRoomName.value = "";

    const rooms = document.createElement('div');
    rooms.textContent = roomName;
    messages.append(rooms);
});

inputMessageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let message = inputMessage.value;
    inputMessage.value = "";

    clientIo.emit("messageFromClient", roomName, message);
    addMessage(message);
});

leaveForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clientIo.emit("leaveRoom");
});

clientIo.on("messageFromClient", (message) => {
    addMessage(message);
});

clientIo.on("roomName", (roomName) => {
    const rooms = document.createElement('div');
    rooms.textContent = roomName;
    messages.append(rooms);
});