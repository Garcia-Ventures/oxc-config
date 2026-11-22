# Reference: Presets

> Reference is **information-oriented**: exact composition of every
> export. For step-by-step instructions, see the [how-to guides](../how-to/).

Every lint preset is one flat object. Pass it to `defineConfig` directly.
`configure(preset, overrides)` merges project fields onto that object.
`extends` does not carry `env`, `ignorePatterns`, or `settings`.

## Exports

| Subpath         | Named export                                                                                 | Built from   |
| --------------- | -------------------------------------------------------------------------------------------- | ------------ |
| `.`             | `recommended` (default), `configure`, `nextjs`                                               | `library`    |
| `./base`        | `base`                                                                                       | —            |
| `./typescript`  | `typescript`                                                                                 | `base`       |
| `./library`     | `library`                                                                                    | `typescript` |
| `./react`       | `react`                                                                                      | `typescript` |
| `./vite`        | `vite`                                                                                       | `react`      |
| `./next`        | `next`                                                                                       | `react`      |
| `./expo`        | `expo`                                                                                       | `react`      |
| `./node`        | `node`                                                                                       | `library`    |
| `./recommended` | `recommended` (same object as `library`)                                                     | `library`    |
| `./configure`   | `configure`                                                                                  | —            |
| `./type-aware`  | `typeAware`                                                                                  | — (additive) |
| `./oxfmt`       | `oxfmtConfig`                                                                                | —            |
| `./ignores`     | `commonIgnores`, `viteIgnores`, `nextIgnores`, `expoIgnores`, `formatIgnores`, file patterns | —            |

`nextjs` on `.` is the same object as `next`.

## `configure`

```ts
configure(preset, overrides?)
```

`preset` is a config object or one of `base`, `typescript`, `library`,
`node`, `react`, `vite`, `next`, `expo`, `recommended`.

| Option           | Merge                                                                                                      |
| ---------------- | ---------------------------------------------------------------------------------------------------------- |
| `rules`          | later keys win                                                                                             |
| `categories`     | later keys win                                                                                             |
| `plugins`        | union                                                                                                      |
| `overrides`      | appended                                                                                                   |
| `ignorePatterns` | appended                                                                                                   |
| `env`            | shallow merge, explicit `false` wins                                                                       |
| `settings`       | shallow merge, `settings.react` deep-merged                                                                |
| `options`        | shallow merge                                                                                              |
| `globals`        | shallow merge                                                                                              |
| `reactVersion`   | sets `settings.react.version`                                                                              |
| `typeAware`      | `true` sets `options.typeAware` and appends the type-aware overrides. `'rules'` appends the overrides only |

## `base`

- `categories`: `correctness: deny`, `suspicious: warn`, `pedantic: off`
- `plugins`: `eslint`, `unicorn`, `oxc`
- `env`: `browser: true`, `node: true`
- `rules`: `eslint/no-unused-vars: off`, `no-undef: deny`,
  `unicorn/prefer-node-protocol: warn`, `no-console: warn`,
  `no-debugger: deny`, `eqeqeq: [warn, always]`,
  `no-var: deny`, `prefer-const: warn`,
  `oxc/only-used-in-recursion: warn`
- `ignorePatterns`: `commonIgnores`

## `typescript`

- `plugins`: adds `typescript`, `import`
- `overrides` for `**/*.{ts,tsx,mts,cts}`:
  `no-undef: off`,
  `typescript/no-explicit-any: warn`,
  `eslint/no-unused-vars: error` (`^_` ignore patterns),
  `typescript/consistent-type-imports: warn`,
  `typescript/no-non-null-assertion: warn`,
  `import/no-cycle: warn`, `import/no-duplicates: warn`
- `overrides` for `*.config.*` / `*.setup.*`:
  `import/no-default-export: off`

## `library`

- `typescript` with `env`: `browser: false`, `node: true`
- `no-console` stays `warn`
- This is `recommended`

## `react`

- `plugins`: adds `react`, `jsx-a11y`
- `settings.react.version`: `19.0.0`
- `rules`: `react/self-closing-comp: warn`,
  `react/jsx-no-useless-fragment: warn`, `react/jsx-key: error`,
  `jsx-a11y/alt-text: warn`, `jsx-a11y/anchor-is-valid: warn`

## `vite`

- `plugins`: adds `vitest`
- `env`: `browser: true`, `node: true`
- `ignorePatterns`: `viteIgnores`
- Test override (`**/*.test.*`, `**/*.spec.*`, `test/`, `tests/`):
  `vitest` + `jest` plugins, Vitest globals, relaxed `no-explicit-any`,
  `no-non-null-assertion`, `no-console`
- `vite.config.*` / `vitest.config.*` override: relaxed
  `no-default-export`, `no-console`

## `next`

- `plugins`: adds `nextjs` (built-in, no install needed)
- `env`: `browser: true`, `node: true`
- `rules`: `nextjs/no-html-link-for-pages: warn`,
  `nextjs/no-img-element: warn`
- Overrides for `next.config.*`, `app/`, and Jest tests

## `expo`

- `env`: `browser: false`, `node: true`
- `ignorePatterns`: `expoIgnores` (`android/`, `ios/`, plus common)
- Jest test override for `**/*.test.*`, `**/*.spec.*`, `__tests__/`
- No `nextjs` plugin and no `vitest` plugin

## `node`

- `library` plus `no-console: off`

## `typeAware`

- `options.typeAware: true` when this object is the root config
- Overrides for `**/*.{ts,tsx,mts,cts}`:
  `typescript/no-floating-promises: error`,
  `typescript/no-misused-promises: warn`,
  `typescript/await-thenable: warn`,
  `typescript/no-unnecessary-condition: off`
- Requires `oxlint-tsgolint`
- Prefer `configure(preset, { typeAware: true })` so the option and the
  rules land on the same root object
