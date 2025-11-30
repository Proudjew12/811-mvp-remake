// React & DOM
import React from "react";
import ReactDOM from "react-dom/client";

// Routing
import { BrowserRouter } from "react-router-dom";

// App entry
import App from "./App";

// Global styles & i18n
import "./styles/main.scss";
import "./i18n";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element with id 'root' not found");
}

ReactDOM.createRoot(rootElement as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
