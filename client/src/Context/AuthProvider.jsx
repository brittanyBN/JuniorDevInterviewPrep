// import React, { createContext, useContext, useEffect, useState } from "react";
// import Cookies from "js-cookie";
//
// export const AuthContext = createContext();
//
// export const getCookieValue = (cookieKey) => {
//   return Cookies.get(cookieKey); // Corrected method name and simplified
// };
//
// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(undefined);
//   const [userId, setUserId] = useState(undefined);
//   const [userRole, setUserRole] = useState(undefined);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//
//   useEffect(() => {
//     const tokenCookie = getCookieValue("token");
//     const userIdCookie = getCookieValue("id");
//     const userRoleCookie = getCookieValue("role");
//
//     if (tokenCookie) {
//       setToken(tokenCookie);
//     }
//
//     if (userIdCookie) {
//       setUserId(userIdCookie);
//     }
//
//     if (userRoleCookie) {
//       setUserRole(userRoleCookie);
//     }
//
//     if (tokenCookie && userIdCookie && userRoleCookie) {
//       setIsLoggedIn(true);
//     }
//   }, []); // Empty dependency array to run the effect only once
//
//   return (
//     <AuthContext.Provider
//       value={{
//         isLoggedIn,
//         setIsLoggedIn,
//         token,
//         setToken,
//         userId,
//         setUserId,
//         userRole,
//         setUserRole,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
//
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
