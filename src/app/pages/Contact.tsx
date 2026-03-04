import { ExternalLink } from "lucide-react";
import { PageHead } from "../components/PageHead";

const contactLinks = [
  {
    label: "LinkedIn",
    value: "linkedin.com/in/felixhellstrom",
    href: "https://linkedin.com/in/felixhellstrom",
    description: "Best for professional connections and project inquiries.",
  },
  {
    label: "GitHub",
    value: "github.com/fellanH",
    href: "https://github.com/fellanH",
    description: "Open source projects and code.",
  },
  {
    label: "X",
    value: "@felixhellstrom",
    href: "https://x.com/felixhellstrom",
    description: "Thoughts on AI, tools, and building.",
  },
  {
    label: "Email",
    value: "felix@klarhimmel.com",
    href: "mailto:felix@klarhimmel.com",
    description: "For detailed project discussions.",
  },
];

export function ContactPage() {
  return (
    <>
      <PageHead
        title="Contact"
        description="Get in touch with Felix Hellström — open to Webflow projects, AI integrations, and interesting collaborations."
        url="/contact"
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
        <h1 className="text-3xl font-semibold mb-4">Contact</h1>
        <p className="text-muted-foreground mb-10 leading-relaxed max-w-lg">
          I'm open to collaborations, Webflow projects, and interesting
          problems. If you're working on something that involves AI tooling or
          need Webflow work done well, reach out.
        </p>

        <div className="space-y-4">
          {contactLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={
                link.href.startsWith("mailto")
                  ? undefined
                  : "noopener noreferrer"
              }
              className="flex items-start justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-colors group"
            >
              <div>
                <div className="text-sm font-medium text-foreground mb-0.5">
                  {link.label}
                </div>
                <div className="text-sm text-primary">{link.value}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {link.description}
                </div>
              </div>
              <ExternalLink className="size-4 text-muted-foreground group-hover:text-foreground transition-colors mt-0.5" />
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
