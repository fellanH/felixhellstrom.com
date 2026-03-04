export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  category: "AI Workflows" | "Webflow" | "Building in Public" | "Products";
}

export const posts: Post[] = [
  {
    slug: "building-ai-memory-layer",
    title: "Building an AI Memory Layer with Context Vault",
    date: "2026-03-04",
    description:
      "How I built a persistent memory system for Claude Code that survives across sessions — and why local-first matters.",
    tags: ["ai", "mcp", "context-vault", "claude-code"],
    category: "Products",
  },
];
