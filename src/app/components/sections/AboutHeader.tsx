import { PageShell, PageHeader } from "../LayoutPrimitives";

export function AboutHeaderSection() {
  return (
    <PageShell className="pb-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <img
          src="/images/felix-hero.jpeg"
          alt="Felix Hellström"
          className="size-24 sm:size-28 rounded-full object-cover ring-2 ring-border"
        />
        <div className="flex-1">
          <PageHeader
            title="About"
            description="Full-stack developer and technical lead shipping AI tools and web platforms."
            className="mb-0"
          />
          <p className="text-xs text-muted-foreground mt-3">
            Based in Sweden. 10+ years of client work across Webflow, HubSpot CMS, and
            custom integrations.
          </p>
        </div>
      </div>
    </PageShell>
  );
}

