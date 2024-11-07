import React, { useState } from 'react';
import axios from 'axios';

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      
      // Set login state to true
      setIsLoggedIn(true);

      // Role-based redirection
      switch (response.data.role) {
        case 'victim':
          window.location.href = '/victim-dashboard';
          break;
        case 'responder':
          window.location.href = '/responder-dashboard';
          break;
        case 'coordinator':
          window.location.href = '/coordinator-dashboard';
          break;
        default:
          window.location.href = '/';
      }
    } catch (err) {
      console.error("Login error:", err.response ? err.response.data : err.message);
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
