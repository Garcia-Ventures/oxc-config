/**
 * @gv-tech/oxc-config - TypeScript library Oxlint configuration
 *
 * `typescript` with Node globals only. `window` and `document` are undefined
 * in JS files. `no-console` stays a warning, unlike the `node` preset, which
 * turns it off for servers and CLIs.
 *
 * This is the package default (`recommended`).
 */

import { compose } from './compose.js';
import type { OxlintConfig } from './types.js';
import { typescript } from './typescript.js';

export const library: OxlintConfig = compose(typescript, {
  env: {
    browser: false,
    node: true,
  },
});

export default library;
