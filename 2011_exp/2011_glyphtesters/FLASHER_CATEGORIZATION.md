# Flasher Categorization Analysis

## Overview
Analysis of 127 flasher files across 4 dimensions: Layout, Transforms, Color Schemes, and Glyph Sets

---

## 1. LAYOUT ENGINES

### Quad-Table (3 files)
Simple 2x2 table layout
- flasher.htm
- flasher_hsla.htm
- flasher_hsla_maya.htm
- flasher_hsla_mph.htm

### Halfies Layout (3 files)
Two horizontal sections (top and bottom half)
- flasher14.htm - Cuneiform
- flasher15.htm - Egyptian Hieroglyphs (Aegyptus)
- flasher16.htm - Cuneiform + Hieroglyphs

### Fullscreen (100+ files)
Full viewport rendering - the dominant layout
- flasher13, flasher17, flasher3-7
- flasher21-49 series (most)
- All flasher27 variants
- All flasher34-43 variants

### Unknown/Other (needs refinement)
- flasher1.htm, flasher2.htm
- flasher9a.htm
- flasher27k-diacrit-hsla.htm
- flasher35-arabic-ayesha1.htm
- flasher35-arabic-nouri1.htm
- flasher35-telugu variants

---

## 2. TRANSFORM FAMILIES

### 3D Rotation + Opacity (flasher27 series - "tripper" engine)
**The flagship psychedelic 3D engine**
- rotateX, rotateY, rotateZ, opacity
- Files: flasher27, 27a, 27b, 27c, 27d variants
- All the "tripper" titled files (Vai, Emoji, Aegyptus, Cuneiform, etc.)

### 2D Rotation + Blur + Opacity (flasher26, 34, 39)
- rotateZ, blur, opacity
- Files: flasher26.htm, flasher34-aegean-rotate.htm
- flasher39-fullarabic-out3.htm, flasher39-maya-out3.htm
- flasher39-sun variants

### 3D Rotation + Blur + Opacity (flasher28, 29)
**Maximum effects engine**
- rotateX, rotateY, rotateZ, blur, opacity
- Files: flasher28.htm, flasher29.htm, flasher29-new_selection.htm

### Blur + Opacity Only (flasher21-25, 30-49)
**The "mandala" and "fader" engines**
- No rotation, just blur and opacity
- Files: flasher21-25 series, flasher30-49 series
- All the "Mandalelectrick" files (34 series)
- All the "Fader" files (35, 39 series)

### Blur Only (early series)
- flasher5.htm, flasher6.htm, flasher7.htm

### No Transforms (very early)
- flasher.htm, flasher1.htm, flasher2.htm, flasher3.htm, etc.

---

## 3. COLOR SCHEMES

### HSLA (dynamic hue/saturation/lightness)
- All flasher27d-hsla, 27e-hsla through 27m-hsla
- flasher_hsla variants
- Total: ~15 files

### Multi-Color (20+ colors - full spectrum)
- flasher1, 2, 13-17
- flasher28
- flasher34-triangles.htm
- flasher43-drop-hangul variants
- Total: ~15 files

### Limited-Palette (< 20 colors - curated)
- flasher23-25, flasher26, flasher27 series (non-hsla)
- flasher29-33
- flasher34-new_selection, 34a-yi
- flasher35 series, flasher43-drop series, flasher44
- flasher8, flasher9 series
- Total: ~40 files

### Unknown (no color array detected, likely inline)
- flasher34_ff, flasher34a variants
- flasher35-mph, flasher36-38
- flasher39 series, flasher40-47
- Total: ~55 files

---

## 4. GLYPH SET FAMILIES (from titles)

### Script-Specific Trippers (flasher27 series)
- **Vai**: flasher27f-hsla, flasher27j-vai-hsla
- **Emoji**: flasher27g-hsla
- **Aegyptus** (Egyptian Hieroglyphs): flasher27h-hsla
- **Cuneiform**: flasher27i-hsla, flasher27d-cuni.htm
- **Diacritics**: flasher27k-diacrit-hsla
- **Anatolian**: flasher27l-anatolian-hsla
- **Crete Minoan**: flasher27m-creteminoan-hsla
- **Symbola**: flasher27m-sym-hsla
- **Maya**: flasher27d-maya.htm

### Arabic Script Family
- flasher34a-arabic.htm - "Mandalelectrick-arabic-all googlefonts"
- flasher35-fullarabic variants - "Full Arabic Scattered Fader"
- flasher39-fullarabic variants
- flasher45arabic.htm - "Arabic Bold"
- Urdu/Glago variants

