/**
 * @example
 *   ```ts
 *   // oxfmt.config.ts
 *   import { defineConfig } from 'oxfmt';
 *   import { oxfmtConfig } from '@gv-tech/oxc-config/oxfmt';
 *   export default defineConfig({ ...oxfmtConfig });
 *   ```;
 *
 * @gv-tech/oxc-config - Shared Oxfmt configuration
 *
 * Mirrors `@eng618/prettier-config` as closely as Oxfmt allows:
 * printWidth 120, singleQuote, trailingComma all, 2-space, LF, always
 * arrow parens, bracket spacing — plus built-in sorting that replaces
 * prettier plugins (organize-imports, packagejson, tailwindcss, jsdoc).
 *
 * - `sortImports` replaces `prettier-plugin-organize-imports`
 * - `sortPackageJson` replaces `prettier-plugin-packagejson`
 * - `sortTailwindcss` replaces `prettier-plugin-tailwindcss`
 * - `jsdoc` replaces `prettier-plugin-jsdoc`
 * - `sh/sql/prisma` need no plugin: Oxfmt formats them natively
 * - `curly/multiline-arrays` have no Oxfmt option (core formatter covers it)
 */

import { commonIgnores } from './ignores.js';
import type { OxfmtConfig } from './types.js';

export const oxfmtConfig: OxfmtConfig = {
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  endOfLine: 'lf',
  insertFinalNewline: true,
  quoteProps: 'as-needed',
  proseWrap: 'preserve',
  embeddedLanguageFormatting: 'auto',
  sortImports: true,
  sortPackageJson: { sortScripts: true },
  sortTailwindcss: {
    functions: ['clsx', 'cn', 'cva', 'tw'],
  },
  jsdoc: true,
  ignorePatterns: commonIgnores,
  overrides: [
    {
      files: ['*.yml', '*.yaml'],
      options: { singleQuote: false },
    },
  ],
};

export default oxfmtConfig;
