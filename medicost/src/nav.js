import React, { useState } from 'react';
import "./nav.css";

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
            <h1>MEDICOST</h1>
          </div>
          <div className={`nav__links ${showSideNav ? 'show' : ''}`}>
            <a href="#">Cost Estimator</a>
            <a href="#">Find Location</a>
            <a href="#">Compare Prices</a>
            <a href="#">My Account</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
