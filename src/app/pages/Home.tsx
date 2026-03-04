import { useMemo, useState } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHead } from "../components/PageHead";
import { FeedCard } from "../components/FeedCards";
import { feed } from "../content/feed";

type FeedFilter = "all" | "work" | "blog" | "products" | "recommendations" | "stats";

export function HomePage() {
  const [filter, setFilter] = useState<FeedFilter>("all");

  const filteredFeed = useMemo(
    () =>
      feed.filter((item) => {
        switch (filter) {
          case "work":
            return item.type === "case-study";
          case "blog":
            return item.type === "blog-post";
          case "products":
            return item.type === "project";
          case "recommendations":
            return item.type === "recommendation";
          case "stats":
            return item.type === "stat";
          case "all":
          default:
            return true;
        }
      }),
    [filter],
  );

  return (
    <>
      <PageHead
        title="Home"
        description="Felix Hellström. Full-stack developer building AI tools and production web platforms. Creator of context-vault, an open-source memory layer for AI agents."
        url="/"
        image="https://felixhellstrom.com/images/felix-hero.jpeg"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Felix Hellström",
          url: "https://felixhellstrom.com",
          image: "https://felixhellstrom.com/images/felix-hero.jpeg",
          jobTitle: "Full-Stack Developer & Technical Lead",
          knowsAbout: [
            "AI Agents",
            "MCP Protocol",
            "Webflow",
            "HubSpot CMS",
            "React",
            "TypeScript",
            "Next.js",
          ],
          sameAs: [
            "https://linkedin.com/in/felixhellstrom",
            "https://github.com/fellanH",
            "https://x.com/felixhellstrom",
            "https://www.npmjs.com/~fellanh",
          ],
        }}
      />

      {/* Hero */}
      <section className="mx-auto max-w-2xl px-4 sm:px-6 pt-20 pb-12">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-semibold leading-tight mb-2">
            I build things, that ship.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Full-stack developer. managing client projects by day. Building AI tools and
            automations by night.
          </p>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed mb-8">
          By day I lead technical delivery at{" "}
          <a
            href="https://stormfors.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-2"
          >
            Stormfors
          </a>
          . On my own time I'm building{" "}
          <a
            href="https://context-vault.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-2"
          >
            context-vault
          </a>
          , a persistent memory layer for AI agents, and{" "}
          <a
            href="https://trained-on.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-2"
          >
            trained-on.com
          </a>
          .
        </p>
        <div className="flex gap-3">
          <Button asChild>
            <Link to="/work">
              See my work <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/blog">Read the blog</Link>
          </Button>
        </div>
      </section>

      {/* Feed */}
      <section
        id="feed"
        className="mx-auto max-w-2xl px-4 sm:px-6 pb-20"
        aria-label="Recent activity"
      >
        <div className="mb-6 flex flex-wrap gap-2 text-xs">
          {[
            { id: "all", label: "All" },
            { id: "work", label: "Work" },
            { id: "blog", label: "Blog" },
            { id: "products", label: "Products" },
            { id: "recommendations", label: "Recommendations" },
            { id: "stats", label: "Stats" },
          ].map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setFilter(option.id as FeedFilter)}
              className={`inline-flex items-center rounded-full border px-3 py-1 transition-colors ${
                filter === option.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
              aria-pressed={filter === option.id}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {filteredFeed.map((item, i) => (
            <FeedCard key={`feed-${item.type}-${i}`} item={item} />
          ))}
        </div>

        {/* Footer links */}
        <div className="mt-8 pt-6 border-t border-border flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
          <Link to="/work" className="hover:text-foreground transition-colors">
            All projects
          </Link>
          <Link to="/blog" className="hover:text-foreground transition-colors">
            All posts
          </Link>
          <Link
            to="/projects"
            className="hover:text-foreground transition-colors"
          >
            Products
          </Link>
          <a
            href="https://www.linkedin.com/in/felixhellstrom/details/recommendations/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            All recommendations
          </a>
        </div>
      </section>
    </>
  );
}