### Asian Scripts
- **Yi**: flasher34a-yi variants - "Mandalelectrick-Yi"
- **Hangul** (Korean): flasher43-drop-hangul series - "UNICODE MANDALA"
- **Telugu**: flasher35-telugu variants - "Telugu Syllables Scattered Fader"
- **Asian Circles**: flasher44.htm, flasher45.htm

### Ancient Scripts
- **Aegean/Hieroglyphs**: flasher34-aegean variants, flasher35-aegeanheiro
- **Old Persian**: flasher35-braille-out1, flasher35-miscsym-out1
- **Maya**: flasher39-maya series - "Maya Scattered Fader"
- **Braille**: flasher35-braille-out1

### Font-Specific Collections
- **Symbola**: flasher36.htm - "Symbola Mandalelectrick"
- **Sun-ExtA**: flasher37.htm, flasher39-sun variants - "Sun-exta Mandalelectrick"
- **Code2000**: flasher38-code2000.htm
- **Quivira**: flasher38.htm
- **MPH 2B Damase**: flasher35-mph.htm, flasher39-mph variants
- **Arial MS Unicode**: flasher39-42 - "ARIAL MS UNICODE MANDALA"

### Geometric/Abstract
- **Circles**: flasher44-45 - "Asian Circles"
- **Triangles**: flasher34-triangles.htm
- **Gratings**: (in degenerator series)
- **New Selection**: flasher29-new_selection, flasher34-new_selection, flasher49 variants

### Named Personalized Versions
- **Ayesha Little Kid**: flasher35-arabic-ayesha1.htm
- **Nouri Little Kid**: flasher35-arabic-nouri1.htm
- **Amrutha Little Kid**: flasher35-telugu-amrutha variants

---

## 5. PATTERN CLUSTERS

### Cluster A: "3D Tripper" Family (flasher27 series)
- **Layout**: Fullscreen
- **Transforms**: rotateX + rotateY + (rotateZ) + opacity
- **Color**: HSLA or limited-palette
- **Glyphs**: Script-specific (Vai, Emoji, Cuneiform, etc.)
- **Count**: ~20 files

### Cluster B: "Mandalelectrick" Family (flasher34 series)
- **Layout**: Fullscreen
- **Transforms**: blur + opacity (some with rotateZ)
- **Color**: Varies (multi-color, limited, unknown)
- **Glyphs**: Font-specific or script-specific
- **Count**: ~12 files

### Cluster C: "Scattered Fader" Family (flasher35, 39 series)
- **Layout**: Fullscreen
- **Transforms**: blur + opacity (some with rotateZ)
- **Color**: Limited-palette or unknown
- **Glyphs**: Script-specific (Arabic, Telugu, Maya, etc.)
- **Count**: ~25 files

### Cluster D: "Mandala Drop" Family (flasher43 series)
- **Layout**: Fullscreen
- **Transforms**: blur + opacity
- **Color**: Limited-palette or multi-color
- **Glyphs**: Hangul, general Unicode
- **Count**: ~8 files

### Cluster E: "Halfies" Family (flasher14-16)
- **Layout**: Two horizontal sections (top:0%, top:50%)
- **Transforms**: blur + saturate
- **Color**: Limited-palette
- **Glyphs**: Cuneiform and Egyptian Hieroglyphs
- **Count**: 3 files

### Cluster F: Early/Simple (flasher 1-13, 17)
- **Layout**: Fullscreen or quad-table
- **Transforms**: None or blur only
- **Color**: Multi-color or limited-palette
- **Glyphs**: Generic
- **Count**: ~14 files

### Cluster G: "Explos" Family (flasher30-33, 49)
- **Layout**: Fullscreen
- **Transforms**: blur + opacity
- **Color**: Limited-palette or unknown
- **Glyphs**: Various (Latin, new selection)
- **Count**: ~8 files

---

## 6. RECOMMENDATIONS FOR INDEX.HTML

### Primary Organization: By Engine Type
1. **Quad-Table Engine** (4 files)
2. **Halfies Engine** (3 files) - Cuneiform + Hieroglyphs, 2 horizontal sections
3. **3D Tripper Engine** (20+ files) - subdivide by script
4. **Mandalelectrick Engine** (12 files) - subdivide by font
5. **Scattered Fader Engine** (25 files) - subdivide by script
6. **Mandala Drop Engine** (8 files)
7. **Explos Engine** (8 files)
8. **Simple/Early Engines** (14 files)

### Secondary Filters
- Script/Glyph family
- Color scheme (HSLA vs palette)
- Font family

### Tertiary Organization
- Transform complexity (none → blur → 2D rotate → 3D rotate)
