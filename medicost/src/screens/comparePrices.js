import React from 'react';
import "./comparePrices.css";
import Nav from "../nav";
import CompareHeader from "../images/priceComparison.jpg"
function comparePrices() {
  return (
    <div className = "comparePrices">
        <Nav/>
        <div className='compareBanner'>
        <img 
        className = "compareHeader"
        src = {CompareHeader} 
        alt=''
        />
        <div className ="compareBannerDesc">
        <h5>Compare Prices</h5>
        <h2>Unveiling State-by-State Cost Clarity for Informed Healthcare Decisions.</h2>
        <h5>Utilize our Price Comparison tool to gauge the healthcare costs across different states. This feature empowers you to discern which regions offer the most economical yet high-quality medical services. By presenting a comprehensive view of interstate healthcare pricing variations, we aim to help you make informed, cost-effective decisions. Whether you're considering relocating, planning for a major procedure, or just curious about the healthcare landscape, our tool offers valuable insights to navigate your healthcare choices.</h5>
        </div>
        </div>
   </div>
  )
}

export default comparePrices