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
        if(!title || !body){
            alert('vacío')
        }else{
        notes.push(note)
        localStorage.setItem('notes', JSON.stringify(notes));
        navigate('/', {replace:true})
        }
    }
    function colourCard(e){
        let card = document.querySelector(".new-note")
        card.style.backgroundColor = e.target.value;
    }
    return(
    <>
        <div className="new-note">
           <textarea form="usrform" className="new-note-title">
           </textarea>
           <textarea  form="usrform" className="new-note-body">
           </textarea>
           <div className="new-note-btns">
            <button className="cancel" onClick={cancel}>
            🗑️
            </button>
            <input type="color" id="colorPicker" onChange={colourCard} list="presetColors" />
                <datalist id="presetColors">
                    <option>#C8566B</option>
                    <option>#E78963</option>
                    <option>#F2D48F</option>
                    <option>#9D75BF</option>
                    <option>#9EC299</option>
                    <option>#6661AB</option>
                </datalist>
            <button className="add" onClick={add}>
            ✔️
            </button>
           </div>
        </div>
    </>
    )
}


export default NewNote;