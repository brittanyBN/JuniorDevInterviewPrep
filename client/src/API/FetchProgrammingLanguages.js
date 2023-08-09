import axios from "axios";

export const fetchProgrammingLanguages = async () => {
  try {
    return await axios.get(`/programLanguage`);
  } catch (error) {
    console.error("Error fetching programming languages:", error);
  }
};
