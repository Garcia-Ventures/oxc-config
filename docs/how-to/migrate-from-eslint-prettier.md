# How to: Migrate from ESLint + Prettier

Goal: replace `@gv-tech/eslint-config` + `@eng618/prettier-config`
with `@gv-tech/oxc-config` in an existing project.

## 1. Swap dependencies

```sh
npm rm @gv-tech/eslint-config @eng618/prettier-config eslint prettier
npm i -D @gv-tech/oxc-config oxlint oxfmt
```

`oxlint` must be `>= 1.94.0` and `oxfmt` must be `>= 0.79.0`.

## 2. Replace `eslint.config.mjs` with `oxlint.config.ts`

| Before                                  | After                                              |
| --------------------------------------- | -------------------------------------------------- |
| `javascriptRecommended` / `recommended` | `recommended` (`library`) or `vite` for a Vite app |
| `typescript`                            | `library` or `typescript`                          |
| `next` / `nextjs`                       | `next`                                             |
| Node-only                               | `node`                                             |
| `prettier`                              | delete — formatting moves to Oxfmt                 |

Pass the preset as the root config. `extends` drops env, ignores, and settings.

```ts
import { next } from '@gv-tech/oxc-config/next';
import { defineConfig } from 'oxlint';

export default defineConfig(next);
```

## 3. Replace Prettier config with `oxfmt.config.ts`

```ts
import { oxfmtConfig } from '@gv-tech/oxc-config/oxfmt';
import { defineConfig } from 'oxfmt';

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
