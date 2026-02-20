# Paintings Pipeline

This folder is image-first. Keep painting files here; keep working metadata in `tools/paintings/.meta/`.

## Layout

- `tools/paintings/*.jpg` (and rare `.png` only if required)
- `tools/paintings/palette_review.html`
- `tools/paintings/.meta/manual_urls.csv` (created when needed)
- `tools/paintings/.meta/paintings_status.tsv` (generated)
- `tools/paintings/.meta/paintings_needed.txt` (generated)
- `tools/paintings/.meta/palette_corrections.csv` (generated)
- `tools/paintings/.meta/palette_overrides.csv` (optional manual overrides layered at apply-time)

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

## Manual Overrides (Optional)

If a painting needs a hand-tuned adjustment:

1. Edit `tools/paintings/.meta/palette_overrides.csv`.
2. Add/modify a row for that `key`.
3. Fill only the fields you want to override (`bg`, `c0..c15`, `pct0..pct15`).
4. Re-run `python3 bin/apply_corrections.py --only <key>`.

Blank fields in overrides are ignored.

## Notes

- Working CSV/TSV files are intentionally under `.meta/` to avoid clutter in this folder.
- Prefer JPG over PNG unless PNG is explicitly needed.
