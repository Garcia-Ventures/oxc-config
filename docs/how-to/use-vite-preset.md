# How to: Use the Vite Preset

Goal: lint a Vite + React + TypeScript project (SPA or any non-Next React app).

## Steps

1. Install:

   ```sh
   npm i -D @gv-tech/oxc-config oxlint oxfmt typescript
   ```

2. Create `oxlint.config.ts`. Pass `vite` as the root config:

   ```ts
   import { vite } from '@gv-tech/oxc-config/vite';
   import { defineConfig } from 'oxlint';

   export default defineConfig(vite);
   ```

3. Create `oxfmt.config.ts`:

   ```ts
   import { oxfmtConfig } from '@gv-tech/oxc-config/oxfmt';
   import { defineConfig } from 'oxfmt';

   export default defineConfig({ ...oxfmtConfig });
   ```

4. Verify:

   ```sh
   npx oxlint
   npx oxfmt --check .
   ```

## What you get

- Everything in `react` (TypeScript + React + import rules, React 19).
- The `vitest` plugin plus relaxed rules (`no-explicit-any`,
  `no-console`) for `**/*.test.*`, `**/*.spec.*`, `test/` and `tests/`.
- Relaxed rules for `vite.config.*` / `vitest.config.*`. Those files are
  linted. They are not in the ignore list.
- `viteIgnores` (see [ignores reference](../reference/ignores.md)).
- Browser and Node globals, so `window` is defined in JS files.

## See also

- [Use the Next.js preset](use-next-preset.md) — for Next.js apps.
- [Enable type-aware linting](enable-type-aware.md) — optional stricter checks.
- [Vite vs Next](../explanation/vite-vs-next.md) — why two presets exist.
- [Override rules](override-rules.md) — `configure(vite, { reactVersion })` for React 18.
