const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


router.get('/dashboard', adminController.getDashboard);
router.get('/users', adminController.getAllUsers);
router.delete('/delete-user/:userId', adminController.deleteUserById); 
router.post('/assign-task', adminController.assignTaskToUser);

module.exports = router;
