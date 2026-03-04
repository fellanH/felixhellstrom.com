# felixhellstrom.com — Project SOP

## Stack

| Layer      | Choice                                      |
| ---------- | ------------------------------------------- |
| Framework  | Vite 7 + React 19 + React Router 7          |
| Styling    | Tailwind CSS 4, shadcn/ui components        |
| Content    | MDX for blog posts                          |
| Deployment | Vercel (CLI deploy)                         |
| SEO        | react-helmet-async, sitemap.xml, robots.txt |

## Repo Structure

```
src/
  app/
    components/    # Layout components (SiteLayout, PageHead, MDXComponents)
    content/       # Blog post MDX files + post/project data
    pages/         # Route-level page components
  components/ui/   # shadcn/ui primitives (button, card, badge, utils)
  styles/          # CSS (fonts, tailwind, theme)
public/            # robots.txt, sitemap.xml
vercel.json        # Rewrites, headers, output config
```

## Deploy Workflow

```bash
# Dev
npm run dev

# Preview deploy (staging)
npm run preview:deploy

# Production
npm run deploy
```

## Adding a Blog Post

1. Add entry to `src/app/content/posts/index.ts`
2. Create `src/app/content/posts/<slug>.mdx`
3. Add to `public/sitemap.xml`

## Conventions

- Brand color: `oklch(0.55 0.15 230)` (blue/teal) light, `oklch(0.72 0.12 230)` dark
- Max content width: `max-w-3xl` (48rem)
- MDX content wrapped in `.prose` class for typography
- Theme toggle via next-themes with `attribute="class"`
- No analytics yet — add GTM when traffic warrants it
