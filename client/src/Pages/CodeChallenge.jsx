import React, { useState, useEffect } from "react";
import { NavigationBar } from "../Components/NavigationBar";
import axios from "axios";
import { IDE } from "../Components/IDE";
import { useParams } from "react-router-dom";
import "./CodeChallenge.css";

export const CodeChallengePage = () => {
    const { id } = useParams();
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userId, setUserId] = useState(localStorage.getItem("id"));
    const [codeChallenge, setCodeChallenge] = useState(null);
    const [js, setJs] = useState("");
    const [srcDoc, setSrcDoc] = useState("");

    useEffect(() => {
        fetchCodeChallenge().then(() => console.log("Code challenge fetched"));
    }, [id, token, userId]);

    const fetchCodeChallenge = async () => {
        try {
            const response = await axios.get(`/codeChallengeCategory/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const flashcardsData = response.data.data.CodeChallenges;
            console.log("flashcardsData", flashcardsData);
            setCodeChallenge(flashcardsData);
        } catch (error) {
            console.error("Error fetching code challenge:", error);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            console.log("Updated JavaScript code:", js);
            setSrcDoc(`
                <html lang="en">
                    <body>
                        <script>${js}</script>
                    </body>
                </html>
            `);
        }, 250);

        return () => clearTimeout(timeout);
    }, [js]);

    const handleCodeChange = (value) => {
        setJs(value);
    };

    console.log("Code challenge:", codeChallenge);
    console.log("srcDoc:", srcDoc);

    return (
        <>
            <div className="nav">
                <NavigationBar />
            </div>
            <h1 className="title">Code Challenge:</h1>
            <div className="challengeContainer">
                {codeChallenge && codeChallenge.length > 0 && (
                    <div className="pane top-pane">
                        <h1>{codeChallenge[0].question}</h1>
                        <IDE
                            language="javascript"
                            value={js}
                            onChange={handleCodeChange}
                        />
                    </div>
                )}
                <div className="pane">
                    <iframe
                        srcDoc={srcDoc}
                        title="output"
                        sandbox="allow-scripts"
                        frameBorder="0"
                        width="100%"
                        height="100%"
                    />
                </div>
            </div>
        </>
    );
};
