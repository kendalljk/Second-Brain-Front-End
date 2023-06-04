import React from 'react'
import { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';


const CreateNote = ({bookData, myNote, setMyNote}) => {
    console.log('My Note:', myNote);

    return (
    <Container className='note-container'>
        <Row className='note-row'>
            <Col className='note-col d-flex justify-content-center text-center'>
                <Card className='note-bookCard' style={{width: '20rem', height: '30rem'}}>
                    <Card.Img className='noteImg' src={myNote.coverArtUrl} alt={myNote.title}/>
                    <Card.Body style={{padding: '10px'}}>
                        <Card.Title as='h5' className='card-title'>{myNote.title}</Card.Title>
                        <Card.Text>By: {myNote.author}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col className='note-col'>
                <Form className='noteForm' onSubmit={''}>
                    <Form.Label as='h6' className=''>Book Genre:</Form.Label>
                    <Form.Select aria-label="book-genre">
                        <option>Select a genre...</option>
                        <option value="1">Action/Adventure</option>
                        <option value="2">Autobiography/ Biography</option>
                        <option value="3">Fantasy</option>
                        <option value="4">History</option>
                        <option value="5">Horror</option>
                        <option value="6">Historical Fiction</option>
                        <option value="7">Mystery</option>
                        <option value="8">Philosophy</option>
                        <option value="9">Self-Development</option>
                    </Form.Select>
                    <Form.Label as='h6' className=''>Book Summary: </Form.Label>
                    <Form.Control
                    as="textarea"
                    placeholder="Brief summary..."
                    style={{ height: '100px' }}
                    />
                    <Form.Label as='h6' className=''>Favorite quotes, memorable passages...</Form.Label>
                    <Form.Control
                    as="textarea"
                    placeholder="Favorite quotes, memorable passages..."
                    style={{ height: '100px' }}
                    />
                    <Form.Label as='h6' className=''>My notes...</Form.Label>
                    <Form.Control
                    as="textarea"
                    placeholder="My notes, final thoughts..."
                    style={{ height: '100px' }}
                    />
                    <Form.Check
                    type='checkbox'
                    id='finishedBook'
                    label='Finished Book'
                    />
                    <Row>
                        <Form.Label as='h6'>Date Book Finished:
                        <input className='m-3' type="date" name="dateFinished" />
                        </Form.Label>
                    </Row>
                    <Button className='noteBtn' variant='primary' type='submit'>
                    Add Note
                    </Button>
                </Form> 
            </Col>
        </Row>

    </Container>
    )
}

export default CreateNote