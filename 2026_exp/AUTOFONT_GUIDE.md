# AutoFont System Guide

Comprehensive guide for using the AutoFont and AutoFontVar font management systems for Unicode glyph rendering on glyphmatic.us.

## Quick Reference

**Core Libraries:**
- `js_funct/autoFont.js` - Static font selection
- `js_funct/autoFontVar.js` - Variable font with animation
- `js_funct/colorpalette.js` - Color management (optional)
- `js_funct/contrast_tester.js` - WCAG contrast checking (optional)

**Data Files:**
- `js_glyph/2025_block_17/block_hex_17.js` - Unicode blocks → glyph arrays
- `js_glyph/2025_block_17/block_hex_desc_17.js` - Glyph descriptions
- `js_glyph/2025_block_17/block_lang_skeleton_17.js` - Block → font mappings

**Simple Example:** `2026_exp/autofont_simple_example.htm`

**Production Example:** `insert_js_2025/insert23.js`

---

## What Is AutoFont?

AutoFont is a modular Unicode font management system that:
- Automatically selects appropriate fonts for Unicode glyphs
- Handles dynamic font loading (Google Fonts and local fonts)
- Provides intelligent fallback chains
- Supports both static and variable font workflows
- Manages font-face rules and imports via dynamic stylesheets

### Why Use AutoFont?

**Without AutoFont:**
```javascript
// Manual approach - error-prone and repetitive
const glyph = '1F600'; // Unicode for 😀
const char = String.fromCodePoint(parseInt(glyph, 16));
// What font should I use? Noto Emoji? Apple Color Emoji? Segoe UI Emoji?
// Do I need to load it from Google Fonts or locally?
// What's the fallback chain?
```

**With AutoFont:**
```javascript
// AutoFont handles everything
const glyphData = AutoFont.generateGlyph(block_hex, block_hex_desc, block_lang, lang_font);
// Returns: { glyph, desc, block, fontStack }
// Font is loaded, fallbacks set, ready to use
```

---

## Core Concepts

### 1. Unicode Blocks
Unicode organizes characters into **blocks** (e.g., "Basic Latin", "Arabic", "Emoticons").

```javascript
// block_hex maps block names to arrays of hex codes
block_hex['Emoticons'] = ['1F600', '1F601', '1F602', ...];
block_hex['Arabic'] = ['0600', '0601', '0602', ...];
```

### 2. Language Keys
Blocks are mapped to **language/font system keys** that represent the appropriate font family.

```javascript
// block_lang maps blocks to font system keys
block_lang['Emoticons'] = ['emoji-bw'];
block_lang['Arabic'] = ['arabic'];
block_lang['Basic Latin'] = ['latin'];
```

### 3. Font Lookup
Language keys map to **specific fonts** with loading instructions.

```javascript
// lang_font maps keys to font names with loading hints
lang_font['emoji-bw'] = ['Noto Emoji-google', 'Symbola-local'];
lang_font['arabic'] = ['Noto Naskh Arabic-google', 'Scheherazade New-google'];
lang_font['latin'] = ['Noto Sans-local', 'Roboto-google'];
```

**Font Name Format:** `FontName-source-directory`
- `source`: `google` (Google Fonts) or `local` (local file)
- `directory` (optional): `tff`, `otf`, `fonts` (for local fonts)
- Examples:
  - `Noto Sans-local` → loads from `/tff/NotoSans-Regular.ttf`
  - `Roboto-google` → loads from Google Fonts
  - `Custom Font-local-fonts` → loads from `/fonts/CustomFont.ttf`

### 4. Font Stack
AutoFont builds intelligent **fallback chains** for each font.

```javascript
// For symbol fonts: comprehensive fallbacks
'Noto Sans Symbols', 'Noto Emoji', 'Symbola', 'Noto Sans Symbols 2', sans-serif

// For text fonts: simple fallbacks
'Noto Sans', 'Noto Sans Full', sans-serif
```

---

## AutoFont vs AutoFontVar

