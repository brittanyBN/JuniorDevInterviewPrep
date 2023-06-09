import {NavigationBar} from "../Components/NavigationBar";
import {useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import "./FlashcardsList.css";

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
        const {Flashcards, UserId} = response.data.data;
        setCreatorId(UserId);
        setFlashcards(Flashcards);
        return response;
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    }
  }

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
      <div className="buttonLine">
        <button className="start-practice-button" onClick={practiceFlashcards}>
          Start Practice
        </button>
        {userId === creatorId && (
          <button
            className="add-new-code-challenge-button"
            onClick={addFlashcard}
          >
            Add New Flashcard
          </button>
        )}
      </div>
      <div className="code-challenges-container">
        {flashcards.length === 0 ? (
          <p id="empty">
            There are no flashcards in this set yet. Click the button to add
            one!
          </p>
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
