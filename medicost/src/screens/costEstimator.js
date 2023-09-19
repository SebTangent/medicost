import React from 'react';
import "./costEstimator.css";
import Nav from "../nav";
import Picture from "../images/costEstimatorPic.jpg"
import Search from "../images/search.jpg"
import Button from "../images/buttons.jpg"

function costEstimator() {
  return (
    <div className ="costEstimator">
        <Nav />
        <div className ="costBanner">
            <img
            className = "bannerPic"
            src = {Picture}
            alt = ""
            />
        <div class = "bannerDescription">
            <h5>Cost Estimator</h5>
            <h1>Empowering Your Healthcare Choices with Transparency</h1>
            <h5>At MediCost, we believe that healthcare should never be a black box. Our Cost Estimator tool is designed to demystify the costs associated with various medical procedures and services. Simply input the treatment you're interested in and your location, and we'll provide you with an accurate estimate that lets you plan your healthcare spending with confidence. With MediCost's Cost Estimator, you're not just a patient—you're an informed consumer.</h5>
            </div>
        </div>

    <div className="searchBarWrapper">
        <div className = "searchTitle">
    
            <h5>Cost Estimator</h5>
            <h2>Search for a Medical Procedure</h2>
            <h4>You're welcome to use the search bar below to look up the cost estimates for various medical procedures. If you prefer, you can also click on the buttons below to explore different categories.</h4>
            
        </div>
        <input type="text" className="searchBar" placeholder="Search by Keyword ▶" />
    </div>
    <img
        className = "searchImg"
        src ={Search}
    
    />
    <div className = "rows_buttons">
    <div className='button-desc'>
    <h5>Cost Estimator</h5>
    <h2>Medical Procedures</h2>
    <h4 >Press any of the buttons to learn more about Procedure Costs </h4>
    </div>
    <div className="Row1">
      
        <button className="gridButton">Addiction Medicine</button>
        <button className="gridButton">Anesthesiology</button>
        <button className="gridButton">Cardiology</button>
        <button className="gridButton">Dentist</button>
        <button className="gridButton">Dermatology</button>
      </div>

      <div className="Row2">
      
        <button className="gridButton">Emergency Medicine</button>
        <button className="gridButton">Family Practice</button>
        <button className="gridButton">Gastroenterology</button>
        <button className="gridButton">General Surgery</button>
        <button className="gridButton">Neurology</button>
      </div>
    
      <div className="Row3">
      
        <button className="gridButton">Pain Management</button>
        <button className="gridButton">Pediatric Medicine</button>
        <button className="gridButton">Physical Medicine</button>
        <button className="gridButton">Physical Therapist</button>
        <button className="gridButton">Physician</button>
      </div>

      <div className="Row4">
      
      <button className="gridButton">Psychiatry</button>
      <button className="gridButton"> Clincal Psychologist</button>
      <button className="gridButton">Sleep Medicine</button>
      <button className="gridButton">Sports Medicine</button>
      <button className="gridButton">Urology</button>
    </div>
    </div>
    <img 
        className = "buttonImage"
        src = {Button}
        alt = ""
    /> 
    </div>
  )
}

export default costEstimator