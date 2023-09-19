import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
          <Link to = "/">
            <img 
              className = "navLogo"
              src = {logo}
              alt =" "
            />
            </Link>
          </div>
          <div className={`nav__links ${showSideNav ? 'show' : ''}`}>

            <Link to = "/CostEstimator">Cost Estimator</Link>
            <a href="#">Compare Prices</a>
            <a href="#">Find Location</a>
            <a href="#">About Us</a>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
