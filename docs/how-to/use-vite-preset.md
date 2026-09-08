# How to: Use the Vite Preset

Goal: lint a Vite + React + TypeScript project (SPA, library, or any
non-Next.js React app).

## Steps

1. Install:

   ```sh
   npm i -D @gv-tech/oxc-config oxlint oxfmt typescript
   ```

2. Create `oxlint.config.ts`:

   ```ts
   import { defineConfig } from 'oxlint';
   import { vite } from '@gv-tech/oxc-config/vite';

   export default defineConfig({ extends: [vite] });
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
- The `vitest` plugin plus relaxed rules (`no-explicit-any`,
  `no-console`) for `**/*.test.*`, `**/*.spec.*`, `test/` and `tests/`.
- Relaxed rules for `vite.config.*` / `vitest.config.*`.
- `viteIgnores` (see [ignores reference](../reference/ignores.md)).

## See also

- [Use the Next.js preset](use-next-preset.md) — for Next.js apps.
- [Enable type-aware linting](enable-type-aware.md) — optional stricter checks.
- [Vite vs Next](../explanation/vite-vs-next.md) — why two presets exist.
