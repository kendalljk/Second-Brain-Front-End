import "./App.css";
import { Routes, Route } from "react-router-dom";
import CreateNote from "./pages/CreateNote";
import Homepage from "./pages/Homepage";
import Navigation from "./components/Navigation";
import { useState } from "react";
import BookList from "./pages/BookList";
import BookSearch from "./pages/BookSearch";
import { useEffect } from "react";
import NotesPage from "./pages/NotesPage";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [bookData, setBookData] = useState([]); //booksearch buttons only appear when length > 0
  const [myNote, setMyNote] = useState(initialNote);
  const [noteCollection, setNoteCollection] = useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
  );

  const handlePageChange = (direction) => {
    if (direction === "next" && bookData.length === 5) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === "previous" && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(noteCollection));
  }, [noteCollection]);

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/booksearch"
          element={
            <BookSearch
              bookData={bookData}
              setBookData={setBookData}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
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
                handlePageChange={handlePageChange}
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
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
