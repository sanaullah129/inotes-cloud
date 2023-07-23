import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Home from './components/Home.js';
import About from './components/About.js';
import NoteState from './context/notes/NoteState.js';

function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home/> }/>
          <Route exact path="/about" element={<About/> }/>
        </Routes>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
