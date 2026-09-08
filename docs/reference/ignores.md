# Reference: Ignore Patterns

`@gv-tech/oxc-config/ignores` exports three ignore lists plus file-pattern
helpers. Ported from `@gv-tech/eslint-config` `commonIgnores` and
adapted to Oxlint/Oxfmt gitignore-style matching (patterns are rooted
at the directory containing the config file).

## File patterns

| Export         | Value                                         |
| -------------- | --------------------------------------------- |
| `jsFiles`      | `**/*.js`, `**/*.jsx`, `**/*.mjs`, `**/*.cjs` |
| `tsFiles`      | `**/*.ts`, `**/*.tsx`, `**/*.mts`, `**/*.cts` |
| `allJsTsFiles` | JS + TS combined                              |

## Ignore lists

- **`commonIgnores`** — `node_modules`, `dist`, `build`, `out`,
  `coverage`, `.next`, `.turbo`, `.cache`, VCS/tooling dirs (`.git`,
  `.husky`, `.vscode`, `.idea`), env files, lockfiles, TS/config files,
  `public`, `assets`, build artifacts.
- **`viteIgnores`** — `commonIgnores` plus `playwright-report/`,
  `test-results/`. Used by the `vite` and `recommended` presets.
- **`nextIgnores`** — `commonIgnores` plus `.next/`, `out/`,
  `next-env.d.ts`. Used by the `next` preset.

## Customizing

Presets set `ignorePatterns` for you. To add project-specific ignores,
extend in your config — do not edit the package:

```ts
import { vite } from '@gv-tech/oxc-config/vite';

export default {
  extends: [vite],
  ignorePatterns: ['custom-folder/**'],
};
```
