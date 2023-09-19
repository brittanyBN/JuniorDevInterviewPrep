import React, { useEffect, useState } from "react";
import { NavigationBar } from "../Components/Common/NavigationBar";
import "../CSS Styles/PracticeSet.css";
import { CardSetCard } from "../Components/Common/CardSetCard";
import { Link, useParams } from "react-router-dom";
import { useSelectedLanguage } from "../Context/SelectedLanguageProvider";
import { ButtonGroup } from "../Components/Common/ButtonGroup";
import { fetchCodeChallengeCategories } from "../API/FetchCodeChallengeCategories";
import { useAuth0 } from "@auth0/auth0-react";

export const CodeChallengeCategoryPage = () => {
  const [codeChallengeCategories, setCodeChallengeCategories] = useState([]);
  const { user, getAccessTokenSilently } = useAuth0();
  const [token] = useState(getAccessTokenSilently());
  const [id, setId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { selectedLanguage } = useParams();
  const { setSelectedLanguage } = useSelectedLanguage();

  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setId(user.sub.split("|")[1]); // Extract the user ID
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    fetchData().then((r) => console.log("data fetched"));
  }, [getAccessTokenSilently, user.sub]);

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
  }, [
    token,
    id,
    currentPage,
    selectedLanguage,
    setSelectedLanguage,
    codeChallengeCategories,
  ]);

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
