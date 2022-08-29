import './styles/app.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx'
import NewNote from './components/NewNote.jsx'
import NotesGrid from './components/NotesGrid.jsx'
import Note from './components/Note.jsx'
import Favs from './components/Favs';
import {useEffect, useState} from 'react'
import { collection, getFirestore, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";


function App() {
  const [notes, setNotes] = useState([]);

  const db = getFirestore();
  const notesColl = collection(db, 'notes');

  const favsColl = collection(db, 'favs');

  useEffect(() => {
    getDocs(notesColl)
    .then((item) => {
        let savedArr  = item.docs.map((note) => note.data())
        setNotes(savedArr);
    })
  })

  const [favs, setFavs] = useState([]);

  useEffect(() => {
    getDocs(favsColl)
    .then((item) => {
        let favsArr  = item.docs.map((note) => note.data())
        setFavs(favsArr);
    })
  })

  const addOrRemoveFav = (e) =>{
    e.preventDefault();
    const tempFavs = favs;
    
    let parent = e.target.parentElement
    let targetZone = parent.parentElement;
    let targetNote = targetZone.parentElement;
    let targetNoteNote = targetNote.parentElement;
    let title = targetNoteNote.querySelector('.new-note-title').textContent;
    let body = targetNoteNote.querySelector('.new-note-body').textContent;
    let col = targetNoteNote.style.backgroundColor;
  

    let noteIsFav = tempFavs.find( oneNote =>{return oneNote.title === title})

    if(!noteIsFav){
      setDoc(doc(db, 'favs', title), {
        title : title,
        body : body,
        color : col
    }).then(
        console.log('ya po')
    )
    }else{
      let docRef =  doc(db, 'favs', title);
      deleteDoc(docRef) 
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
