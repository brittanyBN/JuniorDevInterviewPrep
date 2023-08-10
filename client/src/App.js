import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { FlashcardSetPage } from "./Pages/FlashcardSet";
import { CodeChallengeCategoryPage } from "./Pages/CodeChallengeCategory";
import { CodeChallengePage } from "./Pages/CodeChallenge";
import { FlashcardPage } from "./Pages/Flashcard";
import { HomePage } from "./Pages/Home";
import { LoginPage } from "./Pages/Login";
import { SignupPage } from "./Pages/Signup";
import { FlashcardsListPage } from "./Pages/FlashcardsList";
import { ForgotPasswordPage } from "./Pages/ForgotPassword";
import { PasswordResetLandingPage } from "./Pages/PasswordResetLandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
        <Route
          path="/resetPassword/:resetToken"
          element={<PasswordResetLandingPage />}
        />
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
