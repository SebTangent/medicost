import React from 'react';
import "./homeScreen.css";
import Nav from "../nav.js"
import homeScreenImg from "../images/homeScreen.jpg"
import homeBodyImg from "../images/homeBody1.jpg"
import costpic from "../images/costest.jpg"
import pricecomp from "../images/priceComp.jpg"
import mappic from "../images/maps.jpg"
import service from "../images/services.jpg"

function homeScreen() {
  return (
    <div className ="homeScreen">
        <Nav />
        <div className="homeScreenBanner">
          <div className="homeScreenWrapper"> {/* New wrapper */}
            <img 
              className="homeScreenImage"
              src={homeScreenImg}
              alt=""
            />
            <div className="homeScreenDescription">
              <h5>ABOUT US</h5>
              <h1>Health Care Transparency</h1>
              <h5 className ="des">MediCost, a trailblazing health app company, offers users a unique experience by providing transparency in healthcare through the simple click of a 'Learn More' button.</h5>
              <button className="homeScreenButton">
                Learn More →
              </button>
            </div>

            <div className ="homeScreenBody2"> 
              <img 
              className = "homeBodyImg1"
              src = {homeBodyImg}
              alt =""    
              />
              <div className = "homeBody1description"> 
              <h5>FEATURES</h5>
              <h1>What do we do ?</h1>
              <ul className = "Features">
              <h5>• Transparent Cost Information: Easily search and access comprehensive cost ranges and averages for various medical procedures based on procedure type and zip code. 🔎</h5>
              <h5>• Affordable Location Recommendations: Discover the most affordable healthcare service providers and facilities near your location, ensuring you receive quality care at the best possible prices. </h5>
              <h5>• Personalized Cost Planning: Plan ahead and estimate your healthcare expenses by accessing cost breakdowns, identifying potential savings, and understanding the financial implications of different procedures. 💵</h5>
              </ul>
              </div>
            </div>

            <div className = "serviceTitle">

            <img
              className ="serviceImg"
              src = {service}
              alt = ""
            />

            <div className = "serviceDes">
                <h2>Services</h2>
                <ul>
                <h5> Read Below for a preview of our services </h5>
                <h1 className ="arrow">⤵</h1>
                </ul>
            </div>
            </div>

            <div className = "homeScreenServices">
            <div className= "costEst">
              <img  
              className = "CostEstimator" 
              src = {costpic}
              alt = ""/>
              <div className = "CostDesc">
              <h5>SERVICES</h5>
              <h1>Cost Estimator</h1>
              <h5 className ="costDesciption">Our Cost Estimator feature allows you to easily access comprehensive cost ranges and averages for various medical procedures based on procedure type and location. You can plan ahead and estimate your healthcare expenses, making informed decisions about your medical treatments.</h5>
              <button className = "CostEstButton"> 
              Cost Estimator →
              </button>

                </div>
              </div>
              <div className="compPrice">
                <img
                className ="Pricecomp"
                src={pricecomp}
                alt = ""
                />
                <div className ="comPrice__desc">
                <h5>SERVICES</h5>
                <h1>Compare Prices </h1>
                <h5 className ="compDesciption">With our Price Comparison tool, you can compare prices for medical services offered by different healthcare providers. This feature helps you find the most affordable options while ensuring quality care, allowing you to make cost-effective choices for your healthcare needs.</h5>
                <button className = "compButton"> 
                Compare Prices →
                </button>

                </div>
              </div>

              <div className="locations">
                <img
                className ="maps-pic"
                src={mappic}
                alt = ""
                />
                <div className ="location__desc">
                <h5>SERVICES</h5>
                <h1>Locations </h1>
                <h5 className ="locationDesciption">The Location feature helps you discover healthcare service providers and facilities near your location. You can find affordable and convenient options for medical treatments, ensuring that you receive quality care without having to travel far.</h5>
                <button className = "locationButton"> 
                Locations →
                </button>

                </div>
              </div>

            </div>

          </div>
        </div>
    </div>
  );
}

export default homeScreen;
