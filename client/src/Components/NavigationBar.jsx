import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./NavigationBar.css";

export const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const timerRef = useRef(null);

  useEffect(() => {
    if (isLoggedIn) {
      timerRef.current = setTimeout(handleLogout, 60 * 60 * 1000); // 55 minutes in milliseconds
    }
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  const [isFlashcardSetDropdownOpen, setIsFlashcardSetDropdownOpen] =
    useState(false);

  const [
    isCodeChallengeCategoryDropdownOpen,
    setIsCodeChallengeCategoryDropdownOpen,
  ] = useState(false);

  const handleFlashcardSetDropdownToggle = () => {
    setIsFlashcardSetDropdownOpen(!isFlashcardSetDropdownOpen);
  };

  const handleCodeChallengeCategoryDropdownToggle = () => {
    setIsCodeChallengeCategoryDropdownOpen(
      !isCodeChallengeCategoryDropdownOpen
    );
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

      {/* Flashcard Set Dropdown */}
      <div
        className={`Dropdown ${isFlashcardSetDropdownOpen ? "open" : ""}`}
        onMouseEnter={handleFlashcardSetDropdownToggle}
        onMouseLeave={handleFlashcardSetDropdownToggle}
      >
        <div className="FlashcardSet">
          <Link to="/flashcardSet">Flashcard Set</Link>
        </div>
        {isFlashcardSetDropdownOpen && (
          <div className="Dropdown-content" style={{ fontWeight: "bold" }}>
            <Link to="/flashcardSet/language/3a4c5926-493e-4023-be3d-3388d2751865">
              JavaScript
            </Link>
            <Link to="/flashcardSet/language/54b4000d-0bf7-405c-b233-1513d19e7c7e">
              Java
            </Link>
            <Link to="/flashcardSet/language/0df66f10-e7ff-4356-9613-73c317ded9f1">
              C#
            </Link>
          </div>
        )}
      </div>

      {/* Code Challenge Category Dropdown */}
      <div
        className={`DropdownCCC ${
          isCodeChallengeCategoryDropdownOpen ? "open" : ""
        }`}
        onMouseEnter={handleCodeChallengeCategoryDropdownToggle}
        onMouseLeave={handleCodeChallengeCategoryDropdownToggle}
      >
        <div className="CodeChallengeCategory">
          <Link to="/codeChallengeCategory">Code Challenge Category</Link>
        </div>
        {isCodeChallengeCategoryDropdownOpen && (
          <div className="Dropdown-contentCCC" style={{ fontWeight: "bold" }}>
            <Link to="/codeChallengeCategory/language/3a4c5926-493e-4023-be3d-3388d2751865">
              JavaScript
            </Link>
            <Link to="/codeChallengeCategory/language/54b4000d-0bf7-405c-b233-1513d19e7c7e">
              Java
            </Link>
            <Link to="/codeChallengeCategory/language/0df66f10-e7ff-4356-9613-73c317ded9f1">
              C#
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
