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
              <a className="active" href="http://localhost:3000/home">
                Home
              </a>
            </li>
            <li>
              <a href="http://localhost:3000/Inventory" target="_blank" rel="noreferrer" >Inventory</a>
            </li>
            <li>
              <a href="http://localhost:3000/signin" target="_blank" rel="noreferrer" >Sign in </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;