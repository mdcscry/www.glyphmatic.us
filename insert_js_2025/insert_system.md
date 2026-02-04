# Insert System Guide

Comprehensive guide for creating modular JavaScript visualizations for glyphmatic.us.

## Quick Reference

**Files:**
- `insert_js_2025/insertXX.js` - Your visualization
- `js_funct/insert_config.js` - Controls & description
- `g.us3.htm` - Main host (add to insertArray)

**URL:** `http://localhost/g.us3.htm?i=XX`

**Current inserts:** 13-27 (15 total)

---

## Basic Insert Template

```javascript
// insertXX.js - Brief description
console.log('insertXX.js loaded');

// ===== CONFIGURATION =====
const CONFIG = {
    // Your settings
};

// ===== DEPENDENCY LOADING =====
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

async function loadDependencies() {
    await loadScript('../js_funct/yourlib.js');
}

// ===== REQUIRED STUB =====
function changeHtmlDisplayInline() {
    // Required by g.us3.htm - leave empty if not needed
}

// ===== STYLES =====
function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
        body { margin: 0 !important; overflow: hidden !important; }
    `;
    document.head.appendChild(style);
}

// ===== DOM & LOGIC =====
function createDOM() { /* Build HTML */ }
function initVisualization() { /* Your logic */ }

// ===== KEYBOARD =====
document.addEventListener('keydown', (e) => {
    if (e.key === '1') { /* Mode 1 */ }
});

