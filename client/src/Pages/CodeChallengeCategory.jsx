import React, { useState, useEffect } from "react";
import { NavigationBar } from "../Components/NavigationBar";
import axios from "axios";
import "./PracticeSet.css";
import {CardSetCard} from "../Components/CardSetCard";

export const CodeChallengeCategoryPage = () => {
    const [codeChallengeCategories, setCodeChallengeCategories] = useState([]);

    useEffect(() => {
        fetchCodeChallengeCategories().then(r => console.log(r));
    }, []);

    const fetchCodeChallengeCategories = async () => {
        try {
            const response = await axios.get("/codeChallengeCategory");
            setCodeChallengeCategories(response.data.data);
        } catch (error) {
            console.error("Error fetching code challenge categories:", error);
        }
    };

    return (
        <div className="Main-flashcardSet-wrapper">
            <NavigationBar />
            <div className="header">
                <h1>Code Challenge Category</h1>
                <div id="add">
                    <button onClick="addNewCodeChallenge()">
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
                <button>Next</button>
                <button>Previous</button>
            </div>
        </div>
    );
};
