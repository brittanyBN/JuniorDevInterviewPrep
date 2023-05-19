import React, { useState } from "react";
import "./Card.css";

export const Card = ({ question, answer }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="Main-card-wrapper">
            <div onClick={handleFlip}>
                <div className={isFlipped ? "card flipped" : "card"}>
                    <div className="front">{isFlipped ? answer : question}</div>
                </div>
            </div>
        </div>
    );
};
