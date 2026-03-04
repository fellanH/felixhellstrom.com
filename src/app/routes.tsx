import { createBrowserRouter } from "react-router";
import { SiteLayout } from "./components/SiteLayout";
import { HomePage } from "./pages/Home";
import { AboutPage } from "./pages/About";
import { BlogPage } from "./pages/Blog";
import { BlogPostPage } from "./pages/BlogPost";
import { ProjectsPage } from "./pages/Projects";
import { ContactPage } from "./pages/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SiteLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "blog", Component: BlogPage },
      { path: "blog/:slug", Component: BlogPostPage },
      { path: "projects", Component: ProjectsPage },
      { path: "contact", Component: ContactPage },
    ],
  },
]);
