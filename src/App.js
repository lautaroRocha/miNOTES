import './styles/app.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx'
import NewNote from './components/NewNote.jsx'
import NotesGrid from './components/NotesGrid.jsx'
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

  return (
  <BrowserRouter>
    <Header />
  <div className="container">
   <Routes>
      <Route exact path="/" element={<NotesGrid notes={notes}/>} />
     <Route path="/new" element={<NewNote notes={notes} />}/>
   </Routes>
  </div>
  </BrowserRouter>
  );
}

export default App;
