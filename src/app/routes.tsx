import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import { SiteLayout } from "./components/SiteLayout";

const HomePage = lazy(() =>
  import("./pages/Home").then((m) => ({ default: m.HomePage })),
);
const AboutPage = lazy(() =>
  import("./pages/About").then((m) => ({ default: m.AboutPage })),
);
const BlogPage = lazy(() =>
  import("./pages/Blog").then((m) => ({ default: m.BlogPage })),
);
const BlogPostPage = lazy(() =>
  import("./pages/BlogPost").then((m) => ({ default: m.BlogPostPage })),
);
const WorkPage = lazy(() =>
  import("./pages/Work").then((m) => ({ default: m.WorkPage })),
);
const WorkDetailPage = lazy(() =>
  import("./pages/WorkDetail").then((m) => ({ default: m.WorkDetailPage })),
);
const ProjectsPage = lazy(() =>
  import("./pages/Projects").then((m) => ({ default: m.ProjectsPage })),
);
const ContactPage = lazy(() =>
  import("./pages/Contact").then((m) => ({ default: m.ContactPage })),
);
const StyleguidePage = lazy(() =>
  import("./pages/Styleguide").then((m) => ({ default: m.StyleguidePage })),
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFound").then((m) => ({ default: m.NotFoundPage })),
);

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SiteLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "blog", Component: BlogPage },
      { path: "blog/:slug", Component: BlogPostPage },
      { path: "work", Component: WorkPage },
      { path: "work/:slug", Component: WorkDetailPage },
      { path: "projects", Component: ProjectsPage },
      { path: "contact", Component: ContactPage },
      { path: "styleguide", Component: StyleguidePage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
