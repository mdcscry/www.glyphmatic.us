# 2026 Exp Vis Family Inserts Plan (v23–v52)

> For Hermes: use this as the source-of-truth planning document for converting `2026_exp/vis/v23` through `v52` into a small number of new multi-flavor Glyphmatic inserts.

Goal

Convert the strong `2026_exp/vis` experiments from `v23` through `v52` into a disciplined set of new family-based inserts, with limited insert count, flavor-heavy organization, and palette standardization through either `js_funct/artist_palettes.js` or `js_funct/colorpalette.js`.

Core constraints from user direction

- We need to cover `v23` through `v52`.
- We do not want too many inserts.
- Families should feel aligned to the D3 / Vega-Lite / math / dataviz grammar axis rather than one-off sketch dumping.
- Each insert may use flavors `0-9`.
- Inserts must balance complexity with minimalism.
- Palette quality must be improved and standardized.
- New vis-family inserts should use either:
  - `js_funct/artist_palettes.js`, or
  - `js_funct/colorpalette.js`
- Avoid ad hoc local weak palette arrays as the long-term default pattern.

Important boundary

This plan intentionally scopes only `v23` through `v52`.
Other `2026_exp/vis` HTML files remain relevant, but they are not part of this document’s conversion scope.

---

Architecture direction

We should not create one insert per experiment.
We should not create one giant mega-insert either.

Recommended structure:
- 4 new inserts total for `v23-v52`
- each insert organized as a family with flavors `0-9`
- shared vis palette adapter created first
- per-flavor renderers can remain distinct internally, but root setup / cleanup / palette plumbing / keyboard controls / URL flavor loading should be standardized

Recommended new insert numbers

- `insert37.js` — Field / Contour / Noise Systems
- `insert38.js` — Chart Grammar / Statistical Area Systems
- `insert39.js` — Topology / Tessellation / Network Space
- `insert40.js` — Pattern / Projection / Material Systems

These numbers assume the current highest active insert is `36` in `g.us3.htm`.

---

Palette policy

All four inserts should use a shared palette adapter layer.

Recommended new shared helper

- `js_funct/vis_palette_adapter.js`

Responsibilities

- select random artist palette from `ARTIST_PALETTES`
- support optional explicit palette key
- support OKLCH/generative palette mode via `ColorPalette`
- derive a normalized palette object for insert flavors
- expose palette label / key for HUD or debug text

Suggested normalized palette shape

```js
{
  mode: 'artist' | 'oklch' | 'hybrid',
  key: 'matisse_fauve' | 'oklch:auto' | ...,
  label: 'Matisse — Fauvism' | 'OKLCH Auto',
  bg: '#...',
  panelBg: '#...',
  line: ['#...', '#...', ...],
  fill: ['#...', '#...', ...],
  accent: '#...',
  text: '#...'
}
```

Recommended defaults by insert

- `insert37`: mostly `oklch`
- `insert38`: mostly `artist`
- `insert39`: `hybrid`
- `insert40`: mostly `artist`

Flavor-level palette guidance appears below.

---

Standard insert interaction model

All four inserts should share a lightweight contract.

Keyboard

- `0-9` — switch flavor
- `r` — regenerate current flavor
- `p` — cycle palette
- `a` — toggle palette mode where supported (`artist` / `oklch` / `hybrid`)
- `h` — toggle minimal HUD
- `space` — pause/resume if animated

URL

- `?i=XX&flavor=N`
- optional future extension: `&palette=<key>`

Required insert responsibilities

- do not wipe `document.body.innerHTML`
- append a root node
- provide `changeHtmlDisplayInline()` stub if required
- track cleanup for timers/listeners/animation frames
- support resize safely
- preserve host watermark/nav behavior

---

Insert 37 — Field / Contour / Noise Systems

Theme

Scalar fields, contour extraction, field sampling, procedural noise, surface-like structures.

Why this family is coherent

These experiments all derive marks from sampled functions or fields. They share a strong underlying logic even when the output format differs.

Target source files and flavor mapping

