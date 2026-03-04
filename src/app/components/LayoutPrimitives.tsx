import { ReactNode } from "react";
import { cn } from "@/components/ui/utils";

type ContainerProps = {
  className?: string;
  children: ReactNode;
};

export function Container({ className, children }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-3xl px-4 sm:px-6", className)}>
      {children}
    </div>
  );
}

type PageShellProps = React.HTMLAttributes<HTMLDivElement>;

export function PageShell({ className, children, ...props }: PageShellProps) {
  return (
    <Container className={cn("py-16", className)} {...props}>
      {children}
    </Container>
  );
}

type PageHeaderProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  className?: string;
};

export function PageHeader({
  title,
  eyebrow,
  description,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("mb-8 space-y-2", className)}>
      {eyebrow ? (
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-3xl font-semibold leading-tight">{title}</h1>
      {description ? (
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
}

