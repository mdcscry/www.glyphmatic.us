# Glyphmatic Overview

Glyphmatic is a browser-first generative Unicode art project spanning experiments from 2010–2026.

## Core Architecture

- `g.us3.htm` is the host page.
- The host chooses an insert via the `?i=` URL parameter or a random fallback.
- Shared support code lives in:
  - `js_funct/insert_config.js` — per-insert controls, watermarks, and long-form descriptions
  - `js_funct/nav_menu.js` — slide-out control panel and insert-specific controls
  - `js_funct/colorpalette.js` — fixed and generative palette systems
  - `js_funct/autoFont.js` — dynamic Unicode font loading and fallback stack generation
  - `js_glyph/` — glyph datasets, block data, country data, emoji data, watermark assets
- The host waits for glyph data, then loads either:
  - `insert_js_2013/insert0.js` through `insert12.js`, or
  - `insert_js_2025/insert13.js` through `insert37.js`

## Main Development Patterns

1. Add or modify an insert file.
2. Register it in `g.us3.htm` via `insertArray[index]`.
3. Add its controls + description in `js_funct/insert_config.js`.
4. Preserve body-level watermark/nav elements created by the host.
5. Prefer self-contained browser JavaScript with no build step.
6. Support keyboard switching when an insert has multiple flavors/presets.

## Important Constraints

- This project is browser-first and intentionally light on tooling.
- Avoid `document.body.innerHTML = ...` in inserts because it destroys watermarks and host UI.
- Insert files often inject CSS strings directly and build DOM imperatively.
- Shared globals are common; defensive cleanup matters when switching flavors.
- `AGENTS.md` references `.serena/project.yml` and `.roborev.toml`, but those files are currently absent in this checkout.

## Key Areas

- `insert_js_2025/` — modern insert system and docs
- `2025_exp/`, `2026_exp/` — experiment source material and standalone studies
- `js_funct/artist_palettes/` + `tools/paintings/` + `bin/batch_palette.py` — artist-grid palette pipeline
- `js_glyph/countries/` + `country_glyphs.js` — country/language/glyph workflows
- `2025_exp/glyphtesters/` — font/glyph test utilities

## Existing Operational Tooling

- `bin/palette_one.sh` — one-key palette refresh workflow
- `bin/batch_palette.py`, `bin/apply_corrections.py` — image/palette pipeline
- `bin/glyphmatic`, `bin/glyphmatic_inventory.py`, `bin/glyphmatic_insert_qa.py`, `bin/glyphmatic_preview.py` — repo orientation / QA / preview helpers
- `insert_js_2025/insert_system.md` — detailed insert-authoring guide
- `docs/glyphmatic-vis-ongoing.md` — maintainable roadmap for `2026_exp/vis` intake, family grouping, and insert landing strategy

## Suggested Near-Term Workstreams

- Convert more standalone experiments into insert-style modules.
- Standardize cleanup patterns for timers/listeners in multi-flavor inserts.
- Add small inventory/QA scripts to reduce manual scanning of insert metadata.
- Expand docs around local preview/verification workflow for inserts.