// ===== INIT =====
async function init() {
    await loadDependencies();
    injectStyles();
    createDOM();
    initVisualization();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
```

---

## Critical: Preserving Watermarks

**IMPORTANT:** g.us3.htm adds watermarks to `document.body` before your insert loads. You MUST preserve them.

**❌ WRONG - Destroys watermarks:**
```javascript
function createDOM() {
    document.body.innerHTML = '<div>...</div>';  // Wipes everything!
}
```

**✅ CORRECT - Preserves watermarks:**
```javascript
function createDOM() {
    const container = document.createElement('div');
    container.className = 'text-container';
    container.innerHTML = '<span>...</span>';
    document.body.appendChild(container);  // Appends without destroying
}
```

**Pattern from insert27:**
```javascript
function createDOM() {
    // Create elements without wiping body (preserve watermarks)
    const textContainer = document.createElement('div');
    textContainer.className = 'text-container';

    const textSpan = document.createElement('span');
    textSpan.className = 'glyph-text';
    textSpan.id = 'text';

    textContainer.appendChild(textSpan);

    // Append to body (preserves existing elements like watermarks)
    document.body.appendChild(textContainer);
}
```

---

## Core Patterns (From Actual Inserts)

### Pattern 1: Multi-Flavor System (insert16, 17, 19, 25)

**When to use:** Multiple similar variants that share most code

**Example from insert17 (4 flavors):**
```javascript
let intervalIds = [];

function startVisualization(flavor) {
    // Cleanup previous
    intervalIds.forEach(clearInterval);
    intervalIds = [];
    document.getElementById('wrapper')?.remove();
    document.getElementById('style')?.remove();

    const flavorConfig = {
        glyphArray: ['myarray', 'allMoireSymbols', 'circleSquare', 'circles'][flavor],
        shadowMode: (flavor === 3) ? 'vertical' : 'all',
        hasBorders: (flavor === 0 || flavor === 1)
    };

    // Create visualization with config
    // ... implementation
}

// URL parameter support
function getFlavorFromURL() {
    const params = new URLSearchParams(window.location.search);
    const flavor = params.get('flavor');
    if (flavor !== null) {
        const index = parseInt(flavor);
        if (!isNaN(index) && index >= 0 && index < 4) {
            return index;
        }
    }
    return null;
}

// Start with URL param or random
const urlFlavor = getFlavorFromURL();
const initialFlavor = urlFlavor !== null ? urlFlavor : Math.floor(Math.random() * 4);
startVisualization(initialFlavor);

// Keyboard switching
window.addEventListener('keydown', (e) => {
    if (['0', '1', '2', '3'].includes(e.key)) {
        startVisualization(parseInt(e.key, 10));
    }
});
```

**URL format:** `http://localhost/g.us3.htm?i=17&flavor=2`

**Used in:**
- insert16: Emoji Grid (3 flavors: 10x10 vibrant, 5x5 light, 10x10 font-switching)
- insert17: DeGenerator 9 (4 flavors: different glyph arrays & shadow modes)
- insert19: DaGenerator (4 flavors: size/speed/background combinations)

### Pattern 2: Variant System with SessionStorage (insert23)

**When to use:** Complex variants requiring different dependencies

**Example:**
```javascript
const DATA_VARIANTS = [
    {
        name: 'Full Static',
        type: 'static',
        hex: '../js_glyph/2025_block_17/block_hex_17.js',
        desc: '../js_glyph/2025_block_17/block_hex_desc_17.js',
        skeleton: '../js_glyph/2025_block_17/block_lang_skeleton_17.js'
    },
    {
        name: 'Variable Font',
        type: 'variable',
        hex: '../js_glyph/2025_block_17/block_hex_17.js',
        desc: '../js_glyph/2025_block_17/block_hex_desc_17.js',
        varFiles: {
            axis: '../js_glyph/2025_var_blocks/var_axis.js',
            skeleton: '../js_glyph/2025_var_blocks/var_block_skeleton.js',
            // ... more files
        }
    }
];

// Load from sessionStorage or random
const storedIndex = sessionStorage.getItem('insert23_selectedVariantIndex');
let selectedVariant;
if (storedIndex !== null) {
    selectedVariant = DATA_VARIANTS[storedIndex];
    sessionStorage.removeItem('insert23_selectedVariantIndex');
} else {
    selectedVariant = DATA_VARIANTS[Math.floor(Math.random() * DATA_VARIANTS.length)];
}

// Load only needed files
async function loadDependencies() {
    await loadScript(selectedVariant.hex);
    await loadScript(selectedVariant.desc);

    if (selectedVariant.type === 'variable') {
        await loadScript(selectedVariant.varFiles.axis);
        // ... more variable font files
    } else {
        await loadScript(selectedVariant.skeleton);
    }
}

// Switch with keyboard
function switchVariant(variantIndex) {
    sessionStorage.setItem('insert23_selectedVariantIndex', variantIndex);
    location.reload();
}

document.addEventListener('keydown', (e) => {
    if (e.key === '1') switchVariant(0);
    if (e.key === '2') switchVariant(1);
});
```

### Pattern 3: Animation Presets (insert26)

**When to use:** Different animation behaviors/speeds

**Example:**
```javascript
const PRESETS = [
    {
        name: "Static Drawing",
        curveCycle: false,
        curveBreathing: false,
        glyphFadeIn: { min: 2000, max: 10000 },
        drawSpeed: { min: 5000, max: 20000 }
    },
    {
        name: "Continuous Cycle",
        curveCycle: true,
        cyclePhases: { draw: 0.35, pause1: 0.15, undraw: 0.35, pause2: 0.15 },
        curveBreathing: true,
        glyphFadeIn: { min: 3000, max: 15000 },
        drawSpeed: { min: 8000, max: 35000 }
    },
    // ... 7 more presets
];

let selectedPresetIndex = null; // null = random

function getActivePreset() {
    if (selectedPresetIndex !== null) {
        return PRESETS[selectedPresetIndex];
    }
    return PRESETS[Math.floor(Math.random() * PRESETS.length)];
}

document.addEventListener('keydown', (e) => {
    if (e.key >= '1' && e.key <= '9') {
        selectedPresetIndex = parseInt(e.key) - 1;
        regenerate();
    } else if (e.key === '0') {
        selectedPresetIndex = null; // Random mode
        regenerate();
    }
});
```

### Pattern 4: Pure CSS Animation (insert18)

**When to use:** No dependencies needed, pure visual effects

**Example:**
```javascript
const embeddedCss = `
    body {
        background: radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0f 100%);
    }
    @keyframes orbit {
        from { transform: translate(-50%, -50%) rotate(0deg); }
        to { transform: translate(-50%, -50%) rotate(360deg); }
    }
    .orbit-container {
        animation: orbit 25s linear infinite;
    }
`;

function injectStyle(css) {
    const s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);
}

function init() {
    injectStyle(embeddedCss);
    // Create DOM with plain JavaScript
    // No external libraries needed
}

init();
```

### Pattern 5: Wait Variables (insert16, 21, 22)

**When to use:** Data files set "wait" signals when loaded

