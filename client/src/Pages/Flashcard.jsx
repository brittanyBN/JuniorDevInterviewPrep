import { useState, useEffect } from "react";
import { NavigationBar } from "../Components/NavigationBar";
import { Card } from "../Components/FlashcardCard";
import "./practice.css";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";

export const FlashcardPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const [flashcards, setFlashcards] = useState([]);
    const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userId, setUserId] = useState(localStorage.getItem("id"));

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
                    <Card
                        question={flashcards[currentFlashcardIndex].question}
                        answer={flashcards[currentFlashcardIndex].answer}
                    />
                ) : (
                    <div className="no-flashcards">
                        <h2>No flashcards to practice</h2>
                    </div>
                )}
                <div className="button-group">
                    <button
                        className="action-button"
                        onClick={handlePreviousFlashcard}
                    >
                        Previous
                    </button>
                    <button>{`${currentFlashcardIndex + 1}/${flashcards.length}`}</button>
                    <button className="action-button" onClick={handleNextFlashcard}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};