| Feature | AutoFont | AutoFontVar |
|---------|----------|-------------|
| **Font Type** | Static fonts | Variable fonts |
| **Animation** | No | Yes (font-variation-settings) |
| **Complexity** | Simpler | More complex |
| **Data Files** | 3 files | 6+ files |
| **Use Case** | Standard displays | Animated morphing |
| **Example** | insert23 variants 1-3 | insert23 variant 4 |

---

## Basic Usage: AutoFont (Static)

### Step 1: Load Dependencies

```html
<!-- Core library -->
<script src="../js_funct/autoFont.js"></script>

<!-- Data files -->
<script src="../js_glyph/2025_block_17/block_hex_17.js"></script>
<script src="../js_glyph/2025_block_17/block_hex_desc_17.js"></script>
<script src="../js_glyph/2025_block_17/block_lang_skeleton_17.js"></script>

<!-- Optional utilities -->
<script src="../js_funct/colorpalette.js"></script>
<script src="../js_funct/contrast_tester.js"></script>
```

### Step 2: Wait for Dependencies

```javascript
function jsWait() {
    const ready = typeof blockHexWait !== "undefined" &&
                  typeof blockHexDescWait !== "undefined" &&
                  typeof blockHexSkeletonWait !== "undefined" &&
                  typeof AutoFont !== "undefined";

    if (!ready) {
        setTimeout(jsWait, 100);
    } else {
        init();
    }
}

jsWait();
```

**Why?** Data files set global "wait" signals when loaded:
```javascript
// At end of block_hex_17.js
blockHexWait = true;

// At end of block_hex_desc_17.js
blockHexDescWait = true;

// At end of block_lang_skeleton_17.js
blockHexSkeletonWait = true;
```

### Step 3: Initialize

```javascript
async function init() {
    // Initialize AutoFont (creates style sheets)
    await AutoFont.init();

    // Optional: Initialize ColorPalette for dynamic colors
    if (typeof ColorPalette !== 'undefined') {
        ColorPalette.init();
    }

    // Generate glyphs
    generateGlyphs();
}
```

### Step 4: Generate Glyphs

```javascript
function generateGlyphs() {
    // Generate random glyph with automatic font selection
    const glyphData = AutoFont.generateGlyph(
        block_hex,          // Block → glyph arrays
        block_hex_desc,     // Glyph → descriptions
        block_lang,         // Block → language keys
        lang_font,          // Language key → fonts
        false,              // testMode (false = random)
        {},                 // testConfig (unused when testMode=false)
        null                // exclusions (optional)
    );

    // Returns:
    // {
    //   glyph: '1F600',           // Hex code
    //   desc: 'GRINNING_FACE',    // Description (spaces → underscores)
    //   block: 'Emoticons',       // Unicode block name
    //   fontStack: "'Noto Emoji', 'Symbola', sans-serif"  // CSS font-family
    // }

    // Render
    const char = String.fromCodePoint(parseInt(glyphData.glyph, 16));
    const html = `<span style="font-family: ${glyphData.fontStack};">${char}</span>`;
    document.body.innerHTML += html;
}
```

---

## Advanced: AutoFontVar (Variable Fonts)

### Additional Data Files

```html
<script src="../js_glyph/2025_var_blocks/var_axis.js"></script>
<script src="../js_glyph/2025_var_blocks/var_block_skeleton.js"></script>
<script src="../js_glyph/2025_var_blocks/var_blocks.js"></script>
<script src="../js_glyph/2025_var_blocks/var_blocks_list.js"></script>
<script src="../js_glyph/2025_var_blocks/font_axis_ranges.js"></script>
<script src="../js_glyph/2025_var_blocks/var_lang_font.js"></script>
```

### Wait for Variable Font Dependencies

```javascript
function jsWait() {
    const ready = typeof blockHexWait !== "undefined" &&
                  typeof blockHexDescWait !== "undefined" &&
                  typeof var_axesWait !== "undefined" &&
                  typeof var_blocksWait !== "undefined" &&
                  typeof var_blocks_listWait !== "undefined" &&
                  typeof var_block_langWait !== "undefined" &&
                  typeof var_lang_fontWait !== "undefined" &&
                  typeof font_axis_rangesWait !== "undefined" &&
                  typeof AutoFontVar !== "undefined";

    if (!ready) {
        setTimeout(jsWait, 100);
    } else {
        init();
    }
}
```

