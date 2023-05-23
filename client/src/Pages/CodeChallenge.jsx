import { useState, useEffect } from "react";
import { NavigationBar } from "../Components/NavigationBar";
import { Card } from "../Components/CodeChallengeCard";
import "./practice.css";
import axios from "axios";

export const CodeChallengePage = () => {
    const [codeChallenges, setCodeChallenges] = useState([]);
    const [currentCodeChallengeIndex, setCurrentCodeChallengeIndex] = useState(0);

    useEffect(() => {
        fetchCodeChallenges().then(r => console.log("Code challenges fetched"));
    }, []);

    const fetchCodeChallenges = async () => {
        try {
            const response = await axios.get("/codeChallenge");
            setCodeChallenges(response.data.data);
        } catch (error) {
            console.error("Error fetching code challenges:", error);
        }
    };

    const cards = codeChallenges.map((card) => {
        return <Card card={card} key={card.id} />;
    });

    const loading = <div className="loading">Loading code challenge content...</div>;

    useEffect(() => {
        setCurrentCodeChallengeIndex(0);
    }, [codeChallenges]);

    const handleNextCodeChallenge = () => {
        setCurrentCodeChallengeIndex((prevIndex) =>
            prevIndex === codeChallenges.length - 1 ? 0 : prevIndex + 1
        );
    }

    const handlePreviousCodeChallenge = () => {
        setCurrentCodeChallengeIndex((prevIndex) =>
            prevIndex === 0 ? codeChallenges.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="main-flashcard-wrapper">
            <div className="nav">
                <NavigationBar />
            </div>
            <div className="page-style">
                <h1>Code Challenge</h1>
                {codeChallenges.length > 0 ? (
                    <Card
                        question={codeChallenges[currentCodeChallengeIndex].question}
                        solution={codeChallenges[currentCodeChallengeIndex].solution}
                    />
                ) : (
                    <div>Loading code challenges...</div>
                )}
                <div className="button-group">
                <button
                    className="action-button"
                    onClick={handlePreviousCodeChallenge}
                >
                    Previous
                </button>
                    <button>{`${currentCodeChallengeIndex + 1}/${codeChallenges.length}`}</button>
                    <button className="action-button" onClick={handleNextCodeChallenge}>Next</button>
                </div>
            </div>
        </div>
    );
}