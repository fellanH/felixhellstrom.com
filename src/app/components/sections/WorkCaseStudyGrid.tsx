import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageShell, PageHeader } from "../LayoutPrimitives";
import { caseStudies } from "../../content/work";

const featured = caseStudies.filter((c) => c.featured);
const other = caseStudies.filter((c) => !c.featured);

export function WorkCaseStudyGrid() {
  return (
    <PageShell>
      <PageHeader
        title="Work"
        description="Selected client projects from 10+ years of professional work. Webflow, HubSpot CMS, custom integrations, and full-stack builds."
        className="mb-10"
      />

      <section className="space-y-6 mb-10">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Featured case studies</h2>
          <p className="text-xs text-muted-foreground">
            High-impact projects with deeper write-ups.
          </p>
        </div>
        <div className="grid gap-4">
          {featured.map((study, i) => (
            <Link key={study.slug} to={`/work/${study.slug}`} className="group">
              <Card className="hover:border-primary/50 transition-colors overflow-hidden">
                {study.image && !study.hideImage && (
                  <div className="aspect-2/1 overflow-hidden border-b border-border">
                    <img
                      src={study.image}
                      alt={`${study.client} project`}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      loading={i === 0 ? "eager" : "lazy"}
                      fetchPriority={i === 0 ? "high" : undefined}
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {study.client} · {study.year}
                      </p>
                      <CardTitle className="text-base font-medium group-hover:text-primary transition-colors">
                        {study.title}
                      </CardTitle>
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground shrink-0 mt-1" />
                  </div>
                  <CardDescription className="text-sm leading-relaxed">
                    {study.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {study.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {other.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">More projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {other.map((study) => (
              <Link key={study.slug} to={`/work/${study.slug}`} className="group">
                <Card className="hover:border-primary/50 transition-colors h-full">
                  <CardHeader>
                    <p className="text-xs text-muted-foreground mb-1">
                      {study.client} · {study.year}
                    </p>
                    <CardTitle className="text-sm font-medium group-hover:text-primary transition-colors">
                      {study.title}
                    </CardTitle>
                    <CardDescription className="text-xs leading-relaxed">
                      {study.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1.5">
                      {study.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </PageShell>
  );
}

