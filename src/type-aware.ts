/**
 * @gv-tech/oxc-config - Opt-in type-aware Oxlint configuration
 *
 * Requires `oxlint-tsgolint` (or another type-aware backend) alongside `oxlint`.
 *
 * `options.typeAware` is legal only on the root config file. Nested package
 * configs in a monorepo must not set it; use `configure(preset, { typeAware: 'rules' })`
 * there and run `oxlint --type-aware` from the repository root.
 *
 * ```ts
 * import { defineConfig } from 'oxlint';
 * import { configure, vite } from '@gv-tech/oxc-config';
 * export default defineConfig(configure(vite, { typeAware: true }));
 * ```
 */

import { tsFiles } from './ignores.js';
import type { OxlintConfig } from './types.js';

export const typeAware: OxlintConfig = {
  options: { typeAware: true },
  overrides: [
    {
      files: tsFiles,
      rules: {
        'typescript/no-floating-promises': 'error',
        'typescript/no-misused-promises': 'warn',
        'typescript/await-thenable': 'warn',
        'typescript/no-unnecessary-condition': 'off',
      },
    },
  ],
};

export default typeAware;
