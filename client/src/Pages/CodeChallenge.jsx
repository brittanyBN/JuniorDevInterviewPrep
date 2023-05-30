import React, { useEffect, useState, useRef } from "react";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CodeChallenge.css";
import { NavigationBar } from "../Components/NavigationBar";

export const CodeChallengePage = () => {
  const { id } = useParams();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("id"));
  const [codeChallenge, setCodeChallenge] = useState("");
  const [currentCodeChallengeIndex, setCurrentCodeChallengeIndex] = useState(0);
  const [consoleOutput, setConsoleOutput] = useState("");
  const [error, setError] = useState("");
  const [editor, setEditor] = useState("");
  const [codeChallenges, setCodeChallenges] = useState([]);

  useEffect(() => {
    fetchCodeChallenge().then(() => console.log(" "));
  }, [id, token, userId]);

  useEffect(() => {
    setCurrentCodeChallengeIndex(0);
  }, [codeChallenges]);

  const handleNextCodeChallenge = () => {
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
    try {
      const response = await axios.get(`/codeChallengeCategory/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const codeChallengeData = response.data.data.CodeChallenges;
      setCodeChallenges(codeChallengeData);
    } catch (error) {
      console.error("Error fetching code challenge:", error);
    }
  };

  const showHint = () => {
    const hint = codeChallenges[currentCodeChallengeIndex].hint;
    alert(hint);
  }

  const showSolution = () => {
    const solution = codeChallenges[currentCodeChallengeIndex].solution;
    alert(solution);
  }

  const bestSolution = () => {
    const bestSolution = codeChallenges[currentCodeChallengeIndex].betterSolution;
    alert(bestSolution);
  }

  const runCode = () => {
    try {
      const code = editor.getValue();
      setConsoleOutput("");
      setError("");

      eval(code);
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
        <button onClick={runCode}>Run Code</button>
        {error && <pre>{error}</pre>}
        {consoleOutput && <pre>{consoleOutput}</pre>}
      </div>
      <button className="hint-button" onClick={showHint}>Hint</button>
      <button className="solution-button" onClick={showSolution}>Solution</button>
      <button className="betterSolution" onClick={bestSolution}>Best Solution</button>
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
