/**
 * @example
 *   ```ts
 *   // oxlint.config.ts
 *   import { defineConfig } from 'oxlint';
 *   import base from '@gv-tech/oxc-config/base';
 *   export default defineConfig({ extends: [base] });
 *   ```;
 *
 * @gv-tech/oxc-config - Base Oxlint configuration
 *
 * Core JavaScript rules with a balanced strict/adoptable posture, mirroring
 * `@gv-tech/eslint-config` base (eslint:recommended + unused-imports).
 *
 * - `correctness: deny` (errors, CI-blocking — like eslint:recommended errors)
 * - `suspicious: warn` (adoptable warnings)
 * - `pedantic: off` (opt-in via overrides)
 */

import { commonIgnores } from './ignores.js';
import type { OxlintConfig } from './types.js';

export const base: OxlintConfig = {
  categories: {
    correctness: 'deny',
    suspicious: 'warn',
    pedantic: 'off',
  },
  plugins: ['eslint', 'unicorn', 'oxc'],
  env: {
    browser: true,
    node: true,
  },
  ignorePatterns: commonIgnores,
  rules: {
    // Mirror eslint-config base: unused imports are errors, unused vars warn with _ prefix
    'eslint/no-unused-vars': 'off',
    'unicorn/prefer-node-protocol': 'warn',
    'eslint/no-console': 'warn',
    'eslint/no-debugger': 'deny',
    'eslint/eqeqeq': ['warn', 'always'],
    'eslint/no-var': 'deny',
    'eslint/prefer-const': 'warn',
    'oxc/only-used-in-recursion': 'warn',
  },
};

export default base;
