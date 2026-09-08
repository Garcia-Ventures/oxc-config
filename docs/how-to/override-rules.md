# How to: Override Rules and Options

Goal: customize a preset for your project without forking the package.

## Oxlint: add top-level rules

Top-level `rules` win over anything inherited via `extends`:

```ts
// oxlint.config.ts
import { defineConfig } from 'oxlint';
import { vite } from '@gv-tech/oxc-config/vite';

export default defineConfig({
  extends: [vite],
  rules: { 'eslint/no-console': 'off' },
});
```

## Oxlint: scope overrides to file patterns

```ts
export default defineConfig({
  extends: [vite],
  overrides: [
    {
      files: ['scripts/**/*'],
      rules: { 'eslint/no-console': 'off' },
    },
  ],
});
```

## Oxlint: combine presets

`extends` accepts multiple configs; later entries win on conflict.
`type-aware` is designed to go last:

```ts
import { typeAware } from '@gv-tech/oxc-config/type-aware';

export default defineConfig({ extends: [vite, typeAware] });
```

## Oxfmt: spread and override fields

```ts
// oxfmt.config.ts
import { defineConfig } from 'oxfmt';
import { oxfmtConfig } from '@gv-tech/oxc-config/oxfmt';

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
