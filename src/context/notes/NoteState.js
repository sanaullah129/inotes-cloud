import React, { useState } from "react";
import NoteContext from "./NoteContext.js";

const NoteState = (props)=> {

    const notesInitial =[
            {
              "_id": "64bc26b02eecc55ce11b828b",
              "user": "64bc031672a86a4f41b37758",
              "title": "New Note",
              "description": "Some description",
              "tag": "personal",
              "date": "2023-07-22T18:57:52.706Z",
              "__v": 0
            },
            {
              "_id": "64bc26bb2eecc55ce11b828d",
              "user": "64bc031672a86a4f41b37758",
              "title": "My second note",
              "description": "Testing the note update feature.",
              "tag": "General",
              "date": "2023-07-22T18:58:03.157Z",
              "__v": 0
            },
            {
              "_id": "64bd5d5a8de13e374bf6cb25",
              "user": "64bc031672a86a4f41b37758",
              "title": "Sample note 3",
              "description": "Some sample note",
              "tag": "General",
              "date": "2023-07-23T17:03:22.410Z",
              "__v": 0
            }
          ]
    
    const [notes, setNotes] = useState(notesInitial)    

    return(
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children};
        </NoteContext.Provider>
    )
}

export default NoteState;