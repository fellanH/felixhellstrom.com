## Design system overview

This project uses Tailwind CSS 4 with a shadcn-style theme layered on top of CSS variables in `src/styles/theme.css`.

### Colors

- **Background/surfaces**: `--background`, `--card`, `--surface`
- **Text**: `--foreground`, `--muted-foreground`, `--brand-foreground`
- **Brand**: `--brand` (primary accent), `--brand-muted` (subtle accents)
- **Semantic**: `--primary`, `--secondary`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`

Use Tailwind aliases like `bg-background`, `text-foreground`, `bg-card`, `border-border`, `text-muted-foreground`, `bg-primary`, etc. instead of hard-coded hex values.

### Typography

- Base font size controlled via `--font-size` on `html`
- Scale variables in `theme.css`:
  - `--text-xs`, `--text-sm`, `--text-base`, `--text-lg`, `--text-xl`, `--text-2xl`, `--text-3xl`, `--text-4xl`
- Headings (`h1`–`h4`) and body text use these tokens via base styles.
- Rich text and MDX content should always be wrapped in a `.prose` container.

### Layout primitives

- `Container` (`src/app/components/LayoutPrimitives.tsx`)
  - Centers content with `max-w-3xl` and horizontal padding (`px-4 sm:px-6`).
  - Use for header, footer, and any full-width sections that need consistent gutters.
- `PageShell`
  - Wraps page bodies with `Container` and vertical padding (`py-16` by default).
  - Use as the top-level wrapper for route content (Home, About, Work, etc.).
- `PageHeader`
  - Handles page titles, optional eyebrow, and description with consistent spacing and typography.

### UI primitives

- `Button` (`src/components/ui/button.tsx`)
  - Variants: `default`, `secondary`, `outline`, `ghost`, `link`, `destructive`
  - Sizes: `sm`, `default`, `lg`, `icon`
  - Prefer `Button` over custom button classes. Use `variant="ghost"` or `variant="outline"` for subtle buttons and filters.
- `Badge` (`src/components/ui/badge.tsx`)
  - Use for tags, small status labels, and chips (e.g. tech tags, categories).
- `Card` (`src/components/ui/card.tsx`)
  - Use for grouped content like feed items, case studies, and project tiles.
  - Prefer composition via `CardHeader`, `CardContent`, `CardTitle`, `CardDescription`.

### Usage guidelines

- **Spacing**
  - Prefer a small set of section paddings: `py-12`, `py-16`, and `space-y-*` utilities.
  - Use `PageShell` to standardize vertical rhythm instead of repeating `mx-auto max-w-3xl px-4 sm:px-6`.
- **Meta text**
  - Use `text-xs text-muted-foreground` for small meta labels (dates, stats, captions).
- **Links**
  - Inline links: default `.prose a` styles or `text-foreground underline underline-offset-2` as needed.
  - Nav/footer links: `text-sm text-muted-foreground hover:text-foreground`.

Centralize new patterns here and in shared components before adding custom one-off Tailwind class stacks on pages.

