# Decisions

## 1. Content is separated from presentation

The original site structure mixed profile data directly into components. This package moves all editable portfolio content into typed modules under `src/content`, which makes maintenance easier and reduces accidental UI regressions during copy updates.

## 2. 3D responsibilities are isolated

Scene loading, decryption, lighting, interaction, and scroll choreography are separated into small modules under `src/lib/three` and `src/lib/animation`. That keeps the hero scene component readable and makes future scene swaps practical.

## 3. The tech stack scene uses generated badge textures

Instead of depending on a folder of hardcoded logo images, the floating orb scene generates badge textures at runtime from labels. This keeps the section self-contained and easier to customize.

## 4. Placeholders stay centralized

If a future content update is missing a profile URL or project link, placeholders stay in the content layer and render as non-clickable UI instead of broken links.

## 5. The visual system is deliberate and reusable

Shared variables, spacing, borders, and card treatments are centralized in `src/styles/global.css`. The site keeps a premium, motion-rich feel without relying on inconsistent per-component styling.

## 6. Smooth scroll is optional by capability

Scroll smoothing is only enabled for desktop-class environments without reduced-motion preference. This preserves the intended premium feel while keeping the mobile and accessibility path more robust.
