import { PageHead } from "../components/PageHead";
import {
  Container,
  PageShell,
  PageHeader,
} from "../components/LayoutPrimitives";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export function StyleguidePage() {
  return (
    <>
      <PageHead
        title="Styleguide"
        description="Design tokens, typography, and UI components used across the site."
        url="/styleguide"
      />
      <PageShell>
        <PageHeader
          title="Styleguide"
          description="Reference for colors, typography, layout primitives, and core UI components."
        />

        <div className="space-y-12">
          <section>
            <h2 className="text-lg font-semibold mb-4">Colors</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Background</CardTitle>
                  <CardDescription>bg-background / text-foreground</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border border-border bg-background text-foreground flex items-center justify-center py-6 text-sm">
                    Background
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Card</CardTitle>
                  <CardDescription>bg-card / text-card-foreground</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border border-border bg-card text-card-foreground flex items-center justify-center py-6 text-sm">
                    Card
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Primary</CardTitle>
                  <CardDescription>bg-primary / text-primary-foreground</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border border-border bg-primary text-primary-foreground flex items-center justify-center py-6 text-sm">
                    Primary
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">Typography</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Heading 1</p>
                <h1>I build things, that ship.</h1>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Heading 2</p>
                <h2>Section heading</h2>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Body</p>
                <p className="text-sm text-muted-foreground">
                  Body copy uses the base font size with comfortable line-height for reading.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">Buttons</h2>
            <div className="flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">Badges</h2>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">Cards</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Card title</CardTitle>
                  <CardDescription>Supporting description for this card.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Use cards for grouped content like projects, posts, and stats.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Meta card</CardTitle>
                  <CardDescription>Example of meta text and tags.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-2">
                    2025 · Case study
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="outline" className="text-xs">
                      React
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Vite
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      MCP
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </PageShell>
    </>
  );
}

