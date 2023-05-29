import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Welcome from "../components/Welcome"
import About from "../components/About";
import Contact from "../components/Contact";



function Navbar() {
    return (
    <Router>
        <div className="app-container">
            <div className="nav-container">
                <nav className="nav-bar">
                    <ul>
                        <li><Link to="/welcome">Welcome</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </nav>
                </div>
                <div className="content-page">
                <Routes>
                    <Route path="/welcome" element={<Welcome/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="*" element={<Welcome />} />
                </Routes>
            </div>
        </div>
    </Router>
    )
}

export default Navbar