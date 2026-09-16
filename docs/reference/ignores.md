# Reference: Ignore Patterns

`@gv-tech/oxc-config/ignores` exports lint ignore lists, a formatter
ignore list, plus file-pattern helpers. Ported from
`@gv-tech/eslint-config` `commonIgnores` and adapted to Oxlint/Oxfmt
gitignore-style matching (patterns are rooted at the directory
containing the config file).

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
- **`formatIgnores`** — generated or foreign artifacts only
  (`node_modules`, build output, lockfiles, caches, env files), plus
  `CHANGELOG.md`, which release-please generates and owns in its own
  style (formatting it would fail CI on every release PR). Used by
  `oxfmtConfig`. Deliberately excludes source files, configs,
  workflows, and docs so they stay formattable.

## Lint vs format ignores

The lint lists (`commonIgnores`, `viteIgnores`, `nextIgnores`) are
broad — they skip lockfiles, TS configs, and docs that Oxlint should
never process. The formatter list (`formatIgnores`) is narrow: if a
formatter ignore swallowed a committable file, tools like lint-staged
would fail whenever every staged file is ignored.

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
