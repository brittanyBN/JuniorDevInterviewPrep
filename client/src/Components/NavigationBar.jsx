import { Link } from "react-router-dom";
import { useState } from "react";
import "./NavigationBar.css";

export const NavigationBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    const handleLogout = () => {
        // Remove the token from local storage or secure cookie
        localStorage.removeItem('token');

        // Update the authentication status
        setIsLoggedIn(false);

        // Redirect the user to the login page or any other route
        // You can use React Router or any other method for navigation
        window.location.href = '/login';
    };
    return (
        <nav className="Main-navbar-wrapper">
            <Link to="/home" className="active">
                Home
            </Link>
            {isLoggedIn ? (
                <Link to="/logout" onClick={handleLogout}>Logout</Link>
            ) : (
                <Link to="/login">Login</Link>
            )}
            <Link to="/flashcard">Flashcard</Link>
            <Link to="/codeChallengeCategory">Code Challenge Category</Link>
            <Link to="/flashcardSet">Flashcard Set</Link>
            <Link to="/codeChallenge">Code Challenge</Link>
        </nav>
    );
};
