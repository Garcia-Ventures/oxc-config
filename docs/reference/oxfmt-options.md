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
| `objectWrap`                 | `"preserve"`  | Keep hand-expanded objects  |
| `proseWrap`                  | `"preserve"`  | Markdown wrapping untouched |
| `embeddedLanguageFormatting` | `"auto"`      |                             |

## JSDoc (softened, not `true`)

`jsdoc` defaults are aggressive (`greedy` re-wrap + `singleLine`
collapse), which joins intentional `Usage:` / `Flags:` / `Examples:`
breaks in script headers. The shared config keeps formatting on but
preserves author breaks:

| Option                         | Value       | Notes                                               |
| ------------------------------ | ----------- | --------------------------------------------------- |
| `jsdoc.capitalizeDescriptions` | `true`      | Keep auto-capitalization                            |
| `jsdoc.commentLineStrategy`    | `"keep"`    | Don't collapse multi-line ↔ single-line             |
| `jsdoc.lineWrappingStyle`      | `"balance"` | Preserve breaks when lines fit in `printWidth: 120` |

Restore aggressive mode per project with
`jsdoc: true`, or disable with `jsdoc: false`.

## Sorting (all enabled by default)

| Option            | Value                                                                                         | Replaces                           |
| ----------------- | --------------------------------------------------------------------------------------------- | ---------------------------------- |
| `sortImports`     | `true`                                                                                        | `prettier-plugin-organize-imports` |
| `sortPackageJson` | `{ sortScripts: true }`                                                                       | `prettier-plugin-packagejson`      |
| `sortTailwindcss` | `{ functions: ["clsx", "cn", "cva", "tw"] }`                                                  | `prettier-plugin-tailwindcss`      |
| `jsdoc`           | `{ capitalizeDescriptions: true, commentLineStrategy: "keep", lineWrappingStyle: "balance" }` | `prettier-plugin-jsdoc` (softened) |

Disable any feature per project by setting it to `false`
(see [Configure Oxfmt](../how-to/configure-oxfmt.md)).

## Arrays and JSON (no upstream knob yet)

Oxfmt has no `arrayWrap` option (upstream PR open). Arrays and JSON
arrays use Prettier fill-packing to `printWidth`: a hand-expanded
one-per-line list collapses/packs when it fits. `objectWrap: "preserve"`
does not affect arrays.

Per-project workarounds (copy-paste):

```ts
export default defineConfig({
  ...oxfmtConfig,
  // Less packing density for data files (still packs, but rarely 3-per-line):
  overrides: [...(oxfmtConfig.overrides ?? []), { files: ['*.json', '*.jsonc'], options: { printWidth: 80 } }],
});
```

Or exclude generated/data files entirely via `ignorePatterns`
(see [ignores](ignores.md)), or convert to `.jsonc` with a
`// prettier-ignore` comment above a specific array.

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
