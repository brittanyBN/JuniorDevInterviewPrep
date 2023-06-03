import React, { useEffect, useState } from "react";
import { NavigationBar } from "../Components/NavigationBar";
import { CardSetCard } from "../Components/CardSetCard";
import "./PracticeSet.css";
import axios from "axios";
import { Link } from "react-router-dom";

export const FlashcardSetPage = () => {
    const [flashcardSets, setFlashcardSets] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [id, setId] = useState(localStorage.getItem("id"));
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        fetchFlashcardSets().then(() => console.log("Flashcard sets fetched"));
    }, [token, id, currentPage]);

    async function fetchFlashcardSets() {
        if (!token) {
            alert("You must be logged in to add a new flashcard set");
            return;
        }
        try {
            const response = await axios.get(`/flashcardSet`, {
                params: { page: currentPage, size: itemsPerPage },
            });
            setFlashcardSets(response.data.data);
            setTotalPages(response.data.pagination.totalPages);
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
        console.log(data);
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
            console.log("finalResponse", finalResponse);
            setFlashcardSets(finalResponse.data.data);
        } catch (error) {
            console.error("Error posting new flashcard set:", error);
        }
    }

    function handlePreviousPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function handleNextPage() {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <div className="Main-flashcardSet-wrapper">
            <NavigationBar />
            <div className="header">
                <h1>Flashcard Set</h1>
                <div id="add">
                    <button onClick={addNewFlashcardSet} id="newFlashcard">
                        Add New Flashcard Set
                    </button>
                </div>
            </div>
            <div className="cardSet">
                {flashcardSets.map((flashcardSet) => (
                    <Link
                        className="link"
                        key={flashcardSet.id}
                        to={`/flashcardSet/${flashcardSet.id}`}
                    >
                        <CardSetCard name={flashcardSet.name} />
                    </Link>
                ))}
            </div>
            <div className="button-group">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <button>{`${currentPage}/${totalPages}`}</button>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};
