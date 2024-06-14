const express = require('express');
const router = express.Router();
const { createChat, userChats, findChat } = require("../controllers/chatController");
const { addMessage, getMessages } = require('../controllers/messageController');

// Chat routes
router.post('/chat', createChat);
router.get('/chat/:userId', userChats);
router.get('/chat/:firstId/:secondId', findChat);

// Message routes
router.post('/message', addMessage);
router.get('/message/:chatId', getMessages);

module.exports = router;
