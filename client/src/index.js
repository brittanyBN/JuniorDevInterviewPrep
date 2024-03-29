import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SelectedLanguageProvider } from "./Context/SelectedLanguageProvider";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SelectedLanguageProvider>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </SelectedLanguageProvider>
);