- flavor `0` → `2026_exp/vis/v23_contours_grid.html`
- flavor `1` → `2026_exp/vis/v25_optimization_landscapes.html`
- flavor `2` → `2026_exp/vis/v33_function_contours.html`
- flavor `3` → `2026_exp/vis/v34_perlin_noise.html`
- flavor `4` → `2026_exp/vis/v35_perlin_glyphs.html`
- flavor `5` → `2026_exp/vis/v36_sincos_contour.html`
- flavor `6` → `2026_exp/vis/v37_contour_blocks.html`
- flavor `7` → `2026_exp/vis/v38_perlin_square.html`
- flavor `8` → `2026_exp/vis/v39_perlin_square_circles.html`
- flavor `9` → reserved

Flavor notes

- `0/1/2/5/6` are contour/function-first modes
- `3/4/7/8` are perlin/noise-first modes
- `4` is especially strong because it bridges procedural fields with Glyphmatic’s glyph identity

Palette recommendations

- default: `oklch`
- artist-compatible flavors: `4`, `6`, `8`
- use stronger contrast discipline for raster/canvas-heavy modes

Implementation note

This is the cleanest first family to build because it can share:
- field samplers
- contour thresholds
- raster/canvas setup helpers
- grid cell helpers
- palette plumbing

---

Insert 38 — Chart Grammar / Statistical Area Systems

Theme

Abstract chart language, comparative area systems, small-multiple statistical structures, chart-like visual grammar.

Why this family is coherent

These pieces feel like dataviz grammar experiments rather than topology or pure math art. This is also the right place to absorb the actual Vega-Lite experiment while keeping Plotly separate in insert 30.

Target source files and flavor mapping

- flavor `0` → `2026_exp/vis/v24_radar_grid.html`
- flavor `1` → `2026_exp/vis/v28_marimekko.html`
- flavor `2` → `2026_exp/vis/v30_ridgeline_grid.html`
- flavor `3` → `2026_exp/vis/v31_ridgeline_full.html`
- flavor `4` → `2026_exp/vis/v40_comet_grid.html`
- flavor `5` → `2026_exp/vis/v42_population_pyramids.html`
- flavor `6` → `2026_exp/vis/v43_population_areas.html`
- flavor `7` → `2026_exp/vis/v44_population_areas.html`
- flavor `8` → `2026_exp/vis/v48_circular_heatmaps.html`
- flavor `9` → reserved

Flavor notes

- `4` is Vega/Vega-Lite-backed and should remain conceptually part of this family, even if implementation is more self-contained
- `5/6/7` form a population/pyramid/area mini-cluster
- `2/3` form a ridgeline mini-cluster
- `8` is especially strong and visually distinct but still belongs in chart-grammar territory

Palette recommendations

- default: `artist`
- use artist-derived ramps where possible
- for diverging heatmap / population flavors, allow a hybrid mode using `ColorPalette` if artist-derived ramps are insufficient

Implementation note

This insert should standardize outer scaffolding only:
- root
- palette adapter
- HUD
- keyboard flavor switching
- resize lifecycle

Do not over-unify the internal chart renderers.

---

Insert 39 — Topology / Tessellation / Network Space

Theme

Adjacency, shortest paths, triangulation, Voronoi partitioning, planar network aesthetics.

Why this family is coherent

These are relation-space and geometry-neighborhood pieces. They belong together more than with statistical charting or procedural surfaces.

Target source files and flavor mapping

- flavor `0` → `2026_exp/vis/v29_optimal_substructure.html`
- flavor `1` → `2026_exp/vis/v45_voronoi_circles.html`
- flavor `2` → `2026_exp/vis/v46_delaunay_links.html`
- flavor `3` → `2026_exp/vis/v47_delaunay_glyphs.html`
- flavor `4` → `2026_exp/vis/v49_triplot.html`
- flavor `5` → reserved
- flavor `6` → reserved
- flavor `7` → reserved
- flavor `8` → reserved
- flavor `9` → reserved

Flavor notes

- `0` is the most graph-theoretic member
- `1/2/3/4` are spatial topology / triangulation / partition modes
- `3` is a particularly good Glyphmatic-facing flavor because it overlays glyph texture on a geometric topology system

Palette recommendations

- default: `hybrid`
- artist mode strongly recommended for `3`
- darker OKLCH mode works well for `0/1/2/4`

Implementation note

This insert may stay smaller than the others, which is acceptable. It is better to have one strong, compact high-identity insert than a bloated family with weak coherence.

---

