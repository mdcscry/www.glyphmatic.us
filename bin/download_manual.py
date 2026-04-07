#!/usr/bin/env python3
"""
download_manual.py
Read manual_urls.csv, download any entries where url is filled in
and the image doesn't already exist.

Usage:
    python3 download_manual.py
"""

import csv
import time
import requests
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
PAINTINGS_DIR = ROOT_DIR / 'tools' / 'paintings'
META_DIR = PAINTINGS_DIR / '.meta'
CSV_FILE = META_DIR / 'manual_urls.csv'
STATUS_FILE = META_DIR / 'paintings_status.tsv'
HEADERS = {'User-Agent': 'GlyphmaticPaletteBot/1.0 (open-source art palette research)'}


def download(url, dest_path):
    for attempt in range(3):
        try:
            r = requests.get(url, headers=HEADERS, timeout=60, stream=True)
            if r.status_code in (429, 503):
                time.sleep(10 * (2 ** attempt))
                continue
            r.raise_for_status()
            with open(dest_path, 'wb') as f:
                for chunk in r.iter_content(8192):
                    f.write(chunk)
            if dest_path.stat().st_size < 5000:
                dest_path.unlink()
                print(f"  rejected (too small)")
                return False
            return True
        except Exception as e:
            print(f"  error: {e}")
            return False
    return False


def main():
    PAINTINGS_DIR.mkdir(parents=True, exist_ok=True)
    META_DIR.mkdir(parents=True, exist_ok=True)

    if not CSV_FILE.exists():
        with open(CSV_FILE, 'w', newline='') as f:
            f.write('key,painting,artist,status,url\n')
        print(f"Created template: {CSV_FILE}")
        print("Add rows, then rerun download_manual.py.")
        return

    with open(CSV_FILE, newline='') as f:
        rows = list(csv.DictReader(f))

    downloaded, skipped, failed = [], [], []

    with open(STATUS_FILE, 'a') as status_f:
        for row in rows:
            key = row['key']
            url = row.get('url', '').strip()

            if not url:
                continue

            existing = next(
                (PAINTINGS_DIR / f"{key}{ext}" for ext in ('.jpg', '.jpeg', '.png')
                 if (PAINTINGS_DIR / f"{key}{ext}").exists()), None)
            if existing:
                print(f"  [skip] {key} (already have {existing.name})")
                skipped.append(key)
                continue

            ext = '.png' if url.lower().endswith('.png') else '.jpg'
            dest = PAINTINGS_DIR / f"{key}{ext}"
            print(f"  {key}: {url[:70]}...")
            if download(url, dest):
                size_kb = dest.stat().st_size // 1024
                print(f"    ✓ {dest.name}  ({size_kb}KB)")
                downloaded.append(key)
                status_f.write(f"{key}\tfound\tmanual\t{url}\n")
            else:
                print(f"    ✗ download failed")
                failed.append(key)
                status_f.write(f"{key}\tdownload_failed\tmanual\t{url}\n")

    print(f"\n── Results ──")
    print(f"Downloaded: {len(downloaded)}")
    print(f"Skipped:    {len(skipped)} (already had image)")
    print(f"Failed:     {len(failed)}")
    if downloaded:
        print(f"\nNow run: python3 batch_palette.py")


if __name__ == '__main__':
    main()
