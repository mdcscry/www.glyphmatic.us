# Insert 37 Implementation Plan — Field / Contour / Noise Systems

> For Hermes: implement this after the shared vis palette adapter plan is in place. Insert 37 is the first execution target because it is the cleanest family for establishing the new vis-family insert template.

Goal

Create `insert_js_2025/insert37.js` as a multi-flavor Glyphmatic insert that consolidates the field / contour / noise experiments into one host-safe, keyboard-driven insert using shared palette infrastructure and explicit cleanup.

Target family

Insert 37 maps these source experiments into flavors:

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

Primary objective

Build the first robust vis-family insert template, not just a one-off insert.

This means insert 37 should establish:
- host-safe DOM/root structure
- flavor routing
- cleanup discipline
- palette adapter integration
- minimal HUD
- keyboard controls
- URL flavor support
- reusable field/contour helper patterns

---

Core design constraints

- Do not wipe `document.body.innerHTML`
- Append one managed root node
- Preserve Glyphmatic host watermark/nav behavior
- Provide `changeHtmlDisplayInline()` stub
- Track and clean up all timers/listeners/RAF handles
- Keep implementation browser-first and dependency-light
- Favor extraction of shared insert-local helpers over copy-pasting every source file literally

Important palette clause

Do not be parsimonious with palettes.

The user wants insert 37 and the later vis-family inserts to use the full expressive range of:
- artist palettes from `js_funct/artist_palettes.js`
- purely random/generated palettes from `js_funct/colorpalette.js`

Meaning:
- do not artificially constrain palette variation during development
- support broad artist-palette selection early
- support fully random/generated palette behavior early
- allow flavor-specific defaults, but do not reduce the system to a tiny dev shortlist
- artist palettes should remain a major visual identity source because they are especially interesting to the user

Recommended development rule

While implementing insert 37:
- wire full artist-palette support from the start
- wire full random/generated palette support from the start
- if temporary pinning is needed for debugging a specific rendering bug, keep that as a short-lived debug tactic rather than a design rule
- HUD should always make palette mode and palette label visible so rich palette use stays legible during testing

---

Files to modify

Create:
- `insert_js_2025/insert37.js`

Modify:
- `g.us3.htm`
- `js_funct/insert_config.js`

Read/reference:
- `2026_exp/vis/v23_contours_grid.html`
- `2026_exp/vis/v25_optimization_landscapes.html`
- `2026_exp/vis/v33_function_contours.html`
- `2026_exp/vis/v34_perlin_noise.html`
- `2026_exp/vis/v35_perlin_glyphs.html`
- `2026_exp/vis/v36_sincos_contour.html`
- `2026_exp/vis/v37_contour_blocks.html`
- `2026_exp/vis/v38_perlin_square.html`
- `2026_exp/vis/v39_perlin_square_circles.html`
- `js_funct/vis_palette_adapter.js` (planned shared adapter)
- `insert_js_2025/insert29.js`
- `insert_js_2025/insert30.js`

---

Insert architecture

Recommended high-level shape

```js
(function() {
  'use strict';

  var INSERT37 = {
    currentFlavor: 0,
    root: null,
    styleEl: null,
    hudEl: null,
    runToken: 0,
    rafIds: new Set(),
    timeoutIds: new Set(),
    intervalIds: new Set(),
    cleanupFns: [],
    keyHandlerAttached: false,
    resizeHandlerAttached: false,
    paletteState: null,
    hudVisible: true,
    paused: false
  };

  function changeHtmlDisplayInline() {}
  function initInsert37() {}
  function startFlavor(flavor) {}
  function teardownFlavor() {}
})();
```

Required internal subsystems

1. root/style/HUD management
2. cleanup registry
3. palette integration
4. flavor dispatch
5. field/grid utility helpers
6. canvas/SVG stage creation helpers
7. keyboard and resize handlers

---

Proposed implementation phases

## Phase 1 — Build insert shell only

Objective

Create the insert skeleton that loads cleanly in Glyphmatic before any source flavor logic is ported.

Steps

