import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { ErrorBoundary } from "./app/components/ErrorBoundary.tsx";
import "./styles/index.css";
import "./i18n";

// Global error handlers for debugging
window.addEventListener("error", (event) => {
  console.error("🚨 Global error caught:", event.error);
  console.error("Error message:", event.message);
  console.error("Error filename:", event.filename);
  console.error("Error line:", event.lineno);
  console.error("Error column:", event.colno);
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("🚨 Unhandled promise rejection:", event.reason);
  console.error("Promise:", event.promise);
});

// Log when the app starts
console.log("🚀 Application starting...");

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <Suspense fallback={<div>Loading application...</div>}>
      <App />
    </Suspense>
  </ErrorBoundary>
);
  