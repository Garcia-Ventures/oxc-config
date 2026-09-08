// Smoke test: every preset must be a valid config object consumable via `extends`.
import assert from 'node:assert/strict';

const modules = [
  'base',
  'typescript',
  'react',
  'vite',
  'next',
  'recommended',
  'type-aware',
  'oxfmt',
  'ignores',
  'index',
];

for (const name of modules) {
  const mod = await import(`../dist/${name}.js`);
  assert.ok(mod, `${name} should import`);
}

const { base, typescript, react, vite, next, recommended, typeAware, oxfmtConfig } = await import('../dist/index.js');

for (const [name, cfg] of Object.entries({ base, typescript, react, vite, next, recommended, typeAware })) {
  assert.equal(typeof cfg, 'object', `${name} should be an object`);
  assert.ok(cfg !== null, `${name} should not be null`);
}

// Preset composition checks
assert.ok(Array.isArray(typescript.extends) && typescript.extends.includes(base), 'typescript extends base');
assert.ok(react.extends?.includes(typescript), 'react extends typescript');
assert.ok(vite.extends?.includes(react), 'vite extends react');
assert.ok(next.extends?.includes(react), 'next extends react');
assert.ok(recommended.extends?.includes(vite), 'recommended extends vite');
assert.ok(Array.isArray(next.plugins) && next.plugins.includes('nextjs'), 'next preset enables nextjs plugin');
assert.ok(Array.isArray(vite.plugins) && vite.plugins.includes('vitest'), 'vite preset enables vitest plugin');

// Oxfmt style checks (mirror @eng618/prettier-config)
assert.equal(oxfmtConfig.printWidth, 120);
assert.equal(oxfmtConfig.singleQuote, true);
assert.equal(oxfmtConfig.trailingComma, 'all');
assert.equal(oxfmtConfig.tabWidth, 2);
assert.equal(oxfmtConfig.useTabs, false);
assert.equal(oxfmtConfig.endOfLine, 'lf');
assert.equal(oxfmtConfig.arrowParens, 'always');
assert.equal(oxfmtConfig.bracketSpacing, true);
assert.ok(oxfmtConfig.sortImports, 'sortImports enabled');
assert.ok(oxfmtConfig.sortPackageJson, 'sortPackageJson enabled');
assert.ok(oxfmtConfig.sortTailwindcss, 'sortTailwindcss enabled');

console.log('All @gv-tech/oxc-config smoke tests passed.');
