/**
 * @gv-tech/oxc-config - TypeScript Oxlint configuration
 *
 * Extends base with `typescript` + `import` plugins. Mirrors
 * `@gv-tech/eslint-config` typescript (typescript-eslint recommended,
 * unused-vars off in favor of the TS-aware variant).
 */

import { base } from './base.js';
import { tsFiles } from './ignores.js';
import type { OxlintConfig } from './types.js';

export const typescript: OxlintConfig = {
  extends: [base],
  plugins: ['eslint', 'typescript', 'import', 'unicorn', 'oxc'],
  overrides: [
    {
      files: tsFiles,
      rules: {
        'eslint/no-unused-vars': 'off',
        'typescript/no-explicit-any': 'warn',
        'typescript/no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
        'typescript/consistent-type-imports': 'warn',
        'typescript/no-non-null-assertion': 'warn',
        'import/no-cycle': 'warn',
        'import/no-duplicates': 'warn',
      },
    },
    {
      // Config files: allow defaults/extra looseness (mirrors rivuty `config` export idea)
      files: ['*.config.*', '*.setup.*'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
};

export default typescript;
