import React, { useContext, useState } from 'react';
import { AppContext } from '../Context/AppContext';
import '../Styles/Signup.css';

export default function Signup() {
  const { mode, setRegistered } = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:56000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        console.log('Registration successful');
        setRegistered(true);
      } else {
        const errorData = await response.text();
        setError(errorData || 'Registration failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className={`signup-container-${mode}`}>
      <div className={`signup-card-${mode}`}>
        <h2 className={`heading-${mode}`}>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="emailid">Email</label>
            <input
              id="emailid"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit" className={`signup-btn-${mode}`}>Signup</button>
          <h6 style={{cursor: 'pointer'}} onClick={() => setRegistered(true)}>Already a user?</h6>
        </form>
      </div>
    </div>
  );
}