import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import leftArrow from "../icons/left-arrow.png";
import rightArrow from "../icons/right-arrow.png";

const BookSearch = ({ bookData, setBookData }) => {
  const { title } = useParams();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    bookTitle: "",
    authorName: "",
  });

  useEffect(() => {
    return () => {
      setBookData([]); // Clear bookData array when component unmounts
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log("book data", bookData);

  const fetchBook = async (e) => {
    e.preventDefault();
    const { bookTitle, authorName } = formState;
    let querySearch = "";

    if (bookTitle && authorName) {
      querySearch = `q=${encodeURIComponent(
        bookTitle
      )}&author=${encodeURIComponent(authorName)}`;
    } else if (bookTitle) {
      querySearch = `title=${encodeURIComponent(bookTitle)}`;
    } else if (authorName) {
      querySearch = `author=${encodeURIComponent(authorName)}`;
    }

    const OPEN_LIBRARY_API = `https://openlibrary.org/search.json?${querySearch}`;

    try {
      const response = await fetch(OPEN_LIBRARY_API);
      if (!response.ok) {
        throw new Error("Fetch Failed");
      }
      const data = await response.json();
      const bookResults = data.docs;
      console.log("Books from API:", bookResults);
      const bookDataWithCover = [];

      for (let i = 0; i < bookResults.length; i++) {
        const book = bookResults[i];
        const key = book.key;
        const title = book.title;
        const author = book.author_name
          ? book.author_name[0]
          : "Unknown Author";
        if (book.cover_i) {
          const COVER_LIBRARY_API = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
          bookDataWithCover.push({
            key: key,
            title: title,
            author: author,
            coverArtUrl: COVER_LIBRARY_API,
          });
        }
      }
      const firstFiveBooks = bookDataWithCover.slice(0, 5);
      setBookData(firstFiveBooks);

      navigate(`/booksearch/${bookTitle ? bookTitle : authorName}`);
    } catch (error) {
      console.log(error);
    } finally {
      setFormState({
        bookTitle: "",
        authorName: "",
      });
    }
  };

  return (
    <Container className="">
      <Outlet bookData={bookData} />
      {bookData.length > 0 && (
        <div className="d-flex justify-content-center my-3">
          <Button className="booklist-button">
            <img src={leftArrow} alt="left arrow" />
          </Button>
          <Button className="booklist-button">
            <img src={rightArrow} alt="right arrow" />
          </Button>
        </div>
      )}
      <Row className="justify-content-center">
        <Col xs="6">
          <h6 className="text-center formTitle">Search for Book</h6>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col className="text-center" xs="6">
          <Form className="bookSearchForm" onSubmit={fetchBook}>
            <Form.Group className="" controlId="formBookTitle">
              <Form.Control
                className="mt-3"
                type="text"
                name="bookTitle"
                placeholder="Title"
                value={formState.bookTitle}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="" controlId="formAuthorName">
              <Form.Control
                className="mt-3"
                type="text"
                name="authorName"
                placeholder="Author"
                value={formState.authorName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button className="search-button" variant="primary" type="submit">
              Search
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default BookSearch;
