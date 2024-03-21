const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  payment_method: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Payment', paymentSchema);
