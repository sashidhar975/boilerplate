const User = require('../models/User');
//const WebSocket = require('ws');
const { sendEmail } = require("../services/emailService");



exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        await User.findByIdAndDelete(userId);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.assignTaskToUser = async (req, res) => {
    try {
        const { userId, task } = req.body;

        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.task = task;
        
        await user.save();

        const userEmail = user.email;
        const emailSubject = 'Task Assigned';
        const taskTitle = task.title;
        const taskDescription = task.description;
        const emailText = `You have been assigned a new task by the admin:\nTitle: ${taskTitle}\nDescription: ${taskDescription}`;

        sendEmail(userEmail, emailSubject, emailText);

        // // in-app notifi
        // const ws = new WebSocket('ws://localhost:3000'); // Example WebSocket server address
        // ws.on('open', () => {
        //     ws.send(JSON.stringify({ userId, task, type: 'task_assigned' }));
        // });

        res.json({ message: 'Task assigned successfully', user });
    } catch (err) {
        console.error('Error assigning task to user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getDashboard = async (req, res) => {
    res.send('Dashboard'); 
};
