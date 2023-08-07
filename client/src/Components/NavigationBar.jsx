import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "../CSS Styles/NavigationBar.css";
import axios from "axios";

export const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const timerRef = useRef(null);
  const [programLanguages, setProgramLanguages] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      timerRef.current = setTimeout(handleLogout, 60 * 60 * 1000);
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

  const fetchProgrammingLanguages = async () => {
    try {
      const response = await axios.get(`/programLanguage`);
      setProgramLanguages(response.data.data);
    } catch (error) {
      console.error("Error fetching programming languages:", error);
    }
  };

  useEffect(() => {
    fetchProgrammingLanguages().then(() => console.log(" "));
  }, []);

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

      <div
        className={`Dropdown ${isFlashcardSetDropdownOpen ? "open" : ""}`}
        onMouseEnter={handleFlashcardSetDropdownToggle}
        onMouseLeave={handleFlashcardSetDropdownToggle}
      >
        <div className="FlashcardSet">
          <Link to="/flashcardSet">Flashcard Set</Link>
        </div>
        {programLanguages.length > 0 && isFlashcardSetDropdownOpen && (
          <div className="Dropdown-content" style={{ fontWeight: "bold" }}>
            {programLanguages.map((language) => (
              <Link
                key={language.id}
                to={`/flashcardSet/language/${language.id}`}
              >
                {language.language}
              </Link>
            ))}
          </div>
        )}
      </div>

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
        {programLanguages.length > 0 && isCodeChallengeCategoryDropdownOpen && (
          <div className="Dropdown-contentCCC" style={{ fontWeight: "bold" }}>
            {programLanguages.map((language) => (
              <Link
                key={language.id}
                to={`/codeChallengeCategory/language/${language.id}`}
              >
                {language.language}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
