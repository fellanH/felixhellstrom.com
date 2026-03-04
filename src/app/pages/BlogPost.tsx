import { lazy, Suspense } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { MDXProvider } from "@mdx-js/react";
import { PageHead } from "../components/PageHead";
import { components } from "../components/MDXComponents";
import { Badge } from "@/components/ui/badge";
import { posts } from "../content/posts";
import { NotFoundPage } from "./NotFound";

const mdxModules: Record<
  string,
  React.LazyExoticComponent<React.ComponentType>
> = {
  "eleven-prs-while-i-slept": lazy(
    () => import("../content/posts/eleven-prs-while-i-slept.mdx"),
  ),
  "building-ai-memory-layer": lazy(
    () => import("../content/posts/building-ai-memory-layer.mdx"),
  ),
  "building-self-improving-agent-os": lazy(
    () => import("../content/posts/building-self-improving-agent-os.mdx"),
  ),
  "using-git-with-ai-agents": lazy(
    () => import("../content/posts/using-git-with-ai-agents.mdx"),
  ),
  "webflow-advice-for-beginners": lazy(
    () => import("../content/posts/webflow-advice-for-beginners.mdx"),
  ),
};

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === slug);

  if (!post || !slug) {
    return <NotFoundPage />;
  }

  const MDXContent = mdxModules[slug];
  if (!MDXContent) {
    return <NotFoundPage />;
  }

  return (
    <>
      <PageHead
        title={post.title}
        description={post.description}
        url={`/blog/${post.slug}`}
        type="article"
        publishedTime={post.date}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="size-3.5" /> Blog
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary">{post.category}</Badge>
            <time
              className="text-sm text-muted-foreground"
              dateTime={post.date}
            >
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <h1 className="text-3xl font-semibold leading-tight mb-3">
            {post.title}
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {post.description}
          </p>
        </header>

        <Suspense
          fallback={
            <div
              className="text-muted-foreground"
              role="status"
              aria-live="polite"
            >
              Loading...
            </div>
          }
        >
          <MDXProvider components={components}>
            <div className="prose">
              <MDXContent />
            </div>
          </MDXProvider>
        </Suspense>
      </div>
    </>
  );
}
