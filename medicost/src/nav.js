import React, { useState } from 'react';
import "./nav.css";
import logo from "./logo1.png"

function Nav() {
  const [showSideNav, setShowSideNav] = useState(false);

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };

  return (
    <div className="nav">
      <div className="nav_background">
        <div className="navContents">
          <div className="navIcon" onClick={toggleSideNav}>
            <img 
              className = "navLogo"
              src = {logo}
              alt =" "
            />
          </div>
          <div className={`nav__links ${showSideNav ? 'show' : ''}`}>
            <a href="#">Cost Estimator</a>
            <a href="#">Find Location</a>
            <a href="#">Compare Prices</a>
            <a href="#">About Us</a>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
