import './App.css';
import {Routes, Route} from 'react-router-dom'
import Booknotes from './pages/Booknotes';
import CreateNote from './pages/CreateNote';
import Homepage from './pages/Homepage';
import Navigation  from './components/Navigation';
import { useState } from 'react';
import BookList from './pages/BookList';


function App() {

  const initialNote = {
    authorName: "",
    bookTitle: "",
    bookGenre: "",
    finished: false,
    dateFinished: "",
    bookSummary: "",
    favoriteQuotes: "",
    myNotes: "",
  }

  const [myNote, setMyNote]= useState(initialNote);
  const [noteCollection, setNoteCollection] = useState([])
  const [bookData, setBookData] = useState([]);

  return (
    <>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/createnote" element={<CreateNote bookData={bookData} setBookData={setBookData}/>}>
          <Route path=":title" element={<BookList bookData={bookData} />}/>
        </Route>
        <Route path="/booknotes" element={<Booknotes/>}/>
      </Routes>
    </>
  );
}

export default App;
