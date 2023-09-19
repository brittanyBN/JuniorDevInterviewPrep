import axios from "axios";

export const fetchCodeChallenge = async (id, token) => {
  if (!token) {
    alert("You must be logged in to complete code challenges");
    window.location.href = "/";
  } else {
    try {
      return await axios.get(`/codeChallengeCategories/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error fetching code challenge:", error);
    }
  }
};
