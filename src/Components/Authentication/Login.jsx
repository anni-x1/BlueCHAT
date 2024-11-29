import React, { useContext, useState } from 'react';
import { AppContext } from '../Context/AppContext';
import '../Styles/Login.css';

export default function Login() {
  const { mode, setRegistered, setAuthenticated, username, setUserName, setMessages } = useContext(AppContext);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://bluechat-backend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setAuthenticated(true);
        setUserName(data.username);
        setMessages(data.history);
        console.log('Login successful');
        // localStorage.setItem('username', data.username);
        // localStorage.setItem('password', data.password);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="background">
      <div className={`login-container-${mode}`}>
        <div className={`login-card-${mode}`}>
          <h2 className={`heading-${mode}`}>Welcome Back</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className={`login-btn-${mode}`}>Log in</button>
            <h6 style={{ cursor: 'pointer' }} onClick={() => setRegistered(false)}>Don't have an account?</h6>
          </form>
        </div>
      </div>
    </div>
  );
}
