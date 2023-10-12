const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/co',authMiddleware, userCtrl.getUser);
router.get('/',authMiddleware, userCtrl.getConnectedUser);

router.get('/navbar',authMiddleware, userCtrl.getConnectedUserNav);

module.exports = router;