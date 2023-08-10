import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "../../CSS Styles/NavigationBar.css";
import { fetchProgrammingLanguages } from "../../API/FetchProgrammingLanguages";
import { FlashcardSetsDropdownMenu } from "../FlashcardSetsDropdownMenu";
import { CodeChallengeCategoriesDropdownMenu } from "../CodeChallengeCategoriesDropdownMenu";

export const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const timerRef = useRef(null);
  const [programLanguages, setProgramLanguages] = useState([]);

  useEffect(() => {
    fetchProgrammingLanguages().then((response) =>
      setProgramLanguages(response.data.data)
    );
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

  return (
    <nav className="Main-navbar-wrapper">
      <Link to="/" className="active">
        Home
      </Link>
      {isLoggedIn ? (
        <Link to="/logout" onClick={handleLogout}>
          Logout
        </Link>
      ) : (
        <Link to="/login">Login</Link>
      )}

      <FlashcardSetsDropdownMenu programLanguages={programLanguages} />

      <CodeChallengeCategoriesDropdownMenu
        programLanguages={programLanguages}
      />
    </nav>
  );
};
