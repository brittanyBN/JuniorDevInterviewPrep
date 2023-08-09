import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../CSS Styles/ForgotPasswordLandingPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const PasswordResetLanding = () => {
  const [newPassword, setPasswordValue] = useState("");
  const [validatePassword, setValidatePassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [confirmPassword, setConfirmPasswordValue] = useState("");
  const [validateConfirmation, setValidateConfirmation] = useState(false);
  const [confirmFocus, setConfirmFocus] = useState(false);

  const [resetTokenData, setResetTokenData] = useState({});
  const { resetToken } = useParams();

  useEffect(() => {
    fetchResetTokenData(resetToken).then(() =>
      console.log("Reset token data fetched")
    );
  }, [resetToken]);

  const fetchResetTokenData = async (resetToken) => {
    try {
      const response = await axios.get(`/resetPassword/${resetToken}`);
      setResetTokenData(response.data);
    } catch (error) {
      console.error("Error fetching reset token data:", error);
    }
  };

  const validatePasswordStrength = (password) => {
    setValidatePassword(PASSWORD_REGEX.test(password));
  };

  const onResetClicked = async () => {
    try {
      console.log("Password:", newPassword);
      console.log("Confirm Password:", confirmPassword);

      if (newPassword !== confirmPassword) {
        throw new Error("Passwords must match");
      }

      await axios.put(`/resetPassword/${resetToken}`, {
        newPassword,
        confirmPassword,
      });
      window.location.href = "/login";
    } catch (error) {
      console.error("Error resetting password:", error);
      document.getElementById("notReset").style.display = "block";
    }
  };

  useEffect(() => {
    validatePasswordStrength(newPassword);
  }, [newPassword]);

  return (
    <div className="content-container">
      <h1>Reset Password</h1>
      <label htmlFor="newPassword">
        Please enter a new password.
        <FontAwesomeIcon
          icon={faCheck}
          className={validatePassword ? "valid" : "hide"}
        />
        <FontAwesomeIcon
          icon={faTimes}
          className={newPassword && !validatePassword ? "invalid" : "hide"}
        />
      </label>
      <input
        id="newPassword"
        type="password"
        value={newPassword}
        required
        onChange={(e) => setPasswordValue(e.target.value)}
        aria-invalid={newPassword && !validatePassword ? "true" : "false"}
        aria-describedby="pwnote"
        onFocus={() => setPasswordFocus(true)}
        onBlur={() => setPasswordFocus(false)}
      />
      <p
        id="pwnote"
        className={
          passwordFocus && !validatePassword ? "instructions" : "offscreen"
        }
      >
        <FontAwesomeIcon icon={faInfoCircle} />
        Must be 8-24 characters and include at least one uppercase letter, one
        lowercase letter, one number, and one special character (!@#$%).
      </p>
      <label htmlFor="confirmPassword">
        Confirm Password:
        <FontAwesomeIcon
          icon={faCheck}
          className={validateConfirmation ? "valid" : "hide"}
        />
        <FontAwesomeIcon
          icon={faTimes}
          className={
            validateConfirmation || !confirmPassword ? "invalid" : "hide"
          }
        />
      </label>
      <input
        id="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPasswordValue(e.target.value)}
        required
        aria-invalid={validateConfirmation ? "false" : "true"}
        aria-describedby="confirmpwnote"
        onFocus={() => setConfirmFocus(true)}
        onBlur={() => setConfirmFocus(false)}
      />

      <p
        id="confirmpwnote"
        className={
          confirmFocus && !validateConfirmation ? "instructions" : "offscreen"
        }
      >
        <FontAwesomeIcon icon={faInfoCircle} />
        Must match the password field.
      </p>
      <button
        type="button"
        disabled={
          !newPassword || !confirmPassword || newPassword !== confirmPassword
        }
        onClick={onResetClicked}
      >
        Reset Password
      </button>
      <div aria-live="assertive" id="notReset">
        Failed to reset password.
      </div>
    </div>
  );
};
