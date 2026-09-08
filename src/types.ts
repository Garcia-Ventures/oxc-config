/**
 * @gv-tech/oxc-config - Shared Oxlint/Oxfmt config types
 *
 * Structural types compatible with `defineConfig` from `oxlint` and `oxfmt`.
 * Kept local (not importing `oxlint`/`oxfmt` at type level) so the package
 * has zero runtime dependencies and peers stay optional.
 */

/** ESLint-style severity accepted by Oxlint */
export type OxlintSeverity = 'off' | 'allow' | 'warn' | 'error' | 'deny';

/** A single rule entry: severity or [severity, options] */
export type OxlintRuleEntry = OxlintSeverity | [OxlintSeverity, ...unknown[]];

/** Per-file override block */
export interface OxlintOverride {
  files: string[];
  excludeFiles?: string[];
  plugins?: string[];
  env?: Record<string, boolean>;
  globals?: Record<string, 'readonly' | 'writable' | 'off' | boolean>;
  rules?: Record<string, OxlintRuleEntry>;
}

/** Top-level Oxlint config object (extends-aware) */
export interface OxlintConfig {
  $schema?: string;
  categories?: Record<string, OxlintSeverity>;
  plugins?: string[];
  jsPlugins?: Array<string | { name: string; specifier: string }>;
  env?: Record<string, boolean>;
  globals?: Record<string, 'readonly' | 'writable' | 'off' | boolean>;
  settings?: Record<string, unknown>;
  rules?: Record<string, OxlintRuleEntry>;
  overrides?: OxlintOverride[];
  ignorePatterns?: string[];
  extends?: Array<OxlintConfig | string>;
}

/** Oxfmt override block */
export interface OxfmtOverride {
  files: string[];
  excludeFiles?: string[];
  options: OxfmtConfig;
}

/** Top-level Oxfmt config object */
export interface OxfmtConfig {
  $schema?: string;
  printWidth?: number;
  tabWidth?: number;
  useTabs?: boolean;
  semi?: boolean;
  singleQuote?: boolean;
  jsxSingleQuote?: boolean;
  trailingComma?: 'all' | 'es5' | 'none';
  bracketSpacing?: boolean;
  bracketSameLine?: boolean;
  arrowParens?: 'always' | 'avoid';
  endOfLine?: 'lf' | 'crlf' | 'cr';
  insertFinalNewline?: boolean;
  quoteProps?: 'as-needed' | 'consistent' | 'preserve';
  objectWrap?: 'preserve' | 'collapse';
  proseWrap?: 'always' | 'never' | 'preserve';
  singleAttributePerLine?: boolean;
  embeddedLanguageFormatting?: 'auto' | 'off';
  ignorePatterns?: string[];
  overrides?: OxfmtOverride[];
  sortImports?: boolean | Record<string, unknown>;
  sortPackageJson?: boolean | Record<string, unknown>;
  sortTailwindcss?: boolean | Record<string, unknown>;
  jsdoc?: boolean | Record<string, unknown>;
  [key: string]: unknown;
}
