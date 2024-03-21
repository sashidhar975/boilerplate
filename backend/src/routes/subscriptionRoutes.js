const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');


router.post('/subscribe', subscriptionController.subscribeToPlan);
router.post('/payment', subscriptionController.handlePayment);
router.get('/transactions', subscriptionController.getTransactionHistory);

module.exports = router;
