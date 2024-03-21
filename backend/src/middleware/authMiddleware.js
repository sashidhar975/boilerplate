const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: 'Access denied, token missing' });
        }

        const decodedToken = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.userId);

        if (!user) {
            return res.status(401).json({ message: 'Access denied, user not found' });
        }

        req.user = user;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Access denied, token expired' });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Access denied, invalid token' });
        } else {
            console.error('Error authenticating user:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
};

exports.authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'Forbidden, admin access required' });
    }
};


exports.authorizeProfile = (req, res, next) => {
    if (req.user && req.user._id.toString() === req.params.userId) {
        next();
    } else {
        return res.status(403).json({ message: 'Forbidden, access to other profiles not allowed' });
    }
};
