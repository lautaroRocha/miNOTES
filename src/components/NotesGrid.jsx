import React from "react";
import MinNote from "./MinNote";
import { useState, useEffect } from "react";
import '../styles/notes_grid.css'

function NotesGrid(props) {

    const [savedNotes, setSavedNotes] = useState([]);

    const [erasedNote, setErasedNote] = useState(false);

    useEffect(() => {
        setErasedNote(false)
        let savedArr = props.notes;
        setSavedNotes(savedArr);
    }, [erasedNote, savedNotes])

    const [favs, setFavs] = useState([]);
    useEffect(() => {
        const favsInLocal = localStorage.getItem('favs');
        if(favsInLocal !==null){
          const favsArray = JSON.parse(favsInLocal)
          setFavs(favsArray);
        }
    }
    , [setFavs])

        return(  
            <div className="notes-grid">
                {savedNotes.map((note, idx) =>{
                    let isFav = favs.find(ele => ele.title === note.title);
                    return(
                        <MinNote note={note} key={idx} notes={props.notes} set={setErasedNote} addOrRemoveFav={props.addOrRemoveFav} isFav={isFav}/>
                        )
                })}
            </div>
            )
    }
  

export default NotesGrid;