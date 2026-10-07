#!/usr/bin/env node
/* eslint-disable no-console -- CLI runner: console output is the interface. */
// gv-oxfmt — zero-config Oxfmt runner using this package's shared style.
//
// Resolves the bundled dist/oxfmt.json and forwards all args to oxfmt:
//   gv-oxfmt --write .
//   gv-oxfmt --check .
//
// This lets projects WITHOUT a package.json / oxfmt config reuse the
// Garcia Ventures style via:
//   npx --package oxfmt --package @gv-tech/oxc-config@latest gv-oxfmt --write .
//   bun x --package oxfmt --package @gv-tech/oxc-config@latest gv-oxfmt --write .
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const configPath = resolve(here, '../dist/oxfmt.json');

if (!existsSync(configPath)) {
  console.error(`gv-oxfmt: bundled config not found at ${configPath}`);
  console.error('If running from source, run the build first: bun run build');
  process.exit(1);
}

const args = process.argv.slice(2);
const hasExplicitConfig = args.some(
  (a) => a === '-c' || a === '--config' || a.startsWith('-c=') || a.startsWith('--config='),
);
const forwarded = hasExplicitConfig ? args : ['-c', configPath, ...args];

function run(command, withArgs) {
  return spawnSync(command, withArgs, { stdio: 'inherit', shell: process.platform === 'win32' });
}

// Prefer a locally installed oxfmt (PATH) so versions resolve naturally.
// Fall back to npx pinning latest when oxfmt is not usable from PATH
// (missing binary, or a version-manager shim with no version configured —
// both surface as ENOENT or shell 126/127, not as oxfmt's own exit codes).
let result = run('oxfmt', forwarded);
if (result.error?.code === 'ENOENT' || result.status === 126 || result.status === 127) {
  result = run('npx', ['--yes', 'oxfmt@latest', ...forwarded]);
}

if (result.error) {
  console.error(`gv-oxfmt: failed to launch oxfmt: ${result.error.message}`);
  process.exit(1);
}
process.exit(result.status ?? 1);
