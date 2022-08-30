import React from "react";

import '../styles/notes_grid.css'

import MinNote from "./MinNote";

function Favs(props){
    return(  
            <div className="notes-grid">
                {props.favs.map((note, idx) =>{
                    return(
                        <MinNote note={note} key={idx} notes={props.notes} set={props.setErasedNote} addOrRemoveFav={props.addOrRemoveFav}/>
                    )
                })}
            </div>
            )
}

export default Favs;