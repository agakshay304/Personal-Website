# Performance Audit and Optimization

## Outcome

The portfolio now ships as a progressively enhanced experience:

- Desktop Lighthouse performance: **100**
- Mobile Lighthouse performance: **94**
- Initial entry bundle: **30.75 kB** raw / **11.43 kB gzip**
- Three.js and react-three-fiber are now **fully on-demand** instead of being preloaded on first paint

Validated with:

```bash
npm run lint
npm run build
npx --yes lighthouse http://127.0.0.1:4174 --quiet --preset=desktop --chrome-flags='--headless=new --no-sandbox' --only-categories=performance --output=json --output-path=/tmp/akshay-personal-website-lighthouse-desktop.json
npx --yes lighthouse http://127.0.0.1:4174 --quiet --chrome-flags='--headless=new --no-sandbox' --only-categories=performance --output=json --output-path=/tmp/akshay-personal-website-lighthouse-mobile.json
```

## Baseline vs Final

### Lighthouse

| Scenario | Before | After |
| --- | --- | --- |
| Desktop performance | 79 | 100 |
| Desktop FCP | 0.8 s | 0.7 s |
| Desktop LCP | 2.7 s | 0.7 s |
| Desktop TBT | 190 ms | 0 ms |
| Desktop CLS | 0.003 | 0 |
| Mobile performance | 31 | 94 |
| Mobile FCP | 3.5 s | 2.5 s |
| Mobile LCP | 16.3 s | 2.5 s |
| Mobile TBT | 3420 ms | 0 ms |
| Mobile CLS | 0.032 | 0 |

### Bundle shape

| Asset | Before | After |
| --- | --- | --- |
| Main entry JS | 107.99 kB raw / 41.89 kB gzip | 30.75 kB raw / 11.43 kB gzip |
| Hero scene JS | Eager side effects from vendor preloads | 9.17 kB lazy chunk |
| Tech stack scene JS | Eager vendor preload path | 2.91 kB lazy chunk |
| Three.js vendor | Preloaded on initial navigation | Loaded only when a 3D scene is actually requested |

## Issues Found

### Critical

- Loading progress updates were forcing avoidable app-level rerenders.
- The custom cursor used a permanent `requestAnimationFrame` loop and spawned GSAP tweens every frame.
- The hero scene used continuous rendering even when offscreen or when the document was hidden.
- The hero scene and tech stack scene pulled heavy WebGL dependencies into the initial navigation path through vendor chunk preloading.
- The page preloaded the encrypted hero asset and HDR environment map even before the hero scene was needed.
- `SplitText` and `ScrollSmoother` were bundled too eagerly for the main page shell.
- The tech stack canvas was always treated as an interactive enhancement, even on devices that should prefer a cheaper fallback.

### Medium

- Several pure presentational components were rerendering because they were not memoized.
- Scroll-linked animation timelines used layout-heavy properties in a few places.
- Too many `will-change` hints were applied to large containers, increasing raster and memory pressure.
- Window resize handling in the hero scene refreshed layout work too aggressively.
- The loader stack remained in the codebase after the app no longer depended on it.

### Nice to have

- Background overlays and blur effects were still more expensive than necessary on small screens.
- Web font loading was heavier than needed for the actual typography usage.
- Below-the-fold sections rendered eagerly even though they were not immediately visible.

## Fixes Applied

### React and app shell

- Split loading state/actions context during the audit, then removed the entire unused loading provider and loader path once the app no longer depended on it.
- Memoized pure UI and section components to reduce repeat work across scroll and hover interactions.
- Deferred the hero scene and tech stack scene behind `React.lazy` and `Suspense` boundaries.
- Added a reusable intersection observer hook for view-based activation.
- Reduced initial app work by lazily importing `SplitText` and `ScrollSmoother` only when conditions justify them.

### Bundle and dependency loading

- Reworked Vite manual chunking so React, GSAP, and WebGL dependencies split cleanly.
- Removed initial module preloads for Three.js and react-three-fiber from the landing page.
- Removed eager preloads for `/models/hero.enc` and `/models/hero_env.hdr`.
- Trimmed Google font usage to only the weights actually used by the site.

