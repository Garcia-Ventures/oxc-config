# How to: Use the Next.js Preset

Goal: lint a Next.js + TypeScript project (App Router or Pages Router).

## Steps

1. Install:

   ```sh
   npm i -D @gv-tech/oxc-config oxlint oxfmt typescript
   ```

   No extra plugin install needed — `nextjs` is a built-in Oxlint plugin.

2. Create `oxlint.config.ts`:

   ```ts
   import { defineConfig } from 'oxlint';
   import { next } from '@gv-tech/oxc-config/next';

   export default defineConfig({ extends: [next] });
   ```

3. Create `oxfmt.config.ts`:

   ```ts
   import { defineConfig } from 'oxfmt';
   import { oxfmtConfig } from '@gv-tech/oxc-config/oxfmt';

   export default defineConfig({ ...oxfmtConfig });
   ```

4. Verify:

   ```sh
   npx oxlint
   npx oxfmt --check .
   ```

## What you get

- Everything in `react` (TypeScript + React + import rules).
- The `nextjs` plugin: `no-html-link-for-pages` and `no-img-element`
  as warnings (adoptable; tighten to `error` per project if desired).
- `nextIgnores` (`.next/`, `out/`, `next-env.d.ts` — see
  [ignores reference](../reference/ignores.md)).
- Relaxed rules for `next.config.*` and `app/` directories, plus Jest
  test overrides.

## See also

- [Use the Vite preset](use-vite-preset.md) — for non-Next.js React apps.
- [Override rules and options](override-rules.md) — e.g. promoting
  Next.js warnings to errors.
