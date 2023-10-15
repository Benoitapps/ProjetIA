const express = require('express');
const router = express.Router();
require("dotenv").config({ path: ".env.local", override: true });
const search = require('../controllers/search');

router.post('/', search.getRecipes);

module.exports = router;