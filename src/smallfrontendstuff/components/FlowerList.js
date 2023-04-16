import React, { useEffect, useState } from 'react';
import api from '../services';
import PurchaseForm from './PurchaseForm';
import './FlowerList.css';

function FlowerList() {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    api.get('/flowers')
      .then((response) => {
        setFlowers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching flowers:', error);
      });
  }, []);

  return (
    <div className="flower-list-container">
      <h2 className="flower-list-heading">Flower List</h2>
      <table className="flower-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Color</th>
            <th>Price</th>
            <th>Description</th>
            <th>Shelf Life</th>
            <th>Availability</th>
            <th>Min Order Quantity</th>
            <th>Stock</th>
            <th>Purchase</th>
          </tr>
        </thead>
        <tbody>
          {flowers.map((flower) => (
            <tr key={flower.fid}>
              <td>{flower.fid}</td>
              <td>{flower.name}</td>
              <td>{flower.color}</td>
              <td>${flower.price.toFixed(2)}</td>
              <td>{flower.description}</td>
              <td>{flower.shelf_life}</td>
              <td>{flower.availability}</td>
              <td>{flower.min_order_quantity}</td>
              <td>{flower.stock}</td>
              <td><PurchaseForm flower={flower} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FlowerList;