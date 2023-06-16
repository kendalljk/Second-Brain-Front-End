import React, { useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import leftArrow from "../icons/left-arrow.png";
import rightArrow from "../icons/right-arrow.png";

const BookList = ({ bookData, myNote, setMyNote }) => {
  const navigate = useNavigate();

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

  useEffect(() => {
    console.log("My Note:", myNote);
  }, [myNote]);

  return (
    <Container className="text-center">
      <Row className="d-flex justify-content-center">
        {bookData.map((book) => (
          <Col className="d-flex justify-content-center" key={book.key}>
            <Card
              className="bookCard"
              style={{
                width: "12rem",
                height: "21rem",
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
              <Button variant="outline-primary" onClick={() => navToNote(book)}>
                Select
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-center my-3">
        <Button className="booklist-button">
          <img src={leftArrow} alt="left arrow" />
        </Button>
        <Button className="booklist-button">
          <img src={rightArrow} alt="right arrow" />
        </Button>
      </div>
    </Container>
  );
};

export default BookList;
