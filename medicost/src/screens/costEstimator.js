import React, { useState } from 'react';
import "./costEstimator.css";
import Nav from "../nav";
import Picture from "../images/costEstimatorPic.jpg"
import Search from "../images/search.jpg"
import Button from "../images/buttons.jpg"


function CostEstimator() {
    const [showModal, setShowModal] = useState(false);
    const [stateCode, setStateCode] = useState("");
    const [selectedTreatment, setSelectedTreatment] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    function handleButtonClick(treatment) {
        setSelectedTreatment(treatment);
        setShowModal(true);
      }


  function handleSearch(e) {
            // Simulated database of medical procedures
        const database = [
            "Addiction Medicine",
            "Anesthesiology",
            "Cardiology",
            "Dentist",
            "Dermatology",
            "Emergency Medicine",
            "Family Practice",
            "Gastroenterology",
            "General Surgery",
            "Neurology",
            "Pain Management",
            "Pediatric Medicine",
            "Physical Medicine",
            "Physical Therapist",
            "Physician",
            "Psychiatry",
            "Clinical Psychologist",
            "Sleep Medicine",
            "Sports Medicine",
            "Urology"
        ]
        
        
        // Store the search query from the event object (e)
        const query = e.target.value;
        setSearchQuery(query);
        
        // Check if query exists in our simulated database
        if (database.includes(query)) {
            // Clear any existing error messages
            setErrorMessage(null);
            
            // Show modal to prompt for State (We already have setShowModal from before)
            setShowModal(true);
        } else {
            // If query doesn't exist, set an error message
            setShowModal(false);
            setErrorMessage("Procedure not found. Please try again.");
        }
  }

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
        <input type="text" className="searchBar" 
        placeholder="Search by Keyword ▶" 
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)} />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
       
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
        
      
        <button className="gridButton" onClick={()=>handleButtonClick("Addiction_Medicine")}>Addiction Medicine</button>
        <button className="gridButton"onClick={()=>handleButtonClick("Anesthesiology")}>Anesthesiology</button>
        <button className="gridButton"onClick={()=>handleButtonClick("Cardiology")}>Cardiology</button>
        <button className="gridButton"onClick={()=>handleButtonClick("Dentist")}>Dentist</button>
        <button className="gridButton"onClick={()=>handleButtonClick("Dermatology")}>Dermatology</button>
      </div>

      <div className="Row2">
      
        <button className="gridButton" onClick={()=>handleButtonClick("Emergency_Medicine")}>Emergency Medicine</button>
        <button className="gridButton" onClick={()=>handleButtonClick("Family_Practice")}>Family Practice</button>
        <button className="gridButton" onClick={()=>handleButtonClick("Gastroenterology")}>Gastroenterology</button>
        <button className="gridButton" onClick={()=>handleButtonClick("General_Surgery")}>General Surgery</button>
        <button className="gridButton" onClick={()=>handleButtonClick("Neurology")}>Neurology</button>
      </div>
    
      <div className="Row3">
      
        <button className="gridButton" onClick={()=>handleButtonClick("Pain_Management")}>Pain Management</button>
        <button className="gridButton" onClick={()=>handleButtonClick("Pediatric_Medicine")}>Pediatric Medicine</button>
        <button className="gridButton" onClick={()=>handleButtonClick("Physical_Medicine")}>Physical Medicine</button>
        <button className="gridButton" onClick={()=>handleButtonClick("Physical Therapist")}>Physical Therapist</button>
        <button className="gridButton" onClick={()=>handleButtonClick("Physician")}>Physician</button>
      </div>

      <div className="Row4">
      
      <button className="gridButton" onClick={()=>handleButtonClick("Psychiatry")}>Psychiatry</button>
      <button className="gridButton" onClick={()=>handleButtonClick("Clincal Psychologist")}> Clincal Psychologist</button>
      <button className="gridButton" onClick={()=>handleButtonClick("Sleep_Medicine")}>Sleep Medicine</button>
      <button className="gridButton" onClick={()=>handleButtonClick("Sports_Medicine")}>Sports Medicine</button>
      <button className="gridButton"onClick={()=>handleButtonClick("Urology")}>Urology</button>
    </div>
    </div>
    <img 
        className = "buttonImage"
        src = {Button}
        alt = ""
    /> 

{showModal && (
      <div className="modal">
        <h2>Enter your state</h2>
        <input type="text" placeholder="State" onChange={(e) => setStateCode(e.target.value)} />
        <button onClick={() => {
          // Implement your filtering logic here
          // setFilteredData( ... );
          setShowModal(false);
        }}>
          Confirm
        </button>
      </div>

  )}
    </div>
  );
}
export default CostEstimator;