import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { Signin } from './pages/credentials';
import Purchase from './smallfrontendstuff/purchase';
import flower from './images/flower.jpeg';
import SignUp from './smallfrontendstuff/components/SignUp';
import Welcome from './pages/Welcome';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="*" element={<MainRoutes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function MainRoutes() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/welcome" && <Navbar />}
      <Routes>
        <Route
          index
          element={
            <Home
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
              title="FLOWERS FOR ANY OCCASION"
              text="GIFT A BOUQUET TODAY"
              buttonText="SHOP NOW"
              url="http://localhost:3000/Inventory"
              btnClass="btn btn-two"
            />
          }
        />
        <Route path="/signin" element={<Signin />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </>
  );
}
