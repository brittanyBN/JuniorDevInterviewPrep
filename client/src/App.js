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
import { PasswordResetLandingPage } from "./Pages/ForgotPasswordLangingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="home" element={<HomePage></HomePage>} />
        <Route path="login" element={<LoginPage></LoginPage>} />
        <Route path="signup" element={<SignupPage></SignupPage>} />
        <Route
          path="/forgotPassword"
          element={<ForgotPasswordPage></ForgotPasswordPage>}
        />
        <Route
          path="/resetPassword/:resetToken"
          element={<PasswordResetLandingPage></PasswordResetLandingPage>}
        />
        <Route
          path="/flashcardSet"
          element={<FlashcardSetPage></FlashcardSetPage>}
        />
        <Route
          path="/flashcardSet/language/:selectedLanguage"
          element={<FlashcardSetPage></FlashcardSetPage>}
        />
        <Route
          path="flashcardSet/:id"
          element={<FlashcardsListPage></FlashcardsListPage>}
        />
        <Route
          path="codeChallengeCategory/language/:selectedLanguage"
          element={<CodeChallengeCategoryPage></CodeChallengeCategoryPage>}
        />
        <Route
          path="codeChallengeCategory"
          element={<CodeChallengeCategoryPage></CodeChallengeCategoryPage>}
        />
        <Route
          path="codeChallengeCategory/:id"
          element={<CodeChallengePage></CodeChallengePage>}
        />
        <Route path="flashcard/:id" element={<FlashcardPage></FlashcardPage>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
