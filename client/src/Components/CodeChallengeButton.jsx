import { useState } from "react";

export const CodeChallengeButton = ({
  hint,
  solution,
  betterSolution,
  children,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const hasContent = hint || solution || betterSolution;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="Main-hint-wrapper" onClick={hasContent ? handleFlip : null}>
      <div>
        <div className={isFlipped ? "card flipped" : "card"}>
          <button style={{ padding: 15 }} className="front">
            {isFlipped
              ? hint || solution || betterSolution
              : hasContent
              ? children
              : "No Content"}
          </button>
        </div>
      </div>
    </div>
  );
};