Insert 40 — Pattern / Projection / Material Systems

Theme

Pattern engines, projection warps, painterly surfaces, hatching, textures, repeated material grammars.

Why this family is coherent

These are not chart systems and not topology systems. They are surface/pattern/material experiments with strong graphic identity.

Target source files and flavor mapping

- flavor `0` → `2026_exp/vis/v26_barcode_grid.html`
- flavor `1` → `2026_exp/vis/v27_watercolor.html`
- flavor `2` → `2026_exp/vis/v32_custom_projections.html`
- flavor `3` → `2026_exp/vis/v41_lasagna.html`
- flavor `4` → `2026_exp/vis/v50_hatch_patterns.html`
- flavor `5` → `2026_exp/vis/v51_hatch_color.html`
- flavor `6` → `2026_exp/vis/v52_hatch_accent.html`
- flavor `7` → reserved
- flavor `8` → reserved
- flavor `9` → reserved

Flavor notes

- `1` watercolor is especially strong and deserves preservation as a first-class flavor
- `4/5/6` form a very coherent hatch mini-family
- `2` custom projections belongs here because it is a projection/warping surface system more than a statistical chart

Palette recommendations

- default: `artist`
- watercolor should strongly prefer artist palettes
- hatch variants should support both artist and monochrome/OKLCH modes
- barcode may use either artist or OKLCH depending on density and contrast needs

Implementation note

Do not force all internal renderers into one rendering model. Just standardize the insert shell and palette system.

---

Complete inclusion checklist for v23–v52

Every HTML experiment in the target scope is assigned in this plan.

Assigned to insert 37
- `v23_contours_grid.html`
- `v25_optimization_landscapes.html`
- `v33_function_contours.html`
- `v34_perlin_noise.html`
- `v35_perlin_glyphs.html`
- `v36_sincos_contour.html`
- `v37_contour_blocks.html`
- `v38_perlin_square.html`
- `v39_perlin_square_circles.html`

Assigned to insert 38
- `v24_radar_grid.html`
- `v28_marimekko.html`
- `v30_ridgeline_grid.html`
- `v31_ridgeline_full.html`
- `v40_comet_grid.html`
- `v42_population_pyramids.html`
- `v43_population_areas.html`
- `v44_population_areas.html`
- `v48_circular_heatmaps.html`

Assigned to insert 39
- `v29_optimal_substructure.html`
- `v45_voronoi_circles.html`
- `v46_delaunay_links.html`
- `v47_delaunay_glyphs.html`
- `v49_triplot.html`

Assigned to insert 40
- `v26_barcode_grid.html`
- `v27_watercolor.html`
- `v32_custom_projections.html`
- `v41_lasagna.html`
- `v50_hatch_patterns.html`
- `v51_hatch_color.html`
- `v52_hatch_accent.html`

No `v23-v52` HTML files are omitted from this plan.

---

HTML files outside this plan’s scope

These remain outside the `v23-v52` planning boundary and should be handled by a separate plan or folded into earlier/later family work:

- `index.html`
- `math_index.html`
- `top10_generative_art.html`
- `top10_streamlines.html`
- `v3_d3_streamlines_smooth.html`
- `v5_d3_endless_stream.html`
- `v6_streaming_bump_chart.html`
- `v7_generative_sankey.html`
- `v8_beeswarm_single.html`
- `v9_beeswarm_rows.html`
- `v10_likert_wall.html`
- `v11_chord_grid.html`
- `v12_circlepack_glowing_orbs.html`
- `v12_circlepack_grid.html`
- `v13_circlepack_borders.html`
- `v14_circlepack_flat.html`
- `v15_circlepack_flat_borders.html`
- `v16_treemap_grid.html`
- `v17_time_curves.html`
- `v17_time_curves_segments.html`
- `v18_time_curves_bezier.html`
- `v19_denselines.html`
- `v20_biofabric.html`
- `v20_biofabric_single.html`
- `v21_biofabric_grid.html`
- `v22_edge_bundling_grid.html`
- `v53_hinton.html`
- `v54_square_limit.html`
- `v55_dragon_curves.html`

Related non-HTML source files in the directory also outside this plan:
- `semiotic_streamlines.jsx`
- `v4_react_d3_streamlines.jsx`

---

Recommended build order

