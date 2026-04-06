import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { Members } from "./components/Members";
import { Videos } from "./components/Videos";
import { Guide } from "./components/Guide";
import { Contact } from "./components/Contact";
import { SupportBaby } from "./components/SupportBaby";
import { Terms } from "./components/Terms";
import { Privacy } from "./components/Privacy";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "members", Component: Members },
      { path: "videos", Component: Videos },
      { path: "guide", Component: Guide },
      { path: "contact", Component: Contact },
      { path: "support", Component: SupportBaby },
      { path: "privacy", Component: Privacy },
      { path: "terms", Component: Terms },
      { path: "*", Component: Home },
    ],
  },
]);