### Generate Variable Font Glyph

```javascript
const glyphData = AutoFontVar.generateGlyph(
    block_hex,              // Block → glyph arrays
    block_hex_desc,         // Glyph → descriptions
    var_blocks_list,        // List of blocks with variable fonts
    var_blocks,             // Axes → blocks mapping
    var_block_lang,         // Block → language keys
    var_lang_font,          // Language key → fonts
    font_axis_ranges,       // Font → axis ranges
    false,                  // testMode
    {}                      // testConfig
);

// Returns additional fields:
// {
//   glyphHex: '1F600',
//   description: 'GRINNING_FACE',
//   fontFamily: 'Roboto Flex',
//   axisValues: { wght: 400, wdth: 100 },
//   axisRanges: { wght: {min: 100, max: 1000}, wdth: {min: 75, max: 125} },
//   fontVariationSettings: '"wght" 400, "wdth" 100',
//   needsDesaturation: false
// }
```

### Animate Variable Font

```javascript
function animateGlyph(glyphData) {
    const element = document.getElementById('my-glyph');

    // Lerp to new axis values
    let currentWght = glyphData.axisValues.wght;
    let targetWght = AutoFontVar.randomInRange(100, 1000);

    function animate() {
        currentWght += (targetWght - currentWght) * 0.1;
        element.style.fontVariationSettings = `"wght" ${Math.round(currentWght)}`;

        if (Math.abs(currentWght - targetWght) > 1) {
            requestAnimationFrame(animate);
        }
    }

    animate();
}
```

**See insert23.js lines 429-475 for full animation implementation.**

---

## Test Mode

Both AutoFont and AutoFontVar support **test mode** for debugging specific blocks or glyphs.

### Test Specific Block(s)

```javascript
const glyphData = AutoFont.generateGlyph(
    block_hex,
    block_hex_desc,
    block_lang,
    lang_font,
    true,                               // testMode = true
    { blocks: ['Emoticons', 'Arabic'] }, // Test these blocks
    null
);
```

### Test Specific Glyph

```javascript
const glyphData = AutoFont.generateGlyph(
    block_hex,
    block_hex_desc,
    block_lang,
    lang_font,
    true,                   // testMode = true
    {
        blocks: ['Emoticons'],
        glyph: '1F600'      // Test this specific glyph
    },
    null
);
```

---

## Exclusions

Use exclusions to skip problematic glyphs (e.g., combining marks that need base characters).

### Exclusion File Format

```javascript
// js_glyph/2025_block_17/block_hex_cf_cm_17_exclusion.js
cf_cm_exclusions = {
    'Combining Diacritical Marks': ['0300', '0301', '0302'],  // Dotted circles
    'Arabic': ['0600', '0601']  // Format characters
};

cfCmExclusionsWait = true;
```

### Use Exclusions

```javascript
const glyphData = AutoFont.generateGlyph(
    block_hex,
    block_hex_desc,
    block_lang,
    lang_font,
    false,
    {},
    cf_cm_exclusions  // Pass exclusions here
);
```

**Note:** AutoFont will retry up to 100 times to find a non-excluded glyph.

---

## Integration with ColorPalette

AutoFont pairs naturally with the ColorPalette system for color management.

### Basic Setup

```javascript
// Load ColorPalette
await loadScript('../js_funct/colorpalette.js');

// Initialize
ColorPalette.init();

// Select a palette
ColorPalette.currentPaletteKey = 'brown';
ColorPalette.currentPalette = PALETTES['brown'];

// Apply to elements
ColorPalette.applyFixedPalette(document.body, table, footer1, footer2, borderRow);

// Get random glyph color from current palette
const color = ColorPalette.randomPaletteGlyphColor();
```

### Dynamic OKLCH Colors

```javascript
// Generate perceptually uniform colors
const bgColor = ColorPalette.generateOKLCH();
const fgColor = ColorPalette.generateOKLCH();
```

### With Contrast Checking

