import React from "react";
import {Link} from 'react-router-dom'
import '../styles/notes_grid.css'

function NotesGrid(props) {

    return(  
        <div className="notes-grid">
            {props.notes.map((note, idx) =>{
                return(
                    <Link to={`/notes?title=${note.title}`} style={{textDecoration: "none"}} key={idx}>
                    <div className="note"  style={{backgroundColor:`${note.col}`}}>
                        <span>{note.title}</span>
                        <p>{note.body.substring(0,150)+"..."}</p>
                    </div>
                    </Link>
                )
            })}
        </div>
        )
    }

export default NotesGrid;