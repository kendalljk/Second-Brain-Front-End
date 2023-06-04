import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button  from 'react-bootstrap/Button'
import {Container, Row, Col} from 'react-bootstrap';
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';

const BookSearch = ({bookData, setBookData}) => {
    const {title} = useParams();
    const [formTitleState, setFormTitleState] = useState('');
    const [formAuthorState, setFormAuthorState] = useState('');
    const navigate = useNavigate();


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormTitleState(name === 'bookTitle' ? value : formTitleState);
        setFormAuthorState(name === 'authorName' ? value : formAuthorState);
    };

    const fetchBook = async (e) => {
        e.preventDefault();
        const bookTitle = e.target.elements.bookTitle.value;
        const authorName = e.target.elements.authorName.value;

        let querySearch = ''

        if (bookTitle && authorName) {
            querySearch = `q=${encodeURIComponent(bookTitle)}&author=${encodeURIComponent(authorName)}`;
        } else if (bookTitle) {
            querySearch = `title=${encodeURIComponent(bookTitle)}`;
        } else if (authorName) {
            querySearch = `author=${encodeURIComponent(authorName)}`;
        }

        const OPEN_LIBRARY_API = `https://openlibrary.org/search.json?${querySearch}`

    
        try {
            const response = await fetch(OPEN_LIBRARY_API);
            if (response.ok) {
                const data = await response.json();
                const bookResults = data.docs;
                const bookDataWithCover = [];
        
                for (let i = 0; i < bookResults.length; i++) {
                    const book = bookResults[i];
                    const title = book.title;
                    const author = book.author_name ? book.author_name[0] : "Unknown Author";
                    if (book.cover_i) {
                        const COVER_LIBRARY_API = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
                        bookDataWithCover.push({
                            title: title,
                            author: author,
                            coverArtUrl: COVER_LIBRARY_API,
                        });
                    }
                }
                const firstFiveBooks = bookDataWithCover.slice(0,5);
                setBookData(firstFiveBooks);
                if (bookTitle){
                    
                    navigate(`/booksearch/${bookTitle}`);  
                }
                if (authorName){
                    navigate(`/booksearch/${authorName}`);
                }
            } else {
                console.log('Fetch Failed');
            }
            } catch (error) {
                console.log(error);
            }
            setFormTitleState('');
            setFormAuthorState('');
        };
    
    return (
    <Container className=''>
        <Outlet bookData={bookData} />
        <Row className='justify-content-center'>
            <Col lg='4' sm='4'>
            <h6 className='text-center formTitle'>Search for Book</h6>
            </Col>
        </Row>
        <Row className='justify-content-center'>
            <Col className='text-center' lg='4' sm='4'>
                <Form className='bookSearchForm' onSubmit={fetchBook}>
                    <Form.Group className='' controlId='formBookTitle'>
                        <Form.Label className='py-1'>Search by Book Title:</Form.Label>
                        <Form.Control 
                        type='text' 
                        name='bookTitle' 
                        placeholder='Book Title'
                        value={formTitleState}
                        onChange={handleInputChange}/>
                    </Form.Group>
                    <Form.Group className='' controlId='formAuthorName'>
                        <Form.Label className='py-1'>Search by Author Name: </Form.Label>
                        <Form.Control 
                        type='text' 
                        name='authorName' 
                        placeholder='Author Name'
                        value={formAuthorState}
                        onChange={handleInputChange}/>
                    </Form.Group>
                    <Button className='searchBtn' variant='primary' type='submit'>
                    Search
                    </Button>
                </Form>
            </Col>
        </Row>
    </Container>
    )
}

export default BookSearch;

