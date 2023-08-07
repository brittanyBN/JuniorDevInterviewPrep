import React, { useEffect, useState } from "react";
import { NavigationBar } from "../Components/NavigationBar";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../CSS Styles/FlashcardList.css";

export const FlashcardsListPage = () => {
  const { id } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [token] = useState(localStorage.getItem("token"));
  const [userId] = useState(localStorage.getItem("id"));
  const [creatorId, setCreatorId] = useState("");

  useEffect(() => {
    fetchFlashcards(id).then(() => console.log("Flashcards fetched"));
  }, [id, token, userId]);

  const fetchFlashcards = async (flashcardId) => {
    if (!token) {
      alert("You must be logged in to complete code challenges");
      window.location.href = "/login";
    } else {
      try {
        const response = await axios.get(`/flashcardSets/list/${flashcardId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { Flashcards, UserId } = response.data.data;
        setCreatorId(UserId);
        setFlashcards(Flashcards);
        return response;
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    }
  };

  const practiceFlashcards = () => {
    if (flashcards.length === 0) {
      alert("You must add flashcards to this set before you can practice them");
    } else {
      const flashcardsData = encodeURIComponent(JSON.stringify(flashcards));
      window.location.href = `/flashcard/${id}?flashcards=${flashcardsData}`;
    }
  };

  const addFlashcard = async () => {
    if (!token) {
      alert("You must be logged in to add a new flashcard");
      return;
    }

    if (userId !== creatorId) {
      return;
    }

    const question = prompt("Enter question");
    const answer = prompt("Enter answer");

    try {
      await axios.post(
        "/flashcards",
        {
          question: question,
          answer: answer,
          FlashcardSetId: id,
          UserId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const finalResponse = await fetchFlashcards(id);
      setFlashcards(finalResponse.data.data.Flashcards);
    } catch (error) {
      console.error("Error adding flashcard:", error);
    }
  };

  return (
    <div className="Main-codeChallengeList-wrapper">
      <NavigationBar />
      <div className="d-flex justify-content-between buttonLine">
        <Button
          className="start-practice-button"
          onClick={practiceFlashcards}
          variant="secondary"
        >
          Start Practice
        </Button>
        {userId === creatorId && (
          <Button
            className="add-new-code-challenge-button"
            onClick={addFlashcard}
            variant="secondary"
          >
            Add New Flashcard
          </Button>
        )}
      </div>
      <div className="code-challenges-container border border-secondary mt-4 p-3 mx-auto w-80">
        {flashcards.length === 0 ? (
          <p
            id="empty"
            className="d-flex justify-content-center align-items-center h-100"
          >
            There are no flashcards in this set yet. Click the button to add
            one!
          </p>
        ) : (
          flashcards.map((flashcard) => (
            <div key={flashcard.id} className="code-challenge d-flex">
              <div className="question w-100 p-3 border border-secondary fs-5 m-0">
                {flashcard.question}
              </div>
              <div className="solution w-100 p-3 border border-secondary fs-5 m-0">
                {flashcard.answer}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
