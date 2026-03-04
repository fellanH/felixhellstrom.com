import { ExternalLink, Github, Package } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHead } from "../components/PageHead";
import { projects } from "../content/projects";

const statusLabel: Record<string, string> = {
  active: "Active",
  building: "Building",
  concept: "Concept",
};

const statusColor: Record<string, string> = {
  active: "bg-green-500/15 text-green-700 dark:text-green-400",
  building: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
  concept: "bg-secondary text-secondary-foreground",
};

export function ProjectsPage() {
  return (
    <>
      <PageHead
        title="Projects"
        description="AI tools, web apps, and products I'm building. Context Vault, omni-cli, trained-on.com, and more."
        url="/projects"
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
        <h1 className="text-3xl font-semibold mb-4">Projects</h1>
        <p className="text-muted-foreground mb-10">
          Things I'm building, in various stages of done.
        </p>

        <div className="grid gap-4">
          {projects.map((project) => (
            <Card key={project.slug}>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base font-medium">
                    {project.title}
                  </CardTitle>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${statusColor[project.status]}`}
                  >
                    {statusLabel[project.status]}
                  </span>
                </div>
                <CardDescription className="text-sm leading-relaxed">
                  {project.description}
                </CardDescription>
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
                  <div className="flex items-center gap-3">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
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
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
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
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
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
      </div>
    </>
  );
}
