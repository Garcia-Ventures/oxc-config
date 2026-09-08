# Explanation: Design Philosophy

> Explanation is **understanding-oriented**: background and reasoning.
> For instructions, see the [how-to guides](../how-to/); for exact
> values, see the [reference](../reference/presets.md).

## Why Oxc

Oxlint and Oxfmt are Rust-based and orders of magnitude faster than
ESLint + Prettier, with `defineConfig` TypeScript configs that make
shareable presets trivial (`extends: [...]` / object spread). One
package now covers both lint and format.

## Balanced strictness

Severity posture mirrors `@gv-tech/eslint-config`:

- `correctness: deny` — real bugs, CI-blocking (like `eslint:recommended` errors).
- `suspicious: warn` — adoptable warnings that don't block onboarding.
- `pedantic: off` — style-level opinions stay in the formatter, not the linter.
- Framework rules that were warnings in the ESLint setup (e.g. Next.js
  image/link rules) stay warnings here.

Strictness lives on a gradient: `base` → `typescript` → `react` →
`vite`/`next`, with `type-aware` as the opt-in top end (slower,
needs `oxlint-tsgolint`, hence excluded from the default).

## Layered composition

Each preset `extends` the previous one, so `vite` and `next` share the
same TypeScript + React foundation and differ only in framework
plugins, envs, overrides, and ignores. `recommended` is `vite` without
Next.js rules — the safest single default, and the package default
export.

## Formatting replaces plugins with built-ins

Prettier needed a plugin per concern (`organize-imports`,
`packagejson`, `tailwindcss`, `jsdoc`). Oxfmt ships these as core
options, so the shared config has zero plugin dependencies and no
version-drift between formatter plugins. See
[Prettier parity](prettier-parity.md).
