import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import { FlashcardSetPage} from "./Pages/FlashcardSet";
import { CodeChallengeCategoryPage} from "./Pages/CodeChallengeCategory";
import { CodeChallengePage } from "./Pages/CodeChallenge";
import { FlashcardPage } from "./Pages/Flashcard";
import { HomePage } from "./Pages/Home";
import { LoginPage } from "./Pages/Login";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/flashcardSet" element={<FlashcardSetPage></FlashcardSetPage>} />
                <Route path="/codeChallengeCategory" element={<CodeChallengeCategoryPage></CodeChallengeCategoryPage>} />
                <Route path="/codeChallenge" element={<CodeChallengePage></CodeChallengePage>} />
                <Route path="/flashcard" element={<FlashcardPage></FlashcardPage>} />
                <Route path="/home" element={<HomePage></HomePage>} />
                <Route path="/login" element={<LoginPage></LoginPage>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
