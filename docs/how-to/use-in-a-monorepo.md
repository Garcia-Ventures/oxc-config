# How to: Use the config in a monorepo

Goal: give each package the preset that matches it, without one package's
React rules landing on a Node package.

## Oxlint does not merge parent and child configs

For each file, Oxlint uses the nearest `oxlint.config.ts`. A config in
`apps/web` replaces the root config for files under that directory. It does
not extend it. A package that needs its own preset must call `configure`
itself.

`-c` / `--config` disables nested lookup. CI that runs
`oxlint -c oxlint.config.ts` lints the whole repo with that one file and
ignores package configs. Omit `-c` when packages have their own configs.
Pass a relative path if you do use `-c`. An absolute path loads the file
but does not apply its `ignorePatterns` on Oxlint 1.94.

## One app, one preset

Most repositories are one project. One root config is enough:

```ts
import { next } from '@gv-tech/oxc-config/next';
import { defineConfig } from 'oxlint';

export default defineConfig(next);
```

## Root plus two packages

```
repo/
├── oxlint.config.ts          library rules for the repo root
├── apps/
│   └── web/
│       └── oxlint.config.ts  next
└── packages/
    └── cli/
        └── oxlint.config.ts  node
```

Root, `oxlint.config.ts`:

```ts
import { configure } from '@gv-tech/oxc-config';
import { defineConfig } from 'oxlint';

export default defineConfig(configure('library'));
```

`apps/web/oxlint.config.ts`:

```ts
import { configure } from '@gv-tech/oxc-config';
import { defineConfig } from 'oxlint';

export default defineConfig(configure('next'));
```

`packages/cli/oxlint.config.ts`:

```ts
import { configure } from '@gv-tech/oxc-config';
import { defineConfig } from 'oxlint';

export default defineConfig(configure('node'));
```

Each directory can also have its own `oxfmt.config.ts`. Formatting does
not use nested lookup the same way. Spread `oxfmtConfig` in each file, or
share one root `oxfmt.config.ts` and run `oxfmt` from the root.

## Type-aware linting

`options.typeAware` is only legal on the root config. Oxlint errors if a
nested package config sets it.

Turn the engine on from the repository root, and put the shared rule
severities in each package without the option:

```ts
// repo/oxlint.config.ts
export default defineConfig(configure('library', { typeAware: true }));
```

```ts
// apps/web/oxlint.config.ts
export default defineConfig(configure('next', { typeAware: 'rules' }));
```

`oxlint --type-aware` from the root also turns the engine on and overrides
the config flag. Nested packages still need `'rules'` if they should use
these severities rather than Oxlint's defaults.

Install `oxlint-tsgolint` at the root.

## See also

- [Presets](../reference/presets.md)
- [Enable type-aware linting](enable-type-aware.md)
- [Override rules](override-rules.md)
