# Content Guide

This project keeps personal content in `src/content`. Update those files instead of editing JSX.

## Hero section

File: `src/content/site.ts`

Update:

- `heroContent.greeting`
- `heroContent.name`
- `heroContent.title`
- `heroContent.punchline`
- `heroContent.summary`
- `heroContent.primaryCta`
- `heroContent.secondaryCta`

## About section

File: `src/content/site.ts`

Update:

- `aboutContent.headline`
- `aboutContent.description`

## Experience section

File: `src/content/experience.ts`

Each entry controls:

- company
- role
- start / end dates
- location
- short summary
- achievement bullets
- technology pills

## Projects section

File: `src/content/projects.ts`

Each project controls:

- name
- description
- highlight bullets
- tool tags
- external link label
- external link URL
- preview image path

Preview art files live in `public/assets/images/projects`.

## Skills section

File: `src/content/skills.ts`

Update:

- `skillContent` for grouped skill pills
- `educationContent` for school details
- `achievementContent` for competitive programming or other wins

## Expertise cards

File: `src/content/expertise.ts`

Use this to change the "focus area" cards near the top of the page.

## Contact links

Files:

- `src/content/site.ts`
- `src/content/socials.ts`

Update:

- email
- phone
- location
- resume URL
- profile URLs

## Resume download

File path:

- `public/assets/resume/Akshay_Gupta_Resume.pdf`

If you replace the file, keep the path the same or update `contactContent.resumeUrl` and `heroContent.secondaryCta.href`.

## Placeholders

If a future update does not have a public URL yet, use a placeholder like `<<ADD_GITHUB_URL>>`.

Store those values only in `src/content/socials.ts` or `src/content/projects.ts`.

Until replaced, the UI renders them as non-clickable placeholders instead of broken links.
