import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import axios from 'axios';

const ResetPasswordForm = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/reset-password', {
        email: email,
        otp: otp,
        newPassword: newPassword
      });
      setMessage(response.data.message);
      setError('');
      navigate('/'); // Redirect to the login form
    } catch (error) {
      setMessage('');
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      <Link to="/">Login</Link> {/* Link to the login page */}
    </div>
  );
};

export default ResetPasswordForm;
