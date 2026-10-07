// Generates dist/oxfmt.json from the canonical src/oxfmt.ts config.
// Run after `tsc` (dist/oxfmt.js must exist). Keeps the published JSON
// artifact in sync with `oxfmtConfig` — never hand-edit the JSON.
/* eslint-disable no-console -- build script: progress logging is intended. */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const outFile = resolve(root, 'dist', 'oxfmt.json');

const { oxfmtConfig } = await import('../dist/oxfmt.js');

if (!oxfmtConfig || typeof oxfmtConfig !== 'object') {
  throw new Error('generate-oxfmt-json: dist/oxfmt.js did not export oxfmtConfig');
}

await mkdir(dirname(outFile), { recursive: true });
await writeFile(outFile, `${JSON.stringify(oxfmtConfig, null, 2)}\n`, 'utf8');

console.log(`Wrote ${outFile}`);
