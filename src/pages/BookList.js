import React, {useEffect} from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import { useNavigate } from 'react-router-dom';

const BookList = ({bookData, myNote, setMyNote}) => {
    const navigate = useNavigate();

    const navToNote = (book) => {
        const selectedBookData = {
            title: book.title,
            author: book.author,
            coverArtUrl: book.coverArtUrl,
        };
        console.log(selectedBookData);
        setMyNote((prevNote => ({
            ...prevNote, 
            ...selectedBookData,
        })));
        navigate(`/createnote/${encodeURIComponent(book.title)}`);
    }

    useEffect(() => {
        console.log('My Note:', myNote);
    }, [myNote]);

    return (
        <Container className='text-center'>
            <Row>
            {bookData.map((book) => (
                <Col>
                    <Card className='bookCard' key={book.isbn} style={{width: '10rem', height: '20rem'}}>
                        <Card.Img className='bookImg' variant='top' src={book.coverArtUrl} alt={book.title}/>
                        <Card.Body style={{padding: '5%'}}>
                            <Card.Title as='h6' className='card-title'>{book.title}</Card.Title>
                            <Card.Text>By: {book.author}</Card.Text>
                        </Card.Body>
                        <Button variant='outline-primary' onClick={() => navToNote(book)}>Select</Button>
                    </Card>
                </Col>
            ))}
            </Row>
            <div className='navigation-buttons'>
                <Button>Back</Button><Button>Next</Button>
            </div>
        </Container>
        );
    };

export default BookList