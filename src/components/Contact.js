import React from 'react'
import { useState } from "react";

const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONE_REGEX = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    error: "",
}

const minLength = (value, length) => value.length >= length;
const maxLength = (value, length) => value.length <= length;
const required = (value) => value !== "";
const pattern = (value, pattern) => String(value).toLocaleLowerCase().match(pattern);

const validateName = (name) =>{
    if (!required(name)) return "Please enter your name."
    if (!minLength(name, 2)) return "Your name must be at least 2 characters."
    if (!maxLength(name, 12)) return "Your name must be no longer than 12 characters."
    return "";
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
    firstName: validateName,
    lastName: validateName,
    email: validateEmail,
    phone: validatePhone,
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
        `Thanks for reaching out, ${state.firstName}. You can expect an email response at ${state.email} in 1-2 business days.`
        )
        setState(initialState);
        }

    return (
    <div className='contact-form'>
        <div className='contact-header'>
            <h2>Contact</h2>
            <p>To request a date, or for more information, please contact me.</p>
        </div>
        <form onSubmit={handleSubmit}>
            <label>
                First Name:
                <input placeholder="First Name" type="text" name="firstName" id="firstName" value={state.firstName} onChange={handleChange}/>
            </label>
            {error.firstName && <span className="error-text">{error.firstName}</span>}
            <label>
                Last Name:
                <input placeholder="Last Name" type="text" name="lastName" id="lastName" value={state.lastName} onChange={handleChange}/>
            </label>
            {error.lastName && <span className="error-text">{error.lastName}</span>}
            <label>
                Email:
                <input placeholder="you@provider.com" type="email" name="email" id="email" value={state.email} onChange={handleChange}/>
            </label>
            {error.email && <span className="error-text">{error.email}</span>}
            <label>
                Phone Number:
                <input placeholder="(XXX)-XXX-XXXX" type="tel" name="phone" id="phone" value={state.phone} onChange={handleChange}/>
            </label>
            {error.phone && <span className="error-text">{error.phone}</span>}
            <label>
                Tell me about what you're looking for, any special requests... 
                <textarea placeholder="Message" type="text" name="message" id="phone" value={state.message} onChange={handleChange}/>
            </label>
            {error.message && <span className="error-text">{error.message}</span>}
            <button type="submit">Submit</button>
        </form>
    </div>
    );
};

export default Contact