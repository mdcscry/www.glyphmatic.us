# Glyphmatic 2026 Vis Ongoing Work Guide

This document is the maintainable handoff + roadmap for ongoing visualization work in `www.glyphmatic.us`.

Update it whenever one of these changes:
- a new experiment is added under `2026_exp/vis/`
- a new family is identified or regrouped
- a vis family graduates into an insert
- helper tooling changes
- palette policy changes

## Current Local Reality

- Repo: `~/Developer/www.glyphmatic.us`
- Main vis source pool: `2026_exp/vis/`
- Host page: `g.us3.htm`
- Insert config/metadata: `js_funct/insert_config.js`
- Modern insert directory: `insert_js_2025/`
- Shared vis palette bridge: `js_funct/vis_palette_adapter.js`
- Shared palette engines:
  - `js_funct/artist_palettes.js`
  - `js_funct/colorpalette.js`

As of this checkout:
- registered inserts: 38 total (`0..37`)
- latest vis-family insert: `insert37.js`
- `insert37` is registered in the host as:
  - `insertArray[37] = ['none', 'Field / Contour / Noise']`

## Working Principle

`2026_exp/vis/` is the experiment reservoir.
`insert_js_2025/` is the curated landing zone.

Do not rush every experiment into its own insert.
The preferred strategy is:
- cluster experiments into a small number of strong families
- consolidate related variants into one multi-flavor insert
- use flavor keys `0-9` to absorb variants
- preserve experiment richness while reducing insert sprawl

This matches the standing Glyphmatic preference:
- family-based inserts over many one-offs
- roughly aligned with D3 / Vega-Lite / math-type groupings
- strong palette behavior using artist palettes and generated palettes

## Current Helper Scripts

These appear to be local helper tooling for repo orientation and QA.

### `bin/glyphmatic`
Convenience wrapper for overview, man page, inventory, QA, and preview helpers.

### `bin/glyphmatic_inventory.py`
Parses `g.us3.htm` and `js_funct/insert_config.js` and prints:
- insert index
- insert file
- glyph/data dependency
- title
- short description

### `bin/glyphmatic_insert_qa.py`
Checks consistency across:
- `g.us3.htm`
- `js_funct/insert_config.js`
- `insert_js_2013/`
- `insert_js_2025/`

Current result: no failures, only metadata warnings on older inserts.

### `bin/glyphmatic_preview.py`
Builds local preview URLs like:
- `g.us3.htm?i=37`
- `g.us3.htm?i=37&flavor=3`

Can also serve the repo locally via `http.server`.

## How `2026_exp/vis` Currently Breaks Down

There are two layers to track:
1. indexed/library experiments already surfaced in `2026_exp/vis/index.html`
2. extra/prototype files in the directory that are not yet surfaced in the index

### Indexed families in `2026_exp/vis/index.html`

#### Streaming & Time Series
- `top10_generative_art.html`
- `v3_d3_streamlines_smooth.html`
- `top10_streamlines.html`
- `v5_d3_endless_stream.html`
- `v6_streaming_bump_chart.html`
- `v19_denselines.html`

#### Time Curves
- `v17_time_curves_segments.html`
- `v18_time_curves_bezier.html`

#### Network & Graph
- `v7_generative_sankey.html`
- `v11_chord_grid.html`
- `v20_biofabric_single.html`
- `v21_biofabric_grid.html`
- `v22_edge_bundling_grid.html`

#### Distribution & Statistical
- `v8_beeswarm_single.html`
- `v9_beeswarm_rows.html`
- `v10_likert_wall.html`

#### Hierarchical
- `v12_circlepack_glowing_orbs.html`
- `v13_circlepack_borders.html`
- `v14_circlepack_flat.html`
- `v15_circlepack_flat_borders.html`
- `v16_treemap_grid.html`

#### Field & Spatial
- `v23_contours_grid.html`
- `v24_radar_grid.html`

#### Generative Art & Texture
- `v27_watercolor.html`

#### Part-to-Whole & Proportion
- `v28_marimekko.html`

#### Optimization Landscapes
- `v25_optimization_landscapes.html`

#### Barcode & Distribution
- `v26_barcode_grid.html`

#### Graph & Network
- `v29_optimal_substructure.html`

#### Ridgeline
- `v30_ridgeline_grid.html`
- `v31_ridgeline_full.html`

#### Warped & Projected
- `v32_custom_projections.html`
- `v33_function_contours.html`

#### Perlin Noise
- `v34_perlin_noise.html`
- `v35_perlin_glyphs.html`

#### Function Contour Color
- `v36_sincos_contour.html`
- `v37_contour_blocks.html`

#### Voronoi & Delaunay
- `v45_voronoi_circles.html`
- `v46_delaunay_links.html`
- `v47_delaunay_glyphs.html`

#### Population Pyramids
- `v42_population_pyramids.html`
- `v43_population_areas.html`

#### Vega-Lite
- `v40_comet_grid.html`
- `v41_lasagna.html`