```javascript
await loadScript('../js_funct/contrast_tester.js');

// Generate contrast-safe color pair
const bgColor = ColorPalette.generateOKLCH();

let fgColor;
let attempts = 0;
const minContrast = 4.5;  // WCAG AA standard
const maxAttempts = 50;

do {
    fgColor = ColorPalette.generateOKLCH();
    attempts++;
} while (getContrastRatio(bgColor, fgColor) < minContrast && attempts < maxAttempts);

// Use colors
span.style.backgroundColor = bgColor;
span.style.color = fgColor;
```

**See autofont_simple_example.htm lines 218-230 for full implementation.**

---

## Common Patterns

### Pattern 1: Multi-Variant System (insert23)

Support multiple data variants with different font types.

```javascript
const DATA_VARIANTS = [
    {
        name: 'full',
        type: 'static',
        hex: '../js_glyph/2025_block_17/block_hex_17.js',
        desc: '../js_glyph/2025_block_17/block_hex_desc_17.js',
        skeleton: '../js_glyph/2025_block_17/block_lang_skeleton_17.js'
    },
    {
        name: 'variable',
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

// Select variant
const selectedVariant = DATA_VARIANTS[Math.floor(Math.random() * DATA_VARIANTS.length)];

// Load appropriate library
if (selectedVariant.type === 'variable') {
    await loadScript('../js_funct/autoFontVar.js');
} else {
    await loadScript('../js_funct/autoFont.js');
}
```

### Pattern 2: SessionStorage Variant Switching

```javascript
function switchVariant(variantIndex) {
    sessionStorage.setItem('insert23_selectedVariantIndex', variantIndex);
    location.reload();
}

// On load
const storedIndex = sessionStorage.getItem('insert23_selectedVariantIndex');
if (storedIndex !== null) {
    selectedVariant = DATA_VARIANTS[storedIndex];
    sessionStorage.removeItem('insert23_selectedVariantIndex');
} else {
    selectedVariant = DATA_VARIANTS[Math.floor(Math.random() * DATA_VARIANTS.length)];
}
```

### Pattern 3: Combining Marks Display

For combining marks (accents), prepend non-breaking spaces for proper display.

```javascript
const glyphData = AutoFont.generateGlyph(/* ... */);

// Check if combining mark variant
const isCombiningMark = selectedVariant.name === 'cf_cm';

const glyphHtml = isCombiningMark
    ? `&nbsp;&nbsp;&nbsp;&#x${glyphData.glyph};`  // Prepend spaces
    : `&#x${glyphData.glyph};`;

html += `<span style="font-family: ${glyphData.fontStack};">${glyphHtml}</span>`;
```

### Pattern 4: Color Font Desaturation (AutoFontVar)

Some color fonts (Honk, Nabla) need desaturation for certain palettes.

```javascript
// AutoFontVar automatically sets needsDesaturation flag
const glyphData = AutoFontVar.generateGlyph(/* ... */);

// Apply desaturation filter if needed
const filterStyle = glyphData.needsDesaturation
    ? 'filter: grayscale(1); -webkit-filter: grayscale(1);'
    : '';

html += `<span style="${filterStyle}">&#x${glyphData.glyphHex};</span>`;
```

### Pattern 5: Tooltip Debug Info

```javascript
const glyphData = AutoFont.generateGlyph(/* ... */);

const titleText = [
    `Unicode: ${glyphData.glyph} - ${glyphData.desc.replace(/_/g, ' ')}`,
    `Block: ${glyphData.block}`,
    `Font Stack: ${glyphData.fontStack}`
].join('\n');

