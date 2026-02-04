# Variable Font Unicode Display System

## Overview

This system creates an animated, grid-based display of Unicode glyphs using Google's variable fonts. Each glyph morphs continuously through different font variation axis values, creating a dynamic typographic visualization.

**Main Demo**: [auto16-var-font-grid.htm](../../2025_exp/auto16-var-font-grid.htm)
**Integrated Version**: [g.us3.htm](../../g.us3.htm) via [insert23.js](../../insert_js_2025/insert23.js)

## Core Concept

The system matches Unicode glyphs to variable fonts based on:
1. **Unicode Block** (e.g., "Basic Latin", "Cyrillic", "Georgian")
2. **Variable Axis Combination** (e.g., "wght", "GRAD_opsz_wdth_wght")
3. **Font Support** (which Google Fonts variable fonts support that block + axis combo)

Then it animates the glyphs by morphing their variable axis values continuously.

---

## Data Structure Files

All lookup files are in `js_glyph/2025_var_blocks/`:

### 1. `font_axis_ranges.js`
Maps font names to their variable axes and min/max values.

```javascript
font_axis_ranges['Afacad Flux'] = {
  slnt: { min: -14, max: 14 },
  wght: { min: 100, max: 1000 }
};
```

**Purpose**: Defines what axes each font supports and their valid ranges for animation.

### 2. `var_axis.js`
Array of all unique axis combinations found across fonts.

```javascript
var_axes = [
  "ARRR_wght",
  "BLED_SCAN",
  "GRAD_XOPQ_XTRA_YOPQ_YTAS_YTDE_YTFI_YTLC_YTUC_opsz_slnt_wdth_wght",
  // ... etc
]
```

**Purpose**: Master list of axis combinations. Axis names like `wght` (weight), `slnt` (slant) are standard. Custom axes like `ARRR`, `BLED`, `GRAD` are font-specific.

### 3. `var_blocks.js`
Maps axis combinations to Unicode blocks they support.

```javascript
var_blocks['ARRR_wght'] = [
  "Basic Latin",
  "Latin Extended-A",
  "Latin Extended-B"
];
```

**Purpose**: Defines which Unicode blocks are available for each axis combination.

### 4. `var_blocks_list.js`
Simple array of all Unicode block names.

```javascript
var_blocks_list = [
  "Arabic",
  "Basic Latin",
  "Georgian",
  // ... etc
]
```

**Purpose**: Master list of Unicode blocks that have variable font coverage.

### 5. `var_block_skeleton.js` (var_block_lang)
Maps `"Block-AxisCombo"` to normalized identifiers.

```javascript
var_block_lang['Basic Latin-ARRR_wght'] = ['basic-latin-ARRR_wght'];
var_block_lang['Cyrillic-CRSV_SHRP_slnt_wght'] = ['cyrillic-CRSV_SHRP_slnt_wght'];
```

**Purpose**: Creates consistent lookup keys for the next file.

### 6. `var_lang_font.js`
Maps normalized identifiers to font names.

```javascript
var_lang_font['basic-latin-ARRR_wght'] = [
  "AR One Sans"
];

var_lang_font['cyrillic-CRSV_SHRP_slnt_wght'] = [
  "Martian Grotesk",
  "Onest"
];
```

**Purpose**: Final lookup that tells us which fonts can render a specific Unicode block with specific axes.

---

## The Selection Flow

When generating a glyph, here's the data flow:

```
1. Pick random Unicode block from var_blocks_list
   ↓
2. Get axis combos for that block from var_blocks
   ↓
3. Pick random axis combo
   ↓
4. Look up "block-axisCombo" in var_block_lang to get normalized key
   ↓
5. Look up normalized key in var_lang_font to get font options
   ↓
6. Pick random font from the options
   ↓
7. Get axis ranges from font_axis_ranges
   ↓
8. Pick random glyph from that Unicode block (from block_hex)
   ↓
9. Generate random initial values for each axis
   ↓
10. Render glyph with font-variation-settings CSS
```

