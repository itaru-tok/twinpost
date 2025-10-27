# Repository Guidelines

## Project Structure & Module Organization
- app/ uses the Next.js App Router; organize features under route segments and keep server actions near the components they serve.
- components/ holds reusable React pieces; components/ui/ keeps primitives that should stay stateless and composable.
- lib/ collects server and client helpers (Supabase, Prisma, Stripe) while prisma/ stores schema.prisma, migrations, and seed helpers.
- public/ contains static assets, styles/ manages Tailwind layers, types/ centralizes shared TypeScript types, and scripts/ houses maintenance tooling like startpack-init.

## Build, Test, and Development Commands
- npm install installs dependencies (Node 20+ required as enforced in package.json engines).
- npm run dev starts the Next.js dev server on http://localhost:3002 with hot reload.
- npm run build compiles a production bundle; run before deploying or profiling.
- npm run start serves the built bundle locally to mirror production.
- npm run lint runs ESLint with the next/core-web-vitals preset; fix any errors before review.
- npx prisma migrate dev applies local schema changes; ensure DATABASE_URL points to a reachable Supabase instance.
- npx prisma studio (optional) opens Prisma Studio for inspecting or editing data during development.

## Coding Style & Naming Conventions
- Prefer functional React components with hooks; lean on server components unless client interactivity is required.
- Format with 2-space indentation, single quotes, and trailing commas where TypeScript allows; linting enforces consistency.
- Name exported components PascalCase, hooks camelCase prefixed with use, and keep file names kebab-case (header-wrapper.tsx) except for Next route files like page.tsx.
- Co-locate Tailwind utility classes with components; extract shared styling to styles/globals.css or Tailwind layers when repetition grows.

## Testing Guidelines
- Automated tests are not yet configured; introduce Vitest or Playwright via an npm run test script before committing sizable suites.
- Until tooling lands, capture manual smoke steps in PRs and cover critical flows (auth, billing, posting) with a reviewer checklist.
- For schema edits, commit the generated migration under prisma/migrations and refresh any seed scripts to reflect new structures.

## Commit & Pull Request Guidelines
- Write commit subjects in the imperative mood under 72 chars (e.g., Add pricing toggle) and squash noisy fixups.
- Reference related issues or tickets in the body and call out breaking changes or required data migrations explicitly.
- PRs should summarize intent, list commands executed (npm run lint, prisma migrate dev), attach UI screenshots or GIFs, and flag environment variable changes (.env.supabase.example, .env.neon.example).
- Request review only after verifying migrations run locally and any feature flags or toggles behave as expected.

## Security & Configuration Tips
- Copy .env.supabase.example to .env and supply Supabase credentials; never commit secrets—rotate keys through the Supabase dashboard.
- Run npx prisma generate whenever schema.prisma changes so @prisma/client stays in sync.
- Confine sensitive logic to server-only modules (app/api/* or lib/) to avoid exposing keys or database calls to the browser.