html += `<span title="${titleText}">&#x${glyphData.glyph};</span>`;
```

---

## API Reference

### AutoFont.init()

**Purpose:** Initialize AutoFont engine (creates style sheets)

**Returns:** `Promise<void>`

```javascript
await AutoFont.init();
```

### AutoFont.generateGlyph()

**Purpose:** Generate random glyph with automatic font selection

**Signature:**
```javascript
AutoFont.generateGlyph(
    blockHex,       // object - Block → glyph arrays
    blockHexDesc,   // object - Glyph → descriptions
    blockLang,      // object - Block → language keys
    langFont,       // object - Language key → fonts
    testMode,       // boolean - Enable test mode
    testConfig,     // object - { blocks?: string[], glyph?: string }
    exclusions      // object|null - Block → excluded glyphs
)
```

**Returns:** `{ glyph, desc, block, fontStack }`

**Example:**
```javascript
const glyphData = AutoFont.generateGlyph(
    block_hex,
    block_hex_desc,
    block_lang,
    lang_font,
    false,  // Random mode
    {},
    null    // No exclusions
);
```

### AutoFont.selectFont()

**Purpose:** Select font for a Unicode block

**Signature:**
```javascript
AutoFont.selectFont(
    block,      // string - Block name
    blockLang,  // object - Block → language keys
    langFont    // object - Language key → fonts
)
```

**Returns:** `string` (e.g., "Noto Sans-local")

### AutoFont.loadFont()

**Purpose:** Load font and return CSS font stack

**Signature:**
```javascript
AutoFont.loadFont(fontDuJour)  // string - e.g., "Noto Sans-local"
```

**Returns:** `string` (CSS font-family value)

### AutoFont.buildFontStack()

**Purpose:** Build intelligent fallback chain

**Signature:**
```javascript
AutoFont.buildFontStack(fontDuJour)  // string
```

**Returns:** `string` (CSS font-family value)

### AutoFontVar.init()

**Purpose:** Initialize AutoFontVar engine

**Returns:** `Promise<void>`

```javascript
await AutoFontVar.init();
```

### AutoFontVar.generateGlyph()

**Purpose:** Generate variable font glyph with animation data

**Signature:**
```javascript
AutoFontVar.generateGlyph(
    blockHex,           // object - Block → glyph arrays
    blockHexDesc,       // object - Glyph → descriptions
    varBlocksList,      // array - Blocks with variable fonts
    varBlocks,          // object - Axes → blocks
    varBlockLang,       // object - Block → language keys
    varLangFont,        // object - Language key → fonts
    fontAxisRanges,     // object - Font → axis ranges
    testMode,           // boolean
    testConfig          // object - { block?: string }
)
```

**Returns:**
```javascript
{
    glyphHex: string,
    description: string,
    fontFamily: string,
    axisValues: object,           // Current axis values
    axisRanges: object,           // Min/max for each axis
    fontVariationSettings: string, // CSS property value
    needsDesaturation: boolean    // Apply grayscale filter?
}
```

### AutoFontVar.randomInRange()

**Purpose:** Generate random value within range

**Signature:**
```javascript
AutoFontVar.randomInRange(min, max)  // integers
```

**Returns:** `number`

---

## Data File Structure

### block_hex_17.js

**Purpose:** Map Unicode block names to arrays of hex codes

```javascript
blocks = ['Adlam', 'Arabic', 'Basic Latin', ...];

block_hex = {
    'Basic Latin': ['0021', '0022', '0023', ...],  // ! " #
    'Arabic': ['0600', '0601', '0602', ...],
    'Emoticons': ['1F600', '1F601', '1F602', ...]  // 😀 😁 😂
};

blockHexWait = true;  // Signal loaded
```

### block_hex_desc_17.js

**Purpose:** Map block names + indices to glyph descriptions

```javascript
block_hex_desc = {
    'Basic Latin': [
        'EXCLAMATION MARK',
        'QUOTATION MARK',
        'NUMBER SIGN',
        ...
    ],
    'Emoticons': [
        'GRINNING FACE',
        'GRINNING FACE WITH SMILING EYES',
        ...
    ]
};

blockHexDescWait = true;
```

**Access Pattern:**
```javascript
const glyphIndex = block_hex['Basic Latin'].indexOf('0021');
const desc = block_hex_desc['Basic Latin'][glyphIndex];  // 'EXCLAMATION MARK'
```

### block_lang_skeleton_17.js

**Purpose:** Map blocks to language/font system keys

```javascript
block_lang = {
    'Basic Latin': ['latin'],
    'Arabic': ['arabic'],
    'Emoticons': ['emoji-bw'],
    'Devanagari': ['devanagari']
};

