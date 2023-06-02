import React from 'react'
import { useParams } from 'react-router-dom';
import { Container, Col, Row, Button } from 'react-bootstrap';

    const BookList = ({bookData}) => {
    const {title} = useParams();


    return (
        <Container>
            <Row as='h1'>Select your book:</Row>
            <Row>
            {bookData.map((book) => (
                <Col>
                    <li key={book.isbn}>
                        <img src={book.coverArtUrl} alt={book.title}/><br/>
                        {book.title}<br/>
                        By: {book.author}
                    </li>
                    <Button variant='outline-primary'>Select</Button>
                </Col>
            ))}
            </Row>
        </Container>
        );
    };

export default BookList