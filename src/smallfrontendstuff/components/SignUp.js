import React, { useState } from 'react';
import api from '../services';
import './Signup.css'

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check that all fields are filled out
    if (!firstName || !lastName || !email || !phone || !address || !username || !password) {
      setError('Please fill out all fields');
      return;
    }

    // Check that password meets requirements (8 characters, at least one number)
    const passwordRegex = /^(?=.*\d)[\w!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters and contain at least one number');
      return;
    }

    // Make API request to create new customer
    api.post('/signup', {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      address: address,
      username: username,
      password: password,
    })
      .then((response) => {
        // Show success message and clear form
        alert('Customer created successfully!');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setAddress('');
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
      <h2>Sign Up</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Phone:
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <label>
          Address:
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;