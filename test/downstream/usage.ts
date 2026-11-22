import { defineConfig as defineOxfmtConfig } from 'oxfmt';
// Downstream usage simulation: exercises this package exactly the way
// consumers do, using the real `defineConfig` from `oxlint` / `oxfmt`.
// Presets are the root config. `configure` merges project overrides.
import { defineConfig as defineOxlintConfig } from 'oxlint';

import { configure, expo, next, nextjs, node, recommended, typeAware, vite } from '../../dist/index.js';
import { oxfmtConfig } from '../../dist/oxfmt.js';

export const lintRecommended = defineOxlintConfig(recommended);
export const lintVite = defineOxlintConfig(vite);
export const lintNext = defineOxlintConfig(next);
export const lintNextAlias = defineOxlintConfig(nextjs);
export const lintNode = defineOxlintConfig(node);
export const lintExpo = defineOxlintConfig(configure('expo'));
export const lintExpoDirect = defineOxlintConfig(expo);
export const lintTypeAware = defineOxlintConfig(configure(vite, { typeAware: true, reactVersion: '18.3.1' }));
export const lintTypeAwareRulesOnly = defineOxlintConfig(configure(next, { typeAware: 'rules' }));
export const lintOverride = defineOxlintConfig(
  configure(vite, {
    rules: { 'no-console': 'off' },
    ignorePatterns: ['generated/**'],
  }),
);
export const lintTypeAwarePreset = defineOxlintConfig(typeAware);

export const format = defineOxfmtConfig({ ...oxfmtConfig });
export const formatOverride = defineOxfmtConfig({ ...oxfmtConfig, printWidth: 100 });