1. Create `js_funct/vis_palette_adapter.js`
2. Build `insert37.js`
3. Build `insert39.js`
4. Build `insert38.js`
5. Build `insert40.js`
6. Register all new inserts in:
   - `g.us3.htm`
   - `js_funct/insert_config.js`

Rationale

- `insert37` is the cleanest shared-engine family and should establish the family-insert template
- `insert39` is compact and high-identity
- `insert38` is broader and should come after the shared shell is stable
- `insert40` is style-sensitive and benefits from palette plumbing already being mature

---

Per-insert implementation checklist

For each new insert:

1. Create insert skeleton in `insert_js_2025/insertNN.js`
2. Add root node + style injection
3. Add cleanup registry for:
   - intervals
   - timeouts
   - requestAnimationFrame handles
   - window listeners
4. Add flavor router
5. Add keyboard controls
6. Add URL flavor parsing
7. Add palette adapter integration
8. Add minimal HUD
9. Register insert in `g.us3.htm`
10. Register config/description in `js_funct/insert_config.js`
11. Validate with `g.us3.htm?i=NN&flavor=X`

---

Suggested next planning artifact

After this file, create a second-level execution plan for the first implementation target:
- `docs/plans/2026-04-07-insert37-field-contour-noise.md`

That file should define:
- exact flavor architecture
- shared field utilities to extract
- palette behavior per flavor
- cleanup and resize strategy
- validation URLs

---

Appendix — Rebalanced mapping across inserts 37–44

This appendix supersedes the earlier provisional mapping. The goal is now not perfect taxonomy, but a better distribution of similar counts per insert while still keeping strong family clusters together where they matter most.

Rebalancing principles

- Keep clearly coherent clusters intact when they are visually or structurally strong.
- Circlepack stays together rather than being scattered.
- Keep D3 / Vega / chart-grammar work together when practical.
- Later singular experiments (`v40+`, especially `v53-v55`) may be spread out to balance insert sizes.
- Prefer avoiding inserts with only 3 flavors when neighboring inserts have 9 or 10.
- Since these inserts will live among all existing Glyphmatic inserts, a little looseness is acceptable if it improves flavor-count balance.

Recommended balanced insert family map

`insert37.js` — Field / Contour / Noise Systems
- `v23_contours_grid.html`
- `v25_optimization_landscapes.html`
- `v33_function_contours.html`
- `v34_perlin_noise.html`
- `v35_perlin_glyphs.html`
- `v36_sincos_contour.html`
- `v37_contour_blocks.html`
- `v38_perlin_square.html`
- `v39_perlin_square_circles.html`

Count: 9 flavors

`insert38.js` — Chart Grammar / Statistical Area Systems
- `v24_radar_grid.html`
- `v28_marimekko.html`
- `v30_ridgeline_grid.html`
- `v31_ridgeline_full.html`
- `v40_comet_grid.html`
- `v42_population_pyramids.html`
- `v43_population_areas.html`
- `v44_population_areas.html`
- `v48_circular_heatmaps.html`

Count: 9 flavors

`insert39.js` — Topology / Tessellation / Network Space
- `v29_optimal_substructure.html`
- `v45_voronoi_circles.html`
- `v46_delaunay_links.html`
- `v47_delaunay_glyphs.html`
- `v49_triplot.html`
- `v54_square_limit.html`
- `v55_dragon_curves.html`

Count: 7 flavors

`insert40.js` — Pattern / Projection / Material Systems
- `v26_barcode_grid.html`
- `v27_watercolor.html`
- `v32_custom_projections.html`
- `v41_lasagna.html`
- `v50_hatch_patterns.html`
- `v51_hatch_color.html`
- `v52_hatch_accent.html`

Count: 7 flavors

`insert41.js` — Flow / Rank / Time Systems
- `v3_d3_streamlines_smooth.html`
- `v5_d3_endless_stream.html`
- `v6_streaming_bump_chart.html`
- `top10_streamlines.html`
- `v17_time_curves.html`
- `v17_time_curves_segments.html`
- `v18_time_curves_bezier.html`
- `v19_denselines.html`

Count: 8 flavors

