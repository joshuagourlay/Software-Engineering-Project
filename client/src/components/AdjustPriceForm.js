import React, { useState } from 'react';
import api from '../services';

function AdjustPriceForm() {
  const [formData, setFormData] = useState({
    fid: '',
    flower_name: '',
    new_price: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const eid = localStorage.getItem('eid');
    if (!eid) {
      console.error('Employee not logged in');
      return;
    }
    const data = { ...formData, eid }; // Include the eid in the request data
    api.put('/adjust_price', data)
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
      <h2>Adjust Price</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Flower ID:
          <input type="text" name="fid" value={formData.fid} onChange={handleChange} />
        </label>
        <br />
        <label>
          Flower Name:
          <input type="text" name="flower_name" value={formData.flower_name} onChange={handleChange} />
        </label>
        <br />
        <label>
          New Price:
          <input type="text" name="new_price" value={formData.new_price} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AdjustPriceForm;
