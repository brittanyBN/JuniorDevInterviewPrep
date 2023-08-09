import React, { useEffect, useState } from "react";
import "../CSS Styles/Card.css";

export const FlashcardCard = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
  }, [question, answer]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="Main-card-wrapper" onClick={handleFlip}>
      <div>
        <div className={isFlipped ? "card flipped" : "card"}>
          <div className="front">{isFlipped ? answer : question}</div>
        </div>
      </div>
    </div>
  );
};