1. Create `insert_js_2025/insert37.js`
2. Add:
   - root creation
   - style injection
   - minimal HUD
   - keyboard handler skeleton
   - cleanup registry
   - `changeHtmlDisplayInline()` stub
3. Add safe startup:
   - parse `flavor` from URL
   - default to flavor `0`
4. Render a placeholder screen with flavor label only

Expected result

- `g.us3.htm?i=37` loads with no console errors
- watermark/nav remains intact
- root is appended, not destructive

## Phase 2 — Register insert in host and config

Objective

Make the insert routable from Glyphmatic host code.

Modify `g.us3.htm`

Add:
```js
insertArray[37] = ['none', 'Field / Contour / Noise'];
```

Modify `js_funct/insert_config.js`

Add config for insert 37:
- controls: likely all false initially
- watermarks: probably 1, top-left, non-invasive
- description: mention multi-flavor field/contour/noise family and keys `0-8`

Validation

- `g.us3.htm?i=37`
- `g.us3.htm?i=37&flavor=4`

## Phase 3 — Integrate palette adapter in conservative dev mode

Objective

Wire palette usage before the flavors get complex, but keep palette variation deliberately constrained.

Implementation requirements

- initialize adapter with family default for `insert37`
- in dev mode, pin to a very small palette shortlist
- HUD should show:
  - `insert37`
  - flavor label
  - palette label
  - palette mode

Recommended temporary implementation policy

```js
DEV_ARTIST_KEYS = ['kandinsky_early', 'matisse_fauve'];
DEV_ALLOW_OKLCH = true;
```

Do not yet expose broad random palette cycling.

## Phase 4 — Implement the contour-first flavors

These should come first because they are conceptually closest and most reusable.

Order

- flavor `0` — contours-grid
- flavor `1` — optimization-landscapes
- flavor `2` — function-contours
- flavor `5` — sincos-contour
- flavor `6` — contour-blocks

Shared helpers to extract

- scalar field sampler over grid
- contour threshold generation
- small-multiple grid layout
- SVG contour path rendering
- canvas block rendering for contour-blocks

Why this order

It creates the shared core of the insert before perlin/noise flavors are added.

## Phase 5 — Implement the perlin/noise flavors

Order

- flavor `3` — perlin-noise
- flavor `7` — perlin-square
- flavor `8` — perlin-square-circles
- flavor `4` — perlin-glyphs

Shared helpers to extract

- noise field setup
- raster/canvas iteration helpers
- square/cell geometry helpers
- optional glyph overlay hook for flavor 4

Why `perlin-glyphs` comes last

It is the most Glyphmatic-specific and should inherit a stable palette and field framework before glyph overlay is added.

---

Flavor design notes

## Flavor 0 — contours-grid

Source:
- `v23_contours_grid.html`

Keep
- multi-cell contour look
- d3 contour aesthetic

Simplify if needed
- reduce palette churn during dev
- keep one stable contour threshold recipe initially

## Flavor 1 — optimization-landscapes

Source:
- `v25_optimization_landscapes.html`

Keep
- named optimization-function landscape feeling
- contour/surface variation across cells

Simplify if needed
- fewer function choices during initial port
- fixed dark background in dev mode

## Flavor 2 — function-contours

Source:
- `v33_function_contours.html`

Keep
- abstract function family look
- line/field elegance

## Flavor 3 — perlin-noise

Source:
- `v34_perlin_noise.html`

Keep
- rich field behavior
- strong procedural identity

Simplify if needed
- fewer mode variants initially
- one or two stable modes first

## Flavor 4 — perlin-glyphs

Source:
- `v35_perlin_glyphs.html`

Keep
- glyph-field bridge
- strong Glyphmatic identity

Important note
- this flavor should probably be one of the first to use artist palettes heavily in final form
- during dev, keep glyph set and palette both constrained

## Flavor 5 — sincos-contour

Source:
- `v36_sincos_contour.html`

Keep
- mathematically clear contour structure

## Flavor 6 — contour-blocks

Source:
- `v37_contour_blocks.html`

Keep
- block/region logic
- possibility of painterly block palette in final form

## Flavor 7 — perlin-square

Source:
- `v38_perlin_square.html`

Keep
- cell-based square logic

