import React, { useEffect, useState } from "react";
import { Container, Col, Row, Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import addIcon from "../icons/add-icon.png";

const BookList = ({
  bookData,
  bookIndex,
  myNote,
  setMyNote,
  setToReadList,
}) => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const navToNote = (book) => {
    const selectedBookData = {
      key: book.key,
      title: book.title,
      author: book.author,
      coverArtUrl: book.coverArtUrl,
    };
    console.log("Selected Book Data:", selectedBookData);
    setMyNote((prevNote) => ({
      ...prevNote,
      ...selectedBookData,
    }));
    navigate(`/createnote/${encodeURIComponent(book.title)}`);
  };

  const addToTBR = (book) => {
    const selectedBookData = {
      key: book.key,
      title: book.title,
      author: book.author,
      coverArtUrl: book.coverArtUrl,
    };
    setToReadList((prevReadList) => [...prevReadList, selectedBookData]);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <Container className="text-center">
      {showAlert && (
        <Alert
          className="fadeOutRight"
          variant="success"
          onClose={() => {
            setShowAlert(false);
          }}
          dismissible={true}
        >
          Book was added to your TBR list!
        </Alert>
      )}
      <Row className="d-flex justify-content-center">
        {bookData.slice(bookIndex, bookIndex + 5).map((book) => (
          <Col className="d-flex justify-content-center" key={book.key}>
            <Card
              className="bookCard"
              style={{
                width: "12rem",
                height: "21rem",
                boxShadow: "5px 2px 5px 2px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Card.Img
                className="bookImg"
                variant="top"
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
                <Card.Text>By: {book.author}</Card.Text>
              </Card.Body>
              <Button
                id="addToTBR"
                variant="outline-primary"
                onClick={() => addToTBR(book)}
                style={{
                  position: "absolute",
                  top: "2%",
                  right: "5%",
                  border: "none",
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "100%",
                  backgroundColor: "#D1ECFF82",
                }}
              >
                <img
                  src={addIcon}
                  alt="Add to Read List"
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    height: "2rem",
                    width: "2rem",
                  }}
                />
              </Button>
              <Button variant="outline-primary" onClick={() => navToNote(book)}>
                Select
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BookList;
