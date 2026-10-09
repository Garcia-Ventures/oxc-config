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
 * - `jsdoc` replaces `prettier-plugin-jsdoc` (softened: `balance` +
 *   `keep` so intentional `Usage:` / `Flags:` line breaks survive;
 *   capitalization stays on)
 * - `sh/sql/prisma` need no plugin: Oxfmt formats them natively
 * - `curly` has no Oxfmt option (core formatter covers it)
 * - arrays (incl. JSON) have no `arrayWrap` option upstream yet: Prettier
 *   fill-packing to `printWidth` applies; see docs for per-project
 *   `overrides` / `ignorePatterns` workarounds.
 */

import { formatIgnores } from './ignores.js';
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
  objectWrap: 'preserve',
  proseWrap: 'preserve',
  embeddedLanguageFormatting: 'auto',
  sortImports: true,
  sortPackageJson: { sortScripts: true },
  sortTailwindcss: {
    functions: ['clsx', 'cn', 'cva', 'tw'],
  },
  // Soften JSDoc vs `true` defaults (`greedy` + `singleLine`): `balance`
  // preserves intentional line breaks (e.g. `Usage:` / `Flags:` / `Examples:`
  // headers in scripts) when they fit in `printWidth`, `keep` preserves the
  // author's single- vs multi-line choice. Capitalization stays enabled.
  jsdoc: {
    capitalizeDescriptions: true,
    commentLineStrategy: 'keep',
    lineWrappingStyle: 'balance',
  },
  ignorePatterns: formatIgnores,
  overrides: [
    {
      files: ['*.yml', '*.yaml'],
      options: { singleQuote: false },
    },
  ],
};

export default oxfmtConfig;