#### Watercolor & Generative
- `v38_perlin_square.html`
- `v39_perlin_square_circles.html`

#### Circular & Radial
- `v48_circular_heatmaps.html`

#### Triangulation
- `v49_triplot.html`

#### Hatch Patterns
- `v50_hatch_patterns.html`
- `v51_hatch_color.html`
- `v52_hatch_accent.html`

#### Neural & Statistical
- `v53_hinton.html`

#### Recursive & Fractal
- `v54_square_limit.html`
- `v55_dragon_curves.html`

### Extra HTML files not currently surfaced in `index.html`
- `proof_grid_labeled.html`
- `strange_attractors.html`
- `strange_attractors_grid.html`
- `v12_circlepack_grid.html`
- `v17_time_curves.html`
- `v20_biofabric.html`
- `v44_population_areas.html`
- `vega_grid.html`
- `vega_random.html`
- `vega_windvectors.html`

### JSX / React / Semiotic sources
- `semiotic_streamlines.jsx`
- `v4_react_d3_streamlines.jsx`

These extras matter because they may be:
- alternates worth folding into an existing family
- precursor files that should be retired once represented elsewhere
- candidates for future import if they offer genuinely new behavior

## Current Family Status Map

This is the table to maintain as work proceeds.

| Family bucket | Source experiments | Insert status | Notes |
|---|---|---|---|
| Lotus / mandala / circlepack | `2026_exp/*.htm` lotus + flower-of-life variants | Landed as `insert29` | Good example of family consolidation outside `vis/` |
| Plotly chart family | current multi-flavor plotly work | Landed as `insert30` | Separate from `2026_exp/vis` but same family logic |
| Field / contour / noise | `v23`, `v25`, `v33`, `v34`, `v35`, `v36`, `v37`, `v38`, `v39` | Landed as `insert37` | Current canonical vis-family bridge |
| Stream / time-series | `v3`, `v5`, `v6`, `top10_*`, `v19`, maybe `v4_react_d3_streamlines.jsx`, `semiotic_streamlines.jsx` | Not yet an insert family | Strong candidate for a future consolidated insert |
| Network / graph | `v7`, `v11`, `v20`, `v21`, `v22`, `v29` | Not yet | Could split into flow/chord vs fabric/bundling vs DP/network if too broad |
| Statistical distributions | `v8`, `v9`, `v10`, `v26`, `v30`, `v31`, `v53` | Not yet | Good place for a stats / density / inference family |
| Hierarchy / enclosure | `v12`, `v13`, `v14`, `v15`, `v16`, maybe `v12_circlepack_grid.html` | Not yet | Natural circlepack/treemap family |
| Vega-Lite family | `v40`, `v41`, plus `vega_grid.html`, `vega_random.html`, `vega_windvectors.html` | Not yet | Likely worth one dedicated Vega-Lite insert family |
| Triangulation / tessellation | `v45`, `v46`, `v47`, `v48`, `v49` | Not yet | Strong geometry family |
| Hatch / printmaking | `v50`, `v51`, `v52` | Not yet | Tight, coherent family |
| Recursive / fractal / dynamical systems | `v54`, `v55`, `strange_attractors*` | Not yet | Likely a strong math family |
| Population forms | `v42`, `v43`, `v44_population_areas.html` | Not yet | Good micro-family |
| Painterly / texture | `v27`, `v38`, `v39` | Partly absorbed by `insert37` | Keep watching for whether texture work deserves its own family |

## Current Porting Pattern: `insert37`

`insert37.js` is the best current example of how a `2026_exp/vis` family gets bridged into the host insert system.

### What it currently consolidates
`insert37` exposes 9 flavors:
- `0 contours-grid`
- `1 optimization-landscapes`
- `2 function-contours`
- `3 perlin-noise`
- `4 perlin-glyphs`
- `5 sincos-contour`
- `6 contour-blocks`
- `7 perlin-square`
- `8 perlin-square-circles`

This maps directly onto the `v23/v25/v33-v39` cluster.

### Host integration pattern
- host registration in `g.us3.htm`
- insert metadata/description in `js_funct/insert_config.js`
- self-contained data load via `['none', 'Field / Contour / Noise']`
- explicit root creation; does not wipe `document.body`
- watermark/nav preservation through append-only behavior

### Behavioral pattern
- random flavor on plain refresh when `?flavor=` is absent
- explicit `?i=37&flavor=N` support
- keyboard family control:
  - `0-8` switch flavors
  - `r` regenerate
  - `p` cycle palette
  - `a` cycle palette mode
  - `m` cycle submode for noise/sincos families
  - `h` toggle HUD
- collapsed HUD/info behavior by default

### Dependency pattern
`insert37` dynamically loads:
- D3
- d3-contour
- `js_funct/artist_palettes.js`
- `js_funct/colorpalette.js`
- `js_funct/vis_palette_adapter.js`

This is a useful template for future vis-family inserts that depend on shared palette or rendering support.

## Current Palette Bridge: `vis_palette_adapter.js`

