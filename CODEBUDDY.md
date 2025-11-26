# CODEBUDDY.md

This file provides guidance to CodeBuddy Code when working with code in this repository.

## Project overview
- `tiny-future` is a zero-dependency TypeScript utility that exposes a `Future<T>` wrapper to resolve or reject a Promise outside its executor, inspired by C# `TaskCompletionSource` (`README.md:12-74`, `src/future.ts:1-45`).
- Only one source module (`src/future.ts`) and one Deno test suite (`tests/future.test.ts`) drive the entire package, keeping the architecture intentionally small.

## Repository layout
- `src/future.ts` – single exported `Future<T>` class built atop `Promise.withResolvers` with a fallback to manual resolver wiring (`src/future.ts:31-43`).
- `tests/future.test.ts` – Deno test file exercising resolve/reject paths and a fallback scenario that deletes `Promise.withResolvers` (`tests/future.test.ts:4-48`).
- `docs/` – markdown API docs generated via TypeDoc (`docs/README.md`, `typedoc.json:1-16`).
- `dist/` – bundler outputs (`dist/main.cjs`, `dist/main.mjs`, `dist/types.d.ts`) created by Rollup (`rollup.config.mjs:4-43`, `package.json:8-11`).
- Config root: `package.json`, `tsconfig.json`, `eslint.config.mjs`, `rollup.config.mjs`, `typedoc.json`, `deno.json`, `jsr.json`.

## Development requirements
- Use `pnpm` for all scripts (see `package.json:21-33`). Install dependencies with `pnpm install` (the script set assumes pnpm).
- Tests and coverage run with the Deno runtime and rely on the import map defined in `deno.json` (`deno.json:1-7`). Ensure Deno is available locally.

## Core commands
| Task | Command | Source |
|------|---------|--------|
| Install deps | `pnpm install` | implied by pnpm-based scripts (`package.json:21-33`)
| Type check | `pnpm run check` → `pnpm exec tsc --noEmit` | `package.json:21-23`
| Lint | `pnpm run lint` → `pnpm exec eslint .` | `package.json:23-24`
| Clean + type + lint | `pnpm run prebuild` | `package.json:24`
| Build bundles | `pnpm run build` → `pnpm exec rollup --config rollup.config.mjs` | `package.json:25`, `rollup.config.mjs:4-43`
| Clean coverage | `pnpm run pretest` → `pnpm dlx rimraf coverage` | `package.json:26`
| Tests + LCOV | `pnpm run test` (runs `deno test --coverage` -> LCOV) | `package.json:26-28`
| HTML coverage | `pnpm run test:html` | `package.json:28-29`
| Docs | `pnpm run docs` | `package.json:30-31`, `typedoc.json:1-16`
| Publish precheck | `pnpm run prepublishOnly` (builds before publish) | `package.json:32-33`

### Running a single test
Use Deno's filter flag: `deno test tests/future.test.ts --filter "Resolve"` to target the "Resolve" step defined in the suite (`tests/future.test.ts:12-24`).

## Architecture & implementation notes
- `Future<T>` stores `resolve`, `reject`, and `promise` on the instance. When `Promise.withResolvers` exists it simply forwards the tuple; otherwise it instantiates a Promise and captures the resolve/reject closures manually (`src/future.ts:15-43`).
- The library exposes CJS, ESM, and `.d.ts` outputs. Rollup runs twice: once with the esbuild plugin for JS bundles and once with `rollup-plugin-dts` for types (`rollup.config.mjs:1-43`). Package entry fields mirror these outputs (`package.json:8-11`).
- Tests execute twice: once under native `Promise.withResolvers` and once after deleting it, ensuring both code paths stay healthy (`tests/future.test.ts:4-48`). Coverage is produced via `deno coverage` and exported as LCOV/HTML (`package.json:26-29`).
- API docs are regenerated with TypeDoc + `typedoc-plugin-markdown`, outputting table-formatted Markdown (`typedoc.json:1-16`). The generated docs live in `docs/` and are included in the npm/jsr publish list (`package.json:12-19`, `jsr.json:3-15`).

## Tooling constraints
- TypeScript runs in strict "bundler" mode with no emit; all enforcement happens at compile time (`tsconfig.json:3-30`). Any new files must live under `src/` to be type-checked.
- ESLint layers `@eslint/js` recommended rules plus `typescript-eslint` strict + stylistic presets; `dist/` is ignored so never edit generated artifacts manually (`eslint.config.mjs:1-13`).
- Tree-shaking is set to `"smallest"`, so avoid side effects in module top-level code (`rollup.config.mjs:17-41`).
- The Deno import map aliases `tiny-future` to the local source, which keeps tests aligned with the published entry (`deno.json:3-6`).

## Publishing overview
- The package is published to both npm and JSR; npm metadata (name, author, license) plus the publish include list are declared in `package.json:1-20`, while JSR configuration lives in `jsr.json:1-15`.
- `prepublishOnly` ensures `pnpm run build` runs before any publish, so never skip that hook when releasing (`package.json:32-33`).
