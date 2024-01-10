const express = require('express');
const router = express.Router();
const foodPreference = require('../controllers/foodPreference');

router.post('/', foodPreference.addFoodPreference);
router.get('/', foodPreference.getFoodPreference);
router.delete('/', foodPreference.deleteFoodPreference);

module.exports = router;