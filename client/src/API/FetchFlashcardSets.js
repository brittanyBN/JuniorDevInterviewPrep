import axios from "axios";

export const fetchFlashcardSets = async (
  selectedLanguage,
  token,
  currentPage,
  itemsPerPage
) => {
  if (!token) {
    alert("You must be logged in to add a new flashcard set");
    window.location.href = "/login";
  }

  try {
    if (selectedLanguage !== undefined) {
      console.log("selected LANGUAGE", selectedLanguage);
      return await axios.get(`/flashcardSets/language/${selectedLanguage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-User-Role": "admin",
          "Content-type": "application/json",
        },
        params: {
          page: currentPage,
          size: itemsPerPage,
        },
      });
    } else {
      return await axios.get("/flashcardSets/set", {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-User-Role": "admin",
          "Content-Type": "application/json",
        },
        params: {
          page: currentPage,
          size: itemsPerPage,
        },
      });
    }
  } catch (error) {
    console.error("Error fetching flashcard sets:", error);
    return undefined;
  }
};
