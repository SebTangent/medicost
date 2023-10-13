import React, {useState, useEffect} from 'react';
import Papa from 'papaparse';
import "./comparePrices.css";
import Nav from "../nav";
import CompareHeader from "../images/priceComparison.jpg"
import CompareSearch from "../images/compareSearch.jpg";


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

function ComparePrices() {
    const [selectedTreatment, setSelectedTreatment] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [searchError, setSearchError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showResult , setShowResult] = useState(false);
    const [stateCode, setStateCode] = useState("");
    const [stateOne , setStateOne] = useState("");
    const [stateTwo , setStateTwo] = useState("");
    const [stateThree , setStateThree] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [zipCode, setZipCode] = useState("");




    const [results, setResults] = useState({});
    const [resultsState1, setResultsState1] = useState(null);
    const [resultsState2, setResultsState2] = useState(null);
    const [resultsState3, setResultsState3] = useState(null);



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


    const isStateValid = (input) =>{
        const normalizedInput = normalizeInput(input);
        return validStateCodes.map(code => code.toLowerCase()).includes(normalizedInput) || 
                validStateNames.map(name => normalizeInput(name)).includes(normalizedInput);
    };
   



    function handleButtonClick(treatment) {
        setSelectedTreatment(treatment); 
        setShowModal(true);
        setErrorMessage(null);
    }

    function handleSearch(e) {
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

          const query = e.target.value;
          const normalizedQuery = query.trim().toLowerCase()
          const matchingProcedures = database.filter(procedure => procedure.toLowerCase().includes(normalizedQuery));


          if (matchingProcedures.length > 0) {
            // Clear any existing error messages
            handleButtonClick(query); // If you intend to use the first matching procedure, replace 'query' with 'matchingProcedures[0]'
            
        } else {
            // If no matching procedures found, set an error message
            setShowModal(false);
            setSearchError("Procedure not found. Please try again.");
        }
    }

        async function handleConfirmcompare(stateOne, stateTwo, stateThree) {
            try {
                if(!selectedTreatment){
                    console.log("treatment was not passed")
                }

                console.log(selectedTreatment)
                console.log(stateOne)
                console.log(stateTwo)
                console.log(stateThree)


                console.log( stateOne, isStateValid(stateOne) );
                console.log( stateTwo, isStateValid(stateTwo) );
                console.log( stateThree, isStateValid(stateThree) );

                await processSingleState(stateOne, selectedTreatment);
                await processSingleState(stateTwo, selectedTreatment);
                await processSingleState(stateThree, selectedTreatment);



              
                
                setShowModal(false);
                setShowResult(true);
            } catch (error) {
                setErrorMessage('An error occurred while processing. Please try again.');
            }
        }

        function setResultFunction(newResult) {
            setResults(prevResults => ({
                ...prevResults,  // This spreads the existing state (previous results)
                ...newResult     // This spreads and merges the new results into the state
            }));
        }
        

        async function processSingleState(stateInput , treatment) {
            if (!isStateValid(stateInput)) {
                console.error('Invalid state provided');
                setErrorMessage('Invalid state. Please try again.');
                return null;
            }

           
        
            const stateCode = stateNameToCode[stateInput] || stateInput;
            const averages = await filterDataByState(stateCode); 
            console.log("THIS IS THE STATECODE : " , stateCode);
    

            console.log('Averages from filterDataByState:', averages);
                
            const avgMedicarePriceNew = (averages['min_medicare_pricing_for_new_patient'] + averages['max_medicare_pricing_for_new_patient']) / 2;
            const avgCoPayNew = (averages['min_copay_for_new_patient'] + averages['max_copay_for_new_patient']) / 2;
            const avgMedicarePriceEstablished = (averages['min_medicare_pricing_for_established_patient'] + averages['max_medicare_pricing_for_established_patient']) / 2;
            const avgCoPayEstablished = (averages['min_copay_for_established_patient'] + averages['max_copay_for_established_patient']) / 2;
            

            let resultForState = {
                [stateCode]: {
                    avgMedicarePriceNew,
                    avgCoPayNew,
                    avgMedicarePriceEstablished,
                    avgCoPayEstablished
                }
            };


            setSelectedTreatment(treatment);
            setStateCode(stateCode);
            setResultFunction(resultForState);
            setShowResult(true);






            console.log(`${stateCode} Averages:`);
            console.log("Avg for New Patients with Medicare:", avgMedicarePriceNew);
            console.log("Co-Pay for New Patients Medicare:", avgCoPayNew);
            console.log("Avg for Established Patients with Medicare:", avgMedicarePriceEstablished);
            console.log("Co-Pay for Established Patients Medicare:", avgCoPayEstablished);
            console.log("---------");
        }

 

        function filterDataByState(zipCode){
            return new Promise((resolve, reject) =>{
            let sumAndCount = {
                
                sumAndCountsState1: {
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
                },
                sumAndCountsState2:{
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
                }, 
                sumAndCountsState3:{
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
            }
            console.log("State Code" , stateCode, "isStateValid : " , isStateValid(stateCode));
            console.log("Zip Code ", zipCode , "isStateValid: ", isStateValid(zipCode));
        



            if (!isStateValid(zipCode)) {
    
                console.error("Invalid State Code Provided");
                reject(new Error("Invalid State Code"));
                return;
            }

    
            const normalizedTreatment = selectedTreatment.replace(/\s+/g, '').toLowerCase();
            const filePath = `./costdataset/${normalizedTreatment}.csv`;

            console.log("THIS IS THE FILEPATH: ", filePath);
    
            const zipRange = stateZipCodeRanges[zipCode];

    
            console.log("Zip Range: " , zipRange) 
            if (!zipRange) {
                console.error("Invalid Zip Range for the provided State Code");
                reject(new Error("Invalid Zip Range"));
                return;
            }
    
            fetch(filePath)
                .then(response => response.text())
                .then(csvString => {
                    Papa.parse(csvString, {
                        header: true,
                        dynamicTyping: true,
                        complete: function(results) {
                            console.log("Parsed CSV data:", results.data);
    
                            for (let zipCode = zipRange.min; zipCode <= zipRange.max; zipCode++) {
                                const relevantRows = results.data.filter(row => parseInt(row['zip_code'], 10) === zipCode);
                                
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
                                averages[column] = (sumAndCount[column].count > 0) 
                                    ? sumAndCount[column].sum / sumAndCount[column].count 
                                    : 0;
                            }
    
                            console.log(`${stateCode} Averages:`, averages);
                            resolve(averages);
                        }
                    });
                })
                .catch(error => {
                    console.error('Error fetching or parsing CSV:', error);
                    reject(error);
                });
        });
        }
    

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
        placeholder="Search by Keyword ▶"  
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)} />
        {searchError && <p className = "searchErrorMsg">{searchError}</p>}

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


        {showModal && (
        <div className="overlay">
          <div className="modal">
            <h6>Cost Estimator</h6>
            <h2>Kindly provide the abbreviations for your states</h2>
            <h4>Enter your states' abbreviations below (e.g., 'CA' for California):</h4>
            <input
              type="text"
              placeholder="State 1"
              onChange={(e) => setStateOne(e.target.value.trim())}
            />
            <input
              type="text"
              placeholder="State 2"
              onChange={(e) => setStateTwo(e.target.value.trim())}
            />
            <input
              type="text"
              placeholder="State 3"
              onChange={(e) => setStateThree(e.target.value.trim())}
            />
            <button onClick={() => handleConfirmcompare(stateOne, stateTwo, stateThree)}>Confirm</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </div>
        </div>
      )}
      {showResult && (
            <div className="overlay">
                <div className="results-modal">
                    <h6>Cost Estimator</h6>
                    <h1>Results for {selectedTreatment}:</h1>

                    {Object.entries(results).map(([currentState, data]) => (
                        <div key={currentState}>
                            <h2>{currentState}:</h2>
                            
                            <h5>New Patients</h5>
                            <h4>The average for New Patients with Medicare is:</h4>
                            <h4> ~ ${data.avgMedicarePriceNew.toFixed(2)}</h4>
                            <h4>The Co-Pay for New Patients Medicare is:</h4>
                            <h4> ~ ${data.avgCoPayNew.toFixed(2)}</h4>

                            <h5>Established Patients</h5>
                            <h4>The average for Established Patients with Medicare is:</h4>
                            <h4> ~ ${data.avgMedicarePriceEstablished.toFixed(2)}</h4>
                            <h4>The Co-Pay for Established Patients with Medicare is:</h4>
                            <h4> ~ ${data.avgCoPayEstablished.toFixed(2)}</h4>
                        </div>
                    ))}

                    <button className="closeButton" onClick={() => setShowResult(false)}>Close</button>
                </div>
            </div>
        )}

    


    </div>

  );
};
export default ComparePrices;
