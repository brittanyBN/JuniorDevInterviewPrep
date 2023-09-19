import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../CSS Styles/NavigationBar.css";
import { fetchProgrammingLanguages } from "../../API/FetchProgrammingLanguages";
import { FlashcardSetsDropdownMenu } from "../FlashcardSetsDropdownMenu";
import { CodeChallengeCategoriesDropdownMenu } from "../CodeChallengeCategoriesDropdownMenu";
import { useAuth0 } from "@auth0/auth0-react";

export const NavigationBar = () => {
  const [programLanguages, setProgramLanguages] = useState([]);
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  useEffect(() => {
    fetchProgrammingLanguages().then((response) =>
      setProgramLanguages(response.data.data)
    );
  }, [isAuthenticated]);

  return (
    <nav className="Main-navbar-wrapper">
      <Link to="/" className="active">
        Home
      </Link>
      {isAuthenticated ? (
        <Link
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Logout
        </Link>
      ) : (
        <Link onClick={() => loginWithRedirect()}>Login</Link>
      )}

      <FlashcardSetsDropdownMenu programLanguages={programLanguages} />

      <CodeChallengeCategoriesDropdownMenu
        programLanguages={programLanguages}
      />
    </nav>
  );
};
