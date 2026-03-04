import { PageShell } from "../LayoutPrimitives";
import { Button } from "@/components/ui/button";

export function HomeHero() {
  return (
    <PageShell className="pt-20 pb-16">
      <div className="flex flex-col gap-8 md:flex-row md:items-start">
        <div className="flex-1 space-y-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Full-stack developer & AI toolmaker
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
            I build AI tools and web platforms that actually ship.
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
            Technical lead at Stormfors by day, building production Webflow and HubSpot
            platforms. Nights and weekends go into context-vault and AI product experiments.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <a href="#feed">Browse recent work & posts</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/projects">View products</a>
            </Button>
          </div>
        </div>
        <div className="w-full max-w-xs md:max-w-sm md:pt-3">
          <div className="rounded-xl border border-border bg-card p-4 space-y-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Currently
            </p>
            <div className="space-y-1.5 text-sm">
              <p className="font-medium text-foreground">
                Technical Lead @{" "}
                <a
                  href="https://stormfors.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  Stormfors
                </a>
              </p>
              <p className="text-muted-foreground">
                Leading delivery across 10+ client projects. Architecture, integrations,
                and shipping constraints.
              </p>
            </div>
            <div className="space-y-1.5 text-sm">
              <p className="font-medium text-foreground">Building on the side</p>
              <p className="text-muted-foreground">
                <a
                  href="https://context-vault.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  context-vault
                </a>{" "}
                (MCP memory layer) and{" "}
                <a
                  href="https://trained-on.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  trained-on.com
                </a>{" "}
                (AI product photos).
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

