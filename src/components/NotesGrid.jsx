import React from "react";
import '../styles/notes_grid.css'

function NotesGrid(props) {

    return(  
        <div className="notes-grid">
            {props.notes.map((note, idx) =>{
                return(
                    <div className="note" key={idx}>
                        <span>{note.title}</span>
                        <p>{note.body}</p>
                    </div>
                )
            })}
        </div>
        )
    }

export default NotesGrid;