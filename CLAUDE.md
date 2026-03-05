# felixhellstrom.com

Static site: SQLite + markdown + Python stdlib. Zero dependencies.

## Repo layout

```
content/       Human-editable (posts, images, styles)
src/          Agent-managed (generator, database, config)
dist/        Generated output — DO NOT EDIT
```

## Rules

- All structured content lives in `src/db/seed.sql` — never hardcode in generate.py
- `dist/` is ephemeral — never edit, always regenerate
- Blog post bodies are `.md` files in `content/posts/` — metadata is in the DB
- Work detail bodies are `.md` files in `content/work/` — falls back to DB description
- About page bio is `content/about.md` — rendered into the left column
- Inline JS is allowed for progressive enhancement (theme toggle, etc.) — no bundler, no external JS files
- Always run commands from the repo root

## File map

```
content/
  about.md               About page bio (markdown)
  posts/{slug}.md        Blog post bodies (markdown)
  work/{slug}.md         Work detail bodies (markdown, optional — falls back to description)
  images/                Static assets (copied to dist/)
    work/                Case study screenshots
    people/              Testimonial headshots
  style.css              Stylesheet — CSS variables control colors/fonts + dark mode

src/
  generate.py            Build system — each page is a function (see map below)
  check.py               Health check — verifies DB ↔ content file sync
  db/
    schema.sql           Table definitions
    seed.sql             All content INSERTs — primary file for content changes
  content.db             SQLite runtime artifact (gitignored)
  robots.txt             Crawl rules (copied to dist/)

Makefile                 Build commands: make build, make seed, make check, make preview
dist/                    Auto-generated — DO NOT EDIT
```

## Page → function map (src/generate.py)

| Route                 | Function                | Key elements                                                            |
| --------------------- | ----------------------- | ----------------------------------------------------------------------- |
| `/`                   | `build_home()`          | Hero, stats row, latest posts, featured work, projects, testimonials    |
| `/learn`              | `build_learn_hub()`     | Pillar cards grid, latest articles across pillars                       |
| `/learn/{pillar}`     | `build_learn_pillar()`  | Pillar intro, MANIFESTO.md (agent-native), related articles             |
| `/projects`           | `build_projects_index()`| Project cards grid from DB                                              |
| `/about`              | `build_about()`         | Bio from `content/about.md`, recommendations, sidebar                   |
| `/blog`               | `build_blog_index()`    | Post list from DB                                                       |
| `/blog/{slug}`        | `build_blog_post()`     | Reads `content/posts/{slug}.md`, renders with `.prose` class            |
| `/work`               | `build_work_index()`    | Case study grid from DB                                                 |
| `/work/{slug}`        | `build_work_detail()`   | Hero media, reads `content/work/{slug}.md` or falls back to description |
| `/contact`            | `build_contact()`       | Contact cards, availability, location                                   |

Shared: `shell()` wraps every page (head, nav, footer, theme scripts, schema markup). `nav_html()` renders navigation + theme toggle.

Card renderers: `post_card()`, `work_card()`, `project_card()`, `testimonial_card()` — reused across pages.

Pillar definitions: `PILLARS` list in generate.py defines learn pillar pages (slug, title, description, related post tags). `_pillar_posts()` queries related articles.

Schema markup: `schema_json_ld()` renders JSON-LD. Person schema on `/` and `/about/`. Article schema on each `/blog/{slug}/` page.

## Dark mode

- CSS: `:root` has light variables, `[data-theme="dark"]` overrides them, `@media (prefers-color-scheme: dark)` provides system fallback
- JS: `THEME_INIT` inline script in `<head>` reads `localStorage('theme')` before CSS loads (prevents FOUC). `THEME_TOGGLE` script at end of `<body>` wires up the toggle button.
- Toggle button: moon/sun icon in nav, saves preference to `localStorage`
- All colors go through CSS variables — no hardcoded colors in the stylesheet

## Design system (content/style.css)

| Section                           | Controls                                                    |
| --------------------------------- | ----------------------------------------------------------- |
| `:root` variables                 | Colors: `--fg`, `--bg`, `--accent`, `--card-bg`, `--border` |
| `[data-theme="dark"]`             | Dark mode variable overrides                                |
| `@media (prefers-color-scheme)`   | System dark mode fallback                                   |
| `body`                            | Font family, line-height, max-width (`--max-w: 52rem`)      |
| Typography (`h1`–`h3`, `p`, `a`)  | Sizes, weights, margins                                     |
| `.card`                           | Content cards (border, radius, padding)                     |
| `.tag`, `.status`                 | Badges and labels                                           |
| `.quote`                          | Testimonial blocks                                          |
| `.grid`, `.grid-2`, `.grid-stats` | Layout grids                                                |
| `.hero-grid`, `.about-grid`       | Page-specific layouts                                       |
| `.prose`                          | Blog post body typography                                   |
| `.theme-toggle`                   | Dark mode toggle button                                     |
| `@media (max-width: 640px)`       | Mobile breakpoint                                           |

## Database tables

| Table             | Purpose        | Key columns                                                            |
| ----------------- | -------------- | ---------------------------------------------------------------------- |
| `posts`           | Blog metadata  | `slug`, `title`, `date`, `description`, `category`                     |
| `post_tags`       | M2M            | `post_id`, `tag`                                                       |
| `case_studies`    | Work items     | `slug`, `title`, `client`, `year`, `featured`, `image`, `video`, `url` |
| `case_study_tags` | M2M            | `case_study_id`, `tag`                                                 |
| `work_details`    | Hero overrides | `case_study_id`, `image`, `video`                                      |
| `projects`        | Side projects  | `slug`, `title`, `status` (active/building/concept), `url`, `github`   |
| `project_tags`    | M2M            | `project_id`, `tag`                                                    |
| `testimonials`    | Quotes         | `name`, `role`, `relationship`, `quote`, `image`                       |
| `feed_items`      | Homepage feed  | `position`, `type`, FK refs to content tables                          |

## Commands

```bash
make build      # Generate dist/ from DB + markdown
make seed       # Re-seed DB and build (after editing seed.sql)
make check      # Verify DB entries have matching content files
make preview    # Local server at localhost:8000
make clean      # Remove dist/ and content.db
```

## Content operations

### Add a blog post

1. INSERT into `posts` + `post_tags` in `src/db/seed.sql`
2. Create `content/posts/{slug}.md`
3. `make seed`

### Add a case study

1. INSERT into `case_studies` + `case_study_tags` in `src/db/seed.sql`
2. Add image to `content/images/work/`
3. `make seed`

### Add work detail body

1. Create `content/work/{slug}.md` (slug must match case study)
2. `make build`

### Edit about bio

1. Edit `content/about.md`
2. `make build`

### Add a testimonial

1. INSERT into `testimonials` in `src/db/seed.sql`
2. Add headshot to `content/images/people/`
3. `make seed`

### Change page layout

1. Find the page function in the map above
2. Edit the HTML in that function in `src/generate.py`
3. `make build`

### Change styling

1. Edit `content/style.css` (CSS variables for colors, rules for layout)
2. `make build`
