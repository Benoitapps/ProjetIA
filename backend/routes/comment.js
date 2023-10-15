const express = require('express');
const router = express.Router();
const comment = require('../controllers/comment');

router.post('/', comment.addComment);
router.get('/', comment.getComment);

module.exports = router;