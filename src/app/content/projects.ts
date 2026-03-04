export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  url?: string;
  github?: string;
  npm?: string;
  status: "active" | "building" | "concept";
  stats?: string;
}

export const projects: Project[] = [
  {
    slug: "context-vault",
    title: "context-vault",
    description:
      "Persistent memory for AI agents. Local-first MCP server that gives Claude Code and other AI tools a semantic memory layer that survives across sessions. Published on npm, 693+ tests, full SaaS ecosystem.",
    tags: ["MCP", "SQLite", "TypeScript", "Claude Code", "Embeddings"],
    url: "https://context-vault.com",
    github: "https://github.com/fellanH/context-vault",
    npm: "https://www.npmjs.com/package/context-vault",
    status: "active",
    stats: "693+ tests, npm published, SaaS + self-hosted",
  },
  {
    slug: "omni",
    title: "omni-cli",
    description:
      "Autonomous agent orchestrator. 3-layer system (master, workspace, project) that dispatches Claude Code agents to implement GitHub issues end-to-end. First overnight run: 686 cycles, 11 PRs merged, 8 self-healed stalls.",
    tags: ["Claude Code", "Automation", "TypeScript", "GitHub API"],
    status: "active",
    stats: "6,700+ lines, 11 PRs merged overnight",
  },
  {
    slug: "trained-on",
    title: "trained-on.com",
    description:
      "Self-serve platform for e-commerce store owners to generate professional product photography with custom-trained AI models. Stripe billing, Supabase auth, FAL.ai inference.",
    tags: ["Next.js", "Stripe", "Supabase", "FAL.ai", "AI"],
    status: "building",
  },
  {
    slug: "origin",
    title: "origin",
    description:
      "Keyboard-driven split-panel desktop workspace. Tauri 2 app with hot-reload plugins, canvas layouts, and a motion system. Rust backend, React frontend.",
    tags: ["Tauri", "React", "Rust", "TypeScript"],
    github: "https://github.com/fellanH/origin",
    status: "building",
  },
  {
    slug: "we-know-aeo",
    title: "We Know AEO",
    description:
      "Research site exploring AI Engine Optimization. How to structure content so AI search engines (ChatGPT, Perplexity, Claude) surface your brand. Full Schema.org markup.",
    tags: ["Next.js", "AEO", "Schema.org", "SEO"],
    url: "https://weknowaeo.com",
    status: "active",
  },
];
