import React from "react";
import "./CardSetCard.css";

export const CardSetCard = ({ name }) => {
  // const [flashcard, setFlashcard] = useState([]);
  // const [token] = useState(localStorage.getItem("token"));
  //
  // const fetchCards = async () => {
  //   if (!token) {
  //     alert("You must be logged in to view flashcards");
  //   } else {
  //     try {
  //       const response = await axios.get("/flashcardSets");
  //       setFlashcard(response.data.data);
  //     } catch (error) {
  //       console.error("Error fetching flashcards:", error);
  //     }
  //   }
  // };

  return (
    <div className="Main-cardSet-wrapper">
      <div>
        {/*<div id="card" onClick={fetchCards}>*/}
        <div id="card">{name}</div>
      </div>
    </div>
  );
};
