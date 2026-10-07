/**
 * @gv-tech/oxc-config - Shared Oxlint/Oxfmt config types
 *
 * These are the REAL upstream config types (`oxlint`, `oxfmt`), re-exported
 * under their usual names. Every preset in this package is annotated with
 * them, so downstream `defineConfig` consumption typechecks with zero casts:
 *
 * ```ts
 * import { defineConfig } from 'oxlint';
 * import { vite } from '@gv-tech/oxc-config/vite';
 * export default defineConfig({ extends: [vite] }); // no cast needed
 * ```
 *
 * `import type` is fully erased at build time, so the package keeps zero
 * runtime dependencies. (`oxlint`/`oxfmt` are mandatory peers; only
 * `typescript` is an optional peer.)
 */

export type { OxlintConfig, OxlintEnv, OxlintGlobals, OxlintOverride } from 'oxlint';
export type { OxfmtConfig, OxfmtOverrideConfig as OxfmtOverride } from 'oxfmt';

/**
 * Rule severity accepted by Oxlint.
 *
 * @deprecated Import `AllowWarnDeny` from `oxlint` instead. Kept for
 * backwards compatibility; note upstream also accepts `number`.
 */
export type OxlintSeverity = 'off' | 'allow' | 'warn' | 'error' | 'deny';

/**
 * A single rule entry: severity or [severity, options].
 *
 * @deprecated Prefer the per-rule types in `oxlint`'s `DummyRuleMap`
 * (upstream rule options differ per rule). Kept for backwards compatibility.
 */
export type OxlintRuleEntry = OxlintSeverity | [OxlintSeverity, ...unknown[]];
