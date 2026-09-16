/**
 * TS 6 compatibility consumer.
 *
 * Checked with `tsc6` (TypeScript 6 from `@typescript/typescript6`) with `skipLibCheck: false`, so every `dist/*.d.ts`
 * emitted by the TS 7 build is fully parsed by the TS 6 compiler. If TS 7 emit ever uses syntax or lib types unreadable
 * by TS 6, this file fails to typecheck.
 */

import { base } from '../../dist/base.js';
import {
  allJsTsFiles,
  commonIgnores,
  formatIgnores,
  jsFiles,
  nextIgnores,
  tsFiles,
  viteIgnores,
} from '../../dist/ignores.js';
import { next, nextjs } from '../../dist/index.js';
import { oxfmtConfig } from '../../dist/oxfmt.js';
import { react } from '../../dist/react.js';
import recommendedDefault, { recommended } from '../../dist/recommended.js';
import { typeAware } from '../../dist/type-aware.js';
import type { OxfmtConfig, OxlintConfig } from '../../dist/types.js';
import { typescript } from '../../dist/typescript.js';
import { vite } from '../../dist/vite.js';

// Every lint preset must satisfy the shared config shape on TS 6.
const lintPresets: OxlintConfig[] = [
  base,
  typescript,
  react,
  vite,
  next,
  recommended,
  typeAware,
  nextjs,
  recommendedDefault,
];

// Preset composition must survive a TS 6 typecheck.
const tsExtendsBase: boolean = typescript.extends?.includes(base) ?? false;
const reactExtendsTs: boolean = react.extends?.includes(typescript) ?? false;
const viteExtendsReact: boolean = vite.extends?.includes(react) ?? false;
const nextExtendsReact: boolean = next.extends?.includes(react) ?? false;
const recommendedExtendsVite: boolean = recommended.extends?.includes(vite) ?? false;

// Formatter config must satisfy the shared shape on TS 6.
const fmt: OxfmtConfig = oxfmtConfig;

// Ignore-list exports must keep their array types on TS 6.
const ignoreLists: string[][] = [commonIgnores, viteIgnores, nextIgnores, formatIgnores];
const filePatterns: string[][] = [allJsTsFiles, jsFiles, tsFiles];

export {
  filePatterns,
  fmt,
  ignoreLists,
  lintPresets,
  nextExtendsReact,
  reactExtendsTs,
  recommendedExtendsVite,
  tsExtendsBase,
  viteExtendsReact,
};
