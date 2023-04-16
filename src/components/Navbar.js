import React from "react";
import { Link } from "react-router-dom";
import "./NavbarStyle.css";


function Navbar() {
  return (
    <>
      <nav className="Color">
        <Link to="/home" className="site-title">
          MainTech Flower BS
        </Link>
        <div>
          <ul id="navbar">
            <li>
              <Link className="active" to="/home">
                Home
              </Link>
            </li>
            <li>
              <Link to="/Inventory">Inventory</Link>
            </li>
            <li>
              <Link to="/signin">Sign in</Link>
            </li>
            <li>
              <Link to="/purchase">Purchase</Link>
            </li>
            <li>
              <Link to="/FlowerList">FlowerList</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
