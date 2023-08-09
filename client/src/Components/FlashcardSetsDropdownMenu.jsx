import { Link } from "react-router-dom";
import { useState } from "react";

export const FlashcardSetsDropdownMenu = ({ programLanguages }) => {
  const [isFlashcardSetDropdownOpen, setIsFlashcardSetDropdownOpen] =
    useState(false);

  const handleFlashcardSetDropdownToggle = () => {
    setIsFlashcardSetDropdownOpen(!isFlashcardSetDropdownOpen);
  };

  return (
    <div
      className={`Dropdown ${isFlashcardSetDropdownOpen ? "open" : ""}`}
      onMouseEnter={handleFlashcardSetDropdownToggle}
      onMouseLeave={handleFlashcardSetDropdownToggle}
    >
      <div className="FlashcardSet">
        <Link to="/flashcardSet">Flashcard Set</Link>
      </div>
      {programLanguages.length > 0 && isFlashcardSetDropdownOpen && (
        <div className="Dropdown-content" style={{ fontWeight: "bold" }}>
          {programLanguages.map((language) => (
            <Link
              key={language.id}
              to={`/flashcardSet/language/${language.id}`}
            >
              {language.language}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
