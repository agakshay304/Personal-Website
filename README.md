# Akshay Personal Website

Production-ready personal portfolio built with React, TypeScript, Vite, GSAP, Three.js, and React Three Fiber.

The site is structured as a single-page product with:

- a cinematic hero section with a 3D character scene
- smooth section-to-section storytelling
- data-driven content modules for resume-backed personalization
- a project carousel, floating tech stack scene, and polished contact surface

## Stack

- React 18
- TypeScript
- Vite 5
- GSAP
- Three.js
- React Three Fiber
- React Icons

## Why the structure looks this way

The package is organized around clear seams:

- `src/components/layout` contains the app shell, navigation, and global chrome
- `src/components/sections` contains page-level sections only
- `src/components/three` isolates 3D scene implementations
- `src/content` stores editable profile data separate from presentation logic
- `src/lib/animation` and `src/lib/three` hold animation and scene helpers
- `src/types` centralizes content models
- `public` contains all standalone runtime assets

This keeps personal content easy to update without touching rendering logic and keeps the 3D layer isolated from the rest of the UI.

## Prerequisites

- Node.js 18+
- npm 9+

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev
```

The Vite server starts with `--host`, so it is reachable from the local network if needed.

## Build

```bash
npm run build
```

## Preview production output

```bash
npm run preview
```

## Lint

```bash
npm run lint
```

## Tests

There is no automated test suite in this package yet. The current validation path is:

- static typing via `tsc -b`
- linting via ESLint
- manual browser verification for scene load, section transitions, and responsive layout

## Content customization

All profile data lives under `src/content`.

- hero, about, and contact basics: `src/content/site.ts`
- expertise cards: `src/content/expertise.ts`
- experience timeline: `src/content/experience.ts`
- projects carousel: `src/content/projects.ts`
- skills, education, achievements: `src/content/skills.ts`
- external profiles: `src/content/socials.ts`

If a future update is missing a public URL, use a placeholder such as `<<ADD_GITHUB_URL>>` in the content layer. The UI will render it as a non-clickable placeholder until the real link is available.

## Asset replacement

- resume download: `public/assets/resume/Akshay_Gupta_Resume.pdf`
- project art: `public/assets/images/projects`
- 3D hero files: `public/models`
- Draco decoder files: `public/draco`

## Environment variables

No runtime environment variables are required for the current implementation.

## Deployment notes

The app builds to a static Vite bundle and can be deployed to any static host:

- Vercel
- Netlify
- Cloudflare Pages
- S3 + CloudFront

If deploying under a non-root base path, add the appropriate Vite `base` configuration in `vite.config.ts`.

## Additional docs

- architecture overview: `ARCHITECTURE.md`
- content editing guide: `CONTENT_GUIDE.md`
- implementation decisions: `DECISIONS.md`
