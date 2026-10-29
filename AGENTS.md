<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Wanderlust Resources (client)

Single Next.js 16 App Router app — not a monorepo. No tests or CI exist yet, so don't invent test commands. The backend lives in a sibling folder outside this repo — see the Backend section below. Linked-but-missing routes: the Footer's `/help`, `/terms`, `/privacy` (404); `/profile` and `/my-bookings` exist but render placeholder/mock content.

The block above is managed by `next dev` (via `experimental.agentFeedback: true` in `next.config.ts`; it preserves everything outside the markers). Add custom notes only below the END marker.

## Commands

npm is the package manager (use `package-lock.json`; ignore the yarn/pnpm/bun alternatives in the README).

- `npm run dev` — dev server (Turbopack; it's the default bundler for dev *and build* in Next 16 — `--webpack` opts out)
- `npm run lint` — runs bare `eslint` over the whole project (flat config `eslint.config.mjs`); scope it with `npm run lint -- <path>`
- `npx tsc --noEmit` — typecheck; there is no `typecheck` script (`next build` also typechecks)
- `npm run build` — production build

Next 16 removed `next lint`, and `next build` no longer runs ESLint. Verify with `npm run lint` **and** `npx tsc --noEmit` separately before finishing.

Typecheck gotchas:

- On a fresh clone `npx tsc --noEmit` fails until `next dev` or `next build` has run once: `next-env.d.ts` (generated, gitignored — don't edit) imports `./.next/dev/types/*.d.ts`, and those generated files also declare the global `PageProps`/`LayoutProps`/`RouteContext` helpers pages depend on.
- A placeholder route file that isn't a module (e.g. an empty `page.tsx`) fails with `TS2306: ... is not a module` coming from the generated `.next/dev/types/validator.ts`. Fill it in or delete it — the error points at generated code, not at anything you changed.
- If lint/tsc failures point at `src/components/destination/EditDestinationDialog.tsx` (`react-hooks/set-state-in-effect`, TS2345), they're pre-existing — confirm the failure isn't yours before chasing it.

## Next.js 16 specifics (docs bundled at `node_modules/next/dist/docs/`)

- `next.config.ts` currently sets `cacheComponents: false` and `partialPrefetching: false` — use ordinary Next data fetching; don't apply `"use cache"`/Cache Components patterns unless you flip those flags too. It also sets `reactCompiler: true`: components must stay pure — impure renders and calling `setState` synchronously inside `useEffect` are flagged (that rule is an **error** in this repo's lint).
- `params` / `searchParams` are Promises — `await` them. Use the generated **global** helpers `PageProps<'/route'>`, `LayoutProps<'/route'>`, `RouteContext<'/route'>` (no import needed; `src/app/layout.tsx` already uses `LayoutProps<"/">`). They're generated — see the typecheck gotchas above.
- Middleware file is `proxy.ts` exporting `proxy`; `middleware.ts` and the edge runtime are deprecated. (None exists in this repo yet.)

## UI stack — shadcn "base-nova" + Tailwind v4

- shadcn components are built on `@base-ui/react` (Base UI), **not Radix**. Add components with `npx shadcn add <component>` (config: `components.json`); don't hand-write Radix-style APIs.
- `cn` comes from the `cn` npm package — import it from `"cn"` directly (`src/lib/utils.ts` only re-exports it). There is no separate clsx/tailwind-merge setup: `cn` itself does tailwind-style merging, so `className` overrides on shadcn components reliably win over the component's base classes.
- Tailwind v4 is CSS-first: no `tailwind.config.*` or `postcss.config.*` file. `src/app/globals.css` holds the imports (`tailwindcss`, `tw-animate-css`, `shadcn/tailwind.css`), theme tokens — including the custom `--color-brand` used as `bg-brand` — the class-based `.dark` variant, and oklch CSS variables; the `*.css` Turbopack loader is wired in `next.config.ts`.

## Layout

- Path alias: `@/*` → `./src/*`
- `src/app` routes · `src/components` page sections composed by `src/app/page.tsx` (feature subfolders: `home/`, `destination/`, `my-booking/`) · `src/components/ui` shadcn components only · `src/lib` shared modules (`utils.ts`, `api.ts`, `auth.ts`, `auth-client.ts`)

## Auth — better-auth (runs inside the Next app, not the Express API)

- Server config `src/lib/auth.ts` (email+password enabled, `mongodbAdapter`), client `src/lib/auth-client.ts`, handler `src/app/api/auth/[...all]/route.ts`. It opens its **own** MongoDB connection to the same Atlas database `wanderlust_resources` — auth traffic never passes through the Express server.
- `.env` (gitignored) must provide `MONGODB_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` or auth breaks on a fresh checkout; `NEXT_PUBLIC_API_URL` is optional. The backend server has its own separate `.env` with `MONGODB_URL`.
- Consumers: Navbar (`authClient.useSession()` + `signOut`), `/login` and `/signup` (`signIn.email` / `signUp.email`), the booking form (books as the current user). The browser calls `/api/auth/*` same-origin — `BETTER_AUTH_URL` is read without a `NEXT_PUBLIC_` prefix so it's `undefined` client-side; the same-origin fallback is what makes it work. Don't "fix" that by prefixing it.

## Backend (sibling folder, not in this repo)

- The API server is at `../wonderlast-resources-server` — one level up from the repo root, and the folder name really is misspelled ("wonderlast").
- Express 5 (ESM, `"type": "module"`) + MongoDB Atlas. Run it with `npm start` (→ `node index.js`); it listens on port 8000 and connects to Atlas on startup (`MONGODB_URL` in its `.env`, `PORT` optional) — it crashes at startup if the connection fails. CORS headers are open (needed: the client runs on :3000).
- Routes (all in `index.js`):
  - `GET /destinations` → `{ success, destinations }`, newest first. A second, duplicate `GET /destinations` later in the file is dead code — Express keeps the first registration; don't "fix" the client to expect a raw array.
  - `GET` / `PATCH` / `DELETE` /destinations/:id → raw document / raw Mongo results, **no** `{ success }` envelope.
  - `POST /add-destination` → inserts the body **as-is with no server-side validation** and returns the raw `insertOne` result (the client form does the field validation).
  - `POST /bookings` → inserts a booking. `GET /my-bookings/:email` filters with `req.params` instead of `req.params.email`, so it currently never matches — expect `[]` until that's fixed server-side.
- API base: `src/lib/api.ts` exports `apiBase` (`NEXT_PUBLIC_API_URL` ?? `http://localhost:8000`) and `fetchDestinations()` (expects `{ success, destinations }`; start the server to see data, otherwise `/destinations` shows its error + retry state). **Only `fetchDestinations` uses `apiBase`** — the detail page, edit/delete dialogs, booking submit, and the add-destination form all hardcode `http://localhost:8000`, so changing `NEXT_PUBLIC_API_URL` alone doesn't repoint the whole app.
- The form in `src/app/add-destination/page.tsx` **is** wired: client-side validate → `POST http://localhost:8000/add-destination` → `router.push('/destinations')`.
- `next.config.ts` allows **any https host** in `images.remotePatterns` because `imageUrl` values are user-entered — `next/image` on `/destinations` needs this; don't narrow it to one host without handling the form too.
