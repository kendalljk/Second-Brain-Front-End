import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import CreateNote from "./pages/CreateNote";
import Homepage from "./pages/Homepage";
import Navigation from "./components/Navigation";
import BookList from "./pages/BookList";
import BookSearch from "./pages/BookSearch";
import NotesPage from "./pages/NotesPage";
import TBRList from "./pages/TBRList";
import LoadingPage from "./pages/LoadingPage";

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
};

function App() {
  const [bookData, setBookData] = useState([]); //booksearch buttons only appear when length > 0
  const [bookIndex, setBookIndex] = useState(0); // ensures displays first result each time
  const [toReadList, setToReadList] = useState(
    () => JSON.parse(localStorage.getItem("TBR")) || []
  );
  const [myNote, setMyNote] = useState(initialNote);
  const [noteCollection, setNoteCollection] = useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(noteCollection));
  }, [noteCollection]);

  useEffect(() => {
    localStorage.setItem("TBR", JSON.stringify(toReadList));
  }, [toReadList]);

  const location = useLocation();
  const isOnLoadingPage = location.pathname === "/";
  //sets path for loading page

  return (
    <>
      {!isOnLoadingPage && <Navigation />}
      {/* if user is on loading page, navigation tab does not display */}
      <Routes>
        <Route path="/" element={<LoadingPage />}></Route>
        <Route path="/home" element={<Homepage />} />
        <Route
          path="/booksearch"
          element={
            <BookSearch
              bookData={bookData}
              setBookData={setBookData}
              bookIndex={bookIndex}
              setBookIndex={setBookIndex}
            />
          }
        >
          <Route
            path="/booksearch/:query"
            element={
              <BookList
                bookData={bookData}
                myNote={myNote}
                setMyNote={setMyNote}
                bookIndex={bookIndex}
                toReadList={toReadList}
                setToReadList={setToReadList}
              />
            }
          />
        </Route>
        <Route
          path="/notespage"
          element={<NotesPage noteCollection={noteCollection} />}
        />
        <Route
          path="/createnote/*"
          element={
            <CreateNote
              bookData={bookData}
              myNote={myNote}
              setMyNote={setMyNote}
              noteCollection={noteCollection}
              setNoteCollection={setNoteCollection}
              toReadList={toReadList}
              setToReadList={setToReadList}
            />
          }
        />
        <Route
          path="/TBR_List/*"
          element={<TBRList bookData={bookData} toReadList={toReadList} />}
        />
      </Routes>
    </>
  );
}

export default App;
