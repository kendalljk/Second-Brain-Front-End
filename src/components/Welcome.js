import React, { useState, useEffect, useRef } from "react";
import {Container, Col, Row} from "react-bootstrap";
import Image from "react-bootstrap/Image";
const DOG_API = "https://dog.ceo/api/breeds/image/random";


const Welcome = () => {
  const [currentDog, setCurrentDog] = useState("");
  const timerRef = useRef(null);

  const fetchDog = async () => {
    try {
      const response = await fetch(DOG_API);
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.log("Error fetching dog:", error);
    }
  };

  const updateDog = async () => {
    const newDog = await fetchDog();
    setCurrentDog(newDog);
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      updateDog();
    }, 5000);
  };

  useEffect(() => {
    updateDog();
    resetTimer();
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  return (
    <Container className="welcome-display">
      <Row className="justify-content-center">
        <Col className="col-md-8">
            <Image fluid={true} src={currentDog} id="welcome-image" alt="A lovely dog" />
          </Col>
      </Row>
    </Container>
  );
};

export default Welcome;