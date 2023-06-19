import React from "react";
import { useState } from "react";
import { Container, Col, Row, Alert } from "react-bootstrap";
import { Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateNote = ({
  myNote,
  setMyNote,
  noteCollection,
  setNoteCollection,
  toReadList,
  setToReadList,
}) => {
  const navigate = useNavigate();

  const titleOfNote = myNote.title;
  const authorOfNote = myNote.author;

  const initialFormState = {
    bookGenre: "",
    finished: false,
    dateFinished: "",
    bookSummary: "",
    favoriteQuotes: "",
    myThoughts: "",
  };

  const [formState, setFormState] = useState(initialFormState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log("Form State:", formState);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (toReadList.some((book) => book.title === titleOfNote)) {
      setToReadList(toReadList.filter((book) => book.title !== titleOfNote));
    }

    const newNote = {
      ...myNote,
      ...formState,
    };
    setMyNote(newNote);
    setNoteCollection((prevCollection) => [...prevCollection, newNote]);

    console.log("Note Collection:", noteCollection);
    setFormState(initialFormState);
  };

  useEffect(() => {
    if (noteCollection.includes(myNote)) {
      navigate(`/notespage`);
    }
    console.log("My Note Collection:", noteCollection);
  }, [noteCollection, navigate, myNote]);

  const goToNotes = () => {
    navigate(`/notespage`);
  };

  return (
    <Container className="display-note-container d-flex justify-content-center text-align-center mt-3">
      {noteCollection.some(
        (book) => book.title === titleOfNote && book.author === authorOfNote
      ) ? (
        <Alert
          id="duplicateAlert"
          show={true} // must be in brackets to prevent error
          variant="warning"
          style={{
            width: "30%",
            height: "30%",
            textAlign: "center",
            boxShadow: "10px 10px 10px 5px rgba(0, 0, 0, 0.2)",
            marginTop: "10%",
          }}
        >
          <Alert.Heading>Theres already a note for this book!</Alert.Heading>
          <p>
            Unlock your potential through the transformative power of reading
            and learning from the wisdom of others. Search for books, add your
            insightful notes, and embark on a journey of enriching your mind and
            enhancing your learning.
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={goToNotes} variant="outline-success">
              Go to Notes
            </Button>
          </div>
        </Alert>
      ) : (
        <Row className="display-note-row">
          <Col className="display-note-col d-flex justify-content-center text-center">
            <Card
              className="display-note-bookCard"
              style={{
                width: "20rem",
                height: "38rem",
                boxShadow: "10px 10px 10px 5px rgba(0, 0, 0, 0.5)",
              }}
            >
              <Card.Img
                className="displayNoteImg"
                src={myNote.coverArtUrl}
                alt={myNote.title}
              />
              <Card.Body style={{ padding: "10px" }}>
                <Card.Title as="h5" className="card-title">
                  {myNote.title}
                </Card.Title>
                <Card.Text>By: {myNote.author}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="display-note-col">
            <Form className="displayNoteForm" onSubmit={handleSubmit}>
              <Form.Label as="h6" className="mt-0">
                Book Genre:
              </Form.Label>
              <Form.Select
                aria-label="bookGenre"
                name="bookGenre"
                onChange={handleInputChange}
                value={formState.bookGenre}
              >
                <option>Select a genre...</option>
                <option value="Action/Adventure">Action/Adventure</option>
                <option value="Autobiography/Biography">
                  Autobiography/ Biography
                </option>
                <option value="Fantasy">Fantasy</option>
                <option value="History">History</option>
                <option value="Horror">Horror</option>
                <option value="Historical Fiction">Historical Fiction</option>
                <option value="Mystery">Mystery</option>
                <option value="Philosophy">Philosophy</option>
                <option value="Self-Development">Self-Development</option>
              </Form.Select>
              <Form.Label as="h6" className="">
                Book Summary:{" "}
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Brief summary..."
                style={{ height: "100px" }}
                name="bookSummary"
                value={formState.bookSummary}
                onChange={handleInputChange}
              />
              <Form.Label as="h6" className="">
                Favorite quotes, memorable passages...
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Favorite quotes, memorable passages..."
                style={{ height: "100px" }}
                name="favoriteQuotes"
                value={formState.favoriteQuotes}
                onChange={handleInputChange}
              />
              <Form.Label as="h6" className="">
                My notes...
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="My notes, final thoughts..."
                style={{ height: "100px" }}
                name="myThoughts"
                value={formState.myThoughts}
                onChange={handleInputChange}
              />
              <Form.Check
                type="checkbox"
                id="finishedBook"
                label="Finished Book"
                name="finished"
                value={formState.finished}
                onChange={handleCheckboxChange}
              />
              <Row>
                <Form.Label as="h6">
                  Date Book Finished:
                  <input
                    className="m-3"
                    type="date"
                    name="dateFinished"
                    value={formState.dateFinished}
                    onChange={handleInputChange}
                  />
                </Form.Label>
              </Row>
              <Button
                className="displayNoteBtn"
                variant="primary"
                type="submit"
              >
                Add Note
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CreateNote;
