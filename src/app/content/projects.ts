export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  url?: string;
  github?: string;
  status: "active" | "building" | "concept";
}

export const projects: Project[] = [
  {
    slug: "context-vault",
    title: "context-vault",
    description:
      "Persistent memory for AI agents. Local-first MCP server that gives Claude Code and other AI tools a semantic memory layer that survives across sessions.",
    tags: ["MCP", "SQLite", "TypeScript", "Claude Code"],
    url: "https://context-vault.com",
    github: "https://github.com/fellanH/context-vault",
    status: "active",
  },
  {
    slug: "trained-on",
    title: "trained-on.com",
    description:
      "AI model training data marketplace. Upload datasets, license them, and get paid when AI companies use your data for training.",
    tags: ["Next.js", "Stripe", "Supabase", "AI"],
    status: "building",
  },
  {
    slug: "origin",
    title: "origin",
    description:
      "Plugin-based AI SDK for building custom agent pipelines. Compose agents, tools, and workflows with a declarative configuration approach.",
    tags: ["TypeScript", "Claude API", "SDK"],
    status: "building",
  },
  {
    slug: "omni",
    title: "omni toolkit",
    description:
      "Personal operating system — daily routines, vault, inbox triage, all wired into Claude Code. The system I use to run my life and work.",
    tags: ["Claude Code", "MCP", "TypeScript", "SQLite"],
    status: "active",
  },
];
