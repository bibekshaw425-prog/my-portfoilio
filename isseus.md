# Fix Broken Vite + React Portfolio → Clean SPA

This project was scaffolded from a "Fusion Starter" template that bakes in Express SSR, a server build pipeline, and `next-themes`. None of those belong in a static SPA portfolio. The fix is surgical: strip every server/Next.js artifact, rewrite the Vite config, and replace `next-themes` with a vanilla React context.

## Root Cause Analysis

| Symptom | Root Cause |
|---|---|
| **403 Restricted** | `server.fs.allow` set to `["./client", "./shared"]` — excludes the project root where [index.html](file:///c:/Users/SUBRATO%20KUNDU/Desktop/bibek-portfolio-pro-6e3%20%281%29/index.html) lives. Vite refuses to serve it. |
| **Red JSX errors** | `next-themes` has no types for a Vite project, and the Express server import in [vite.config.ts](file:///c:/Users/SUBRATO%20KUNDU/Desktop/bibek-portfolio-pro-6e3%20%281%29/vite.config.ts) pulls in Node types that conflict with the React DOM environment. |
| **Broken path aliases** | [tsconfig.json](file:///c:/Users/SUBRATO%20KUNDU/Desktop/bibek-portfolio-pro-6e3%20%281%29/tsconfig.json) `include` covers `server/**/*` and `shared/**/*`, mixing Node server code with client code. Aliases themselves (`@/*` → `./client/*`) are fine. |

---

## Proposed Changes

### Vite Config

#### [MODIFY] [vite.config.ts](file:///c:/Users/SUBRATO%20KUNDU/Desktop/bibek-portfolio-pro-6e3%20(1)/vite.config.ts)
Complete rewrite:
- Remove Express plugin and [createServer](file:///c:/Users/SUBRATO%20KUNDU/Desktop/bibek-portfolio-pro-6e3%20%281%29/server/index.ts#6-24) import
- Remove `server.fs.allow` / `server.fs.deny` entirely (defaults are correct)
- Change `build.outDir` from `dist/spa` to `dist`
- Keep `@/` alias and `react-swc` plugin
- Keep dev port at `5173` (standard Vite default)

#### [DELETE] [vite.config.server.ts](file:///c:/Users/SUBRATO%20KUNDU/Desktop/bibek-portfolio-pro-6e3%20(1)/vite.config.server.ts)
SSR server build config — not needed.

---

### Server & Shared Code (DELETE)

#### [DELETE] `server/` directory
Express server — not needed for SPA.

#### [DELETE] `shared/` directory
Only contains `DemoResponse` interface used by the deleted server.

#### [DELETE] `netlify/functions/` directory
Serverless function wrappers — not needed.

#### [DELETE] `.builder/` directory
Builder.io integration scaffold — not used.

#### [DELETE] `dist/` directory
Stale build artifacts.

#### [DELETE] `.dockerignore`
No Docker in an SPA.

#### [DELETE] `.npmrc`
Not needed for the SPA.

#### [DELETE] `pnpm-lock.yaml`
Project uses `npm` (has `package-lock.json`). Conflicting lockfile.

---

### TypeScript Config

#### [MODIFY] [tsconfig.json](file:///c:/Users/SUBRATO%20KUNDU/Desktop/bibek-portfolio-pro-6e3%20(1)/tsconfig.json)
- Remove `server/**/*` and `shared/**/*` from `include`
- Remove `vite.config.server.ts` from `include`
- Remove `@shared/*` path alias
- Keep `@/*` → `./client/*`

---

### Next.js Removal

#### [NEW] [ThemeProvider.tsx](file:///c:/Users/SUBRATO%20KUNDU/Desktop/bibek-portfolio-pro-6e3%20(1)/client/components/ThemeProvider.tsx)
Vanilla React context + `useEffect` that reads/writes `localStorage` and toggles the `dark` class on `<html>`. Exposes `ThemeProvider` and `useTheme` — same API surface as `next-themes` so the consuming code barely changes.

#### [MODIFY] [App.tsx](file:///c:/Users/SUBRATO%20KUNDU/Desktop/bibek-portfolio-pro-6e3%20(1)/client/App.tsx)
- Replace `import { ThemeProvider } from "next-themes"` → `from "@/components/ThemeProvider"`

#### [MODIFY] [Navbar.tsx](file:///c:/Users/SUBRATO%20KUNDU/Desktop/bibek-portfolio-pro-6e3%20(1)/client/components/Navbar.tsx)
- Replace `import { useTheme } from "next-themes"` → `from "@/components/ThemeProvider"`

#### [MODIFY] [sonner.tsx](file:///c:/Users/SUBRATO%20KUNDU/Desktop/bibek-portfolio-pro-6e3%20(1)/client/components/ui/sonner.tsx)
- Replace `import { useTheme } from "next-themes"` → `from "@/components/ThemeProvider"`

---

### Package & Deploy Config

#### [MODIFY] [package.json](file:///c:/Users/SUBRATO%20KUNDU/Desktop/bibek-portfolio-pro-6e3%20(1)/package.json)

**Scripts** — replace with:
```json
"dev": "vite",
"build": "tsc && vite build",
"preview": "vite preview"
```

**Remove from `dependencies`**: `dotenv`, `express`, `serverless-http`, `zod` (unused by client)

**Remove from `devDependencies`**: `next-themes`, `@types/cors`, `@types/express`, `cors`, `tsx`, `serverless-http`

**Remove** `pkg` block and `packageManager` field.

#### [MODIFY] [netlify.toml](file:///c:/Users/SUBRATO%20KUNDU/Desktop/bibek-portfolio-pro-6e3%20(1)/netlify.toml)
Simplify to static SPA hosting — `publish = "dist"`, SPA redirect `/* → /index.html 200`.

#### [MODIFY] [index.html](file:///c:/Users/SUBRATO%20KUNDU/Desktop/bibek-portfolio-pro-6e3%20(1)/index.html)
- Update `<title>` to something meaningful
- Entry script path `/client/main.tsx` is correct for Vite (resolved relative to project root)

#### [MODIFY] [components.json](file:///c:/Users/SUBRATO%20KUNDU/Desktop/bibek-portfolio-pro-6e3%20(1)/components.json)
- Fix `tailwind.css` from `client/index.css` to `client/global.css`

---

## Verification Plan

### Automated Tests
1. **Existing unit test**: `npx vitest --run` — runs `client/lib/utils.spec.ts`
2. **TypeScript check**: `npx tsc --noEmit` — must pass with zero errors
3. **Build**: `npm run build` — must produce `dist/index.html` and bundled assets
4. **Preview**: `npm run preview` — start the preview server and verify it serves the site

### Manual Verification
- Run `npm run dev`, open browser, confirm the portfolio loads with no console errors
- Toggle the theme via the navbar button, confirm dark/light switch works
