const express = require('express');
const router = express.Router();
const botchat = require('../controllers/chatbot');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', botchat.getAnswer);

module.exports = router;