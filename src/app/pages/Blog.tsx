import { PageHead } from "../components/PageHead";
import { BlogIndexSection } from "../components/sections/BlogIndex";

export function BlogPage() {
  return (
    <>
      <PageHead
        title="Blog"
        description="Writing on AI workflows, Webflow, and building products."
        url="/blog"
      />
      <BlogIndexSection />
    </>
  );
}
