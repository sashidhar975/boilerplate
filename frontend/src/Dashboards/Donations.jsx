import React, { useEffect, useState } from 'react';
import { PaymentElement, LinkAuthenticationElement, useStripe, useElements } from '@stripe/react-stripe-js';

function Donations({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing");
          break;
        case "requires_payments_methods":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe, clientSecret]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/success"
      }
    });

    if (error && (error.type === "card_error" || error.type === "validation_error")) {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const handleEmailChange = event => {
    console.log(event);
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={handleEmailChange}
      />
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id='submit'>
        <span id="button-text">
          {isLoading ? <div className='spinner' id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

export default Donations;
