import { useState } from "react";

export const HintButton = ({ hint }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="Main-hint-wrapper" onClick={handleFlip}>
      <div>
        <div className={isFlipped ? "card flipped" : "card"}>
          <button style={{ padding: 15 }} className="front">
            {isFlipped ? hint : "Hint"}
          </button>
        </div>
      </div>
    </div>
  );
};
