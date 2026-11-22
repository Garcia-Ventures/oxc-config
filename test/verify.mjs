// Smoke test: every preset must be a valid config object consumable via `extends`.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const modules = [
  'base',
  'typescript',
  'library',
  'react',
  'vite',
  'next',
  'expo',
  'node',
  'recommended',
  'configure',
  'type-aware',
  'oxfmt',
  'ignores',
  'index',
];

for (const name of modules) {
  const mod = await import(`../dist/${name}.js`);
  assert.ok(mod, `${name} should import`);
}

const {
  base,
  typescript,
  library,
  react,
  vite,
  next,
  expo,
  node,
  recommended,
  nextjs,
  typeAware,
  configure,
  oxfmtConfig,
  formatIgnores,
  commonIgnores,
  viteIgnores,
  expoIgnores,
} = await import('../dist/index.js');

for (const [name, cfg] of Object.entries({
  base,
  typescript,
  library,
  react,
  vite,
  next,
  expo,
  node,
  recommended,
})) {
  assert.equal(typeof cfg, 'object', `${name} should be an object`);
  assert.ok(cfg !== null, `${name} should not be null`);
  assert.equal(cfg.extends, undefined, `${name} is a root config and must not hide fields behind extends`);
  assert.equal(cfg.categories?.suspicious, 'warn', `${name} keeps suspicious warnings on the root object`);
  assert.ok(Array.isArray(cfg.ignorePatterns) && cfg.ignorePatterns.length > 0, `${name} has ignore patterns`);
}
assert.equal(typeof typeAware, 'object', 'typeAware should be an object');

assert.equal(recommended, library, 'recommended is the library preset');
assert.equal(nextjs, next, 'nextjs is the next preset');
assert.equal(library.env?.browser, false, 'library drops browser globals');
assert.equal(node.env?.browser, false, 'node drops browser globals');
assert.equal(node.rules?.['no-console'], 'off', 'node allows console');
assert.equal(expo.env?.browser, false, 'expo drops browser globals');
assert.ok(Array.isArray(next.plugins) && next.plugins.includes('nextjs'), 'next preset enables nextjs plugin');
assert.ok(Array.isArray(vite.plugins) && vite.plugins.includes('vitest'), 'vite preset enables vitest plugin');
assert.ok(Array.isArray(expo.plugins) && expo.plugins.includes('react'), 'expo preset enables react');
assert.ok(!expo.plugins?.includes('nextjs') && !expo.plugins?.includes('vitest'), 'expo does not pull Next or Vitest');
assert.equal(vite.settings?.react?.version, '19.0.0', 'vite carries the React version on the root object');
assert.deepEqual(vite.ignorePatterns, viteIgnores, 'vite ignore patterns include the Vite deltas');
assert.deepEqual(expo.ignorePatterns, expoIgnores, 'expo ignore patterns include native trees');
assert.equal(typeAware.options?.typeAware, true, 'typeAware enables the engine when it is the root config');
assert.equal(base.rules?.['no-undef'], 'deny', 'JS files typecheck globals against env');

const custom = configure(vite, {
  rules: { 'no-console': 'off' },
  ignorePatterns: ['generated/**'],
  reactVersion: '18.3.1',
  typeAware: true,
});
assert.equal(custom.rules?.['no-console'], 'off', 'configure overrides rules');
assert.equal(custom.rules?.['no-var'], 'deny', 'configure keeps preset rules');
assert.ok(custom.ignorePatterns?.includes('generated/**'), 'configure appends ignore patterns');
assert.ok(custom.ignorePatterns?.includes('**/dist/**'), 'configure keeps preset ignore patterns');
assert.equal(custom.settings?.react?.version, '18.3.1', 'configure sets the React version');
assert.equal(custom.options?.typeAware, true, 'configure turns on type-aware mode');
assert.ok(
  custom.overrides?.some((override) => override.rules?.['typescript/no-floating-promises'] === 'error'),
  'configure adds type-aware rules',
);
assert.equal(custom.env?.browser, true, 'configure keeps the preset env');

