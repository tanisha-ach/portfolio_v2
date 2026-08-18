import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Aimly from "./pages/Aimly.jsx";
import Home from "./pages/Home.jsx";
import "./index.css";

const path = window.location.pathname;
const Page = path.startsWith("/aimly") ? Aimly : path.startsWith("/upgrade-hmc") ? App : Home;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Page />
  </StrictMode>
);
