# Reference: Oxfmt Options

Exact contents of `oxfmtConfig` (`@gv-tech/oxc-config/oxfmt`).
Mirrors [`@eng618/prettier-config`](https://github.com/eng618/prettier-config).

## Core style

| Option                       | Value         | Notes                       |
| ---------------------------- | ------------- | --------------------------- |
| `printWidth`                 | `120`         | Oxfmt default is `100`      |
| `tabWidth`                   | `2`           |                             |
| `useTabs`                    | `false`       |                             |
| `semi`                       | `true`        |                             |
| `singleQuote`                | `true`        |                             |
| `jsxSingleQuote`             | `false`       |                             |
| `trailingComma`              | `"all"`       |                             |
| `bracketSpacing`             | `true`        |                             |
| `bracketSameLine`            | `false`       |                             |
| `arrowParens`                | `"always"`    |                             |
| `endOfLine`                  | `"lf"`        |                             |
| `insertFinalNewline`         | `true`        |                             |
| `quoteProps`                 | `"as-needed"` |                             |
| `proseWrap`                  | `"preserve"`  | Markdown wrapping untouched |
| `embeddedLanguageFormatting` | `"auto"`      |                             |

## Sorting (all enabled by default)

| Option            | Value                                        | Replaces                           |
| ----------------- | -------------------------------------------- | ---------------------------------- |
| `sortImports`     | `true`                                       | `prettier-plugin-organize-imports` |
| `sortPackageJson` | `{ sortScripts: true }`                      | `prettier-plugin-packagejson`      |
| `sortTailwindcss` | `{ functions: ["clsx", "cn", "cva", "tw"] }` | `prettier-plugin-tailwindcss`      |
| `jsdoc`           | `true`                                       | `prettier-plugin-jsdoc`            |

Disable any feature per project by setting it to `false`
(see [Configure Oxfmt](../how-to/configure-oxfmt.md)).

## Ignores and overrides

- `ignorePatterns`: `formatIgnores` (see [ignores](ignores.md)).
- `overrides`: `*.yml` / `*.yaml` use `singleQuote: false`.

## Published JSON artifact

`src/oxfmt.ts` is the source of truth. Each build regenerates
`dist/oxfmt.json` from it (via `scripts/generate-oxfmt-json.mjs`,
guarded by `test/verify.mjs`) and publishes it as
`@gv-tech/oxc-config/oxfmt.json`, consumable via CDN
(`https://cdn.jsdelivr.net/npm/@gv-tech/oxc-config@latest/dist/oxfmt.json`)
or the bundled `gv-oxfmt` runner. See
[Configure Oxfmt](../how-to/configure-oxfmt.md#standalone-use-no-packagejson).
