const express = require("express");
const expressConfig = require("./config/express");
const routesConfig = require("./config/routes");
const WebSocket = require("ws");
const { addMessage, getAllChats } = require("./services/chatService");
const http = require("http");
// Oops
const app = express();

const server = http.createServer(app);

expressConfig(app);
routesConfig(app);

const wss = new WebSocket.Server({server});
wss.on("connection", client => {
    client.on("message", (data) => {
        const newData = JSON.parse(data);
        addMessage(newData.message, newData.sender, newData.receiver, newData.time);
        const chat = getAllChats();
        newData["chat"] = chat;
        [...wss.clients].filter(c => c !== client).forEach(c => c.send(JSON.stringify(newData)))
    })
})

server.listen(3030, () => console.log("Server listening on port 3030"));