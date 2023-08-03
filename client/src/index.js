import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SelectedLanguageProvider } from "./Context/SelectedLanguageProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SelectedLanguageProvider>
    <App />
  </SelectedLanguageProvider>
);
