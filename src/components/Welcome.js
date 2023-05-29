import React, { useState, useEffect, useRef } from "react";
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
    <div className="image-display">
      <img src={currentDog} alt="A lovely dog" />
    </div>
  );
};

export default Welcome;