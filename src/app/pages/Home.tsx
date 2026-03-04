import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { PageHead } from "../components/PageHead";
import { FeedCard } from "../components/FeedCards";
import { feed } from "../content/feed";

type FeedFilter = "all" | "work" | "blog" | "products" | "recommendations" | "stats";

function SubFilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-[11px] transition-colors ${
        active
          ? "border-foreground bg-foreground text-background font-medium"
          : "border-border text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

export function HomePage() {
  const [filter, setFilter] = useState<FeedFilter>("all");
  const [subFilter, setSubFilter] = useState<string>("All");

  useEffect(() => {
    // Reset sub-filter whenever the top-level filter changes
    setSubFilter("All");
  }, [filter]);

  const subFilterOptions = useMemo(() => {
    // Curated sub-filters per top-level category
    if (filter === "work") {
      return ["All", "Webflow", "HubSpot CMS", "Next.js"];
    }
    if (filter === "blog") {
      return ["All", "AI Workflows", "Webflow", "Products"];
    }
    if (filter === "products") {
      return ["All", "MCP", "AI", "SaaS"];
    }
    return [];
  }, [filter]);

  const filteredFeed = useMemo(
    () =>
      feed.filter((item) => {
        // Top-level filter
        if (filter === "work" && item.type !== "case-study") return false;
        if (filter === "blog" && item.type !== "blog-post") return false;
        if (filter === "products" && item.type !== "project") return false;
        if (filter === "recommendations" && item.type !== "recommendation")
          return false;
        if (filter === "stats" && item.type !== "stat") return false;

        // Sub-filters (only applied when not "All")
        if (filter === "work" && subFilter !== "All" && item.type === "case-study") {
          return item.data.tags.includes(subFilter);
        }
        if (
          filter === "blog" &&
          subFilter !== "All" &&
          item.type === "blog-post"
        ) {
          return item.data.category === subFilter;
        }
        if (
          filter === "products" &&
          subFilter !== "All" &&
          item.type === "project"
        ) {
          return item.data.tags.includes(subFilter);
        }

        return true;
      }),
    [filter, subFilter],
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
        <p className="text-base text-muted-foreground leading-relaxed">
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
      </section>

      {/* Feed */}
      <section
        id="feed"
        className="mx-auto max-w-2xl px-4 sm:px-6 pb-20"
        aria-label="Recent activity"
      >
        <div
          className="flex flex-wrap gap-2 mb-6"
          role="group"
          aria-label="Filter activity by type"
        >
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
              onClick={() => setFilter(option.id as FeedFilter)}
              aria-pressed={filter === option.id}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                filter === option.id
                  ? "bg-foreground text-background font-medium"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {filter !== "all" && subFilterOptions.length > 0 && (
          <div
            className="flex flex-wrap gap-2 mb-6 text-xs"
            role="group"
            aria-label={`Filter ${filter} items by sub-category`}
          >
            {subFilterOptions.map((option) => (
              <SubFilterButton
                key={option}
                label={option}
                active={subFilter === option}
                onClick={() => setSubFilter(option)}
              />
            ))}
          </div>
        )}

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