`insert42.js` — Circlepack / Packing / Statistical Layouts
- `v8_beeswarm_single.html`
- `v9_beeswarm_rows.html`
- `v10_likert_wall.html`
- `v12_circlepack_glowing_orbs.html`
- `v12_circlepack_grid.html`
- `v13_circlepack_borders.html`
- `v14_circlepack_flat.html`
- `v15_circlepack_flat_borders.html`
- `v16_treemap_grid.html`

Count: 9 flavors

`insert43.js` — Network / Graph / Edge Systems
- `v7_generative_sankey.html`
- `v11_chord_grid.html`
- `v20_biofabric.html`
- `v20_biofabric_single.html`
- `v21_biofabric_grid.html`
- `v22_edge_bundling_grid.html`
- `v53_hinton.html`

Count: 7 flavors

Notes
- `v53_hinton.html` is placed in `insert43.js` for count balancing, even though it could also fit in chart-grammar territory.
- `v54_square_limit.html` and `v55_dragon_curves.html` are placed with `insert39.js` to keep `insert44` from existing as an undersized 3-flavor insert.
- `top10_generative_art.html` remains best attached to existing Plotly work in `insert30.js` unless Plotly is later split further.
- `index.html` and `math_index.html` remain archival/gallery artifacts rather than insert sources.

Resulting balanced distribution

- `insert37` = 9
- `insert38` = 9
- `insert39` = 7
- `insert40` = 7
- `insert41` = 8
- `insert42` = 9
- `insert43` = 7

This distribution is intentionally more even than the earlier provisional grouping and better matches the goal of fairer flavor visibility over time.

Implementation table

| Insert | Family | Flavor count | Default palette mode | Source files |
| --- | --- | ---: | --- | --- |
| 37 | Field / Contour / Noise | 9 | OKLCH | `v23`, `v25`, `v33`, `v34`, `v35`, `v36`, `v37`, `v38`, `v39` |
| 38 | Chart Grammar / Statistical Area | 9 | Artist | `v24`, `v28`, `v30`, `v31`, `v40`, `v42`, `v43`, `v44`, `v48` |
| 39 | Topology / Tessellation / Network Space | 7 | Hybrid | `v29`, `v45`, `v46`, `v47`, `v49`, `v54`, `v55` |
| 40 | Pattern / Projection / Material | 7 | Artist | `v26`, `v27`, `v32`, `v41`, `v50`, `v51`, `v52` |
| 41 | Flow / Rank / Time | 8 | OKLCH | `v3`, `v5`, `v6`, `top10_streamlines`, `v17`, `v17_segments`, `v18`, `v19` |
| 42 | Circlepack / Packing / Statistical Layouts | 9 | Artist | `v8`, `v9`, `v10`, `v12_glowing_orbs`, `v12_grid`, `v13`, `v14`, `v15`, `v16` |
| 43 | Network / Graph / Edge Systems | 7 | Hybrid | `v7`, `v11`, `v20`, `v20_single`, `v21`, `v22`, `v53` |

Detailed flavor table

