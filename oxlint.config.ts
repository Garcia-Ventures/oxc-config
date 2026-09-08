import { defineConfig } from 'oxlint';

import { recommended } from './dist/index.js';

export default defineConfig({
  extends: [recommended],
});
