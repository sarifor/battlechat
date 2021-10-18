const clientIo = io();

let inputRoomNameForm = document.getElementById("inputRoomNameForm");
let inputRoomName = document.getElementById("inputRoomName");

let inputMessageForm = document.getElementById("inputMessageForm");
let inputMessage = document.getElementById("inputMessage");

let leaveForm = document.getElementById("leaveForm");
let messages = document.getElementById("messages");

function addMessage (message) {
    const meLine = document.createElement('div');
    meLine.textContent = message;
    messages.append(meLine);
};

inputRoomNameForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let roomName = inputRoomName.value;
    roomName.value = "";

    clientIo.emit("roomName", roomName);
    const rooms = document.createElement('div');
    rooms.textContent = roomName;
    messages.append(rooms);    
});

inputMessageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let message = inputMessage.value;
    inputMessage.value = "";

    // To broadcast message
    clientIo.emit("messageFromClient", message);

    // To judge rock scissor paper
    clientIo.emit("judge", () => {
        if (message === "rock") {
            console.log("You give rock");
        } else if (message === "scissor") {
            console.log("You give scissor");            
        } else if (message === "paper") {
            console.log("You give paper");            
        } else {
            console.log("Please do rock sissor paper");
        }
    });

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