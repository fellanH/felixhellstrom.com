# The Agent-Native Web

_A manifesto for building websites in the age of AI agents._

---

## The problem

The modern web stack is a monument to accidental complexity.

To publish a paragraph of text on the internet in 2025, you need: a JavaScript framework, a CSS framework, a bundler, a package manager, a lockfile, a CMS with an API, an authentication layer, a hosting platform with build pipelines, environment variables, edge functions, and 300MB of `node_modules`.

All of this infrastructure exists to solve two problems:

1. Making it easy for humans to edit content through a GUI
2. Making it fast to deliver that content to a browser

But there's a new actor in the system now. AI agents don't need GUIs. They don't need dashboards, drag-and-drop editors, or WYSIWYG fields. They need **structured data they can read and write directly.**

The entire CMS layer — the admin panels, the REST APIs, the webhooks, the content models with their validation rules and preview URLs — exists to translate between human intent and structured data. An AI agent doesn't need that translation layer. It IS the translation layer.

## The thesis

**If an AI agent is your primary content editor, the optimal web architecture is radically simpler than what the industry currently builds.**

The stack collapses to:

```
SQLite database     ← structured content
Markdown files      ← long-form prose
Python script       ← generates HTML
Static HTML         ← what gets served
```

No framework. No runtime. No build pipeline. No dependencies.

## The principles

### 1. The database is the CMS

SQLite is the perfect content store for agent-edited sites. It's structured (agents can read schemas and write SQL), portable (one file), version-controllable (seed scripts in git), and queryable (no API layer between the agent and the data).

Every CMS dashboard is a GUI wrapper around a database. Remove the GUI, and you're left with the database. That's the point.

### 2. Markdown is the editor

Agents produce markdown as naturally as humans produce speech. It's their native output format for prose. Designing a content layer around markdown means zero friction between agent output and published content.

No JSX. No MDX imports. No component shortcodes. No frontmatter schemas. Just text with formatting.

### 3. Zero dependencies is a feature

Every dependency is:

- A potential build failure
- A security advisory waiting to happen
- A breaking change in the next major version
- A reason `npm install` takes 30 seconds
- A node in a supply chain you don't control

The Python standard library includes everything a static site generator needs: `sqlite3`, `pathlib`, `re`, `html.escape`. The generator for felixhellstrom.com is 651 lines with zero imports beyond stdlib.

A site with no dependencies cannot have a broken build.

### 4. The repository is the product

There is no "build output" directory. The HTML files in the repo are the HTML files that get served. `git push` is the deploy command.

This means:

- You can read the site by reading the repo
- You can debug the site by diffing commits
- You can rollback by reverting a commit
- You can preview by opening an HTML file

The gap between source and output is zero.

### 5. The generator is disposable

The Python script that converts database → HTML is the least important part of the system. It could be rewritten in any language in an afternoon. The valuable artifacts are the database and the markdown files.

This inverts the traditional relationship where the framework is the investment and the content is portable. Here, the content is the investment and the framework is trivially replaceable.

## The workflow

The traditional workflow:

```
Human → CMS dashboard → API → Build pipeline → CDN → Browser
```

The agent-native workflow:

```
Human → Agent → Database + Markdown → Script → HTML → Browser
```

The second pipeline has fewer moving parts, fewer failure modes, and produces faster output. The agent replaces the CMS dashboard, the API, and the build pipeline in a single step.

## The economics

A Next.js site on Vercel with a headless CMS:

- **Build time:** 30-120 seconds
- **Dependencies:** 200-500 packages
- **Cold start:** 100-500ms (serverless)
- **Monthly cost:** $0-20 (can spike)
- **Maintenance:** Weekly dependency updates, occasional breaking changes
- **Failure modes:** Build failures, API timeouts, cache invalidation bugs, hydration mismatches

A static HTML site generated from SQLite:

- **Build time:** <1 second
- **Dependencies:** 0
- **Cold start:** 0ms (static files)
- **Monthly cost:** $0 (any static host)
- **Maintenance:** None
- **Failure modes:** None (it's HTML files)

## Where this doesn't work

This approach is wrong for:

- **Applications** that need client-side interactivity, authentication, or real-time data
- **Teams** where non-technical people need to edit content without developer involvement
- **Scale** where thousands of pages need incremental builds
- **Commerce** where dynamic pricing, inventory, and checkout flows are required

This approach is right for:

- Personal sites and portfolios
- Blogs and content sites
- Documentation sites
- Marketing landing pages
- Any site where the content changes less than daily and the primary editor is an AI agent

## The long-term vision

As AI agents become the default interface for content creation, the layers between intent and output will continue to compress. The CMS dashboard becomes unnecessary. The API layer becomes unnecessary. The framework becomes unnecessary.

What remains is:

- **A content store** (database or files) that agents can read and write
- **A rendering step** (script) that converts content to HTML
- **A delivery layer** (static hosting) that serves the output

This isn't a regression. It's a progression. We added all those layers because humans needed them. Agents don't. Removing them makes the system faster, cheaper, more reliable, and easier to reason about.

The best framework is the one you can delete.

---

_First published March 2026, alongside the rebuild of [felixhellstrom.com](https://felixhellstrom.com)._
_Written by Felix Hellström, with Claude._
