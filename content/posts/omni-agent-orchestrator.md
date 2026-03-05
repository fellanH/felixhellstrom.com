## Overview

In March 2026 I let an autonomous agent system run my GitHub workflow overnight for the first time.

By the time I woke up, it had completed **686 cycles**, opened and merged **11 pull requests**, and self-healed **8 stalls** without me touching the keyboard.

That system is **omni**, a CLI orchestrator I use as a personal operating system for AI agents.

## What omni does

omni is a **3-layer agent orchestrator**:

1. **Master layer** – decides which workspace or project needs attention next.
2. **Workspace layer** – understands a specific codebase, open issues, and local tools.
3. **Project layer** – runs Claude Code agents against a single GitHub issue until it is implemented, tested, and ready to merge.

Instead of treating AI as a one-off assistant, omni treats agents as **long-running workers** with a backlog:

- It reads GitHub issues and converts them into concrete tasks.
- It spins up short-lived Claude Code agents to implement changes in local repos.
- It commits and pushes branches, opens pull requests, and responds to CI feedback.
- It logs failures and friction points back into a vault, so the system can improve over time.

The goal isn’t to replace engineers. The goal is to **give a senior engineer a swarm of reliable, scriptable collaborators**.

## Why I built it this way

Most “AI coding” setups stop at:

> “Open the editor, ask the model to change a file, copy/paste a diff.”

That works for small changes, but it breaks down when you want:

- A queue of GitHub issues that get implemented automatically.
- Agents that can run commands, read lints, and keep state between steps.
- A feedback loop where every failure becomes a future improvement.

omni is my answer to that. It:

- Treats **GitHub issues as the source of truth**.
- Uses **Claude Code agents as workers**, not as a UI gimmick.
- Stores **context and run history in a vault**, so agents can learn from previous attempts.

The result is an OS-like layer that sits between my repos, GitHub, and Claude Code.

## The first overnight run

The first real test for omni was simple:  
_“Run all night and try to close as many issues as you can.”_

Over one night it:

- Ran **686 orchestration cycles** across multiple projects.
- Opened and merged **11 pull requests**.
- Hit **8 stalls** (e.g. flaky tests, ambiguous specs) and recovered from them without manual intervention.

The interesting part wasn’t the raw numbers, it was the **failure modes**:

- Places where the agent got stuck in tool loops.
- Missing lint rules or tests that needed to exist.
- Ambiguous GitHub issues that a human would have rewritten without thinking.

Every one of those became a new constraint for the system. The next night, omni knew a bit more about what “done” looks like.

## How it fits into my work

omni isn’t a SaaS product (yet). It’s a **tool I run locally** as part of a bigger stack:

- `context-vault` provides a **persistent memory layer** for agents.
- This site (felixhellstrom.com) is an **agent-native static site** – SQLite + markdown + a single Python generator.
- omni runs on top of that environment, spinning up agents that can safely edit repos like this one.

If you work with:

- A lot of small issues across multiple repos.
- Repetitive refactors or migrations.
- Documentation and content updates that agents can do faster than humans.

then omni is the kind of system I like to design and implement.

## Work with me

If you’re interested in building:

- **Agent orchestration systems** like omni,
- **MCP-based tools** like context-vault, or
- **Production Webflow / HubSpot CMS setups** that integrate with AI workflows,

you can [get in touch here](/contact/). I work full-time as Technical Lead at Stormfors and take on a small number of projects through my independent practice.

