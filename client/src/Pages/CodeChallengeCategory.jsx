import React, { useEffect, useState } from "react";
import { NavigationBar } from "../Components/NavigationBar";
import axios from "axios";
import "../CSS Styles/PracticeSet.css";
import { CardSetCard } from "../Components/CardSetCard";
import { Link, useParams } from "react-router-dom";
import { useSelectedLanguage } from "../Context/SelectedLanguageProvider";

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
    fetchCodeChallengeCategories().then((r) =>
      console.log("Code challenge categories fetched")
    );
  }, [token, id, currentPage, selectedLanguage]);

  useEffect(() => {
    setSelectedLanguage(selectedLanguage); // Set the selectedLanguage to context
  }, [selectedLanguage, setSelectedLanguage]);

  const fetchCodeChallengeCategories = async () => {
    if (!token) {
      alert("You must be logged in to see code challenge categories");
      window.location.href = "/login";
    } else {
      try {
        if (selectedLanguage !== undefined) {
          console.log("selected LANGUAGE", selectedLanguage);

          const response = await axios.get(
            `/codeChallengeCategories/language/${selectedLanguage}?page=${currentPage}&size=${itemsPerPage}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          setCodeChallengeCategories(response.data.data);
          setTotalPages(response.data.pagination.totalPages);
        } else {
          const response = await axios.get(
            `/codeChallengeCategories?page=${currentPage}&size=${itemsPerPage}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          setCodeChallengeCategories(response.data.data);
          setTotalPages(response.data.pagination.totalPages);
        }
      } catch (error) {
        console.error("Error fetching code challenge categories:", error);
      }
    }
  };

  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNextPage() {
    setCurrentPage(currentPage + 1);
  }

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
      <div className="button-group">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button>{`${currentPage}/${totalPages}`}</button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};
