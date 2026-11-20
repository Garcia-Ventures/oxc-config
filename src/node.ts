/**
 * @gv-tech/oxc-config - Node.js Oxlint configuration
 *
 * Extends base for pure Node.js projects (CLI tools, backend services,
 * libraries). Drops the `browser` env that `base` sets, so browser
 * globals (`window`, `document`, `navigator`, etc.) aren't implied.
 *
 * Use for:
 *
 * - Node.js libraries and CLIs
 * - Backend services without React / Vite / Next.js
 *
 * For TypeScript Node projects, pair with the `typescript` preset:
 *
 * ```ts
 * import { defineConfig } from 'oxlint';
 * import { node } from '@gv-tech/oxc-config/node';
 * import { typescript } from '@gv-tech/oxc-config/typescript';
 *
 * export default defineConfig({ extends: [node, typescript] });
 * ```
 *
 * Note: `typescript` redeclares `browser: true` in its env (inherited from
 * `base`), so the combined config still implies browser globals. That's
 * harmless for Node code — it just won't flag `window` — but if you want a
 * strictly Node-only env, extend `node` alone and add TS rules manually.
 */

import { base } from './base.js';
import type { OxlintConfig } from './types.js';

export const node: OxlintConfig = {
  extends: [base],
  env: {
    node: true,
  },
  rules: {
    // Node servers and CLIs commonly use console for logging; relax base's
    // `no-console: warn` to `off` so it doesn't flag normal server output.
    'no-console': 'off',
  },
};

export default node;
