import React from "react";
import MinNote from "./MinNote";
import { useState, useEffect } from "react";
import '../styles/notes_grid.css'

function NotesGrid(props) {

    const [savedNotes, setSavedNotes] = useState(props.notes);

    useEffect(() => {
        let savedArr = props.notes;
        setSavedNotes([...savedArr]);
    }, [savedNotes])

        return(  
            <div className="notes-grid">
                {savedNotes.map((note, idx) =>{
                    return(
                        <MinNote note={note} key={idx} notes={props.notes}/>
                    )
                })}
            </div>
            )
    }
  

export default NotesGrid;