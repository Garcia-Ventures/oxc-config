/**
 * @gv-tech/oxc-config - React Oxlint configuration
 *
 * Extends TypeScript with `react` + `jsx-a11y`. React Compiler lint rules
 * are experimental upstream and stay off by default.
 */

import type { OxlintConfig } from './types.js';
import { typescript } from './typescript.js';

export const react: OxlintConfig = {
  extends: [typescript],
  plugins: ['eslint', 'typescript', 'import', 'react', 'jsx-a11y', 'unicorn', 'oxc'],
  settings: {
    react: { version: '19.0.0' },
  },
  rules: {
    'react/self-closing-comp': 'warn',
    'react/jsx-no-useless-fragment': 'warn',
    'react/jsx-key': 'error',
    'jsx-a11y/alt-text': 'warn',
    'jsx-a11y/anchor-is-valid': 'warn',
  },
};

export default react;
