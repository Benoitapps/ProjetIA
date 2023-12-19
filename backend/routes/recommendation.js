const express = require('express');
const router = express.Router();
const recommendation = require('../controllers/recommendation');


router.get('/:recipeId', recommendation.getRecomendation);


module.exports = router;