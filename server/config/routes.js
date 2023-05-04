const loginController = require("../controllers/loginController");
const usersController = require("../controllers/usersController");
const chatController = require("../controllers/chatController");

module.exports = (app) => {
    app.use("/login", loginController);
    app.use("/chats", chatController);
    app.use("/", usersController);
}