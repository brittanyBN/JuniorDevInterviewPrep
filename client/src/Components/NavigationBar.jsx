import React from "react";
import "./NavigationBar.css";

export const NavigationBar = () => {
    return (
        <nav className="Main-navbar-wrapper">
            <a className="active" href="/home">Home</a>
            <a href="/login">Login</a>
            <a href="/flashcard">Flashcard</a>
            <a href="/codeChallengeCategory">Code Challenge Category</a>
            <a href="/flashcardSet">Flashcard Set</a>
            <a href="/codeChallenge">Code Challenge</a>
        </nav>
    );
}