# AGENTS.md

## Overview

This repository is a personal branding/portfolio website built with:

- Vite
- React 18
- TypeScript
- Tailwind CSS
- `react-router-dom`
- MDX for blog content
- `react-helmet-async` for SEO metadata
- Vercel Analytics

The app is a client-rendered SPA, not a file-based Astro app, even though `astro.config.mjs` and `@astrojs/*` packages exist in the repo.

## Working Rules

- Prefer minimal, targeted edits over broad refactors.
- Do not introduce new UI libraries, icon packs, or theme systems unless explicitly requested.
- Preserve the existing visual language: Tailwind utilities, shadcn/ui-style components, and `lucide-react`.
- Keep changes production-oriented. Avoid placeholder copy, demo data, and unfinished scaffolding.

## Common Commands

Run commands from the repo root.

```bash
rtk npm run dev
rtk npm run build
rtk npm run lint
rtk npm run generate-sitemap
```

## Project Structure

- `src/main.tsx`: React entrypoint, global CSS import, Vercel Analytics mount.
- `src/App.tsx`: top-level providers, router, shared layout, MDX component mapping.
- `src/pages/`: route-level pages.
- `src/components/layout/`: navigation and footer.
- `src/components/seo/`: SEO helpers and breadcrumbs.
- `src/components/ui/`: reusable UI primitives.
- `src/content/personal-info.ts`: canonical personal metadata used across the site.
- `src/content/projects.ts`: project listing/detail content.
- `src/content/experience.ts`: experience timeline content.
- `src/content/posts/*.mdx`: blog posts and frontmatter.
- `src/utils/mdx.ts`: MDX post loading and frontmatter parsing.
- `src/utils/sitemap.ts` and `scripts/generate-sitemap.js`: sitemap generation logic.
- `public/`: static assets, verification files, manifest, resume, blog/project images.

## Routing

Routes are declared manually in `src/App.tsx`:

- `/`
- `/blog`
- `/blog/:id`
- `/projects`
- `/projects/:id`
- `/experience`

When adding a new page, update routing explicitly in `src/App.tsx` and ensure navigation links are added only where appropriate.

## Content Conventions

### Blog posts

Blog posts live in `src/content/posts/*.mdx`.

Expected frontmatter fields:

- `title`
- `excerpt`
- `date`
- `category`
- `tags`
- `readTime`
- `published`
- `heroImage` (optional)

`src/utils/mdx.ts` loads posts with `import.meta.glob(...)` and sorts them by descending date.

### SEO

- Reuse `SEOHead` from `src/components/seo/seo-head.tsx` for page metadata.
- Prefer updating `src/content/personal-info.ts` for global identity/site metadata instead of hardcoding duplicates.
- If a new route should be indexed, verify sitemap coverage and canonical URL behavior.

## UI and Styling Guidance

- Prefer existing components before creating new primitives.
- Keep styling in Tailwind utilities or existing CSS files (`src/index.css`, `src/App.css`) when needed.
- Preserve responsiveness across mobile and desktop.
- For MDX-rendered content, account for the component mappings defined in `src/App.tsx`.
- Use `lucide-react` for icons.

## Change Guidance

### Safe places to edit for common requests

- Personal info updates: `src/content/personal-info.ts`
- Project content: `src/content/projects.ts`
- Experience content: `src/content/experience.ts`
- Blog content: `src/content/posts/*.mdx`
- SEO behavior: `src/components/seo/seo-head.tsx`
- Page layout/content: `src/pages/*`
- Shared navigation/footer: `src/components/layout/*`

### Be careful with

- Route changes in `src/App.tsx`
- Blog post parsing assumptions in `src/utils/mdx.ts`
- Static verification files in `public/` such as Google/Bing ownership files
- Sitemap generation behavior in `scripts/generate-sitemap.js`

## Validation Expectations

After meaningful code changes, prefer these checks:

```bash
rtk npm run lint
rtk npm run build
```

If the change affects routing, metadata, or blog content, also verify:

- the route renders
- document title/meta tags are correct
- internal links still work
- generated sitemap output still matches intended public pages

## Notes For Future Agents

- This repo already contains agent skills under `.agents/skills/` for accessibility, performance, SEO, Core Web Vitals, best practices, and web quality audits. Use them when the task clearly matches.
- `node_modules/` and `dist/` are present; do not edit generated output in `dist/`.
- Favor content/data updates over hardcoded JSX duplication when the requested change fits the existing content-driven structure.
