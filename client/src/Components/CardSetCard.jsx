import React, {useState} from "react";
import "./CardSetCard.css";
import axios from "axios";

export const CardSetCard = ({ name }) => {
    const [flashcard, setFlashcard] = useState([]);

    const fetchCards = async () => {
        try {
            const response = await axios.get("/flashcardSet");
            setFlashcard(response.data.data);
        } catch (error) {
            console.error("Error fetching flashcards:", error);
        }
    }

    return (
        <div className="Main-cardSet-wrapper">
            <div>
                <div id="card" onClick={fetchCards}>{name}</div>
            </div>
        </div>
    );
};
