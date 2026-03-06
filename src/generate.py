"""
felixhellstrom.com static site generator

Zero-dependency static site generator. Python 3.10+ stdlib only.
Paths are derived from __file__ — rename folders freely.

Usage:  python src/generate.py
"""

import re
import shutil
import sqlite3
import json
from copy import deepcopy
from datetime import datetime
from html import escape
from pathlib import Path

# ── paths ────────────────────────────────────────────────────────────────
# Derived from the script's own location so folder renames just work.
# Only CONTENT needs updating if you rename the content folder.

HERE = Path(__file__).resolve().parent        # this folder (src/)
ROOT = HERE.parent                            # repo root
CONTENT = ROOT / "content"                    # ← change this if you rename content/
DIST = ROOT / "dist"

# Everything below is derived — no edits needed.
DB_PATH = HERE / "content.db"
POSTS_DIR = CONTENT / "posts"
WORK_DIR = CONTENT / "work"
STATIC_FILES = [HERE / "robots.txt", CONTENT / "normalize.css", CONTENT / "style.css"]
STATIC_DIRS = [CONTENT / "images"]
TEMPLATES = HERE / "templates"

# ── site ─────────────────────────────────────────────────────────────────

SITE_URL = "https://felixhellstrom.com"
SITE_NAME = "Felix Hellström"
SITE_DESC = "Building AI agent tools and writing about what works. MCP, multi-agent orchestration, and the agent-native stack."


# ── database ─────────────────────────────────────────────────────────────

def db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def q(query: str, params: tuple = ()) -> list[sqlite3.Row]:
    conn = db()
    try:
        return conn.execute(query, params).fetchall()
    finally:
        conn.close()


# ── markdown → html (zero deps) ─────────────────────────────────────────

def md(text: str) -> str:
    """Convert markdown to HTML. Handles the basics."""
    lines = text.split("\n")
    html_parts: list[str] = []
    i = 0

    while i < len(lines):
        line = lines[i]

        # Fenced code blocks
        if line.strip().startswith("```"):
            lang = line.strip().removeprefix("```").strip()
            code_lines = []
            i += 1
            while i < len(lines) and not lines[i].strip().startswith("```"):
                code_lines.append(e(lines[i]))
                i += 1
            i += 1  # skip closing ```
            html_parts.append(f'<pre><code>{chr(10).join(code_lines)}</code></pre>')
            continue

        # Headings
        if m := re.match(r"^(#{1,4})\s+(.+)$", line):
            level = len(m.group(1))
            html_parts.append(f"<h{level}>{inline(m.group(2))}</h{level}>")
            i += 1
            continue

        # Blank line
        if not line.strip():
            i += 1
            continue

        # Unordered list
        if re.match(r"^[-*]\s+", line):
            items = []
            while i < len(lines) and re.match(r"^[-*]\s+", lines[i]):
                items.append(f"<li>{inline(lines[i].lstrip('-* '))}</li>")
                i += 1
            html_parts.append(f'<ul>{"".join(items)}</ul>')
            continue

        # Ordered list
        if re.match(r"^\d+\.\s+", line):
            items = []
            while i < len(lines) and re.match(r"^\d+\.\s+", lines[i]):
                items.append(f"<li>{inline(re.sub(r'^\d+\.\s+', '', lines[i]))}</li>")
                i += 1
            html_parts.append(f'<ol>{"".join(items)}</ol>')
            continue

        # Blockquote
        if line.startswith(">"):
            bq_lines = []
            while i < len(lines) and lines[i].startswith(">"):
                bq_lines.append(lines[i].lstrip("> "))
                i += 1
            html_parts.append(f"<blockquote><p>{inline(' '.join(bq_lines))}</p></blockquote>")
            continue

        # Paragraph — collect consecutive non-blank, non-special lines
        para_lines = []
        while i < len(lines) and lines[i].strip() and not re.match(r"^(#{1,4}\s|[-*]\s|\d+\.\s|>|```)", lines[i]):
            para_lines.append(lines[i])
            i += 1
        if para_lines:
            html_parts.append(f"<p>{inline(' '.join(para_lines))}</p>")

    return "\n".join(html_parts)


def inline(text: str) -> str:
    """Process inline markdown: bold, italic, code, links."""
    # Inline code (before other processing to avoid conflicts)
    text = re.sub(r"`([^`]+)`", r"<code>\1</code>", text)
    # Bold
    text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
    # Italic (single *)
    text = re.sub(r"(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)", r"<em>\1</em>", text)
    # Italic (single _)
    text = re.sub(r"(?<!_)_(?!_)(.+?)(?<!_)_(?!_)", r"<em>\1</em>", text)
    # Links
    text = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r'<a href="\2">\1</a>', text)
    return text


# ── html helpers ─────────────────────────────────────────────────────────

def e(text: str) -> str:
    return escape(str(text)) if text else ""


def read_template(name: str) -> str:
    """Read a template file from src/templates/."""
    path = TEMPLATES / name
    return path.read_text(encoding="utf-8")


def hero_component(
    title: str,
    subtitle: str,
    primary_href: str,
    primary_label: str,
    secondary_href: str,
    secondary_label: str,
    wrap: bool = False,
    section_name: str = "home-hero",
    section_padding: str = "large",
    section_container: str = "large",
) -> str:
    """Reusable hero section component rendered from template."""
    tpl = read_template("hero.html")
    inner = tpl.format(
        title=e(title),
        subtitle=e(subtitle),
        primary_href=primary_href,
        primary_label=e(primary_label),
        secondary_href=secondary_href,
        secondary_label=e(secondary_label),
    )
    if wrap:
        return section(section_name, inner, padding=section_padding, container=section_container)
    return inner


def stats_component(
    stats: list[sqlite3.Row],
    extra_items: list[tuple[str, str]] | None = None,
) -> str:
    """Reusable stats grid component."""
    items: list[tuple[str, str]] = [(e(s["value"]), e(s["label"])) for s in stats]
    if extra_items:
        items.extend((e(v), e(l)) for v, l in extra_items)

    html = '    <div class="grid-stats">\n'
    for value, label in items:
        html += f'      <div><div class="stat-value">{value}</div><div class="stat-label">{label}</div></div>\n'
    html += "    </div>\n"
    return html


def section_block(
    name: str,
    modules: list[str],
    padding: str = "large",
    container: str = "large",
) -> str:
    """Reusable section wrapper that composes multiple modules."""
    content = "\n".join(modules)
    return section(name, content, padding=padding, container=container)


NAV_LINKS = [
    ("/", "Home"),
    ("/learn/", "Learn"),
    ("/projects/", "Projects"),
    ("/work/", "Work"),
    ("/about/", "About"),
    ("/contact/", "Contact"),
]