**Example:**
```javascript
// Data files set these globals when ready:
// blockHexWait = true
// var_axesWait = true
// emojiSequenceArraySignal = true

function jsWait() {
    const ready = typeof blockHexWait !== "undefined" &&
                  typeof var_axesWait !== "undefined";

    if (!ready) {
        setTimeout(jsWait, 100);
    } else {
        init();
    }
}

jsWait();
```

### Pattern 6: ColorPalette Integration (insert23)

**When to use:** Need curated color schemes with Box-Muller distribution

**Example:**
```javascript
await loadScript('../js_funct/colorpalette.js');

// Define palettes
const PALETTES = {
    'black_lightgray': {
        name: 'Black & Light Gray',
        bodyBg: '#000000',
        bodyColor: 'darkgray',
        glyphColors: ['white', 'white', 'white', 'white'],
        tableBorder: '#110c11',
        useBoxMuller: false
    },
    'brown': {
        name: 'Brown Earth',
        bodyBg: '#86796C',
        bodyColor: '#2a2520',
        glyphColors: ['linen', 'ivory', 'beige', 'blanchedalmond'],
        useBoxMuller: true  // Natural distribution
    }
};

// Select random palette
ColorPalette.currentPaletteKey = 'brown';
ColorPalette.currentPalette = PALETTES['brown'];

// Apply
ColorPalette.applyFixedPalette(document.body, table, footer1, footer2, borderRow);

// Get colors
const color = ColorPalette.randomPaletteGlyphColor();

// Switch with keyboard
document.addEventListener('keydown', (e) => {
    if (e.key === 'b') switchPalette('black_lightgray');
    if (e.key === 't') switchPalette('brown');
});
```

### Pattern 7: OKLCH Palette Generation (insert19)

**When to use:** Dynamic harmonious color schemes

**Example:**
```javascript
let palette = [];

function generateHarmoniousPalette() {
    const newPalette = [];
    const harmonyTypes = ["analogous", "triadic", "complementary"];
    const harmony = harmonyTypes[Math.floor(Math.random() * harmonyTypes.length)];
    const baseHue = Math.random() * 360;

    let hues = [baseHue];
    if (harmony === "analogous") {
        hues.push((baseHue + 30) % 360);
        hues.push((baseHue - 30 + 360) % 360);
    } else if (harmony === "triadic") {
        hues.push((baseHue + 120) % 360);
        hues.push((baseHue + 240) % 360);
    } else { // complementary
        hues.push((baseHue + 180) % 360);
        hues.push((baseHue + Math.random() * 60 - 30 + 360) % 360);
    }

    const baseChroma = Math.random() * 0.08 + 0.12;
    const baseLightness = Math.random() * 20 + 45;

    for (let i = 0; i < 3; i++) {
        const l = baseLightness + (Math.random() * 20 - 10);
        const c = baseChroma + (Math.random() * 0.04 - 0.02);
        newPalette.push(`oklch(${l.toFixed(1)}% ${c.toFixed(3)} ${hues[i].toFixed(1)})`);
    }

    palette = newPalette;
}

function getRandomColor() {
    return palette[Math.floor(Math.random() * palette.length)];
}
```

### Pattern 8: SVG Masking System (insert22)

**When to use:** Complex masking effects with SVG

