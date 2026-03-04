import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHead } from "../components/PageHead";
import { posts } from "../content/posts";
import { projects } from "../content/projects";

export function HomePage() {
  const latestPosts = posts.slice(0, 3);
  const featuredProjects = projects.filter((p) => p.status === "active");

  return (
    <>
      <PageHead
        title="Home"
        description="Felix Hellström — AI engineer and web developer. Building AI tools, Webflow sites, and products."
        url="/"
      />

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 pt-20 pb-16">
        <h1 className="text-3xl sm:text-4xl font-semibold leading-tight mb-4">
          I build AI tools and Webflow sites.
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-8">
          AI engineer at Stormfors. Building context-vault, trained-on.com, and
          an ever-growing toolkit for making AI agents actually useful.
        </p>
        <div className="flex gap-3">
          <Button asChild>
            <Link to="/projects">
              See projects <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/blog">Read the blog</Link>
          </Button>
        </div>
      </section>

      {/* Latest posts */}
      {latestPosts.length > 0 && (
        <section className="mx-auto max-w-3xl px-4 sm:px-6 pb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Latest posts</h2>
            <Button asChild variant="ghost" size="sm">
              <Link to="/blog">View all</Link>
            </Button>
          </div>
          <div className="space-y-3">
            {latestPosts.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`}>
                <Card className="hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-4">
                      <CardTitle className="text-base">{post.title}</CardTitle>
                      <Badge variant="secondary" className="shrink-0 text-xs">
                        {post.category}
                      </Badge>
                    </div>
                    <CardDescription>{post.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <time className="text-xs text-muted-foreground">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured projects */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Projects</h2>
          <Button asChild variant="ghost" size="sm">
            <Link to="/projects">View all</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featuredProjects.map((project) => (
            <Card key={project.slug}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
