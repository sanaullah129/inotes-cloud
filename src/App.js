import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Home from './components/Home.js';
import About from './components/About.js';
import NoteState from './context/notes/NoteState.js';
import Alert from './components/Alert.js';

function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        <Alert message="Sample message"/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home/> }/>
            <Route exact path="/about" element={<About/> }/>
          </Routes>
        </div>
        
      </Router>
    </NoteState>
    </>
  );
}

export default App;
