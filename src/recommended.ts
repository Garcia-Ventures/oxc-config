/**
 * @gv-tech/oxc-config - Recommended Oxlint configuration
 *
 * Sensible default: Vite-oriented but framework-agnostic.
 * `recommended` === base + TypeScript + React + Vite-light (test/config
 * overrides included, no Next.js rules). Vite and Next projects can use
 * their dedicated presets instead; plain TS/React libs can use this safely.
 */

import type { OxlintConfig } from './types.js';
import { vite } from './vite.js';

export const recommended: OxlintConfig = {
  extends: [vite],
};

export default recommended;