def nav_html(active: str) -> str:
    links = []
    mobile_links = []
    for href, label in NAV_LINKS:
        if label == "Contact":
            continue  # rendered separately as CTA
        attr = ' aria-current="page"' if label.lower() == active.lower() else ""
        links.append(f'<a href="{href}"{attr}>{label}</a>')
        mobile_links.append(f'<a href="{href}"{attr}>{label}</a>')
    # Add Contact to mobile menu too
    contact_attr = ' aria-current="page"' if active.lower() == "contact" else ""
    mobile_links.append(f'<a href="/contact/"{contact_attr}>Contact</a>')
    links_html = '<div class="nav-links">' + "".join(links) + "</div>"
    mobile_html = '<div class="mobile-menu" id="mobile-menu">' + "".join(mobile_links) + "</div>"
    toggle = '<button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode" title="Toggle dark mode">&#9790;</button>'
    burger = '<button class="nav-burger" id="nav-burger" aria-label="Open menu" title="Menu">&#9776;</button>'
    cta = '<a href="/contact/" class="nav-cta">Contact</a>'
    return (
        '<nav><div class="nav-inner">'
        f'<a href="/" class="nav-wordmark">{SITE_NAME}</a>'
        f'{links_html}'
        f'<div class="nav-actions">{toggle}{cta}{burger}</div>'
        '</div></nav>'
        f'{mobile_html}'
    )


THEME_INIT = f"""<script>
{read_template("theme-init.js")}
</script>"""

THEME_TOGGLE = f"""<script>
{read_template("theme-toggle.js")}
</script>"""

MOBILE_MENU = f"""<script>
{read_template("mobile-menu.js")}
</script>"""


def schema_json_ld(data: dict) -> str:
    """Render a JSON-LD script tag for structured data."""
    import json
    return f'<script type="application/ld+json">{json.dumps(data, ensure_ascii=False)}</script>'


PERSON_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Felix Hellström",
    "url": SITE_URL,
    "image": f"{SITE_URL}/images/felix-hero.jpeg",
    "jobTitle": "Full-Stack Developer & Technical Lead",
    "worksFor": {"@type": "Organization", "name": "Stormfors"},
    "sameAs": [
        "https://github.com/fellanH",
        "https://linkedin.com/in/felixhellstrom",
        "https://x.com/felixhellstrom",
        "https://www.npmjs.com/~fellanh",
    ],
    "knowsAbout": ["MCP", "AI Agents", "Claude Code", "SQLite", "Webflow", "TypeScript", "Python"],
}


def shell(title: str, active: str, body: str, description: str = "", path: str = "/", extra_schema: str = "") -> str:
    desc = description or SITE_DESC
    canonical = f"{SITE_URL}{path}"
    person_ld = schema_json_ld(PERSON_SCHEMA) if path == "/" or path == "/about/" else ""
    template = read_template("page-shell.html")
    return template.format(
        title=e(title),
        desc=e(desc),
        canonical=canonical,
        og_title=e(title),
        og_desc=e(desc),
        og_url=canonical,
        site_name=SITE_NAME,
        site_url=SITE_URL,
        year=datetime.now().year,
        theme_init=THEME_INIT,
        theme_toggle=THEME_TOGGLE,
        mobile_menu=MOBILE_MENU,
        nav=nav_html(active),
        body=body,
        person_ld=person_ld,
        extra_schema=extra_schema,
    )


def write_page(path: str, html: str) -> None:
    out = DIST / path
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(html, encoding="utf-8")


def tags_html(tags: list[str]) -> str:
    if not tags:
        return ""
    return '<div class="tags">' + "".join(f'<span class="tag">{e(t)}</span>' for t in tags) + "</div>"


def get_tags(table: str, fk: str, id_val: int) -> list[str]:
    return [r["tag"] for r in q(f"SELECT tag FROM {table} WHERE {fk} = ?", (id_val,))]


# ── Client First primitives ─────────────────────────────────────────────

def section(name: str, module: str, padding: str = "large", container: str = "medium") -> str:
    tpl = read_template("section.html")
    return tpl.format(
        name=name,
        height=padding,
        width=container,
        module=module,
    )


def heading(text: str, tag: str = "h2", cls: str = "") -> str:
    attr = f' class="{cls}"' if cls else ""
    return f"<{tag}{attr}>{text}</{tag}>"


def text(content: str, cls: str = "") -> str:
    attr = f' class="{cls}"' if cls else ""
    return f"<p{attr}>{content}</p>"


def spacer(size: str = "medium") -> str:
    return f'<div class="spacer-{size}"></div>'


def image(src: str, alt: str = "", cls: str = "media-full") -> str:
    return f'<img src="{e(src)}" alt="{e(alt)}" class="{cls}" />'


def video_el(src: str, cls: str = "media-full") -> str:
    return f'<video src="{e(src)}" autoplay muted loop playsinline class="{cls}"></video>'


def card(content: str, cls: str = "") -> str:
    classes = f'card {cls}'.strip() if cls else "card"
    return f'<div class="{classes}">{content}</div>'


def card_clickable(href: str, content: str, cls: str = "", external: bool = False) -> str:
    """Card that is clickable as a whole, via an overlay link."""
    classes = f'card card-link {cls}'.strip()
    target = ' target="_blank" rel="noopener"' if external else ""
    return (
        f'<div class="{classes}">'
        f'<a href="{e(href)}"{target} class="card-link-overlay" aria-hidden="true" tabindex="-1"></a>'
        f"{content}"
        "</div>"
    )


# ── module registry & core generators ────────────────────────────────────

MODULE_RENDERERS: dict[str, callable] = {}


def register_module(name: str):
    """Decorator to register a module renderer."""

    def decorator(fn):
        MODULE_RENDERERS[name] = fn
        return fn

    return decorator


@register_module("hero")
def module_hero(props: dict, ctx: dict) -> str:
    return hero_component(
        title=props["title"],
        subtitle=props["subtitle"],
        primary_href=props["primary_href"],
        primary_label=props["primary_label"],
        secondary_href=props["secondary_href"],
        secondary_label=props["secondary_label"],
    )


@register_module("stats")
def module_stats(props: dict, ctx: dict) -> str:
    stats = ctx.get("stats", [])
    extra_items = props.get("extra_items", [])
    return stats_component(stats, extra_items=extra_items)


@register_module("homeFeed")
def module_home_feed(props: dict, ctx: dict) -> str:
    items = ctx.get("items", [])
    return build_home_feed(items)


@register_module("postList")
def module_post_list(props: dict, ctx: dict) -> str:
    return post_list_module(props)


