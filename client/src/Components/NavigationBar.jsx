import {Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
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

    const [isFlashcardSetDropdownOpen, setIsFlashcardSetDropdownOpen] = useState(
        false
    );

    const [isCodeChallengeCategoryDropdownOpen, setIsCodeChallengeCategoryDropdownOpen] = useState(
        false
    );

    const handleFlashcardSetDropdownToggle = () => {
        setIsFlashcardSetDropdownOpen(!isFlashcardSetDropdownOpen);
    };

    const handleCodeChallengeCategoryDropdownToggle = () => {
        setIsCodeChallengeCategoryDropdownOpen(!isCodeChallengeCategoryDropdownOpen);
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
                        <Link to="/flashcardSet/language/e46faef5-16cb-4a9f-a3a4-10b3ea325ca6">
                            JavaScript
                        </Link>
                        <Link to="/flashcardSet/language/5e5d8c79-ffdf-4365-85fb-c35d613a0272">
                            Java
                        </Link>
                        <Link to="/flashcardSet/language/bb0c4491-8a97-441b-bc44-d758bff20a73">
                            General
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
                        <Link to="/codeChallengeCategory/language/e46faef5-16cb-4a9f-a3a4-10b3ea325ca6">
                            JavaScript
                        </Link>
                        <Link to="/codeChallengeCategory/language/5e5d8c79-ffdf-4365-85fb-c35d613a0272">
                            Java
                        </Link>
                        <Link to="/codeChallengeCategory/language/404c0329-7085-42dd-a41f-563ba877e981">
                            C#
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};
