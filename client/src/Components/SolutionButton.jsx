import { useState } from "react";

export const SolutionButton = ({ solution }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="Main-hint-wrapper" onClick={handleFlip}>
            <div>
                <div className={isFlipped ? "card flipped" : "card"}>
                    <button className="front">{isFlipped ? solution : "Show Solution"}</button>
                </div>
            </div>
        </div>
    );
};
