# Tutorial: Getting Started with `@gv-tech/oxc-config`

New to the Oxc toolchain? This hands-on tutorial walks you through adding
shared linting and formatting to a fresh TypeScript project. By the end,
`oxlint` and `oxfmt --check` will both pass.

> Tutorials are **learning-oriented**: follow along step by step, no prior
> Oxc knowledge assumed. For specific tasks, see the [how-to guides](../how-to/).

## Prerequisites

- Node.js `>=22.18.0` (check with `node --version`)
- An existing TypeScript project

## 1. Install the packages

```sh
npm i -D @gv-tech/oxc-config oxlint oxfmt typescript
```

Peers: `oxlint >= 1.94.0`, `oxfmt >= 0.79.0`, `typescript >= 6`.

## 2. Add the lint config

Create `oxlint.config.ts` in your project root. Pass the preset as the
config object. Do not wrap it in `extends`.

```ts
import { recommended } from '@gv-tech/oxc-config/recommended';
import { defineConfig } from 'oxlint';

export default defineConfig(recommended);
```

`recommended` is a TypeScript library preset: Node globals, no React.
Swap the import when the project has a framework:

| Project             | Import                                       |
| ------------------- | -------------------------------------------- |
| Vite + React        | `vite` from `@gv-tech/oxc-config/vite`       |
| Next.js             | `next` from `@gv-tech/oxc-config/next`       |
| Expo / React Native | `expo` from `@gv-tech/oxc-config/expo`       |
| Node service or CLI | `node` from `@gv-tech/oxc-config/node`       |
| TypeScript library  | `library` from `@gv-tech/oxc-config/library` |

## 3. Add the shared format config

Create `oxfmt.config.ts` in your project root:

```ts
import { oxfmtConfig } from '@gv-tech/oxc-config/oxfmt';
import { defineConfig } from 'oxfmt';

export default defineConfig({ ...oxfmtConfig });
```

## 4. Run the tools

```sh
npx oxlint
npx oxfmt --check .
```

If `oxfmt` reports files needing formatting, apply it:

```sh
npx oxfmt --write .
```

## 5. Wire up scripts, CI, and the editor

Add to your `package.json`:

```json
{
  "scripts": {
    "lint": "oxlint .",
    "format": "oxfmt --write .",
    "format:ci": "oxfmt --check ."
  }
}
```

In CI:

```yaml
- run: npx oxlint
- run: npx oxfmt --check .
```

Install [`oxc.oxc-vscode`](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode)
and set it as the default formatter:

```json
{
  "editor.defaultFormatter": "oxc.oxc-vscode",
  "editor.formatOnSave": true
}
```

## What you just did

- `recommended` gave you base + TypeScript rules, Node globals, and the
  shared ignore list (see [presets reference](../reference/presets.md)).
- `oxfmtConfig` gave you the Garcia Ventures code style: 120 columns,
  single quotes, sorted imports (see [Oxfmt options](../reference/oxfmt-options.md)).

## Next steps

- Vite app? [Use the Vite preset](../how-to/use-vite-preset.md).
- Next.js app? [Use the Next.js preset](../how-to/use-next-preset.md).
- Several packages in one repo? [Use in a monorepo](../how-to/use-in-a-monorepo.md).
- Coming from ESLint/Prettier? [Migrate from ESLint + Prettier](../how-to/migrate-from-eslint-prettier.md).