lang_font = {
    'latin': ['Noto Sans-local', 'Roboto-google'],
    'arabic': ['Noto Naskh Arabic-google', 'Scheherazade New-google'],
    'emoji-bw': ['Noto Emoji-google', 'Symbola-local'],
    'devanagari': ['Noto Sans Devanagari-google']
};

blockHexSkeletonWait = true;
```

### Variable Font Data Files

**var_axis.js:**
```javascript
var_axes = ['wght', 'wght_wdth', 'wght_wdth_slnt', ...];
var_axesWait = true;
```

**var_blocks.js:**
```javascript
var_blocks = {
    'wght': ['Basic Latin', 'Arabic', ...],
    'wght_wdth': ['Basic Latin', 'Tamil', ...]
};
var_blocksWait = true;
```

**var_blocks_list.js:**
```javascript
var_blocks_list = ['Basic Latin', 'Arabic', 'Tamil', ...];  // Blocks with variable fonts
var_blocks_listWait = true;
```

**font_axis_ranges.js:**
```javascript
font_axis_ranges = {
    'Roboto Flex': {
        wght: { min: 100, max: 1000 },
        wdth: { min: 25, max: 151 }
    },
    'Noto Sans': {
        wght: { min: 100, max: 900 }
    }
};
font_axis_rangesWait = true;
```

**var_block_skeleton.js:**
```javascript
var_block_lang = {
    'Basic Latin': ['latin-var'],
    'Arabic': ['arabic-var']
};
var_block_langWait = true;
```

**var_lang_font.js:**
```javascript
var_lang_font = {
    'latin-var': ['Roboto Flex', 'Inter Variable'],
    'arabic-var': ['Noto Naskh Arabic']
};
var_lang_fontWait = true;
```

---

## Troubleshooting

### Fonts Not Loading

**Problem:** Glyphs show as boxes or fallback font used

**Solutions:**
1. Check browser console for 404 errors
2. Verify font paths in `lang_font` mapping
3. Check network tab for Google Fonts requests
4. Ensure `AutoFont.init()` called before `generateGlyph()`

```javascript
// Check if style sheets were created
console.log('Import sheet:', AutoFont.importSheet);
console.log('Family sheet:', AutoFont.familySheet);
console.log('Face sheet:', AutoFont.faceSheet);
```

### Dependencies Not Loading

**Problem:** `jsWait()` loops forever

**Solutions:**
1. Check that data files set wait signals
2. Verify script paths are correct
3. Check browser console for syntax errors in data files

```javascript
// Debug wait signals
function jsWait() {
    console.log('blockHexWait:', typeof blockHexWait);
    console.log('blockHexDescWait:', typeof blockHexDescWait);
    console.log('blockHexSkeletonWait:', typeof blockHexSkeletonWait);
    console.log('AutoFont:', typeof AutoFont);

    // ... rest of wait logic
}
```

### Wrong Font Selected

**Problem:** Glyph uses incorrect font

**Solutions:**
1. Check `block_lang` mapping for the block
2. Verify `lang_font` has fonts for that language key
3. Test specific block in test mode

```javascript
// Test specific block
const glyphData = AutoFont.generateGlyph(
    block_hex,
    block_hex_desc,
    block_lang,
    lang_font,
    true,                       // Test mode
    { blocks: ['Emoticons'] },  // Specific block
    null
);

console.log('Block:', glyphData.block);
console.log('Font stack:', glyphData.fontStack);
```

### Variable Font Not Animating

**Problem:** Font-variation-settings not changing

**Solutions:**
1. Check that font supports the axes you're animating
2. Verify axis ranges in `font_axis_ranges`
3. Ensure font is loaded before animating

```javascript
// Check if font is loaded
document.fonts.ready.then(() => {
    console.log('Fonts loaded');
    startAnimation();
});
```

### Combining Marks Show Dotted Circles

**Problem:** Combining marks display with dotted circles (◌̀)

**Solutions:**
1. Use exclusions to filter problematic glyphs
2. Prepend non-breaking spaces for display
3. Use `cf_cm` variant pattern from insert23

```javascript
// Prepend spaces for combining marks
const glyphHtml = isCombiningMark
    ? `&nbsp;&nbsp;&nbsp;&#x${glyphData.glyph};`
    : `&#x${glyphData.glyph};`;
