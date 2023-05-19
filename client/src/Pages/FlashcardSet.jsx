import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "../Components/NavigationBar";
import { CardSetCard } from "../Components/CardSetCard";
import "./PracticeSet.css";
import axios from "axios";

export const FlashcardSetPage = () => {
    const [flashcardSets, setFlashcardSets] = useState([]);

    useEffect(() => {
        fetchFlashcardSets().then(r => console.log(r));
    }, []);

    const fetchFlashcardSets = async () => {
        try {
            const response = await axios.get("/flashcardSet");
            setFlashcardSets(response.data.data);
        } catch (error) {
            console.error("Error fetching flashcard sets:", error);
        }
    }

    return (
        <div className="Main-flashcardSet-wrapper">
            <NavigationBar />
            <div className="header">
                <h1>Flashcard Set</h1>
                <div id="add">
                    <button>Add New Flashcard Set</button>
                </div>
            </div>
            <div className="cardSet">
                {flashcardSets.map((flashcardSet) => (
                    <CardSetCard key={flashcardSet.id} name={flashcardSet.name} />
                ))}
            </div>
            <div className="button-group">
                <button>Previous</button>
                <button>Next</button>
            </div>
        </div>
    );
}
