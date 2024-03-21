const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');
// const authenticateUser = require('../controllers/userController');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/main');
});

router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/main');
});

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.get('/verify-email/:token', authController.verifyEmail);
router.post('/resend-verification-email', authController.resendVerificationEmail);
router.post('/reset-password', authController.resetPassword);
router.post('/logout', authController.logout);


module.exports = router;
