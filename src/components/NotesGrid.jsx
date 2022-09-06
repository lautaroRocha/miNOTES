import React from "react";
import MinNote from "./MinNote";
import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/notes_grid.css'
import '../styles/spinner.css'
/* eslint-disable no-unused-expressions */

function LoadingSpinner(){
  return(
      <div className="spinner-container">
          <div className="loading-spinner">
          </div>
      </div>
  )
}



function NotesGrid(props) {
  const firstRend = props.firstRend;
  const setFirstRend = props.setFirstRend;
  const [load, setLoad] = useState(false)
  const navigate = useNavigate();
  const setErasedNote = props.setErasedNote

  const handleKeyPress = useCallback((event) => {
      if (event.shiftKey === true) {
        event.key === 'n' || event.key === 'N' && navigate('/new', {replace:true});
        event.key === 'f' || event.key === 'F' && navigate('/fav', {replace:true})
      }
    }, []);

  useEffect(() => {
      document.addEventListener('keydown', handleKeyPress);
      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
    }, [handleKeyPress]);

  useEffect( () => {
    setTimeout(function(){
        setLoad(true)
        setFirstRend(false);
    }, 2500)
  })
    
  function display(){
    if(firstRend){
      if(!load){
        return(
          <LoadingSpinner />
        )
      }else{
        return(  
          <div className="notes-grid">   
            {props.notes.map((note, idx) =>{ 
            return( 
              <MinNote note={note} key={idx} set={setErasedNote} addOrRemoveFav={props.addOrRemoveFav} favs={props.favs}/>
            )})}
          </div> 
      )
      }
    }else{
      return(
        <div className="notes-grid">   
            {props.notes.map((note, idx) =>{ 
            return( 
              <MinNote note={note} key={idx} set={setErasedNote} addOrRemoveFav={props.addOrRemoveFav} favs={props.favs}/>
            )})}
          </div>
      )
    }
  }



    return(
      display()
    )
    }
  

export default NotesGrid;