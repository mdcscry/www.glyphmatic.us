# Palette QA Helper Design

## Goal

Design a repo-native QA helper for the artist-grid palette pipeline that checks source assets, generated metadata, and override consistency before visual review.

## Relevant Files

- `tools/paintings/*.jpg`
- `tools/paintings/.meta/manual_urls.csv`
- `tools/paintings/.meta/paintings_status.tsv`
- `tools/paintings/.meta/paintings_needed.txt`
- `tools/paintings/.meta/palette_corrections.csv`
- `tools/paintings/.meta/palette_overrides.csv`
- `js_funct/artist_palettes/`
- `tools/paintings/palette_review.html`

## Proposed Script

Create later as:
- `bin/palette_qa.py`

## Candidate Checks

### Source asset checks
- missing source image for a palette key referenced elsewhere
- duplicate keys with multiple image candidates
- non-JPG files where JPG is preferred
- filename/key mismatch against expected palette key naming

### Metadata checks
- key exists in status TSV but not in source images
- key exists in corrections/overrides but not in source images
- key exists in generated palette outputs but not in source images
- malformed CSV/TSV rows with wrong column count

### Override checks
- override row exists but all override fields are blank
- override row references nonexistent key
- override percentages are present without matching colors
- more percentage slots than color slots populated

### Review-surface checks
- missing palette review HTML references
- palette key not reachable from review page data
- artist-grid palette JS missing expected key after apply step

## Output Shape

The future helper should print:
- summary counts (FAIL/WARN/INFO)
- grouped issues by file/source
- optional `--key <palette_key>` mode
- optional `--json` mode for machine-readable output

## Useful Future Flags

- `--key monet_sunrise`
- `--strict`
- `--json`
- `--list-missing`
- `--list-overrides`

## Manual QA Follow-Up

After script checks pass, manually review:
- `tools/paintings/palette_review.html`
- the artist-grid insert / experiment page using the regenerated palette

## Non-Goals

- full image-analysis scoring in v1
- browser automation in v1
- changing pipeline outputs automatically in v1
