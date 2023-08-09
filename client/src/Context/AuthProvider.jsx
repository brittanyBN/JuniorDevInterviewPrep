import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(undefined);
  const [userId, setUserId] = useState(undefined);
  const [userRole, setUserRole] = useState(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const tokenCookieExists = decodeURIComponent(document.cookie).includes(
      "token="
    );
    const userIdCookieExists = decodeURIComponent(document.cookie).includes(
      "id="
    );
    const userRoleCookieExists = decodeURIComponent(document.cookie).includes(
      "role="
    );

    if (tokenCookieExists) {
      setToken(getCookieValue("token"));
    }

    if (userIdCookieExists) {
      setUserId(getCookieValue("id"));
    }

    if (userRoleCookieExists) {
      setUserRole(getCookieValue("role"));
    }

    if (tokenCookieExists && userIdCookieExists && userRoleCookieExists) {
      setIsLoggedIn(true);
    }
  });

  const getCookieValue = (cookieKey) => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith(cookieKey))
      ?.split("=")[1];
  };

  return (
    <AuthProvider.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        token,
        setToken,
        userId,
        setUserId,
        userRole,
        setUserRole,
      }}
    >
      {children}
    </AuthProvider.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
