# Country Glyphs System

This directory contains country-specific glyph data for the Glyphmatic flags visualization. Each country file defines the glyphs used in that country's writing systems, which are displayed in flag colors in `flagsfun.htm`.

## Architecture

```
js_glyph/
├── country_glyphs.js          # Loader - loads blocks + countries, builds data structures
└── countries/
    ├── blocks/                 # Shared script glyph sets (loaded first)
    │   ├── devanagari.js
    │   ├── arabic_reduced.js
    │   ├── arabic_nastalique.js
    │   └── tamil.js
    ├── india.js                # Country files (loaded after blocks)
    ├── chad.js
    ├── ...
    └── README.md               # This file
```

## How It Works

### 1. Loader (`country_glyphs.js`)

The loader:
1. Loads shared block files from `countries/blocks/` first
2. Loads all country files from `countries/`
3. Merges `scripts` references into each country's `glyphs` object
4. Builds derived data structures: `countryData`, `countryGlyphs`, `countryColors`, `countries`

### 2. Shared Blocks (`countries/blocks/*.js`)

Large glyph sets that are reused across multiple countries. Avoids duplication.

**Format:**
```javascript
registerBlock("Devanagari", [
  'अ', 'आ', 'इ', ...
  // consonant-vowel combinations
  'का', 'कि', 'की', ...
  // conjuncts
  'क्य', 'क्र', ...
]);
```

**Available blocks:**
- `Devanagari` - Hindi, Marathi, Sanskrit, Fiji Hindi (~300 glyphs with conjuncts)
- `Arabic-reduced` - Standard Arabic with presentation forms
- `Arabic-nastalique-flags` - Arabic + Urdu/Persian extensions (پ, چ, گ, etc.)
- `Tamil` - Tamil script base characters
- `Kangxi Radicals` - 214 traditional Chinese radicals (U+2F00–U+2FD5)
- `CJK Strokes` - 36 basic strokes for CJK characters (U+31C0–U+31E3)
- `CJK Radicals Supplement` - Additional CJK radical forms (U+2E80–U+2EFF)

### 3. Country Files (`countries/*.js`)

Each country file defines:
- `iso` - ISO 3166-1 alpha-2 code (for flag emoji)
- `colors` - Flag colors (hex)
- `languages` - National and other languages
- `scripts` - (optional) Array of shared block names to include
- `glyphs` - Country-specific glyph blocks

**Format with shared scripts:**
```javascript
registerCountry("india", {
  iso: 'IN',
  colors: ['#FF9933', '#FFFFFF', '#138808', '#000080'],
  languages: {
    national: ['Hindi', 'English'],
    other: ['Bengali', 'Telugu', 'Tamil', ...]
  },
  scripts: ["Devanagari", "Tamil"],  // ← pulls from shared blocks
  glyphs: {
    'Bengali': [...]  // ← country-specific, inline
  }
});
```

**Format without shared scripts (all inline):**
```javascript
registerCountry("germany", {
  iso: 'DE',
  colors: ['#000000', '#DD0000', '#FFCC00'],
  languages: {
    national: ['German'],
    other: []
  },
  glyphs: {
    'Basic Latin': [...],
    'Latin-1 Supplement': ['Ä', 'Ö', 'Ü', 'ß', 'ä', 'ö', 'ü']
  }
});
```

## Glyph Block Names

Block names should match Unicode block names where possible, or use descriptive names:
- `Basic Latin` - A-Z, a-z
- `Latin-1 Supplement` - àáâãäå, etc.
- `Latin Extended-A` - Āā, Œœ, Šš, etc.
- `Latin Extended-B` - ɓ, ɗ, etc.
- `Devanagari` - Hindi/Sanskrit script
- `Bengali` - Bengali script
- `Tamil` - Tamil script
- `Arabic-reduced` - Arabic with presentation forms
- `Arabic-nastalique-flags` - Arabic + Urdu/Persian

## CSS Block Hover Effects

The file `/css/flagsfun.css` contains CSS rules to apply hover effects to glyphs based on their Unicode block. When a block name is hovered over in the metadata display, a class is added to the `<body>` tag, and the corresponding CSS rule is activated.

To add a hover effect for a new block:

1.  Open `/css/flagsfun.css`.
2.  Add a new CSS rule that targets the block's class. The block name in the class should be lowercased, with spaces and special characters replaced by hyphens. For example, "Latin-1 Supplement" becomes `block-latin-1-supplement`.

**Example CSS Rule:**
```css
body.hover-block-latin-1-supplement .glyph.block-latin-1-supplement {
  font-size: 1.2em;
  color: #ffffff !important;
  font-weight: bold;
  text-shadow: 0 0 2px rgba(255, 255, 255, 0.5);
  z-index: 100;
  position: relative;
}
```

### Currently Implemented Blocks

The following blocks have hover effects implemented in `flagsfun.css`.  When a new block, different from what is listed below, it should be added both to flagsfun.css and here to help future llms know what has been done:

