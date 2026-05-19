# Shared Vis Palette Adapter Plan

> For Hermes: implement this before building the new 2026 vis family inserts. This adapter is the color contract for inserts 37–43.

Goal

Create one shared palette adapter for the new Glyphmatic vis-family inserts so they can all use:
- artist palettes from `js_funct/artist_palettes.js`
- generative palettes from `js_funct/colorpalette.js`
- a normalized output shape that keeps insert code smaller and avoids ad hoc local palette arrays

Why this comes first

The user explicitly wants the new vis inserts to stop relying on weak hand-rolled palettes and instead use the full expressive range of:
- artist palettes from `js_funct/artist_palettes.js`
- purely random/generated palettes from `js_funct/colorpalette.js`

Since inserts 37–43 will all need palette logic, a shared adapter should exist before family implementation begins.

Primary files

Create:
- `js_funct/vis_palette_adapter.js`

Read/reference:
- `js_funct/artist_palettes.js`
- `js_funct/colorpalette.js`
- `insert_js_2025/insert29.js`
- `insert_js_2025/insert30.js`
- `docs/plans/2026-04-07-vis-family-inserts-v23-v52.md`

Optional follow-up docs:
- `docs/plans/2026-04-07-insert37-field-contour-noise.md`

---

Design requirements

The adapter must:
- work in browser-first plain JS with no build step
- expose a simple global API
- support `artist`, `oklch`, and `hybrid` modes
- produce normalized palette objects for inserts
- support deterministic-ish cycling through palette choices without fragile per-insert code
- make it easy for inserts to ask for:
  - page background
  - panel/cell background
  - stroke colors
  - fill colors
  - accent color
  - text/HUD color
  - palette key/label for debugging or UI

The adapter should not:
- impose a giant framework
- require modules/bundling
- mutate host globals unpredictably
- take over rendering logic

---

Proposed global API

Expose one global object:

```js
window.VisPaletteAdapter
```

Core methods

```js
VisPaletteAdapter.create(options)
VisPaletteAdapter.next(state, options)
VisPaletteAdapter.getArtistPaletteKeys(filterFn)
VisPaletteAdapter.expandForCount(palette, count)
VisPaletteAdapter.pick(palette, channel)
VisPaletteAdapter.deriveRamp(colors, count)
VisPaletteAdapter.getTextColor(bg)
```

Minimum expected usage by inserts

```js
var paletteState = VisPaletteAdapter.create({
  mode: 'artist',
  family: 'insert37',
  count: 8,
  allowHybrid: true
});

var palette = paletteState.palette;
// palette.bg
// palette.panelBg
// palette.lineColors
// palette.fillColors
// palette.accent
// palette.text
// palette.label
// palette.key
```

Cycle to next palette:

```js
paletteState = VisPaletteAdapter.next(paletteState, {
  mode: paletteState.mode,
  family: 'insert37',
  count: 8
});
```

---

Normalized palette object shape

Every call to `create()` and `next()` should return state shaped like:

```js
{
  mode: 'artist' | 'oklch' | 'hybrid',
  index: 0,
  seedHint: null,
  palette: {
    key: 'matisse_fauve',
    label: 'Matisse — Fauvism',
    bg: '#0b0a14',
    panelBg: '#14121c',
    lineColors: ['#...', '#...', '#...'],
    fillColors: ['#...', '#...', '#...'],
    accent: '#...',
    text: '#f2f2f2',
    raw: { ...originalSourcePaletteOrMetadata }
  }
}
```

Required normalized fields

- `key`
- `label`
- `bg`
- `panelBg`
- `lineColors`
- `fillColors`
- `accent`
- `text`

---

Mode behavior

## 1. Artist mode

Source:
- `window.ARTIST_PALETTES` from `js_funct/artist_palettes.js`

Behavior:
- choose one artist palette key
- use `bg` as page background base
- derive `panelBg` by slightly shifting/darkening/lightening relative to `bg`
- use source `colors` as the base hue family
- expand to requested count using repetition + shuffled order or interpolation where needed

Good default for:
- insert38
- insert40
- insert42
- artist-friendly flavors in insert39

## 2. OKLCH mode

Source:
- `window.ColorPalette` from `js_funct/colorpalette.js`

Behavior:
- call `ColorPalette.init()` or equivalent safe wrapper
- derive:
  - `bg` from page background
  - `panelBg` from grid background
  - `lineColors` / `fillColors` from glyph palette or expanded variants
- ensure text color remains readable

Good default for:
- insert37
- insert41
- darker topology and field systems

## 3. Hybrid mode

Behavior:
- use artist palette as chromatic source where possible
- use adapter logic to derive more contrast-safe backgrounds/panel backgrounds
- or mix artist `colors` with OKLCH-style panel/background derivation

Good default for:
- insert39
- insert43
- diverging/sequential chart flavors in insert38

---

Suggested options shape

```js
{
  mode: 'artist' | 'oklch' | 'hybrid',
  count: 8,
  key: null,
  family: 'insert37',
  flavor: 0,
  backgroundBias: 'dark',
  textBias: 'auto',
  panelContrast: 0.08,
  artistFilter: null,
  preferMonochrome: false
}
```

