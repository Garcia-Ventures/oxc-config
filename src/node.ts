/**
 * @gv-tech/oxc-config - Node.js Oxlint configuration
 *
 * TypeScript library rules plus `no-console: off`, for CLIs, backend
 * services, and Node libraries that log. Browser globals are off, so JS
 * files that reference `window` fail `no-undef`.
 *
 * ```ts
 * import { defineConfig } from 'oxlint';
 * import { node } from '@gv-tech/oxc-config/node';
 * export default defineConfig(node);
 * ```
 */

import { compose } from './compose.js';
import { library } from './library.js';
import type { OxlintConfig } from './types.js';

export const node: OxlintConfig = compose(library, {
  rules: {
    'no-console': 'off',
  },
});

export default node;
