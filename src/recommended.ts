/**
 * @gv-tech/oxc-config - Recommended Oxlint configuration
 *
 * The safe default for a repo that is not a specific framework app:
 * TypeScript, Node globals, no React, no Vitest, no Next.js.
 *
 * Earlier releases aliased `recommended` to the Vite preset. Vite apps
 * should import `vite`. Next.js apps should import `next`.
 */

import { library } from './library.js';
import type { OxlintConfig } from './types.js';

export const recommended: OxlintConfig = library;

export default recommended;
