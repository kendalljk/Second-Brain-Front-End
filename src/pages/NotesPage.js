import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useState } from "react";

const NotesPage = ({ noteCollection }) => {
  const [flippedStates, setFlippedStates] = useState({});

  const handleClick = (key) => {
    setFlippedStates((prevStates) => ({
      ...prevStates,
      [key]: !prevStates[key],
    }));
  };
  //toggles notes to flip/ unflip

  return (
    <Container>
      <Row className="mt-3">
        {noteCollection.length ? (
          noteCollection.map((book) => (
            <Col
              className="flippable-card m-2"
              onClick={() => handleClick(book.key)}
              key={book.key}
              style={{
                width: "20rem",
                flex: "none",
              }}
            >
              <Card
                className={`card-container ${
                  flippedStates[book.key] ? "flipped" : ""
                }`}
                style={{
                  width: "18rem",
                  height: "24rem",
                }}
              >
                {book.finished && (
                  <div className="finished note-text">
                    Finished: {book.dateFinished}
                  </div>
                )}
                <div className="card-front text-center">
                  <Card.Img
                    src={book.coverArtUrl}
                    alt={book.title}
                    style={{
                      marginTop: "2rem",
                      width: "60%",
                      height: "12rem",
                    }}
                  />
                  <Card.Body
                    style={{
                      padding: "2% 0",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Card.Title as="h6">{book.title}</Card.Title>
                    <div className="note-text">By: {book.author}</div>
                    {book.bookSummary.split("\n\n").map((paragraph, index) => (
                      <div className="summary note-text" key={index}>
                        {paragraph}
                      </div>
                    ))}
                  </Card.Body>
                </div>
                <div className="card-back">
                  <Card.Body
                    style={{
                      width: "18rem",
                      height: "24rem",
                      overflowY: "auto",
                    }}
                  >
                    <h6>Favorite Quotes, Passages:</h6>
                    {book.favoriteQuotes
                      .split("\n\n")
                      .map((paragraph, index) => (
                        <div className="note-text" key={index}>
                          {paragraph}
                        </div>
                      ))}
                    <br />
                    <h6>My Thoughts, Notes:</h6>
                    {book.myThoughts.split("\n\n").map((paragraph, index) => (
                      <div className="note-text" key={index}>
                        {paragraph}
                      </div>
                    ))}
                  </Card.Body>
                </div>
              </Card>
            </Col>
          ))
        ) : (
          <Container>
            <Row>
              <h2>There are no notes to display yet- get reading!</h2>
            </Row>
          </Container>
        )}
      </Row>
    </Container>
  );
};
export default NotesPage;
