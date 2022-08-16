import React from "react";
import '../styles/notes_grid.css'

function NotesGrid(props) {

    return(  
        <div className="notes-grid">
            {props.notes.map((note, idx) =>{
                return(
                    <div className="note" key={idx} style={{backgroundColor:`${note.col}`}}>
                        <span>{note.title}</span>
                        <p>{note.body.substring(0,150)+"..."}</p>
                    </div>
                )
            })}
        </div>
        )
    }

export default NotesGrid;