import { lazy, Suspense } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { MDXProvider } from "@mdx-js/react";
import { PageHead } from "../components/PageHead";
import { components } from "../components/MDXComponents";
import { Badge } from "@/components/ui/badge";
import { posts } from "../content/posts";

function PostContent({ slug }: { slug: string }) {
  const MDXContent = lazy(() => import(`../content/posts/${slug}.mdx`));

  return (
    <Suspense
      fallback={<div className="text-muted-foreground">Loading...</div>}
    >
      <MDXProvider components={components}>
        <div className="prose">
          <MDXContent />
        </div>
      </MDXProvider>
    </Suspense>
  );
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === slug);

  if (!post || !slug) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
        <p className="text-muted-foreground">Post not found.</p>
        <Link
          to="/blog"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
        >
          <ArrowLeft className="size-3.5" /> Back to blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageHead
        title={post.title}
        description={post.description}
        url={`/blog/${post.slug}`}
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
            <time className="text-sm text-muted-foreground">
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

        <PostContent slug={slug} />
      </div>
    </>
  );
}
