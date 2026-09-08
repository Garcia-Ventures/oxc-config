# Reference: Presets

> Reference is **information-oriented**: exact composition of every
> export. For step-by-step instructions, see the [how-to guides](../how-to/).

## Exports

| Subpath         | Named export                                                                        | Extends                 |
| --------------- | ----------------------------------------------------------------------------------- | ----------------------- |
| `.`             | `recommended` (default)                                                             | `vite`                  |
| `./base`        | `base`                                                                              | —                       |
| `./typescript`  | `typescript`                                                                        | `base`                  |
| `./react`       | `react`                                                                             | `typescript`            |
| `./vite`        | `vite`                                                                              | `react`                 |
| `./next`        | `next` (+ `nextjs` alias on `.`)                                                    | `react`                 |
| `./recommended` | `recommended`                                                                       | `vite`                  |
| `./type-aware`  | `typeAware`                                                                         | — (additive, goes last) |
| `./oxfmt`       | `oxfmtConfig`                                                                       | —                       |
| `./ignores`     | `commonIgnores`, `viteIgnores`, `nextIgnores`, `jsFiles`, `tsFiles`, `allJsTsFiles` | —                       |

## `base`

- `categories`: `correctness: deny`, `suspicious: warn`, `pedantic: off`
- `plugins`: `eslint`, `unicorn`, `oxc`
- `env`: `browser`, `node`
- `rules`: `eslint/no-unused-vars: off`,
  `unicorn/prefer-node-protocol: warn`, `eslint/no-console: warn`,
  `eslint/no-debugger: deny`, `eslint/eqeqeq: [warn, always]`,
  `eslint/no-var: deny`, `eslint/prefer-const: warn`,
  `oxc/only-used-in-recursion: warn`

## `typescript`

- `plugins`: `eslint`, `typescript`, `import`, `unicorn`, `oxc`
- `overrides` for `**/*.{ts,tsx,mts,cts}`:
  `typescript/no-explicit-any: warn`,
  `typescript/no-unused-vars: error` (`^_` ignore patterns),
  `typescript/consistent-type-imports: warn`,
  `typescript/no-non-null-assertion: warn`,
  `import/no-cycle: warn`, `import/no-duplicates: warn`
- `overrides` for `*.config.*` / `*.setup.*`:
  `import/no-default-export: off`

## `react`

- `plugins`: adds `react`, `jsx-a11y`
- `settings.react.version`: `19.0.0`
- `rules`: `react/self-closing-comp: warn`,
  `react/jsx-no-useless-fragment: warn`, `react/jsx-key: error`,
  `jsx-a11y/alt-text: warn`, `jsx-a11y/anchor-is-valid: warn`

## `vite`

- `plugins`: adds `vitest`
- Test override (`**/*.test.*`, `**/*.spec.*`, `test/`, `tests/`):
  `vitest` + `jest` plugins, relaxed `no-explicit-any`,
  `no-non-null-assertion`, `no-console`
- `vite.config.*` / `vitest.config.*` override: relaxed
  `no-default-export`, `no-console`

## `next`

- `plugins`: adds `nextjs` (built-in, no install needed)
- `rules`: `nextjs/no-html-link-for-pages: warn`,
  `nextjs/no-img-element: warn`
- Overrides for `next.config.*`, `app/`, `next-env.d.ts`, and Jest tests

## `recommended`

`{ extends: [vite] }` — Vite-oriented but safe for any TS/React
project without Next.js rules.

## `typeAware`

Overrides for `**/*.{ts,tsx}`:
`typescript/no-floating-promises: error`,
`typescript/no-misused-promises: warn`,
`typescript/await-thenable: warn`,
`typescript/no-unnecessary-condition: off`.
Requires `oxlint-tsgolint`.
