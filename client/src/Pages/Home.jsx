import React from "react";
import { NavigationBar } from "../Components/NavigationBar";
import "./Home.css";

export const HomePage = () => {
  return (
    <div className="Main-home-wrapper">
      <NavigationBar />
      <div className="home">
        <h1>Interview Prep for Junior Backend Developers</h1>
        <h2>Welcome to Interview Prep for Junior Backend Developers!</h2>
        <p>
          This is a website that helps junior backend developers prepare for
          their interviews.
        </p>
      </div>
    </div>
  );
};
