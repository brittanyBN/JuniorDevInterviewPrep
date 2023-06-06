import React, { useEffect, useState } from "react";
import { NavigationBar } from "../Components/NavigationBar";
import { CardSetCard } from "../Components/CardSetCard";
import "./PracticeSet.css";
import axios from "axios";
import { Link } from "react-router-dom";

export const FlashcardSetPage = () => {
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [token] = useState(localStorage.getItem("token"));
  const [id] = useState(localStorage.getItem("id"));
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 8;

  useEffect(() => {
    fetchFlashcardSets().then(() => {
      console.log("Flashcard sets fetched");
    });
  }, [token, id, currentPage]);

  async function fetchFlashcardSets() {
    if (!token) {
      alert("You must be logged in to add a new flashcard set");
      window.location.href = "/login";
    }

    try {
      const response = await axios.get(
        `/flashcardSets/set/${id}?page=${currentPage}&size=${itemsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-User-Role": "admin",
            "Content-Type": "application/json",
          },
        }
      );
      setFlashcardSets(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
      return response;
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
        "/flashcardSets",
        {
          name: data,
          UserId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      const newResponse = await fetchFlashcardSets();
      setFlashcardSets(newResponse.data.data);
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