@register_module("workGrid")
def module_work_grid(props: dict, ctx: dict) -> str:
    """Grid of client work/case studies."""
    title = props.get("title", "Work")
    subtitle = props.get(
        "subtitle",
        "Client projects and case studies. Webflow, HubSpot CMS, custom integrations.",
    )
    studies = q(
        "SELECT id, slug, title, client, description, year, image, video, url, hide_image "
        "FROM case_studies ORDER BY year DESC, title"
    )

    b = f'    {heading(title, tag="h1")}\n'
    if subtitle:
        b += f'    <p class="subtitle">{e(subtitle)}</p>\n'
    b += '    <div class="grid grid-2">\n'
    for w in studies:
        tg = get_tags("case_study_tags", "case_study_id", w["id"])
        b += f"    {work_card(w, tg)}\n"
    b += "    </div>\n"
    return b


@register_module("projectGrid")
def module_project_grid(props: dict, ctx: dict) -> str:
    """Grid of projects/products."""
    title = props.get("title", "Projects")
    subtitle = props.get(
        "subtitle",
        "Open source tools, products, and experiments. Built with AI agents, for AI agents.",
    )
    projects = q(
        "SELECT id, slug, title, description, status, url, github, npm, stats "
        "FROM projects ORDER BY status, title"
    )

    b = f'    {heading(title, tag="h1")}\n'
    if subtitle:
        b += f'    <p class="subtitle">{e(subtitle)}</p>\n'
    b += '    <div class="grid grid-2">\n'
    for pr in projects:
        tg = get_tags("project_tags", "project_id", pr["id"])
        b += f"    {project_card(pr, tg)}\n"
    b += "    </div>\n"
    return b


@register_module("pillarGrid")
def module_pillar_grid(props: dict, ctx: dict) -> str:
    """Learn hub: pillars grid + optional latest articles."""
    title = props.get("title", "Learn")
    subtitle = props.get(
        "subtitle",
        "Deep dives into AI agent workflows, MCP development, and the agent-native stack. "
        "Written from production experience, not theory.",
    )
    show_latest = props.get("show_latest", True)
    latest_limit = int(props.get("latest_limit", 6))

    b = f'    {heading(title, tag="h1")}\n'
    if subtitle:
        b += f'    <p class="subtitle">{e(subtitle)}</p>\n'

    b += '    <div class="pillar-grid">\n'
    for p in PILLARS:
        b += (
            f'      <a href="/learn/{p["slug"]}/" class="pillar-card">\n'
            f'        <p class="pillar-label">{e(p["label"])}</p>\n'
            f'        <h3>{e(p["title"])}</h3>\n'
            f'        <p>{e(p["description"])}</p>\n'
            f'        <p class="pillar-topics">{e(p["topics"])}</p>\n'
            f"      </a>\n"
        )
    b += "    </div>\n"

    if show_latest:
        all_pillar_tags: set[str] = set()
        for p in PILLARS:
            all_pillar_tags.update(p["post_tags"])

        if all_pillar_tags:
            placeholders = ",".join("?" for _ in all_pillar_tags)
            recent = q(
                "SELECT DISTINCT p.id, p.slug, p.title, p.date, p.description, p.category "
                "FROM posts p JOIN post_tags pt ON p.id = pt.post_id "
                f"WHERE pt.tag IN ({placeholders}) ORDER BY p.date DESC LIMIT ?",
                (*all_pillar_tags, latest_limit),
            )
            if recent:
                b += f"\n    {heading('Latest Articles')}\n"
                for r in recent:
                    tg = get_tags("post_tags", "post_id", r["id"])
                    b += f"    {post_card(r, tg)}\n"

    return b


@register_module("markdown")
def module_markdown(props: dict, ctx: dict) -> str:
    """Render markdown from a file in content/ or from inline text."""
    cls = props.get("class", "prose")

    text: str | None = None
    if "file" in props:
        md_path = CONTENT / props["file"]
        if md_path.exists():
            text = md_path.read_text(encoding="utf-8")
    elif "text" in props:
        text = props["text"]

    if not text:
        return ""
    return f'<div class="{cls}">\n{md(text)}\n</div>'


@register_module("cardList")
def module_card_list(props: dict, ctx: dict) -> str:
    """Render a list or grid of generic cards from JSON props."""
    layout = props.get("layout", "grid-2")  # maps to CSS grid-2 etc
    items = props.get("items", [])

    wrapper_cls = props.get("wrapper_class")
    if wrapper_cls:
        b = f'<div class="{wrapper_cls}">\n'
    else:
        b = ""

    grid_open = f'    <div class="grid {layout}">\n' if layout else '    <div class="card-list">\n'
    b += grid_open

    for item in items:
        label = item.get("label")
        title = item.get("title")
        body = item.get("body", "")
        meta = item.get("meta", "")
        href = item.get("href")
        external = bool(item.get("external", False))

        parts: list[str] = []
        if label:
            parts.append(f'<p class="label">{e(label)}</p>')
        if title:
            parts.append(f"<h3>{e(title)}</h3>")
        if body:
            parts.append(f'<p class="meta">{e(body)}</p>')
        if meta:
            parts.append(f'<p class="meta">{e(meta)}</p>')

        inner = "".join(parts)
        if href:
            card_html = card_clickable(href, inner, external=external)
        else:
            card_html = card(inner)
        b += f"      {card_html}\n"

    b += "    </div>\n"
    if wrapper_cls:
        b += "</div>\n"
    return b


@register_module("testimonialList")
def module_testimonial_list(props: dict, ctx: dict) -> str:
    """Render a list of testimonials using testimonial_card."""
    title = props.get("title")
    limit = props.get("limit")

    sql = "SELECT name, role, quote, image, linkedin FROM testimonials"
    params: tuple = ()
    if limit:
        sql += " LIMIT ?"
        params = (int(limit),)
    testimonials = q(sql, params)

    b = ""
    if title:
        b += f"    {heading(title)}\n"
    for t in testimonials:
        b += f"    {testimonial_card(t)}\n"
    return b


@register_module("blogPost")
def module_blog_post(props: dict, ctx: dict) -> str:
    """Module body for a single blog post, used by collection template."""
    row: sqlite3.Row = ctx["row"]
    slug = row["slug"]
    md_file = POSTS_DIR / f"{slug}.md"

    if md_file.exists():
        body_html = md(md_file.read_text(encoding="utf-8"))
    else:
        body_html = f"<p>{e(row['description'])}</p>"

    tags = get_tags("post_tags", "post_id", row["id"])

    b = f"""
    <a href="/blog/" class="back">← All posts</a>
    <article>
      <p class="meta">{e(row["date"])} · {e(row["category"])}</p>
      {heading(e(row["title"]), tag="h1")}
      {tags_html(tags)}
      <div class="prose">
{body_html}
      </div>
    </article>\n"""
    return b


