/**
 * @gv-tech/oxc-config - TypeScript Oxlint configuration
 *
 * Flat composition of `base` plus `typescript` and `import`. `no-undef` is
 * off for TS files: typescript-eslint recommends that, because the rule does
 * not understand types. JS files still use `no-undef` from `base`.
 *
 * ```ts
 * import { defineConfig } from 'oxlint';
 * import { typescript } from '@gv-tech/oxc-config/typescript';
 * export default defineConfig(typescript);
 * ```
 */

import { base } from './base.js';
import { compose } from './compose.js';
import { tsFiles } from './ignores.js';
import type { OxlintConfig } from './types.js';

export const typescript: OxlintConfig = compose(base, {
  plugins: ['typescript', 'import'],
  overrides: [
    {
      files: tsFiles,
      rules: {
        'no-undef': 'off',
        // Single entry: oxlint resolves `eslint/no-unused-vars` for TS files
        // (there is no separate `typescript/no-unused-vars` upstream).
        'eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
        'typescript/no-explicit-any': 'warn',
        'typescript/consistent-type-imports': 'warn',
        'typescript/no-non-null-assertion': 'warn',
        'import/no-cycle': 'warn',
        'import/no-duplicates': 'warn',
      },
    },
    {
      files: ['*.config.*', '*.setup.*'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
});

export default typescript;
