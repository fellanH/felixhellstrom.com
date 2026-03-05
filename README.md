# felixhellstrom.com

Personal site built for AI-assisted editing. No frameworks, no CMS — just files you can read and an agent that can write them.

## Repo structure

```
content/       ← Your stuff. Posts, images, styles.
src/           ← Agent stuff. Generator, database, config.
dist/          ← Output. Auto-generated, don't touch.
```

Structured content (posts, work, projects, testimonials, feed) lives in `src/db/seed.sql`. Markdown bodies and images live in `content/`.

That's it. Tell your agent what to change, or edit `content/` + `src/db/seed.sql` yourself.

---

## What you can change directly

Everything in **content/** is yours to edit:

| Want to...        | Do this                                              |
| ----------------- | ---------------------------------------------------- |
| Write a blog post | Create a `.md` file in `content/posts/`              |
| Add a photo       | Drop it in `content/images/`                         |
| Change colors     | Edit CSS variables at the top of `content/style.css` |
| Change fonts      | Edit the `body` font-family in `content/style.css`   |
| Tweak typography  | Edit heading/paragraph sizes in `content/style.css`  |
| Edit structured content (posts, work, projects, testimonials, feed) | Update rows in `src/db/seed.sql`        |

### Color reference (`content/style.css`)

```css
:root {
  --fg: #1a1a1a; /* text */
  --bg: #fafafa; /* page background */
  --accent: #2563eb; /* links */
  --card-bg: #fff; /* card backgrounds */
  --border: #e5e5e5; /* borders and dividers */
}
```

---

## What to ask your agent

For anything that touches data or page layouts, tell your agent:

```
"Write a blog post about X"
"Add a new case study for Acme Corp"
"Change the accent color to green"
"Replace the homepage stats grid with a timeline"
"Rewrite the hero section to focus on consulting"
"Add a newsletter signup to the blog page"
```

The agent edits the right files, runs the build, done.

### Page layout reference

Every page is a function in `src/generate.py`:

| Page           | Function              | What's on it                                     |
| -------------- | --------------------- | ------------------------------------------------ |
| `/`            | `build_home()`        | Hero, stats, posts, work, projects, testimonials |
| `/about`       | `build_about()`       | Bio, recommendations, sidebar                    |
| `/blog`        | `build_blog_index()`  | Post list                                        |
| `/blog/{slug}` | `build_blog_post()`   | Single post from markdown                        |
| `/work`        | `build_work_index()`  | Case study grid                                  |
| `/work/{slug}` | `build_work_detail()` | Single case study                                |
| `/contact`     | `build_contact()`     | Contact cards, availability                      |

---

## Build & deploy

```bash
make build    # generate dist/ from existing DB + markdown
make seed     # reset + seed SQLite DB, then build
make preview  # build and serve dist/ at http://localhost:8000
git push      # deploy (Vercel auto-builds)
```

## Requirements

Python 3.10+ and SQLite3. Zero npm packages. Zero dependencies.

## Philosophy

Read [MANIFESTO.md](MANIFESTO.md) for why this site has no JavaScript framework.
