import axios from "axios";

export const addFlashcard = async (
  token,
  userId,
  id,
  flashcards,
  setFlashcards,
  creatorId
) => {
  if (!token) {
    alert("You must be logged in to add a new flashcard");
    return;
  }

  if (userId !== creatorId) {
    return;
  }

  const question = prompt("Enter question");
  const answer = prompt("Enter answer");

  try {
    await axios.post(
      "/flashcards",
      {
        question: question,
        answer: answer,
        FlashcardSetId: id,
        UserId: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const updatedFlashcards = [...flashcards, { question, answer }];
    setFlashcards(updatedFlashcards);
  } catch (error) {
    console.error("Error adding flashcard:", error);
  }
};
