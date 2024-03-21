import React, { useState } from 'react';
import Donations from './Donations';
import './Payments.css'

function Payments() {
  const [donationAmount, setDonationAmount] = useState(0);

  const handleDonationAmountChange = event => {
    setDonationAmount(Number(event.target.value));
  };

  const handleContinueToPayment = () => {
    // Redirect to the payment page
    window.location.href = '/donations';
  };

  return (
    <div className="payments-container">
        <h2>Choose Your Donation Amount</h2>
      <label>Choose the amount</label>
      <select value={donationAmount} onChange={handleDonationAmountChange}>
        <option value={0}>Select amount</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
      <button onClick={handleContinueToPayment}>Continue to Payment</button>
    </div>
  );
}

export default Payments;
