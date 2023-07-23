import React, { useContext, useEffect } from 'react';
import NoteContext from '../context/notes/NoteContext.js';

function About() {
  const a = useContext(NoteContext);
  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      About {a.state.name} {a.state.class}
    </div>
  )
}

export default About
