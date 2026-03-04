import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHead } from "../components/PageHead";
import { FeedCard } from "../components/FeedCards";
import { feed } from "../content/feed";

export function HomePage() {
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
        <div className="flex items-start gap-5 mb-6">
          <img
            src="/images/felix-hero.jpeg"
            alt="Felix Hellström"
            width={80}
            height={80}
            className="size-16 sm:size-20 rounded-full object-cover ring-2 ring-border shrink-0"
          />
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold leading-tight mb-2">
              I build things that ship.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Full-stack developer. 28+ client projects. Building AI tools and
              products on the side.
            </p>
          </div>
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
        className="mx-auto max-w-2xl px-4 sm:px-6 pb-20"
        aria-label="Recent activity"
      >
        <div className="flex flex-col gap-4">
          {feed.map((item, i) => (
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
