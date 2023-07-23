import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Home from './components/Home.tsx';
import About from './components/About.tsx';

function App() {
  return (
    <>
    
    <Router>
    <Navbar />
        <Routes>
          <Route exact path="/" element={<Home/> }/>
          <Route exact path="/about" element={<About/> }/>
        </Routes>
        </Router>
    
    </>
  );
}

export default App;
