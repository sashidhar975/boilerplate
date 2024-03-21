const Notification = require('../models/Notification');

exports.addNotification = async (req, res) => {
    try {
        const { recipient, message } = req.body;
        const newNotification = new Notification({ recipient, message });
        await newNotification.save();
        res.status(201).json({ message: 'Notification added successfully', notification: newNotification });
    } catch (error) {
        console.error('Error adding notification:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ recipient: req.params.userId, read: false });
        res.json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.clearNotifications = async (req, res) => {
    try {
        
        await Notification.updateMany({ recipient: req.params.userId }, { read: true });
        res.json({ message: 'Notifications cleared successfully' });
    } catch (error) {
        console.error('Error clearing notifications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};