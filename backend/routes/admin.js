const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/admin');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/notverified',adminMiddleware, adminCtrl.getUserNotVerified);
router.put('/verified/:id',adminMiddleware, adminCtrl.UserVerified);

router.get('/alluser', adminMiddleware, adminCtrl.getAllUser);
router.put('/taketoken/:userId/:tokenid/:website',adminMiddleware, adminCtrl.updateToken);

router.get('/token/:userId',adminMiddleware, adminCtrl.getTokenUserbyId);

router.get('/supr', adminCtrl.getDelete);

module.exports = router;