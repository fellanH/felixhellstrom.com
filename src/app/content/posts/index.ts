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
    slug: "eleven-prs-while-i-slept",
    title: "11 PRs While I Slept",
    date: "2026-03-05",
    description:
      "I let an autonomous agent orchestrator run overnight for the first time. 686 cycles, 11 merged PRs, and a lot of lessons about what breaks when no one is watching.",
    tags: ["ai-agents", "automation", "omni-cli", "claude-code"],
    category: "AI Workflows",
  },
  {
    slug: "building-ai-memory-layer",
    title: "Building an AI Memory Layer with Context Vault",
    date: "2026-03-04",
    description:
      "How I built a persistent memory system for Claude Code that survives across sessions, and why local-first matters.",
    tags: ["ai", "mcp", "context-vault", "claude-code"],
    category: "Products",
  },
  {
    slug: "building-self-improving-agent-os",
    title: "Building a Self-Improving Agent OS",
    date: "2026-03-03",
    description:
      "How I built a personal operating system where AI agents log their own friction and write their own backlog. The system improves itself as you use it.",
    tags: ["ai-agents", "omni", "automation", "mcp"],
    category: "Building in Public",
  },
  {
    slug: "using-git-with-ai-agents",
    title: "Using Git with AI Agents in Cursor",
    date: "2025-09-25",
    description:
      "A practical workflow for integrating Git into AI coding sessions. Branches, atomic commits, and intent-driven messages.",
    tags: ["git", "ai-agents", "cursor", "workflow"],
    category: "AI Workflows",
  },
  {
    slug: "webflow-advice-for-beginners",
    title: "After 8 Years of Webflow, Here's My Advice for Beginners",
    date: "2025-02-25",
    description:
      "Three crucial things I wish someone had told me when I first started with Webflow: Relume, Client-First, and REM units.",
    tags: ["webflow", "tips", "client-first", "rem"],
    category: "Webflow",
  },
];
