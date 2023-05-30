import { useState, useEffect } from "react";
import { NavigationBar } from "../Components/NavigationBar";
import axios from "axios";
import "./PracticeSet.css";
import { CardSetCard } from "../Components/CardSetCard";
import { Link } from "react-router-dom";

export const CodeChallengeCategoryPage = () => {
  const [codeChallengeCategories, setCodeChallengeCategories] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [id, setId] = useState(localStorage.getItem("id"));

  useEffect(() => {
    fetchCodeChallengeCategories().then((r) =>
      console.log("Code challenge categories fetched")
    );
  }, [token, id]);

  const fetchCodeChallengeCategories = async () => {
    try {
      const response = await axios.get("/codeChallengeCategory");
      setCodeChallengeCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching code challenge categories:", error);
    }
  };

  // async function addNewCodeChallenge() {
  //     if (!token) {
  //         alert("You must be logged in to add a new code challenge category");
  //         return;
  //     }
  //     let data = prompt("Enter the name of the new code challenge category")
  //     try {
  //         const response = await axios.post("/codeChallengeCategory", {
  //             name: data,
  //             UserId: id
  //         },
  //             {
  //                 headers: {
  //                     Authorization: `Bearer ${token}`,
  //                 },
  //             });
  //         const finalResponse = await fetchCodeChallengeCategories();
  //         setCodeChallengeCategories(finalResponse.data.data);
  //     } catch (error) {
  //         console.error("Error fetching code challenge categories:", error);
  //     }
  // }

  return (
    <div className="Main-flashcardSet-wrapper">
      <NavigationBar />
      <div className="header">
        <h1>Code Challenge Category</h1>
        {/*<div id="add">*/}
        {/*    <button onClick={addNewCodeChallenge}>*/}
        {/*        Add New Code Challenge Category*/}
        {/*    </button>*/}
        {/*</div>*/}
      </div>
      <div className="cardSet">
        {codeChallengeCategories.map((category) => (
          <Link key={category.id} to={`/codeChallengeCategory/${category.id}`}>
            <CardSetCard name={category.name} />
          </Link>
        ))}
      </div>
      <div className="button-group">
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  );
};
