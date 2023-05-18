import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "../Components/NavigationBar";
import { Card } from "../Components/Card";
import "./practice.css";

export const CodeChallengePage = () => {
    return (
        <div className="main-flashcard-wrapper">
            <div className="nav">
                <NavigationBar />
            </div>
            <div className="page-style">
                <h1>Code Challenge</h1>
                <Card />
                <div className="button-group">
                    <button className="action-button">Previous</button>
                    <button>1/20</button>
                    <button className="action-button">Next</button>
                </div>
            </div>
        </div>
    );
}