import { Link } from "react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageShell } from "../LayoutPrimitives";
import type { CaseStudy } from "../../app/content/work";
import type { CaseDetail } from "../../app/content/work-details";

type WorkDetailLayoutProps = {
  study: CaseStudy;
  details?: CaseDetail;
  videoSrc?: string;
};

export function WorkDetailLayout({ study, details, videoSrc }: WorkDetailLayoutProps) {
  return (
    <PageShell>
      <Link
        to="/work"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="size-3.5" /> Work
      </Link>

      <header className="mb-10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            {study.client} · {study.year}
          </p>
          {study.url && (
            <a
              href={study.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
            >
              Visit site <ExternalLink className="size-3" />
            </a>
          )}
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold leading-tight">{study.title}</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {study.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {study.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      {details?.image && (
        <div className="mb-8 rounded-lg overflow-hidden border border-border">
          <img
            src={details.image}
            alt={`${study.client} project screenshot`}
            className="w-full"
            loading="lazy"
          />
        </div>
      )}

      {videoSrc && (
        <div className="mb-8 rounded-lg overflow-hidden border border-border aspect-video bg-black">
          <video
            src={videoSrc}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={`${study.title} project demo`}
            title={`${study.title} project demo`}
          />
        </div>
      )}

      {details?.sections && (
        <div className="prose max-w-none">
          {details.sections.map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h2 className="text-xl font-semibold mt-8 mb-3 first:mt-0">
                  {section.heading}
                </h2>
              )}
              {section.content.map((paragraph, j) => (
                <p key={j} className="leading-relaxed mb-4 text-foreground">
                  {paragraph}
                </p>
              ))}
              {section.image && (
                <div className="my-6 rounded-lg overflow-hidden border border-border">
                  <img
                    src={section.image}
                    alt={section.heading || "Project detail"}
                    className="w-full"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {!details && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">Full case study coming soon.</p>
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-border">
        <Button asChild variant="outline">
          <Link to="/work">
            <ArrowLeft className="size-4" /> All projects
          </Link>
        </Button>
      </div>
    </PageShell>
  );
}

