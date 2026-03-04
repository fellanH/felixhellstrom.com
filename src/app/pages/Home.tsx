import { Link } from "react-router";
import { PageHead } from "../components/PageHead";
import { HomeHero } from "../components/sections/HomeHero";
import { HomeFeedSection } from "../components/sections/HomeFeedSection";

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

      <HomeHero />

      {/* Footer links above activity for quick navigation */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 pb-6">
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

      {/* Feed */}
      <HomeFeedSection />
    </>
  );
}
