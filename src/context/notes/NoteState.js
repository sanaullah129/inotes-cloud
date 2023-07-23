import React, { useState } from "react";
import NoteContext from "./NoteContext.js";

const NoteState = (props)=> {
    const s1 = {
        "name": "Sana",
        "class": "5th",
    }
    const [state, setstate] = useState(s1);
    const update = ()=>{
        setTimeout(() => {
            setstate({
                "name": "Sanaullah",
                "class": "5th",
            })
        }, 10000);
    };
    return(
        <NoteContext.Provider value={{state, update}}>
            {props.children};
        </NoteContext.Provider>
    )
}

export default NoteState;