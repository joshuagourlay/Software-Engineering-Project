import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import {Signin} from "./pages/credentials"
import flower from "./images/flower.jpeg"


export default function App() {
  
  return (
    
    <div className="App">
      <Navbar />
     <BrowserRouter>
      <Routes>
        <Route index element={<Home Home cName="hero" heroImg={flower} 
        title="GIFT A BOUQUET" text="FOR THEIR SPECIAL DAY" buttonText="SHOP NOW" 
        url="http://localhost:3000/Inventory" 
        btnClass="show"/>}/>

        <Route path="/Home" element={<Home cName="hero" heroImg={flower} 
        title="GIFT A BOUQUET" text="FOR THEIR SPECIAL DAY" buttonText="SHOP NOW" 
        url="http://localhost:3000/Inventory" 
        btnClass="show"/>}/>

        <Route path="/Inventory" element={<Inventory/>}/>
        <Route path="/signin" element={<Signin/>}/>

        </Routes>

     </BrowserRouter>
    </div>
  );
}