## Flavor 8 — perlin-square-circles

Source:
- `v39_perlin_square_circles.html`

Keep
- square/circle hybrid surface logic
- visually strong compositional structure

---

Keyboard controls

Required

- `0-8` → switch flavors
- `r` → regenerate current flavor
- `p` → next palette
- `a` → toggle palette mode only after implementation stabilizes
- `h` → toggle HUD
- `space` → pause/resume animated flavors if relevant

Dev-phase behavior

- `p` should cycle only through a small palette set during development
- broad artist palette cycling can be enabled later

---

HUD content

Minimal HUD should display:
- `insert37`
- flavor number
- flavor label
- palette label
- palette mode

Example

```text
insert37 · flavor 4 perlin-glyphs · palette Matisse — Fauvism · artist
```

Keep it visually quiet and non-intrusive.

---

Cleanup requirements

Every flavor restart must:
- increment `runToken`
- clear tracked RAF handles
- clear tracked intervals
- clear tracked timeouts
- run registered cleanup callbacks
- reset root stage contents without destroying host-owned elements

Track these explicitly
- requestAnimationFrame ids
- setTimeout ids
- setInterval ids
- resize listeners if flavor-specific
- temporary DOM nodes if detached from root

---

Suggested task breakdown

### Task 1: Create insert37 shell

Files:
- create `insert_js_2025/insert37.js`

Include:
- state object
- root/style/HUD
- cleanup registry
- keyboard scaffolding
- URL flavor parsing

### Task 2: Register insert37 in host/config

Files:
- modify `g.us3.htm`
- modify `js_funct/insert_config.js`

### Task 3: Add palette adapter integration in dev-constrained mode

Files:
- modify `insert_js_2025/insert37.js`
- depends on `js_funct/vis_palette_adapter.js`

### Task 4: Port contour-first flavors

Flavors:
- 0, 1, 2, 5, 6

### Task 5: Port noise/perlin flavors

Flavors:
- 3, 7, 8, 4

### Task 6: Expand palette behavior after visual stability

Only after flavors are working:
- broaden artist palette options
- enable fuller palette cycling
- tune per-flavor defaults

### Task 7: Final validation pass

Check:
- all flavors switch cleanly
- no duplicate canvases/SVGs survive after switching
- HUD and palette label update correctly
- no memory leaks visible in repeated flavor switching

---

Validation checklist

Notes discovered during live insert37 work
- Watermark must stay above the insert layer; `insert37` needs a positive watermark z-index in `js_funct/insert_config.js`.
- The insert-specific info/HUD should default to collapsed on startup.
- The collapsed state should be controlled by a small bottom-right toggle button.
- If this family is later shown in a dedicated gallery context, add a URL parameter to force the HUD open (for example `collapsed=false` or equivalent).
- Flavor 1 and flavor 2 currently read as too similar and need a clearer fidelity split.
- Flavors 3–8 need a dedicated detailing pass for layout and centering fidelity against their source experiments.
- For the next pass, prioritize structural fidelity (composition, centering, tiling, page coverage, silhouette) over simply matching palette or underlying function family.

URLs
- `g.us3.htm?i=37`
- `g.us3.htm?i=37&flavor=0`
- `g.us3.htm?i=37&flavor=4`
- `g.us3.htm?i=37&flavor=8`

Checks
- [ ] host UI still present
- [ ] no body wipe
- [ ] flavor switching via keyboard works
- [ ] palette cycling works in constrained dev mode
- [ ] cleanup works repeatedly
- [ ] no console errors on resize
- [ ] contour and noise flavors both render reliably
- [ ] perlin-glyphs remains legible and benefits from artist palette mode

---

Recommended implementation order after planning

1. implement `js_funct/vis_palette_adapter.js`
2. implement insert37 shell + registration
3. integrate conservative dev palette mode
4. port contour-first flavors
5. port noise/perlin flavors
6. broaden artist palette usage once stable

---

Bottom line

Insert 37 should become the first true vis-family insert template.

Its implementation should prioritize:
- shell discipline
- cleanup discipline
- conservative palette handling during development
- eventual emphasis on artist palettes for the most interesting final look
