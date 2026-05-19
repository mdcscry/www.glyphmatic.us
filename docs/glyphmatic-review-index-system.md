# Glyphmatic Review Index System

This document defines a navigation-and-curation layer that sits between raw experiments and formal insert adoption.

## Core idea

Before deciding whether an experiment becomes an insert, build review indexes.

These indexes should let the user:
- browse experiments grouped into logical families
- scan thumbnails / screenshots quickly
- open the live standalone HTML directly
- compare variants and likely flavors
- mark likely winners
- see which groups suggest future insert families

This creates a middle layer:

raw experiments -> review indexes -> family decisions -> insert formalization

## Why this is the right intermediate layer

The insert system is expensive.
A review index system is much cheaper and still creates real structure.

It gives value even before insert work is complete:
- better navigation
- better memory of what exists
- easier family comparison
- easier winner selection
- easier future-port planning
- a place to document desired upgrades (palette, glyphs, autofont, controls)

## Source areas to catalog

First-pass source areas:
- `2011_exp/` (already has an index model)
- `2025_exp/`
- `2025_exp/html_experiments/`
- `2026_exp/`
- `2026_exp/vis/`

The review-index effort should focus first on:
- `2025_exp/html_experiments/`
- `2026_exp/vis/`
- selected top-level `2025_exp/` and `2026_exp/` files not already covered elsewhere

## Deliverables

### 1. Master review index
A top-level navigation page, e.g.
- `review_indexes/index.html`

It should link to family index pages and show:
- family name
- source area(s)
- experiment count
- candidate insert family name
- status
- whether screenshots exist
- whether palette/glyph/autofont upgrade notes exist

### 2. Family index pages
Examples:
- `review_indexes/families/tilings.html`
- `review_indexes/families/stream-time-series.html`
- `review_indexes/families/circlepack-hierarchy.html`
- `review_indexes/families/triangulation-voronoi.html`

Each family page should show cards for experiments and/or prospective flavors.

Each card should include:
- screenshot thumbnail
- file title
- path
- year/source area
- inferred family / subgroup
- inferred date or sequence info when available
- tags based on quick content scan
- buttons/links:
  - open standalone
  - open screenshot full-size
  - open source file
- status marker:
  - winner candidate
  - maybe
  - prototype
  - already absorbed
- optional notes field

### 3. Manifest data layer
A machine-readable file should drive the indexes.
Examples:
- `review_indexes/data/master_manifest.json`
- `review_indexes/data/families/*.json`

Each record should contain fields like:
- `id`
- `title`
- `path`
- `source_area`
- `year_bucket`
- `family`
- `subfamily`
- `sequence_hint`
- `tags`
- `libraries` (`d3`, `plotly`, canvas, plain dom, svg, etc.)
- `uses_autofont`
- `uses_artist_palette`
- `uses_colorpalette`
- `uses_glyph_data`
- `screenshot_path`
- `status`
- `future_insert_candidate`
- `notes`
- `upgrade_notes`

### 4. Screenshot cache
Screenshots should be generated and saved, not captured ad hoc every time.
Example structure:
- `review_indexes/screenshots/...`

Potential conventions:
- one screenshot per standalone file
- optional extra screenshots for variants / UI states
- optional multiple captures for randomized works if needed later

## Grouping strategy

Initial grouping should be heuristic and editable.
The first pass does not need to be perfect.

Group by a combination of:
- directory location
- filename patterns
- title text
- script/library detection
- quick keyword scan
- visual idiom when obvious

Probable families include:
- tilings / grids / tessellation
- truchet / brick / herringbone / hex / islamic
- rectangle / square subdivision
- fibonacci / spiral / recursive geometry
- penrose / voronoi / delaunay / triangulation
- stream / bump / denselines / timeseries
- hierarchy / circlepack / treemap
- graph / sankey / chord / biofabric / bundling
- contour / perlin / field / optimization
- hatch / printmaking / texture
- glyph grid / mosaic / proof systems
- holiday / oracle / summoning / one-off thematic pieces

## Selection and filtering behavior

Each family page should support client-side filtering.
Useful controls:
- source area
- year
- library type
- palette integration status
- glyph/autofont usage
- status bucket
- winner-candidate toggle

Useful sort modes:
- filename/date-ish order
- family subgroup
- manual curation order
- likely insert priority

## Status model

Suggested values:
- `winner`
- `candidate`
- `prototype`
- `absorbed`
- `standalone-keeper`
- `skip`

This lets the review index act as a curation workspace rather than a passive catalog.

## Flavor concept

For future inserts, a family page can explicitly model likely insert flavors before any insert exists.

Example:
- family: `triangulation-voronoi`
- flavor 0: `voronoi circles`
- flavor 1: `delaunay links`
- flavor 2: `delaunay glyphs`
- flavor 3: `triplot`

The review index can show these as a proposed family cluster with notes like:
- shared palette target
- shared glyph strategy
- needs autofont? yes/no
- likely keyboard mapping `0-3`

This is extremely useful because it lets curation happen before porting.

## Screenshot generation approach

Screenshots should be generated by automation, not manually.

Pipeline idea:
1. open each HTML in a local browser
2. wait for a settle time
3. capture screenshot
4. store image path in manifest

For highly randomized works:
- capture one default representative screenshot first
- later optionally support multiple captures per experiment

## Upgrade-notes system

Each manifest entry should allow explicit enhancement notes, e.g.:
- randomize interface density
- route colors through artist palettes
- upgrade to hybrid palette mode
- integrate AutoFont block rotation
- expand glyph block choices
- add regeneration hotkeys
- add info HUD

This is important because the review index is not just cataloging current state.
It should also stage future insert ambitions.

## Relationship to insert work

The review indexes are not a detour.
They are a support structure.

They help answer:
- which experiments deserve promotion?
- which should combine into one insert family?
- which need advanced palette/glyph work?
- which are already effectively done?
- which should stay standalone?

## Build order

### Phase 1: infrastructure
- create `review_indexes/` structure
- create manifest schema
- create script to scan files and infer metadata
- create first master index and one sample family page

### Phase 2: first-pass catalog
- ingest `2026_exp/vis/`
- ingest `2025_exp/html_experiments/`
- infer titles/tags/libraries
- create screenshots
- generate family pages

### Phase 3: curation pass
- mark winners/candidates/prototypes
- identify future insert families
- add upgrade notes
- tune grouping manually

### Phase 4: insert planning bridge
- use family pages as pre-insert navigation
- define flavor clusters directly from family pages
- only then choose which families become inserts

## Recommended first target

Start with the two richest areas:
- `2026_exp/vis/`
- `2025_exp/html_experiments/`

These give the biggest immediate payoff for browsing and family discovery.

## Success condition

Success is not merely:
- "we have a list of files"

Success is:
- a master index exists
- family pages exist
- screenshots exist
- the user can browse and choose winners quickly
- likely future insert families become obvious
- the index system becomes a permanent navigation layer even before insert migration is finished
