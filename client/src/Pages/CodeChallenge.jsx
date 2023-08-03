import React, { useEffect, useRef, useState } from "react";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/clike/clike";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CodeChallenge.css";
import { NavigationBar } from "../Components/NavigationBar";
import { HintButton } from "../Components/HintButton";
import { SolutionButton } from "../Components/SolutionButton";
import { BetterSolutionButton } from "../Components/BetterSolutionButton";
import { useSelectedLanguage } from "../Context/SelectedLanguageProvider";

export const CodeChallengePage = () => {
  const { id } = useParams();
  const { selectedLanguage } = useSelectedLanguage();

  const [token] = useState(localStorage.getItem("token"));
  const [userId] = useState(localStorage.getItem("id"));
  const [currentCodeChallengeIndex, setCurrentCodeChallengeIndex] = useState(0);
  const [consoleOutput, setConsoleOutput] = useState("");
  const [error, setError] = useState("");
  const [executedCode, setExecutedCode] = useState(""); // New state for executed code
  const [editor, setEditor] = useState("");
  const [codeChallenges, setCodeChallenges] = useState([]);

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
  };

  useEffect(() => {
    fetchCodeChallenge().then(() => console.log(" "));
  }, [id, token, userId, selectedLanguage]);

  useEffect(() => {
    const codeMirrorEditor = CodeMirror.fromTextArea(editorRef.current, {
      mode:
        selectedLanguage === "54b4000d-0bf7-405c-b233-1513d19e7c7e"
          ? "text/x-java"
          : selectedLanguage === "0df66f10-e7ff-4356-9613-73c317ded9f1"
          ? "text/x-csharp"
          : "javascript",
      theme: "default",
      lineNumbers: true,
    });

    if (selectedLanguage === "54b4000d-0bf7-405c-b233-1513d19e7c7e") {
      const defaultCode = `class ExecuteCode {
    public static void main(String[] args) {
      // System.out.println("Hello, World!"); 
    }
  }`;
      codeMirrorEditor.setValue(defaultCode); // Set the default code
    } else if (selectedLanguage === "0df66f10-e7ff-4356-9613-73c317ded9f1") {
      const defaultCode = `using System;`;
      codeMirrorEditor.setValue(defaultCode);
    }

    setEditor(codeMirrorEditor);

    console.log = handleConsoleLog;

    return () => {
      codeMirrorEditor.toTextArea();
    };
  }, [selectedLanguage]);

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

  const runCode = async () => {
    try {
      const code = editor.getValue();
      setConsoleOutput("");
      setError("");
      setExecutedCode(""); // Reset executed code

      let endpoint;

      if (selectedLanguage === "54b4000d-0bf7-405c-b233-1513d19e7c7e") {
        endpoint = "/codeChallenges/executeJava";
      } else if (selectedLanguage === "0df66f10-e7ff-4356-9613-73c317ded9f1") {
        endpoint = "/codeChallenges/executeCSharp";
      } else if (selectedLanguage === "3a4c5926-493e-4023-be3d-3388d2751865") {
        endpoint = "/codeChallenges/executeJavascript";
      }

      const response = await axios.post(
        endpoint,
        { code: code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

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

  return (
    <div>
      <div className="nav">
        <NavigationBar />
      </div>
      <h1>
        {selectedLanguage === "54b4000d-0bf7-405c-b233-1513d19e7c7e"
          ? "Java"
          : selectedLanguage === "0df66f10-e7ff-4356-9613-73c317ded9f1"
          ? "C#"
          : "JavaScript"}{" "}
        Coding Playground
      </h1>

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