Important option meanings

- `count`: desired color count for marks
- `key`: explicit palette key if caller wants a fixed artist palette
- `family`: lets the adapter make family-aware defaults later if needed
- `flavor`: allows future flavor-specific defaults
- `backgroundBias`: `'dark'`, `'light'`, or `'auto'`
- `artistFilter`: optional function or simple selector to narrow artist palette choices

---

Family defaults to support now

Implement a small family-default map inside the adapter.

```js
const FAMILY_DEFAULTS = {
  insert37: { mode: 'oklch', backgroundBias: 'dark' },
  insert38: { mode: 'artist', backgroundBias: 'dark' },
  insert39: { mode: 'hybrid', backgroundBias: 'dark' },
  insert40: { mode: 'artist', backgroundBias: 'light' },
  insert41: { mode: 'oklch', backgroundBias: 'dark' },
  insert42: { mode: 'artist', backgroundBias: 'dark' },
  insert43: { mode: 'hybrid', backgroundBias: 'dark' }
};
```

These should be defaults, not hard locks.

---

Color derivation rules

## Backgrounds

`bg`
- main insert background
- should be stable and not overly bright unless explicitly requested

`panelBg`
- used for small multiple cells or interior chart panels
- should be visibly distinct from `bg`
- should not crush contrast for marks

## Marks

`lineColors`
- primary stroke/edge/path colors
- should be high enough contrast against `bg` or `panelBg`

`fillColors`
- area/polygon/bar/fill colors
- can be slightly softer than `lineColors`

`accent`
- one strong color for HUD, highlights, selected path, etc.

`text`
- automatically chosen for readability against `bg`

---

Helper behaviors to implement

## expandForCount(palette, count)

Input:
- palette with a short source color array

Output:
- arrays long enough for the caller’s requested count

Preferred approach:
- first use shuffled repeats of source colors
- optional interpolation only when visually useful
- preserve original palette character rather than smoothing everything into generic gradients

## deriveRamp(colors, count)

Used for:
- diverging or sequential chart flavors
- circular heatmaps / population variants

Approach:
- if 3+ source colors exist, interpolate between anchors
- if 2 colors exist, create midpoint blends
- if more than enough colors exist, sample evenly

## getTextColor(bg)

Simple readable text selection:
- return near-white for dark backgrounds
- return near-black for light backgrounds
- do not overcomplicate; use a luminance heuristic

---

Keyboard and UI expectations for inserts

The adapter should make these actions easy, though not handle key events itself:

- `p` → next palette within current mode
- `a` → switch mode (`artist` / `oklch` / `hybrid` where allowed)
- HUD can display:
  - family
  - flavor
  - palette label
  - palette mode

The adapter should therefore preserve:
- `state.mode`
- `state.index`
- `palette.key`
- `palette.label`

---

Fallback rules

If artist palettes are unavailable:
- fall back to OKLCH mode automatically
- set label to indicate fallback

If `ColorPalette` is unavailable:
- fall back to artist mode automatically
- if both are unavailable, use a tiny internal emergency palette set

Emergency fallback should be tiny and only defensive:
- dark neutral
- light neutral
- one chromatic set

This emergency set is only for resilience, not intended as the normal path.

---

Implementation plan

### Task 1: Create adapter skeleton

Create:
- `js_funct/vis_palette_adapter.js`

Add:
- IIFE wrapper
- global export `window.VisPaletteAdapter`
- family defaults map
- placeholder create/next methods

### Task 2: Implement artist palette normalization

Read from:
- `window.ARTIST_PALETTES`

Implement:
- palette key selection
- background derivation
- line/fill/accent/text normalization
- count expansion

### Task 3: Implement OKLCH palette normalization

Read from:
- `window.ColorPalette`

Implement:
- safe initialization wrapper
- extraction of bg/panel/glyph colors
- normalization into adapter output shape

### Task 4: Implement hybrid mode

Implement:
- artist color family + derived structured backgrounds
- or artist source colors layered onto safer contrast-aware panel treatment

### Task 5: Implement cycling and fallback behavior

Implement:
- `next()`
- stable index advancement
- fallback transitions when source engines are missing

### Task 6: Add lightweight example integration notes

In comments near the bottom of the adapter file, include a minimal usage example for inserts.

### Task 7: Validate in browser-first usage

Manual validation target:
- load adapter before a scratch test page or temporary insert integration
- verify object exists
- verify palette modes cycle cleanly
- verify no console errors if one source system is unavailable

---

Verification checklist

- [ ] `window.VisPaletteAdapter` exists after script load
- [ ] artist mode works when `artist_palettes.js` is loaded
- [ ] oklch mode works when `colorpalette.js` is loaded
- [ ] hybrid mode returns normalized palette object
- [ ] `next()` cycles safely
- [ ] text color remains readable on dark/light backgrounds
- [ ] no insert-specific assumptions are hardcoded beyond family defaults
- [ ] no build step required

---

Follow-up after this plan

Once this adapter is planned or implemented, the next document should be:
- `docs/plans/2026-04-07-insert37-field-contour-noise.md`

That insert should be the first implementation target because it is the cleanest family for establishing the post-adapter template.
