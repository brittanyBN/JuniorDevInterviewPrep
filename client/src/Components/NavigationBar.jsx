import { Link } from "react-router-dom";
import { useState } from "react";
import "./NavigationBar.css";

export const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };
  return (
    <nav className="Main-navbar-wrapper">
      <Link to="/home" className="active">
        Home
      </Link>
      {isLoggedIn ? (
        <Link to="/logout" onClick={handleLogout}>
          Logout
        </Link>
      ) : (
        <Link to="/login">Login</Link>
      )}
      <Link to="/codeChallengeCategory">Code Challenge Category</Link>
      <Link to="/flashcardSet">Flashcard Set</Link>
    </nav>
  );
};
