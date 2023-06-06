import React, { useEffect, useState } from "react";
import { NavigationBar } from "../Components/NavigationBar";
import axios from "axios";
import "./PracticeSet.css";
import { CardSetCard } from "../Components/CardSetCard";
import { Link } from "react-router-dom";

export const CodeChallengeCategoryPage = () => {
  const [codeChallengeCategories, setCodeChallengeCategories] = useState([]);
  const [token] = useState(localStorage.getItem("token"));
  const [id] = useState(localStorage.getItem("id"));
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 8;

  useEffect(() => {
    fetchCodeChallengeCategories().then((r) =>
      console.log("Code challenge categories fetched")
    );
  }, [token, id, currentPage]);

  const fetchCodeChallengeCategories = async () => {
    if (!token) {
      alert("You must be logged in to complete code challenges");
      window.location.href = "/login";
    }

    try {
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
    } catch (error) {
      console.error("Error fetching code challenge categories:", error);
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
            to={`/codeChallengeCategory/${category.id}`}
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
