import { useState, useEffect } from "react";
import { NavigationBar } from "../Components/NavigationBar";
import axios from "axios";
import "./PracticeSet.css";
import {CardSetCard} from "../Components/CardSetCard";

export const CodeChallengeCategoryPage = () => {
    const [codeChallengeCategories, setCodeChallengeCategories] = useState([]);

    useEffect(() => {
        fetchCodeChallengeCategories().then(r => console.log("Code challenge categories fetched"));
    }, []);

    const fetchCodeChallengeCategories = async () => {
        try {
            const response = await axios.get("/codeChallengeCategory");
            setCodeChallengeCategories(response.data.data);
        } catch (error) {
            console.error("Error fetching code challenge categories:", error);
        }
    };

    async function addNewCodeChallenge() {
        let data = prompt("Enter the name of the new code challenge category")
        try {
            const response = await axios.post("/codeChallengeCategory", {
                name: data
            });
            setCodeChallengeCategories(response.data.data);
        } catch (error) {
            console.error("Error fetching code challenge categories:", error);
        }
    }

    return (
        <div className="Main-flashcardSet-wrapper">
            <NavigationBar />
            <div className="header">
                <h1>Code Challenge Category</h1>
                <div id="add">
                    <button onClick={addNewCodeChallenge}>
                        Add New Code Challenge Category
                    </button>
                </div>
            </div>
            <div className="cardSet">
                {codeChallengeCategories.map((category) => (
                    <CardSetCard key={category.id} name={category.name} />
                ))}
            </div>
            <div className="button-group">
                <button>Previous</button>
                <button>Next</button>
            </div>
        </div>
    );
};
