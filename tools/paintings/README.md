# Paintings Pipeline

This folder is image-first. Keep painting files here; keep working metadata in `tools/paintings/.meta/`.

## Layout

- `tools/paintings/*.jpg` (and rare `.png` only if required)
- `tools/paintings/palette_review.html`
- `tools/paintings/.meta/manual_urls.csv` (created when needed)
- `tools/paintings/.meta/paintings_status.tsv` (generated)
- `tools/paintings/.meta/paintings_needed.txt` (generated)
- `tools/paintings/.meta/palette_corrections.csv` (generated)

## Standard Run

From repo root:

```bash
python3 bin/fetch_images.py
python3 bin/download_manual.py
python3 bin/batch_palette.py
python3 bin/apply_corrections.py
```

## New Set Checklist

1. Add new source images to `tools/paintings/`.
2. Keep filenames aligned to palette key (`key.jpg`) where possible.
3. Run `python3 bin/fetch_images.py`.
4. Fill `tools/paintings/.meta/manual_urls.csv` for anything still missing.
5. Run `python3 bin/download_manual.py`.
6. Run `python3 bin/batch_palette.py`.
7. Run `python3 bin/apply_corrections.py`.
8. Visual QA in `2026_exp/artist_grid.htm` and `tools/paintings/palette_review.html`.

## Notes

- Working CSV/TSV files are intentionally under `.meta/` to avoid clutter in this folder.
- Prefer JPG over PNG unless PNG is explicitly needed.
