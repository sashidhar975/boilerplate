const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');


router.post('/notifications', notificationController.addNotification);
router.get('/notifications/:userId', notificationController.getNotifications);
router.put('/notifications/clear/:userId', notificationController.clearNotifications);

module.exports = router;
