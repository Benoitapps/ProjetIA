const express = require('express');
const router = express.Router();
const botchat = require('../controllers/chatbot');

router.post('/', botchat.getAnswer);

module.exports = router;