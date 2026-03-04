import { PageShell } from "../LayoutPrimitives";
import { ExternalLink } from "lucide-react";

export function AboutBodySection() {
  return (
    <PageShell className="pt-0">
      <div className="grid gap-10 lg:grid-cols-[1.6fr_minmax(0,1fr)]">
        <div className="prose max-w-none">
          <p>
            I'm Felix, a full-stack developer and technical lead based in Sweden. I work
            at{" "}
            <a
              href="https://stormfors.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Stormfors
            </a>
            , where I lead delivery across 10+ simultaneous client projects. Scoping,
            architecture, development, deployment, integrations, and ongoing support.
          </p>

          <p>
            I'm trilingual and conduct client work in Swedish, English, and Italian.
          </p>

          <h2>What I build at work</h2>
          <p>
            Production Webflow sites, HubSpot CMS builds, and custom integrations for
            clients like Porsche Club Sweden, Precis Digital, and Neonode. Recent
            highlights:{" "}
            <a href="/work">a decoupled Mapbox architecture for Salty.co</a>, a
            Contentful-to-HubSpot migration pipeline (37 pages, 135 press releases), and
            a sub-month site launch for Resident Interface.
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
            , a local-first MCP server that gives AI agents persistent memory across
            sessions. Published on npm, 693+ tests, with a full SaaS ecosystem. I'm also
            building{" "}
            <a
              href="https://trained-on.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              trained-on.com
            </a>
            , an AI product photo generation platform for e-commerce.
          </p>

          <h2>Background</h2>
          <p>
            Before Stormfors I ran my own digital agency, which gave me a foundation
            across design, development, and managing client projects end-to-end. I moved
            into a focused engineering role to go deeper on the technical side, but I
            kept the product mindset.
          </p>
          <p>
            I picked up HubSpot CMS entirely on the job in December 2025 and shipped two
            production projects within weeks. That's what I'm good at: learning fast and
            delivering while I learn.
          </p>
        </div>

        <aside className="space-y-6">
          <section>
            <h2 className="text-sm font-medium mb-2">Snapshot</h2>
            <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
              <div>
                <p className="font-medium text-foreground">100+</p>
                <p>Client projects shipped</p>
              </div>
              <div>
                <p className="font-medium text-foreground">10+ yrs</p>
                <p>Professional experience</p>
              </div>
              <div>
                <p className="font-medium text-foreground">3</p>
                <p>Languages (SV / EN / IT)</p>
              </div>
              <div>
                <p className="font-medium text-foreground">2</p>
                <p>Active products</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-sm font-medium mb-2">Technical focus</h2>
            <ul className="text-xs text-muted-foreground space-y-1.5">
              <li>AI agents and the MCP ecosystem for real developer workflows.</li>
              <li>Webflow and HubSpot CMS architecture, custom code, and migrations.</li>
              <li>React and TypeScript with Vite, Next.js, and Tauri.</li>
              <li>Local-first tools with SQLite and MCP servers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-medium mb-2">Links</h2>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
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
                  className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <span>{link.label}</span>
                  <ExternalLink className="size-3" />
                </a>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </PageShell>
  );
}

