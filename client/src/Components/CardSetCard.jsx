import React, { useState } from "react";
import "./CardSetCard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CardSetCard = ({ name }) => {
  const navigate = useNavigate();

  const [flashcard, setFlashcard] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const fetchCards = async () => {
    if (!token) {
      alert("You must be logged in to view flashcards");
    } else {
      try {
        const response = await axios.get("/flashcardSet");
        setFlashcard(response.data.data);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    }
  };

  return (
    <div className="Main-cardSet-wrapper">
      <div>
        <div id="card" onClick={fetchCards}>
          {name}
        </div>
      </div>
    </div>
  );
};
