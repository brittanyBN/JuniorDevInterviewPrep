import { useState } from "react";
import "../CSS Styles/ForgotPassword.css";
import { resetPassword } from "../Components/ResetPassword";

export const ForgotPasswordPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");

  return success ? (
    <div className="content-container">
      <h1>Success</h1>
      <p>
        Check your email for a reset link. Make sure to check your spam folder.
      </p>
    </div>
  ) : (
    <div className="content-container">
      <h1>Forgot Password</h1>
      <p>Enter your email and we'll send you a reset link</p>
      {errorMessage && <div className="fail">{errorMessage}</div>}
      <input
        value={email}
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email@gmail.com"
      />
      <button
        disabled={!email}
        onClick={() =>
          resetPassword(email, setSuccess, setResetToken, setErrorMessage)
        }
      >
        Send Reset Link
      </button>
    </div>
  );
};
