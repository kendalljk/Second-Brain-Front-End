import React from 'react'
import { useState } from "react";
import {Container, Col, Row} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONE_REGEX = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

const initialState = {
    fullName: "",
    email: "",
    phone: "",
    date: "",
    message: "",
    error: "",
}

const minLength = (value, length) => value.length >= length;
const maxLength = (value, length) => value.length <= length;
const required = (value) => value !== "";
const pattern = (value, pattern) => String(value).toLocaleLowerCase().match(pattern);

const validateName = (fullName) =>{
    if (!required(fullName)) return "Please enter your name."
    if (!minLength(fullName, 2)) return "Your name must be at least 2 characters."
    if (!maxLength(fullName, 25)) return "Your name must be no longer than 25 characters."
    return "";
}

const validateDate = (date) => {
    if (!required(date)) return "Please select a date"
}

const validateMessage = (message) => {
    if(!required(message)) return "Please enter a message."
    if (!minLength(message, 2)) return "Your message must be at least 2 characters."
    if (!maxLength(message, 300)) return "Please limit your message to 300 characters."
    return "";
}

const validateEmail = (email) => {
    if (!required(email)) return "Email is required"
    if (!pattern(email, EMAIL_REGEX)) return "Invalid email format.";
    return "";
}

const validatePhone = (phone) => {
    if (!required(phone)) return "Phone number is required"
    if (!pattern(phone, PHONE_REGEX)) return "Invalid phone number format."
    return "";
}

const ERROR_DICT = {
    fullName: validateName,
    email: validateEmail,
    phone: validatePhone,
    date: validateDate,
    message: validateMessage,
}

const Contact = () => {
    const [state, setState] = useState(initialState);
    const [error, setError] = useState(initialState);

    const validateInputs = (property, value) => {
        return ERROR_DICT[property](value);
    }

    const handleChange = (e) => {
        setState((state) =>({
        ...state, 
        [e.target.name] : e.target.value
        }));
        setError((error) => ({
        ...error,
        [e.target.name]: validateInputs(e.target.name, e.target.value),
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(
        `Thanks for reaching out, ${state.fullName}. You can expect an email response at ${state.email} in 1-2 business days.`
        )
        setState(initialState);
        }

    return (
    <Container>
        <Row className='text-center'>
            <h2 style={{marginTop: '2%'}}>Contact</h2>
            <p>To request a date, or for more information, please contact me.</p>
        </Row>
        <Row className='justify-content-center'>
            <Col className='col-md-6'>
                <Form className='col-lg' style={{}} onSubmit={handleSubmit}>
                    <Form.Group className='fullName'>
                        <Form.Label>Full Name:</Form.Label>
                        <Form.Control type='text' placeholder="Enter Full Name" name="fullName" id="fullName" value={state.fullName} onChange={handleChange}/>
                    </Form.Group>
                    {error.fullName && <span className="error-text">{error.fullName}</span>}
                    <Form.Group className='email'>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type='email' placeholder="Enter Email" name="email" id="email" value={state.email} onChange={handleChange}/>
                    </Form.Group>
                    {error.email && <span className="error-text">{error.email}</span>}
                    <Form.Group className='phone'>
                        <Form.Label>Phone Number:</Form.Label>
                        <Form.Control type='tel' placeholder="(XXX)-XXX-XXXX" name="phone" id="phone" value={state.phone} onChange={handleChange}/>
                    </Form.Group>
                    {error.phone && <span className="error-text">{error.phone}</span>}
                    <Form.Group className='date'>
                        <Form.Label>Date Requesting:</Form.Label>
                        <Form.Control type='date' name="date" id="date" value={state.date} onChange={handleChange}/>
                    </Form.Group>
                    {error.date && <span className="error-text">{error.date}</span>}
                    <Form.Group className='message'>
                        <Form.Label>Message</Form.Label>
                        <Form.Control as='textarea' placeholder="Tell me about what you're looking for, any special requests... " name="message" id="message" style={{height: '100px', verticalAlign: 'top'}} value={state.message} onChange={handleChange}/>
                    </Form.Group>
                    {error.message && <span className="error-text">{error.message}</span>}
                    <div className='d-flex justify-content-center'>
                        <Button style={{marginTop: '5%'}} variant='outline-primary' type="submit">Submit</Button>
                    </div>
                </Form>
            </Col>
        </Row>
    </Container>
    );
};

export default Contact