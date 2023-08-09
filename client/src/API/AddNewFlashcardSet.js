import { csharp, java, javascript } from "../Components/programLanguages";
import axios from "axios";

export const addNewFlashcardSet = async (id, token) => {
  if (!token) {
    alert("You must be logged in to add a new flashcard set");
    return;
  }

  let data = prompt("Enter the name of the new flashcard set");
  if (!data) {
    return;
  }

  let selectedLanguageId;

  const userInput = prompt(
    "Please select the desired programming language: Java, JavaScript, or C#"
  );
  if (userInput) {
    const normalizedInput = userInput.toLowerCase();
    if (normalizedInput === "java") {
      selectedLanguageId = java;
    } else if (normalizedInput === "javascript") {
      selectedLanguageId = javascript;
    } else if (normalizedInput === "c#" || "csharp") {
      selectedLanguageId = csharp;
    } else {
      alert(
        "Unsupported language. Please select from Java, JavaScript, or C#."
      );
    }
  }

  try {
    await axios.post(
      "/flashcardSets",
      {
        name: data,
        UserId: id,
        ProgramLanguageId: selectedLanguageId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    if (
      error.response &&
      error.response.status === 400 &&
      error.response.data.message === "Flashcard Set already exists"
    ) {
      alert("The flashcard set already exists");
    } else {
      console.error("Error posting new flashcard set:", error);
    }
  }
};
