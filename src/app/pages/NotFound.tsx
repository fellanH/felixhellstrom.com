import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { PageHead } from "../components/PageHead";

export function NotFoundPage() {
  return (
    <>
      <PageHead title="404" description="Page not found." />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-32 text-center">
        <h1 className="text-6xl font-semibold mb-4">404</h1>
        <p className="text-muted-foreground mb-8">This page doesn't exist.</p>
        <Button asChild>
          <Link to="/">Go home</Link>
        </Button>
      </div>
    </>
  );
}
