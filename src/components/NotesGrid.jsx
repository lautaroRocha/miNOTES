import React from "react";
import MinNote from "./MinNote";
import { useState, useEffect } from "react";
import '../styles/notes_grid.css'

function NotesGrid(props) {

    const [savedNotes, setSavedNotes] = useState(props.notes);
    const [erasedNote, setErasedNote] = useState(false);

    useEffect(() => {
        let savedArr = props.notes;
        setSavedNotes([...savedArr]);
    }, [erasedNote, props.notes])

        return(  
            
            <div className="notes-grid">
                {savedNotes.map((note, idx) =>{
                    return(
                        <MinNote note={note} key={idx} notes={props.notes} set={setErasedNote} addOrRemoveFav={props.addOrRemoveFav}/>
                    )
                })}
            </div>
            )
    }
  

export default NotesGrid;