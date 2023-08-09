import { Link } from "react-router-dom";
import { useState } from "react";

export const CodeChallengeCategoriesDropdownMenu = ({ programLanguages }) => {
  const [
    isCodeChallengeCategoryDropdownOpen,
    setIsCodeChallengeCategoryDropdownOpen,
  ] = useState(false);

  const handleCodeChallengeCategoryDropdownToggle = () => {
    setIsCodeChallengeCategoryDropdownOpen(
      !isCodeChallengeCategoryDropdownOpen
    );
  };

  return (
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
  );
};
