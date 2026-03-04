import type { ComponentPropsWithoutRef } from "react";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type PreProps = ComponentPropsWithoutRef<"pre">;
type CodeProps = ComponentPropsWithoutRef<"code">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;

export const components = {
  h1: (props: HeadingProps) => (
    <h1
      className="text-3xl font-semibold leading-tight mt-8 mb-4 first:mt-0"
      {...props}
    />
  ),
  h2: (props: HeadingProps) => (
    <h2 className="text-2xl font-semibold leading-snug mt-8 mb-3" {...props} />
  ),
  h3: (props: HeadingProps) => (
    <h3 className="text-xl font-semibold leading-snug mt-6 mb-2" {...props} />
  ),
  h4: (props: HeadingProps) => (
    <h4
      className="text-base font-semibold leading-normal mt-5 mb-2"
      {...props}
    />
  ),
  p: (props: ParagraphProps) => (
    <p className="leading-relaxed mb-5 text-foreground" {...props} />
  ),
  a: (props: AnchorProps) => (
    <a
      className="text-primary underline underline-offset-2 hover:opacity-80 transition-opacity"
      {...props}
    />
  ),
  pre: (props: PreProps) => (
    <pre
      className="bg-card border border-border rounded-lg px-5 py-4 overflow-x-auto mb-5 text-sm leading-relaxed"
      {...props}
    />
  ),
  code: (props: CodeProps) => (
    <code
      className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded"
      {...props}
    />
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="border-l-2 border-border pl-4 text-muted-foreground italic mb-5"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul className="list-disc pl-6 mb-5 space-y-1.5" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="list-decimal pl-6 mb-5 space-y-1.5" {...props} />
  ),
  li: (props: ListItemProps) => <li className="leading-relaxed" {...props} />,
};
