const clientIo = io();

// Input room name
let inputRoomNameDiv = document.getElementById("inputRoomNameDiv");
let inputRoomNameForm = document.getElementById("inputRoomNameForm");
let inputRoomName = document.getElementById("inputRoomName");

// Display room names
let displayRoomNamesDiv = document.getElementById("displayRoomNames");

// Input message
let inputMessageForm = document.getElementById("inputMessageForm");
let inputMessage = document.getElementById("inputMessage");
let messages = document.getElementById("messages");

// Leave room
let leaveForm = document.getElementById("leaveForm");

// Global variables for Room names
let roomName;
let roomNames;

function init () {
    if (roomNames) {
        inputRoomNameDiv.hidden = true;
        displayRoomNamesDiv.hidden = false;
        chatDiv.hidden = true;
    } else {
        inputRoomNameDiv.hidden = false;
        displayRoomNamesDiv.hidden = true;
        chatDiv.hidden = true;    
    }
}

init();

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
    inputRoomNameDiv.hidden = true;
    chatDiv.hidden = false;
});

inputMessageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let message = inputMessage.value;
    inputMessage.value = "";

    clientIo.emit("messageFromClient", roomName, message);
    addMessage(message);
});

clientIo.on("messageFromClient", (message) => {
    addMessage(message);
});

leaveForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clientIo.emit("leaveRoom", roomName);

    roomName = "";

    if (roomNames) {
        inputRoomNameDiv.hidden = true;
        displayRoomNamesDiv.hidden = false;
        chatDiv.hidden = true;
    } else {
        inputRoomNameDiv.hidden = false;
        displayRoomNamesDiv.hidden = true;
        chatDiv.hidden = true;    
    }

});

// When room names exist, display them, and user clicks one of them, join user into the room.
if (roomNames) {
    roomNames.map(eachRoomName => {
        const room = document.createElement('div');
        room.textContent = eachRoomName;
        room.addEventListener("click", joinRoom(eachRoomName));
        displayRoomNamesDiv.append(room);
 
        function joinRoom (eachRoomName) {
            clientIo.emit("roomName", eachRoomName);
        };
    });
};