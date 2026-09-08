# How to: Enable Type-Aware Linting

Goal: add stricter, type-informed rules on top of any preset.

## Steps

1. Install the type-aware runner:

   ```sh
   npm i -D oxlint-tsgolint
   ```

2. Extend `typeAware` **after** your framework preset:

   ```ts
   // oxlint.config.ts
   import { defineConfig } from 'oxlint';
   import { vite } from '@gv-tech/oxc-config/vite';
   import { typeAware } from '@gv-tech/oxc-config/type-aware';

   export default defineConfig({ extends: [vite, typeAware] });
   ```

3. Verify:

   ```sh
   npx oxlint
   ```

## What you get

Type-aware rules scoped to `**/*.{ts,tsx}` only (JS stays fast):

| Rule                                  | Severity |
| ------------------------------------- | -------- |
| `typescript/no-floating-promises`     | error    |
| `typescript/no-misused-promises`      | warn     |
| `typescript/await-thenable`           | warn     |
| `typescript/no-unnecessary-condition` | off      |

## Notes

- Requires type information, so lint runs are slower — keep it out of
  the default `recommended` preset intentionally.
- Tune per project with
  [overrides](override-rules.md).
