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
        let col = document.querySelector('#colorPicker').value
        let note = {
            title, body, col
        };
        notes.push(note)
        localStorage.setItem('notes', JSON.stringify(notes));
        navigate('/', {replace:true})
    }
    function colourCard(e){
        let card = document.querySelector(".new-note")
        card.style.backgroundColor = e.target.value;
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
            <input type="color" id="colorPicker" onChange={colourCard}/>
            <button className="add" onClick={add}>
            ✔️
            </button>
           </div>
        </div>
    </>
    )
}

export default NewNote;