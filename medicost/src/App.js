import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/homeScreen";
import CostScreen from "./screens/costEstimator";
import CompareScreen from "./screens/comparePrices";


function App() {
  return (
    <div className = "App"> 
    <BrowserRouter>
  
        <Routes>
        
        <Route path = "/" element = { <HomeScreen /> }/>
        <Route path = "/CostEstimator" element = { <CostScreen /> }/>
        <Route path  = "/ComparePrices" element = { <CompareScreen /> }/>


        </Routes>

    </BrowserRouter>
      
    
    
    </div>
  )
}

export default App