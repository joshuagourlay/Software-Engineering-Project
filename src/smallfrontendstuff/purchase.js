import React from 'react';
import './purchase.css';
import FlowerList from './components/FlowerList';
import EmployeeLogin from "./components/EmployeeLogin";


function Purchase() {
  return (
    <div>
      <main>
        <FlowerList />
        <EmployeeLogin/>
      </main>
    </div>
  );
}

export default Purchase;


