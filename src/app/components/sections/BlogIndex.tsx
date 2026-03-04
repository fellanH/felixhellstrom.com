import { useState } from "react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageShell, PageHeader } from "../LayoutPrimitives";
import { posts, type Post } from "../../content/posts";

const categories: Array<Post["category"] | "All"> = [
  "All",
  "AI Workflows",
  "Webflow",
  "Building in Public",
  "Products",
];

export function BlogIndexSection() {
  const [activeCategory, setActiveCategory] = useState<Post["category"] | "All">("All");

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <PageShell>
      <PageHeader
        title="Blog"
        description="Writing on AI workflows, Webflow, and building products."
        className="mb-8"
      />

      <div
        className="flex flex-wrap gap-2 mb-10"
        role="group"
        aria-label="Filter posts by category"
      >
        {categories.map((cat) => (
          <Button
            key={cat}
            size="sm"
            variant={activeCategory === cat ? "default" : "outline"}
            onClick={() => setActiveCategory(cat)}
            aria-pressed={activeCategory === cat}
            className="rounded-full px-3 text-xs"
          >
            {cat}
          </Button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground">No posts in this category yet.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="group block">
              <Card className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-base font-medium group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <Badge variant="secondary" className="shrink-0 text-xs">
                      {post.category}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm leading-relaxed">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <time
                      className="text-xs text-muted-foreground"
                      dateTime={post.date}
                    >
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <div className="flex gap-1.5">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </PageShell>
  );
}

