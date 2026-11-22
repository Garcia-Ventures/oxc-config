/**
 * @gv-tech/oxc-config
 *
 * Shareable Oxlint + Oxfmt configuration for Garcia Ventures projects.
 *
 * Use a preset as the root Oxlint config (`defineConfig(vite)`), or
 * `configure(preset, overrides)` when a project needs to add rules, ignores,
 * or type-aware linting. Do not wrap presets in `extends`.
 */

import { base } from './base.js';
import { configure } from './configure.js';
import { expo } from './expo.js';
import {
  allJsTsFiles,
  commonIgnores,
  expoIgnores,
  formatIgnores,
  jsFiles,
  nextIgnores,
  tsFiles,
  viteIgnores,
} from './ignores.js';
import { library } from './library.js';
import { next } from './next.js';
import { node } from './node.js';
import { oxfmtConfig } from './oxfmt.js';
import { react } from './react.js';
import { recommended } from './recommended.js';
import { typeAware } from './type-aware.js';
import { typescript } from './typescript.js';
import { vite } from './vite.js';

export {
  allJsTsFiles,
  base,
  commonIgnores,
  configure,
  expo,
  expoIgnores,
  formatIgnores,
  jsFiles,
  library,
  next,
  nextIgnores,
  node,
  oxfmtConfig,
  react,
  recommended,
  tsFiles,
  typeAware,
  typescript,
  vite,
  viteIgnores,
};

export type { ConfigureOptions, ProjectKind } from './configure.js';
export type { OxfmtConfig, OxlintConfig } from './types.js';

/** Same object as `next`. Kept so existing `nextjs` imports keep working. */
export const nextjs = next;

/** Default export is the recommended preset (TypeScript library, Node globals). */
export default recommended;