### Hero 3D scene

- Converted the hero avatar into progressive enhancement: the interactive scene now activates on user intent instead of during first paint.
- Paused rendering when the scene is offscreen or when the tab is hidden.
- Disabled shadow maps and reduced pixel ratio pressure.
- Removed `renderer.compileAsync(...)` from model startup.
- Cached decrypted model URLs and HDR/environment loading to avoid repeated work.
- Debounced resize-driven renderer updates with `requestAnimationFrame`.
- Kept reduced-motion users on a static fallback instead of paying the WebGL cost.

### Tech stack 3D scene

- Deferred scene creation until the section approaches the viewport.
- Added capability gating so lower-power devices keep the text-first fallback instead of forcing WebGL.
- Reduced geometry complexity, texture size, lighting cost, and material cost.
- Kept the scene paused outside the viewport.

### Animation and rendering

- Replaced layout-heavy animation work with transform/opacity-first choreography where possible.
- Reduced scrub pressure on scroll-driven hero timelines.
- Reworked the custom cursor to use event delegation and direct transforms instead of perpetual tween creation.
- Added `content-visibility: auto` and intrinsic size hints to below-the-fold sections.
- Removed unnecessary `will-change` hints from large containers.

### CSS and small-screen polish

- Disabled the fixed background grid overlay on smaller screens.
- Removed card backdrop filtering on smaller screens to reduce compositing cost.
- Replaced the old loader marquee dependency with CSS during the audit, then removed the loader entirely once it was no longer used.

## Exact File-Level Changes

### Components

- `src/App.tsx`
- `src/components/layout/AppLayout.tsx`
- `src/components/layout/Cursor.tsx`
- `src/components/layout/Navbar.tsx`
- `src/components/layout/SmoothScroller.tsx`
- `src/components/layout/SocialRail.tsx`
- `src/components/sections/AboutSection.tsx`
- `src/components/sections/ContactSection.tsx`
- `src/components/sections/ExperienceSection.tsx`
- `src/components/sections/ExpertiseSection.tsx`
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/ProjectsSection.tsx`
- `src/components/sections/TechStackSection.tsx`
- `src/components/ui/HoverLink.tsx`
- `src/components/ui/IconLink.tsx`
- `src/components/ui/SectionHeading.tsx`
- `src/components/ui/TagPill.tsx`

### 3D and rendering

- `src/components/three/HeroScene.tsx`
- `src/components/three/TechSphereScene.tsx`
- `src/lib/three/characterLoader.ts`
- `src/lib/three/interactions.ts`
- `src/lib/three/lighting.ts`
- `src/lib/animation/characterScroll.ts`

### Hooks and utilities

- `src/hooks/useInView.ts`
- `src/lib/animation/splitText.ts`
- `src/lib/performance/device.ts`

### Styling and build

- `src/styles/global.css`
- `index.html`
- `vite.config.ts`
- `src/main.tsx`

### Removed dead code

- `src/app/providers/LoadingProvider.tsx`
- `src/app/providers/loading-context.ts`
- `src/components/ui/Loader.tsx`

## Removed Inefficiencies

- Permanent cursor animation loop
- Eager WebGL vendor preloads on first navigation
- Eager hero asset preloads
- Loader infrastructure that no longer served the app shell
- Heavy vendor coupling in the initial Vite entry path
- Redundant rerenders from non-memoized pure components
- Excess `will-change` usage on large layout containers

## Future Optimization Ideas

- Self-host and preload the two production font files to reduce dependency on Google Fonts.
- Add AVIF/WebP variants for project preview images if those assets grow.
- Consider a static poster image for the hero scene to provide an even richer non-WebGL fallback.
- Add automated bundle budget checks in CI so regressions are caught before merge.
- Add RUM instrumentation for frame rate, interaction latency, and long tasks in production.

## Notes on Behavior Changes

- The hero avatar is now intentionally **intent-driven** on capable devices. This removes unnecessary startup cost and keeps the landing experience smooth.
- The tech stack canvas is now **progressively enhanced**. Lower-power devices stay on the text-first experience instead of paying for a decorative 3D effect.
