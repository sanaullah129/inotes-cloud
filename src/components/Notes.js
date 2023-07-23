import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext.js';
import Noteitem from './Noteitem.js';


function Notes () {
  const context = useContext(NoteContext);
  const {notes, setNotes} = context;
  return (
      <div className="row my-3">
      <h3>Your Notes</h3>
      {notes.map((note)=>{
        return <Noteitem  key={note._id} note={note}/>;
      })}
    </div>
  )
}

export default Notes
