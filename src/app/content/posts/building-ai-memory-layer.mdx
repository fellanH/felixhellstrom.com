## The Problem

Every time you start a new AI session, the agent starts from scratch. No memory of what you built last week, the decisions you made, the patterns that work for your codebase.

I was running into this constantly. I'd spend 20 minutes at the start of each Claude Code session re-explaining context that I'd already explained a dozen times. Project structure, conventions, decisions, open questions. All of it had to be re-loaded manually, every single time.

The usual workaround is `CLAUDE.md` files. You dump your context there and the agent reads it on startup. It works, but it doesn't scale. The files get bloated. You forget to update them. You end up with stale context that actively misleads the agent.

## What I Wanted

A memory layer that:

- **Persists across sessions.** The agent remembers what I told it last week.
- **Is local-first.** My context stays on my machine, not in some cloud service.
- **Works with MCP.** Native integration with Claude Code, Cursor, and any MCP-compatible client.
- **Has structure.** Not just a bag of text, but typed entries with lifecycle tiers, tags, and conflict detection.

## How context-vault Works

context-vault is an MCP server that sits between your AI clients and a local SQLite database. You store context entries (decisions, patterns, project briefs, anything) and the agent retrieves them semantically when they're relevant.

The core concepts:

**Lifecycle tiers.** Entries can be `session` (current work), `project` (stable patterns), or `durable` (long-term knowledge). This prevents the memory from growing forever with stale data.

**Semantic retrieval.** Instead of loading everything into context, the agent queries for what's relevant using embeddings. This keeps prompts lean and costs down.

**Conflict detection.** If you store a new decision that contradicts an existing one, the system flags it. No more stale context silently misleading the agent.

**Buckets.** Isolated namespaces for different projects or contexts. Your work project context doesn't bleed into your side project.

## Building It

The first version came together in a few days. TypeScript, SQLite via better-sqlite3, and a lightweight embedding model for semantic search, all running locally.

The trickiest part was conflict detection. I ended up using embedding similarity plus domain-specific heuristics. If two entries share tags and similar content, flag them for review.

The second trickiest part was the MCP protocol itself. The spec is solid but the ergonomics around tool definitions and error handling took iteration.

The test suite hit 693 passing tests. When you're building a memory layer that agents depend on, you don't want silent data loss.

## How I Use It

I run context-vault inside my daily development workflow. Every time I make a decision, learn something, or establish a pattern, it goes into the vault. The agent picks it up in the next session automatically.

Some concrete examples from my vault:

- **Project briefs.** What each project does, its stack, its conventions.
- **Decisions.** "We chose X over Y because Z" so the agent doesn't re-propose Y.
- **Insights.** Patterns I notice across projects that are worth remembering.
- **Contacts.** Who I'm working with and their context.

The result: I spend near-zero time on context setup per session. The agent just knows.

## What's Next

context-vault is published on npm and I'm using it every day. The roadmap:

- Cloud sync for multi-device setups (while keeping local-first as the default)
- A web UI for browsing and editing the vault
- Better integrations as the MCP ecosystem matures

If you're hitting the same wall, re-explaining context to your AI tools every session, try it:

```bash
npx context-vault init
```

The repo is at [github.com/fellanH/context-vault](https://github.com/fellanH/context-vault) and the docs are at [context-vault.com](https://context-vault.com).
