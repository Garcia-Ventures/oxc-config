/**
 * @gv-tech/oxc-config - Shared ignore patterns
 *
 * Ported from `@gv-tech/eslint-config` `commonIgnores` and adapted to
 * Oxlint (`ignorePatterns`) + Oxfmt (`ignorePatterns`) gitignore-style matching.
 * Patterns are rooted at the directory containing the config file.
 */

/** File patterns for JavaScript files */
export const jsFiles: string[] = ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'];

/** File patterns for TypeScript files */
export const tsFiles: string[] = ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'];

/** All JavaScript + TypeScript file patterns */
export const allJsTsFiles: string[] = [...jsFiles, ...tsFiles];

/** Common ignore patterns shared by all presets. Mirrors `@gv-tech/eslint-config` commonIgnores. */
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
  '**/CHANGELOG.md',
  '**/README.md',
  '**/LICENSE',
  '**/SECURITY.md',
  '**/CODEOWNERS',
  '**/CONTRIBUTING.md',
  '**/FUNDING.yml',
  '**/PULL_REQUEST_TEMPLATE/**',
  '**/workflows/**',
  '**/wrangler.toml',
  '**/project.json',
  '**/nx.json',
  '**/package-lock.json',
  '**/bun.lockb',
  '**/bun.lock',
  '**/pnpm-lock.yaml',
  '**/yarn.lock',
  '**/tsconfig*.json',
  '**/postcss.config.*',
  '**/tailwind.config.*',
  '**/vite.config.*',
  '**/vitest.config.*',
  '**/babel.config.*',
  '**/metro.config.*',
  '**/eas.json',
  '**/app.json',
  '**/nativewind-env.d.ts',
  '**/assets/**',
  '**/public/**',
  '**/scripts/**',
  '**/dist-site/**',
  // extra tooling artifacts common in Oxc-era repos
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
];

/** Vite-specific ignores (extends common) */
export const viteIgnores: string[] = [...commonIgnores, '**/playwright-report/**', '**/test-results/**'];

/** Next.js-specific ignores (extends common) */
export const nextIgnores: string[] = [...commonIgnores, '.next/**', 'out/**', 'next-env.d.ts'];