**Additional data files** (from `js_glyph/2025_block_17/`):
- `block_hex_17.js`: Maps block names to arrays of Unicode hex codes
- `block_hex_desc_17.js`: Maps hex codes to descriptions

---

## Core Engine: autoFontVar.js

Location: `js_funct/autoFontVar.js`

### Key Functions

**`generateGlyph(block_hex, block_hex_desc, var_blocks_list, var_blocks, var_block_lang, var_lang_font, font_axis_ranges, testMode, options)`**

Main function that:
1. Selects Unicode block (random or from test mode)
2. Finds available axis combinations for that block
3. Looks up fonts that support block + axes
4. Excludes color fonts based on palette behavior
5. Picks random glyph from the block
6. Generates random initial axis values
7. Returns glyph data object

**Returns:**
```javascript
{
  glyphHex: "0041",           // Unicode hex code
  description: "Latin A",     // Glyph description
  fontFamily: "Roboto Flex",  // Selected font
  fontVariationSettings: '"wght" 400, "wdth" 100', // CSS settings
  axisValues: { wght: 400, wdth: 100 },  // Current axis values
  axisRanges: { wght: {min: 100, max: 900}, ... }, // Valid ranges
  needsDesaturation: false    // Whether to apply grayscale filter
}
```

**Color Font Handling:**
- Some fonts (Honk, Nabla, Sixtyfour Convergence) are color fonts
- Behavior varies by color palette:
  - `'black_lightgray'`: desaturate color fonts
  - `'white_primary'`: allow color fonts (full color)
  - `'silver_lightgray'`: exclude color fonts entirely
  - `'brown'`: desaturate
  - `'white_teal_red'`: exclude

---

## Animation System

### In auto16-var-font-grid.htm

The standalone version shows the full animation logic:

**Lines 174-186**: Initialize animation state for each glyph
```javascript
const animState = {
  glyphData,                      // Reference to glyph data
  elementId: `glyph${index}`,     // DOM element ID
  currentValues: {...},           // Current axis values
  targetValues: {...},            // Target axis values to morph to
  progress: Math.random(),        // Random start point (0-1)
  duration: 3000-7500ms,          // Random morph duration
  lastTime: Date.now()            // For delta time calculation
};
```

**Lines 144-150**: Easing and interpolation
- Uses `easeInOutCubic` for smooth acceleration/deceleration
- `lerp` function interpolates between current and target values

**Lines 214-253**: Animation loop (`animateGlyph`)
1. Calculate progress based on elapsed time
2. When progress >= 1:
   - Set new random target values
   - Reset progress to 0
   - Randomize next duration
3. Otherwise:
   - Apply easing function to progress
   - Interpolate each axis value
   - Update font-variation-settings CSS

**Line 256-259**: Main loop uses `requestAnimationFrame`

---

## Integration: insert23.js

Location: `insert_js_2025/insert23.js`

This file handles dynamic insertion into the main site ([g.us3.htm](../../g.us3.htm)).

### Multi-Variant System

**Lines 9-58**: Defines 4 display variants
1. **'full'**: Static fonts, all Unicode
2. **'no_punct'**: Static fonts, no punctuation
3. **'cf_cm'**: Static fonts, combining marks only
4. **'variable'**: Variable fonts (the one we care about!)

**Line 61-71**: Randomly picks a variant (or uses stored preference)

### Variable Font Mode (lines 345-386)

When `selectedVariant.type === 'variable'`:

1. **Line 347-357**: Calls `AutoFontVar.generateGlyph()` with all lookup data
2. **Line 365**: Gets random color from `ColorPalette`
3. **Lines 367-381**: Initializes animation state (same as standalone version)
4. **Line 384**: Applies desaturation filter if needed
5. **Line 386**: Outputs `<span>` with:
   - Font family (with fallbacks to Noto fonts)
   - Color from palette
   - `font-variation-settings` CSS
   - Glyph as HTML entity (`&#x${hex};`)
   - Title with hex code and description

