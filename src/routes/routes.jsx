import { createBrowserRouter } from "react-router";
import Root from "../pages/Root/Root";
import Home from "../pages/Home/Home";

import Apps from "../pages/Apps/Apps";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "/apps",
        loader: async () => {
          const res = await fetch("/apps.json");
          if (!res.ok) throw new Error("Failed to fetch apps data");
          return res.json();
        },
        Component: Apps,
      },
    ],
  },
]);
