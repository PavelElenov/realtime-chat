const { getAllChats } = require("../services/chatService");

const router = require("express").Router();

router.get("/", (req, res) => {
    res.json(getAllChats());
});

module.exports = router;