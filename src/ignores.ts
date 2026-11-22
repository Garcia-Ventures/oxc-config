/**
 * @gv-tech/oxc-config - Shared ignore patterns
 *
 * Lint ignores cover generated and foreign artifacts only. Source, scripts,
 * and tool configs (vite.config, metro.config, tsconfig) stay linted so
 * preset overrides for those files can match.
 *
 * Formatter ignores are a separate, equally narrow list. Release-please owns
 * CHANGELOG.md, so the formatter yields that one file.
 *
 * Patterns are gitignore-style and rooted at the directory that contains the
 * consuming config file.
 */

/** File patterns for JavaScript files */
export const jsFiles: string[] = ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'];

/** File patterns for TypeScript files */
export const tsFiles: string[] = ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'];

/** All JavaScript + TypeScript file patterns */
export const allJsTsFiles: string[] = [...jsFiles, ...tsFiles];

/**
 * Generated or foreign paths shared by every lint preset.
 *
 * Intentionally absent: `scripts/**`, `*.config.*`, docs, and license files.
 * Oxlint does not lint markdown, and ignoring a config file disables the
 * override that relaxes it.
 */
export const commonIgnores: string[] = [
  '**/node_modules/**',
  '**/dist/**',
  '**/build/**',
  '**/out/**',
  '**/coverage/**',
  '**/.next/**',
  '**/.turbo/**',
  '**/.cache/**',
  '**/.yarn/**',
  '**/.git/**',
  '**/.nx/**',
  '**/.agent/**',
  '**/.husky/**',
  '**/public/build/**',
  '**/.expo/**',
  '**/.vscode/**',
  '**/.idea/**',
  '**/.DS_Store',
  '**/.env*',
  '**/package-lock.json',
  '**/bun.lockb',
  '**/bun.lock',
  '**/pnpm-lock.yaml',
  '**/yarn.lock',
  '**/nativewind-env.d.ts',
  '**/next-env.d.ts',
  '**/dist-site/**',
  '**/.vercel/**',
  '**/.output/**',
  '**/.firebase/**',
  '**/.netlify/**',
  '**/.parcel-cache/**',
  '**/.eslintcache',
  '**/.stylelintcache',
  '**/.coverage/**',
  '**/.nyc_output/**',
  '**/.swc/**',
  '**/tmp/**',
  '**/temp/**',
  '**/logs/**',
  '**/.pnp.*',
];

/** Vite-specific ignores (extends common) */
export const viteIgnores: string[] = [...commonIgnores, '**/playwright-report/**', '**/test-results/**'];

/** Next.js-specific ignores. `next-env.d.ts` already lives in `commonIgnores`. */
export const nextIgnores: string[] = [...commonIgnores];

/** Expo / React Native ignores: common plus native project trees. */
export const expoIgnores: string[] = [...commonIgnores, '**/android/**', '**/ios/**'];

/**
 * Ignore patterns for Oxfmt (formatting).
 *
 * Deliberately narrower than a blanket "skip docs" list: only generated or foreign artifacts. Source files, configs,
 * workflows, and docs MUST stay formattable — otherwise tools like lint-staged fail when every staged file is ignored.
 */
export const formatIgnores: string[] = [
  '**/node_modules/**',
  '**/dist/**',
  '**/build/**',
  '**/out/**',
  '**/coverage/**',
  '**/.next/**',
  '**/.turbo/**',
  '**/.cache/**',
  '**/.yarn/**',
  '**/.git/**',
  '**/.nx/**',
  '**/.agent/**',
  '**/.husky/**',
  '**/public/build/**',
  '**/.expo/**',
  '**/.vscode/**',
  '**/.idea/**',
  '**/.DS_Store',
  '**/.env*',
  '**/package-lock.json',
  '**/bun.lockb',
  '**/bun.lock',
  '**/pnpm-lock.yaml',
  '**/yarn.lock',
  // Release-please generates and owns CHANGELOG.md in its own style;
  // formatting it would fail CI on every release PR.
  '**/CHANGELOG.md',
  '**/assets/**',
  '**/public/**',
  '**/dist-site/**',
  '**/.vercel/**',
  '**/.output/**',
  '**/.firebase/**',
  '**/.netlify/**',
  '**/.storybook/**',
  '**/.parcel-cache/**',
  '**/.eslintcache',
  '**/.stylelintcache',
  '**/.coverage/**',
  '**/.nyc_output/**',
  '**/.swc/**',
  '**/tmp/**',
  '**/temp/**',
  '**/logs/**',
  '**/.pnp.*',
  '**/playwright-report/**',
  '**/test-results/**',
];
