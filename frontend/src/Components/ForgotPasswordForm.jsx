import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordForm = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/forgot-password', {
        email: email
      });
      setMessage(response.data.message);
      setError('');
      navigate('/reset-password'); 
    } catch (error) {
      setMessage('');
      setError(error.response.data.message);
    }
  };

  return (
    <Card variant="outlined" style={{ maxWidth: '400px', margin: 'auto' }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Forgot Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" style={{ marginRight: '8px' }}>
            Reset Password
          </Button>
        </form>
        {message && <Typography color="textSecondary" style={{ marginTop: '16px' }}>{message}</Typography>}
        {error && <Typography color="error" style={{ marginTop: '16px' }}>{error}</Typography>}
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordForm;