| Insert | Flavor | Source file | Short label | Palette note |
| --- | ---: | --- | --- | --- |
| 37 | 0 | `v23_contours_grid.html` | contours-grid | OKLCH default |
| 37 | 1 | `v25_optimization_landscapes.html` | optimization-landscapes | OKLCH default |
| 37 | 2 | `v33_function_contours.html` | function-contours | OKLCH default |
| 37 | 3 | `v34_perlin_noise.html` | perlin-noise | OKLCH default |
| 37 | 4 | `v35_perlin_glyphs.html` | perlin-glyphs | hybrid/artist-friendly |
| 37 | 5 | `v36_sincos_contour.html` | sincos-contour | OKLCH default |
| 37 | 6 | `v37_contour_blocks.html` | contour-blocks | hybrid/artist-friendly |
| 37 | 7 | `v38_perlin_square.html` | perlin-square | OKLCH default |
| 37 | 8 | `v39_perlin_square_circles.html` | perlin-square-circles | hybrid/artist-friendly |
| 38 | 0 | `v24_radar_grid.html` | radar-grid | artist default |
| 38 | 1 | `v28_marimekko.html` | marimekko | artist default |
| 38 | 2 | `v30_ridgeline_grid.html` | ridgeline-grid | artist default |
| 38 | 3 | `v31_ridgeline_full.html` | ridgeline-full | artist default |
| 38 | 4 | `v40_comet_grid.html` | comet-grid | artist or hybrid |
| 38 | 5 | `v42_population_pyramids.html` | population-pyramids | artist or hybrid |
| 38 | 6 | `v43_population_areas.html` | population-areas-rounded | artist or hybrid |
| 38 | 7 | `v44_population_areas.html` | population-areas | artist or hybrid |
| 38 | 8 | `v48_circular_heatmaps.html` | circular-heatmaps | hybrid diverging |
| 39 | 0 | `v29_optimal_substructure.html` | optimal-substructure | hybrid default |
| 39 | 1 | `v45_voronoi_circles.html` | voronoi-circles | hybrid default |
| 39 | 2 | `v46_delaunay_links.html` | delaunay-links | hybrid default |
| 39 | 3 | `v47_delaunay_glyphs.html` | delaunay-glyphs | artist-friendly |
| 39 | 4 | `v49_triplot.html` | triplot | hybrid default |
| 39 | 5 | `v54_square_limit.html` | square-limit | artist-friendly |
| 39 | 6 | `v55_dragon_curves.html` | dragon-curves | artist-friendly |
| 40 | 0 | `v26_barcode_grid.html` | barcode-grid | artist or OKLCH |
| 40 | 1 | `v27_watercolor.html` | watercolor | artist strongly preferred |
| 40 | 2 | `v32_custom_projections.html` | custom-projections | artist default |
| 40 | 3 | `v41_lasagna.html` | lasagna | artist default |
| 40 | 4 | `v50_hatch_patterns.html` | hatch-patterns | monochrome or artist |
| 40 | 5 | `v51_hatch_color.html` | hatch-color | artist default |
| 40 | 6 | `v52_hatch_accent.html` | hatch-accent | artist default |
| 41 | 0 | `v3_d3_streamlines_smooth.html` | d3-streamlines-smooth | OKLCH default |
| 41 | 1 | `v5_d3_endless_stream.html` | d3-endless-stream | OKLCH default |
| 41 | 2 | `v6_streaming_bump_chart.html` | streaming-bump-chart | OKLCH default |
| 41 | 3 | `top10_streamlines.html` | top10-streamlines | OKLCH default |
| 41 | 4 | `v17_time_curves.html` | time-curves | OKLCH default |
| 41 | 5 | `v17_time_curves_segments.html` | time-curves-segments | OKLCH default |
| 41 | 6 | `v18_time_curves_bezier.html` | time-curves-bezier | OKLCH default |
| 41 | 7 | `v19_denselines.html` | denselines | hybrid possible |
| 42 | 0 | `v8_beeswarm_single.html` | beeswarm-single | artist default |
| 42 | 1 | `v9_beeswarm_rows.html` | beeswarm-rows | artist default |
| 42 | 2 | `v10_likert_wall.html` | likert-wall | artist default |
| 42 | 3 | `v12_circlepack_glowing_orbs.html` | circlepack-glowing-orbs | artist default |
| 42 | 4 | `v12_circlepack_grid.html` | circlepack-grid | artist default |
| 42 | 5 | `v13_circlepack_borders.html` | circlepack-borders | artist default |
| 42 | 6 | `v14_circlepack_flat.html` | circlepack-flat | artist default |
| 42 | 7 | `v15_circlepack_flat_borders.html` | circlepack-flat-borders | artist default |
| 42 | 8 | `v16_treemap_grid.html` | treemap-grid | artist or hybrid |
| 43 | 0 | `v7_generative_sankey.html` | generative-sankey | hybrid default |
| 43 | 1 | `v11_chord_grid.html` | chord-grid | hybrid default |
| 43 | 2 | `v20_biofabric.html` | biofabric | hybrid default |
| 43 | 3 | `v20_biofabric_single.html` | biofabric-single | hybrid default |
| 43 | 4 | `v21_biofabric_grid.html` | biofabric-grid | hybrid default |
| 43 | 5 | `v22_edge_bundling_grid.html` | edge-bundling-grid | hybrid default |
| 43 | 6 | `v53_hinton.html` | hinton | artist or hybrid |

Bottom line

This plan preserves the conversion scope for `v23-v52`, captures the major remaining `2026_exp/vis` HTMLs, and rebalances the family inserts so flavor counts stay reasonably even across the new insert set.
