import { defineConfig } from 'oxlint';

import { configure } from './dist/configure.js';

export default defineConfig(
  configure('node', {
    // Fixture sources are invalid on purpose. The apply test lints a copy.
    ignorePatterns: ['test/fixtures/**'],
  }),
);
