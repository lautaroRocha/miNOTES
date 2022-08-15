import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/new_note.css'

function NewNote(props){
    const navigate = useNavigate();
    const cancel = () =>{
        navigate('/', {replace:true})
    }

    const add = () =>{
        let notes = props.notes;
        let title = document.querySelector('.new-note-title').value;
        let body = document.querySelector('.new-note-body').value;
        let note = {
            title, body
        };
        notes.push(note)
        localStorage.setItem('notes', JSON.stringify(notes));
    }
    
    return(
    <>
        <div className="new-note">
           <textarea className="new-note-title">
           </textarea>
           <textarea className="new-note-body">
           </textarea>
           <div className="new-note-btns">
            <button className="cancel" onClick={cancel}>
            🗑️
            </button>
            
            <button className="add" onClick={add}>
            ✔️
            </button>
           </div>
        </div>
    </>
    )
}

export default NewNote;