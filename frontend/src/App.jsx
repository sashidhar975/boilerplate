import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';
import Payments from './Dashboards/Payments';
import Donations from './Dashboards/Donations';
import ContentItems from './Dashboards/ContentItems';
import Documents from './Dashboards/Documents';
import Crud from './Dashboards/Crud';
import OpenAi from './Dashboards/OpenAi';
import Subscriptions from './Dashboards/Subscriptions';
import Tc from './Dashboards/Tc';
import Pandp from './Dashboards/Pandp';
import './App.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Dashboard from './Dashboards/Dashboards';
import Main from './Components/Main';
import ForgotPasswordForm from './Components/ForgotPasswordForm';
import ResetPasswordForm from './Components/ResetPasswordForm';


const stripePromise = loadStripe('pk_test_51OsQGoSENBx9SsKfvQcpweJZRK2O7bI6lo45eiArQwcFhBJyHMmTmqmcXfkUNUaLtUos6BeR353ZZVletXA5jAji00QyiGaMKO');

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [clientSecret, setClientSecret] = useState("");


  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
    document.body.classList.toggle('dark-mode'); 
  };

  useEffect(() => {
    fetch("http://localhost:3000/create-payment-intent", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 1000
      }),
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret))
      .catch(error => console.error("Error fetching client secret:", error));
  }, []);

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe"
    }
  };

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/forgot-password' element ={<ForgotPasswordForm />} />
        <Route path= '/reset-password' element ={<ResetPasswordForm />}/>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/payments' element={<Payments />} />
        <Route path='/donations' element={
          clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <Donations />
            </Elements>
          )
        } />
        <Route path="/content" element={<ContentItems />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/crud" element={<Crud />} />
        <Route path="/openai" element={<OpenAi />} />
        <Route path="/privacy-policy" element={<Pandp />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/terms-and-conditions" element={<Tc />} />

        <Route path='/main' element={<Main />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;

