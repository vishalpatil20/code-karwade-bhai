import React from "react";
import logo from '../assets/logo.jpg';
import './navbar.css';
function Navbar() {
return(
    <div className="navbar">
    <img src={logo} alt="logo" className="logo" />
    <div className="btns">
    <button className="btn"><a href="https://github.com/vishalpatil20/code-karwade-bhai">GitHub</a></button>
    </div>

    </div>
);
}
export default Navbar;