@register_module("workDetail")
def module_work_detail(props: dict, ctx: dict) -> str:
    """Module body for a single work case study detail page."""
    row: sqlite3.Row = ctx["row"]
    tags = get_tags("case_study_tags", "case_study_id", row["id"])

    b = f"""
    <a href="/work/" class="back">← All work</a>
    <article>
      <p class="meta">{e(row["client"])} · {e(row["year"])}</p>
      {heading(e(row["title"]), tag="h1")}
      {tags_html(tags)}
"""
    # Hero media
    if row["video"] and not row["hide_image"]:
        b += f'      {video_el(row["video"])}\n'
    elif row["image"] and not row["hide_image"]:
        b += f'      {image(row["image"], alt=row["title"])}\n'

    # Body: markdown file or DB description fallback
    md_file = WORK_DIR / f'{row["slug"]}.md'
    if md_file.exists():
        body_html = md(md_file.read_text(encoding="utf-8"))
    else:
        body_html = f'<p>{e(row["description"])}</p>'

    b += f'      <div class="prose">{body_html}</div>\n'

    # Visit link
    if row["url"]:
        b += f'      <p><a href="{e(row["url"])}" target="_blank" rel="noopener">Visit live site ↗</a></p>\n'

    b += "    </article>\n"
    return b


def build_home_context() -> dict:
    """Context (data) used by home page modules."""
    stats = q("SELECT value, label FROM feed_items WHERE type = 'stat' ORDER BY position")

    # Query ALL content directly from source tables
    all_posts = q("SELECT id, slug, title, date, description, category FROM posts ORDER BY date DESC")
    all_case_studies = q(
        "SELECT id, slug, title, client, description, year, image, video, url, hide_image, featured "
        "FROM case_studies ORDER BY year DESC, title"
    )
    all_projects = q("SELECT id, slug, title, description, status, url, github, npm, stats FROM projects")
    all_testimonials = q("SELECT id, name, role, quote, image, linkedin FROM testimonials")

    # Build unified list with sort keys: (sort_key, type, rendered_html)
    items: list[tuple[int, str, str]] = []

    for p in all_posts:
        tg = get_tags("post_tags", "post_id", p["id"])
        year = int(p["date"][:4]) if p["date"] else 2020
        items.append((year, "blog-post", post_card(p, tg)))

    for cs in all_case_studies:
        tg = get_tags("case_study_tags", "case_study_id", cs["id"])
        year = int(cs["year"]) if cs["year"] else 2020
        boost = 10000 if cs["featured"] else 0
        items.append((year + boost, "case-study", work_card(cs, tg)))

    for pr in all_projects:
        tg = get_tags("project_tags", "project_id", pr["id"])
        items.append((3000, "project", project_card(pr, tg)))

    for t in all_testimonials:
        items.append((2000, "recommendation", testimonial_card(t)))

    items.sort(key=lambda x: x[0], reverse=True)

    return {"stats": stats, "items": items}


def build_home_feed(items: list[tuple[int, str, str]]) -> str:
    """Build the home feed module (filter + bento grid + load-more + JS)."""
    feed = ""

    # Filter bar
    feed += f'    {heading("From the workbench")}\n'
    feed += '    <div class="filter-bar">\n'
    feed += '      <button class="filter-btn active" data-filter="all">All</button>\n'
    feed += '      <button class="filter-btn" data-filter="case-study">Work</button>\n'
    feed += '      <button class="filter-btn" data-filter="blog-post">Blog</button>\n'
    feed += '      <button class="filter-btn" data-filter="project">Projects</button>\n'
    feed += '      <button class="filter-btn" data-filter="recommendation">Testimonials</button>\n'
    feed += "    </div>\n"

    # Bento grid — all items, hidden beyond first 9
    feed += '    <div class="bento-grid">\n'
    for i, (_, dtype, html) in enumerate(items):
        hidden = " hidden" if i >= 9 else ""
        feed += f'      <div class="bento-item{hidden}" data-type="{dtype}">{html}</div>\n'
    feed += "    </div>\n"

    # Load more button
    feed += '    <div class="load-more-wrap">\n'
    feed += '      <button class="btn btn-outline" id="load-more">Show more</button>\n'
    feed += "    </div>\n"

    # Inline JS for filter + load-more (loaded from template)
    home_feed_js = read_template("home-feed.js")
    feed += "    <script>\n" + home_feed_js + "\n    </script>\n"

    return feed


def build_page_context(page_id: str) -> dict:
    """Build per-page context for modules."""
    if page_id == "home":
        return build_home_context()
    # Other pages can populate context as needed
    return {}


def generate_module(page_id: str, module_cfg: dict, ctx: dict) -> str:
    """Generate a single module from JSON config."""
    component = module_cfg.get("component") or module_cfg.get("type")
    props = module_cfg.get("props", {}) or {}

    renderer = MODULE_RENDERERS.get(component)
    if renderer:
        return renderer(props, ctx)

    tpl_name = module_cfg.get("template")
    if tpl_name:
        tpl = read_template(tpl_name)
        return tpl.format(**props) if props else tpl

    raise ValueError(f"Unknown module component '{component}' on page '{page_id}'")


def generate_section(page_id: str, section_cfg: dict, ctx: dict) -> str:
    """Generate a section from JSON config (single-column modules)."""
    section_id = section_cfg["id"]
    section_height = section_cfg.get("height", "large")
    section_width = section_cfg.get("width", "large")
    modules_cfg = section_cfg.get("modules", []) or []

    modules_html = [generate_module(page_id, mod, ctx) for mod in modules_cfg]

    return section_block(
        section_id,
        modules=modules_html,
        padding=section_height,
        container=section_width,
    )


def validate_page_cfg(page_id: str, cfg: dict) -> None:
    """Basic validation for page JSON to fail fast on bad configs."""
    sections = cfg.get("sections", [])
    if not sections:
        raise ValueError(f"Page '{page_id}' must define at least one section")
    for section in sections:
        if "id" not in section:
            raise ValueError(f"Section missing 'id' in page '{page_id}'")
        for mod in section.get("modules", []):
            comp = mod.get("component") or mod.get("type")
            tpl_name = mod.get("template")
            if comp not in MODULE_RENDERERS and not tpl_name:
                raise ValueError(
                    f"Module in section '{section['id']}' of page '{page_id}' "
                    f"must have a known component or a template"
                )


def generate_page(page_id: str) -> str:
    """Generate a page from its JSON config in src/pages/."""
    cfg_path = HERE / "pages" / f"{page_id}.json"
    page_cfg = json.loads(cfg_path.read_text(encoding="utf-8"))

    validate_page_cfg(page_id, page_cfg)
    ctx = build_page_context(page_id)

    sections_html = [generate_section(page_id, section_cfg, ctx) for section_cfg in page_cfg.get("sections", [])]
    body_html = "\n".join(sections_html)

    return shell(
        page_cfg["title"],
        page_cfg.get("activeNav", ""),
        body_html,
        description=page_cfg.get("description", SITE_DESC),
        path=page_cfg.get("path", "/"),
    )


