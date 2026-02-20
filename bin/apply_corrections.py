#!/usr/bin/env python3
"""
apply_corrections.py
Read palette_corrections.csv and patch bg + colors[] in the JS palette files.

Usage:
    python3 apply_corrections.py              # patch all entries in CSV
    python3 apply_corrections.py --only KEY   # single entry
    python3 apply_corrections.py --dry-run    # show diffs, don't write
"""

import re
import sys
import csv
import difflib
import argparse
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
PAINTINGS_DIR = ROOT_DIR / 'tools' / 'paintings'
META_DIR = PAINTINGS_DIR / '.meta'
CSV_IN = META_DIR / 'palette_corrections.csv'

PALETTE_FILES = [
    ROOT_DIR / 'js_funct' / 'artist_palettes' / 'old_masters.js',
    ROOT_DIR / 'js_funct' / 'artist_palettes' / 'impressionism.js',
    ROOT_DIR / 'js_funct' / 'artist_palettes' / 'expressionism_fauvism.js',
    ROOT_DIR / 'js_funct' / 'artist_palettes' / 'cubism_bauhaus.js',
    ROOT_DIR / 'js_funct' / 'artist_palettes' / 'surrealism.js',
    ROOT_DIR / 'js_funct' / 'artist_palettes' / 'abstract_expressionism.js',
    ROOT_DIR / 'js_funct' / 'artist_palettes' / 'pop_minimal.js',
    ROOT_DIR / 'js_funct' / 'artist_palettes' / 'americas.js',
    ROOT_DIR / 'js_funct' / 'artist_palettes' / 'contemporary.js',
]

LABELS = ['dominant', 'secondary', 'tertiary',
          'accent', 'accent', 'accent', 'accent', 'accent',
          'accent', 'accent', 'accent', 'accent',
          'accent', 'accent', 'accent', 'accent']


def patch_entry(content, key, new_bg, new_colors, pcts):
    """Replace bg, colors[], and pcts[] for key in JS content. Returns patched string."""
    # Build new colors block with percentage comments
    lines = []
    for i, (hex_c, label) in enumerate(zip(new_colors, LABELS)):
        pct = pcts[i] if i < len(pcts) else 0.0
        lines.append(f"                '{hex_c}',   // {label} ({pct:.1f}%)")
    new_colors_block = "[\n" + "\n".join(lines) + "\n            ]"

    # Build compact pcts line
    pcts_values = ', '.join(f'{p:.1f}' for p in pcts)
    new_pcts_line = f'[{pcts_values}]'

    entry_start = re.search(rf'\b{re.escape(key)}\s*:\s*\{{', content)
    if not entry_start:
        print(f"    WARNING: could not find entry block for '{key}'")
        return content

    # Walk braces to find end of this entry block
    start = entry_start.start()
    brace_depth = 0
    end = start
    for i, ch in enumerate(content[start:], start=start):
        if ch == '{':
            brace_depth += 1
        elif ch == '}':
            brace_depth -= 1
            if brace_depth == 0:
                end = i + 1
                break

    entry_block = content[start:end]

    entry_block = re.sub(
        r"(bg:\s*)'[^']*'",
        rf"\1'{new_bg}'",
        entry_block
    )
    entry_block = re.sub(
        r'(colors:\s*)\[.*?\]',
        rf'\1{new_colors_block}',
        entry_block,
        flags=re.DOTALL
    )

    # Remove any existing pcts field, then insert fresh before useBoxMuller
    entry_block = re.sub(r'\n\s*pcts:\s*\[.*?\],?', '', entry_block, flags=re.DOTALL)
    entry_block = re.sub(
        r'(\n(\s*)useBoxMuller)',
        rf'\n\2pcts: {new_pcts_line},\1',
        entry_block
    )

    return content[:start] + entry_block + content[end:]


def show_diff(old, new, filename):
    diff = list(difflib.unified_diff(
        old.splitlines(keepends=True),
        new.splitlines(keepends=True),
        fromfile=f'a/{filename}',
        tofile=f'b/{filename}',
        n=2
    ))
    if diff:
        print(''.join(diff[:60]))  # cap at 60 lines per entry


def main():
    parser = argparse.ArgumentParser(description='Apply k-means palette corrections to JS files')
    parser.add_argument('--only',    help='Process only this palette key')
    parser.add_argument('--dry-run', action='store_true', help='Show diffs but do not write')
    args = parser.parse_args()

    if not CSV_IN.exists():
        print(f"Error: {CSV_IN} not found. Run batch_palette.py first.")
        sys.exit(1)

    # Load CSV
    rows = {}
    with open(CSV_IN) as f:
        for row in csv.DictReader(f):
            rows[row['key']] = row

    print(f"Loaded {len(rows)} entries from {CSV_IN}")

    if args.only:
        if args.only not in rows:
            print(f"Key '{args.only}' not found in CSV.")
            sys.exit(1)
        rows = {args.only: rows[args.only]}

    # Build file→keys map from CSV (using 'file' column)
    file_keys = {}
    for key, row in rows.items():
        fname = row['file']
        # Find full path
        path = next((p for p in PALETTE_FILES if Path(p).name == fname), None)
        if path is None:
            print(f"  WARNING: no palette file found for '{fname}' (key={key})")
            continue
        file_keys.setdefault(path, []).append(key)

    patched_total = 0
    skipped_total = 0

    for filepath, keys in file_keys.items():
        path = Path(filepath)
        if not path.exists():
            print(f"  WARNING: {filepath} does not exist, skipping")
            continue

        original = path.read_text()
        content  = original
        print(f"\n── {path.name} ({len(keys)} entries) ──")

        for key in keys:
            row = rows[key]
            new_bg = row['bg']
            new_colors = [row[f'c{i}'] for i in range(16) if row.get(f'c{i}')]
            pcts       = [float(row[f'pct{i}']) for i in range(16) if row.get(f'pct{i}')]

            if not new_colors:
                print(f"  {key}: no colors in CSV, skipping")
                skipped_total += 1
                continue

            patched = patch_entry(content, key, new_bg, new_colors, pcts)

            if patched == content:
                print(f"  {key}: no change (entry not found or already matches)")
                skipped_total += 1
                continue

            print(f"  {key}: bg={new_bg}  colors={new_colors[:3]}...")
            if args.dry_run:
                show_diff(content, patched, path.name)

            content = patched
            patched_total += 1

        if not args.dry_run and content != original:
            path.write_text(content)
            print(f"  → wrote {filepath}")

    print(f"\n── Done ──────────────────────────────────")
    print(f"Patched:  {patched_total}")
    print(f"Skipped:  {skipped_total}")
    if args.dry_run:
        print("(dry-run: no files written)")


if __name__ == '__main__':
    main()
