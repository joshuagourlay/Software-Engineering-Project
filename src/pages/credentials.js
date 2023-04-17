import React, { useState } from "react";
import "./credentials.css"
import profile from "../images/user.png"
import Email from "../images/email.webp"
import Pass from "../images/pass.jpeg"
import api from '../smallfrontendstuff/services';
import { useUser } from '../smallfrontendstuff/UserContext';
import { Link} from "react-router-dom";

export const Signin=() =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setUser } = useUser();

    const handleSubmit = (event) => {
        event.preventDefault();

        // Check that all fields are filled out
        if (!username || !password) {
            setError('Please enter your username and password');
            return;
        }

        // Make API request to authenticate user
        api.post('/login', {
            username: username,
            password: password,
        })
        .then((response) => {
            // Show success message and clear form
            alert('Login successful!');
            setUser({ cid: response.data.cid }); // Store the customer ID in the UserContext
            setUsername('');
            setPassword('');
            setError('');
        })
        .catch((error) => {
            // Show error message
            setError(error.response.data.error);
        });
    };

  return(  
    <form onSubmit={handleSubmit} className="main">
    <div className="sub-main">
        <div>
            <div className="imgs">
                <div className="container-image">
                    <img src={profile} alt="profile" className="profile" />

                </div>
                
            </div>
                <h1>Login/Register</h1>
            <div>
                <div>
                    <img src={Email} alt="email" className="email"/>
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="second-input">
                    <img src={Pass} alt="pass" className="pass"/>
                    <input type="password" placeholder="Password:" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className= "b1" type="submit">Log In</button>
            </div>
            <h3>Don't have an account? Register here</h3>
            <Link to="/signup" className="Link">
                Sign up
            </Link>
        </div>
        {error && <div className="error">{error}</div>}
    </div>
    </form>
  );
};
