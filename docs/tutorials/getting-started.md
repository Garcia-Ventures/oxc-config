# Tutorial: Getting Started with `@gv-tech/oxc-config`

New to the Oxc toolchain? This hands-on tutorial walks you through adding
shared linting and formatting to a fresh TypeScript project. By the end,
`oxlint` and `oxfmt --check` will both pass.

> Tutorials are **learning-oriented**: follow along step by step, no prior
> Oxc knowledge assumed. For specific tasks, see the [how-to guides](../how-to/).

## Prerequisites

- Node.js `>=22.18.0` (check with `node --version`)
- An existing TypeScript project (Vite React template works well)

## 1. Install the packages

```sh
npm i -D @gv-tech/oxc-config oxlint oxfmt typescript
```

## 2. Add the recommended lint config

Create `oxlint.config.ts` in your project root:

```ts
import { defineConfig } from 'oxlint';
import { recommended } from '@gv-tech/oxc-config/recommended';

export default defineConfig({ extends: [recommended] });
```

## 3. Add the shared format config

Create `oxfmt.config.ts` in your project root:

```ts
import { defineConfig } from 'oxfmt';
import { oxfmtConfig } from '@gv-tech/oxc-config/oxfmt';

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

## 5. Wire up scripts and the editor

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

Install the [`oxc.oxc-vscode`](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode)
extension for inline diagnostics and format-on-save.

## What you just did

- `recommended` gave you base + TypeScript + React + Vite-light rules
  (see [presets reference](../reference/presets.md)).
- `oxfmtConfig` gave you the Garcia Ventures code style: 120 columns,
  single quotes, sorted imports (see [Oxfmt options](../reference/oxfmt-options.md)).

## Next steps

- Vite app? Switch to the dedicated preset: [Use the Vite preset](../how-to/use-vite-preset.md).
- Next.js app? [Use the Next.js preset](../how-to/use-next-preset.md).
- Coming from ESLint/Prettier? [Migrate from ESLint + Prettier](../how-to/migrate-from-eslint-prettier.md).
