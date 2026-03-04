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
import { PageHead } from "../components/PageHead";
import { posts, type Post } from "../content/posts";

const categories: Array<Post["category"] | "All"> = [
  "All",
  "AI Workflows",
  "Webflow",
  "Building in Public",
  "Products",
];

export function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<
    Post["category"] | "All"
  >("All");

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <>
      <PageHead
        title="Blog"
        description="Writing on AI workflows, Webflow, and building products."
        url="/blog"
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
        <h1 className="text-3xl font-semibold mb-8">Blog</h1>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                activeCategory === cat
                  ? "bg-foreground text-background font-medium"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts grid */}
        {filtered.length === 0 ? (
          <p className="text-muted-foreground">
            No posts in this category yet.
          </p>
        ) : (
          <div className="space-y-4">
            {filtered.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`}>
                <Card className="hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-4">
                      <CardTitle className="text-base font-medium">
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
                      <time className="text-xs text-muted-foreground">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      <div className="flex gap-1.5">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
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
      </div>
    </>
  );
}
