const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');



router.get('/', profileController.getUserProfile);
router.put('/update', profileController.updateUserProfile);
router.put('/update-password', profileController.updatePassword);
router.put('/toggle-two-factor-auth', profileController.toggleTwoFactorAuth);

module.exports = router;
