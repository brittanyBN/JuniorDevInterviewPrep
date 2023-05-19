import React, { useState } from "react";
import "./Card.css";

export const Card = ({ question }) => {
    return (
        <div className="Main-card-wrapper">
            <div>
                <div id="front">{question}</div>
            </div>
        </div>
    );
}