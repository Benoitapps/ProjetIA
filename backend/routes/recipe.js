const express = require('express');
const router = express.Router();
const recipe = require('../controllers/recipe');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', recipe.getRecipe);

module.exports = router;