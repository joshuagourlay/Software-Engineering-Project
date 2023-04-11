import React from "react";

import "./NavbarStyle.css";
function Navbar() {
  return (
    <>
      <nav className="Color">
        <a href="http://localhost:3000/home" className="site-title">
          MainTech Flower BS
        </a>
        <div>
          <ul id="navbar">
            <li>
              <a className="active" href="home">
                Home
              </a>
            </li>
            <li>
              <a href="Inventory"  >Inventory</a>
            </li>
            <li>
              <a href="signin"  >Sign in </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;