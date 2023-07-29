import React from 'react';
import Notes from './Notes.js';



function Home(props) {
  const {showAlert} = props;
  return (
    <>
    
    <Notes showAlert={showAlert} />
    </>
  )
}

export default Home
