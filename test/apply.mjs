// Runs oxlint against fixture files and the resolved config.
// Proves categories, ignore patterns, and env survive when a preset is the
// root config, and that wrapping the same preset in `extends` drops env,
// ignore patterns, and settings.
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const oxlintBin = join(root, 'node_modules', '.bin', 'oxlint');
const oxlintEntry = pathToFileURL(join(root, 'node_modules', 'oxlint', 'dist', 'index.js')).href;
const configureEntry = pathToFileURL(join(root, 'dist', 'configure.js')).href;
const viteEntry = pathToFileURL(join(root, 'dist', 'vite.js')).href;
const fixtures = join(here, 'fixtures');

function runOxlint(cwd, args) {
  const result = spawnSync(oxlintBin, args, { cwd, encoding: 'utf8' });
  return { status: result.status, stdout: result.stdout, stderr: result.stderr };
}

async function writeConfig(dir, body) {
  const configPath = join(dir, 'oxlint.config.ts');
  await writeFile(configPath, body);
  return configPath;
}

const work = await mkdtemp(join(tmpdir(), 'oxc-config-apply-'));

try {
  await cp(fixtures, work, { recursive: true });
  // Written here so the file does not have to live under a gitignored dist/ directory.
  await mkdir(join(work, 'dist'), { recursive: true });
  await writeFile(join(work, 'dist', 'skip.js'), 'Object.prototype.hack = 1;\nconst view = window;\n');

  await writeConfig(
    work,
    `import { defineConfig } from ${JSON.stringify(oxlintEntry)};
import { configure } from ${JSON.stringify(configureEntry)};
export default defineConfig(configure('node'));
`,
  );

  // `-c` must be relative to cwd. An absolute path loads the config but does
  // not apply its ignorePatterns (oxlint 1.94).
  const nodeRun = runOxlint(work, ['-c', 'oxlint.config.ts', '--disable-nested-config', '-f', 'json', '.']);
  const nodeReport = JSON.parse(nodeRun.stdout);
  const nodeDiags = nodeReport.diagnostics ?? [];
  assert.equal(nodeReport.number_of_files, 3, 'dist/ is ignored; the config plus two sources are linted');
  assert.ok(
    nodeDiags.some(
      (diag) =>
        diag.filename === 'suspect.js' && diag.code === 'eslint(no-extend-native)' && diag.severity === 'warning',
    ),
    'suspicious category warns on the node preset',
  );
  assert.ok(
    nodeDiags.some(
      (diag) => diag.filename === 'window.js' && diag.code === 'eslint(no-undef)' && diag.severity === 'error',
    ),
    'node env flags window',
  );
  assert.ok(
    nodeDiags.every((diag) => !String(diag.filename).includes('dist/')),
    'ignored dist file produces no diagnostics',
  );

  await writeConfig(
    work,
    `import { defineConfig } from ${JSON.stringify(oxlintEntry)};
import { vite } from ${JSON.stringify(viteEntry)};
export default defineConfig(vite);
`,
  );
  const viteRun = runOxlint(work, ['-c', 'oxlint.config.ts', '--disable-nested-config', '-f', 'json', '.']);
  const viteReport = JSON.parse(viteRun.stdout);
  const viteDiags = viteReport.diagnostics ?? [];
  assert.equal(viteReport.number_of_files, 3, 'dist/ is ignored; the config plus two sources are linted');
  assert.ok(
    viteDiags.some((diag) => diag.filename === 'suspect.js' && diag.code === 'eslint(no-extend-native)'),
    'suspicious category warns on the vite preset',
  );
  assert.ok(
    !viteDiags.some((diag) => diag.filename === 'window.js' && diag.code === 'eslint(no-undef)'),
    'vite env allows window',
  );

  await writeConfig(
    work,
    `import { defineConfig } from ${JSON.stringify(oxlintEntry)};
import { vite } from ${JSON.stringify(viteEntry)};
export default defineConfig({ extends: [vite] });
`,
  );
  const extendsRun = runOxlint(work, ['--print-config', '-c', 'oxlint.config.ts', '--disable-nested-config']);
  assert.equal(extendsRun.status, 0, extendsRun.stderr);
  const extended = JSON.parse(extendsRun.stdout);
  assert.equal(extended.env?.browser, undefined, 'extends drops the browser env');
  assert.equal((extended.ignorePatterns ?? []).length, 0, 'extends drops ignore patterns');
  assert.equal(extended.settings?.react?.version ?? null, null, 'extends drops settings.react.version');
  assert.equal(extended.categories?.suspicious, 'warn', 'extends still merges categories');

  await writeConfig(
    work,
    `import { defineConfig } from ${JSON.stringify(oxlintEntry)};
import { vite } from ${JSON.stringify(viteEntry)};
export default defineConfig(vite);
`,
  );
  const rootRun = runOxlint(work, ['--print-config', '-c', 'oxlint.config.ts', '--disable-nested-config']);
  assert.equal(rootRun.status, 0, rootRun.stderr);
  const rooted = JSON.parse(rootRun.stdout);
  assert.equal(rooted.env?.browser, true, 'root vite config keeps the browser env');
  assert.ok(
    (rooted.ignorePatterns ?? []).some((pattern) => pattern.includes('dist')),
    'root vite config keeps ignore patterns',
  );
  assert.equal(rooted.settings?.react?.version, '19.0.0', 'root vite config keeps the React version');
  assert.equal(rooted.categories?.suspicious, 'warn', 'root vite config keeps categories');

  const fixtureSource = await readFile(join(fixtures, 'suspect.js'), 'utf8');
  assert.match(fixtureSource, /Object\.prototype\.hack/);
} finally {
  await rm(work, { recursive: true, force: true });
}

console.log('oxlint apply tests passed.');
