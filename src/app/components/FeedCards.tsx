import { Link } from "react-router";
import {
  ArrowRight,
  Briefcase,
  ExternalLink,
  Github,
  MessageSquareQuote,
  Newspaper,
  Package,
  Rocket,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { CaseStudy } from "../content/work";
import type { Testimonial } from "../content/testimonials";
import type { Post } from "../content/posts";
import type { Project } from "../content/projects";
import type { FeedItem } from "../content/feed";

// --- Shared parts ---

function FeedLabel({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-1.5 mb-3">
      <Icon className="size-3.5 text-muted-foreground" aria-hidden="true" />
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {children}
      </span>
    </div>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-3">
      {tags.map((tag) => (
        <Badge key={tag} variant="outline" className="text-xs">
          {tag}
        </Badge>
      ))}
    </div>
  );
}

// --- Card components ---

function StatementCard({ text, label }: { text: string; label?: string }) {
  return (
    <div className="py-2">
      {label && (
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-4">
          {label}
        </p>
      )}
      <p className="text-2xl sm:text-[1.7rem] font-semibold leading-snug text-foreground/90">
        {text}
      </p>
    </div>
  );
}

function CaseStudyCard({ data }: { data: CaseStudy }) {
  return (
    <Link to={`/work/${data.slug}`} className="group block">
      <div className="rounded-xl border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors">
        {data.image && !data.hideImage && (
          <div className="aspect-[2.2/1] overflow-hidden">
            <img
              src={data.image}
              alt={`${data.client} project`}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
            />
          </div>
        )}
        <div className="p-5">
          <FeedLabel icon={Briefcase}>
            Project · {data.client} · {data.year}
          </FeedLabel>
          <h3 className="text-base font-semibold mb-1.5 group-hover:text-primary transition-colors">
            {data.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {data.description}
          </p>
          <Tags tags={data.tags} />
        </div>
      </div>
    </Link>
  );
}

function RecommendationCard({ data }: { data: Testimonial }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <FeedLabel icon={MessageSquareQuote}>Recommendation</FeedLabel>
      <blockquote className="text-sm leading-relaxed text-foreground mb-4">
        "{data.quote}"
      </blockquote>
      <div className="flex items-center gap-3">
        {data.image ? (
          <img
            src={data.image}
            alt={data.name}
            className="size-9 rounded-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="size-9 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
            {data.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </div>
        )}
        <div>
          <p className="text-sm font-medium">{data.name}</p>
          <p className="text-xs text-muted-foreground">{data.role}</p>
        </div>
      </div>
    </div>
  );
}

function BlogPostCard({ data }: { data: Post }) {
  return (
    <Link to={`/blog/${data.slug}`} className="group block">
      <div className="rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-colors">
        <FeedLabel icon={Newspaper}>Blog · {data.category}</FeedLabel>
        <h3 className="text-lg font-semibold mb-1.5 group-hover:text-primary transition-colors">
          {data.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          {data.description}
        </p>
        <div className="flex items-center justify-between">
          <time className="text-xs text-muted-foreground" dateTime={data.date}>
            {new Date(data.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span className="text-xs text-primary font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Read <ArrowRight className="size-3" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function ProjectCard({ data }: { data: Project }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <FeedLabel icon={Rocket}>
        Product · {data.status === "active" ? "Active" : "Building"}
      </FeedLabel>
      <h3 className="text-base font-semibold mb-1.5">{data.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {data.description}
      </p>
      {data.stats && (
        <p className="text-xs font-medium text-foreground/70 mt-2">
          {data.stats}
        </p>
      )}
      <Tags tags={data.tags} />
      {(data.url || data.github || data.npm) && (
        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border">
          {data.url && (
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="size-3" aria-hidden="true" />
              {data.url.replace("https://", "")}
            </a>
          )}
          {data.github && (
            <a
              href={data.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="size-3" aria-hidden="true" />
              GitHub
            </a>
          )}
          {data.npm && (
            <a
              href={data.npm}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Package className="size-3" aria-hidden="true" />
              npm
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function StatCard({
  value,
  label,
  detail,
}: {
  value: string;
  label: string;
  detail?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-full bg-muted flex items-center justify-center">
            <TrendingUp
              className="size-4 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
          <p className="text-3xl font-bold tracking-tight leading-none">
            {value}
          </p>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">{label}</p>
          {detail && (
            <p className="text-xs text-muted-foreground mt-0.5">{detail}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Main renderer ---

export function FeedCard({ item }: { item: FeedItem }) {
  switch (item.type) {
    case "statement":
      return <StatementCard text={item.text} label={item.label} />;
    case "case-study":
      return <CaseStudyCard data={item.data} />;
    case "recommendation":
      return <RecommendationCard data={item.data} />;
    case "blog-post":
      return <BlogPostCard data={item.data} />;
    case "project":
      return <ProjectCard data={item.data} />;
    case "stat":
      return (
        <StatCard value={item.value} label={item.label} detail={item.detail} />
      );
  }
}
