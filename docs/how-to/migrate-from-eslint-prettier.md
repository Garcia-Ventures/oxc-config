# How to: Migrate from ESLint + Prettier

Goal: replace `@gv-tech/eslint-config` + `@eng618/prettier-config`
with `@gv-tech/oxc-config` in an existing project.

## 1. Swap dependencies

```sh
npm rm @gv-tech/eslint-config @eng618/prettier-config eslint prettier
npm i -D @gv-tech/oxc-config oxlint oxfmt
```

## 2. Replace `eslint.config.mjs` with `oxlint.config.ts`

| Before                                  | After                                    |
| --------------------------------------- | ---------------------------------------- |
| `javascriptRecommended` / `recommended` | `recommended`                            |
| `typescript`                            | `typescript` (or `react` for React apps) |
| `next` / `nextjs`                       | `next`                                   |
| `prettier`                              | delete — formatting moves to Oxfmt       |

```ts
// oxlint.config.ts
import { defineConfig } from 'oxlint';
import { next } from '@gv-tech/oxc-config/next';

export default defineConfig({ extends: [next] });
```

## 3. Replace Prettier config with `oxfmt.config.ts`

```ts
// oxfmt.config.ts
import { defineConfig } from 'oxfmt';
import { oxfmtConfig } from '@gv-tech/oxc-config/oxfmt';

export default defineConfig({ ...oxfmtConfig });
```

Remove any `"prettier": "@eng618/prettier-config"` key from
`package.json`. The Oxfmt style matches the old Prettier style, so
expect a small one-time diff, not a full reformat.

## 4. Update scripts

```json
{
  "scripts": {
    "lint": "oxlint .",
    "format": "oxfmt --write .",
    "format:ci": "oxfmt --check ."
  }
}
```

## 5. Check the known gaps

Read [Prettier parity](../explanation/prettier-parity.md) for plugin
mappings (`curly`, `multiline-arrays`, `requirePragma`) that have no
Oxfmt equivalent.

## 6. Run and converge

```sh
npx oxlint
npx oxfmt --write .
```

Commit the result as a standalone `chore: migrate to oxc` change so
the diff stays reviewable.
