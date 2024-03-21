// profileController.js

const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { email, firstName, lastName } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user.userId,
            { email, firstName, lastName },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error('Error updating user profile:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updatePassword = async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the old password matches
        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid old password' });
        }

        // Update password
        user.password = newPassword;
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error('Error updating password:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.toggleTwoFactorAuth = async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Toggle two-factor authentication status
        user.twoFactorAuthEnabled = !user.twoFactorAuthEnabled;
        await user.save();

        res.json({ message: 'Two-factor authentication updated successfully', twoFactorAuthEnabled: user.twoFactorAuthEnabled });
    } catch (err) {
        console.error('Error toggling two-factor authentication:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
