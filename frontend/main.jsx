import React from "react";
import ReactDOM from "react-dom/client"; // Updated import
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root")); // Use createRoot

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster className="toast" position="bottom-left" />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
