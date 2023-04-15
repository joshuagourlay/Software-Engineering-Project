import React from 'react';
import './App.css';
import FlowerList from './components/FlowerList';
import PurchaseForm from './components/PurchaseForm';
import SignUp from './components/SignUp';
import Login from './components/Login';
import EmployeeLogin from './components/EmployeeLogin';
import EmployeeRegister from './components/EmployeeRegister'
import AdjustPriceForm from './components/AdjustPriceForm';
import FeedbackForm from './components/FeedbackForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>MainTechBS</h1>
      </header>
      <main>
        <FlowerList />
        <PurchaseForm />
        <SignUp />
        <Login />
        <EmployeeRegister />
        <EmployeeLogin />
        <AdjustPriceForm /> 
        <FeedbackForm />  
      </main>
    </div>
  );
}

export default App;
