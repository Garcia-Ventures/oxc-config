# How to: Override Rules and Options

Goal: customize a preset for your project without forking the package.

Use `configure`. It merges your fields onto the flat preset and returns
one root config. Wrapping a preset in `extends` drops `env`,
`ignorePatterns`, and `settings`.

## Oxlint: add top-level rules

```ts
import { configure } from '@gv-tech/oxc-config';
// oxlint.config.ts
import { defineConfig } from 'oxlint';

export default defineConfig(
  configure('vite', {
    rules: { 'no-console': 'off' },
  }),
);
```

> Use upstream canonical rule names: core rules are unprefixed
> (`no-console`, `eqeqeq`, `prefer-const` — not `eslint/no-console`).
> Both forms work at runtime, but only canonical names get precise
> types and IDE completion.

## Oxlint: scope overrides to file patterns

`scripts/**` is linted. An override matches it.

```ts
export default defineConfig(
  configure('vite', {
    overrides: [
      {
        files: ['scripts/**/*'],
        rules: { 'no-console': 'off' },
      },
    ],
  }),
);
```

## Oxlint: React version, ignores, and type-aware mode

```ts
export default defineConfig(
  configure('vite', {
    reactVersion: '18.3.1',
    ignorePatterns: ['generated/**'],
    typeAware: true,
  }),
);
```

`ignorePatterns` are appended to the preset list. `typeAware: true` is
for the root config only. See [Enable type-aware linting](enable-type-aware.md).

## Oxfmt: spread and override fields

```ts
import { oxfmtConfig } from '@gv-tech/oxc-config/oxfmt';
// oxfmt.config.ts
import { defineConfig } from 'oxfmt';

export default defineConfig({
  ...oxfmtConfig,
  printWidth: 100,
  sortTailwindcss: false,
});
```

## When not to override

If you find yourself disabling the same rule in every project, propose
changing the shared preset instead — see
[CONTRIBUTING](../CONTRIBUTING.md).
