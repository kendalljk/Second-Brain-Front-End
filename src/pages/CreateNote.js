import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button  from 'react-bootstrap/Button'
import {Container, Row, Col} from 'react-bootstrap';
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const CreateNote = ({bookData, setBookData}) => {
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
                console.log("Book Data:", bookResults);
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
                console.log(firstFiveBooks);
        
                setBookData(firstFiveBooks);
                console.log("Books with Covers:", bookDataWithCover)

                if (bookTitle){
                    navigate(`/createnote/${bookTitle}`);  
                }
                if (authorName){
                    navigate(`/createnote/${authorName}`);
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
    <Container>
        <Row>
            
        </Row>
        <Outlet bookData={bookData} />
        <Form onSubmit={fetchBook}>
            <Row>
                <Col lg='4'>
                    <Form.Group className='mb-3' controlId='formBookTitle'>
                        <Form.Label>Search by Book Title:</Form.Label>
                        <Form.Control 
                        type='text' 
                        name='bookTitle' 
                        placeholder='Book Title'
                        value={formTitleState}
                        onChange={handleInputChange}/>
                    </Form.Group>
                </Col>
                <Col lg='4'>
                    <Form.Group className='mb-3' controlId='formAuthorName'>
                        <Form.Label>Search by Author Name: </Form.Label>
                        <Form.Control 
                        type='text' 
                        name='authorName' 
                        placeholder='Author Name'
                        value={formAuthorState}
                        onChange={handleInputChange}/>
                    </Form.Group>
                </Col>
            </Row>
            <Button variant='primary' type='submit'>
            Search
            </Button>
        </Form>
    </Container>
    )
}

export default CreateNote;

