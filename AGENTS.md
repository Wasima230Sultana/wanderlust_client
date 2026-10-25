<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Wanderlust Resources (client)

Single Next.js 16 App Router app — not a monorepo. No tests or CI exist yet, so don't invent test commands. The backend lives in a sibling folder outside this repo — see the Backend section below. Several routes referenced in UI links (e.g. `/destinations`) don't exist yet.

The block above is managed by `next dev` (it preserves everything outside the markers). Add custom notes only below the END marker.

## Commands

npm is the package manager (use `package-lock.json`; ignore the yarn/pnpm/bun alternatives in the README).

- `npm run dev` — dev server (Turbopack; it's the default bundler for dev *and build* in Next 16 — `--webpack` opts out)
- `npm run lint` — runs bare `eslint` over the whole project (flat config `eslint.config.mjs`); scope it with `npm run lint -- <path>`
- `npx tsc --noEmit` — typecheck; there is no `typecheck` script (`next build` also typechecks)
- `npm run build` — production build

Next 16 removed `next lint`, and `next build` no longer lints. Verify with `npm run lint` **and** `npx tsc --noEmit` separately before finishing.

Typecheck gotchas:

- On a fresh clone `npx tsc --noEmit` fails until `next dev` or `next build` has run once: `next-env.d.ts` (generated — don't edit) imports `./.next/types/*.d.ts`, and dev emits its copy into `.next/dev/types` (tsconfig includes both).
- A placeholder route file that isn't a module (e.g. an empty `page.tsx`) fails with `TS2306: ... is not a module` coming from the generated `.next/dev/types/validator.ts`. Fill it in or delete it — the error points at generated code, not at anything you changed.

## Next.js 16 specifics (docs bundled at `node_modules/next/dist/docs/`)

- `next.config.ts` enables `cacheComponents` + `partialPrefetching`: data fetching is dynamic by default. Cache explicitly with the `"use cache"` directive; wrap per-request async data in `<Suspense>` with a fallback. Never export a `runtime` segment config from a route — Cache Components is Node.js runtime only (edge unsupported).
- `params` / `searchParams` are Promises — `await` them. Use the generated **global** helpers `PageProps<'/route'>`, `LayoutProps<'/route'>`, `RouteContext<'/route'>` (no import needed; `src/app/layout.tsx` already uses `LayoutProps<"/">`). They're generated — see the typecheck gotchas above.
- Middleware file is `proxy.ts` exporting `proxy`; `middleware.ts` and the edge runtime are deprecated.
- React Compiler is enabled (`reactCompiler: true`) — components must stay pure; impure renders and manual memoization patterns get flagged.

## UI stack — shadcn "base-nova" + Tailwind v4

- shadcn components are built on `@base-ui/react` (Base UI), **not Radix**. Add components with `npx shadcn add <component>` (config: `components.json`); don't hand-write Radix-style APIs.
- `cn` comes from the `cn` npm package — import it from `"cn"` directly (`src/lib/utils.ts` only re-exports it). There is no clsx/tailwind-merge setup.
- Tailwind v4 is CSS-first: no `tailwind.config.*` or `postcss.config.*` file. `src/app/globals.css` holds the imports (`tailwindcss`, `tw-animate-css`, `shadcn/tailwind.css`), theme tokens — including the custom `--color-brand` used as `bg-brand` — the class-based `.dark` variant, and oklch CSS variables; the `*.css` Turbopack loader is wired in `next.config.ts`.

## Layout

- Path alias: `@/*` → `./src/*`
- `src/app` routes · `src/components` page sections (composed by `src/app/page.tsx`) · `src/components/ui` shadcn components only · `src/lib/utils.ts` shared utils

## Backend (sibling folder, not in this repo)

- The API server is at `../wonderlast-resources-server` — one level up from the repo root, and the folder name really is misspelled ("wonderlast").
- Express 5 (ESM, `"type": "module"`) + MongoDB Atlas. Run it with `npm start` (→ `node index.js`); it listens on port `8000` and connects to Atlas on startup (`MONGODB_URL` in its `.env`, `PORT` optional) — it exits if the connection fails.
- `POST /add-destination` is the only data route: JSON body, validates required fields (returns 400 listing the missing ones), inserts into db `wanderlust_resources`, collection `destination`, returns 201 `{ success, destination }`. CORS headers are open (needed: the client runs on :3000).
- The form in `src/app/add-destination/page.tsx` is **not wired to it yet** (client-side only: validate → success notice → reset). When wiring it up, POST to `${NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/add-destination`.
