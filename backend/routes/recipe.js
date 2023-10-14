const express = require('express');
const router = express.Router();
const recipe = require('../controllers/recipe');

router.post('/', recipe.getRecipe);

module.exports = router;