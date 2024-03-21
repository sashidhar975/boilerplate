import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import './Subscriptions.css'; // Import your CSS file for styling

function Subscriptions() {
  const stripePromise = loadStripe('pk_test_51OsQGoSENBx9SsKfvQcpweJZRK2O7bI6lo45eiArQwcFhBJyHMmTmqmcXfkUNUaLtUos6BeR353ZZVletXA5jAji00QyiGaMKO');
  
  const [transactions, setTransactions] = useState([]);
  
  const fetchTransactionHistory = async () => {
    try {
      const response = await fetch('your-api-endpoint');
      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      } else {
        console.error('Failed to fetch transaction history');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchTransactionHistory();
  }, []);
  
  const handleSubscription = async (priceId) => {
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      mode: 'subscription',
      lineItems: [{ price: priceId, quantity: 1 }],
      successUrl: 'http://localhost:3000/success',
      cancelUrl: 'http://localhost:3000/cancel',
    });

    if (error) {
      console.error('Error:', error);
    }
  };

  const handleTransactionHistory = () => {
    console.log(transactions);
  }

  return (
    <div>
      <h1>My Subscription</h1>
An example of a subscription management page powered by Stripe. You can select a subscription plan, add a payment method, and view payment history.
      <div className="subscription-container">
        <div className="subscription-card">
          <h2>Free / Month</h2>
          <p>$0</p>
          <button onClick={() => handleSubscription('price_1abcxyz')}>Subscribe</button>
        </div>
        <div className="subscription-card">
          <h2>$10 / Monthly</h2>
          <p>$10</p>
          <button onClick={() => handleSubscription('price_2defxyz')}>Subscribe</button>
        </div>
        <div className="subscription-card">
          <h2>$100 / Yearly</h2>
          <p>$100</p>
          <button onClick={() => handleSubscription('price_3ghixyz')}>Subscribe</button>
        </div>
      </div>
      <button onClick={handleTransactionHistory}>Transaction History</button>
    </div>
  );
}

export default Subscriptions;
