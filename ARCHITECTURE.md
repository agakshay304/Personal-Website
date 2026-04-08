# Architecture

## Package layout

```text
akshay-personal-website/
  public/
    assets/
    draco/
    models/
  src/
    app/
      providers/
    components/
      layout/
      sections/
      three/
      ui/
    constants/
    content/
    hooks/
    lib/
      animation/
      three/
    styles/
    types/
    utils/
```

## Rendering flow

1. `src/main.tsx` boots the React app and loads global styles.
2. `src/App.tsx` wraps the site with `LoadingProvider`.
3. `LoadingProvider` shows the loader until the hero scene reports readiness.
4. `AppLayout` mounts global chrome: navbar, social rail, cursor, and smooth-scroll wrapper.
5. Page sections render in sequence as a single-scroll experience.

## Component composition

- `layout` components manage persistent frame-level UI
- `sections` own user-facing page blocks and consume content data
- `three` components render the hero character scene and the floating tech scene
- `ui` components hold reusable presentation primitives such as pills and headings

This separation keeps section files focused on layout and copy while scene code remains isolated.

## Content model

The site uses typed content modules instead of inline strings inside components.

- all reusable shapes are defined in `src/types/content.ts`
- content is authored in small focused modules under `src/content`
- `src/content/index.ts` assembles the final `siteContent` object

This makes future edits low-risk and keeps placeholders localized.

## Animation and 3D layer

### Hero scene

- implemented in `src/components/three/HeroScene.tsx`
- uses raw Three.js for direct control over the encrypted GLTF load path
- decryption is isolated in `src/lib/three/decrypt.ts`
- character, lighting, interaction, and animation helpers live in `src/lib/three`
- GSAP scroll timelines are separated into `src/lib/animation/characterScroll.ts`

### Text motion

- GSAP `SplitText` helpers are centralized in `src/lib/animation/splitText.ts`
- `src/App.tsx` applies the initial hero reveal and section text effects once the loader completes

### Tech stack scene

- implemented in `src/components/three/TechSphereScene.tsx`
- uses React Three Fiber for the interactive canvas layer
- badge textures are generated on the fly from skill labels rather than stored as static image assets

## Extension points

- add another section by introducing a new file in `src/components/sections` and a matching content module if needed
- add a new social/profile link in `src/content/socials.ts`
- replace project preview art in `public/assets/images/projects`
- swap the hero model by replacing files in `public/models` as long as naming and animation expectations remain compatible
- add analytics or a contact backend later without rewriting section components