def generate_collection_pages(
    template_id: str,
    rows: list[sqlite3.Row],
    *,
    ctx_key: str = "row",
    lastmod_field: str | None = None,
    schema_builder: "callable | None" = None,
) -> list[tuple[str, str, str, str]]:
    """
    Generate collection pages from a JSON template.

    Returns list of (dist_path, url_path, lastmod, html).
    - dist_path: path relative to dist/ (e.g. "blog/slug/index.html")
    - url_path: URL path used in sitemap (e.g. "/blog/slug/")
    - lastmod: ISO date string for sitemap
    """
    cfg_path = HERE / "pages" / f"{template_id}.json"
    base_cfg = json.loads(cfg_path.read_text(encoding="utf-8"))

    pages: list[tuple[str, str, str, str]] = []
    today = datetime.now().strftime("%Y-%m-%d")

    for row in rows:
        row_dict = dict(row)
        cfg = deepcopy(base_cfg)

        # Format simple string fields with row data (e.g. title/path templates).
        for key in ("title", "description", "path"):
            if key in cfg and isinstance(cfg[key], str):
                try:
                    cfg[key] = cfg[key].format(**row_dict)
                except Exception:
                    # Fail soft and keep original template if formatting breaks.
                    pass

        validate_page_cfg(template_id, cfg)

        ctx = build_page_context(template_id)
        ctx[ctx_key] = row

        sections_html = [generate_section(template_id, section_cfg, ctx) for section_cfg in cfg.get("sections", [])]
        body_html = "\n".join(sections_html)

        extra_schema = schema_builder(row) if schema_builder else ""
        html = shell(
            cfg["title"],
            cfg.get("activeNav", ""),
            body_html,
            description=cfg.get("description", SITE_DESC),
            path=cfg.get("path", "/"),
            extra_schema=extra_schema,
        )

        url_path = cfg.get("path", "/")
        dist_path = url_path.strip("/").rstrip("/")
        if dist_path:
            dist_path = f"{dist_path}/index.html"
        else:
            dist_path = "index.html"

        if lastmod_field and lastmod_field in row_dict and row_dict[lastmod_field]:
            lastmod = str(row_dict[lastmod_field])
        else:
            lastmod = today

        pages.append((dist_path, url_path, lastmod, html))

    return pages


# ── card renderers ───────────────────────────────────────────────────────

def post_card(row, tags: list[str]) -> str:
    """Used on home + blog index."""
    inner = (
        '<p class="meta">{date} · {cat}</p>'
        '<h3><a href="/blog/{slug}/" class="link-block">{title}</a></h3>'
        '<p class="card-body">{desc}</p>{tg}'.format(
            date=e(row["date"]),
            cat=e(row["category"]),
            slug=e(row["slug"]),
            title=e(row["title"]),
            desc=e(row["description"]),
            tg=tags_html(tags),
        )
    )
    return card_clickable(f'/blog/{row["slug"]}/', inner)


def work_card(row, tags: list[str]) -> str:
    """Used on home (featured) + work index."""
    if row["video"] and not row["hide_image"]:
        media = video_el(row["video"], cls="cover")
    elif row["image"]:
        media = f'<img class="cover" src="{e(row["image"])}" alt="{e(row["title"])}" />'
    else:
        media = ""
    img = media
    visit = f' · <a href="{e(row["url"])}" target="_blank" rel="noopener">Visit ↗</a>' if row["url"] else ""
    inner = (
        '{img}'
        '<p class="meta">{client} · {year}{visit}</p>'
        '<h3><a href="/work/{slug}/" class="link-block">{title}</a></h3>'
        '<p class="card-body">{desc}</p>{tg}'.format(
            slug=e(row["slug"]),
            img=img,
            client=e(row["client"]),
            year=e(row["year"]),
            visit=visit,
            title=e(row["title"]),
            desc=e(row["description"]),
            tg=tags_html(tags),
        )
    )
    return card_clickable(f'/work/{row["slug"]}/', inner)


def project_card(row, tags: list[str]) -> str:
    """Used on home."""
    cls = "status-active" if row["status"] == "active" else "status-building"
    links = []
    if row["url"]: links.append(f'<a href="{e(row["url"])}" target="_blank" rel="noopener">Website</a>')
    if row["github"]: links.append(f'<a href="{e(row["github"])}" target="_blank" rel="noopener">GitHub</a>')
    if row["npm"]: links.append(f'<a href="{e(row["npm"])}" target="_blank" rel="noopener">npm</a>')
    links_str = f'<p class="meta">{" · ".join(links)}</p>' if links else ""
    stats_str = f'<p class="meta">{e(row["stats"])}</p>' if row["stats"] else ""
    inner = (
        '<h3>{title} <span class="status {cls}">{status}</span></h3>'
        '<p class="card-body">{desc}</p>{stats_str}{links_str}{tg}'.format(
            title=e(row["title"]),
            cls=cls,
            status=e(row["status"]),
            desc=e(row["description"]),
            stats_str=stats_str,
            links_str=links_str,
            tg=tags_html(tags),
        )
    )
    href = row["url"] or row["github"] or row["npm"]
    if href:
        return card_clickable(href, inner)
    return card(inner)


def testimonial_card(row) -> str:
    """Used on home + about."""
    has_image = "image" in row.keys() and row["image"]
    img = (
        f'<img src="{e(row["image"])}" alt="{e(row["name"])}" class="card-header-avatar" />'
        if has_image
        else ""
    )
    top = (
        '<div class="card-header">'
        f"{img}"
        '<div class="card-header-text">'
        f'<p class="card-title">{e(row["name"])}</p>'
        f'<p class="card-subtitle">{e(row["role"])}</p>'
        "</div>"
        "</div>"
    )
    body = f'<p class="card-body">{e(row["quote"])}</p>'
    inner = f'<div class="card-quote">{top}{body}</div>'
    href = row["linkedin"] if "linkedin" in row.keys() and row["linkedin"] else None
    if href:
        return card_clickable(href, inner, external=True)
    return card(inner)


