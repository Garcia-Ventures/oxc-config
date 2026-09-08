# `@gv-tech/oxc-config`

Shareable [Oxlint](https://oxc.rs/docs/guide/usage/linter) + [Oxfmt](https://oxc.rs/docs/guide/usage/formatter) configuration for Garcia Ventures projects. One package, modern Oxc toolchain, sensible defaults for TypeScript + React.

## Features

- 🚀 **Oxlint + Oxfmt** — linting and formatting from a single package
- 📦 **Modular presets** — `base`, `typescript`, `react`, `vite`, `next`, `recommended`, `type-aware`
- 🔷 **TypeScript-first** — strict-but-adoptable rules mirroring `@gv-tech/eslint-config`
- ⚛️ **Vite and Next.js** — dedicated presets with framework-specific plugins and ignores
- 💅 **Prettier-compatible style** — Oxfmt defaults mirror `@eng618/prettier-config` (120 cols, single quotes, trailing commas, sorted imports/package.json/Tailwind)
- 🛡️ **Type-safe** — full TypeScript types, `defineConfig` consumption

## Requirements

- Node.js `>=22.18.0` (required for `oxlint.config.ts` / `oxfmt.config.ts`)
- `oxlint` `>=1.0.0` and/or `oxfmt` `>=0.9.0`

## Installation

```sh
npm i -D @gv-tech/oxc-config oxlint oxfmt
# pnpm: pnpm add -D @gv-tech/oxc-config oxlint oxfmt
# yarn:  yarn add --dev @gv-tech/oxc-config oxlint oxfmt
# bun:   bun add -d @gv-tech/oxc-config oxlint oxfmt
```

TypeScript projects also need `typescript >= 5`. Type-aware linting additionally needs `oxlint-tsgolint`:

```sh
npm i -D typescript oxlint-tsgolint
```

## Usage

### Recommended (Vite-oriented default)

```ts
// oxlint.config.ts
import { defineConfig } from 'oxlint';
import { recommended } from '@gv-tech/oxc-config/recommended';

export default defineConfig({ extends: [recommended] });
```

```ts
// oxfmt.config.ts
import { defineConfig } from 'oxfmt';
import { oxfmtConfig } from '@gv-tech/oxc-config/oxfmt';

export default defineConfig({ ...oxfmtConfig });
```

```sh
oxlint
oxfmt --check .
oxfmt --write .
```

### Vite + React + TypeScript

```ts
// oxlint.config.ts
import { defineConfig } from 'oxlint';
import { vite } from '@gv-tech/oxc-config/vite';

export default defineConfig({ extends: [vite] });
```

### Next.js + TypeScript

```ts
// oxlint.config.ts
import { defineConfig } from 'oxlint';
import { next } from '@gv-tech/oxc-config/next';

export default defineConfig({ extends: [next] });
```

### TypeScript library (no framework)

```ts
// oxlint.config.ts
import { defineConfig } from 'oxlint';
import { typescript } from '@gv-tech/oxc-config/typescript';
// or add React without a framework preset:
import { react } from '@gv-tech/oxc-config/react';

export default defineConfig({ extends: [react] });
```

### Opt-in type-aware linting

```ts
// oxlint.config.ts
import { defineConfig } from 'oxlint';
import { vite } from '@gv-tech/oxc-config/vite';
import { typeAware } from '@gv-tech/oxc-config/type-aware';

export default defineConfig({ extends: [vite, typeAware] });
```

Requires `oxlint-tsgolint` installed. Scoped to `**/*.{ts,tsx}` so JS stays fast.

### Overriding rules

```ts
// oxlint.config.ts
import { defineConfig } from 'oxlint';
import { vite } from '@gv-tech/oxc-config/vite';

export default defineConfig({
  extends: [vite],
  rules: { 'eslint/no-console': 'off' },
  overrides: [
    {
      files: ['scripts/**/*'],
      rules: { 'eslint/no-console': 'off' },
    },
  ],
});
```

```ts
// oxfmt.config.ts
import { defineConfig } from 'oxfmt';
import { oxfmtConfig } from '@gv-tech/oxc-config/oxfmt';

export default defineConfig({
  ...oxfmtConfig,
  printWidth: 100, // project override
  sortTailwindcss: false, // disable Tailwind sorting if unused
});
```

## Available presets

| Export | Description |
|---|---|
| `@gv-tech/oxc-config` | `recommended` (default export) |
| `@gv-tech/oxc-config/base` | Core JS rules, `eslint`/`unicorn`/`oxc` plugins |
| `@gv-tech/oxc-config/typescript` | `base` + `typescript`/`import` plugins |
| `@gv-tech/oxc-config/react` | `typescript` + `react`/`jsx-a11y` |
| `@gv-tech/oxc-config/vite` | `react` + `vitest`, browser/node envs, test overrides |
| `@gv-tech/oxc-config/next` | `react` + `nextjs` plugin, Next.js ignores |
| `@gv-tech/oxc-config/recommended` | Vite-oriented default (base → ts → react → vite-light) |
| `@gv-tech/oxc-config/type-aware` | Opt-in `oxlint-tsgolint` rules (extends any preset) |
| `@gv-tech/oxc-config/oxfmt` | Shared Oxfmt config (`oxfmtConfig`) |
| `@gv-tech/oxc-config/ignores` | `commonIgnores`, `viteIgnores`, `nextIgnores`, file patterns |

## `vite` vs `next` — which preset?

| | `vite` | `next` |
|---|---|---|
| Use for | Vite SPAs, libraries, non-Next React apps | Next.js App/Pages Router apps |
| Extra plugin | `vitest` (+ `jest` in tests) | `nextjs` |
| Env | browser + node | browser + node |
| Ignores | `dist`, `coverage`, `playwright-report` | `.next`, `out`, `next-env.d.ts` |
| Test overrides | Vitest globals, relaxed `any`/`console` | Jest, relaxed `any`/`console` |

Rule of thumb: Next.js project → `next`. Everything else React → `vite` (or `recommended`, which is `vite`-light). Plain TS, no React → `typescript`.

## Oxfmt style

Mirrors [`@eng618/prettier-config`](https://github.com/eng618/prettier-config):

`printWidth: 120`, `singleQuote: true`, `trailingComma: "all"`, `tabWidth: 2`, `useTabs: false`, `endOfLine: "lf"`, `arrowParens: "always"`, `bracketSpacing: true` — plus built-ins that replace Prettier plugins: `sortImports`, `sortPackageJson` (`sortScripts`), `sortTailwindcss` (`clsx/cn/cva/tw`), `jsdoc`, and a `*.yml/*.yaml` override (`singleQuote: false`).

Known gaps (no Oxfmt equivalent): `curly`/`multiline-arrays` enforcement (covered by the core formatter) and `requirePragma` for `CHANGELOG.md`.

## Editor setup

VSCode with [`oxc.oxc-vscode`](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode): format-on-save via Oxfmt, inline Oxlint diagnostics. See [`.vscode/settings.json`](.vscode/settings.json).

## Scripts for consumers

```json
{
  "scripts": {
    "lint": "oxlint .",
    "format": "oxfmt --write .",
    "format:ci": "oxfmt --check ."
  }
}
```

## Documentation

Full docs follow the [Diátaxis](https://diataxis.fr/) framework in [`docs/`](docs/):

- Tutorials: [Getting Started](docs/tutorials/getting-started.md)
- How-tos: [Vite](docs/how-to/use-vite-preset.md) · [Next.js](docs/how-to/use-next-preset.md) · [Overrides](docs/how-to/override-rules.md) · [Oxfmt](docs/how-to/configure-oxfmt.md) · [Type-aware](docs/how-to/enable-type-aware.md) · [Migration](docs/how-to/migrate-from-eslint-prettier.md)
- Reference: [Presets](docs/reference/presets.md) · [Oxfmt options](docs/reference/oxfmt-options.md) · [Ignores](docs/reference/ignores.md)
- Explanation: [Design philosophy](docs/explanation/design-philosophy.md) · [Vite vs Next](docs/explanation/vite-vs-next.md) · [Prettier parity](docs/explanation/prettier-parity.md)

Contributor process: [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md) · [`docs/BRANCHING.md`](docs/BRANCHING.md) · [`SECURITY.md`](SECURITY.md)

## License

MIT © Garcia Ventures / Eric N. Garcia. See [LICENSE](LICENSE).
