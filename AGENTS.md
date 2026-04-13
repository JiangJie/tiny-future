# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## Project overview

`tiny-future` is a zero-dependency TypeScript utility that exposes a `Future<T>` class — a wrapper allowing you to resolve or reject a `Promise` outside its executor, inspired by C# `TaskCompletionSource`.

The architecture is intentionally minimal: one source module (`src/future.ts`) and one Vitest test suite (`tests/future.test.ts`).

## Repository layout

| Path | Description |
|------|-------------|
| `src/future.ts` | Single exported `Future<T>` class |
| `tests/future.test.ts` | Vitest tests covering resolve/reject and `Promise.withResolvers` fallback |
| `dist/` | Build outputs: `main.cjs`, `main.mjs`, `types.d.ts` |
| `vite.config.ts` | Vite build config + Vitest test config |
| `eslint.config.mjs` | ESLint flat config with `@stylistic` and `typescript-eslint` |
| `tsconfig.json` | TypeScript strict bundler mode, no emit |
| `typedoc.json` | TypeDoc config for API docs |
| `jsr.json` | JSR publish config |

## Development

- **Package manager**: pnpm (required)
- **Runtime**: Node.js
- **Language**: TypeScript (strict mode, bundler resolution)
- **Build**: Vite 8 + `vite-plugin-dts`
- **Test**: Vitest 4 with v8 coverage
- **Lint**: ESLint 10 + `typescript-eslint` (strict + stylistic) + `@stylistic/eslint-plugin`

### Core commands

| Task | Command |
|------|---------|
| Install deps | `pnpm install` |
| Type check | `pnpm run check` |
| Lint | `pnpm run lint` |
| Build | `pnpm run build` |
| Test (with coverage) | `pnpm run test` |
| Test (watch) | `pnpm run test:watch` |
| Generate docs | `pnpm run docs` |

Run a single test by name: `pnpm exec vitest run -t "Resolve"`.

## Architecture notes

- `Future<T>` exposes `resolve`, `reject`, and `promise` as instance properties.
- Constructor uses `Promise.withResolvers()` when available (ES2024+); falls back to manual `new Promise()` closure capture for older environments.
- Tests run the same suite twice: once with native `Promise.withResolvers`, once after deleting it, to cover both code paths.
- Build produces CJS + ESM + `.d.ts` via Vite library mode with Rollup (`topLevelVar: false`, treeshake with `moduleSideEffects: false`).

## Tooling constraints

- TypeScript uses `"moduleResolution": "bundler"` with `noEmit: true` — all enforcement is compile-time only. New source files must go under `src/`.
- ESLint ignores `dist/` and `coverage/`. Custom `@stylistic` rules enforce semicolons, comma-dangle, and member-delimiter-style.
- `prebuild` runs `check` + `lint` before every build.

## Publishing

- Published to both **npm** and **JSR**.
- `prepublishOnly` triggers `pnpm run build` automatically.
- Package ships `dist/`, `LICENSE`, `README.md`, `CHANGELOG.md` (see `files` in `package.json`).
