import React from 'react';
import "./comparePrices.css";
import Nav from "../nav";
import CompareHeader from "../images/priceComparison.jpg"
import CompareSearch from "../images/compareSearch.jpg";
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
        <div className= "compareSeach">
            <img 
            className = "compareSearchmg"
            src = {CompareSearch}
            alt = ""
            />
            <div className = "compareSearchdesc">
        <h5>Compare Prices</h5>
            <h2>Search for a Medical Procedure</h2>
            <h5>Feel free to utilize the search bar below to access cost estimates for a wide range of medical procedures. We'll promptly provide you with information on the three most affordable procedures and the 
                three most expensive ones within your search results.
            </h5>
            <input type="text" className="searchBar" 
        placeholder="Search by Keyword ▶"  />
            </div>
            
        </div>
        <div className = "compareButton">
        <div className='button-desc'>
    <h5>Compare Prices</h5>
    <h2>Medical Procedures</h2>
    <h4 >Press any of the buttons to learn more about Procedure Costs </h4>
    </div>
  
    <div className="Row1">
        
      
        <button className="gridButton" onClick={()=>handleButtonClick("Addiction Medicine")}>Addiction Medicine</button>
        <button className="gridButton"onClick={()=>handleButtonClick("Anesthesiology")}>Anesthesiology</button>
        <button className="gridButton"onClick={()=>handleButtonClick("Cardiology")}>Cardiology</button>
        <button className="gridButton"onClick={()=>handleButtonClick("Dentist")}>Dentist</button>
        <button className="gridButton"onClick={()=>handleButtonClick("Dermatology")}>Dermatology</button>
      </div>

      <div className="Row2">
      
        <button className="gridButton" onClick={()=>handleButtonClick("Emergency Medicine")}>Emergency Medicine</button>
        <button className="gridButton" onClick={()=>handleButtonClick("Family Practice")}>Family Practice</button>
        <button className="gridButton" onClick={()=>handleButtonClick("Gastroenterology")}>Gastroenterology</button>
        <button className="gridButton" onClick={()=>handleButtonClick("General Surgery")}>General Surgery</button>
        <button className="gridButton" onClick={()=>handleButtonClick("Neurology")}>Neurology</button>
      </div>
    
      <div className="Row3">
      
        <button className="gridButton" onClick={()=>handleButtonClick("Pain Management")}>Pain Management</button>
        <button className="gridButton" onClick={()=>handleButtonClick("Pediatric Medicine")}>Pediatric Medicine</button>
        <button className="gridButton" onClick={()=>handleButtonClick("Physical Medicine")}>Physical Medicine</button>
        <button className="gridButton" onClick={()=>handleButtonClick("Physical Therapist")}>Physical Therapist</button>
        <button className="gridButton" onClick={()=>handleButtonClick("Physician")}>Physician</button>
      </div>

      <div className="Row4">
      
      <button className="gridButton" onClick={()=>handleButtonClick("Psychiatry")}>Psychiatry</button>
      <button className="gridButton" onClick={()=>handleButtonClick("Clincal Psychologist")}> Clincal Psychologist</button>
      <button className="gridButton" onClick={()=>handleButtonClick("Sleep Medicine")}>Sleep Medicine</button>
      <button className="gridButton" onClick={()=>handleButtonClick("Sports Medicine")}>Sports Medicine</button>
      <button className="gridButton"onClick={()=>handleButtonClick("Urology")}>Urology</button>
    </div>








        </div>
   </div>
  )
}

export default comparePrices