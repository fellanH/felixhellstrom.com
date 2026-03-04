import { ExternalLink } from "lucide-react";
import { PageHead } from "../components/PageHead";

export function AboutPage() {
  return (
    <>
      <PageHead
        title="About"
        description="Felix Hellström — AI engineer at Stormfors, building AI tools and Webflow sites in Sweden."
        url="/about"
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
        <h1 className="text-3xl font-semibold mb-8">About</h1>

        <div className="prose max-w-none">
          <p>
            I'm Felix Hellström, an AI engineer and web developer based in
            Sweden. I work at{" "}
            <a
              href="https://stormfors.se"
              target="_blank"
              rel="noopener noreferrer"
            >
              Stormfors
            </a>
            , Sweden's leading Webflow agency, where I build production Webflow
            sites and integrate AI into client workflows.
          </p>

          <p>
            On the side, I build products. My current focus is{" "}
            <a
              href="https://context-vault.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              context-vault
            </a>{" "}
            — a local-first MCP server that gives AI agents persistent memory
            across sessions. I'm also working on trained-on.com, an AI training
            data marketplace.
          </p>

          <h2>Technical focus</h2>
          <ul>
            <li>
              AI agents and the Claude/MCP ecosystem — building tools that make
              agents actually useful for day-to-day development
            </li>
            <li>
              Webflow development — CMS architecture, custom code, Webflow
              Logic, and Webflow DevLink
            </li>
            <li>
              React and TypeScript — mostly Vite, Next.js, and React Router for
              web apps
            </li>
            <li>
              Local-first software — SQLite, MCP servers, tools that work
              without a cloud subscription
            </li>
          </ul>

          <h2>Background</h2>
          <p>
            Before Stormfors, I founded Klarhimmel, a digital agency. That gave
            me a broad foundation across design, development, and running client
            projects. I eventually moved into a more focused engineering role
            because I wanted to go deeper on the technical side.
          </p>

          <p>
            The thread through all of it: I'm drawn to tools that make
            developers more productive. That's why the AI/MCP space is so
            interesting right now — we're at the early stage of building the
            infrastructure that will make AI agents genuinely useful.
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
              {
                label: "context-vault.com",
                href: "https://context-vault.com",
              },
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
