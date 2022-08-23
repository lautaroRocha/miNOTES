import React from "react";
import MinNote from "./MinNote";
import { useState, useEffect } from "react";
import '../styles/notes_grid.css'
import { collection, getFirestore, getDocs } from "firebase/firestore";
/* eslint-disable no-unused-expressions */

function NotesGrid(props) {

    const [savedNotes, setSavedNotes] = useState([]);

    const [erasedNote, setErasedNote] = useState(false);

    useEffect(() => {
        setErasedNote(false)
        const db = getFirestore();
        const notesColl = collection(db, 'notes');
        getDocs(notesColl).then((item) => {
            let savedArr  = item.docs.map((note) => note.data())
            setSavedNotes(savedArr);
        }), [erasedNote, savedNotes] });


        return(  
            <div className="notes-grid">
                {savedNotes.map((note, idx) =>{
                    return(
                        <MinNote note={note} key={idx} notes={props.notes} set={setErasedNote} addOrRemoveFav={props.addOrRemoveFav} favs={props.favs}/>
                        )
                })}
            </div>
            )
    }
  

export default NotesGrid;