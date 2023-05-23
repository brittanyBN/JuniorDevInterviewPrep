import { NavigationBar } from "../Components/NavigationBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./CodeChallengesList.css";

export const FlashcardsListPage = () => {
    const { id } = useParams();
    const [flashcards, setFlashcards] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userId, setUserId] = useState(localStorage.getItem('id'));

    useEffect(() => {
        fetchFlashcards(id).then(() => console.log("Flashcards fetched"));
    }, [id, token, userId]);

    const fetchFlashcards = async (flashcardId) => {
        try {
            const response = await axios.get(`/flashcardSet/${flashcardId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            const flashcardsData = response.data.data.Flashcards;
            console.log("challenge data", flashcardsData);
            setFlashcards(flashcardsData);
        } catch (error) {
            console.error("Error fetching flashcards:", error);
        }
    };

    const practiceFlashcards = () => {
        window.location.href = `/flashcard`;
    }

    const addFlashcard = async () => {
        if (!token) {
            alert("You must be logged in to add a new flashcard");
            return;
        }
        let question = prompt("Enter question");
        let answer = prompt("Enter answer");
        try {
            const response = await axios.post("/flashcard", {
                question: question,
                answer: answer,
                flashcardSetId: id,
                UserId: userId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const finalResponse = await fetchFlashcards(id);
            setFlashcards(finalResponse.data.data.Flashcards);
        } catch (error) {
            console.error("Error adding code challenge:", error);
        }
    };

    return (
        <div className="Main-codeChallengeList-wrapper">
            <NavigationBar />
            <div className="buttonLine">
                <button className="start-practice-button" onClick={practiceFlashcards}>Start Practice</button>
                <button className="add-new-code-challenge-button" onClick={addFlashcard}>Add New Flashcard</button>
            </div>
            <div className="code-challenges-container">
                {flashcards.length === 0 ? (
                    <p id="empty">There are no flashcards in this set yet. Click the button to add one!</p>
                ) : (
                    flashcards.map((flashcard) => (
                        <div key={flashcard.id} className="code-challenge">
                            <div className="question">{flashcard.question}</div>
                            <div className="solution">{flashcard.answer}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
