const clientIo = io();

// Input room name
let inputRoomNameDiv = document.getElementById("inputRoomNameDiv");
let inputRoomNameForm = document.getElementById("inputRoomNameForm");
let inputRoomName = document.getElementById("inputRoomName");

// Display room names
let displayRoomNamesDiv = document.getElementById("displayRoomNamesDiv");

// Input message
let chatDiv = document.getElementById("chatDiv");
let inputMessageForm = document.getElementById("inputMessageForm");
let inputMessage = document.getElementById("inputMessage");
let messages = document.getElementById("messages");

// Leave room
let leaveForm = document.getElementById("leaveForm");

// Global variables for Room names
let roomName;
let roomNamesArray = [];

function init () {
    inputRoomNameDiv.hidden = false;
    displayRoomNamesDiv.hidden = true;
    chatDiv.hidden = true;    
}

init();

// When room names exist, display them, and user clicks one of them, join user into the room.
clientIo.on("roomNames", (roomNames) => {
    roomNamesArray = roomNames;
    console.log(roomNamesArray);

    if (roomNamesArray) {
        displayRoomNamesDiv.hidden = false;
    
        roomNamesArray.map(eachRoomName => {
            const room = document.createElement('a');
            room.textContent = eachRoomName;
            room.addEventListener("click", joinRoom(eachRoomName));
            displayRoomNamesDiv.append(room);
        
            function joinRoom (eachRoomName) {
                clientIo.emit("roomName", eachRoomName);
            };
        });
    };
});

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

    // Clear previous messages before user entering room
    messages.innerHTML = "";
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

    if (roomNamesArray) {        
        inputRoomNameDiv.hidden = true;
        displayRoomNamesDiv.hidden = false;
        chatDiv.hidden = true;
    } else {
        inputRoomNameDiv.hidden = false;
        displayRoomNamesDiv.hidden = true;
        chatDiv.hidden = true;    
    }

    // Clear previous messages before user leaving room
    messages.innerHTML = "";
});