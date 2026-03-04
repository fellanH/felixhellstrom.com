import { ExternalLink } from "lucide-react";
import { PageShell, PageHeader } from "../LayoutPrimitives";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

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
    value: "fehellstrom@gmail.com",
    href: "mailto:fehellstrom@gmail.com",
    description: "For project discussions and opportunities.",
  },
];

export function ContactMethodsSection() {
  return (
    <PageShell>
      <PageHeader
        title="Contact"
        description="Open to interesting problems. AI tooling, web platforms, and product work. If you're building something and need someone who ships, reach out."
        className="mb-8 max-w-lg"
      />

      <div className="grid gap-4 md:grid-cols-2">
        {contactLinks.map((link) => (
          <Card key={link.href} className="group">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-sm">
                <span>{link.label}</span>
                <ExternalLink className="size-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </CardTitle>
              <CardDescription className="text-xs text-primary">
                {link.value}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <a
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={
                  link.href.startsWith("mailto")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="block text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.description}
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}

