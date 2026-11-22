/**
 * Merge Oxlint config objects into one root config.
 *
 * Oxlint inherits `rules`, `plugins`, `overrides`, and `categories` through
 * `extends`, and drops `env`, `ignorePatterns`, and `settings`. Every preset
 * this package publishes is therefore a single object with those fields set
 * on it, meant to be the default export of `oxlint.config.ts`.
 */

import type { OxlintConfig } from './types.js';

function unionPlugins(parent: OxlintConfig['plugins'], overlay: OxlintConfig['plugins']): OxlintConfig['plugins'] {
  const merged: NonNullable<OxlintConfig['plugins']> = [];
  const seen = new Set<string>();
  for (const plugin of [...(parent ?? []), ...(overlay ?? [])]) {
    const key = typeof plugin === 'string' ? plugin : JSON.stringify(plugin);
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(plugin);
  }
  return merged;
}

function unionStrings(parent: string[] | undefined, overlay: string[] | undefined): string[] {
  const merged: string[] = [];
  const seen = new Set<string>();
  for (const pattern of [...(parent ?? []), ...(overlay ?? [])]) {
    if (seen.has(pattern)) continue;
    seen.add(pattern);
    merged.push(pattern);
  }
  return merged;
}

function mergeSettings(
  parent: OxlintConfig['settings'],
  overlay: OxlintConfig['settings'],
): OxlintConfig['settings'] | undefined {
  if (!parent && !overlay) return undefined;
  const react = parent?.react || overlay?.react ? { ...parent?.react, ...overlay?.react } : undefined;
  return {
    ...parent,
    ...overlay,
    ...(react ? { react } : {}),
  };
}

/** Deep-merge `overlay` onto `parent`. Later rules, categories, env, and settings win. */
export function compose(parent: OxlintConfig, overlay: OxlintConfig = {}): OxlintConfig {
  const settings = mergeSettings(parent.settings, overlay.settings);
  const options = { ...parent.options, ...overlay.options };
  const globals = { ...parent.globals, ...overlay.globals };
  const overrides = [...(parent.overrides ?? []), ...(overlay.overrides ?? [])];
  const extended = [...(parent.extends ?? []), ...(overlay.extends ?? [])];

  const config: OxlintConfig = {
    categories: { ...parent.categories, ...overlay.categories },
    plugins: unionPlugins(parent.plugins, overlay.plugins),
    env: { ...parent.env, ...overlay.env },
    ignorePatterns: unionStrings(parent.ignorePatterns, overlay.ignorePatterns),
    rules: { ...parent.rules, ...overlay.rules },
  };

  if (overrides.length > 0) config.overrides = overrides;
  if (settings) config.settings = settings;
  if (Object.keys(options).length > 0) config.options = options;
  if (Object.keys(globals).length > 0) config.globals = globals;
  if (extended.length > 0) config.extends = extended;
  if (overlay.jsPlugins) config.jsPlugins = overlay.jsPlugins;
  else if (parent.jsPlugins) config.jsPlugins = parent.jsPlugins;

  return config;
}
