const express = require('express');
const router = express.Router();
const recipe = require('../controllers/recipe');

router.post('/', recipe.getRecipeVerif);
router.get('/:recetteId', recipe.getRecipeVerif);
router.get('/shopping-list/:recipeId', recipe.getShoppingList);

module.exports = router;