**Example:**
```javascript
// Create clip path
const clipId = 'mask_' + maskCounter++;
const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
const clipPath = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
clipPath.setAttribute('id', clipId);

const maskText = document.createElementNS("http://www.w3.org/2000/svg", "text");
maskText.setAttribute('x', '50%');
maskText.setAttribute('y', '58%');
maskText.setAttribute('text-anchor', 'middle');
maskText.setAttribute('font-size', '45vw');
maskText.innerHTML = maskGlyph;

clipPath.appendChild(maskText);
defs.appendChild(clipPath);
svgContainer.appendChild(defs);

// Apply clip to elements
backgroundGroup.setAttribute('clip-path', `url(#${clipId})`);
```

### Pattern 9: AutoFont Integration (insert23, 27)

**When to use:** Need automatic font selection for Unicode blocks

**Example:**
```javascript
await loadScript('../js_funct/autoFont.js');
await loadScript('../js_glyph/2025_block_17/block_hex_17.js');
await loadScript('../js_glyph/2025_block_17/block_hex_desc_17.js');
await loadScript('../js_glyph/2025_block_17/block_lang_skeleton_17.js');

// Wait for signals
function jsWait() {
    if (typeof blockHexWait === "undefined" ||
        typeof AutoFont === "undefined") {
        setTimeout(jsWait, 100);
    } else {
        init();
    }
}

// Generate glyph
const glyphData = AutoFont.generateGlyph(
    block_hex,
    block_hex_desc,
    block_lang,
    lang_font,
    false,  // testMode
    null,   // testOptions
    null    // exclusions
);

// Use glyph
const char = String.fromCodePoint(parseInt(glyphData.glyph, 16));
```

### Pattern 10: CSS Clip-Path Shapes (insert27)

**When to use:** Text wrapping around custom shapes

**Example:**
```javascript
const shapes = [
    { class: 'circle', fill: 180 },
    { class: 'diamond', fill: 160 },
    { class: 'star', fill: 200 }
];

const css = `
    .ghost.circle {
        width: 140px;
        height: 140px;
        shape-outside: circle(50%);
        clip-path: circle(50%);
    }
    .ghost.diamond {
        width: 120px;
        height: 160px;
        shape-outside: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
        clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    }
    .ghost-fill {
        color: #cc0000;
        word-break: break-all;
    }
`;

// Use
html += `<span class="ghost left circle"><span class="ghost-fill">${text}</span></span>`;
```

### Pattern 11: Contrast Checking (insert21)

**When to use:** Ensure readable text colors

**Example:**
```javascript
await loadScript('../js_funct/contrast_tester.js');

function selectContrastingColor(colorArray, backgroundColor, minContrast) {
    minContrast = minContrast || 2.0;
    let bestColor = null;
    let bestContrast = 0;

    for (let attempt = 0; attempt < 20; attempt++) {
        const testColor = colorArray[Math.floor(Math.random() * colorArray.length)];
        const contrast = getContrastRatio(testColor, backgroundColor);

        if (contrast >= minContrast) {
            return testColor;
        }

        if (contrast > bestContrast) {
            bestContrast = contrast;
            bestColor = testColor;
        }
    }

    return bestColor || colorArray[0];
}

// Use
container.style.backgroundColor = bgColor;
container.style.color = selectContrastingColor(mycolors, bgColor, 2.0);
```

### Pattern 12: Legacy Global Variables (insert21, 24)

**When to use:** Older inserts that integrate with g.us3.htm globals

**Example:**
```javascript
// Use globals from g.us3.htm
var container = [];  // For nav_menu.js resize/move
var divCounter = 4;  // Number of containers
var mycolors = [];   // Inherits from g.us3.htm

// Access global color palette
document.body.style.backgroundColor =
    mycolors[Math.round((mycolors.length - 1) * Math.random())];

// Manual refresh function for △HTML button
function changeHtmlDisplayInline() {
    regenerateContent();
}

// Style refresh for △STYLE button
function initStyle() {
    regenerateColors();
}
```

### Pattern 13: Info Panel (insert26)

**When to use:** Display current mode/settings

**Example:**
```javascript
function createInfoPanel() {
    const panel = document.createElement('div');
    panel.id = 'info-panel';
    panel.innerHTML = `
        <span class="circle-icon">i</span>
        <div class="info-content">
            <div class="info-row">
                <div class="info-label">Preset</div>
                <div class="info-value" id="current-preset">-</div>
            </div>
            <div class="info-row">
                <div class="info-label">Background</div>
                <div class="info-value" id="bg-toggle">Static</div>
            </div>
        </div>
    `;

    panel.addEventListener('click', () => {
        panel.classList.toggle('expanded');
    });

    document.body.appendChild(panel);
}

// CSS
const css = `
    #info-panel {
        position: fixed;
        bottom: 20px;
        right: 20px;
        border-radius: 50%;
        width: 30px;
        height: 30px;
    }
    #info-panel.expanded {
        border-radius: 12px;
        width: 280px;
        height: auto;
    }
`;
```

---

## Common Data Files

### Unicode Block Data
```javascript
// js_glyph/2025_block_17/block_hex_17.js
block_hex['Basic Latin'] = ['0020', '0021', ...];
blockHexWait = true;  // Signal loaded

// js_glyph/2025_block_17/block_hex_desc_17.js
block_hex_desc['0041'] = 'LATIN CAPITAL LETTER A';
blockHexDescWait = true;

// js_glyph/2025_block_17/block_lang_skeleton_17.js
block_lang['Basic Latin'] = ['latin'];
blockHexSkeletonWait = true;
```

### Variable Font Data
```javascript
// js_glyph/2025_var_blocks/var_axis.js
var_axes = ['wght', 'wght_wdth', ...];
var_axesWait = true;

// js_glyph/2025_var_blocks/font_axis_ranges.js
font_axis_ranges['Roboto Flex'] = {
    wght: { min: 100, max: 1000 }
};
font_axis_rangesWait = true;
```

### Helper Libraries
```javascript
// js_funct/autoFont.js - Static font selection
AutoFont.generateGlyph(block_hex, block_hex_desc, block_lang, lang_font);

// js_funct/autoFontVar.js - Variable font with animation
AutoFontVar.generateGlyph(...);

// js_funct/colorpalette.js - Color management
ColorPalette.selectRandomPalette();
ColorPalette.applyFixedPalette(...);
ColorPalette.randomPaletteGlyphColor();

// js_funct/contrast_tester.js - WCAG compliance
getContrastRatio('#000000', '#FFFFFF'); // Returns 21
```

---

## URL Parameters

Multi-flavor/multi-recipe inserts should support URL parameters for direct linking to specific modes.

**Common parameter names:**
- `flavor` - For multi-flavor systems (insert16, 17, 19)
- `recipe` - For recipe systems (insert27)
- `preset` - For preset systems (insert26)
- `variant` - For variant systems (insert23)

**Implementation pattern:**
```javascript
function getParamFromURL() {
    const params = new URLSearchParams(window.location.search);
    const param = params.get('recipe');  // or 'flavor', 'preset', etc.
    if (param !== null) {
        const index = parseInt(param);
        if (!isNaN(index) && index >= 0 && index < RECIPES.length) {
            return index;
        }
    }
    return null;
}

// In init():
const urlParam = getParamFromURL();
const selectedIndex = urlParam !== null ? urlParam : Math.floor(Math.random() * RECIPES.length);
renderRecipe(selectedIndex);
```

**URL examples:**
- `http://localhost/g.us3.htm?i=27&recipe=3` - Ghost Shapes, recipe 3
- `http://localhost/g.us3.htm?i=17&flavor=2` - DeGenerator 9, flavor 2
- `http://localhost/g.us3.htm?i=26&preset=5` - Bezier Curves, preset 5

---

## Keyboard Convention Guide

### Standard Keys (Use These)

**Numbers 0-9:** Mode/Variant/Preset selection
- `0` - Random mode (recommended pattern)
- `1-9` - Specific modes/variants/presets

**Letters:** Color palettes (consistent across inserts)
- `b` - Black/dark palette
- `w` - White/light palette
- `g` - Gray/silver palette
- `r` - Red/teal/accent palette
- `t` - Brown/earth tones palette

**Other:**
- `Space` - Pause/play (if animation)
- `Enter` - Regenerate (if applicable)

### Insert-Specific Examples

**insert16** (Emoji Grid - flavor 2):
- `1-9, 0` - Font selection (Apple, Noto, OpenMoji, etc.)
- `r` - Random fonts (no exclusions)
- `e` - Random fonts (with exclusions)
- `t, b, f, l, c` - Specific fonts

**insert17, 19** (Multi-flavor):
- `0-3` - Switch between 4 flavors

**insert23** (Macroglyph):
- `1-4` - Switch variants
- `b/w/g/r/t` - Switch palettes

**insert26** (Bezier Curves):
- `0-9` - Animation presets

---

## Configuration (insert_config.js)

```javascript
28: {
    controls: {
        style: false,      // △STYLE button - requires initStyle()
        html: false,       // △HTML button - requires changeHtmlDisplayInline()
        resize: false,     // ± SIZE buttons
        moveUpDown: false  // ⊼/⊻ MOVE buttons
    },
    watermarks: {
        count: 1,              // Number of "glyphmatic" watermarks
        zIndex: 10,            // 10=above content, -1=below
        positioning: 'top-left' // 'top-left', 'scattered', 'hidden'
    },
    description: 'Your visualization description. Use <br><br> for paragraphs. ' +
                 'Explain keyboard controls and features. Shows in sidebar.'
}
```

### Watermark Positioning

- **'top-left'** (most common): Single watermark, small padding
- **'scattered'**: Multiple watermarks randomly placed
- **'hidden'** (count: 0): No watermarks

### Z-Index Strategy

- **10 (above)**: For centered/contained layouts
- **-1 (below)**: For full-screen/dense content

---

## Update g.us3.htm

```javascript
// Add to insertArray (around line 50)
insertArray[28] = ['none', 'Your Visualization Name'];
//                  ^^^^   Display name in nav
//                  'none' if self-contained
//                  'datafile.js' if needs external data

// Examples:
insertArray[23] = ['none', 'Macroglyph'];
insertArray[16] = ['emoji_versions_data2.js', 'Emoji Grid'];
```

---

## Insert Catalog

| # | Name | Pattern | Key Features |
|---|------|---------|--------------|
| 13 | Braided Marquee | Legacy | Global vars, control buttons |
| 14 | Various | Legacy | Older patterns |
| 15 | DeGenerator 8 | Callback loading | Two-block layout, layers |
| 16 | Emoji Grid | Multi-flavor (3) | Font switching, exclusions |
| 17 | DeGenerator 9 | Multi-flavor (4) | Shadow modes, glyph arrays |
| 18 | Astronomical | Pure CSS | No deps, orbital animations |
| 19 | DaGenerator | Multi-flavor (4) | Box-drawing, OKLCH palette |
| 20 | Spinning Spirals | OKLCH manual | Grid layouts, contrast |
| 21 | Whirled Om | Wait variables | Contrast checking, quad layout |
| 22 | Om Mask Dissolve | SVG masking | Color schemes, clip-path |
| 23 | Macroglyph | Variant system | SessionStorage, ColorPalette |
| 24 | DeGenerator 1 | Legacy | Symbols2 font, nested containers |
| 25 | Rectangle Tiling | Random config | Cleanup, multi-flavor |
| 26 | Bezier Curves | Presets | SVG animation, info panel |
| 27 | Ghost Shapes | Clip-path | AutoFont, 25 shapes |

---

## Quick Reference: Pattern Selection

**Need multiple similar modes?** → Multi-flavor (insert17, 19)
**Need complex variant switching?** → SessionStorage variant (insert23)
**Need animation options?** → Preset system (insert26)
**Need no dependencies?** → Pure CSS (insert18)
**Need color schemes?** → ColorPalette (insert23) or OKLCH (insert19)
**Need font selection?** → AutoFont (insert27) or AutoFontVar (insert23)
**Need masking?** → SVG clip-path (insert22, 27)
**Need text wrapping?** → CSS shapes (insert27)
**Need contrast?** → contrast_tester.js (insert21)

---

## Troubleshooting

**Insert doesn't load:**
- Check URL: `?i=28`
- Verify insertArray in g.us3.htm
- Check browser console for errors

**Dependencies fail:**
- Use relative paths: `../js_funct/`
- Check network tab for 404s
- Verify wait signals set

**Styles don't apply:**
- Add `!important` to critical styles
- Inject before DOM creation
- Check for g.us3.htm conflicts

**Keyboard not working:**
- Ensure listener after DOM loads
- Check other listeners blocking
- Click page for focus

**Multi-flavor switching fails:**
- Clear intervals before switching
- Remove old DOM elements
- Remove old style tags

**Watermarks not visible:**
- **Never** use `document.body.innerHTML = ...` (destroys watermarks)
- Use `document.body.appendChild()` instead
- See "Critical: Preserving Watermarks" section above

---

## Checklist

Creating new insert:
- [ ] Find next insert number
- [ ] Create `insert_js_2025/insertXX.js`
- [ ] Add `changeHtmlDisplayInline()` stub
- [ ] **Use `appendChild()` not `innerHTML =` for DOM creation**
- [ ] Implement pattern (multi-flavor, variant, preset, etc.)
- [ ] **Add URL parameter support** (flavor/recipe/preset/variant)
- [ ] Add keyboard controls (0-9, b/w/g/r/t)
- [ ] Update `insertArray` in g.us3.htm
- [ ] Add config to insert_config.js
- [ ] Test: direct load, dependencies, keyboard, sidebar
- [ ] **Test URL parameter** (?i=XX&recipe=N)
- [ ] **Verify watermark appears correctly**
- [ ] Verify no console errors

---

*System by mcryer • Last updated: 2026-01-26*
*Based on comprehensive review of all 15 inserts (13-27)*
