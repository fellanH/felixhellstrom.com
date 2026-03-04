import { useMemo, useState } from "react";
import { FeedCard } from "../FeedCards";
import { PageShell } from "../LayoutPrimitives";
import { Button } from "@/components/ui/button";
import { feed } from "../../content/feed";

type FeedFilter = "all" | "work" | "blog" | "products" | "recommendations" | "stats";

const FILTER_OPTIONS: { id: FeedFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "work", label: "Work" },
  { id: "blog", label: "Blog" },
  { id: "products", label: "Products" },
  { id: "recommendations", label: "Recommendations" },
  { id: "stats", label: "Stats" },
];

export function HomeFeedSection() {
  const [filter, setFilter] = useState<FeedFilter>("all");
  const [subFilter, setSubFilter] = useState<string>("All");

  const subFilterOptions = useMemo(() => {
    if (filter === "work") return ["All", "Webflow", "HubSpot CMS", "Next.js"];
    if (filter === "blog") return ["All", "AI Workflows", "Webflow", "Products"];
    if (filter === "products") return ["All", "MCP", "AI", "SaaS"];
    return [];
  }, [filter]);

  const filteredFeed = useMemo(
    () =>
      feed.filter((item) => {
        if (filter === "work" && item.type !== "case-study") return false;
        if (filter === "blog" && item.type !== "blog-post") return false;
        if (filter === "products" && item.type !== "project") return false;
        if (filter === "recommendations" && item.type !== "recommendation") return false;
        if (filter === "stats" && item.type !== "stat") return false;

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
    <PageShell id="feed" className="pb-20" aria-label="Recent activity">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg font-semibold leading-tight">Recent activity</h2>
          <p className="text-xs text-muted-foreground">
            Work, posts, products, recommendations, and stats in one stream.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="hidden sm:inline-flex"
          onClick={() => {
            setFilter("all");
            setSubFilter("All");
          }}
        >
          Reset filters
        </Button>
      </div>

      <div
        className="flex flex-wrap gap-2 mb-6"
        role="group"
        aria-label="Filter activity by type"
      >
        {FILTER_OPTIONS.map((option) => (
          <Button
            key={option.id}
            size="sm"
            variant={filter === option.id ? "default" : "outline"}
            onClick={() => setFilter(option.id)}
            aria-pressed={filter === option.id}
            className="rounded-full px-3"
          >
            {option.label}
          </Button>
        ))}
      </div>

      {filter !== "all" && subFilterOptions.length > 0 && (
        <div
          className="flex flex-wrap gap-2 mb-6 text-xs"
          role="group"
          aria-label={`Filter ${filter} items by sub-category`}
        >
          {subFilterOptions.map((option) => (
            <Button
              key={option}
              size="sm"
              variant={subFilter === option ? "secondary" : "ghost"}
              onClick={() => setSubFilter(option)}
              aria-pressed={subFilter === option}
              className="h-7 rounded-full px-3 text-xs"
            >
              {option}
            </Button>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-4">
        {filteredFeed.map((item, i) => (
          <FeedCard key={`feed-${item.type}-${i}`} item={item} />
        ))}
      </div>
    </PageShell>
  );
}

