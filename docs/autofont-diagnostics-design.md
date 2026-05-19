# AutoFont Diagnostics Helper Design

## Goal

Design a lightweight diagnostics tool for Unicode/font troubleshooting in Glyphmatic, especially for missing glyph rendering, broken local font paths, and suspicious fallback stacks.

## Relevant Files

- `js_funct/autoFont.js`
- `js_funct/autoFontVar.js`
- `js_glyph/2025_block_17/`
- `js_glyph/2025_var_blocks/`
- `js_glyph/countries/`
- `fonts/`, `tff/`, `otf/`
- glyph test pages under `2025_exp/glyphtesters/`

## Proposed Script

Create later as:
- `bin/autofont_diagnostics.py`

## Candidate Modes

### 1. Font file diagnostics
Check local font references and expected files.

Possible checks:
- font-family names referenced in data but missing local font files
- suspicious directory tokens
- expected `-Regular.ttf` / `-Regular.otf` resolution failures
- duplicate local font names across directories

### 2. Glyph-target diagnostics
Given a block and/or glyph, report:
- candidate font families
- generated fallback stack
- whether the glyph appears in the selected block dataset
- whether exclusions may be suppressing it

Example future usage:
- `python3 bin/autofont_diagnostics.py --block Gothic-Runic`
- `python3 bin/autofont_diagnostics.py --glyph ☯`
- `python3 bin/autofont_diagnostics.py --block Devanagari --sample 10`

### 3. Dataset integrity checks
- block exists in hex data but not in desc data
- block exists in desc data but not in block skeleton/lang mapping
- language family referenced but missing in font lookup tables

### 4. Preview-oriented output
For a future HTML or console mode, print:
- block name
- sample glyphs
- selected font stack
- probable local/google source path

## Output Shape

The helper should print:
- summary counts (FAIL/WARN/INFO)
- exact missing files or mappings
- per-block diagnostic sections
- optional `--json` output

## Useful Future Flags

- `--block <name>`
- `--glyph <char>`
- `--sample N`
- `--json`
- `--local-only`
- `--check-files`
- `--check-datasets`

## Manual QA Follow-Up

When a suspicious block/font pairing is found:
1. load the relevant glyphtester page
2. validate the glyph visually in browser
3. confirm whether the issue is missing coverage, bad font path, or a fallback-stack choice

## Non-Goals

- exact browser-render fidelity prediction in v1
- full font coverage crawling in v1
- modifying font mappings automatically in v1
