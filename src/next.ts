/**
 * @gv-tech/oxc-config - Next.js Oxlint configuration
 *
 * `react` plus the built-in `nextjs` plugin. No extra install.
 *
 * ```ts
 * import { defineConfig } from 'oxlint';
 * import { next } from '@gv-tech/oxc-config/next';
 * export default defineConfig(next);
 * ```
 */

import { compose } from './compose.js';
import { react } from './react.js';
import type { OxlintConfig } from './types.js';

export const next: OxlintConfig = compose(react, {
  plugins: ['nextjs'],
  rules: {
    'nextjs/no-html-link-for-pages': 'warn',
    'nextjs/no-img-element': 'warn',
  },
  overrides: [
    {
      files: ['next.config.*', 'app/**', 'src/app/**'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['**/*.test.*', '**/*.spec.*'],
      plugins: ['jest'],
      env: { browser: true, node: true, jest: true },
      rules: {
        'typescript/no-explicit-any': 'off',
        'no-console': 'off',
      },
    },
  ],
});

export default next;
