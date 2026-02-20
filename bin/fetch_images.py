#!/usr/bin/env python3
"""
fetch_images.py
Fetch painting images using museum open APIs (no rate limiting, no auth):
  1. Metropolitan Museum of Art  (metmuseum.org)
  2. Art Institute of Chicago    (artic.edu)
  3. Rijksmuseum                 (rijksmuseum.nl)
  4. Harvard Art Museums         (harvardartmuseums.org)
  5. National Gallery of Art     (nga.gov) — IIIF
  6. Wikimedia Commons           (fallback, with polite delays)

Downloads to tools/paintings/{key}.jpg.
Logs results to tools/paintings/.meta/paintings_status.tsv.
Writes tools/paintings/.meta/paintings_needed.txt for anything not found automatically.

Usage:
    python3 fetch_images.py              # all entries not yet downloaded
    python3 fetch_images.py --only KEY   # single entry
    python3 fetch_images.py --dry-run    # find URLs but don't download
"""

import re
import sys
import time
import argparse
import requests
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

OUTPUT_DIR = ROOT_DIR / 'tools' / 'paintings'
META_DIR = OUTPUT_DIR / '.meta'
STATUS_FILE = META_DIR / 'paintings_status.tsv'
NEEDED_FILE = META_DIR / 'paintings_needed.txt'

HEADERS = {'User-Agent': 'GlyphmaticPaletteBot/1.0 (open-source art palette research)'}
TIMEOUT = 15


# ── Parsing ───────────────────────────────────────────────────────────────────

def parse_entries(filepath):
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
        entries[key] = {'key': key, 'name': name, 'artist': artist,
                        'ref': ref, 'file': str(filepath)}
    return entries


def strip_year(ref):
    return re.sub(r'\s*\([^)]+\)\s*$', '', ref).strip()


# ── Museum API sources ────────────────────────────────────────────────────────

def artist_matches(obj_artist, expected_artist):
    """Check if any word of expected artist surname appears in the returned artist string.
    Returns False if obj_artist is empty/None (anonymous/unknown works are rejected)."""
    if not obj_artist or obj_artist.lower() in ('unknown', 'unknown artist', ''):
        return False
    obj_lc = obj_artist.lower()
    # Try each word of the expected name (catches 'de Kooning', 'van Gogh', etc.)
    for word in expected_artist.lower().split():
        if len(word) > 3 and word in obj_lc:
            return True
    return False


def met_image(title, artist):
    """Metropolitan Museum of Art open API."""
    try:
        q = f"{title} {artist}"
        r = requests.get('https://collectionapi.metmuseum.org/public/collection/v1/search',
                         params={'q': q, 'hasImages': 'true', 'isPublicDomain': 'true'},
                         headers=HEADERS, timeout=TIMEOUT)
        r.raise_for_status()
        obj_ids = r.json().get('objectIDs') or []
        for obj_id in obj_ids[:10]:
            r2 = requests.get(
                f'https://collectionapi.metmuseum.org/public/collection/v1/objects/{obj_id}',
                headers=HEADERS, timeout=TIMEOUT)
            r2.raise_for_status()
            obj = r2.json()
            if not obj.get('isPublicDomain'):
                continue
            # Reject if returned artist doesn't match expected (also rejects unknown/anonymous)
            obj_artist = obj.get('artistDisplayName', '')
            if not artist_matches(obj_artist, artist):
                continue
            img = obj.get('primaryImage') or obj.get('primaryImageSmall')
            if img:
                return img, f"met:obj/{obj_id}"
    except Exception as e:
        pass
    return None, None


def aic_image(title, artist):
    """Art Institute of Chicago IIIF API."""
    try:
        q = f"{title} {artist}"
        r = requests.get('https://api.artic.edu/api/v1/artworks/search',
                         params={'q': q, 'fields': 'id,title,image_id,is_public_domain,artist_display',
                                 'limit': 10},
                         headers=HEADERS, timeout=TIMEOUT)
        r.raise_for_status()
        for art in r.json().get('data', []):
            if not art.get('is_public_domain'):
                continue
            # Reject if returned artist doesn't match expected (also rejects unknown/anonymous)
            obj_artist = art.get('artist_display', '')
            if not artist_matches(obj_artist, artist):
                continue
            img_id = art.get('image_id')
            if img_id:
                url = f"https://www.artic.edu/iiif/2/{img_id}/full/1400,/0/default.jpg"
                return url, f"aic:{art['id']}"
    except Exception as e:
        pass
    return None, None


