# Reference: Ignore Patterns

`@gv-tech/oxc-config/ignores` exports lint ignore lists, a formatter
ignore list, plus file-pattern helpers. Patterns are gitignore-style
and rooted at the directory that contains the config file.

## File patterns

| Export         | Value                                         |
| -------------- | --------------------------------------------- |
| `jsFiles`      | `**/*.js`, `**/*.jsx`, `**/*.mjs`, `**/*.cjs` |
| `tsFiles`      | `**/*.ts`, `**/*.tsx`, `**/*.mts`, `**/*.cts` |
| `allJsTsFiles` | JS + TS combined                              |

## Ignore lists

- **`commonIgnores`** — generated and foreign artifacts: `node_modules`,
  `dist`, `build`, `out`, `coverage`, `.next`, `.expo`, `.turbo`,
  caches, VCS and editor dirs, env files, lockfiles, `next-env.d.ts`,
  `nativewind-env.d.ts`. Used by every lint preset.
- **`viteIgnores`** — `commonIgnores` plus `playwright-report/` and
  `test-results/`. Used by `vite`.
- **`nextIgnores`** — `commonIgnores` (`next-env.d.ts` is already there).
- **`expoIgnores`** — `commonIgnores` plus `android/` and `ios/`.
  Used by `expo`.
- **`formatIgnores`** — generated or foreign artifacts only, plus
  `CHANGELOG.md`, which release-please generates and owns. Used by
  `oxfmtConfig`. Source, configs, workflows, and docs stay formattable.

Lint ignores do **not** include `scripts/**`, `vite.config.*`,
`metro.config.*`, `tsconfig*.json`, markdown, or license files. Tool
configs stay linted so the preset overrides for them can match. Oxlint
does not lint markdown.

## Lint vs format ignores

The formatter list stays narrow on purpose. If a formatter ignore
swallowed a committable file, lint-staged would fail whenever every
staged file is ignored. `public/**` and `assets/**` are formatter
ignores. They are not lint ignores.

## Customizing

Presets set `ignorePatterns` on the root object. Append project paths
with `configure`. Assigning `ignorePatterns` yourself replaces the list
only if you spread the preset and then overwrite the field. `configure`
appends.

```ts
import { configure } from '@gv-tech/oxc-config';
import { defineConfig } from 'oxlint';

export default defineConfig(
  configure('vite', {
    ignorePatterns: ['generated/**'],
  }),
);
```

Do not wrap the preset in `extends`. That drops `ignorePatterns`
entirely. Pass `-c` as a relative path, or omit it. Oxlint 1.94 does
not apply `ignorePatterns` when `-c` is an absolute path.
