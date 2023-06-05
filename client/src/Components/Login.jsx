// import { useState, useEffect } from "react";
// import "./Login.css";
// import axios from "axios";
//
// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [tokenExpiresSoon, setTokenExpiresSoon] = useState(false);
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//
//     try {
//       const response = await axios.post("/login", { email, password });
//
//       if (response.status === 200) {
//         const { token, id } = response.data;
//         const expiresIn = 60;
//         const expirationDate = new Date(Date.now() + expiresIn * 1000);
//
//         const tokenData = {
//           token,
//           id,
//           expirationDate,
//         };
//
//         localStorage.setItem("token", JSON.stringify(tokenData));
//         localStorage.setItem("id", id);
//         localStorage.setItem("role", response.data.role);
//         window.location.href = "/home";
//       } else {
//         console.error("Authentication failed");
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//     }
//   };
//
//   const checkTokenExpiration = () => {
//     const tokenDataString = localStorage.getItem("token");
//
//     if (tokenDataString) {
//       const tokenData = JSON.parse(tokenDataString);
//       const expirationDate = new Date(tokenData.expirationDate);
//
//       const remainingTime = expirationDate.getTime() - Date.now();
//       const expiresInMinutes = Math.floor(remainingTime / 1000 / 60);
//
//       if (expiresInMinutes <= 60 && expiresInMinutes > 0) {
//         setTokenExpiresSoon(true);
//       } else if (expiresInMinutes <= 0) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("id");
//         window.location.href = "/login";
//       }
//     }
//   };
//
//   const handleStaySignedIn = () => {
//     setTokenExpiresSoon(false);
//   };
//
//   const forgotPassword = () => {
//     window.location.href = "/forgotPassword";
//   };
//
//   const handleSignup = () => {
//     window.location.href = "/signup";
//   };
//
//   useEffect(() => {
//     checkTokenExpiration();
//   }, []);
//
//   return (
//       <div className="container">
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="email">Email:</label>
//             <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//             />
//           </div>
//           <div>
//             <label htmlFor="password">Password:</label>
//             <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//             />
//           </div>
//           <button id="login" type="submit">
//             Login
//           </button>
//         </form>
//         <button id="forgot-password" onClick={forgotPassword}>
//           Forgot Password
//         </button>
//         <div className="register-link">
//           Don't have an account?{" "}
//           <a href="/signup" onClick={handleSignup}>
//             Sign up
//           </a>
//         </div>
//         {tokenExpiresSoon && (
//             <div className="token-expiration">
//               <p>
//                 Want to stay signed in? Your session is almost up.
//               </p>
//               <button onClick={handleStaySignedIn}>Stay Signed In</button>
//             </div>
//         )}
//       </div>
//   );
// };
//
// export default Login;

import { useState } from "react";
import "./Login.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const { token, id } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("id", id);
        window.location.href = "/home";
      } else {
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
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
      <div className="register-link">
        Don't have an account?{" "}
        <a href="/signup" onClick={handleSignup}>
          Sign up
        </a>
      </div>
    </div>
  );
};

export default Login;
