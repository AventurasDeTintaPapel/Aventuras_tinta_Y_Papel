import React from "react";
import "./style.css";
import AppRouter from "./Routers/AppRouters";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id": "Ab-GPkTvpSFTaIAjQ8jjFQ_0jqhONBwX8G0McqIQZIvyZvBwnmrvWbeUGKCu5mrQ0cFHN7qiDchPuxpz",
  currency: "USD",
  intent: "capture",
};

function App() {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <AppRouter />;
    </PayPalScriptProvider>
  );
}

export default App;
