import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Loading } from "./Pages/Loading";
import { HomePage } from "./Pages/Home";
import { FlashcardSetPage } from "./Pages/FlashcardSet";
import { FlashcardsListPage } from "./Pages/FlashcardsList";
import { CodeChallengeCategoryPage } from "./Pages/CodeChallengeCategory";
import { CodeChallengePage } from "./Pages/CodeChallenge";
import { FlashcardPage } from "./Pages/Flashcard";
import { IsLoggedIn } from "./Components/IsLoggedIn";

function App() {
  const { isLoading, error, isAuthenticated } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/flashcardSet"
          element={isAuthenticated ? <FlashcardSetPage /> : <IsLoggedIn />}
        />
        <Route
          path="/flashcardSet/language/:selectedLanguage"
          element={isAuthenticated ? <FlashcardSetPage /> : <IsLoggedIn />}
        />
        <Route
          path="/flashcardSet/:id"
          element={isAuthenticated ? <FlashcardsListPage /> : <IsLoggedIn />}
        />
        <Route
          path="/codeChallengeCategory/language/:selectedLanguage"
          element={
            isAuthenticated ? <CodeChallengeCategoryPage /> : <IsLoggedIn />
          }
        />
        <Route
          path="/codeChallengeCategory"
          element={
            isAuthenticated ? <CodeChallengeCategoryPage /> : <IsLoggedIn />
          }
        />
        <Route
          path="/codeChallengeCategory/:id"
          element={isAuthenticated ? <CodeChallengePage /> : <IsLoggedIn />}
        />
        <Route
          path="/flashcard/:id"
          element={isAuthenticated ? <FlashcardPage /> : <IsLoggedIn />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