def rijks_image(title, artist):
    """Rijksmuseum open API (no key needed for basic search)."""
    try:
        q = f"{title}"
        r = requests.get('https://www.rijksmuseum.nl/api/en/collection',
                         params={'q': q, 'maker': artist, 'imgonly': 'true',
                                 'ps': 5, 'key': 'public'},
                         headers=HEADERS, timeout=TIMEOUT)
        r.raise_for_status()
        for art in r.json().get('artObjects', []):
            img = art.get('webImage', {}).get('url')
            if img:
                # Get full-size: replace =s0 or similar with larger size
                img = re.sub(r'=s\d+$', '=s1400', img)
                return img, f"rijks:{art.get('objectNumber','?')}"
    except Exception as e:
        pass
    return None, None


def harvard_image(title, artist):
    """Harvard Art Museums open API (no key needed for search)."""
    try:
        r = requests.get('https://api.harvardartmuseums.org/object',
                         params={'title': title, 'person': artist,
                                 'hasimage': 1, 'size': 3,
                                 'apikey': 'none'},  # fails gracefully without key
                         headers=HEADERS, timeout=TIMEOUT)
        if r.status_code == 401:
            return None, None
        r.raise_for_status()
        for obj in r.json().get('records', []):
            imgs = obj.get('images', [])
            if imgs:
                url = imgs[0].get('baseimageurl')
                if url:
                    return url, f"harvard:{obj.get('id','?')}"
    except Exception as e:
        pass
    return None, None


def cleveland_image(title, artist):
    """Cleveland Museum of Art open access API — free, no key, CC0."""
    try:
        r = requests.get('https://openaccess-api.clevelandart.org/api/artworks/',
                         params={'q': f"{title} {artist}", 'has_image': 1,
                                 'type': 'Painting', 'limit': 10},
                         headers=HEADERS, timeout=TIMEOUT)
        r.raise_for_status()
        for obj in r.json().get('data', []):
            # Verify artist
            creators = obj.get('creators', [])
            obj_artist = ' '.join(c.get('description', '') for c in creators)
            if not artist_matches(obj_artist, artist):
                continue
            img = obj.get('images', {}).get('print', {}).get('url') or \
                  obj.get('images', {}).get('web', {}).get('url')
            if img:
                return img, f"cleveland:{obj.get('id','?')}"
    except Exception:
        pass
    return None, None


def commons_image(title, artist):
    """Wikimedia Commons — last resort, with gentle delays.
    Only accepts results where the file title contains the artist's surname
    (to avoid completely unrelated images)."""
    time.sleep(1.0)
    # Build artist keywords for filename verification
    artist_words = [w.lower() for w in artist.split() if len(w) > 3]
    queries = [f"{title} {artist}", title]
    for query in queries:
        try:
            r = requests.get('https://commons.wikimedia.org/w/api.php',
                             params={'action': 'query', 'list': 'search',
                                     'srsearch': query, 'srnamespace': 6,
                                     'format': 'json', 'srlimit': 5},
                             headers=HEADERS, timeout=TIMEOUT)
            r.raise_for_status()
            results = r.json().get('query', {}).get('search', [])
            for result in results:
                file_title = result['title']
                file_title_lc = file_title.lower()
                # Require artist surname to appear in the filename
                if not any(word in file_title_lc for word in artist_words):
                    continue
                r2 = requests.get('https://commons.wikimedia.org/w/api.php',
                                  params={'action': 'query', 'titles': file_title,
                                          'prop': 'imageinfo', 'iiprop': 'url|mime',
                                          'iiurlwidth': 1400, 'format': 'json'},
                                  headers=HEADERS, timeout=TIMEOUT)
                r2.raise_for_status()
                pages = r2.json().get('query', {}).get('pages', {})
                for page in pages.values():
                    for info in page.get('imageinfo', []):
                        if info.get('mime', '').startswith('image/'):
                            url = info.get('thumburl') or info.get('url')
                            if url:
                                return url, f"commons:{file_title}"
        except Exception:
            pass
        time.sleep(1.5)
    return None, None


