import { NavigationBar } from "../Components/NavigationBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./CodeChallengesList.css";

export const CodeChallengesListPage = () => {
    const { id } = useParams();
    const [codeChallenges, setCodeChallenges] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userId, setUserId] = useState(localStorage.getItem('id'));

    useEffect(() => {
        fetchCodeChallenges(id).then(() => console.log("Code challenges fetched"));
    }, [id, token, userId]);

    const fetchCodeChallenges = async (categoryId) => {
        try {
            const response = await axios.get(`/codeChallengeCategory/${categoryId}`);
            const codeChallengesData = response.data.data.CodeChallenges;
            console.log("challenge data", codeChallengesData);
            setCodeChallenges(codeChallengesData);
        } catch (error) {
            console.error("Error fetching code challenges:", error);
        }
    };

    const practiceCodeChallenges = () => {
        window.location.href = `/codeChallenge`;
    }

    const addCodeChallenge = async () => {
        if (!token) {
            alert("You must be logged in to add a new code challenge category");
            return;
        }
        let question = prompt("Enter question");
        let solution = prompt("Enter solution");
        let hints = prompt("Enter hints");
        try {
            const response = await axios.post("/codeChallenge", {
                question: question,
                solution: solution,
                hints: hints,
                progress: 0,
                codeChallengeCategoryId: id,
                UserId: userId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const finalResponse = await fetchCodeChallenges(id);
            setCodeChallenges(finalResponse.data.data.CodeChallenges);
        } catch (error) {
            console.error("Error adding code challenge:", error);
        }
    };

    return (
        <div className="Main-codeChallengeList-wrapper">
            <NavigationBar />
            <div className="buttonLine">
                <button className="start-practice-button" onClick={practiceCodeChallenges}>Start Practice</button>
                <button className="add-new-code-challenge-button" onClick={addCodeChallenge}>Add New Code Challenge</button>
            </div>
            <div className="code-challenges-container">
                {codeChallenges.length === 0 ? (
                    <p id="empty">There are no code challenges in this category yet. Click the button to add one!</p>
                ) : (
                codeChallenges.map((codeChallenge) => (
                    <div key={codeChallenge.id} className="code-challenge">
                        <div className="question">{codeChallenge.question}</div>
                        <div className="solution">{codeChallenge.solution}</div>
                    </div>
                    ))
                )}
            </div>
        </div>
    );
};
