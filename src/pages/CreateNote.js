import React from "react";
import { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
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
}) => {
  const navigate = useNavigate();

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

  return (
    <Container className="display-note-container">
      <Row className="display-note-row">
        <Col className="display-note-col d-flex justify-content-center text-center">
          <Card
            className="display-note-bookCard"
            style={{ width: "20rem", height: "30rem" }}
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
            <Form.Label as="h6" className="">
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
            <Button className="displayNoteBtn" variant="primary" type="submit">
              Add Note
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateNote;
