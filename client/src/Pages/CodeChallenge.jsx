import React, { useEffect, useRef, useState } from "react";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/clike/clike";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../CSS Styles/BottomButtons.css";
import "../CSS Styles/CodeChallenge.css";
import { NavigationBar } from "../Components/Common/NavigationBar";
import { csharp, java, javascript } from "../Components/programLanguages";
import { HelpButtons } from "../Components/HelpButtons";
import { PracticeButtonGroup } from "../Components/Common/PracticeButtonGroup";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchCodeChallenge } from "../API/FetchCodeChallenge";
import { useSelectedLanguage } from "../Context/SelectedLanguageProvider";

export const CodeChallengePage = () => {
  const { id } = useParams();
  const { selectedLanguage } = useSelectedLanguage();
  const { getAccessTokenSilently } = useAuth0();
  const [token] = useState(getAccessTokenSilently());
  const [currentCodeChallengeIndex, setCurrentCodeChallengeIndex] = useState(0);
  const [consoleOutput, setConsoleOutput] = useState("");
  const [error, setError] = useState("");
  const [executedCode, setExecutedCode] = useState(""); // New state for executed code
  const [editor, setEditor] = useState("");
  const [codeChallenges, setCodeChallenges] = useState([]);
  const editorRef = useRef();

  useEffect(() => {
    fetchCodeChallenge(id, token).then((response) => {
      setCodeChallenges(response.data.data.CodeChallenges);
    });
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
      setExecutedCode("");

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
      setExecutedCode(executedCode);
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
          <h2>{codeChallenges[currentCodeChallengeIndex].question}</h2>
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
      <PracticeButtonGroup
        currentIndex={currentCodeChallengeIndex}
        setCurrentIndex={setCurrentCodeChallengeIndex}
        set={codeChallenges}
      />
    </div>
  );
};
