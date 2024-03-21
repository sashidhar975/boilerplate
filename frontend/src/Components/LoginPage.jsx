import React, { useState } from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Navbar } from 'react-bootstrap';
import axios from 'axios';
import { MdOutlineLightMode } from 'react-icons/md';
import './LoginPage.css';


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password
      });
      console.log('Login successful:', response.data);
      alert('Login successful!');
      setUser(response.data.user);
      navigate('/main');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
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
      <center><h1>Log In</h1></center>
      <div className="login-container">
        <Row className="justify-content-center">
          <Col md={4}>
            <div className="oauth-container">
              <div className="oauth-buttons">
                <Button className={`oauth-button ${isDarkMode ? 'dark-mode' : ''}`} variant="primary" href="http://localhost:3000/api/auth/google/callback">
                  <FaGoogle color={isDarkMode ? '#fff' : '#000'} /> Login with Google
                </Button>
              </div>
              <div className="oauth-buttons">
                <Button className={`oauth-button ${isDarkMode ? 'dark-mode' : ''}`} variant="primary" href="http://localhost:3000/api/auth/facebook">
                  <FaFacebook color={isDarkMode ? '#fff' : '#000'} /> Login with Facebook
                </Button>
              </div>
            </div>
            <center>or</center>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={isDarkMode ? 'dark-mode' : ''}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={isDarkMode ? 'dark-mode' : ''}
                />
              </Form.Group>
              <Button className={`login-button ${isDarkMode ? 'dark-mode' : ''}`} variant="dark" type="submit">
                Login
              </Button>
            </Form>

            <Row className="mt-3">
              <Col>
                <Link to='/forgot-password'>Forgot Password?</Link>
              </Col>
              <Col className="text-right">
                <Link to="/signup">Sign Up</Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default LoginPage;
