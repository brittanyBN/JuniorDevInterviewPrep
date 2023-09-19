import axios from "axios";

export const fetchCodeChallengeCategories = async (
  token,
  selectedLanguage,
  currentPage,
  itemsPerPage
) => {
  if (!token) {
    alert("You must be logged in to see code challenge categories");
    window.location.href = "/";
  } else {
    try {
      if (selectedLanguage !== undefined) {
        return await axios.get(
          `/codeChallengeCategories/language/${selectedLanguage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            params: {
              page: currentPage,
              size: itemsPerPage,
            },
          }
        );
      } else {
        return await axios.get(
          "http://localhost:3001/codeChallengeCategories",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            params: {
              page: currentPage,
              size: itemsPerPage,
            },
          }
        );
      }
    } catch (error) {
      console.error("Error fetching code challenge categories:", error);
    }
  }
};
