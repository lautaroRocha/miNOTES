import './styles/app.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx'
import NewNote from './components/NewNote.jsx'
import NotesGrid from './components/NotesGrid.jsx'
import Note from './components/Note.jsx'
import Favs from './components/Favs';
import {useEffect, useState} from 'react'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


function App() {
  const [notes, setNotes] = useState([]);

  const MySwal = withReactContent(Swal)
  
  useEffect(() => {
      const notesInLocal = localStorage.getItem('notes');
      if(notesInLocal !==null){
        const notesArray = JSON.parse(notesInLocal)
        setNotes(notesArray);
      }
  }
  , [])

  const [favs, setFavs] = useState([]);

  useEffect(() => {
      const favsInLocal = localStorage.getItem('favs');
      if(favsInLocal !==null){
        const favsArray = JSON.parse(favsInLocal)
        setFavs(favsArray);
      }
  }
  , [])


  const addOrRemoveFav = (e) =>{
    e.preventDefault();
    let savedFavs = localStorage.getItem('favs');
    let tempFavs;
    if(savedFavs == null){
      tempFavs = [];
    }else{
      tempFavs = JSON.parse(savedFavs)
    }
    
    let parent = e.target.parentElement
    let targetZone = parent.parentElement;
    let targetNote = targetZone.parentElement;
    let targetNoteNote = targetNote.parentElement;
    let title = targetNoteNote.querySelector('.new-note-title').textContent;
    let body = targetNoteNote.querySelector('.new-note-body').textContent;
    let col = targetNote.style.backgroundColor;
    let favNote = {
      title, body, col
    }

    let noteIsFav = tempFavs.find( oneNote =>{return oneNote.title === favNote.title})

    if(!noteIsFav){
        tempFavs.push(favNote)
        localStorage.setItem('favs', JSON.stringify(tempFavs));
        setFavs(tempFavs)
    }else{
      MySwal.fire({
        customClass: {
            confirmButton: "confirm-btn",
            popup : "swal-cont"
        },
        title : '¿🗑️?',
        showCancelButton: true,
        confirmButtonText : <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="#fff" viewBox="0 0 24 24"><path d="M9 22l-10-10.598 2.798-2.859 7.149 7.473 13.144-14.016 2.909 2.806z"/></svg> ,
        cancelButtonText :<svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="#fff"viewBox="0 0 24 24"><path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/></svg> ,
        denyButtonText: `Don't save`
    })
    .then( (result) => {
      if(result.isConfirmed){
        let notesLeft = tempFavs.filter(note => {
          return note.title !== favNote.title;})
          localStorage.setItem('favs', JSON.stringify(notesLeft))
          setFavs(notesLeft)
      }
    })
      
    }
  
    }

  return (
  <BrowserRouter>
    <Header />
  <div className="container">
   <Routes>
    <Route path="/new" element={<NewNote notes={notes} favs={favs}/>}/>
    <Route exact path="/" element={<NotesGrid notes={notes}  favs={favs} addOrRemoveFav={addOrRemoveFav}/>} />
    <Route path="/notes" element={<Note notes={notes} favs={favs}/>}/>
    <Route path="/fav" element={<Favs notes={notes} favs={favs} addOrRemoveFav={addOrRemoveFav}/>}/>
   </Routes>
  </div>
  </BrowserRouter>
  );
}

export default App;