def fetch_image(entry):
    """Try all sources in order. Returns (url, source) or (None, None)."""
    title  = strip_year(entry['ref'])
    artist = entry['artist']

    for fn, name in [(met_image, 'Met'), (aic_image, 'AIC'),
                     (rijks_image, 'Rijks'), (cleveland_image, 'Cleveland'),
                     (commons_image, 'Commons')]:
        url, source = fn(title, artist)
        if url:
            return url, source

    return None, None


def download(url, dest_path):
    """Download with retry on 5xx/429."""
    for attempt in range(3):
        try:
            r = requests.get(url, headers=HEADERS, timeout=60, stream=True)
            if r.status_code in (429, 503):
                wait = 10 * (2 ** attempt)
                print(f"      throttled — waiting {wait}s...")
                time.sleep(wait)
                continue
            r.raise_for_status()
            with open(dest_path, 'wb') as f:
                for chunk in r.iter_content(8192):
                    f.write(chunk)
            # Sanity check — reject tiny files (likely error pages)
            if dest_path.stat().st_size < 5000:
                dest_path.unlink()
                print(f"      rejected — file too small ({dest_path.stat().st_size if dest_path.exists() else '?'} bytes)")
                return False
            return True
        except requests.HTTPError as e:
            print(f"      HTTP error: {e}")
            return False
        except Exception as e:
            print(f"      error: {e}")
            return False
    return False


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--dry-run', action='store_true')
    parser.add_argument('--only', help='Process only this key')
    args = parser.parse_args()

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    META_DIR.mkdir(parents=True, exist_ok=True)

    all_entries = {}
    for filepath in PALETTE_FILES:
        all_entries.update(parse_entries(filepath))
    print(f"Loaded {len(all_entries)} entries\n")

    if args.only:
        if args.only not in all_entries:
            print(f"Key '{args.only}' not found.")
            sys.exit(1)
        all_entries = {args.only: all_entries[args.only]}

    found, not_found, skipped = [], [], []

    with open(STATUS_FILE, 'a') as status_f:
        for key, entry in all_entries.items():
            existing = next(
                (OUTPUT_DIR / f"{key}{ext}" for ext in ('.jpg', '.jpeg', '.png')
                 if (OUTPUT_DIR / f"{key}{ext}").exists()), None)
            if existing:
                print(f"  [skip] {key}")
                skipped.append(key)
                continue

            title = strip_year(entry['ref'])
            print(f"  {key}: {title} — {entry['artist']}")

            url, source = fetch_image(entry)

            if url:
                print(f"    found [{source}]: {url[:72]}...")
                if not args.dry_run:
                    ext = '.png' if 'png' in url.lower() else '.jpg'
                    dest = OUTPUT_DIR / f"{key}{ext}"
                    if download(url, dest):
                        print(f"    ✓ {dest}  ({dest.stat().st_size//1024}KB)")
                        found.append(key)
                        status_f.write(f"{key}\tfound\t{source}\t{url}\n")
                    else:
                        print(f"    ✗ download failed")
                        not_found.append(key)
                        status_f.write(f"{key}\tdownload_failed\t{source}\t{url}\n")
                else:
                    found.append(key)
            else:
                print(f"    ✗ not found")
                not_found.append(key)
                status_f.write(f"{key}\tnot_found\t\t\n")

    print(f"\n── Results ──────────────────────────────")
    print(f"Found:     {len(found)}")
    print(f"Not found: {len(not_found)}")
    print(f"Skipped:   {len(skipped)} (already have image)")

    if not_found:
        with open(NEEDED_FILE, 'w') as nf:
            for key in not_found:
                e = all_entries[key]
                nf.write(f"{key}\t{e['ref']}\t{e['artist']}\n")
        print(f"\nManual sourcing needed → {NEEDED_FILE}")


if __name__ == '__main__':
    main()
