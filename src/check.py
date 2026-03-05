"""Verify all DB content entries have matching files on disk."""
import sqlite3
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
DB = HERE / "content.db"

if not DB.exists():
    print("  ✗ src/content.db not found — run 'make seed' first")
    sys.exit(1)

conn = sqlite3.connect(DB)
conn.row_factory = sqlite3.Row
ok = True

# Posts → markdown files
for p in conn.execute("SELECT slug FROM posts").fetchall():
    md = ROOT / "content" / "posts" / f'{p["slug"]}.md'
    if md.exists():
        print(f"  ✓ content/posts/{p['slug']}.md")
    else:
        print(f"  ✗ missing content/posts/{p['slug']}.md")
        ok = False

# About bio
about = ROOT / "content" / "about.md"
if about.exists():
    print("  ✓ content/about.md")
else:
    print("  ✗ missing content/about.md")
    ok = False

# Work detail markdown (optional — just report)
for w in conn.execute("SELECT slug FROM case_studies").fetchall():
    md = ROOT / "content" / "work" / f'{w["slug"]}.md'
    if md.exists():
        print(f"  ✓ content/work/{w['slug']}.md")
    else:
        print(f"  · content/work/{w['slug']}.md (not yet — using DB description)")

conn.close()

if not ok:
    sys.exit(1)
print("\n  → all required content files in sync")