```

### Memory Issues

**Problem:** Page slows down or crashes

**Solutions:**
1. Limit number of simultaneous glyphs
2. Clear old DOM elements before creating new ones
3. Remove unused font imports

```javascript
// Clear old glyphs
document.getElementById('glyph-container').innerHTML = '';

// Limit concurrent animations
const MAX_GLYPHS = 100;
if (glyphCount > MAX_GLYPHS) {
    // Remove oldest glyphs
}
```

---

## Best Practices

### 1. Always Initialize Before Generating

```javascript
// ✅ Correct
await AutoFont.init();
const glyph = AutoFont.generateGlyph(/* ... */);

// ❌ Wrong
const glyph = AutoFont.generateGlyph(/* ... */);  // Style sheets not ready
await AutoFont.init();
```

### 2. Use Appropriate Font Type

```javascript
// ✅ Static fonts for simple displays
await loadScript('../js_funct/autoFont.js');

// ✅ Variable fonts for animations
await loadScript('../js_funct/autoFontVar.js');

// ❌ Don't load both unless using multi-variant system
```

### 3. Handle Exclusions Properly

```javascript
// ✅ Load exclusions before jsWait()
await loadScript(selectedVariant.exclusions);

// ✅ Check for exclusions in jsWait()
const exclusionsExpected = selectedVariant.exclusions !== undefined;
const exclusionsLoaded = typeof cfCmExclusionsWait !== "undefined";

ready = /* ... */ && (!exclusionsExpected || exclusionsLoaded);
```

### 4. Test Mode for Debugging

```javascript
// ✅ Use test mode to debug specific blocks
const CONFIG = {
    testMode: true,
    testBlocks: ['Emoticons']
};

// ✅ Use test mode to verify specific glyphs
const CONFIG = {
    testMode: true,
    testBlocks: ['Basic Latin'],
    testGlyph: '0041'  // 'A'
};
```

### 5. Provide Fallback Fonts

```javascript
// ✅ Always include generic fallback
const fontStack = `'${primaryFont}', 'Noto Sans Full', sans-serif`;

// ❌ Don't rely on single font
const fontStack = `'${primaryFont}'`;  // May fail
```

---

## Examples

### Simple Random Glyph

```javascript
async function init() {
    await AutoFont.init();

    const glyphData = AutoFont.generateGlyph(
        block_hex,
        block_hex_desc,
        block_lang,
        lang_font,
        false, {}, null
    );

    const char = String.fromCodePoint(parseInt(glyphData.glyph, 16));
    document.body.innerHTML = `
        <span style="font-family: ${glyphData.fontStack}; font-size: 4em;">
            ${char}
        </span>
    `;
}
```

### Multiple Glyphs with Colors

```javascript
async function init() {
    await AutoFont.init();
    ColorPalette.init();

    let html = '';
    for (let i = 0; i < 20; i++) {
        const glyphData = AutoFont.generateGlyph(
            block_hex, block_hex_desc, block_lang, lang_font,
            false, {}, null
        );

        const char = String.fromCodePoint(parseInt(glyphData.glyph, 16));
        const color = ColorPalette.generateOKLCH();

        html += `<span style="font-family: ${glyphData.fontStack}; color: ${color};">
            ${char}
        </span>`;
    }

    document.getElementById('container').innerHTML = html;
}
```

### Variable Font Animation

```javascript
async function init() {
    await AutoFontVar.init();

    const glyphData = AutoFontVar.generateGlyph(
        block_hex, block_hex_desc, var_blocks_list,
        var_blocks, var_block_lang, var_lang_font,
        font_axis_ranges, false, {}
    );

    const char = String.fromCodePoint(parseInt(glyphData.glyphHex, 16));
    const element = document.createElement('span');
    element.style.fontFamily = glyphData.fontFamily;
    element.style.fontSize = '8em';
    element.textContent = char;
    document.body.appendChild(element);

    // Animate
    function animate() {
        const newAxisValues = {};
        for (const [tag, range] of Object.entries(glyphData.axisRanges)) {
            newAxisValues[tag] = AutoFontVar.randomInRange(range.min, range.max);
        }

        const settings = Object.entries(newAxisValues)
            .map(([tag, val]) => `"${tag}" ${val}`)
            .join(', ');

        element.style.fontVariationSettings = settings;

        setTimeout(animate, 3000);  // Change every 3 seconds
    }

    animate();
}
```

---

## Migration Guide

### From Manual Font Management to AutoFont

**Before:**
```javascript
// Manual approach
function getRandomGlyph() {
    const blocks = ['Basic Latin', 'Arabic', 'Emoticons'];
    const block = blocks[Math.floor(Math.random() * blocks.length)];

    let font;
    if (block === 'Arabic') font = 'Noto Naskh Arabic';
    else if (block === 'Emoticons') font = 'Noto Emoji';
    else font = 'Noto Sans';

    // Load font manually...
    // Build fallback manually...
    // Get random glyph manually...
}
```

**After:**
```javascript
// AutoFont approach
const glyphData = AutoFont.generateGlyph(
    block_hex, block_hex_desc, block_lang, lang_font,
    false, {}, null
);
// Everything handled automatically
```

### From Static to Variable Fonts

**Step 1:** Switch library
```javascript
// Before
await loadScript('../js_funct/autoFont.js');

