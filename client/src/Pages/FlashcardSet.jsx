import { useEffect, useState } from "react";
import { NavigationBar } from "../Components/NavigationBar";
import { CardSetCard } from "../Components/CardSetCard";
import "./PracticeSet.css";
import axios from "axios";
import { Link } from "react-router-dom";

export const FlashcardSetPage = () => {
    const [flashcardSets, setFlashcardSets] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [id, setId] = useState(localStorage.getItem("id"));

    useEffect(() => {
        if (token && id) {
            fetchFlashcardSets().then(() => console.log("Flashcard sets fetched"));
        }
    }, [token, id]);

    async function fetchFlashcardSets() {
        try {
            const response = await axios.get("/flashcardSet");
            let filteredSets = [];

            if (flashcardSets.length === 0) {
                let prompt = prompt("No flashcard sets found. Would you like to use the default sets?");
                if (prompt === "yes") {
                    filteredSets = response.data.data.filter(
                        (flashcardSet) => flashcardSet.UserId === "d3721562-786c-4fe1-82bf-b3aaa0206fbf"
                    );
                }
            } else {
                filteredSets = response.data.data.filter(
                    (flashcardSet) => flashcardSet.UserId === id
                );
            }

            setFlashcardSets(filteredSets);
        } catch (error) {
            console.error("Error fetching flashcard sets:", error);
        }
    }


    async function addNewFlashcardSet() {
        if (!token) {
            alert("You must be logged in to add a new flashcard set");
            return;
        }

        let data = prompt("Enter the name of the new flashcard set");
        try {
            const response = await axios.post(
                "/flashcardSet",
                {
                    name: data,
                    UserId: id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const finalResponse = await fetchFlashcardSets();
            setFlashcardSets(finalResponse.data.data);
        } catch (error) {
            console.error("Error posting new flashcard set:", error);
        }
    }

    return (
        <div className="Main-flashcardSet-wrapper">
            <NavigationBar />
            <div className="header">
                <h1>Flashcard Set</h1>
                <div id="add">
                    <button onClick={addNewFlashcardSet}>Add New Flashcard Set</button>
                </div>
            </div>
            <div className="cardSet">
                {flashcardSets.map((flashcardSet) => (
                <Link key={flashcardSet.id} to={`/flashcardSet/${flashcardSet.id}`}>
                    <CardSetCard name={flashcardSet.name} />
                </Link>
                ))}
            </div>
            <div className="button-group">
                <button>Previous</button>
                <button>Next</button>
            </div>
        </div>
    );
};