const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true , unique:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },  
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String }
});

module.exports = mongoose.model('User', userSchema);
