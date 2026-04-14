import { Suspense   } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import "./i18n";

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<div>Loading application...</div>}>
    <App />
  </Suspense>
);
  