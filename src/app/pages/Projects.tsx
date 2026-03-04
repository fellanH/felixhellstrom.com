import { PageHead } from "../components/PageHead";
import { ProjectsGrid } from "../components/sections/ProjectsGrid";

export function ProjectsPage() {
  return (
    <>
      <PageHead
        title="Projects"
        description="AI tools, web apps, and products I'm building. Context Vault, omni-cli, trained-on.com, and more."
        url="/projects"
      />
      <ProjectsGrid />
    </>
  );
}
