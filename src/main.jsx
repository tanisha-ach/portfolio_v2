import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Aimly from "./pages/Aimly.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import "./index.css";

const routes = [
  ["/aimly", Aimly],
  ["/upgrade-hmc", App],
  ["/about", About],
];

const path = window.location.pathname;
const Page = routes.find(([prefix]) => path.startsWith(prefix))?.[1] ?? Home;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Page />
  </StrictMode>
);
