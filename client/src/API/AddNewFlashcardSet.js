import axios from "axios";
import {
  csharp,
  general,
  java,
  javascript,
} from "../Components/programLanguages";

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
    "Please select the desired programming language: General, Java, JavaScript, or C#"
  );
  const normalizedInput = userInput.toLowerCase();

  switch (normalizedInput) {
    case "java":
      selectedLanguageId = java;
      break;
    case "javascript":
      selectedLanguageId = javascript;
      break;
    case "csharp":
      selectedLanguageId = csharp;
      break;
    case "c#":
      selectedLanguageId = csharp;
      break;
    case "general":
      selectedLanguageId = general;
      break;
    default:
      alert(
        "Unsupported language. Please select from General, Java, JavaScript, or C#."
      );
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
