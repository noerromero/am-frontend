import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.css";
import "boxicons/css/boxicons.min.css"; // Íconos de Boxicons
import "react-toastify/dist/ReactToastify.css"; // Estilos de react-toastify
import { ToastContainer } from "react-toastify";

const root = document.getElementById("root");
if (!root) throw new Error("No se encontró el elemento #root");

createRoot(root).render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>
);