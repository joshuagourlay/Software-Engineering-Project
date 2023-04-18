import React, { useState } from 'react';
import api from '../services';

function ManageFlowerForm() {
  const [fid, setFid] = useState('');
  const [flower_name, setFlowerName] = useState('');
  const [new_price, setNewPrice] = useState('');
  const [new_stock, setNewStock] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

      if (!fid || !flower_name || !new_price || !new_stock) {
          setError('Please select a flower and enter the modifications');
          return;
      }

      const eid = localStorage.getItem('eid');
      if (!eid) {
          console.error('Employee not logged in');
          return;
      }

      api.put('/manage_flower', {
          eid : eid,
          fid : fid,
          new_price : new_price,
          new_stock : new_stock,
      })
        .then((response) => {
            alert('Update completed');
            setFid('');
            setFlowerName('');
            setNewPrice('');
            setNewStock('');
            setError('');
        })
        .catch((error) => {
            setError(error.response.data.error);
        })
  };

  return (
    <div>
      <h2>Adjust Flower</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Flower ID:
          <input type="text" value={fid} onChange={(e) => setFid(e.target.value)} />
        </label>
        <br />
        <label>
          Flower Name:
          <input type="text" value={flower_name} onChange={(e) => setFlowerName(e.target.value)} />
        </label>
        <br />
        <label>
          New Price:
          <input type="text" value={new_price} onChange={(e) => setNewPrice(e.target.value)} />
        </label>
        <br />
        <label>
          New Stock:
          <input type="text" value={new_stock} onChange={(e) => setNewStock(e.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ManageFlowerForm;
