import React, { useState } from 'react';
import api from '../services';

function EmployeeLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    api.post('/employee_login', formData)
      .then((response) => {
        console.log(response.data);
        if (response.data.message === 'Login successful') {
          localStorage.setItem('eid', response.data.eid);
        } else {
          console.error('Login failed:', response.data.error);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Employee Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EmployeeLogin;
