# CODEBUDDY.md

This file provides guidance to CodeBuddy Code when working with code in this repository.

## Project overview
- `tiny-future` is a zero-dependency TypeScript utility that exposes a `Future<T>` wrapper to resolve or reject a Promise outside its executor, inspired by C# `TaskCompletionSource`.
- Only one source module (`src/future.ts`) and one Vitest test suite (`tests/future.test.ts`) drive the entire package, keeping the architecture intentionally small.

## Repository layout
- `src/future.ts` – single exported `Future<T>` class built atop `Promise.withResolvers` with a fallback to manual resolver wiring.
- `tests/future.test.ts` – Vitest test file exercising resolve/reject paths and a fallback scenario that deletes `Promise.withResolvers`.
- `dist/` – bundler outputs (`dist/main.cjs`, `dist/main.mjs`, `dist/types.d.ts`) created by Vite.
- Config root: `package.json`, `tsconfig.json`, `eslint.config.mjs`, `vite.config.ts`, `typedoc.json`, `jsr.json`.

## Development requirements
- Use `pnpm` for all scripts. Install dependencies with `pnpm install`.
- Tests and coverage run with Vitest.

## Core commands
| Task | Command |
|------|---------|
| Install deps | `pnpm install` |
| Type check | `pnpm run check` |
| Lint | `pnpm run lint` |
| Build bundles | `pnpm run build` |
| Run tests | `pnpm run test` |
| Watch tests | `pnpm run test:watch` |
| Test UI | `pnpm run test:ui` |
| Generate docs | `pnpm run docs` |

### Running a single test
Use Vitest's filter flag: `pnpm exec vitest run -t "Resolve"` to target a specific test.

## Architecture & implementation notes
- `Future<T>` stores `resolve`, `reject`, and `promise` on the instance. When `Promise.withResolvers` exists it simply forwards the tuple; otherwise it instantiates a Promise and captures the resolve/reject closures manually.
- The library exposes CJS, ESM, and `.d.ts` outputs via Vite with `vite-plugin-dts`.
- Tests execute twice: once under native `Promise.withResolvers` and once after deleting it, ensuring both code paths stay healthy.
- API docs are generated via TypeDoc and hosted on GitHub Pages.

## Tooling constraints
- TypeScript runs in strict "bundler" mode with no emit; all enforcement happens at compile time. Any new files must live under `src/` to be type-checked.
- ESLint layers `@eslint/js` recommended rules plus `typescript-eslint` strict + stylistic presets; `dist/` is ignored.

## Publishing overview
- The package is published to both npm and JSR.
- `prepublishOnly` ensures `pnpm run build` runs before any publish.
