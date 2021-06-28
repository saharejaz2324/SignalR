"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./css/main.css");
var signalR = require("@microsoft/signalr");
var divMessages = document.querySelector("#divMessages");
var tbMessage = document.querySelector("#tbMessage");
var btnSend = document.querySelector("#btnSend");
var username = new Date().getTime();


// create Connection
var connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();


// on view upadate message from client
connection.on("messageReceived", function (username, message) {
    var m = document.createElement("div");
    m.innerHTML =
        "<div class=\"message-author\">" + username + "</div><div>" + message + "</div>";
    divMessages.appendChild(m);
    divMessages.scrollTop = divMessages.scrollHeight;
});


// Start the Connection
connection.start().catch(function (err) { return document.write(err); });


// Notify the server that we are watching
tbMessage.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        send();
    }
});
btnSend.addEventListener("click", send);
function send() {
     connection.send("newMessage", username, tbMessage.value)
        .then(function () { return tbMessage.value = ""; });
}
