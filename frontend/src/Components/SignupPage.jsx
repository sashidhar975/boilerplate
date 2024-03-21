

import React, { useState } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import './SignupPage.css';

function SignupPage() {
  const [isDarkMode, setIsDarkMode] = useState(false); 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupError, setSignupError] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      if (!acceptedTerms) {
        throw new Error('Please accept the terms to sign up.');
      }

      const formData = { username, email, password }; // Create formData object
      const response = await axios.post('http://localhost:3000/auth/signup', formData);

      setSignupSuccess(true);
    } catch (error) {
      console.error('Signup error:', error);
      setSignupError(true);
    }
  };

  return (
    <>
      <div className='nav' style={{ display: 'flex', justifyContent: 'space-between', width: '900px' }}>
  <div></div> 
  <Button className="dark-mode-toggle" onClick={toggleDarkMode} style={{ backgroundColor: 'transparent', border: 'none', color: isDarkMode ? 'white' : 'black', fontSize: '20px' }}>
    {isDarkMode ? <MdOutlineLightMode /> : <MdOutlineLightMode />}
  </Button>
</div>
<hr />
      <center><h1>Sign Up</h1></center>
      <div className="login-container">
        <Row className="justify-content-center">
          <Col md={4}>
            <div className="oauth-container">
              <div className="oauth-buttons">
                <Button className={`oauth-button ${isDarkMode ? 'dark-mode' : ''}`} variant="primary" href="http://localhost:3000/api/auth/google/">
                  <FaGoogle /> Signup with Google
                </Button>
              </div>
              <div className="oauth-buttons">
                <Button className={`oauth-button ${isDarkMode ? 'dark-mode' : ''}`} variant="primary" href="http://localhost:3000/api/auth/facebook/">
                  <FaFacebook /> Signup with Facebook
                </Button>
              </div>
            </div>
            <center>or</center>
            <Form onSubmit={handleSignup}>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </Form.Group>

              <Form.Group controlId="acceptedTerms">
                <Form.Check type="checkbox" label="I accept the terms and conditions" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} required />
              </Form.Group>

              <Button className={`login-button ${isDarkMode ? 'dark-mode' : ''}`} variant="dark" type="submit">
                Sign Up
              </Button>
              <Col className="text-right">
                <Link to="/">Log in</Link>
              </Col>
            </Form>
          </Col>
        </Row>
        {signupSuccess && (
          <div className="alert alert-success mt-3" role="alert">
            Sign up successful!
          </div>
        )}
        {signupError && (
          <div className="alert alert-danger mt-3" role="alert">
            Error signing up. Please try again later.
          </div>
        )}
      </div>
    </>
  );
}

export default SignupPage;

