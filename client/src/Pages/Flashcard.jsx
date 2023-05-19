import React, {useState, useEffect} from "react";
import { NavigationBar } from "../Components/NavigationBar";
import { Card } from "../Components/Card";
import "./practice.css";
import axios from "axios";

export const FlashcardPage = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);

    useEffect(() => {
        fetchFlashcards().then(r => console.log(r));
    }, []);

    const fetchFlashcards = async () => {
        try {
            const response = await axios.get("/flashcard");
            setFlashcards(response.data.data);
        } catch (error) {
            console.error("Error fetching flashcards:", error);
        }
    };

    const cards = flashcards.map((card) => {
        return <Card card={card} key={card.id} />;
    });

    const loading = <div className="loading">Loading flashcard content...</div>;

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
                    <Card question={flashcards[currentFlashcardIndex].question} />
                ) : (
                    <div>Loading flashcards...</div>
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