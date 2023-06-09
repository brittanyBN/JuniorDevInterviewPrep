import {useState} from "react";
import "./Login.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/login", { email, password });

      if (response.status === 200) {
        const { token, id } = response.data;

        const tokenData = {
          token,
          id,
        };

        localStorage.setItem("token", token);
        localStorage.setItem("id", id);
        localStorage.setItem("role", response.data.role);
        window.location.href = "/home";
      } else {
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      document.getElementById("wrongCredentials").style.display = "block";
    }
  };

  const forgotPassword = () => {
    window.location.href = "/forgotPassword";
  };

  const handleSignup = () => {
    window.location.href = "/signup";
  };

  return (
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
          </div>
          <button id="login" type="submit">
            Login
          </button>
        </form>
        <button id="forgot-password" onClick={forgotPassword}>
          Forgot Password
        </button>
        <div className="register-link">
          Don't have an account?{" "}
          <a href="/signup" onClick={handleSignup}>
            Sign up
          </a>
        </div>
        <p id="wrongCredentials">Wrong email or password</p>
      </div>
  );
};

export default Login;
