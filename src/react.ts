/**
 * @gv-tech/oxc-config - React Oxlint configuration
 *
 * Flat composition of `typescript` plus `react` and `jsx-a11y`. React Compiler
 * lint rules are experimental upstream and stay off by default.
 *
 * The React version lives on this object (`settings.react.version`) because
 * Oxlint does not inherit `settings` through `extends`. Override it with
 * `configure(react, { reactVersion: '18.3.1' })`.
 */

import { compose } from './compose.js';
import type { OxlintConfig } from './types.js';
import { typescript } from './typescript.js';

/** Default `settings.react.version` for React presets. */
export const defaultReactVersion = '19.0.0';

export const react: OxlintConfig = compose(typescript, {
  plugins: ['react', 'jsx-a11y'],
  settings: {
    react: { version: defaultReactVersion },
  },
  rules: {
    'react/self-closing-comp': 'warn',
    'react/jsx-no-useless-fragment': 'warn',
    'react/jsx-key': 'error',
    'jsx-a11y/alt-text': 'warn',
    'jsx-a11y/anchor-is-valid': 'warn',
  },
});

export default react;
