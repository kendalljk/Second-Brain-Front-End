import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotesPage = ({ noteCollection }) => {
  const [flippedStates, setFlippedStates] = useState({});

  const navigate = useNavigate();

  const handleClick = (key) => {
    setFlippedStates((prevStates) => ({
      ...prevStates,
      [key]: !prevStates[key],
    }));
  };
  //toggles notes to flip/ unflip

  const navigator = (e) => {
    const myAlert = document.getElementById("myAlert");
    myAlert.classList.add("fadeOutLeft");

    setTimeout(() => {
      navigate("/booksearch");
    }, 1000);
  }; //delays navigation until classlist able to be added

  return (
    <Container fluid="true">
      {/* this allows the row to extend to the full width of the container */}
      <Row className="d-flex justify-content-center mt-3">
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
                  boxShadow: "10px 10px 10px 5px rgba(0, 0, 0, 0.5)",
                }}
              >
                <div className="card-front text-center">
                  {book.finished && (
                    <div className="finished note-text">
                      Finished: {book.dateFinished}
                    </div>
                  )}
                  <Card.Img
                    src={book.coverArtUrl}
                    alt={book.title}
                    style={{
                      marginTop: book.finished ? "0" : "2rem",
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
                    <div className="author note-text">By: {book.author}</div>

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
          <Alert
            id="myAlert"
            show={true}
            variant="warning"
            style={{
              width: "30%",
              textAlign: "center",
              boxShadow: "10px 10px 10px 5px rgba(0, 0, 0, 0.5)",
            }}
          >
            <Alert.Heading>No notes to display yet!</Alert.Heading>
            <p>
              Unlock your potential through the transformative power of reading
              and learning from the wisdom of others. Search for books, add your
              insightful notes, and embark on a journey of enriching your mind
              and enhancing your learning.
            </p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button onClick={navigator} variant="outline-success">
                Add Note
              </Button>
            </div>
          </Alert>
        )}
      </Row>
    </Container>
  );
};
export default NotesPage;
