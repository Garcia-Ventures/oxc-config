/**
 * @gv-tech/oxc-config
 *
 *   Shareable Oxlint + Oxfmt configuration for Garcia Ventures projects.
 */

import { base } from './base.js';
import { allJsTsFiles, commonIgnores, jsFiles, nextIgnores, tsFiles, viteIgnores } from './ignores.js';
import { next } from './next.js';
import { oxfmtConfig } from './oxfmt.js';
import { react } from './react.js';
import { recommended } from './recommended.js';
import { typeAware } from './type-aware.js';
import type { OxlintConfig } from './types.js';
import { typescript } from './typescript.js';
import { vite } from './vite.js';

export {
  allJsTsFiles,
  base,
  commonIgnores,
  jsFiles,
  next,
  nextIgnores,
  oxfmtConfig,
  react,
  recommended,
  tsFiles,
  typeAware,
  typescript,
  viteIgnores,
  vite,
};

export type { OxfmtConfig, OxlintConfig } from './types.js';

/** Next.js + recommended preset alias (mirrors eslint-config `nextjs`) */
export const nextjs: OxlintConfig = { extends: [next] };

/** Default export is the recommended preset */
export default recommended;
