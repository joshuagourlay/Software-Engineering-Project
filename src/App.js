import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import { Signin } from './pages/credentials';
import Purchase from './smallfrontendstuff/purchase';
import flower from './images/flower.jpeg';
import flower2 from './images/flower2.webp';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            index
            element={
              <Home
                Home
                cName="hero"
                heroImg={flower}
                title="GIFT A BOUQUET"
                text="FOR THEIR SPECIAL DAY"
                buttonText="SHOP NOW"
                url="http://localhost:3000/Inventory"
                btnClass="show"
              />
            }
          />

          <Route
            path="/Home"
            element={
              <Home
                cName="hero"
                heroImg={flower}
                title="GIFT A BOUQUET"
                text="FOR THEIR SPECIAL DAY"
                buttonText="SHOP NOW"
                url="http://localhost:3000/Inventory"
                btnClass="btn btn-two"
              />
            }
          />

          <Route
            path="/Inventory"
            element={
              <Inventory
                cName="hero-in"
                heroImg={flower2}
                title="OUR SPECIALS!"
                text="SPRING SEASONS BEST"
              />
            }
          />
          <Route path="/signin" element={<Signin />} />
          <Route path="/purchase" element={<Purchase />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
