const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/logout', userCtrl.logout);
router.get('/connect', userCtrl.getConnectedUser);

router.post('/calories', userCtrl.updateCalories);
router.get('/calories', userCtrl.getCalories);

module.exports = router;