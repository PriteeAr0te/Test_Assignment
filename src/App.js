
import React ,{ useEffect} from 'react';
import './App.css';
import Sidebar from './Components/Sidebar';
import Home from './Components/Home';
import DataState from './Context/Data/dataState';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EndYear from './Components/EndYear';
import Sectors from './Components/Sectors';
import Regions from './Components/Regions';
import Pest from './Components/Pest';
import Sources from './Components/Sources';
import Swot from './Components/Swot';
import Countries from './Components/Countries';
import Topics from './Components/Topics';

function App() {

  return (
      <div className="grid-container">
          <DataState>
              <BrowserRouter>
                  <Sidebar/>
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/endyear" element={<EndYear />} />
                      <Route path="/topics" element={<Topics />} />
                      <Route path="/sectors" element={<Sectors />} />
                      <Route path="/regions" element={<Regions />} />
                      <Route path="/pest" element={<Pest />} />
                      <Route path="/sources" element={<Sources />} />
                      <Route path="/swot" element={<Swot />} />
                      <Route path="/countries" element={<Countries />} />
                  </Routes>
              </BrowserRouter>
          </DataState>
      </div>
  );
}


export default App;