### Animation (lines 429-475)

Same logic as standalone version:
- `animateGlyph()`: Updates one glyph's axis values
- `animate()`: Main loop via `requestAnimationFrame`
- Only runs when `selectedVariant.type === 'variable'`

### Keyboard Controls (lines 173-309)

- **1, 2, 3, 4**: Switch between variants
- **b, t, r, w, g**: Switch color palettes

---

## Dependencies

### Required Libraries

1. **contrast_tester.js**: Color contrast validation
2. **colorpalette.js**: Manages color schemes and palette application
3. **autoFontVar.js**: Core variable font glyph generation engine

### Required Data Files

1. **block_hex_17.js**: Unicode block → hex codes
2. **block_hex_desc_17.js**: Hex codes → descriptions
3. **var_axis.js**: All axis combinations
4. **var_block_skeleton.js**: Block-axis → normalized keys
5. **var_blocks.js**: Axis → blocks mapping
6. **var_blocks_list.js**: All block names
7. **font_axis_ranges.js**: Font → axis ranges
8. **var_lang_font.js**: Normalized key → fonts

All files set "wait" variables (e.g., `blockHexWait = true`) when loaded, which the init system checks before proceeding.

---

## How To Debug

### Common Issues

**Problem**: Glyph shows as "?" or error

**Check**:
1. Is the Unicode block in `var_blocks_list`?
2. Does `var_blocks` have axis combos for that block?
3. Does `var_lang_font` have fonts for the block-axis combo?
4. Is the font name in `font_axis_ranges`?
5. Are axis tags consistent across all files?

**Problem**: No animation

**Check**:
1. Is `selectedVariant.type === 'variable'`?
2. Are animation state objects being created?
3. Is `animate()` being called?
4. Check browser console for errors

**Problem**: Wrong font or missing glyphs

**Check**:
1. Font family name matches exactly in `var_lang_font` and `font_axis_ranges`
2. Fallback fonts are loaded (Noto Sans Georgian, Noto Sans Kannada, Noto Emoji)
3. Check browser's font loading (DevTools → Network → Filter: font)

### Testing Specific Blocks

In both `auto16-var-font-grid.htm` and `insert23.js`:

```javascript
const CONFIG = {
    testMode: true,
    testBlocks: ["Georgian"]  // Test specific block
};
```

This forces all glyphs to come from the specified block.

---

## How To Add New Fonts

1. **Add to `font_axis_ranges.js`**:
   ```javascript
   font_axis_ranges['New Font Name'] = {
     wght: { min: 100, max: 900 },
     wdth: { min: 75, max: 125 }
   };
   ```

2. **Determine axis combination**: e.g., `"wdth_wght"`

3. **Add to `var_axis.js`** (if new combo):
   ```javascript
   var_axes.push("wdth_wght");
   ```

4. **Update `var_blocks.js`** for the axis combo:
   ```javascript
   var_blocks['wdth_wght'] = [
     "Basic Latin",
     "Cyrillic"
   ];
   ```

5. **Update `var_block_skeleton.js`** for each block:
   ```javascript
   var_block_lang['Basic Latin-wdth_wght'] = ['basic-latin-wdth_wght'];
   ```

6. **Add font to `var_lang_font.js`**:
   ```javascript
   var_lang_font['basic-latin-wdth_wght'] = [
     "Existing Font",
     "New Font Name"  // Add here
   ];
   ```

7. **If color font**: Add to `colorFonts` array in `autoFontVar.js`

---

## Architecture Decisions

### Why Block-First Selection?

Earlier versions selected axis combinations first, which led to poor Unicode block diversity. The current approach:
1. Picks block first (ensures even distribution across Unicode)
2. Then finds axis combos available for that block
3. Results in better variety of scripts (Latin, Cyrillic, Georgian, etc.)

### Why Normalized Keys?

