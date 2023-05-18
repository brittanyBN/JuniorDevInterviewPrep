import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "../Components/NavigationBar";
import { CardSetCard } from "../Components/CardSetCard";
import "./PracticeSet.css";

export const FlashcardSetPage = () => {
    const navigate = useNavigate();

    return (
        <div className="Main-flashcardSet-wrapper">
            <NavigationBar />
            <div className="header">
                <h1>Flashcard Set</h1>
                <div id="add">
                    <button>Add New Flashcard Set</button>
                </div>
            </div>
            <div className="cardSet">
                <CardSetCard />
                <CardSetCard />
                <CardSetCard />
                <CardSetCard />
                <CardSetCard />
                <CardSetCard />

            </div>
            <div className="button-group">
                <button>Next</button>
                <button>Previous</button>
            </div>
        </div>
    );
}
