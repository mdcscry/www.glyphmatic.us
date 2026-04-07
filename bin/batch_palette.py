#!/usr/bin/env python3
"""
batch_palette.py
For each palette entry that has a downloaded image in tools/paintings/,
run k-means and write results to palette_corrections.csv.

Does NOT modify JS files. Use apply_corrections.py (or a future session)
to apply the CSV to the JS files when ready.

CSV columns: key, file, ref, bg, c0–c15, pct0–pct15

Usage:
    python3 batch_palette.py              # process all with images
    python3 batch_palette.py --only KEY   # single entry
    python3 batch_palette.py --clusters N # override k-means cluster count (default 16)
"""

import re
import sys
import csv
import argparse
import cv2
import numpy as np
from pathlib import Path
from sklearn.cluster import KMeans

ROOT_DIR = Path(__file__).resolve().parent.parent
PAINTINGS_DIR = ROOT_DIR / 'tools' / 'paintings'
META_DIR = PAINTINGS_DIR / '.meta'
CSV_OUT = META_DIR / 'palette_corrections.csv'

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
N_CLUSTERS    = 16
PALETTE_SIZE  = 16  # number of colors[] entries — keep all 16 clusters
SAMPLE_SIZE   = 80_000


# ── Color utilities ───────────────────────────────────────────────────────────

def bgr_to_hex(b, g, r):
    return f"#{int(round(r)):02X}{int(round(g)):02X}{int(round(b)):02X}"


def perceived_lightness(b, g, r):
    """Approximate perceptual lightness (0–1)."""
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255


# ── Image analysis ────────────────────────────────────────────────────────────

def analyze_image(img_path, n_clusters=N_CLUSTERS):
    """
    Returns (bg_hex, colors_list, cluster_info) where:
      bg_hex      — most dominant color by area
      colors_list — 8 hex strings chosen for variety + coverage
      cluster_info — list of (hex, pct) for all clusters, sorted by dominance
    """
    img = cv2.imread(str(img_path))
    if img is None:
        return None, None, None

    pixels = img.reshape(-1, 3).astype(np.float32)
    n = min(SAMPLE_SIZE, len(pixels))
    sample = pixels[np.random.choice(len(pixels), n, replace=False)]

    km = KMeans(n_clusters=n_clusters, n_init=10, random_state=42)
    km.fit(sample)

    labels, counts = np.unique(km.labels_, return_counts=True)
    order = counts.argsort()[::-1]
    centers = km.cluster_centers_[order]
    pcts    = counts[order] / counts[order].sum()

    cluster_info = [(bgr_to_hex(*c), float(p)) for c, p in zip(centers, pcts)]

    # bg = most dominant cluster
    bg_hex = cluster_info[0][0]

    # Take all clusters in dominance order (most → least)
    colors_list = [cluster_info[i][0] for i in range(min(PALETTE_SIZE, n_clusters))]

    return bg_hex, colors_list, cluster_info


# ── JS file parsing & patching ────────────────────────────────────────────────

def parse_entries(filepath):
    """Return {key: {ref, artist, name}} from a JS palette file."""
    with open(filepath) as f:
        content = f.read()

    entries = {}
    block_re = re.compile(
        r'(\w+):\s*\{[^}]*?name:\s*[\'"](.+?)[\'"][^}]*?artist:\s*[\'"](.+?)[\'"]'
        r'[^}]*?ref:\s*[\'"](.+?)[\'"][^}]*?\}',
        re.DOTALL
    )
    for m in block_re.finditer(content):
        key, name, artist, ref = m.groups()
        if key in ('use', 'window', 'Object', 'ARTIST_PALETTES'):
            continue
        entries[key] = {'name': name, 'artist': artist, 'ref': ref}
    return entries


