import React from "react";

export const FlashcardsTable = ({ flashcard }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>
          {flashcard.map((flashcard) => (
            <tr key={flashcard.question}>
              <td>{flashcard.question}</td>
              <td>{flashcard.answer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
