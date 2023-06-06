import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./NavigationBar.css";
import axios from "axios";

export const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const timerRef = useRef(null);

  useEffect(() => {
    if (isLoggedIn) {
      timerRef.current = setTimeout(handleLogout, 60 * 60 * 1000);
    }
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [isLoggedIn]);

  function checkTokenExpiration() {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const tokenData = JSON.stringify(storedToken);
      const expiration = tokenData.expiration;
      if (expiration <= Date.now()) {
        alert("Your session has expired. Please log in again.");
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        window.location.href = "/login";
      }
    }
  }

  useEffect(() => {
    const tokenExpirationCheckInterval = setInterval(
      checkTokenExpiration,
      60000
    );

    return () => {
      clearInterval(tokenExpirationCheckInterval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("id");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <nav className="Main-navbar-wrapper">
      <Link to="/home" className="active">
        Home
      </Link>
      {!isLoggedIn ? (
        <Link to="/login">Login</Link>
      ) : (
        <>
          <Link to="/logout" onClick={handleLogout}>
            Logout
          </Link>
          <Link to="/codeChallengeCategory">Code Challenge Category</Link>
          <Link to="/flashcardSet">Flashcard Set</Link>
        </>
      )}
    </nav>
  );
};
