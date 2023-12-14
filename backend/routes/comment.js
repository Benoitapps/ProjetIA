const express = require('express');
const router = express.Router();
const comment = require('../controllers/comment');

router.post('/', comment.addComment);
router.get('/:recipeId', comment.getComment);
router.delete('/', comment.deleteComment);

module.exports = router;