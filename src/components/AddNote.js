import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext.js';


function AddNote() { 

    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setnote] = useState({title: "", description: "", tag:""});
    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    };
  return (
    <div className='container my-3'>
      <h3>Add a Notes</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
        </div>
        <div className="mb-2">
          <label htmlFor="tag" className="form-label">Tags</label>
          <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Add Note</button>
      </form>
    </div>
  )
}

export default AddNote
