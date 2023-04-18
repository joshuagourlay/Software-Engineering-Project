import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavbarStyle.css";
import { useUser } from '../smallfrontendstuff/UserContext';


function Navbar() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleSignOut = () => {
    setUser({}); // clear user info
    localStorage.removeItem("user"); // remove user's cache
    navigate('/home'); // Redirect user to home page
  };

  return (
    <>
      <nav className="Color">
        <Link to="/home" className="site-title">
          Bayside Flowers Inc.
        </Link>
        <div>
          <ul id="navbar">
            <li>
              <Link className="active" to="/home">
                Home
              </Link>
            </li>
            <li>
              <Link to="/purchase">Purchase</Link>
            </li>
            <li>
              {user.cid ? (
                <Link onClick={handleSignOut} className="signout-link">Sign out</Link>
              ) : (
                <Link to="/signin">Sign in</Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
