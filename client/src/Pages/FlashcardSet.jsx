import React, { useEffect, useState } from "react";
import { NavigationBar } from "../Components/Common/NavigationBar";
import { CardSetCard } from "../Components/Common/CardSetCard";
import "../CSS Styles/PracticeSet.css";
import { Link, useParams } from "react-router-dom";
import { fetchFlashcardSets } from "../API/FetchFlashcardSets";
import { ButtonGroup } from "../Components/Common/ButtonGroup";
import { addNewFlashcardSet } from "../API/AddNewFlashcardSet";
import { useAuth0 } from "@auth0/auth0-react";

export const FlashcardSetPage = () => {
  const [flashcardSets, setFlashcardSets] = useState([]);
  const { user, getAccessTokenSilently } = useAuth0();
  const [token] = useState(getAccessTokenSilently());
  const [id] = useState(user.sub);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { selectedLanguage } = useParams();

  const itemsPerPage = 8;

  useEffect(() => {
    fetchFlashcardSets(token, selectedLanguage, currentPage, itemsPerPage).then(
      (response) => {
        if (response !== undefined) {
          setFlashcardSets(response.data.data);
          setTotalPages(response.data.pagination.totalPages);
        }
      }
    );
  }, [id, token, currentPage, selectedLanguage]);

  return (
    <div className="Main-flashcardSet-wrapper">
      <NavigationBar />
      <div className="header">
        <h1>Flashcard Set</h1>
        <div id="add">
          <button
            onClick={() => addNewFlashcardSet(id, token)}
            id="newFlashcard"
            aria-label="Add New Flashcard Set"
          >
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
      <ButtonGroup
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
