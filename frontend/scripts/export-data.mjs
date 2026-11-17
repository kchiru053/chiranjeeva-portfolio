// Writes backend/src/main/resources/portfolio.json from src/data/portfolio.ts,
// so the Spring Boot API serves exactly what the frontend bundles.
import { build } from 'esbuild';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const entry = resolve(here, '../src/data/portfolio.ts');
const out = resolve(here, '../../backend/src/main/resources/portfolio.json');
const tmp = mkdtempSync(join(tmpdir(), 'portfolio-'));
const file = join(tmp, 'portfolio.mjs');

await build({ entryPoints: [entry], outfile: file, bundle: true, format: 'esm', platform: 'node', logLevel: 'silent' });
const mod = await import(pathToFileURL(file).href);
const json = JSON.parse(JSON.stringify({ ...mod })); // drops `undefined` (e.g. no portrait / no linkedin)
writeFileSync(out, JSON.stringify(json, null, 2) + '\n');
rmSync(tmp, { recursive: true, force: true });
console.log(`Wrote ${out} (${Object.keys(json).join(', ')})`);
