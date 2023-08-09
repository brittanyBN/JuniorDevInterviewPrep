import axios from "axios";

export const fetchFlashcards = async (
  flashcardId,
  token,
  setCreatorId,
  setFlashcards
) => {
  if (!token) {
    alert("You must be logged in to complete code challenges");
    window.location.href = "/login";
  } else {
    try {
      const response = await axios.get(`/flashcardSets/list/${flashcardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { Flashcards, UserId } = response.data.data;
      setCreatorId(UserId);
      setFlashcards(Flashcards);
      return response;
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  }
};