The `var_block_skeleton.js` → `var_lang_font.js` chain uses normalized keys like `"basic-latin-ARRR_wght"` because:
- Consistent formatting (lowercase, hyphens)
- Easier to generate programmatically
- Avoids issues with special characters in object keys

### Why Multiple Durations?

Each glyph has its own random duration (3-7.5 seconds) so they don't morph in sync, creating a more organic, flowing appearance.

### Why Desaturation for Color Fonts?

Some palettes (like 'brown' or 'black_lightgray') have muted color schemes. Color fonts (Honk, Nabla) would clash, so they're either excluded or desaturated using CSS filters.

---

## File Locations Summary

```
/Users/mcryer/Documents/www.glyphmatic.us/
├── 2025_exp/
│   └── auto16-var-font-grid.htm          # Standalone demo
├── g.us3.htm                              # Main site (uses insert23)
├── insert_js_2025/
│   └── insert23.js                        # Dynamic insertion script
├── js_funct/
│   ├── autoFontVar.js                     # Core engine
│   ├── colorpalette.js                    # Color palette system
│   └── contrast_tester.js                 # Color contrast validation
└── js_glyph/
    ├── 2025_block_17/
    │   ├── block_hex_17.js                # Block → hex codes
    │   └── block_hex_desc_17.js           # Hex → descriptions
    └── 2025_var_blocks/
        ├── var_axis.js                    # All axis combos
        ├── var_block_skeleton.js          # Block-axis → normalized keys
        ├── var_blocks.js                  # Axis → blocks mapping
        ├── var_blocks_list.js             # All block names
        ├── font_axis_ranges.js            # Font → axis ranges
        └── var_lang_font.js               # Normalized key → fonts
```

---

## Quick Reference: Data Flow Diagram

```
User loads page
       ↓
[insert23.js or auto16-var-font-grid.htm]
       ↓
Load dependencies (autoFontVar.js + all data files)
       ↓
Wait for all "wait" variables to be true
       ↓
init() → AutoFontVar.init()
       ↓
ColorPalette.selectRandomPalette()
       ↓
Generate 100 glyphs (5 rows × 20 glyphs):
       ↓
   For each glyph:
       ↓
   AutoFontVar.generateGlyph()
       ├── Pick block (var_blocks_list)
       ├── Get axes for block (var_blocks)
       ├── Get fonts for block+axes (var_block_lang → var_lang_font)
       ├── Check color font exclusion
       ├── Pick random glyph (block_hex)
       ├── Get axis ranges (font_axis_ranges)
       ├── Generate random axis values
       └── Return glyph data
       ↓
   Create animation state
       ├── Current values
       ├── Target values
       ├── Random duration & progress
       └── Store in glyphAnimations[]
       ↓
   Render <span> with font-variation-settings
       ↓
       ↓
Start animation loop (requestAnimationFrame)
       ↓
   For each frame:
       └── For each glyphAnimations[]:
           ├── Update progress
           ├── Lerp current → target
           ├── If progress >= 1, set new targets
           └── Apply font-variation-settings to DOM
```

---

## Notes for Claude

- **Data files are LONG**: Each has hundreds of entries. Don't read them fully unless debugging specific fonts/blocks.
- **Axis naming**: Standard axes are 4 lowercase letters (`wght`, `slnt`, `wdth`, `opsz`). Custom axes are 4 uppercase (`ARRR`, `BLED`, `GRAD`).
- **Font names must match exactly**: Between `font_axis_ranges` and `var_lang_font`
- **Test mode is your friend**: Use `CONFIG.testMode = true` with specific blocks to isolate issues
- **Animation performance**: 100 glyphs × multiple axes × 60fps can be intensive. Monitor performance if adding more glyphs or axes.
- **Color fonts need special handling**: Always check `paletteColorFontBehavior` when adding new palettes

---

**Last Updated**: 2026-01-25
**Main Contact**: glyphmatic.us
