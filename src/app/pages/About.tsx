import { ExternalLink } from "lucide-react";
import { PageHead } from "../components/PageHead";

export function AboutPage() {
  return (
    <>
      <PageHead
        title="About"
        description="Felix Hellström. Full-stack developer and technical lead based in Sweden. 28+ client projects, building AI tools and web platforms."
        url="/about"
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
        <div className="flex items-center gap-5 mb-8">
          <img
            src="/images/people/felix-profile.jpg"
            alt="Felix Hellström"
            className="size-24 rounded-full object-cover ring-2 ring-border"
          />
          <div>
            <h1 className="text-3xl font-semibold">About</h1>
            <p className="text-muted-foreground mt-1">
              Full-Stack Developer & AI Toolmaker
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10 py-6 border-y border-border">
          {[
            { value: "28+", label: "Client projects" },
            { value: "3", label: "Languages" },
            { value: "5+", label: "Years shipping" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-semibold">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="prose max-w-none">
          <p>
            I'm Felix, a full-stack developer and technical lead based in
            Sweden. I work at{" "}
            <a
              href="https://stormfors.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Stormfors
            </a>
            , where I lead delivery across 10+ simultaneous client projects.
            Scoping, architecture, development, deployment, integrations, and
            ongoing support.
          </p>

          <p>
            I'm trilingual and conduct client work in Swedish, English, and
            Italian.
          </p>

          <h2>What I build at work</h2>
          <p>
            Production Webflow sites, HubSpot CMS builds, and custom
            integrations for clients like Porsche Club Sweden, Precis Digital,
            and Neonode. Recent highlights:{" "}
            <a href="/work">a decoupled Mapbox architecture for Salty.co</a>, a
            Contentful-to-HubSpot migration pipeline (37 pages, 135 press
            releases), and a sub-month site launch for Resident Interface.
          </p>

          <h2>What I build on my own time</h2>
          <p>
            My current focus is{" "}
            <a
              href="https://context-vault.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              context-vault
            </a>{" "}
            , a local-first MCP server that gives AI agents persistent memory
            across sessions. Published on npm, 693+ tests, with a full SaaS
            ecosystem. I'm also building{" "}
            <a
              href="https://trained-on.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              trained-on.com
            </a>
            , an AI product photo generation platform for e-commerce.
          </p>

          <h2>Technical focus</h2>
          <ul>
            <li>
              AI agents and the MCP ecosystem. Building tools that make agents
              useful for real development workflows
            </li>
            <li>
              Webflow and HubSpot CMS. Architecture, custom code, migrations,
              and integrations
            </li>
            <li>
              React and TypeScript. Vite, Next.js, Tauri for web and desktop
              apps
            </li>
            <li>
              Local-first software. SQLite, MCP servers, tools that work without
              a cloud dependency
            </li>
          </ul>

          <h2>Background</h2>
          <p>
            Before Stormfors I ran my own digital agency, which gave me a
            foundation across design, development, and managing client projects
            end-to-end. I moved into a focused engineering role to go deeper on
            the technical side, but I kept the product mindset.
          </p>
          <p>
            I picked up HubSpot CMS entirely on the job in December 2025 and
            shipped two production projects within weeks. That's what I'm good
            at: learning fast and delivering while I learn.
          </p>
        </div>

        <div className="mt-10 pt-8 border-t border-border">
          <h2 className="text-lg font-semibold mb-4">Links</h2>
          <div className="flex flex-col gap-3">
            {[
              {
                label: "LinkedIn",
                href: "https://linkedin.com/in/felixhellstrom",
              },
              { label: "GitHub", href: "https://github.com/fellanH" },
              { label: "X / Twitter", href: "https://x.com/felixhellstrom" },
              { label: "npm", href: "https://www.npmjs.com/~fellanh" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
                <ExternalLink className="size-3" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
