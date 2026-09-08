/**
 * @gv-tech/oxc-config - Next.js Oxlint configuration
 *
 * Optimized for Next.js + TypeScript (App Router + Pages Router).
 * Adds the `nextjs` plugin and Next-specific ignores.
 * Requires no extra install — `nextjs` is a built-in Oxlint plugin.
 *
 * If `@next/eslint-plugin-next` JS-plugin behavior is needed beyond the
 * built-in rules, add it via `jsPlugins` in the consuming project.
 */

import { nextIgnores } from './ignores.js';
import { react } from './react.js';
import type { OxlintConfig } from './types.js';

export const next: OxlintConfig = {
  extends: [react],
  plugins: ['eslint', 'typescript', 'import', 'react', 'jsx-a11y', 'nextjs', 'unicorn', 'oxc'],
  env: {
    browser: true,
    node: true,
  },
  ignorePatterns: nextIgnores,
  rules: {
    // Next.js prefers <Image /> / <Link />; keep as warnings for adoptability
    'nextjs/no-html-link-for-pages': 'warn',
    'nextjs/no-img-element': 'warn',
  },
  overrides: [
    {
      files: ['next.config.*', 'next-env.d.ts', 'app/**', 'src/app/**'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['**/*.test.*', '**/*.spec.*'],
      plugins: ['jest'],
      rules: {
        'typescript/no-explicit-any': 'off',
        'eslint/no-console': 'off',
      },
    },
  ],
};

export default next;
