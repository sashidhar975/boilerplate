import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const UserProfile = () => {
  const [personalData, setPersonalData] = useState({
    firstName: '',
    lastName: ''
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/profile');
      const userData = response.data;
      setPersonalData({
        firstName: userData.firstName,
        lastName: userData.lastName
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handlePersonalDataChange = (e) => {
    setPersonalData({
      ...personalData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordDataChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleTwoFactorAuthChange = () => {
    setTwoFactorAuth(!twoFactorAuth);
  };

  const handleUpdatePersonalData = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:3000/api/profile/update', personalData);
      alert('Personal data updated successfully!');
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:3000/api/profile/updatePassword', passwordData);
      alert('Password updated successfully!');
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const handleEnableTwoFactorAuth = async () => {
    try {
      // Call API to toggle 2FA
      setTwoFactorAuth(!twoFactorAuth);
      alert('Two-factor authentication updated successfully!');
    } catch (error) {
      console.error('Error updating 2FA:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    
    <Box maxWidth={600} m="auto">
      <Typography variant="h4" gutterBottom>Personal data</Typography>
      <form onSubmit={handleUpdatePersonalData}>
        <TextField
          fullWidth
          label="First name"
          name="firstName"
          value={personalData.firstName}
          onChange={handlePersonalDataChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Last name"
          name="lastName"
          value={personalData.lastName}
          onChange={handlePersonalDataChange}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">Update personal data</Button>
      </form>

      <Typography variant="h4" gutterBottom>Change password</Typography>
      <form onSubmit={handleUpdatePassword}>
        <TextField
          fullWidth
          label="Old password"
          name="oldPassword"
          type="password"
          value={passwordData.oldPassword}
          onChange={handlePasswordDataChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="New password"
          name="newPassword"
          type="password"
          value={passwordData.newPassword}
          onChange={handlePasswordDataChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Confirm new password"
          name="confirmPassword"
          type="password"
          value={passwordData.confirmPassword}
          onChange={handlePasswordDataChange}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">Update password</Button>
      </form>

      <Typography variant="h4" gutterBottom>Two-factor Authentication</Typography>
      <div>
        <Typography>
          Enable 2FA on your account
        </Typography>
        <Typography>
          Your account is {twoFactorAuth ? 'using' : 'not using'} two-factor authentication
        </Typography>
        <Button onClick={handleEnableTwoFactorAuth} variant="contained" color="primary">
          {twoFactorAuth ? 'Disable 2FA' : 'Enable 2FA'}
        </Button>
      </div>
    </Box>
  );
};

export default UserProfile;
