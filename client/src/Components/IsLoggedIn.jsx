import { useAuth0 } from "@auth0/auth0-react";

export const IsLoggedIn = () => {
  const { isAuthenticated } = useAuth0();
  if (!isAuthenticated) {
    alert("You must be logged in.");
    window.location.href = "/";
  }
};
