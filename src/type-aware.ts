/**
 * @gv-tech/oxc-config - Opt-in type-aware Oxlint configuration
 *
 * Requires `oxlint-tsgolint` alongside `oxlint`:
 *
 * ```sh
 * npm i -D oxlint oxlint-tsgolint @gv-tech/oxc-config
 * ```
 *
 * Apply _after_ your framework preset so type-aware rules win:
 *
 * ```ts
 * import { defineConfig } from "oxlint";
 * import { vite } from "@gv-tech/oxc-config/vite";
 * import { typeAware } from "@gv-tech/oxc-config/type-aware";
 * export default defineConfig({ extends: [vite, typeAware] });
 * ```
 *
 * Scoped to TS/TSX only to keep JS/fast paths untouched.
 */

import { tsFiles } from './ignores.js';
import type { OxlintConfig } from './types.js';

export const typeAware: OxlintConfig = {
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
