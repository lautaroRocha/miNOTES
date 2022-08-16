import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import '../styles/new_note.css'

function Note(props){
    const navigate = useNavigate();

    const [savedNotes, setSavedNotes] = useState(props.notes);

    useEffect(() => {
        let savedArr = props.notes;
        setSavedNotes(savedArr);
    }, [savedNotes])

    let params = new URLSearchParams(document.location.search)
    let title = params.get('title')

    let note = props.notes.find(note => note.title === title)
    let notesArray = props.notes;
    let noteIdx = props.notes.indexOf(note);


    const edit = () =>{
        const titleToEdit = document.querySelector('.new-note-title')
        const editableTitle = document.createElement("textarea");
        editableTitle.className = "new-note-title"
        editableTitle.textContent= note.title;

        const bodyToEdit = document.querySelector('.new-note-body')
        const editableBody = document.createElement("textarea");
        editableBody.className = "new-note-body"
        editableBody.textContent= note.body;

        titleToEdit.replaceWith(editableTitle)
        bodyToEdit.replaceWith(editableBody)        
    }
    const save = () => {
        let title = document.querySelector('.new-note-title').value;
        let body = document.querySelector('.new-note-body').value;
        let col = note.col;
        let editedNote = {
            title, body,col
        };
        if(!title || !body){
            navigate('/', {replace:true})
        }else{
        notesArray.splice(noteIdx, 1, editedNote);
        localStorage.setItem('notes', JSON.stringify(notesArray));
        navigate('/', {replace:true})}
    }
    const dispose = () => {
        notesArray.splice(noteIdx, 1);
        localStorage.setItem('notes', JSON.stringify(notesArray));
        navigate('/', {replace:true})
    }
    return(
        <>
        <div  className="new-note"  style={{backgroundColor:`${note.col}`}}>
           <p  className="new-note-title">
            {note.title}
           </p>
           <p  className="new-note-body">
            {note.body}
           </p>
           <div className="new-note-btns">
            <button className="cancel" onClick={dispose}>
            🗑️
            </button>
            <button className="cancel" onClick={edit}>
            ✏️
            </button>
            <button className="add" onClick={save}>
            ✔️
            </button>
           </div>
        </div>
        </>
    )
}

export default Note;