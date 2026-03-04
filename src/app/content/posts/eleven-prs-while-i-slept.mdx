## The Setup

I've been building an autonomous agent orchestrator called omni-cli. It manages AI coding agents, assigns them issues from a backlog, and handles the full lifecycle: dispatch, implementation, PR creation, review, and merge.

On the night of March 1st, I let it run unsupervised for the first time. I went to sleep. Here's what happened.

## The Numbers

Over 7.5 hours, the system ran 686 cycles. It dispatched 103 tasks across 54 unique issues. 11 pull requests were merged automatically. 9 were flagged for manual review. 8 stalls were detected and self-healed.

And 94.5% of cycles were idle.

Let that sink in. The system was doing meaningful work for 5.5% of its runtime, and that 5.5% produced 11 production-quality PRs that I woke up to find merged.

## What Went Right

**The dispatch loop worked.** The orchestrator pulled issues from the backlog, assigned them to agents, and let them work. When an agent finished, it moved to the next issue. No manual intervention needed.

**Self-healing worked.** 8 times, an agent stalled (usually waiting on a network request or stuck in a test loop). The system detected the stall, killed the agent, and re-dispatched the issue. All 8 eventually completed.

**The PRs were real.** These weren't formatting changes or README updates. They included dependency upgrades, bug fixes, feature implementations, and test additions. Each one passed the test suite before merge.

## What Went Wrong

**94% idle time.** The biggest problem was the polling interval. The system checked for available work every N seconds with a fixed interval. When the backlog ran dry, it just kept polling an empty queue. No adaptive backoff, no backlog replenishment.

**No wall-clock timeout.** One stuck agent ran for 6+ hours before the cycle ended naturally. That's an entire night wasted on one task that should have been killed after 30 minutes.

**Duplicate dispatches.** 103 dispatches for 54 unique issues means some issues were dispatched twice. The deduplication logic had a race condition where two cycles could grab the same issue if they started within the same polling window.

**No quality gates.** PRs were auto-merged after passing tests. No diff size limits, no post-merge CI check, no human review requirement for changes above a certain complexity threshold. For a first run, I got lucky. I need guardrails before the next one.

**Destructive restarts.** When the system reconciled state on startup, it killed all running agents. This meant any in-flight work was lost. A graceful reconciliation that preserves running agents would have saved several dispatch cycles.

## The Architecture

The system runs three layers:

**The scheduler** pulls from a GitHub issue backlog, prioritizes by labels, and assigns to available agent slots.

**The agents** are Claude Code instances running in tmux panes. Each gets a single issue, a workspace checkout, and a set of instructions. They implement the change, run tests, and open a PR.

**The supervisor** monitors agent health by checking tmux pane output for status indicators. When it detects a stall (no output change for N minutes), it kills and re-dispatches.

The weakest part is the tmux-based health detection. Parsing terminal output with regex to determine if an agent is working or stuck is fragile. The next version will use structured status files that agents write to directly.

## What's Next

The priority list is clear:

1. **Adaptive polling.** Back off when the queue is empty, ramp up when new issues arrive.
2. **Wall-clock timeout.** Kill any agent that's been running longer than 30 minutes on a single issue.
3. **Dispatch deduplication.** Lock issues before dispatch to prevent double-assignment.
4. **Post-merge CI.** Run the full test suite after merge, not just before.
5. **Graceful reconciliation.** On restart, check for running agents before killing everything.

The goal is to get idle time under 20% and merged PRs above 20 per overnight run. If the system can reliably produce 20+ quality PRs while I sleep, the economics of solo development change completely.

## The Takeaway

11 PRs while I slept. It's a proof of concept, not a production system. The failure modes are obvious and the efficiency is terrible. But the core loop works: assign issue, implement, test, merge, repeat.

The interesting part isn't the number. It's that the system found its own problems and logged them. The friction entries from the overnight run became the issues that the system is now working on fixing. It's debugging itself.

That's the loop I was trying to build. It works.
