import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageShell, PageHeader } from "../LayoutPrimitives";
import { projects } from "../../content/projects";
import { ExternalLink, Github, Package } from "lucide-react";

const statusLabel: Record<string, string> = {
  active: "Active",
  building: "Building",
  concept: "Concept",
};

export function ProjectsGrid() {
  return (
    <PageShell>
      <PageHeader
        title="Projects"
        description="AI tools, web apps, and products I'm building. Context Vault, omni-cli, trained-on.com, and more."
        className="mb-10"
      />

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.slug}>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <CardTitle className="text-base font-medium">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {project.description}
                  </CardDescription>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium shrink-0 bg-secondary text-secondary-foreground">
                  {statusLabel[project.status] ?? project.status}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              {project.stats && (
                <p className="text-xs text-muted-foreground mb-3 font-medium">
                  {project.stats}
                </p>
              )}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              {(project.url || project.github || project.npm) && (
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="size-3" />
                      {project.url.replace("https://", "")}
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                    >
                      <Github className="size-3" />
                      GitHub
                    </a>
                  )}
                  {project.npm && (
                    <a
                      href={project.npm}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                    >
                      <Package className="size-3" />
                      npm
                    </a>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}

