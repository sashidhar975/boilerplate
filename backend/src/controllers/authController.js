const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendEmail } = require("../services/emailService");

function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const timestamp = Date.now();
    return { otp, timestamp };
}

exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });

        user = new User({ username, email, password, verificationToken });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const verificationLink = `${process.env.CLIENT_URL}/auth/verify-email/${verificationToken}`;
        const emailText = `Please click on the following link to verify your email: ${verificationLink}`;
        sendEmail(email, "Verify Email", emailText);

        res.status(201).json({ message: "User registered successfully. Verification email sent." });
    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email;

        const user = await User.findOneAndUpdate({ email }, { isVerified: true });
        if (!user) {
            return res.status(400).json({ message: "Invalid verification token" });
        }

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        console.error("Error verifying email:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (!user.isVerified) {
            return res.status(400).json({ message: "Email is not verified" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ token });
    } catch (err) {
        console.error("Error logging in user:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.resendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: "Email is already verified" });
        }

        const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });

        user.verificationToken = verificationToken;
        await user.save();

        const verificationLink = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

        const emailText = `Please click on the following link to verify your email: ${verificationLink}`;
        sendEmail(email, "Verify Email", emailText);

        res.json({ message: "Verification email sent successfully" });
    } catch (err) {
        console.error("Error resending verification email:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const { otp, timestamp } = generateOTP();
        user.otp = otp;
        user.otpTimestamp = timestamp;
        await user.save();

        const emailText = `Your OTP for password reset is: ${otp}`;
        sendEmail(email, "Password Reset OTP", emailText, otp);

        res.json({ message: "Password reset OTP sent successfully" });
    } catch (err) {
        console.error("Error sending password reset OTP:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        // Check if newPassword is provided
        if (!newPassword) {
            return res.status(400).json({ message: "New password is required" });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const otpIsValid = otp === user.otp && Date.now() - user.otpTimestamp <= 180000; // 3 minutes in milliseconds

        if (!otpIsValid) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update user's password and remove OTP
        user.password = hashedPassword;
        user.otp = null;
        user.otpTimestamp = null;
        await user.save();

        res.json({ message: "Password reset successfully" });
    } catch (err) {
        console.error("Error resetting password:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};




exports.logout = async (req, res) => {
    try {
        // Clear session data or invalidate token
        // For session-based authentication, you can use req.session.destroy() to destroy the session
        // For token-based authentication, you may need to clear the token from client-side storage

        // Example: Clear session data
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            // Session destroyed successfully
            res.json({ message: 'Logout successful' });
        });
    } catch (error) {
        console.error('Error logging out user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