const nestedTypeAware = configure('next', { typeAware: 'rules' });
assert.equal(nestedTypeAware.options?.typeAware, undefined, "typeAware: 'rules' does not set the root-only option");
assert.ok(
  nestedTypeAware.overrides?.some((override) => override.rules?.['typescript/no-floating-promises'] === 'error'),
  "typeAware: 'rules' still adds the shared rules",
);
assert.equal(configure('node').rules?.['no-console'], 'off', "configure('node') selects the node preset");

for (const forbidden of ['scripts/', 'vite.config', 'README', 'LICENSE', 'CONTRIBUTING', 'tsconfig']) {
  assert.ok(
    !commonIgnores.some((pattern) => pattern.includes(forbidden)),
    `commonIgnores must not contain ${forbidden}`,
  );
}

// Oxfmt style checks (mirror @eng618/prettier-config)
assert.equal(oxfmtConfig.printWidth, 120);
assert.equal(oxfmtConfig.singleQuote, true);
assert.equal(oxfmtConfig.trailingComma, 'all');
assert.equal(oxfmtConfig.tabWidth, 2);
assert.equal(oxfmtConfig.useTabs, false);
assert.equal(oxfmtConfig.endOfLine, 'lf');
assert.equal(oxfmtConfig.arrowParens, 'always');
assert.equal(oxfmtConfig.bracketSpacing, true);
assert.equal(oxfmtConfig.objectWrap, 'preserve');
assert.ok(oxfmtConfig.sortImports, 'sortImports enabled');
assert.ok(oxfmtConfig.sortPackageJson, 'sortPackageJson enabled');
assert.ok(oxfmtConfig.sortTailwindcss, 'sortTailwindcss enabled');
// JSDoc is softened (not `true`): `balance` + `keep` preserve intentional
// `Usage:` / `Flags:` line breaks while keeping capitalization on; group
// separation, code fences, bracket spacing, and unparseable example indent are enabled.
assert.equal(typeof oxfmtConfig.jsdoc, 'object', 'jsdoc should be an object');
assert.equal(oxfmtConfig.jsdoc.lineWrappingStyle, 'balance');
assert.equal(oxfmtConfig.jsdoc.commentLineStrategy, 'keep');
assert.equal(oxfmtConfig.jsdoc.capitalizeDescriptions, true);
assert.equal(oxfmtConfig.jsdoc.bracketSpacing, true);
assert.equal(oxfmtConfig.jsdoc.separateTagGroups, true);
assert.equal(oxfmtConfig.jsdoc.preferCodeFences, true);
assert.equal(oxfmtConfig.jsdoc.keepUnparsableExampleIndent, true);

// Formatter ignores must never swallow source/config/workflow/docs files,
// otherwise tools like lint-staged fail when every staged file is ignored.
assert.deepEqual(oxfmtConfig.ignorePatterns, formatIgnores, 'oxfmt uses formatIgnores');
for (const forbidden of ['workflows', 'README', 'LICENSE', 'CONTRIBUTING', 'vite.config', 'tsconfig']) {
  assert.ok(!formatIgnores.some((p) => p.includes(forbidden)), `formatIgnores must not contain ${forbidden}`);
}
// Exception: release-please owns CHANGELOG.md and regenerates it in its own
// style, so the formatter must yield (otherwise every release PR fails CI).
assert.ok(
  formatIgnores.some((p) => p.includes('CHANGELOG')),
  'formatIgnores must exclude release-please CHANGELOG.md',
);

console.log('All @gv-tech/oxc-config smoke tests passed.');

// Published JSON artifact must round-trip the canonical oxfmtConfig.
// Guards against drift between src/oxfmt.ts and dist/oxfmt.json.
const oxfmtJson = JSON.parse(await readFile(new URL('../dist/oxfmt.json', import.meta.url), 'utf8'));
assert.deepEqual(oxfmtJson, JSON.parse(JSON.stringify(oxfmtConfig)), 'dist/oxfmt.json must match oxfmtConfig');

console.log('oxfmt.json artifact is in sync.');
