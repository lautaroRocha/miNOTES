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

function App(props) {

  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState(false)
  const [erasedNote, setErasedNote] = useState(false);

  const loggedUser = localStorage.getItem('user');
  const currentUser = JSON.parse(loggedUser)


  const MySwal = withReactContent(Swal)


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
  }, [erasedNote, newNote, user])

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
          deleteDoc(docRef) 
        }
      })
    }
    }



  return (
  <BrowserRouter>
      <Header setUser={setUser} user={user} setNotes={setNotes}/>
    <div className="container">
    <Routes>
      <Route path="/login" element={<Login user={user} app={props.app} setUser={setUser} />} />
      <Route path="/new" element={
      <NewNote user={user} notes={notes} favs={favs} setNewNote={setNewNote}/>
      }/>
      <Route exact path="/" element={
        <RequireAuth  redirectTo="/login">
          <NotesGrid user={user} notes={notes} setErasedNote={setErasedNote}  favs={favs} addOrRemoveFav={addOrRemoveFav}/>
        </RequireAuth>} />
      <Route path="/notes" element={
        <RequireAuth  redirectTo="/login">
          <Note user={user} notes={notes} favs={favs}/>
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
