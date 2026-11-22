# `@gv-tech/oxc-config`

Shareable [Oxlint](https://oxc.rs/docs/guide/usage/linter) + [Oxfmt](https://oxc.rs/docs/guide/usage/formatter) configuration for Garcia Ventures projects. One package, modern Oxc toolchain, sensible defaults for TypeScript + React.

## Features

- 🚀 **Oxlint + Oxfmt** — linting and formatting from a single package
- 📦 **Modular presets** — `library`, `node`, `react`, `vite`, `next`, `expo`, plus `configure()` for project overrides
- 🔷 **TypeScript-first** — strict-but-adoptable rules mirroring `@gv-tech/eslint-config`
- ⚛️ **Vite, Next.js, and Expo** — dedicated presets with framework plugins, envs, and ignores
- 💅 **Prettier-compatible style** — Oxfmt defaults mirror `@eng618/prettier-config` (120 cols, single quotes, trailing commas, sorted imports/package.json/Tailwind)
- 🛡️ **Type-safe** — presets are typed with the real upstream `oxlint`/`oxfmt` config types, so `defineConfig` consumption needs no casts

## Requirements

- Node.js `>=22.18.0` (required for `oxlint.config.ts` / `oxfmt.config.ts`)
- `oxlint` `>=1.94.0` and/or `oxfmt` `>=0.79.0`
- `typescript` `>=6.0.0` (optional peer; the package builds on TypeScript 7 and its types are verified against TypeScript 6 — see `test/compat-ts6`)
- `oxlint-tsgolint` `>=7.0.2007` (optional peer, only for type-aware linting)

## Installation

```sh
npm i -D @gv-tech/oxc-config oxlint oxfmt
# pnpm: pnpm add -D @gv-tech/oxc-config oxlint oxfmt
# yarn:  yarn add --dev @gv-tech/oxc-config oxlint oxfmt
# bun:   bun add -d @gv-tech/oxc-config oxlint oxfmt
```

TypeScript projects also need `typescript >= 6`. Type-aware linting additionally needs `oxlint-tsgolint`:

```sh
npm i -D typescript oxlint-tsgolint
```

## Usage

Pass a preset as the root config. Oxlint does not inherit `env`, `ignorePatterns`, or `settings` through `extends`, so `defineConfig({ extends: [vite] })` drops browser/node globals, ignore patterns, and the React version. `defineConfig(vite)` keeps them.

`recommended` is the TypeScript library preset (Node globals, no React). Releases before this one pointed `recommended` at the Vite preset. Vite apps should import `vite`.

### TypeScript library (default)

```ts
import { recommended } from '@gv-tech/oxc-config/recommended';
// oxlint.config.ts
import { defineConfig } from 'oxlint';

export default defineConfig(recommended);
```

```ts
import { oxfmtConfig } from '@gv-tech/oxc-config/oxfmt';
// oxfmt.config.ts
import { defineConfig } from 'oxfmt';

export default defineConfig({ ...oxfmtConfig });
```

```sh
oxlint
oxfmt --check .
oxfmt --write .
```

### Vite + React + TypeScript

```ts
import { vite } from '@gv-tech/oxc-config/vite';
// oxlint.config.ts
import { defineConfig } from 'oxlint';

export default defineConfig(vite);
```

### Next.js + TypeScript

```ts
import { next } from '@gv-tech/oxc-config/next';
// oxlint.config.ts
import { defineConfig } from 'oxlint';

export default defineConfig(next);
```

### Node.js service or CLI

`node` is the library preset plus `no-console: off`. Browser globals stay off, so a JS file that references `window` fails `no-undef`. TypeScript files turn `no-undef` off.

```ts
import { node } from '@gv-tech/oxc-config/node';
// oxlint.config.ts
import { defineConfig } from 'oxlint';

export default defineConfig(node);
```

### Expo / React Native

```ts
import { expo } from '@gv-tech/oxc-config/expo';
// oxlint.config.ts
import { defineConfig } from 'oxlint';

export default defineConfig(expo);
```

### React without a framework preset

```ts
import { react } from '@gv-tech/oxc-config/react';
// oxlint.config.ts
import { defineConfig } from 'oxlint';

export default defineConfig(react);
```

### Opt-in type-aware linting

`options.typeAware` is only legal on the repository root config. Requires `oxlint-tsgolint`. Rules are scoped to TypeScript files.

```ts
import { configure } from '@gv-tech/oxc-config';
// oxlint.config.ts
import { defineConfig } from 'oxlint';

export default defineConfig(configure('vite', { typeAware: true }));
```

In a monorepo, a nested `oxlint.config.ts` must not set that option. Use `configure('next', { typeAware: 'rules' })` in the package and `oxlint --type-aware` from the root. See [Use in a monorepo](docs/how-to/use-in-a-monorepo.md).

### Overriding rules

```ts
import { configure } from '@gv-tech/oxc-config';
// oxlint.config.ts
import { defineConfig } from 'oxlint';

export default defineConfig(
  configure('vite', {
    rules: { 'no-console': 'off' },
    ignorePatterns: ['generated/**'],
    reactVersion: '18.3.1',
    overrides: [
      {
        files: ['scripts/**/*'],
        rules: { 'no-console': 'off' },
      },
    ],
  }),
);
```

```ts
import { oxfmtConfig } from '@gv-tech/oxc-config/oxfmt';
// oxfmt.config.ts
import { defineConfig } from 'oxfmt';

export default defineConfig({
  ...oxfmtConfig,
  printWidth: 100, // project override
  sortTailwindcss: false, // disable Tailwind sorting if unused
});
```

## Available presets

| Export                            | Description                                                                   |
| --------------------------------- | ----------------------------------------------------------------------------- |
| `@gv-tech/oxc-config`             | `recommended` (default). Also exports `configure`.                            |
| `@gv-tech/oxc-config/base`        | Core JS rules, `eslint`/`unicorn`/`oxc`, browser + node                       |
| `@gv-tech/oxc-config/typescript`  | `base` + `typescript`/`import`. `no-undef` off in TS files                    |
| `@gv-tech/oxc-config/library`     | `typescript`, Node globals only, `no-console` warns                           |
| `@gv-tech/oxc-config/react`       | `typescript` + `react`/`jsx-a11y`, React 19                                   |
| `@gv-tech/oxc-config/vite`        | `react` + Vitest, browser + node, test overrides                              |
| `@gv-tech/oxc-config/next`        | `react` + `nextjs` plugin                                                     |
| `@gv-tech/oxc-config/expo`        | `react`, no browser globals, `android/` and `ios/` ignored                    |
| `@gv-tech/oxc-config/node`        | `library` + `no-console` off                                                  |
| `@gv-tech/oxc-config/recommended` | Same object as `library`                                                      |
| `@gv-tech/oxc-config/configure`   | `configure(preset, overrides)` merges a root config                           |
| `@gv-tech/oxc-config/type-aware`  | Opt-in type-aware rules. Prefer `configure(preset, { typeAware: true })`      |
| `@gv-tech/oxc-config/oxfmt`       | Shared Oxfmt config (`oxfmtConfig`)                                           |
| `@gv-tech/oxc-config/ignores`     | `commonIgnores`, `viteIgnores`, `nextIgnores`, `expoIgnores`, `formatIgnores` |

## `vite` vs `next` — which preset?

|                | `vite`                                    | `next`                          |
| -------------- | ----------------------------------------- | ------------------------------- |
| Use for        | Vite SPAs, libraries, non-Next React apps | Next.js App/Pages Router apps   |
| Extra plugin   | `vitest` (+ `jest` in tests)              | `nextjs`                        |
| Env            | browser + node                            | browser + node                  |
| Ignores        | `dist`, `coverage`, `playwright-report`   | `.next`, `out`, `next-env.d.ts` |
| Test overrides | Vitest globals, relaxed `any`/`console`   | Jest, relaxed `any`/`console`   |

Rule of thumb: Next.js → `next`. Expo or React Native → `expo`. Other React → `vite`. A Node service or CLI → `node`. A TypeScript library → `library` (also the default `recommended`). Plain JS that runs in both environments → `base`.

## Oxfmt style

Mirrors [`@eng618/prettier-config`](https://github.com/eng618/prettier-config):

`printWidth: 120`, `singleQuote: true`, `trailingComma: "all"`, `tabWidth: 2`, `useTabs: false`, `endOfLine: "lf"`, `arrowParens: "always"`, `bracketSpacing: true`, `objectWrap: "preserve"` — plus built-ins that replace Prettier plugins: `sortImports`, `sortPackageJson` (`sortScripts`), `sortTailwindcss` (`clsx/cn/cva/tw`), `jsdoc` (softened: `balance` + `keep`, caps on), and a `*.yml/*.yaml` override (`singleQuote: false`).

Known gaps (no Oxfmt equivalent): `curly` enforcement (covered by the core formatter), `multiline-arrays`/`arrayWrap` (arrays fill-pack to `printWidth`; see Oxfmt options ref for per-project workarounds) and `requirePragma` for `CHANGELOG.md`.

## Editor setup

Install [`oxc.oxc-vscode`](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode) and set it as the formatter:

```json
{
  "editor.defaultFormatter": "oxc.oxc-vscode",
  "editor.formatOnSave": true
}
```

## Scripts and CI

```json
{
  "scripts": {
    "lint": "oxlint .",
    "format": "oxfmt --write .",
    "format:ci": "oxfmt --check ."
  }
}
```

```yaml
- run: npx oxlint
- run: npx oxfmt --check .
```

Do not pass `oxlint -c` with an absolute path. Oxlint 1.94 loads that config but does not apply its `ignorePatterns`. A relative `-c oxlint.config.ts`, or no `-c` at all, applies them. `-c` also disables nested config lookup.

## Standalone use (no `package.json`)

Every release publishes a ready-to-use `oxfmt.json` generated from
`oxfmtConfig`, plus a `gv-oxfmt` runner that bundles it. Ideal for
formatting repos that don't (or can't) install this package.

> Note: `oxfmt -c` accepts a local file path only, not a URL — so
> download the JSON first, or use the `gv-oxfmt` wrapper.

### Option A — `gv-oxfmt` wrapper (no download, no config file)

```sh
npx --yes --package oxfmt --package @gv-tech/oxc-config@latest gv-oxfmt --write .
npx --yes --package oxfmt --package @gv-tech/oxc-config@latest gv-oxfmt --check .
```

```sh
bun x --package oxfmt --package @gv-tech/oxc-config@latest gv-oxfmt --write .
bun x --package oxfmt --package @gv-tech/oxc-config@latest gv-oxfmt --check .
```

### Option B — download `oxfmt.json`, then run `oxfmt`

```sh
curl -fsSL https://cdn.jsdelivr.net/npm/@gv-tech/oxc-config@latest/dist/oxfmt.json -o .oxfmtrc.json
npx -y oxfmt@latest --write .
```

```sh
curl -fsSL https://cdn.jsdelivr.net/npm/@gv-tech/oxc-config@latest/dist/oxfmt.json -o .oxfmtrc.json
bun x oxfmt@latest --write .
```

(Unpkg works too:
`https://unpkg.com/@gv-tech/oxc-config@latest/dist/oxfmt.json`.)

### Option C — reference the JSON inside an installed project

```sh
npx oxfmt -c ./node_modules/@gv-tech/oxc-config/dist/oxfmt.json --write .
```

```sh
bun x oxfmt -c ./node_modules/@gv-tech/oxc-config/dist/oxfmt.json --write .
```

## Documentation

Full docs follow the [Diátaxis](https://diataxis.fr/) framework in [`docs/`](docs/):

- Tutorials: [Getting Started](docs/tutorials/getting-started.md)
- How-tos: [Vite](docs/how-to/use-vite-preset.md) · [Next.js](docs/how-to/use-next-preset.md) · [Monorepo](docs/how-to/use-in-a-monorepo.md) · [Overrides](docs/how-to/override-rules.md) · [Oxfmt](docs/how-to/configure-oxfmt.md) · [Type-aware](docs/how-to/enable-type-aware.md) · [Migration](docs/how-to/migrate-from-eslint-prettier.md)
- Reference: [Presets](docs/reference/presets.md) · [Oxfmt options](docs/reference/oxfmt-options.md) · [Ignores](docs/reference/ignores.md)
- Explanation: [Design philosophy](docs/explanation/design-philosophy.md) · [Vite vs Next](docs/explanation/vite-vs-next.md) · [Prettier parity](docs/explanation/prettier-parity.md)

Contributor process: [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md) · [`docs/BRANCHING.md`](docs/BRANCHING.md) · [`SECURITY.md`](SECURITY.md)

## License

MIT © Garcia Ventures / Eric N. Garcia. See [LICENSE](LICENSE).
