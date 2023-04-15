import React, { useState } from 'react';
import api from '../services';

function EmployeeRegister() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    job_title: '',
    salary: '',
    password: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    api.post('/employee_register', formData)
      .then((response) => {
        console.log(response.data);
        // do something with the response data
      })
      .catch((error) => {
        console.error(error);
        // handle the error
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
      <h2>Employee Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        </label>
        <br />
        <label>
          Phone:
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
        </label>
        <br />
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
        </label>
        <br />
        <label>
          Job Title:
          <input type="text" name="job_title" value={formData.job_title} onChange={handleChange} placeholder="Job Title" />
        </label>
        <br />
        <label>
          Salary:
          <input type="text" name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default EmployeeRegister;
