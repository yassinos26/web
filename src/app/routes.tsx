import { createBrowserRouter, useRouteError, Navigate } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { Members } from "./components/Members";
import { Videos } from "./components/Videos";
import { Guide } from "./components/Guide";
import { Contact } from "./components/Contact";
import { SupportBaby } from "./components/SupportBaby";
import { Privacy } from "./components/Privacy";
import { Terms } from "./components/Terms";

// Error component for route-level errors
function RouteError() {
  const error = useRouteError();
  console.error("Route Error:", error); // Log error to console for debugging

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="text-6xl mb-4">🚨</div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">
          Route Error
        </h1>
        <p className="text-gray-600 mb-4">
          There was an error loading this page. Check the console for details.
        </p>
        <button
          onClick={() => window.location.href = "/"}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors mr-2"
        >
          Go Home
        </button>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Reload
        </button>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Navigate to="/" replace />,
    children: [
      { index: true, element: <Home /> },
      { path: "/members", element: <Members /> },
      { path: "/videos", element: <Videos /> },
      { path: "/guide", element: <Guide /> },
      { path: "/contact", element: <Contact /> },
      { path: "/support", element: <SupportBaby /> },
      { path: "/privacy", element: <Privacy /> },
      { path: "/terms", element: <Terms /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
