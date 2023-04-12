import React,{useState} from "react";
import "./credentials.css"
import profile from "../images/user.png"
import Email from "../images/email.webp"
import Pass from "../images/pass.jpeg"




export const Signin=() =>{
    const [email,setEmail]=useState('');
    const [pass,setPass]=useState('');
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(email);
    }

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
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="youremail@domain.com" className="name"/>
                </div>
                <div className="second-input">
                <img src={Pass} alt="pass" className="pass"/>
                <input value={pass} onChange={(e)=>setPass(e.target.value)} type="password" placeholder="password" className="name"/>
                </div>
                <button className= "b1" type="submit">Log In</button>
            </div>
                <h3>Don't have an account? Register here</h3>
                <button className="Link">Sign up</button>
        </div>
        </div>
    </form>
    );
}