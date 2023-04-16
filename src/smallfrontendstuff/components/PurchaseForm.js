import React, { useState } from 'react';
import api from '../services';
import { useUser } from '../UserContext';
import './PurchaseForm.css';

function PurchaseForm({ flowerId }) {
  const [purchaseQuantity, setPurchaseQuantity] = useState('');
  const [error, setError] = useState('');

  const { user } = useUser();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!purchaseQuantity) {
      setError('Please enter the purchase quantity');
      return;
    }

    api.post('/purchase', {
      cid: user.cid,
      fid: flowerId,
      purchase_quantity: purchaseQuantity,
    })
      .then((response) => {
        alert('Purchase successful!');
        setPurchaseQuantity('');
        setError('');
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  return (
    <div className='idk'>
      
      <form className='hello' onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
        <label>Purchase Quantity:<input className='input1' type="number" value={purchaseQuantity} onChange={(e) => setPurchaseQuantity(e.target.value)} />
        </label>
        <button classname ="btn2" type="submit">Purchase</button>
      </form>
      
    </div>
  );
}

export default PurchaseForm;