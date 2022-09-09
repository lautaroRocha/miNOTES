import './styles/app.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx'
import NewNote from './components/NewNote.jsx'
import NotesGrid from './components/NotesGrid.jsx'
import Note from './components/Note.jsx'
import Favs from './components/Favs';
import Login from './components/Login';
import {useEffect, useState} from 'react'
import { collection, getFirestore, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import RequireAuth from './components/RequireAuth';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import 'animate.css'
import './styles/swal.css'
import Footer from './components/Footer';


function App(props) {

  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState(false)
  const [erasedNote, setErasedNote] = useState(false);
  const [firstRend, setFirstRend] = useState(true)

  const loggedUser = localStorage.getItem('user');
  const currentUser = JSON.parse(loggedUser)




  const db = getFirestore();

  useEffect(() => {
    if(currentUser){
    let notesColl = collection(db,  'notes' + currentUser.uid);
    getDocs(notesColl)
    .then((item) => {
        let savedArr  = item.docs.map((note) => note.data())
        setNotes(savedArr);
        setNewNote(false)
    })}else{
      setNotes([])
      setNewNote(false)
    }
    setErasedNote(false)
  }, [setErasedNote, erasedNote, newNote, user])

  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    const currentUser = JSON.parse(loggedUser)
    if(loggedUser){
    let favsColl = collection(db,  'favs' + currentUser.uid);
    getDocs(favsColl)
    .then((item) => {
        let favsArr  = item.docs.map((note) => note.data())
        setFavs(favsArr);
    })}
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
    let col = targetNote.style.backgroundColor;
  

    let noteIsFav = tempFavs.find( oneNote =>{return oneNote.title === title})

    if(!noteIsFav){
      setDoc(doc(db, 'favs' + currentUser.uid, title), {
        title : title,
        body : body,
        color : col
    }).then(
        console.log('ya po')
    )
    }else{
      let docRef =  doc(db,'favs' + currentUser.uid, title);
      deleteDoc(docRef) 
        }
      
    }
    



  return (
  <BrowserRouter>
    {currentUser && <Header setUser={setUser} user={user} setNotes={setNotes} />}
    <div className="container">
    <Routes>
      <Route path="/login" element={<Login user={user} app={props.app} setUser={setUser} setFirstRend={setFirstRend} />} />
      <Route path="/new" element={
      <NewNote user={user} notes={notes} favs={favs} setNewNote={setNewNote}/>
      }/>
      <Route exact path="/" element={
        <RequireAuth  redirectTo="/login">
          <NotesGrid user={user} notes={notes} setFirstRend={setFirstRend} firstRend={firstRend} erasedNote={erasedNote} setErasedNote={setErasedNote} favs={favs} addOrRemoveFav={addOrRemoveFav}/>
        </RequireAuth>} />
      <Route path="/notes" element={
        <RequireAuth  redirectTo="/login">
          <Note user={user} notes={notes} favs={favs} setNewNote={setNewNote}/>
          </RequireAuth>}/>
      <Route path="/fav" element={
       <RequireAuth  redirectTo="/login">
        <Favs user={user} notes={notes} favs={favs} addOrRemoveFav={addOrRemoveFav}/>
        </RequireAuth>}/>
    </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
