import React, {useEffect, useRef, useState} from "react";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import {useParams} from "react-router-dom";
import axios from "axios";
import "./CodeChallenge.css";
import {NavigationBar} from "../Components/NavigationBar";
import {HintButton} from "../Components/HintButton";
import {SolutionButton} from "../Components/SolutionButton";
import {BetterSolutionButton} from "../Components/BetterSolutionButton";

export const CodeChallengePage = () => {
  const { id } = useParams();
  const [token] = useState(localStorage.getItem("token"));
  const [userId] = useState(localStorage.getItem("id"));
  const [currentCodeChallengeIndex, setCurrentCodeChallengeIndex] = useState(0);
  const [consoleOutput, setConsoleOutput] = useState("");
  const [error, setError] = useState("");
  const [executedCode, setExecutedCode] = useState(""); // New state for executed code
  const [editor, setEditor] = useState("");
  const [codeChallenges, setCodeChallenges] = useState([]);

  useEffect(() => {
    fetchCodeChallenge().then(() => console.log(" "));
  }, [id, token, userId]);

  useEffect(() => {
    setCurrentCodeChallengeIndex(0);
  }, [codeChallenges]);

  const handleNextCodeChallenge = async () => {
    setCurrentCodeChallengeIndex((prevIndex) =>
        prevIndex === codeChallenges.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousCodeChallenge = () => {
    setCurrentCodeChallengeIndex((prevIndex) =>
      prevIndex === 0 ? codeChallenges.length - 1 : prevIndex - 1
    );
  };

  const fetchCodeChallenge = async () => {
    if (!token) {
      alert("You must be logged in to complete code challenges");
      window.location.href = "/login";
    } else {
      try {
        const response = await axios.get(`/codeChallengeCategories/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const codeChallengeData = response.data.data.CodeChallenges;
        setCodeChallenges(codeChallengeData);
      } catch (error) {
        console.error("Error fetching code challenge:", error);
      }
    }
  }

  const runCode = async () => {
    try {
      const code = editor.getValue();
      setConsoleOutput("");
      setError("");
      setExecutedCode(""); // Reset executed code

      const response = await axios.post("/codeChallenges/execute", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        code: code,
      });
      const { consoleOutput, error, executedCode } = response.data;
      setConsoleOutput(consoleOutput);
      setError(error);
      setExecutedCode(executedCode); // Set executed code in state
    } catch (error) {
      setError("Error: " + error.message);
    }
  };

  const handleConsoleLog = (message) => {
    setConsoleOutput((prevOutput) => prevOutput + message + "\n");
  };

  const editorRef = useRef();

  useEffect(() => {
    const codeMirrorEditor = CodeMirror.fromTextArea(editorRef.current, {
      mode: "javascript",
      theme: "default",
      lineNumbers: true,
    });

    setEditor(codeMirrorEditor);

    console.log = handleConsoleLog;

    return () => {
      codeMirrorEditor.toTextArea();
    };
  }, []);

  return (
    <div>
      <div className="nav">
        <NavigationBar />
      </div>
      <h1>JavaScript Coding Playground</h1>
      <div className="challengeContainer">
        {codeChallenges.length > 0 ? (
          <h1>{codeChallenges[currentCodeChallengeIndex].question}</h1>
        ) : (
          <div className="no-flashcards">
            <h2>No challenges to practice</h2>
          </div>
        )}
        <textarea ref={editorRef}></textarea>
        <button onClick={runCode} className="run-button">
          Run Code
        </button>
        {error && <pre>{error}</pre>}
        {consoleOutput && <pre>{consoleOutput}</pre>}
      </div>
      <div className="help-buttons">
        <div className="hint-button">
          {codeChallenges.length > 0 ? (
            <HintButton hint={codeChallenges[currentCodeChallengeIndex].hint} />
          ) : (
            <div className="no-hint">
              <h2>No hint :(</h2>
            </div>
          )}
        </div>
        <div className="solution-button">
          {codeChallenges.length > 0 ? (
            <SolutionButton
              solution={codeChallenges[currentCodeChallengeIndex].solution}
            />
          ) : (
            <div className="no-solution">
              <h2>No solution :(</h2>
            </div>
          )}
        </div>
        <div className="better-solution-button">
          {codeChallenges.length > 0 ? (
            <BetterSolutionButton
              betterSolution={
                codeChallenges[currentCodeChallengeIndex].betterSolution
              }
            />
          ) : (
            <div className="no-better-solution">
              <h2>No better solution :(</h2>
            </div>
          )}
        </div>
      </div>
      <div className="button-group">
        <button className="action-button" onClick={handlePreviousCodeChallenge}>
          Previous
        </button>
        <button>{`${currentCodeChallengeIndex + 1}/${
          codeChallenges.length
        }`}</button>
        <button className="action-button" onClick={handleNextCodeChallenge}>
          Next
        </button>
      </div>
    </div>
  );
};
