import { useState } from "react";

export const BetterSolutionButton = ({ betterSolution }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="Main-hint-wrapper" onClick={handleFlip}>
            <div>
                <div className={isFlipped ? "card flipped" : "card"}>
                    <button className="front">{isFlipped ? betterSolution : "Best Solution"}</button>
                </div>
            </div>
        </div>
    );
};
