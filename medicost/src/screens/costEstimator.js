import React, { useState } from 'react';
import Papa from 'papaparse';
import "./costEstimator.css";
import Nav from "../nav";
import Picture from "../images/costEstimatorPic.jpg"
import Search from "../images/search.jpg"
import Button from "../images/buttons.jpg"




const stateZipCodeRanges = {
    'AK': { min: 99501, max: 99950 },
    'AL': { min: 35004, max: 36925 },
    'AR': { min: 71601, max: 72959 },
    'AZ': { min: 85001, max: 86556 },
    'CA': { min: 90001, max: 96162 },
    'CO': { min: 80001, max: 81658 },
    'CT': { min: 6001, max: 6928 },
    'DC': { min: 20001, max: 20799 },
    'DE': { min: 19701, max: 19980 },
    'FL': { min: 32004, max: 34997 },
    'GA': { min: 30001, max: 39901 },
    'HI': { min: 96701, max: 96898 },
    'IA': { min: 50001, max: 68120 },
    'ID': { min: 83201, max: 83876 },
    'IL': { min: 60001, max: 62999 },
    'IN': { min: 46001, max: 47997 },
    'KS': { min: 66002, max: 67954 },
    'KY': { min: 40003, max: 42788 },
    'LA': { min: 70001, max: 71497 },
    'MA': { min: 1001, max: 5544 },
    'MD': { min: 20331, max: 21930 },
    'ME': { min: 3901, max: 4992 },
    'MI': { min: 48001, max: 49971 },
    'MN': { min: 55001, max: 56763 },
    'MO': { min: 63001, max: 65899 },
    'MS': { min: 38601, max: 71233 },
    'MT': { min: 59001, max: 59937 },
    'NC': { min: 27006, max: 28909 },
    'ND': { min: 58001, max: 58856 },
    'NE': { min: 68001, max: 69367 },
    'NH': { min: 3031, max: 3897 },
    'NJ': { min: 7001, max: 8989 },
    'NM': { min: 87001, max: 88441 },
    'NV': { min: 88901, max: 89883 },
    'NY': { min: 10001, max: 14975 },
    'OH': { min: 43001, max: 45999 },
    'OK': { min: 73001, max: 74966 },
    'OR': { min: 97001, max: 97920 },
    'PA': { min: 15001, max: 19640 },
    'PR': { min: 0, max: 0 },
    'RI': { min: 2801, max: 2940 },
    'SC': { min: 29001, max: 29948 },
    'SD': { min: 57001, max: 57799 },
    'TN': { min: 37010, max: 38589 },
    'TX': { min: 73301, max: 88589 },
    'UT': { min: 84001, max: 84784 },
    'VA': { min: 20040, max: 24658 },
    'VT': { min: 5001, max: 5907 },
    'WA': { min: 98001, max: 99403 },
    'WI': { min: 53001, max: 54990 },
    'WV': { min: 24701, max: 26886 },
    'WY': { min: 82001, max: 83128 },
  };
  // Makes Sure the Zip Codes that have 4 have the 0 to start with 
  Object.keys(stateZipCodeRanges).forEach(state => {
    stateZipCodeRanges[state].min = stateZipCodeRanges[state].min.toString().padStart(5, '0');
    stateZipCodeRanges[state].max = stateZipCodeRanges[state].max.toString().padStart(5, '0');
  });
  
  
