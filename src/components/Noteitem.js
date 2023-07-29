import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext.js';


function Noteitem(props) {
    const context = useContext(NoteContext);
    const {deleteNote} = context;
    const { note, updateNote } = props;
    
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <h6 className="card-text">{note.description}</h6>
                    <p className="card-text">{note.tag}</p>
                    <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                    <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully", "danger")}}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
