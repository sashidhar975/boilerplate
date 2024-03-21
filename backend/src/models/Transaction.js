// Transaction.js

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    cardDetails: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        enum: ['Success', 'Failure'], 
        required: true
    },
  
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