def feed_item_card(row: sqlite3.Row) -> str:
    """Render a mixed feed item based on type."""
    t = row["type"]

    if t == "blog-post" and row["post_id"]:
        post_rows = q(
            "SELECT id, slug, title, date, description, category FROM posts WHERE id = ?",
            (row["post_id"],),
        )
        if not post_rows:
            return ""
        p = post_rows[0]
        tg = get_tags("post_tags", "post_id", p["id"])
        return post_card(p, tg)

    if t == "case-study" and row["case_study_id"]:
        cs_rows = q(
            "SELECT id, slug, title, client, description, year, image, video, url, hide_image FROM case_studies WHERE id = ?",
            (row["case_study_id"],),
        )
        if not cs_rows:
            return ""
        cs = cs_rows[0]
        tg = get_tags("case_study_tags", "case_study_id", cs["id"])
        return work_card(cs, tg)

    if t == "project" and row["project_id"]:
        pr_rows = q(
            "SELECT id, slug, title, description, status, url, github, npm, stats FROM projects WHERE id = ?",
            (row["project_id"],),
        )
        if not pr_rows:
            return ""
        pr = pr_rows[0]
        tg = get_tags("project_tags", "project_id", pr["id"])
        return project_card(pr, tg)

    if t == "recommendation" and row["testimonial_id"]:
        t_rows = q(
            "SELECT name, role, quote, image, linkedin FROM testimonials WHERE id = ?",
            (row["testimonial_id"],),
        )
        if not t_rows:
            return ""
        return testimonial_card(t_rows[0])

    # Fallback for generic/statement items if present
    parts: list[str] = []
    if row["label"]:
        parts.append(f'<p class="label">{e(row["label"])}</p>')
    if row["value"]:
        parts.append(f"<h3>{e(row['value'])}</h3>")
    if row["text"] or row["detail"]:
        parts.append(f"<p class=\"meta\">{e(row['text'] or row['detail'])}</p>")
    if not parts:
        parts.append("<p class=\"meta\">Untitled feed item</p>")
    return card("".join(parts))


# ── page: home ───────────────────────────────────────────────────────────

def build_home() -> str:
    """Home page is generated from pages/home.json and module registry."""
    return generate_page("home")


def post_list_module(props: dict) -> str:
    """Render blog index style post list."""
    title = props.get("title", "Blog")
    subtitle = props.get(
        "subtitle",
        "Writing about AI agent workflows, MCP development, and building tools like context-vault and omni in public.",
    )
    limit = props.get("limit")

    sql = "SELECT id, slug, title, date, description, category FROM posts ORDER BY date DESC"
    if limit:
        sql += " LIMIT ?"
        posts = q(sql, (limit,))
    else:
        posts = q(sql)

    b = f'    {heading(title, tag="h1")}\n'
    b += f'    <p class="subtitle">{e(subtitle)}</p>\n'
    for p in posts:
        tg = get_tags("post_tags", "post_id", p["id"])
        b += f'    {post_card(p, tg)}\n'
    return b


# ── page: home ───────────────────────────────────────────────────────────


# ── page: about ──────────────────────────────────────────────────────────

def build_about() -> str:
    testimonials = q("SELECT name, role, quote, image, linkedin FROM testimonials LIMIT 3")

    # Bio from markdown
    about_md = CONTENT / "about.md"
    if about_md.exists():
        bio_html = md(about_md.read_text(encoding="utf-8"))
    else:
        bio_html = "<p>Bio not found.</p>"

    b = f"""
    <div class="about_header">
      <img src="/images/felix-hero.jpeg" alt="Felix Hellström" class="profile-img" />
      <div>
        {heading("About", tag="h1")}
        <p class="subtitle">Full-stack developer and technical lead shipping AI tools and web platforms.</p>
        {text("Based in Sweden · 10+ years of client work across Webflow, HubSpot CMS, and custom integrations.", cls="meta")}
      </div>
    </div>

    <div class="about_grid">
      <div>
        {bio_html}

        {card(
          '<p class="label">Work with me</p>'
          + "<p>If you need a technical partner who can own both strategy and implementation, I'm best suited for:</p>"
          + '<ul class="sidebar_list">'
          + '<li>AI-powered internal tools and MCP-based workflows.</li>'
          + '<li>Complex Webflow or HubSpot CMS builds with custom integrations.</li>'
          + '<li>Refactoring or rebuilding existing sites that are hard to maintain.</li>'
          + '</ul>'
          + '<p class="meta">I take on a limited number of projects alongside my role at Stormfors.</p>'
          + '<div class="btn-row"><a href="/contact/" class="btn btn-primary">Start a conversation</a></div>'
        )}

        {heading("Recommendations")}
        <div class="grid grid-2">
"""
    for t in testimonials:
        b += f'          {testimonial_card(t)}\n'

    b += f"""
        </div>
      </div>
      <aside>
        {card(
          '<p class="label">Snapshot</p>'
          + '<div class="sidebar_stats">'
          + '<div><div class="stat-value-small">100+</div><div class="stat-label">Projects shipped</div></div>'
          + '<div><div class="stat-value-small">10+ yrs</div><div class="stat-label">Experience</div></div>'
          + '<div><div class="stat-value-small">3</div><div class="stat-label">Languages</div></div>'
          + '<div><div class="stat-value-small">2</div><div class="stat-label">Active products</div></div>'
          + '</div>'
        )}
        {card(
          '<p class="label">Technical focus</p>'
          + '<ul class="sidebar_list">'
          + '<li>AI agents and the MCP ecosystem for real developer workflows.</li>'
          + '<li>Webflow and HubSpot CMS architecture, custom code, and migrations.</li>'
          + '<li>React and TypeScript with Vite, Next.js, and Tauri.</li>'
          + '<li>Local-first tools with SQLite and MCP servers.</li>'
          + '</ul>'
        )}
        {card(
          '<p class="label">Links</p>'
          + '<ul class="sidebar_link-list">'
          + '<li><a href="https://linkedin.com/in/felixhellstrom" target="_blank" rel="noopener">LinkedIn ↗</a></li>'
          + '<li><a href="https://github.com/fellanH" target="_blank" rel="noopener">GitHub ↗</a></li>'
          + '<li><a href="https://x.com/felixhellstrom" target="_blank" rel="noopener">X / Twitter ↗</a></li>'
          + '<li><a href="https://www.npmjs.com/~fellanh" target="_blank" rel="noopener">npm ↗</a></li>'
          + '</ul>'
        )}
        {card(
          '<p class="label">Career timeline</p>'
          + '<div class="sidebar_timeline">'
          + '<p><strong>2021 – now</strong><br/>Technical Lead @ Stormfors</p>'
          + '<p><strong>Pre-2021</strong><br/>MicroAA Labs · Techlove · Breakfastboys</p>'
          + '<p><strong>2017 – Self Employed</strong><br/>Independent practice selling websites</p>'
          + '</div>'
        )}
      </aside>
    </div>\n"""

    return shell(f"About — {SITE_NAME}", "about", section("about", b, padding="large", container="large"),
                 description="Full-stack developer and technical lead. 10+ years shipping Webflow, HubSpot, and AI tools.",
                 path="/about/")


# ── page: blog index ─────────────────────────────────────────────────────

def build_blog_index() -> str:
    """Blog index now generated from pages/blog-index.json and module registry."""
    return generate_page("blog-index")


# ── page: blog post ──────────────────────────────────────────────────────

