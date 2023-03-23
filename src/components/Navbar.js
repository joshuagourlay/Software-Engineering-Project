import React from "react";

import "./NavbarStyle.css";
function Navbar() {
  return (
    <>
      <nav>
        <a href="http://localhost:3000/home" className="site-title">
          MainTech BS
        </a>
        <div>
          <ul id="navbar">
            <li>
              <a className="active" href="http://localhost:3000/home">
                Home
              </a>
            </li>
            <li>
              <a href="http://localhost:3000/Inventory" >Inventory</a>
            </li>
            <li>
              <a href="http://localhost:3000/signin">Sign in</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;