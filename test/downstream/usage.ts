import { defineConfig as defineOxfmtConfig } from 'oxfmt';
// Downstream usage simulation: exercises this package exactly the way
// consumers do (per README/docs), using the REAL upstream `defineConfig`
// from `oxlint` / `oxfmt`. Must typecheck with zero casts.
import { defineConfig as defineOxlintConfig } from 'oxlint';

import { next, nextjs, recommended, typeAware, vite } from '../../dist/index.js';
import { oxfmtConfig } from '../../dist/oxfmt.js';

export const lintRecommended = defineOxlintConfig({ extends: [recommended] });
export const lintVite = defineOxlintConfig({ extends: [vite] });
export const lintNext = defineOxlintConfig({ extends: [next] });
export const lintNextAlias = defineOxlintConfig(nextjs);
export const lintMixed = defineOxlintConfig({ extends: [vite, typeAware] });
export const lintOverride = defineOxlintConfig({
  extends: [vite],
  rules: { 'no-console': 'off' },
});

export const format = defineOxfmtConfig({ ...oxfmtConfig });
export const formatOverride = defineOxfmtConfig({ ...oxfmtConfig, printWidth: 100 });
