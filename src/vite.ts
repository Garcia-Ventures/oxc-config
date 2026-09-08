/**
 * @gv-tech/oxc-config - Vite + React Oxlint configuration
 *
 * Optimized for Vite + React + TypeScript. Adds `vitest`/`jest` test
 * overrides and browser+node envs. Use for SPAs, libraries, and any
 * non-Next.js React project.
 */

import { viteIgnores } from './ignores.js';
import { react } from './react.js';
import type { OxlintConfig } from './types.js';

export const vite: OxlintConfig = {
  extends: [react],
  plugins: ['eslint', 'typescript', 'import', 'react', 'jsx-a11y', 'vitest', 'unicorn', 'oxc'],
  env: {
    browser: true,
    node: true,
  },
  ignorePatterns: viteIgnores,
  overrides: [
    {
      files: ['**/*.test.*', '**/*.spec.*', '**/test/**', '**/tests/**'],
      plugins: ['vitest', 'jest'],
      env: { 'vitest/globals': true },
      rules: {
        'typescript/no-explicit-any': 'off',
        'typescript/no-non-null-assertion': 'off',
        'eslint/no-console': 'off',
      },
    },
    {
      files: ['vite.config.*', 'vitest.config.*', 'vitest.workspace.*'],
      rules: {
        'import/no-default-export': 'off',
        'eslint/no-console': 'off',
      },
    },
  ],
};

export default vite;
