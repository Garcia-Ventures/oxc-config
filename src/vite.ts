/**
 * @gv-tech/oxc-config - Vite + React Oxlint configuration
 *
 * `react` plus the Vitest plugin, browser and Node globals, and test/config
 * overrides. Use for SPAs and any non-Next React app.
 *
 * ```ts
 * import { defineConfig } from 'oxlint';
 * import { vite } from '@gv-tech/oxc-config/vite';
 * export default defineConfig(vite);
 * ```
 */

import { compose } from './compose.js';
import { react } from './react.js';
import type { OxlintConfig } from './types.js';

export const vite: OxlintConfig = compose(react, {
  plugins: ['vitest'],
  ignorePatterns: ['**/playwright-report/**', '**/test-results/**'],
  overrides: [
    {
      files: ['**/*.test.*', '**/*.spec.*', '**/test/**', '**/tests/**'],
      plugins: ['vitest', 'jest'],
      // Restate browser/node in case an override env replaces the parent env.
      env: { browser: true, node: true, 'vitest/globals': true },
      rules: {
        'typescript/no-explicit-any': 'off',
        'typescript/no-non-null-assertion': 'off',
        'no-console': 'off',
      },
    },
    {
      files: ['vite.config.*', 'vitest.config.*', 'vitest.workspace.*'],
      rules: {
        'import/no-default-export': 'off',
        'no-console': 'off',
      },
    },
  ],
});

export default vite;
