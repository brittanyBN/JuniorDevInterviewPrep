import "./App.css";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import React from "react";
import { FlashcardSetPage} from "./Pages/FlashcardSet";
import { CodeChallengeCategoryPage} from "./Pages/CodeChallengeCategory";
import { CodeChallengePage } from "./Pages/CodeChallenge";
import { FlashcardPage } from "./Pages/Flashcard";
import { HomePage } from "./Pages/Home";
import { LoginPage } from "./Pages/Login";
import { SignupPage } from "./Pages/Signup";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="home" element={<HomePage></HomePage>} />
                <Route path="login" element={<LoginPage></LoginPage>} />
                <Route path="signup" element={<SignupPage></SignupPage>} />
                <Route path="flashcardSet" element={<FlashcardSetPage></FlashcardSetPage>} />
                <Route path="codeChallengeCategory" element={<CodeChallengeCategoryPage></CodeChallengeCategoryPage>} />
                <Route path="codeChallenge" element={<CodeChallengePage></CodeChallengePage>} />
                <Route path="flashcard" element={<FlashcardPage></FlashcardPage>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
