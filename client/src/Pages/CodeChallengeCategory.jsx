import React, { useEffect, useState } from "react";
import { NavigationBar } from "../Components/Common/NavigationBar";
import "../CSS Styles/PracticeSet.css";
import { CardSetCard } from "../Components/Common/CardSetCard";
import { Link, useParams } from "react-router-dom";
import { useSelectedLanguage } from "../Context/SelectedLanguageProvider";
import { ButtonGroup } from "../Components/Common/ButtonGroup";
import { fetchCodeChallengeCategories } from "../API/FetchCodeChallengeCategories";

export const CodeChallengeCategoryPage = () => {
  const [codeChallengeCategories, setCodeChallengeCategories] = useState([]);
  const [token] = useState(localStorage.getItem("token"));
  const [id] = useState(localStorage.getItem("id"));
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { selectedLanguage } = useParams(); // Get the selectedLanguage from the URL params
  const { setSelectedLanguage } = useSelectedLanguage();

  const itemsPerPage = 8;

  useEffect(() => {
    fetchCodeChallengeCategories(
      token,
      selectedLanguage,
      currentPage,
      itemsPerPage
    ).then((response) => {
      if (response !== undefined) {
        setCodeChallengeCategories(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
      }
    });
    setSelectedLanguage(selectedLanguage);
  }, [token, id, currentPage, selectedLanguage, setSelectedLanguage]);

  return (
    <div className="Main-flashcardSet-wrapper">
      <NavigationBar />
      <div className="header">
        <h1>Code Challenge Category</h1>
      </div>
      <div className="cardSet">
        {codeChallengeCategories.map((category) => (
          <Link
            className="link"
            key={category.id}
            to={`/codeChallengeCategory/${category.id}?selectedLanguage=${selectedLanguage}`}
          >
            <CardSetCard name={category.name} />
          </Link>
        ))}
      </div>
      <ButtonGroup
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
