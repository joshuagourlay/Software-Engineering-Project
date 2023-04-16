import React, { useState } from 'react';
import api from '../services';
import { useUser } from '../UserContext';

function PurchaseForm() {
  const [fid, setFid] = useState('');
  const [purchaseQuantity, setPurchaseQuantity] = useState('');
  const [error, setError] = useState('');

  const { user } = useUser();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!fid || !purchaseQuantity) {
      setError('Please select a flower and enter the purchase quantity');
      return;
    }

    api.post('/purchase', {
      cid: user.cid,
      fid: fid,
      purchase_quantity: purchaseQuantity,
    })
      .then((response) => {
        alert('Purchase successful!');
        setFid('');
        setPurchaseQuantity('');
        setError('');
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  return (
    <div>
      <h2>Purchase</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Flower ID:
          <input type="text" value={fid} onChange={(e) => setFid(e.target.value)} />
        </label>
        <label>
          Purchase Quantity:
          <input type="number" value={purchaseQuantity} onChange={(e) => setPurchaseQuantity(e.target.value)} />
        </label>
        <button type="submit">Purchase</button>
      </form>
    </div>
  );
}

export default PurchaseForm;
