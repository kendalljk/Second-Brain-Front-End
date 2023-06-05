import React from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'

const NotesPage = ({noteCollection}) => {
    return (
    <Container className='text-center'>
        <Row>
        {noteCollection? (noteCollection.map((book) => (
            <Col className='d-flex justify-content-center' key={book.key}>
                <Card className='bookCard' style={{width: '10rem', height: '20rem'}}>
                    <Card.Img className='bookImg' variant='top' src={book.coverArtUrl} alt={book.title}/>
                    <Card.Body style={{padding: '5%'}}>
                        <Card.Title as='h6' className='card-title'>{book.title}</Card.Title>
                        <Card.Text>By: {book.author}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        ))
    ) : <span>No current notes to display</span>}
        </Row>
    </Container>
    );
};

export default NotesPage;