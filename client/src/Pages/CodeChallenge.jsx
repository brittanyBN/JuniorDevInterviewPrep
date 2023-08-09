import React, { useEffect, useRef, useState } from "react";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/clike/clike";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../CSS Styles/CodeChallenge.css";
import { NavigationBar } from "../Components/NavigationBar";
import { useSelectedLanguage } from "../Context/SelectedLanguageProvider";
import { csharp, java, javascript } from "../Components/programLanguages";
import { ButtonGroup } from "../Components/Common/ButtonGroup";
import { HelpButtons } from "../Components/HelpButtons";

export const CodeChallengePage = () => {
  const { id } = useParams();
  const { selectedLanguage } = useSelectedLanguage();

  const [token] = useState(localStorage.getItem("token"));
  const [userId] = useState(localStorage.getItem("id"));
  const [currentCodeChallengeIndex, setCurrentCodeChallengeIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [consoleOutput, setConsoleOutput] = useState("");
  const [error, setError] = useState("");
  const [executedCode, setExecutedCode] = useState(""); // New state for executed code
  const [editor, setEditor] = useState("");
  const [codeChallenges, setCodeChallenges] = useState([]);
  const editorRef = useRef();

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
        selectedLanguage === java
          ? "text/x-java"
          : selectedLanguage === csharp
          ? "text/x-csharp"
          : "javascript",
      theme: "default",
      lineNumbers: true,
    });

    if (selectedLanguage === java) {
      const defaultCode = `class ExecuteCode {
    public static void main(String[] args) {
      // System.out.println("Hello, World!"); 
    }
  }`;
      codeMirrorEditor.setValue(defaultCode);
    } else if (selectedLanguage === csharp) {
      const defaultCode = `using System;`;
      codeMirrorEditor.setValue(defaultCode);
    }

    setEditor(codeMirrorEditor);

    console.log = handleConsoleLog;

    return () => {
      codeMirrorEditor.toTextArea();
    };
  }, [selectedLanguage]);

  const runCode = async () => {
    try {
      const code = editor.getValue();
      setConsoleOutput("");
      setError("");
      setExecutedCode(""); // Reset executed code

      let endpoint;

      if (selectedLanguage === java) {
        endpoint = "/codeChallenges/executeJava";
      } else if (selectedLanguage === csharp) {
        endpoint = "/codeChallenges/executeCSharp";
      } else if (selectedLanguage === javascript) {
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

  return (
    <div>
      <div className="nav">
        <NavigationBar />
      </div>
      <h1>
        {selectedLanguage === java
          ? "Java"
          : selectedLanguage === csharp
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
      <HelpButtons
        codeChallenges={codeChallenges}
        currentCodeChallengeIndex={currentCodeChallengeIndex}
      />
      <ButtonGroup
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
