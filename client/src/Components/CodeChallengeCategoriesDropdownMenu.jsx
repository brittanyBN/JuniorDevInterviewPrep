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

  const filteredLanguages = programLanguages.filter(
    (language) => language.language !== "General"
  );

  return (
    <div
      className={`DropdownCCC ${
        isCodeChallengeCategoryDropdownOpen ? "open" : ""
      }`}
      onMouseEnter={handleCodeChallengeCategoryDropdownToggle}
      onMouseLeave={handleCodeChallengeCategoryDropdownToggle}
    >
      <div className="CodeChallengeCategory">
        <Link>Code Challenge Category</Link>
      </div>
      {filteredLanguages.length > 0 && isCodeChallengeCategoryDropdownOpen && (
        <div className="Dropdown-contentCCC" style={{ fontWeight: "bold" }}>
          {filteredLanguages.map((language) => (
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
