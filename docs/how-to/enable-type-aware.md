# How to: Enable Type-Aware Linting

Goal: add stricter, type-informed rules on top of any preset.

## Steps

1. Install the type-aware runner (`oxlint-tsgolint >= 7.0.2007`):

   ```sh
   npm i -D oxlint-tsgolint
   ```

2. Turn it on from the root config. `configure` sets `options.typeAware`
   and adds the shared rules. Those rules are scoped to TypeScript files.

   ```ts
   import { configure } from '@gv-tech/oxc-config';
   // oxlint.config.ts
   import { defineConfig } from 'oxlint';

   export default defineConfig(configure('vite', { typeAware: true }));
   ```

3. Verify:

   ```sh
   npx oxlint
   ```

## What you get

| Rule                                  | Severity |
| ------------------------------------- | -------- |
| `typescript/no-floating-promises`     | error    |
| `typescript/no-misused-promises`      | warn     |
| `typescript/await-thenable`           | warn     |
| `typescript/no-unnecessary-condition` | off      |

## Monorepos

Oxlint rejects `options.typeAware` in a nested config. Put `typeAware: true`
only on the repository root. Packages that have their own
`oxlint.config.ts` should add the rules without the option:

```ts
export default defineConfig(configure('next', { typeAware: 'rules' }));
```

Then run `oxlint --type-aware` from the root so the engine is on. Details:
[Use in a monorepo](use-in-a-monorepo.md).

## Notes

- Requires type information, so lint runs are slower. It stays out of
  every preset on purpose.
- Tune per project with [overrides](override-rules.md). An override
  listed after the type-aware rules wins for the same files.
