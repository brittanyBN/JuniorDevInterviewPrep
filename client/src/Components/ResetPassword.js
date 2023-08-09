import axios from "axios";

export const resetPassword = async (
  email,
  setSuccess,
  setResetToken,
  setErrorMessage
) => {
  try {
    const response = await axios.post("/forgotPassword", {
      email,
    });
    setSuccess(true);
    console.log(response.data);
    setResetToken(response.data.data);
  } catch (error) {
    setErrorMessage(error.response.data.message);
  }
};
