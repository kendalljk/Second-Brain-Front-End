import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TBRList = ({ toReadList }) => {
  const navigate = useNavigate();
  console.log("To Read List:", toReadList);

  const goToBookSearch = (e) => {
    const myAlert = document.getElementById("myAlert");
    myAlert.classList.add("fadeOutLeft");

    setTimeout(() => {
      navigate("/booksearch");
    }, 1000);
  }; //delays navigation until classlist able to be added

  return (
    <Container fluid="true">
      {/* this allows the row to extend to the full width of the container */}
      <Row className="d-flex justify-content-left text-align-center mt-3 mx-3">
        {toReadList.length ? (
          toReadList.map((book) => (
            <Col
              key={book.key}
              style={{
                width: "14rem",
                height: "19rem",
                flex: "none",
              }}
            >
              <Card
                style={{
                  width: "12rem",
                  height: "18rem",
                  boxShadow: "10px 10px 10px 5px rgba(0, 0, 0, 0.5)",
                }}
              >
                <div className="text-center">
                  <Card.Img
                    src={book.coverArtUrl}
                    alt={book.title}
                    style={{
                      width: "100%",
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
                  </Card.Body>
                </div>
              </Card>
            </Col>
          ))
        ) : (
          <Alert
            id="myAlert"
            show={true} // must be in brackets to prevent error
            variant="warning"
            style={{
              width: "30%",
              textAlign: "center",
              boxShadow: "10px 10px 10px 5px rgba(0, 0, 0, 0.2)",
              marginTop: "10%",
            }}
          >
            <Alert.Heading>No books to display yet!</Alert.Heading>
            <p>
              Unlock your potential through the transformative power of reading
              and learning from the wisdom of others. Search for books, add your
              insightful notes, and embark on a journey of enriching your mind
              and enhancing your learning.
            </p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button onClick={goToBookSearch} variant="outline-success">
                Add Note
              </Button>
            </div>
          </Alert>
        )}
      </Row>
    </Container>
  );
};

export default TBRList;
