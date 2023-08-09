import React from "react";

export const PracticeButtonGroup = ({ currentIndex, setCurrentIndex, set }) => {
  const handleNextCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === set.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? set.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="button-group">
      <button className="action-button" onClick={handlePreviousCard}>
        Previous
      </button>
      <button>{`${currentIndex + 1}/${set.length}`}</button>
      <button className="action-button" onClick={handleNextCard}>
        Next
      </button>
    </div>
  );
};
