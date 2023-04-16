// src/App.js

import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import Repo from './components/Repo';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route index element={<Home />}/>
          <Route path="/about" element={<About />} />
          <Route path="/repo" element={<Repo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