def patch_entry(content, key, new_bg, new_colors, cluster_info):
    """
    Replace bg and colors[] for `key` in the JS content string.
    Returns the patched content string.
    """
    # Build new colors block
    lines = []
    pct_map = {h: p for h, p in cluster_info}
    labels = [
        'dominant', 'secondary', 'tertiary',
        'accent', 'accent', 'accent', 'accent', 'accent',
        'accent', 'accent', 'accent', 'accent',
        'accent', 'accent', 'accent', 'accent'
    ]
    for i, (hex_c, label) in enumerate(zip(new_colors, labels)):
        pct = pct_map.get(hex_c, 0) * 100
        lines.append(f"                '{hex_c}',   // {label} ({pct:.1f}%)")

    new_colors_block = "[\n" + "\n".join(lines) + "\n            ]"

    # Replace bg: '...' within this entry
    # Strategy: find the entry start, then replace the first bg occurrence after it
    entry_start = re.search(rf'\b{re.escape(key)}\s*:\s*\{{', content)
    if not entry_start:
        print(f"    WARNING: could not find entry block for {key}")
        return content

    # Find end of this entry (matching closing brace)
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

    # Replace bg
    entry_block = re.sub(
        r"(bg:\s*)'[^']*'",
        rf"\1'{new_bg}'",
        entry_block
    )

    # Replace colors array (handles multi-line array)
    entry_block = re.sub(
        r'(colors:\s*)\[.*?\]',
        rf'\1{new_colors_block}',
        entry_block,
        flags=re.DOTALL
    )

    return content[:start] + entry_block + content[end:]


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description='K-means palette correction for all paintings')
    parser.add_argument('--only',     help='Process only this palette key')
    parser.add_argument('--clusters', type=int, default=N_CLUSTERS, help=f'K-means clusters (default {N_CLUSTERS})')
    args = parser.parse_args()

    n_clusters = args.clusters
    # args.only handled below
    META_DIR.mkdir(parents=True, exist_ok=True)

    # Gather all entries across all files
    file_entries = {}
    all_keys = {}
    for filepath in PALETTE_FILES:
        entries = parse_entries(filepath)
        file_entries[filepath] = entries
        for key, data in entries.items():
            all_keys[key] = filepath

    total = sum(len(e) for e in file_entries.values())
    print(f"Loaded {total} palette entries across {len(PALETTE_FILES)} files")

    # Find available images
    images = {}
    for ext in ('jpg', 'jpeg', 'png'):
        for p in PAINTINGS_DIR.glob(f'*.{ext}'):
            if p.stem not in images:
                images[p.stem] = p

    print(f"Images available: {len(images)}")
    print(f"Overlap (images for existing entries): "
          f"{sum(1 for k in images if k in all_keys)}\n")

    if args.only:
        if args.only not in all_keys:
            print(f"Key '{args.only}' not found in palette files.")
            sys.exit(1)
        target_keys = {args.only}
    else:
        target_keys = set(all_keys.keys())

    # Load existing CSV keys so we can skip already-processed entries
    existing_keys = set()
    if CSV_OUT.exists():
        with open(CSV_OUT) as f:
            reader = csv.DictReader(f)
            existing_keys = {row['key'] for row in reader}
        print(f"Already in CSV: {len(existing_keys)} entries (will skip)\n")

    processed = 0
    skipped   = 0

    csv_exists = CSV_OUT.exists()
    with open(CSV_OUT, 'a', newline='') as csv_f:
        fieldnames = ['key', 'file', 'ref', 'bg',
                      'c0', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7',
                      'c8', 'c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15',
                      'pct0', 'pct1', 'pct2', 'pct3', 'pct4', 'pct5', 'pct6', 'pct7',
                      'pct8', 'pct9', 'pct10', 'pct11', 'pct12', 'pct13', 'pct14', 'pct15']
        writer = csv.DictWriter(csv_f, fieldnames=fieldnames)
        if not csv_exists:
            writer.writeheader()

        for filepath, entries in file_entries.items():
            keys_to_process = [k for k in entries
                               if k in target_keys and k in images and k not in existing_keys]
            if not keys_to_process:
                continue

            print(f"── {Path(filepath).name} ({len(keys_to_process)} to process) ──")

            for key in keys_to_process:
                entry   = entries[key]
                img_path = images[key]
                print(f"  {key}: {entry['ref']}")

                bg, colors, cluster_info = analyze_image(img_path, n_clusters)
                if bg is None:
                    print(f"    ✗ Could not read image")
                    skipped += 1
                    continue

                print(f"    bg={bg}  colors={colors}")

                row = {
                    'key':  key,
                    'file': Path(filepath).name,
                    'ref':  entry['ref'],
                    'bg':   bg,
                }
                for i, c in enumerate(colors):
                    row[f'c{i}'] = c
                for i, (_, pct) in enumerate(cluster_info[:16]):
                    row[f'pct{i}'] = f"{pct*100:.1f}"

                writer.writerow(row)
                csv_f.flush()
                processed += 1

            print()

    print(f"── Done ──────────────────────────────────")
    print(f"Processed: {processed}  →  {CSV_OUT}")
    print(f"Skipped:   {skipped} (read error)")


if __name__ == '__main__':
    main()
