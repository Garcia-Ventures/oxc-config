# Explanation: Design Philosophy

> Explanation is **understanding-oriented**: background and reasoning.
> For instructions, see the [how-to guides](../how-to/); for exact
> values, see the [reference](../reference/presets.md).

## Why Oxc

Oxlint and Oxfmt are Rust-based and orders of magnitude faster than
ESLint + Prettier, with `defineConfig` TypeScript configs. One package
covers both lint and format. Oxlint's `extends` merges rules, plugins,
overrides, and categories, and it drops `env`, `ignorePatterns`, and
`settings`. Presets are therefore flat objects, and `configure()` merges
a project's overrides onto that object.

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

Each preset is built from the previous one in source, then published as
a single object: categories, plugins, rules, overrides, env, ignores,
and settings all sit on that object. `vite` and `next` share the
TypeScript + React foundation and differ in framework plugins, envs,
overrides, and ignores. `expo` is the React foundation without browser
globals. `node` and `library` stop before React.

`recommended` is `library`. That is the safe default for a repo that
is not a specific app. Vite, Next, and Expo projects pick those presets
by name.

## Formatting replaces plugins with built-ins

Prettier needed a plugin per concern (`organize-imports`,
`packagejson`, `tailwindcss`, `jsdoc`). Oxfmt ships these as core
options, so the shared config has zero plugin dependencies and no
version-drift between formatter plugins. See
[Prettier parity](prettier-parity.md).
