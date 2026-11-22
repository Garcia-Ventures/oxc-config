/**
 * TS 6 compatibility consumer.
 *
 * Checked with `tsc6` (TypeScript 6 from `@typescript/typescript6`) with `skipLibCheck: false`, so every `dist/*.d.ts`
 * emitted by the TS 7 build is fully parsed by the TS 6 compiler. If TS 7 emit ever uses syntax or lib types unreadable
 * by TS 6, this file fails to typecheck.
 */

import { base } from '../../dist/base.js';
import { configure, type ConfigureOptions, type ProjectKind } from '../../dist/configure.js';
import { expo } from '../../dist/expo.js';
import {
  allJsTsFiles,
  commonIgnores,
  expoIgnores,
  formatIgnores,
  jsFiles,
  nextIgnores,
  tsFiles,
  viteIgnores,
} from '../../dist/ignores.js';
import { next, nextjs } from '../../dist/index.js';
import { library } from '../../dist/library.js';
import { node } from '../../dist/node.js';
import { oxfmtConfig } from '../../dist/oxfmt.js';
import { react } from '../../dist/react.js';
import recommendedDefault, { recommended } from '../../dist/recommended.js';
import { typeAware } from '../../dist/type-aware.js';
import type { OxfmtConfig, OxlintConfig } from '../../dist/types.js';
import { typescript } from '../../dist/typescript.js';
import { vite } from '../../dist/vite.js';

const lintPresets: OxlintConfig[] = [
  base,
  typescript,
  library,
  react,
  vite,
  next,
  expo,
  node,
  recommended,
  typeAware,
  nextjs,
  recommendedDefault,
  configure(vite, { typeAware: true, reactVersion: '18.3.1' }),
];

const kind: ProjectKind = 'node';
const options: ConfigureOptions = { typeAware: 'rules', ignorePatterns: ['generated/**'] };
const configured: OxlintConfig = configure(kind, options);

const nodeDropsBrowser: boolean = node.env?.browser === false;
const recommendedIsLibrary: boolean = recommended === library;
const typeAwareEnabled: boolean = configure('library', { typeAware: true }).options?.typeAware === true;

const fmt: OxfmtConfig = oxfmtConfig;

const ignoreLists: string[][] = [commonIgnores, viteIgnores, nextIgnores, expoIgnores, formatIgnores];
const filePatterns: string[][] = [allJsTsFiles, jsFiles, tsFiles];

export {
  configured,
  filePatterns,
  fmt,
  ignoreLists,
  lintPresets,
  nodeDropsBrowser,
  recommendedIsLibrary,
  typeAwareEnabled,
};
