import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext.js';


function AddNote(props) { 

    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setnote] = useState({title: "", description: "", tag:""});
    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setnote({title: "", description: "", tag:""});
        props.showAlert("Added Successfully", "success");
    };
  return (
    <div className='container my-3'>
      <h3>Add a Notes</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={3} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={8} required />
        </div>
        <div className="mb-2">
          <label htmlFor="tag" className="form-label">Tags</label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
        </div>
        <button disabled={note.title.length<3 || note.description.length<8} type="submit" className="btn btn-primary" onClick={handleSubmit}>Add Note</button>
      </form>
    </div>
  )
}

export default AddNote
