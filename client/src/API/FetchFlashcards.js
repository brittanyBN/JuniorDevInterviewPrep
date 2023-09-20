import axios from "axios";

export const fetchFlashcards = async (flashcardId, token) => {
  if (!token) {
    alert("You must be logged in to complete code challenges");
    window.location.href = "/";
  } else {
    try {
      return await axios.get(`/flashcardSets/list/${flashcardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  }
};
