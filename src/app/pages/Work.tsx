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
import { PageHead } from "../components/PageHead";
import { caseStudies } from "../content/work";

const featured = caseStudies.filter((c) => c.featured);
const other = caseStudies.filter((c) => !c.featured);

export function WorkPage() {
  return (
    <>
      <PageHead
        title="Work"
        description="Selected client projects and case studies by Felix Hellström."
        url="/work"
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
        <h1 className="text-3xl font-semibold mb-4">Work</h1>
        <p className="text-muted-foreground mb-10">
          Selected client projects from 5+ years of professional work. Webflow,
          HubSpot CMS, custom integrations, and full-stack builds.
        </p>

        <h2 className="text-lg font-semibold mb-4">Featured</h2>
        <div className="grid gap-4 mb-12">
          {featured.map((study, i) => (
            <Link key={study.slug} to={`/work/${study.slug}`}>
              <Card className="hover:border-primary/50 transition-colors overflow-hidden">
                {study.image && (
                  <div className="aspect-[2/1] overflow-hidden border-b border-border">
                    <img
                      src={study.image}
                      alt={`${study.client} project`}
                      className="w-full h-full object-cover"
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
                      <CardTitle className="text-base font-medium">
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

        <h2 className="text-lg font-semibold mb-4">More projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {other.map((study) => (
            <Link key={study.slug} to={`/work/${study.slug}`}>
              <Card className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <p className="text-xs text-muted-foreground mb-1">
                    {study.client} · {study.year}
                  </p>
                  <CardTitle className="text-sm font-medium">
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
      </div>
    </>
  );
}
