import React from "react";
import MinNote from "./MinNote";
import { useState, useEffect } from "react";
import '../styles/notes_grid.css'

/* eslint-disable no-unused-expressions */

function NotesGrid(props) {

    const [savedNotes, setSavedNotes] = useState([]);

    const [erasedNote, setErasedNote] = useState(false);

    useEffect(() => {
        setErasedNote(false)
        let savedArr = props.notes;
        setSavedNotes(savedArr);
    }, [erasedNote, setSavedNotes]);

        return(  
            <div className="notes-grid">
                {props.notes.map((note, idx) =>{
                    return(
                        <MinNote note={note} key={idx} notes={savedNotes} set={setErasedNote} addOrRemoveFav={props.addOrRemoveFav} favs={props.favs}/>
                        )
                })}
            </div>
            )
    }
  

export default NotesGrid;