# Glyph Testers

A collection of tools for testing, exploring, and generating Unicode glyphs with various font configurations.

---

## Glyphtesters

### glyphtester-OM.htm
Uses the Whirldsymbol.js curated set to test for font coverage.

### glyphtester-autofont.htm
Uses block_hex and desc along with block skeleton to test all the glyphs in macroglyph.  Uses the ../../js_glyph/2025_block_17 directory as its source.

### glyphtester-emoji.html
Uses the ../../js_glyph/emoji_versions_data2.js file to test all the 15 fonts and the combinations.  Special array collection creates exclusion array to assure proper rendering

### glyphtester-heiro.htm
A test to determine how Aegyptus and Noto Sans Heiro tie out in the new supplemental release.  Hint: they don't

### glyphtester_whirld_font.htm
This is the full set of whirld fonts/glyphs tester.  It organizes it by font instead of symbol..not particularly useful.  Stale AF. uses the limited ../../js_glyph/whirldsymbols.js

### glyphtester_whirld_symbol.htm
Includes all the fonts/symbols for the full curated set used in braids and 4 quadrant flasher. Uses ../../js_glyph/whirldsymbols.js

---

## Google Fonts

### google-fonts-builder.htm
Builds the array of font coverage for each and every font on google fonts.  Stored in /js_glyph/google_font_range_coverage.js
produces an array which is cut and paste into the .j

### google-fonts-lookup.htm
A web tool that allows any glyph to be entered and tells which fonts supposedly have coverage.  It shows all the glyphs/fonts and illustrates the sad reality that most fonts don't have the coverage you want.

---

## Mono Fonts

### mono_font_fetcher.htm
Fetches all the mono fonts from google fonts.  Where do I use this?  Used in tshirtgen.htm in the font_utility.js for sidebar population.  Could also be used for the sidebar in glyphmatic.us description.

---

## Variable Fonts (VF)

### VF_Fonts_fetcher.htm
Lists all variable fonts in google fonts.  A study that began the process to VF_Skellie

### VF_Fonts_fetcher_vartype.htm
Took the VF_Fonts_fetcher and grouped by the axis combos for each font.

e.g.

<b>opsz</b>

Desc: Optical Size — Optimizes for display size
Range: 5 – 1200 • Used by 33 fonts

### VF_Fonts_fetcher_blockgroup.htm
Took VF_Fonts_fetcher to the next level sorting all the fonts by their Block Coverage

### VF_Skeleton_Generator.html
Creates all the arrays required for the Variable autofont engine to run