`js_funct/vis_palette_adapter.js` is the reusable palette normalization layer between standalone vis experiments and the insert system.

### What it does
It produces normalized palettes with:
- `bg`
- `panelBg`
- `lineColors`
- `fillColors`
- `accent`
- `text`

### Palette modes already supported
- `artist`
- `oklch`
- `hybrid`

### Why it matters
This gives future vis-family inserts one consistent way to:
- draw from curated artist palettes
- draw from generated/random ColorPalette output
- mix the two when a family wants both

### Important roadmap hint already in code
`FAMILY_DEFAULTS` includes placeholders for:
- `insert37`
- `insert38`
- `insert39`
- `insert40`
- `insert41`
- `insert42`
- `insert43`

Only `insert37` exists right now, but the adapter is already shaped for multiple future vis-family inserts.
That suggests a good forward direction: keep family-level palette defaults centralized here.

## Palette Policy for New Vis Families

For Glyphmatic vis work, do not fall back into weak ad hoc palettes.
Preferred sources are:
- artist palettes from `js_funct/artist_palettes.js`
- generated/random protocols from `js_funct/colorpalette.js`
- `hybrid` compositions via `vis_palette_adapter.js`

Use palette systems aggressively during development rather than conservatively.
The goal is expressive range, not early restriction.

## Intake Workflow for New Downloads Experiments

When new experiments are downloaded and moved into `2026_exp/vis/`, use this workflow.

### 1. Land the files cleanly
- move them into `2026_exp/vis/`
- use stable names
- if they belong to the numbered vis sequence, prefer `vNN_name.html`
- if they are exploratory or alternate versions, keep that obvious in the name

### 2. Decide whether each file is one of these
- new family seed
- alternate of an existing family member
- support/prototype/reference file
- obsolete duplicate

### 3. Add or update library surfacing
If the experiment is worth browsing repeatedly:
- add it to `2026_exp/vis/index.html`
- place it under the best existing section or create a new one

If it is math-focused and the math index is meant to diverge, also decide whether it belongs in `math_index.html`.

### 4. Update this document immediately
For each incoming experiment, record:
- filename
- family bucket
- whether it is a keeper
- whether it should become a flavor in an existing insert
- whether it suggests a new insert family

### 5. Only port after grouping
Do not port a fresh experiment to a dedicated insert by reflex.
First ask:
- what family does this belong to?
- which existing insert family could absorb it?
- does it justify a new insert family only after 2-5 related experiments accumulate?

## Suggested Intake Template

Use this block when adding new experiments to the bottom of this document.

```md
## Incoming batch YYYY-MM-DD

- `filename_here.html`
  - family:
  - status: keep / merge / duplicate / prototype
  - likely destination: existing insert / future family / standalone archive
  - notes:
```

## Validation Workflow

Useful commands from repo root:

```bash
python3 bin/glyphmatic_inventory.py
python3 bin/glyphmatic_insert_qa.py
python3 bin/glyphmatic_preview.py --index 37 --flavor 3
python3 bin/glyphmatic_preview.py --serve --index 37 --open
```

Useful wrapper commands:

```bash
bin/glyphmatic inventory
bin/glyphmatic qa
bin/glyphmatic preview --index 37 --flavor 3
```

## Practical Rules for Future Insert Families

- Never wipe `document.body.innerHTML`
- Append roots; preserve host-owned watermark and nav UI
- Use one family insert for several related vis files whenever possible
- Randomize initial flavor on plain refresh
- Support direct flavor URLs for debugging
- Track cleanup for listeners, timers, animation loops, and temporary DOM
- Keep palette logic centralized through `vis_palette_adapter.js` where possible
- Prefer bottom-right collapsed info/HUD treatment for insert-local controls

## Near-Term Recommendations

1. Keep `insert37` as the reference implementation for vis-family ports.
2. Treat `vis_palette_adapter.js` as shared infrastructure, not one-off insert code.
3. As the next Downloads batch lands, classify each file before writing any new insert.
4. Pick the next family by density rather than novelty:
   - stream/time-series
   - hierarchy/circlepack
   - Vega-Lite
   - triangulation/tessellation
   - hatch/printmaking
5. Update this document first, then code second, so the repo keeps a stable map of what belongs where.

## Incoming batch 2026-05-08

Status: placeholder for the next set of experiments the user is about to move into `2026_exp/vis/` from Downloads.

Use one block per incoming file:

- `filename_here.html`
  - family:
  - status: keep / merge / duplicate / prototype
  - likely destination: existing insert / future family / standalone archive
  - notes:

Suggested first-pass questions for each incoming file:
- Is this a new family seed or an alternate of something already in `2026_exp/vis/`?
- Does it belong under an existing section in `index.html`?
- Is it strong enough to surface in the library immediately, or should it remain unsurfaced while we evaluate it?
- Does it want an existing palette bridge path (`artist`, `oklch`, `hybrid`)?
- Is it a likely future flavor for an existing or planned insert family?
