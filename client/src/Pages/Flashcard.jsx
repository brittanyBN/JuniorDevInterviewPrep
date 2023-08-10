import React, { useEffect, useState } from "react";
import { NavigationBar } from "../Components/Common/NavigationBar";
import { useLocation } from "react-router-dom";
import { FlashcardCard } from "../Components/FlashcardCard";
import "../CSS Styles/Practice.css";
import { PracticeButtonGroup } from "../Components/Common/PracticeButtonGroup";

export const FlashcardPage = () => {
  const location = useLocation();
  const [flashcards, setFlashcards] = useState([]);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);

  useEffect(() => {
    const flashcardsData = location.search.split("=")[1];
    if (flashcardsData) {
      console.log("data", flashcardsData);
      const decodedFlashcards = JSON.parse(decodeURIComponent(flashcardsData));
      console.log("dec", decodedFlashcards);
      setFlashcards(decodedFlashcards);
      console.log(flashcards);
      setCurrentFlashcardIndex(0);
    }
  }, [location.search]);

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
        <PracticeButtonGroup
          currentIndex={currentFlashcardIndex}
          setCurrentIndex={setCurrentFlashcardIndex}
          set={flashcards}
        />
      </div>
    </div>
  );
};
