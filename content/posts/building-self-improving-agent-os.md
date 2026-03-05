## The Problem

Every AI session starts cold. No memory of what you built last week. No awareness of the patterns that work, the decisions that were already made, or the friction you hit and solved.

I was managing multiple products, client projects, and side projects across different AI agents. Context was scattered across CLAUDE.md files, random notes, and my own memory. Agents would re-discover the same problems, re-make the same decisions, and miss the same context.

I needed a system where the agents could learn from themselves.

## The Omni Wrapper

The solution started with a single directory: `~/omni/`. Everything lives inside it. Workspaces, projects, an inbox, and an operating system layer. The folder tree IS the agent configuration.

```
~/omni/
  workspaces/
    products/          # Products I'm building
    client-work/       # Client projects
    personal/          # Personal projects
  os/                  # The system itself
  inbox/               # Incoming tasks, triage queue
```

Each workspace contains project repos. The skeleton is git-tracked, but individual project repos are gitignored. This means the structure is version-controlled while the actual code stays in its own repos.

## The 3-Layer Agent System

The agents run in three layers:

**L0: Master orchestrator.** Sets priorities, deploys agents, handles escalations. This is the brain that decides what gets worked on next.

**L1: Workspace orchestrator.** Triages issues within a product ecosystem. If context-vault has 5 open issues, the L1 agent decides the order and assigns work.

**L2: Project agent.** Implements a single issue end-to-end. Opens a PR, runs tests, requests review.

Sequential by default. Parallel only for proven-independent work. I learned the hard way that running 8 concurrent agents thrashes the machine and creates merge conflicts that waste more time than they save.

## Context Vault as Persistent Memory

Instead of duplicating context in markdown files, CLAUDE.md files are thin "boot loaders" that declare vault queries. Context lives once, in the vault, and gets loaded dynamically.

```
# In CLAUDE.md
When starting work, run: context-vault search "project:context-vault"
```

Agents share context across workspaces without reading each other's files. A decision made in one project is visible to agents in another. The vault is the single source of truth.

## The Self-Improving Loop

This is the part that changed everything.

Agents log friction they encounter while doing real work. When an agent hits something slow, confusing, or broken in the system itself, it saves a `friction` entry to the vault. At the end of each session, friction entries get triaged into GitHub issues.

The flow:

1. Agent hits friction while working (slow build, missing context, confusing API)
2. Agent logs it to the vault with an `omni-friction` tag (takes 5 seconds)
3. At checkout, friction entries get reviewed and promoted to issues
4. Those issues get assigned to the same agent system that discovered them
5. The system that finds problems is the same system that fixes them

Infrastructure improvements become emergent, not planned. You discover what needs fixing by doing real work. The system optimizes for low-friction capture in the moment, then structured triage later.

## The First Overnight Run

I let the system run autonomously overnight for the first time on March 1st.

686 cycles over 7.5 hours. 11 PRs merged. 9 flagged for review. 8 stalls that self-healed. 103 dispatches across 54 unique issues.

It was messy. 94% of cycles were idle because there was no adaptive polling. One stuck agent ran for 6 hours unchecked because there was no wall-clock timeout. But the 11 PRs that DID merge were real, tested, production-quality changes.

The system discovered its own problems overnight and logged them as friction entries. The next morning, I triaged those entries into issues. The system is now working on fixing the problems it found in itself.

## What I Learned

**Emergent over planned.** The best infrastructure improvements came from friction logged during real work, not from architecture planning sessions.

**Sequential beats parallel.** For AI agents, doing one thing well is better than doing eight things badly. Parallel execution sounds cool but creates coordination overhead that eats the productivity gains.

**The folder tree is the config.** Instead of complex configuration files, the physical structure of `~/omni/` tells agents where things live and what they should care about.

**Persistent memory changes the game.** Once agents can remember across sessions, they stop being stateless tools and start becoming collaborators that accumulate knowledge over time.

The system is still rough. But it's already improving itself faster than I could improve it manually. That's the whole point.
