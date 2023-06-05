import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const PasswordResetLandingPage = () => {
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [resetTokenData, setResetTokenData] = useState({});
  const { resetToken } = useParams();

  useEffect(() => {
    fetchResetTokenData(resetToken).then((r) =>
      console.log("Reset token data fetched")
    );
  }, [resetToken]);

  const fetchResetTokenData = async (resetToken) => {
    try {
      const response = await axios.get(`/resetPassword/${resetToken}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setResetTokenData(response.data);
    } catch (error) {
      console.error("Error fetching reset token data:", error);
    }
  };

  const onResetClicked = async () => {
    try {
      await axios.put(`/resetPassword/${resetToken}`, {
        headers: {
          "Content-Type": "application/json",
        },
        newPassword: passwordValue,
      });
      window.location.href = "/login";
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className="content-container">
      <h1>Reset Password</h1>
      <p>Please enter a new password</p>
      <input
        type="password"
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
        placeholder="Password"
      />
      <input
        type="password"
        value={confirmPasswordValue}
        onChange={(e) => setConfirmPasswordValue(e.target.value)}
        placeholder="Confirm Password"
      />
      <button
        disabled={
          !passwordValue ||
          !confirmPasswordValue ||
          passwordValue !== confirmPasswordValue
        }
        onClick={onResetClicked}
      >
        Reset Password
      </button>
      {<p>Failed to reset password.</p>}
    </div>
  );
};
