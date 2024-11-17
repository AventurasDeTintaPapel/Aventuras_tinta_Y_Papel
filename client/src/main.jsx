import { createRoot } from "react-dom/client";
import React from "react";
import "./style.css";
import App from "./App.jsx";
import { SessionProvider } from "./context/SessionProvider.jsx";

createRoot(document.getElementById("root")).render(

    <App />

);
