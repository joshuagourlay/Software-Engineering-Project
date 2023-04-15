import React, { useState } from 'react';
import api from '../services';
import { useUser } from '../UserContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useUser();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check that all fields are filled out
    if (!username || !password) {
      setError('Please enter your username and password');
      return;
    }

    // Make API request to authenticate user
    api.post('/login', {
      username: username,
      password: password,
    })
      .then((response) => {
        // Show success message and clear form
        alert('Login successful!');
        setUser({ cid: response.data.cid }); // Store the customer ID in the UserContext
        setUsername('');
        setPassword('');
        setError('');
      })
      .catch((error) => {
        // Show error message
        setError(error.response.data.error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
