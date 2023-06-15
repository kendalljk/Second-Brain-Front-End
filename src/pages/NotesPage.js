import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
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

  return (
    <Container
      className={`d-flex justify-content-center ${
        !noteCollection.length ? "align-items-center" : ""
      }`}
      style={{ height: "100%" }}
    >
      <Row>
        <Col className="d-flex justify-content-center flex-wrap">
          {noteCollection.length ? (
            noteCollection.map((book) => (
              <div
                className="flippable-card m-2"
                onClick={() => handleClick(book.key)}
                key={book.key}
              >
                <Card
                  className={`card-container ${
                    flippedStates[book.key] ? "flipped" : ""
                  }`}
                  style={{
                    width: flippedStates[book.key] ? "23rem" : "12rem",
                    height: flippedStates[book.key] ? "40rem" : "20rem",
                  }}
                >
                  <div className="card-front">
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
                      }}
                    >
                      <Card.Title as="h6">{book.title}</Card.Title>
                      <Card.Text>
                        <div>By: {book.author}</div>
                        {book.finished ? (
                          <div className="py-2">
                            Finished: {book.dateFinished}
                          </div>
                        ) : null}
                      </Card.Text>
                    </Card.Body>
                  </div>
                  <div className="card-back">
                    <Card.Body
                      style={{
                        height: "39rem",
                        width: "22rem",
                        overflowY: "auto",
                      }}
                    >
                      <Card.Text>
                        <div>
                          <h6>Book Summary:</h6>
                          {book.bookSummary
                            .split("\n\n")
                            .map((paragraph, index) => (
                              <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                        <div>
                          <h6>Favorite Quotes, Passages:</h6>
                          {book.favoriteQuotes
                            .split("\n\n")
                            .map((paragraph, index) => (
                              <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                        <div>
                          <h6>Favorite Quotes, Passages:</h6>
                          {book.myThoughts
                            .split("\n\n")
                            .map((paragraph, index) => (
                              <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                      </Card.Text>
                    </Card.Body>
                  </div>
                </Card>
              </div>
            ))
          ) : (
            <Container>
              <Row>
                <h2>There are no notes to display yet- get reading!</h2>
              </Row>
            </Container>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default NotesPage;
