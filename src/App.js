import './App.css';
import {Routes, Route} from 'react-router-dom'
import CreateNote from './pages/CreateNote';
import Homepage from './pages/Homepage';
import Navigation  from './components/Navigation';
import { useState } from 'react';
import BookList from './pages/BookList';
import BookSearch from './pages/BookSearch';
import { useEffect } from 'react';
import NotesPage from './pages/NotesPage';

const initialNote = {
  key: "",
  title: "",
  author: "",
  coverArtUrl: "",
  bookGenre: "",
  finished: false,
  dateFinished: "",
  bookSummary: "",
  favoriteQuotes: [],
  myThoughts: [],
}

function App() {
  const [bookData, setBookData] = useState([]);
  const [myNote, setMyNote]= useState(initialNote);
  const [noteCollection, setNoteCollection] = useState(() => JSON.parse(localStorage.getItem('notes')) || [])

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(noteCollection))
}, [noteCollection])

  return (
    <>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/booksearch" element={<BookSearch bookData={bookData} setBookData={setBookData}/>}>
          <Route path="/booksearch/:query" element={<BookList bookData={bookData} myNote={myNote} setMyNote={setMyNote} />}/>
        </Route>
        <Route path="/notespage" element={<NotesPage noteCollection={noteCollection}/>}/>
        <Route path="/createnote/*" element={<CreateNote bookData={bookData} myNote={myNote} setMyNote={setMyNote} noteCollection={noteCollection} setNoteCollection={setNoteCollection}/>}/>
      </Routes>
    </>
  );
}

export default App;
