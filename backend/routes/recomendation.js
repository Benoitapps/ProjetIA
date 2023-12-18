const express = require('express');
const router = express.Router();
const recomendation = require('../controllers/recomendation');


router.get('/:recipeId', recomendation.getRecomendation);


module.exports = router;