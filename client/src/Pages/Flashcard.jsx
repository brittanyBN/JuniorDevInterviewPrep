import React, { useEffect, useState } from "react";
import { NavigationBar } from "../Components/NavigationBar";
import { useLocation } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import { FlashcardCard } from "../Components/FlashcardCard"; // Import Bootstrap Pagination component
import "../CSS Styles/Practice.css";

export const FlashcardPage = () => {
  const location = useLocation();
  const [flashcards, setFlashcards] = useState([]);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);

  useEffect(() => {
    const flashcardsData = location.search.split("=")[1];
    if (flashcardsData) {
      const decodedFlashcards = JSON.parse(decodeURIComponent(flashcardsData));
      setFlashcards(decodedFlashcards);
    }
  }, [location.search]);

  useEffect(() => {
    setCurrentFlashcardIndex(0);
  }, [flashcards]);

  const handleNextFlashcard = () => {
    setCurrentFlashcardIndex((prevIndex) =>
      prevIndex === flashcards.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousFlashcard = () => {
    setCurrentFlashcardIndex((prevIndex) =>
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="main-flashcard-wrapper">
      <div className="nav">
        <NavigationBar />
      </div>
      <div className="page-style">
        <h1>Flashcard</h1>
        {flashcards.length > 0 ? (
          <FlashcardCard
            question={flashcards[currentFlashcardIndex].question}
            answer={flashcards[currentFlashcardIndex].answer}
          />
        ) : (
          <div className="no-flashcards">
            <h2>No flashcards to practice</h2>
          </div>
        )}
        <div className="button-group">
          <Pagination>
            <Pagination.Prev
              onClick={handlePreviousFlashcard}
              disabled={currentFlashcardIndex === 0} // Adjust the index
            />
            <Pagination.Item disabled>{`${currentFlashcardIndex + 1}/${
              flashcards.length
            }`}</Pagination.Item>
            <Pagination.Next
              onClick={handleNextFlashcard}
              disabled={currentFlashcardIndex === flashcards.length - 1} // Adjust the index
            />
          </Pagination>
        </div>
      </div>
    </div>
  );
};
