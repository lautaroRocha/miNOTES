import React from "react"
import { Link } from "react-router-dom"
import '../styles/notes_grid.css'
import { getFirestore, doc, deleteDoc} from "firebase/firestore";

function MinNote(props){
    
    let notesArray = props.notes;
    let noteIdx = props.notes.indexOf(props.note);
    let current = window.location.pathname;
    let heart
    let noteIsFav;
    
    if(window.location.pathname !== '/fav'){
        noteIsFav = props.favs.some( oneNote =>oneNote.title === props.note.title)
        if(noteIsFav){
            heart = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z"/></svg>
        }else{
            heart = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6.28 3c3.236.001 4.973 3.491 5.72 5.031.75-1.547 2.469-5.021 5.726-5.021 2.058 0 4.274 1.309 4.274 4.182 0 3.442-4.744 7.851-10 13-5.258-5.151-10-9.559-10-13 0-2.676 1.965-4.193 4.28-4.192zm.001-2c-3.183 0-6.281 2.187-6.281 6.192 0 4.661 5.57 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-4.011-3.097-6.182-6.274-6.182-2.204 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248z"/></svg>;
        }
    }

    let setErasedNotes = props.set;

    const db = getFirestore();

    const dispose = (e) => {
        e.preventDefault();
        if(current !== "/fav"){
        let docRef =  doc(db, 'notes', props.note.title);
        deleteDoc(docRef)    
        notesArray.splice(noteIdx, 1);
        }else{
            props.addOrRemoveFav();
        }
        setErasedNotes(true)
    }

    return(
        <Link  to={`/notes?title=${props.note.title}&&from=${current}`}style={{textDecoration: "none"}} >
                    <div className="note"  style={{backgroundColor:`${props.note.color}`}}>
                    <div className="note-actions">
                       { window.location.pathname !== '/fav' &&
                       <button onClick={dispose}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
                        </button>}
                        <button onClick={props.addOrRemoveFav}>
                            {window.location.pathname !== '/fav' ?
                            heart
                             :
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.094l-4.157-4.104 4.1-4.141-1.849-1.849-4.105 4.159-4.156-4.102-1.833 1.834 4.161 4.12-4.104 4.157 1.834 1.832 4.118-4.159 4.143 4.102 1.848-1.849z"/></svg>}
                        </button>
                    </div>
                        <span className="new-note-title">{props.note.title}</span>
                        <textarea value={
                        props.note.body.length < 100 ? 
                        props.note.body:
                        props.note.body.substring(0, 100)+"... "} disabled form="usrform"  className="new-note-body" ></textarea>
                    </div>
                    </Link>
    )
}

export default MinNote; 

