import React, { useState, useEffect } from "react";
import { Container, Card, Modal } from "react-bootstrap";

const NotesPage = ({ noteCollection }) => {
  const [selectedBookKey, setSelectedBookKey] = useState(null);
  const [selectedBook, setSelectedBook] = useState({});

  useEffect(() => {
    const book = noteCollection.find((note) => note.key === selectedBookKey);
    setSelectedBook(book || {});
  }, [selectedBookKey, noteCollection]);

  const handleClose = () => {
    setSelectedBookKey(null);
  };

  return (
    <Container
      onClick={(e) => {
        let isClickInside = false;
        document.querySelectorAll(".card-container").forEach((card) => {
          if (card.contains(e.target)) {
            isClickInside = true;
          }
        });

        if (!isClickInside) {
          handleClose();
        }
      }}
      className={`d-flex justify-content-center ${
        !noteCollection.length ? "align-items-center" : ""
      }`}
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        margin: "1%",
      }}
    >
      {noteCollection.length ? (
        noteCollection.map((book) => (
          <div
            className="card-container m-1"
            onClick={() => {
              setSelectedBookKey(book.key);
            }}
            key={book.key}
            style={{
              display: "flex",
              flexDirection: "row",
              height: "20rem",
              marginBottom: "1%",
              position: "relative",
            }}
          >
            <Card
              style={{
                width: "12rem",
                height: "20rem",
                position: "relative",
              }}
            >
              <Card.Img
                className="myNoteImg"
                src={book.coverArtUrl}
                alt={book.title}
                style={{
                  width: "100%",
                  height: "13rem",
                }}
              />
              <Card.Body
                style={{
                  padding: "2% 0",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Card.Title as="h6">{book.title}</Card.Title>
                <Card.Text>
                  <div>By: {book.author}</div>
                  {book.finished ? (
                    <div className="py-2">Finished: {book.dateFinished}</div>
                  ) : null}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))
      ) : (
        <Container>
          <h2>There are no notes to display yet - get reading!</h2>
        </Container>
      )}

      <Modal show={!!selectedBookKey} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedBook.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Book Summary:</h6>
          {selectedBook.bookSummary?.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <h6>Favorite Quotes, Passages:</h6>
          {selectedBook.favoriteQuotes
            ?.split("\n\n")
            .map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          <h6>My Thoughts:</h6>
          {selectedBook.myThoughts?.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default NotesPage;
