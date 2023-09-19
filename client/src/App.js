import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { FlashcardSetPage } from "./Pages/FlashcardSet";
import { CodeChallengeCategoryPage } from "./Pages/CodeChallengeCategory";
import { CodeChallengePage } from "./Pages/CodeChallenge";
import { FlashcardPage } from "./Pages/Flashcard";
import { HomePage } from "./Pages/Home";
import { FlashcardsListPage } from "./Pages/FlashcardsList";
import { useAuth0 } from "@auth0/auth0-react";
import { Loading } from "./Pages/Loading";

function App() {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flashcardSet" element={<FlashcardSetPage />} />
        <Route
          path="/flashcardSet/language/:selectedLanguage"
          element={<FlashcardSetPage />}
        />
        <Route path="flashcardSet/:id" element={<FlashcardsListPage />} />
        <Route
          path="codeChallengeCategory/language/:selectedLanguage"
          element={<CodeChallengeCategoryPage />}
        />
        <Route
          path="codeChallengeCategory"
          element={<CodeChallengeCategoryPage />}
        />
        <Route
          path="codeChallengeCategory/:id"
          element={<CodeChallengePage />}
        />
        <Route path="flashcard/:id" element={<FlashcardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
