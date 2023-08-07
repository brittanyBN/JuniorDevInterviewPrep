import React from "react";
import "../CSS Styles/CardSetCard.css";

export const CardSetCard = ({ name }) => {
  return (
    <div className="Main-cardSet-wrapper">
      <div>
        <div id="card">{name}</div>
      </div>
    </div>
  );
};