function CostEstimator() {
    const [showModal, setShowModal] = useState(false);
    const [stateCode, setStateCode] = useState("");
    const [selectedTreatment, setSelectedTreatment] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    
    const stateNameToCode = {
        'Alabama': 'AL',
        'Alaska': 'AK',
        'Arizona': 'AZ',
        'Arkansas': 'AR',
        'California': 'CA',
        'Colorado': 'CO',
        'Connecticut': 'CT',
        'Delaware': 'DE',
        'Florida': 'FL',
        'Georgia': 'GA',
        'Hawaii': 'HI',
        'Idaho': 'ID',
        'Illinois': 'IL',
        'Indiana': 'IN',
        'Iowa': 'IA',
        'Kansas': 'KS',
        'Kentucky': 'KY',
        'Louisiana': 'LA',
        'Maine': 'ME',
        'Maryland': 'MD',
        'Massachusetts': 'MA',
        'Michigan': 'MI',
        'Minnesota': 'MN',
        'Mississippi': 'MS',
        'Missouri': 'MO',
        'Montana': 'MT',
        'Nebraska': 'NE',
        'Nevada': 'NV',
        'New Hampshire': 'NH',
        'New Jersey': 'NJ',
        'New Mexico': 'NM',
        'New York': 'NY',
        'North Carolina': 'NC',
        'North Dakota': 'ND',
        'Ohio': 'OH',
        'Oklahoma': 'OK',
        'Oregon': 'OR',
        'Pennsylvania': 'PA',
        'Rhode Island': 'RI',
        'South Carolina': 'SC',
        'South Dakota': 'SD',
        'Tennessee': 'TN',
        'Texas': 'TX',
        'Utah': 'UT',
        'Vermont': 'VT',
        'Virginia': 'VA',
        'Washington': 'WA',
        'West Virginia': 'WV',
        'Wisconsin': 'WI',
        'Wyoming': 'WY'
      };
      
    const validStateCodes = Object.values(stateNameToCode);
    const validStateNames = Object.keys(stateNameToCode);

    const normalizeInput = (input) => input.trim().toLowerCase().replace(/\s+/g, ' ');

    const isStateValid = (input) => {
    const normalizedInput = normalizeInput(input);
    return validStateCodes.map(code => code.toLowerCase()).includes(normalizedInput) || 
            validStateNames.map(name => normalizeInput(name)).includes(normalizedInput);
    };

    function handleConfirm(){
        if (isStateValid(stateCode)) {
            // State code or name is valid, proceed with the rest of the logic
            // You can add code to filter data based on state or whatever else you need
            filterDataBasedOnState(stateCode);
            setShowModal(false);
          } else {
            setErrorMessage('Invalid state. Please try again.');
          }
        
    }


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
        ];
      
        // Store the search query from the event object (e)
        const query = e.target.value;
      
        // Normalize the search query
        const normalizedQuery = query.trim().toLowerCase();
      
        // Store the search query
        setSearchQuery(query);
      
        // Check if query exists in our simulated database, normalize the data
        if (database.some(procedure => procedure.toLowerCase() === normalizedQuery)) {
          // Clear any existing error messages
          setErrorMessage(null);
          handleButtonClick(query);
        } else {
          // If query doesn't exist, set an error message
          setShowModal(false);
          setErrorMessage("Procedure not found. Please try again.");
        }
      }
      

      function filterDataBasedOnState(stateCode) {
        let sumAndCount = {
            min_medicare_pricing_for_new_patient: {sum: 0, count: 0},
            max_medicare_pricing_for_new_patient: {sum: 0, count: 0},
            mode_medicare_pricing_for_new_patient: {sum: 0, count: 0},
            min_copay_for_new_patient: {sum: 0, count: 0},
            max_copay_for_new_patient: {sum: 0, count: 0},
            mode_copay_for_new_patient: {sum: 0, count: 0},
            min_medicare_pricing_for_established_patient: {sum: 0, count: 0},
            max_medicare_pricing_for_established_patient: {sum: 0, count: 0},
            mode_medicare_pricing_for_established_patient: {sum: 0, count: 0},
            min_copay_for_established_patient: {sum: 0, count: 0},
            max_copay_for_established_patient: {sum: 0, count: 0},
            mode_copay_for_established_patient: {sum: 0, count: 0}

        }

        // Make sure the state code is valid
        if (!isStateValid(stateCode)) { // Assuming you have isStateValid function
          console.error("Invalid State Code Provided");
          return;
        }
      
        // Open the CSV file based on the state && procedure type then produce the average of each row based on the state zip code
        const normalizedTreatment = selectedTreatment.toLowerCase();
        const filePath = `./costdataset/${normalizedTreatment}.csv`; // Use backticks for string interpolation
        
        // Rest of your code
        const zipRange = stateZipCodeRanges[stateCode]; // Assuming stateZipCodeRanges is a valid object with state codes as keys
      
        if (!zipRange) {
          console.error("Invalid Zip Range for the provided State Code");
        }

        fetch(filePath)
        .then(response => response.text())
        .then(csvString => {
            Papa.parse(csvString, {
                header: true,
                dynamicTyping: true,
                complete: function(results) {
                    console.log("Parsed CSV data:", results.data);
    
                    // Loop through only the ZIP code range for the state
                    for (let zipCode = zipRange.min; zipCode <= zipRange.max; zipCode++) {
                        // Find corresponding data for this ZIP code
                        const relevantRows = results.data.filter(row => {
                            const rowZipCode = parseInt(row['zip_code'], 10);
                            return rowZipCode === zipCode;
                        });
    
                        // Process the relevant rows
                        relevantRows.forEach(row => {
                            for (const column in sumAndCount) {
                                if (row[column] != null) {
                                    sumAndCount[column].sum += row[column];
                                    sumAndCount[column].count++;
                                }
                            }
                        });
                    }
    
                    let averages = {};
                    for (const column in sumAndCount) {
                        if (sumAndCount[column].count > 0) {
                            averages[column] = sumAndCount[column].sum / sumAndCount[column].count;
                        } else {
                            averages[column] = 0;
                        }
                    }
    
                    console.log("Averages:", averages);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching or parsing CSV:', error);
        });
    
      
        console.log(normalizedTreatment);
        console.log(filePath);
        console.log(zipRange);
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
        
      
        <button className="gridButton" onClick={()=>handleButtonClick("AddictionMedicine")}>Addiction Medicine</button>
        <button className="gridButton"onClick={()=>handleButtonClick("Anesthesiology")}>Anesthesiology</button>
        <button className="gridButton"onClick={()=>handleButtonClick("Cardiology")}>Cardiology</button>
        <button className="gridButton"onClick={()=>handleButtonClick("Dentist")}>Dentist</button>
        <button className="gridButton"onClick={()=>handleButtonClick("Dermatology")}>Dermatology</button>
      </div>

      <div className="Row2">
      
        <button className="gridButton" onClick={()=>handleButtonClick("Emergency_Medicine")}>Emergency Medicine</button>
        <button className="gridButton" onClick={()=>handleButtonClick("FamilyPractice")}>Family Practice</button>
        <button className="gridButton" onClick={()=>handleButtonClick("Gastroenterology")}>Gastroenterology</button>
        <button className="gridButton" onClick={()=>handleButtonClick("General_Surgery")}>General Surgery</button>
        <button className="gridButton" onClick={()=>handleButtonClick("Neurology")}>Neurology</button>
      </div>
    
      <div className="Row3">
      
        <button className="gridButton" onClick={()=>handleButtonClick("Pain_Management")}>Pain Management</button>
        <button className="gridButton" onClick={()=>handleButtonClick("PediatricMedicine")}>Pediatric Medicine</button>
        <button className="gridButton" onClick={()=>handleButtonClick("PhysicalMedicine")}>Physical Medicine</button>
        <button className="gridButton" onClick={()=>handleButtonClick("PhysicalTherapist")}>Physical Therapist</button>
        <button className="gridButton" onClick={()=>handleButtonClick("Physician")}>Physician</button>
      </div>

      <div className="Row4">
      
      <button className="gridButton" onClick={()=>handleButtonClick("Psychiatry")}>Psychiatry</button>
      <button className="gridButton" onClick={()=>handleButtonClick("ClincalPsychologist")}> Clincal Psychologist</button>
      <button className="gridButton" onClick={()=>handleButtonClick("SleepMedicine")}>Sleep Medicine</button>
      <button className="gridButton" onClick={()=>handleButtonClick("SportsMedicine")}>Sports Medicine</button>
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
        <h6>Cost Estimator</h6>
        <h5>Procedure: {selectedTreatment} </h5> 
        <h2>Enter your States Abbreviation :</h2>
        <input type="text" placeholder="State" onChange={(e) => setStateCode(e.target.value)} />
        <button onClick={handleConfirm}>
          Confirm
        </button>

      </div>

  )}
    </div>
  );
}
export default CostEstimator;