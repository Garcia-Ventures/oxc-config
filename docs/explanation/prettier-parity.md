# Explanation: Prettier Parity

> How `oxfmtConfig` relates to `@eng618/prettier-config`, and where
> parity intentionally ends.

## Core options: full parity

`printWidth: 120`, `singleQuote`, `trailingComma: "all"`, 2-space
tabs, LF endings, `arrowParens: "always"`, `bracketSpacing` — all map
1:1 (see [Oxfmt options](../reference/oxfmt-options.md)).

## Plugins become built-ins

| Prettier plugin                | Oxfmt equivalent        | Status                                     |
| ------------------------------ | ----------------------- | ------------------------------------------ |
| `organize-imports`             | `sortImports`           | ✅ enabled                                 |
| `packagejson`                  | `sortPackageJson`       | ✅ enabled (`sortScripts`)                 |
| `tailwindcss`                  | `sortTailwindcss`       | ✅ enabled (`clsx/cn/cva/tw`)              |
| `jsdoc`                        | `jsdoc`                 | ✅ enabled                                 |
| `sh`, `sql`, `prisma`          | native language support | ✅ no config needed                        |
| `curly`, `multiline-arrays`    | —                       | ➖ no equivalent; core formatter covers it |
| `*.hbs → html` parser override | —                       | ➖ no equivalent                           |
| `CHANGELOG.md requirePragma`   | —                       | ➖ no equivalent                           |

The `*.yml`/`*.yaml` override (`singleQuote: false`) is preserved.

## Consequences

- **Zero formatter plugin dependencies** — nothing to install or
  version-align beyond `oxfmt` itself.
- **One-time diff on migration is small** — core style matches, so
  `oxfmt --write` mostly re-sorts imports and normalizes edge cases.
- **Gaps are documented, not hidden** — if a `➖` row matters to your
  project, handle it with project-level tooling and propose it in an
  issue.
