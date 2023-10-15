const express = require('express');
const router = express.Router();
const favoris = require('../controllers/favoris');

router.post('/', favoris.addFavoris);
router.get('/', favoris.getFavoris);

module.exports = router;