def build_blog_post(row: sqlite3.Row) -> str:
    slug = row["slug"]
    md_file = POSTS_DIR / f"{slug}.md"

    if md_file.exists():
        body_html = md(md_file.read_text(encoding="utf-8"))
    else:
        body_html = f"<p>{e(row['description'])}</p>"

    tags = get_tags("post_tags", "post_id", row["id"])

    b = f"""
    <a href="/blog/" class="back">← All posts</a>
    <article>
      <p class="meta">{e(row["date"])} · {e(row["category"])}</p>
      {heading(e(row["title"]), tag="h1")}
      {tags_html(tags)}
      <div class="prose">
{body_html}
      </div>
    </article>\n"""

    article_schema = schema_json_ld({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": row["title"],
        "description": row["description"],
        "datePublished": row["date"],
        "author": {"@type": "Person", "name": SITE_NAME, "url": SITE_URL},
        "publisher": {"@type": "Person", "name": SITE_NAME, "url": SITE_URL},
        "url": f"{SITE_URL}/blog/{slug}/",
        "image": f"{SITE_URL}/images/og-image.png",
        "keywords": tags,
    })

    return shell(f'{row["title"]} — {SITE_NAME}', "blog", section("blog-post", b, padding="large", container="medium"),
                 description=row["description"],
                 path=f"/blog/{slug}/",
                 extra_schema=article_schema)


# ── page: work index ─────────────────────────────────────────────────────

def build_work_index() -> str:
    """Work index is generated from pages/work-index.json and module registry."""
    return generate_page("work-index")


# ── page: work detail ────────────────────────────────────────────────────

def build_work_detail(row: sqlite3.Row) -> str:
    tags = get_tags("case_study_tags", "case_study_id", row["id"])

    b = f"""
    <a href="/work/" class="back">← All work</a>
    <article>
      <p class="meta">{e(row["client"])} · {e(row["year"])}</p>
      {heading(e(row["title"]), tag="h1")}
      {tags_html(tags)}
"""
    # Hero media
    if row["video"] and not row["hide_image"]:
        b += f'      {video_el(row["video"])}\n'
    elif row["image"] and not row["hide_image"]:
        b += f'      {image(row["image"], alt=row["title"])}\n'

    # Body: markdown file or DB description fallback
    md_file = WORK_DIR / f'{row["slug"]}.md'
    if md_file.exists():
        body_html = md(md_file.read_text(encoding="utf-8"))
    else:
        body_html = f'<p>{e(row["description"])}</p>'

    b += f'      <div class="prose">{body_html}</div>\n'

    # Visit link
    if row["url"]:
        b += f'      <p><a href="{e(row["url"])}" target="_blank" rel="noopener">Visit live site ↗</a></p>\n'

    b += "    </article>\n"

    return shell(f'{row["title"]} — {row["client"]} — {SITE_NAME}', "work", section("work-detail", b, padding="large", container="medium"),
                 description=row["description"],
                 path=f'/work/{row["slug"]}/')


# ── learn: pillar definitions ────────────────────────────────────────

PILLARS = [
    {
        "slug": "ai-agent-workflows",
        "label": "Pillar 1",
        "title": "AI Agent Workflows",
        "description": "Practical, reproducible workflows for using AI coding agents in production. Git patterns, multi-agent orchestration, prompt engineering, and autonomous runs.",
        "topics": "Project structure · Git workflows · Multi-agent orchestration · Autonomous runs · Prompt engineering",
        "post_tags": ["ai-agents", "automation", "workflow", "claude-code", "omni", "omni-cli", "git"],
        "intro": (
            "AI coding agents are past the novelty phase. The question isn't whether to use them — "
            "it's how to make them reliable in real projects. This pillar covers practical workflows "
            "I've developed from running hundreds of autonomous agent cycles, merging dozens of PRs, "
            "and building orchestration systems that self-heal."
        ),
    },
    {
        "slug": "mcp",
        "label": "Pillar 2",
        "title": "Building with MCP",
        "description": "The Model Context Protocol is powering the next generation of AI tools. Tutorials, patterns, and lessons from building and shipping MCP servers.",
        "topics": "MCP fundamentals · Server development · Tool design · Persistent memory · Local-first architecture",
        "post_tags": ["mcp", "context-vault", "sqlite"],
        "intro": (
            "The Model Context Protocol (MCP) gives AI agents structured access to tools, data, and "
            "context. I've shipped a production MCP server (context-vault) with 693+ tests, and built "
            "multiple internal MCP integrations. This pillar shares what I've learned about designing "
            "MCP tools that actually work."
        ),
    },
    {
        "slug": "agent-native",
        "label": "Pillar 3",
        "title": "The Agent-Native Stack",
        "description": "A philosophy for building software that AI agents can navigate, modify, and maintain. SQLite + Markdown + static HTML over frameworks and complexity.",
        "topics": "Agent-native manifesto · Zero-dependency architecture · Database-as-CMS · Schema design · Local-first philosophy",
        "post_tags": [],
        "intro": None,  # Uses MANIFESTO.md content instead
    },
]


def _pillar_posts(pillar: dict) -> list:
    """Get blog posts matching a pillar's tags."""
    if not pillar["post_tags"]:
        return []
    placeholders = ",".join("?" for _ in pillar["post_tags"])
    return q(
        f"SELECT DISTINCT p.id, p.slug, p.title, p.date, p.description, p.category "
        f"FROM posts p JOIN post_tags pt ON p.id = pt.post_id "
        f"WHERE pt.tag IN ({placeholders}) ORDER BY p.date DESC",
        tuple(pillar["post_tags"]),
    )


# ── page: learn hub ─────────────────────────────────────────────────

def build_learn_hub() -> str:
    """Learn hub is generated from pages/learn-hub.json and module registry."""
    return generate_page("learn-hub")


# ── page: learn pillar ──────────────────────────────────────────────

def build_learn_pillar(pillar: dict) -> str:
    b = f'    <a href="/learn/" class="back">← All pillars</a>\n'
    b += f'    {heading(e(pillar["title"]), tag="h1")}\n'
    b += f'    <p class="subtitle">{e(pillar["description"])}</p>\n'

    # Intro: either text or manifesto markdown
    if pillar["intro"]:
        b += f'    <div class="prose"><p>{pillar["intro"]}</p></div>\n'
    elif pillar["slug"] == "agent-native":
        manifesto_path = ROOT / "MANIFESTO.md"
        if manifesto_path.exists():
            b += f'    <div class="prose">\n{md(manifesto_path.read_text(encoding="utf-8"))}\n    </div>\n'

    # Related articles
    posts = _pillar_posts(pillar)
    if posts:
        b += f'\n    <div class="learn-articles">\n'
        b += f'      {heading("Articles", tag="h2")}\n'
        for p in posts:
            tg = get_tags("post_tags", "post_id", p["id"])
            b += f'      {post_card(p, tg)}\n'
        b += '    </div>\n'

    return shell(f'{pillar["title"]} — Learn — {SITE_NAME}', "learn", section("learn-pillar", b, padding="large", container="medium"),
                 description=pillar["description"],
                 path=f'/learn/{pillar["slug"]}/')


