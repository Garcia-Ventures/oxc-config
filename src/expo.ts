/**
 * @gv-tech/oxc-config - Expo / React Native Oxlint configuration
 *
 * `react` without browser globals, plus native trees ignored (`android/`,
 * `ios/`, and `.expo/` from the shared list). Jest is enabled for tests.
 * Metro config files stay linted.
 *
 * ```ts
 * import { defineConfig } from 'oxlint';
 * import { expo } from '@gv-tech/oxc-config/expo';
 * export default defineConfig(expo);
 * ```
 */

import { compose } from './compose.js';
import { react } from './react.js';
import type { OxlintConfig } from './types.js';

export const expo: OxlintConfig = compose(react, {
  env: {
    browser: false,
    node: true,
  },
  ignorePatterns: ['**/android/**', '**/ios/**'],
  overrides: [
    {
      files: ['**/*.test.*', '**/*.spec.*', '**/__tests__/**'],
      plugins: ['jest'],
      env: { browser: false, node: true, jest: true },
      rules: {
        'typescript/no-explicit-any': 'off',
        'no-console': 'off',
      },
    },
  ],
});

export default expo;