// After
await loadScript('../js_funct/autoFontVar.js');
```

**Step 2:** Load variable font data files
```javascript
await loadScript('../js_glyph/2025_var_blocks/var_axis.js');
await loadScript('../js_glyph/2025_var_blocks/var_block_skeleton.js');
// ... other var files
```

**Step 3:** Update wait signals
```javascript
// Add variable font signals
const ready = /* ... */ &&
    typeof var_axesWait !== "undefined" &&
    typeof var_blocksWait !== "undefined" &&
    // ... other var signals
```

**Step 4:** Update generateGlyph call
```javascript
// Before
const glyphData = AutoFont.generateGlyph(/* ... */);

// After
const glyphData = AutoFontVar.generateGlyph(
    block_hex, block_hex_desc,
    var_blocks_list, var_blocks,
    var_block_lang, var_lang_font,
    font_axis_ranges,
    false, {}
);
```

**Step 5:** Handle animation data
```javascript
// Use fontVariationSettings instead of fontStack
element.style.fontFamily = glyphData.fontFamily;
element.style.fontVariationSettings = glyphData.fontVariationSettings;
```

---

## Performance Tips

### 1. Preload Critical Fonts

```html
<link rel="preload" href="/tff/NotoSans-Regular.ttf" as="font" type="font/ttf" crossorigin>
```

### 2. Limit Font Loading

```javascript
// Only load fonts when needed
const fontsLoaded = new Set();

function loadFontOnce(font) {
    if (fontsLoaded.has(font)) return;
    AutoFont.loadFont(font);
    fontsLoaded.add(font);
}
```

### 3. Batch DOM Updates

```javascript
// ✅ Build HTML string, then insert once
let html = '';
for (let i = 0; i < 100; i++) {
    html += generateGlyphHTML();
}
container.innerHTML = html;

// ❌ Update DOM repeatedly
for (let i = 0; i < 100; i++) {
    container.innerHTML += generateGlyphHTML();  // Slow!
}
```

### 4. Use RequestAnimationFrame for Animations

```javascript
// ✅ Smooth 60fps animation
function animate() {
    updateGlyphs();
    requestAnimationFrame(animate);
}

// ❌ Janky animation
setInterval(updateGlyphs, 16);  // Imprecise timing
```

---

## Further Reading

**Example Files:**
- `2026_exp/autofont_simple_example.htm` - Minimal standalone example
- `insert_js_2025/insert23.js` - Production multi-variant system
- `insert_js_2025/insert27.js` - AutoFont with text wrapping

**Related Systems:**
- `js_funct/colorpalette.js` - Color management
- `js_funct/contrast_tester.js` - WCAG contrast checking
- `CLAUDE.md` - Insert system guide

---

*Guide by mcryer • Last updated: 2026-02-02*
*Based on AutoFont/AutoFontVar libraries and insert23 implementation*
