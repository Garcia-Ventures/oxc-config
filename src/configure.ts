/**
 * @gv-tech/oxc-config - Build a root Oxlint config for one project kind.
 *
 * ```ts
 * import { defineConfig } from 'oxlint';
 * import { configure } from '@gv-tech/oxc-config';
 *
 * export default defineConfig(configure('vite', { rules: { 'no-console': 'off' } }));
 * ```
 *
 * Pass the return value straight to `defineConfig`. Do not wrap it in
 * `extends`: Oxlint drops `env`, `ignorePatterns`, and `settings` from
 * extended objects.
 */

import { base } from './base.js';
import { compose } from './compose.js';
import { expo } from './expo.js';
import { library } from './library.js';
import { next } from './next.js';
import { node } from './node.js';
import { react } from './react.js';
import { recommended } from './recommended.js';
import { typeAware } from './type-aware.js';
import type { OxlintConfig } from './types.js';
import { typescript } from './typescript.js';
import { vite } from './vite.js';

/** Preset names accepted by `configure`. */
export type ProjectKind =
  | 'base'
  | 'typescript'
  | 'library'
  | 'node'
  | 'react'
  | 'vite'
  | 'next'
  | 'expo'
  | 'recommended';

const projectPresets = {
  base,
  typescript,
  library,
  node,
  react,
  vite,
  next,
  expo,
  recommended,
} as const satisfies Record<ProjectKind, OxlintConfig>;

/**
 * Fields merged onto a preset.
 *
 * `typeAware: true` is for the root `oxlint.config.ts` only. It sets
 * `options.typeAware` and adds the shared type-aware rules. Nested configs
 * must use `typeAware: 'rules'` (rules only) and enable the engine with
 * `oxlint --type-aware` from the repository root.
 */
export type ConfigureOptions = {
  rules?: OxlintConfig['rules'];
  categories?: OxlintConfig['categories'];
  plugins?: OxlintConfig['plugins'];
  overrides?: OxlintConfig['overrides'];
  ignorePatterns?: string[];
  env?: OxlintConfig['env'];
  settings?: OxlintConfig['settings'];
  options?: OxlintConfig['options'];
  globals?: OxlintConfig['globals'];
  /** `'rules'` adds the rule overrides and does not set `options.typeAware`. */
  typeAware?: boolean | 'rules';
  /** Replaces `settings.react.version` (default on React presets is 19.0.0). */
  reactVersion?: string;
};

function resolvePreset(preset: OxlintConfig | ProjectKind): OxlintConfig {
  if (typeof preset !== 'string') return preset;
  const selected = projectPresets[preset];
  if (!selected) {
    throw new Error(`@gv-tech/oxc-config: unknown preset "${preset}"`);
  }
  return selected;
}

/**
 * Merge `overrides` onto a preset and return one root config object.
 * Preset names: `base`, `typescript`, `library`, `node`, `react`, `vite`, `next`, `expo`, `recommended`.
 */
export function configure(preset: OxlintConfig | ProjectKind, overrides: ConfigureOptions = {}): OxlintConfig {
  const selected = resolvePreset(preset);
  const wantTypeRules = overrides.typeAware === true || overrides.typeAware === 'rules';
  const alreadyTypeAware = selected.options?.typeAware === true;
  const withTypeRules =
    wantTypeRules && !alreadyTypeAware ? compose(selected, { overrides: typeAware.overrides }) : selected;

  let config = compose(withTypeRules, {
    rules: overrides.rules,
    categories: overrides.categories,
    plugins: overrides.plugins,
    overrides: overrides.overrides,
    ignorePatterns: overrides.ignorePatterns,
    env: overrides.env,
    settings: overrides.settings,
    options: overrides.options,
    globals: overrides.globals,
  });

  if (overrides.reactVersion) {
    config = {
      ...config,
      settings: {
        ...config.settings,
        react: { ...config.settings?.react, version: overrides.reactVersion },
      },
    };
  }

  if (overrides.typeAware === true) {
    config = {
      ...config,
      options: { ...config.options, typeAware: true },
    };
  }

  return config;
}