# ── page: projects index ────────────────────────────────────────────

def build_projects_index() -> str:
    """Projects index is generated from pages/projects.json and module registry."""
    return generate_page("projects")


# ── page: contact ────────────────────────────────────────────────────────

def build_contact() -> str:
    """Contact page is generated from pages/contact.json and module registry."""
    return generate_page("contact")


def build_404() -> str:
    """Custom 404 page."""
    body = """
    <div class="not-found">
      <h1>404</h1>
      <p>This page doesn't exist. It may have been moved or removed.</p>
      <a href="/" class="btn btn-primary">Back to home</a>
    </div>
    """
    return shell("Page not found — Felix Hellström", "", body, path="/404.html")


# ── sitemap.xml ──────────────────────────────────────────────────────────

def build_sitemap(pages: list[tuple[str, str]]) -> str:
    """pages = list of (path, lastmod date)"""
    urls = ""
    for path, lastmod in pages:
        urls += f"  <url><loc>{SITE_URL}{path}</loc><lastmod>{lastmod}</lastmod></url>\n"
    return f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{urls}</urlset>\n'


# ── feed.xml (RSS 2.0) ──────────────────────────────────────────────────

def build_rss() -> str:
    posts = q("SELECT slug, title, date, description FROM posts ORDER BY date DESC LIMIT 20")
    items = ""
    for p in posts:
        link = f'{SITE_URL}/blog/{p["slug"]}/'
        items += f"""    <item>
      <title>{e(p["title"])}</title>
      <link>{link}</link>
      <guid>{link}</guid>
      <pubDate>{p["date"]}</pubDate>
      <description>{e(p["description"])}</description>
    </item>\n"""

    return f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>{SITE_NAME}</title>
    <link>{SITE_URL}</link>
    <description>{SITE_DESC}</description>
    <language>en</language>
    <atom:link href="{SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
{items}  </channel>
</rss>
"""


# ── main ─────────────────────────────────────────────────────────────────

def copy_static() -> None:
    """Copy static files and directories into dist/."""
    for src in STATIC_FILES:
        if src.exists():
            shutil.copy2(src, DIST / src.name)
            print(f"  ✓ {src.name} (copied)")
    for src in STATIC_DIRS:
        dest = DIST / src.name
        if src.exists():
            if dest.exists():
                shutil.rmtree(dest)
            shutil.copytree(src, dest)
            count = sum(1 for _ in dest.rglob("*") if _.is_file())
            print(f"  ✓ {src.name}/ ({count} files copied)")


def main() -> None:
    # Always start clean — dist/ is a build artifact
    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir()
    print(f"  ✓ dist/ (clean)")

    today = datetime.now().strftime("%Y-%m-%d")
    sitemap_pages: list[tuple[str, str]] = []
    page_count = 0

    # Static assets
    copy_static()

    # Static pages
    write_page("index.html", build_home())
    sitemap_pages.append(("/", today))
    page_count += 1
    print("  ✓ index.html")

    write_page("about/index.html", build_about())
    sitemap_pages.append(("/about/", today))
    page_count += 1
    print("  ✓ about/")

    write_page("contact/index.html", build_contact())
    sitemap_pages.append(("/contact/", today))
    page_count += 1
    print("  ✓ contact/")

    # Learn hub + pillars
    write_page("learn/index.html", build_learn_hub())
    sitemap_pages.append(("/learn/", today))
    page_count += 1
    print("  ✓ learn/")

    for pillar in PILLARS:
        write_page(f'learn/{pillar["slug"]}/index.html', build_learn_pillar(pillar))
        sitemap_pages.append((f'/learn/{pillar["slug"]}/', today))
        page_count += 1
        print(f'  ✓ learn/{pillar["slug"]}/')

    # Projects
    write_page("projects/index.html", build_projects_index())
    sitemap_pages.append(("/projects/", today))
    page_count += 1
    print("  ✓ projects/")

    # Blog
    write_page("blog/index.html", build_blog_index())
    sitemap_pages.append(("/blog/", today))
    page_count += 1
    print("  ✓ blog/")

    posts = q("SELECT id, slug, title, date, description, category FROM posts ORDER BY date DESC")

    def _blog_schema(row: sqlite3.Row) -> str:
        tags = get_tags("post_tags", "post_id", row["id"])
        slug = row["slug"]
        return schema_json_ld(
            {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": row["title"],
                "description": row["description"],
                "datePublished": row["date"],
                "author": {"@type": "Person", "name": SITE_NAME, "url": SITE_URL},
                "publisher": {"@type": "Person", "name": SITE_NAME, "url": SITE_URL},
                "url": f"{SITE_URL}/blog/{slug}/",
                "image": f"{SITE_URL}/images/og-image.png",
                "keywords": tags,
            }
        )

    blog_pages = generate_collection_pages(
        "blog-post",
        posts,
        ctx_key="row",
        lastmod_field="date",
        schema_builder=_blog_schema,
    )
    for dist_path, url_path, lastmod, html in blog_pages:
        write_page(dist_path, html)
        sitemap_pages.append((url_path, lastmod))
        page_count += 1
        print(f"  ✓ {dist_path}")

    # Work
    write_page("work/index.html", build_work_index())
    sitemap_pages.append(("/work/", today))
    page_count += 1
    print("  ✓ work/")

    studies = q(
        "SELECT id, slug, title, client, description, year, image, video, url, hide_image "
        "FROM case_studies ORDER BY year DESC"
    )
    work_pages = generate_collection_pages("work-detail", studies, ctx_key="row")
    for dist_path, url_path, lastmod, html in work_pages:
        write_page(dist_path, html)
        sitemap_pages.append((url_path, lastmod))
        page_count += 1
        print(f"  ✓ {dist_path}")

    # 404
    write_page("404.html", build_404())
    print("  ✓ 404.html")

    # Sitemap
    (DIST / "sitemap.xml").write_text(build_sitemap(sitemap_pages), encoding="utf-8")
    print("  ✓ sitemap.xml")

    # RSS
    (DIST / "feed.xml").write_text(build_rss(), encoding="utf-8")
    print("  ✓ feed.xml")

    print(f"\n  → dist/ ready ({page_count} pages · {len(sitemap_pages)} sitemap entries · RSS)")
    print(f"    from {DB_PATH.relative_to(ROOT)} + {len(list(POSTS_DIR.glob('*.md')))} markdown files")


if __name__ == "__main__":
    main()
