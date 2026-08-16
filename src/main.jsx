import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Aimly from "./pages/Aimly.jsx";
import "./index.css";

const Page = window.location.pathname.startsWith("/aimly") ? Aimly : App;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Page />
  </StrictMode>
);
