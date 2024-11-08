import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import "./style.css";
import App from "./App.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
