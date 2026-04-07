#!/usr/bin/env python3
"""
find_key.py — look up palette keys by artist or painting name.

Usage:
    python3 find_key.py monet
    python3 find_key.py "starry night"
    python3 find_key.py vermeer
    python3 find_key.py          # list everything
"""
import re, sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
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

PAINTINGS_DIR = ROOT_DIR / 'tools' / 'paintings'

def parse_all():
    entries = {}
    block_re = re.compile(
        r'(\w+):\s*\{[^}]*?name:\s*[\'"](.+?)[\'"][^}]*?artist:\s*[\'"](.+?)[\'"]'
        r'[^}]*?ref:\s*[\'"](.+?)[\'"][^}]*?\}',
        re.DOTALL
    )
    for filepath in PALETTE_FILES:
        with open(filepath) as f:
            content = f.read()
        for m in block_re.finditer(content):
            key, name, artist, ref = m.groups()
            if key in ('use', 'window', 'Object', 'ARTIST_PALETTES'):
                continue
            has_image = any(
                (PAINTINGS_DIR / f"{key}{ext}").exists()
                for ext in ('.jpg', '.jpeg', '.png')
            )
            entries[key] = {
                'name': name, 'artist': artist, 'ref': ref,
                'file': Path(filepath).name,
                'has_image': has_image,
            }
    return entries

def main():
    query = ' '.join(sys.argv[1:]).lower().strip()
    entries = parse_all()

    matches = {}
    for key, e in entries.items():
        searchable = f"{key} {e['name']} {e['artist']} {e['ref']}".lower()
        if not query or query in searchable:
            matches[key] = e

    if not matches:
        print(f"No matches for '{query}'")
        return

    # Column widths
    key_w  = max(len(k) for k in matches) + 2
    ref_w  = max(len(e['ref']) for e in matches.values()) + 2

    print(f"\n{'KEY':<{key_w}}  {'REF':<{ref_w}}  {'ARTIST'}")
    print(f"{'─'*key_w}  {'─'*ref_w}  {'─'*30}")
    for key, e in sorted(matches.items(), key=lambda x: x[1]['artist']):
        img = '✓' if e['has_image'] else ' '
        print(f"{img} {key:<{key_w-2}}  {e['ref']:<{ref_w}}  {e['artist']}")

    print(f"\n{len(matches)} entries  (✓ = image already in tools/paintings/)")

if __name__ == '__main__':
    main()
