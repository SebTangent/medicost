import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/homeScreen";
import CostScreen from "./screens/costEstimator";


function App() {
  return (
    <div className = "App"> 
    <BrowserRouter>
  
        <Routes>
        
        <Route path = "/" element = { <HomeScreen /> }/>
        <Route path = "/CostEstimator" element = { <CostScreen /> }/>


        </Routes>

    </BrowserRouter>
      
    
    
    </div>
  )
}

export default App