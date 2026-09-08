# How to: Configure Oxfmt

Goal: adopt the shared formatter style, optionally tailoring sorting
features per project.

## Basic setup

```ts
// oxfmt.config.ts
import { defineConfig } from 'oxfmt';
import { oxfmtConfig } from '@gv-tech/oxc-config/oxfmt';

export default defineConfig({ ...oxfmtConfig });
```

Check and apply:

```sh
npx oxfmt --check .
npx oxfmt --write .
```

## Sorting features

All three are enabled by default (they replace Prettier plugins):

| Feature           | Replaces                           | Disable with             |
| ----------------- | ---------------------------------- | ------------------------ |
| `sortImports`     | `prettier-plugin-organize-imports` | `sortImports: false`     |
| `sortPackageJson` | `prettier-plugin-packagejson`      | `sortPackageJson: false` |
| `sortTailwindcss` | `prettier-plugin-tailwindcss`      | `sortTailwindcss: false` |

Example — a project without Tailwind:

```ts
export default defineConfig({ ...oxfmtConfig, sortTailwindcss: false });
```

## YAML files

`*.yml` / `*.yaml` files are formatted with `singleQuote: false`,
matching `@eng618/prettier-config`. Override per project via
`overrides` if needed.

## See also

- [Oxfmt options reference](../reference/oxfmt-options.md) — every
  option and its default.
- [Prettier parity](../explanation/prettier-parity.md) — what maps
  1:1 and the known gaps.
