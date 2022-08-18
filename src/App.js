import './styles/app.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx'
import NewNote from './components/NewNote.jsx'
import NotesGrid from './components/NotesGrid.jsx'
import Note from './components/Note.jsx'
import Favs from './components/Favs';
import {useEffect, useState} from 'react'


function App() {
  const [notes, setNotes] = useState([]);
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

    let targetNote = e.target.parentElement.parentElement.parentElement;
    let title = targetNote.querySelector('.new-note-title').textContent;
    let body = targetNote.querySelector('.new-note-body').innerText;
    let col = targetNote.style.backgroundColor;

    let favNote = {
      title, body, col
    }

    let noteIsFav = tempFavs.find( oneNote =>{
      return oneNote.title === favNote.title})

      if(!noteIsFav){
        tempFavs.push(favNote)
        localStorage.setItem('favs', JSON.stringify(tempFavs));
        setFavs(tempFavs)
      }else{
        let notesLeft = tempFavs.filter(note => {
          return note.title !== favNote.title;})
      localStorage.setItem('favs', JSON.stringify(notesLeft))
      setFavs(notesLeft)
      }
    
    }

  return (
  <BrowserRouter>
    <Header />
  <div className="container">
   <Routes>
    <Route path="/new" element={<NewNote notes={notes} favs={favs}/>}/>
    <Route exact path="/" element={<NotesGrid notes={notes} addOrRemoveFav={addOrRemoveFav}/>} />
    <Route path="/notes" element={<Note notes={notes} favs={favs}/>}/>
    <Route path="/fav" element={<Favs notes={notes} favs={favs} addOrRemoveFav={addOrRemoveFav}/>}/>
   </Routes>
  </div>
  </BrowserRouter>
  );
}

export default App;
