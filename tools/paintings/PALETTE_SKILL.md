# Palette Skill

Use this workflow for single-entry palette updates and override tuning.

## Inputs

- `key` (palette key, e.g. `monet_sunrise`)
- optional commit message

## One-Key Refresh

From repo root:

```bash
python3 bin/palette_one.sh --key <key>
```

Equivalent manual sequence:

```bash
python3 bin/batch_palette.py --only <key>
python3 bin/apply_corrections.py --only <key>
```

## Override Tuning

1. Edit `tools/paintings/.meta/palette_overrides.csv` for that `key`.
2. Set only the fields you want to force (`c*`, `pct*`, `bg`).
3. Re-apply:

```bash
python3 bin/apply_corrections.py --only <key>
```

## Small Commit Rule

Commit each palette adjustment as a focused commit:

```bash
git add js_funct/artist_palettes/*.js tools/paintings/.meta/palette_overrides.csv
git commit -m "Adjust palette for <key>"
```
