const express = require('express');
const router = express.Router();
const acc = require('../controllers/accompagnement');

router.post('/', acc.getAnswer);

module.exports = router;