- `Basic Latin` (`block-basic-latin`)
- `Latin-1 Supplement` (`block-latin-1-supplement`)
- `Latin Extended-A` (`block-latin-extended-a`)
- `Latin Extended-B` (`block-latin-extended-b`)
- `Cyrillic` (`block-cyrillic`)
- `Cyrillic Supplement` (`block-cyrillic-supplement`)
- `Greek and Coptic` (`block-greek-and-coptic`)
- `Devanagari` (`block-devanagari`)
- `Arabic` (`block-arabic`)
- `Tamil` (`block-tamil`)
- `Bengali` (`block-bengali`)
- `Tifinagh` (`block-tifinagh`)
- `Ethiopic` (`block-ethiopic`)
- `Hangul Jamo` (`block-hangul-jamo`)
- `Hiragana` (`block-hiragana`)
- `Katakana` (`block-katakana`)
- `CJK Radicals Supplement` (`block-cjk-radicals-supplement`)
- `Kangxi Radicals` (`block-kangxi-radicals`)
- `CJK Strokes` (`block-cjk-strokes`)
- `Bopomofo` (`block-bopomofo`)
- `Spacing Modifier Letters` (`block-spacing-modifier-letters`)
- `Hebrew` (`block-hebrew`)
- `Syriac` (`block-syriac`)
- `Armenian` (`block-armenian`)
- `Sinhala` (`block-sinhala`)
- `Tibetan` (`block-tibetan`)
- `Thaana` (`block-thaana`)
- `Limbu` (`block-limbu`)
- `Arabic Extended` (`block-arabic-extended`)
- `Georgian` (`block-georgian`)
- `Thai` (`block-thai`)
- `Myanmar` (`block-myanmar`)
- `Khmer` (`block-khmer`)
- `Lao` (`block-lao`)
- `Javanese` (`block-javanese`)
- `Balinese` (`block-balinese`)
- `Tagalog` (`block-tagalog`)
- `Mongolian` (`block-mongolian`)



## Adding a New Country

1. Create `countries/{country_name}.js`
2. Use `registerCountry("country_name", { ... })`
3. Add the country name to `COUNTRY_FILES` array in `country_glyphs.js`

## Adding a New Shared Block

1. Create `countries/blocks/{block_name}.js`
2. Use `registerBlock("Block-Name", [...])`
3. Add the block name to `BLOCK_FILES` array in `country_glyphs.js`
4. Reference it in country files via `scripts: ["Block-Name"]`

## Special Cases

### Sub-national Flags
England, Scotland, Wales use `flag` property for emoji tag sequences:
```javascript
registerCountry("england", {
  flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',  // emoji tag sequence, not ISO-based
  ...
});
```

### Countries Using Multiple Scripts
Countries like India, Mauritius can combine shared + inline:
```javascript
scripts: ["Devanagari", "Tamil"],  // shared
glyphs: {
  'Bengali': [...]  // inline (not yet shared)
}
```

## Usage in HTML

```html
<script src="js_glyph/country_glyphs.js"></script>
<script>
  loadCountryData('js_glyph').then(() => {
    // countryData, countryGlyphs, countryColors, countries now available
    console.log(countries);  // ['albania', 'andorra', ...]
    console.log(countryGlyphs['india']);  // { Devanagari: [...], Tamil: [...], Bengali: [...] }
  });
</script>
```

## File Count

- ~101 country files
- 7 shared block files
- Countries with `scripts` references: India, Chad, Mauritius, Fiji, Comoros, China, Taiwan, Japan

## TODO

### Indic Scripts (all need corpus analysis for real-world usage)

#### Verified Living Scripts (with active speaker communities)

| Script | Speakers | Evidence |
|--------|----------|----------|
| Ol Chiki (Santali) | 7.6M | Newspaper "Fagun", schools, 8th Schedule |
| Warang Citi (Ho) | 1.4M | Schools, AIR radio, publications, 6000 trained |
| Mundari Bani (Mundari) | 1.1M | 65+ schools, primers, Unicode 2022 |
| Meetei Mayek (Meitei) | 1.8M | Widely used in Manipur |
| Limbu | 400K | Used in Sikkim/Nepal border |
| Chakma | 326K | Used in Tripura/Mizoram |
| Sora Sompeng (Sora) | 300-400K | Publications, almanacs, some schools |
| Lepcha | 66K | Used in Sikkim |
| Wancho | 55K | 20 schools, Unicode 2019 |
| Toto | 1,600 | Dictionary 2023, Unicode 2021, critically endangered |

#### Full Script List

```javascript
const indicScripts = [
  'Devanagari',           // ✓ DONE
  'Bengali',              // ✓ DONE (inline in India, needs shared block)
  'Tamil',                // ✓ DONE (needs corpus analysis)
  'Gurmukhi',             // Punjabi
  'Gujarati',
  'Oriya',
  'Telugu',
  'Kannada',
  'Malayalam',
  'Meetei Mayek',         // Manipuri - 1.8M speakers
  'Ol Chiki',             // Santali - 7.6M speakers
  'Saurashtra',
  'Lepcha',               // Sikkim - 66K speakers
  'Limbu',                // Nepal/Sikkim - 400K speakers
  'Chakma',               // Bangladesh/NE India - 326K speakers
  'Sora Sompeng',         // Sora - 300-400K speakers
  'Warang Citi',          // Ho - 1.4M speakers
  'Ol Onal',              // Bhumij (needs verification)
  'Wancho',               // Arunachal Pradesh - 55K speakers
  'Toto',                 // West Bengal - 1,600 speakers (critically endangered)
  'Nag Mundari',          // Mundari - 1.1M speakers
  'Sunuwar',              // Sikkim area
  'Kirat Rai',            // Rai languages
  'Masaram Gondi',        // Gondi language
  'Gunjala Gondi',        // Gondi language
  'Dogra',                // Dogri language
  'Takri',                // Dogri/Chambeali (revivalist)
  'Syloti Nagri',         // Sylheti (Bangladesh/Assam)
  'Tulu-Tigalari',        // Tulu language
];
```

### Other TODO

- [ ] **Tamil corpus analysis** - current block has all valid combinations, needs analysis of actual usage
- [ ] Add Bengali as shared block (currently inline in India)
- [ ] Add full Arabic (vs reduced)
- [ ] Add notes to CN,JP,Taiwan, Korea indicating that Ideograms, Kanji and Wansung-hyeong or Hangul Syllables aren't represented due to the size of the sets and the desire to represent the components of the languages..The the words of the languages.  I wonder if we could create those notes in the languages.

