#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const manifestPath = path.join(root, 'review_indexes', 'data', 'manifest.json');
const host = process.env.REVIEW_INDEX_HOST || '127.0.0.1';
const port = Number(process.env.REVIEW_INDEX_PORT || '8123');
const limit = process.env.REVIEW_INDEX_LIMIT ? Number(process.env.REVIEW_INDEX_LIMIT) : null;
const force = process.env.REVIEW_INDEX_FORCE === '1';
const baseUrl = `http://${host}:${port}`;

if (!fs.existsSync(manifestPath)) {
  console.error(`Manifest not found: ${manifestPath}`);
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const entries = manifest.entries || [];
const filtered = limit ? entries.slice(0, limit) : entries;

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function waitMs(entry) {
  const haystack = `${entry.path} ${entry.title} ${(entry.tags || []).join(' ')}`.toLowerCase();
  if (['stream', 'bump', 'denseline', 'time', 'animation', 'perlin', 'noise', 'oracle', 'summoning'].some(token => haystack.includes(token))) {
    return '3200';
  }
  return '1800';
}

let ok = 0;
let skipped = 0;
let failed = 0;

for (const entry of filtered) {
  const outputPath = path.join(root, 'review_indexes', entry.screenshot_path);
  ensureDir(outputPath);
  if (!force && fs.existsSync(outputPath)) {
    console.log(`SKIP ${entry.path}`);
    skipped += 1;
    continue;
  }
  const url = `${baseUrl}/${entry.path}`;
  try {
    console.log(`SHOT ${entry.path}`);
    execFileSync(
      'npx',
      [
        '-y',
        'playwright',
        'screenshot',
        '--browser', 'chromium',
        '--viewport-size', '1600,1040',
        '--timeout', '25000',
        '--wait-for-timeout', waitMs(entry),
        url,
        outputPath,
      ],
      { stdio: 'pipe', encoding: 'utf8', cwd: root },
    );
    ok += 1;
  } catch (error) {
    console.error(`FAIL ${entry.path}: ${error?.stderr || error?.message || error}`);
    failed += 1;
  }
}

console.log(`Done. ok=${ok} skipped=${skipped} failed=${failed}`);
if (failed > 0) process.exitCode = 2;
