import { NavigationBar } from "../Components/Common/NavigationBar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../CSS Styles/FlashcardList.css";
import { fetchFlashcards } from "../API/FetchFlashcards";
import { practiceFlashcards } from "../Components/PracticeFlashcards";
import { addFlashcard } from "../API/AddFlashcard";
import { useAuth0 } from "@auth0/auth0-react";

export const FlashcardsListPage = () => {
  const { id } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const { user, getAccessTokenSilently } = useAuth0();
  const [token] = useState(getAccessTokenSilently());
  const [userId] = useState(user.sub);
  const [creatorId, setCreatorId] = useState("");

  useEffect(() => {
    fetchFlashcards(id, token, setCreatorId, setFlashcards).then(() =>
      console.log(flashcards)
    );
  }, [flashcards, id, token, userId]);

  return (
    <div className="Main-codeChallengeList-wrapper">
      <NavigationBar />
      <div className="buttonLine">
        <button
          className="start-practice-button"
          onClick={() => practiceFlashcards(flashcards, id)}
        >
          Start Practice
        </button>
        {userId === creatorId && (
          <button
            className="add-new-code-challenge-button"
            onClick={() =>
              addFlashcard(
                token,
                userId,
                id,
                flashcards,
                setFlashcards,
                creatorId
              )
            }
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
