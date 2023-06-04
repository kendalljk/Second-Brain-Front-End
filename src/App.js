import './App.css';
import {Routes, Route} from 'react-router-dom'
import BookNotes from './pages/BookNotes';
import CreateNote from './pages/CreateNote';
import Homepage from './pages/Homepage';
import Navigation  from './components/Navigation';
import { useState } from 'react';
import BookList from './pages/BookList';
import BookSearch from './pages/BookSearch';

const initialNote = {
  title: "",
  author: "",
  coverArtUrl: "",
  bookGenre: "",
  finished: false,
  dateFinished: "",
  bookSummary: "",
  favoriteQuotes: [],
  myNotes: [],
}

function App() {
  const [bookData, setBookData] = useState([]);
  const [myNote, setMyNote]= useState(initialNote);
  const [noteCollection, setNoteCollection] = useState([])



  return (
    <>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/booksearch" element={<BookSearch bookData={bookData} setBookData={setBookData}/>}>
          <Route path="/booksearch/:query" element={<BookList bookData={bookData} myNote={myNote} setMyNote={setMyNote} />}/>
        </Route>
        <Route path="/booknotes" element={<BookNotes/>}/>
        <Route path="/createnote/*" element={<CreateNote bookData={bookData} myNote={myNote} setMyNote={setMyNote}/>}/>
      </Routes>
    </>
  );
}

export default App;
