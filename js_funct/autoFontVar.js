/**
 * AutoFontVar - Variable Font glyph generation with block-first selection
 * Provides better Unicode block diversity by selecting block before axes
 */
(function(global) {
    'use strict';

    const AutoFontVar = {
        // Font style sheets
        fontLinks: new Set(),

        // Initialize
        init: function() {
            console.log('AutoFontVar engine loaded');
            return Promise.resolve();
        },

        // Get random element from array
        randomFrom: function(array) {
            return array[Math.floor(Math.random() * array.length)];
        },

        // Get random value in range
        randomInRange: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        // Load Google Font with variable axes
        loadGoogleFont: function(fontFamily, axisRanges) {
            // Build axis specification for Google Fonts URL
            // Format: axis1,axis2@min1..max1,min2..max2
            const registeredAxes = ['wght', 'wdth', 'slnt', 'opsz', 'ital'];
            const filteredAxes = Object.entries(axisRanges)
                .filter(([tag]) => registeredAxes.includes(tag.toLowerCase()))
                .sort((a, b) => a[0].localeCompare(b[0]));

            const axisTags = filteredAxes.map(([tag]) => tag.toLowerCase()).join(',');
            const axisRangesStr = filteredAxes.map(([tag, range]) =>
                `${Math.round(range.min)}..${Math.round(range.max)}`
            ).join(',');
            const axisSpecs = filteredAxes.length > 0 ? `${axisTags}@${axisRangesStr}` : '';

            const fontKey = `${fontFamily}-${axisSpecs}`;
            if (this.fontLinks.has(fontKey)) {
                return; // Already loaded
            }

            const link = document.createElement('link');
            if (axisSpecs) {
                link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}:${axisSpecs}&display=swap`;
            } else {
                link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}&display=swap`;
            }
            link.rel = 'stylesheet';
            document.head.appendChild(link);

            this.fontLinks.add(fontKey);
            console.log('Loading variable font:', fontFamily, axisSpecs);
        },

        // Find axes combos that support a given block
        findAxesForBlock: function(block, varBlocks) {
            const axesWithBlock = [];
            for (const [axes, blocks] of Object.entries(varBlocks)) {
                if (blocks.includes(block)) {
                    axesWithBlock.push(axes);
                }
            }
            return axesWithBlock;
        },

        // Generate variable font glyph with block-first selection for diversity
        generateGlyph: function(blockHex, blockHexDesc, varBlocksList, varBlocks, varBlockLang, varLangFont, fontAxisRanges, testMode = false, testConfig = {}) {
            let block, axes;

            // STEP 1: Pick block (only from blocks with variable fonts)
            if (testMode && testConfig.block) {
                block = testConfig.block;
            } else {
                // Use pre-computed list of blocks with variable fonts
                // Filter to only blocks that exist in block_hex
                const availableBlocks = varBlocksList.filter(b => blockHex[b]);
                if (availableBlocks.length === 0) {
                    console.error('No variable font blocks found in block_hex');
                    return null;
                }
                block = this.randomFrom(availableBlocks);
            }

            // STEP 2: Find axes combos that support this block
            const availableAxes = this.findAxesForBlock(block, varBlocks);
            if (!availableAxes || availableAxes.length === 0) {
                console.warn('No variable axes found for block:', block);
                return null;
            }

            // STEP 3: Pick random axes combo from those available
            axes = this.randomFrom(availableAxes);

            // STEP 4: Get glyph from block
            const glyphs = blockHex[block];
            if (!glyphs || glyphs.length === 0) {
                console.error('No glyphs found for block:', block);
                return null;
            }

            let glyphHex;
            if (testMode && testConfig.glyph) {
                glyphHex = testConfig.glyph;
            } else {
                glyphHex = this.randomFrom(glyphs);
            }

            // STEP 5: Get description
            const descriptions = blockHexDesc[block];
            const glyphIndex = glyphs.indexOf(glyphHex);
            const description = descriptions && descriptions[glyphIndex]
                ? descriptions[glyphIndex]
                : 'Unknown';

            // STEP 6: Build lookup key and get lang tag
            const lookupKey = `${block}-${axes}`;
            const langTags = varBlockLang[lookupKey];
            if (!langTags || langTags.length === 0) {
                console.error('No lang tags found for:', lookupKey);
                return null;
            }
            const langTag = langTags[0];

            // STEP 7: Get fonts from var_lang_font and filter to only those with axis ranges
            const fonts = varLangFont[langTag];
            if (!fonts || fonts.length === 0) {
                console.error('No fonts found for lang tag:', langTag);
                return null;
            }

            // Filter to only fonts that have axis ranges (are actually variable)
            const variableFonts = fonts.filter(f => fontAxisRanges[f]);
            if (variableFonts.length === 0) {
                console.warn('No variable fonts with axis ranges for lang tag:', langTag);
                return null;
            }

            const fontFamily = this.randomFrom(variableFonts);
            const axisRanges = fontAxisRanges[fontFamily];

            // STEP 9: Generate random values for each axis
            const axisValues = {};
            for (const [axisTag, range] of Object.entries(axisRanges)) {
                axisValues[axisTag] = this.randomInRange(range.min, range.max);
            }

            // STEP 10: Load the font
            this.loadGoogleFont(fontFamily, axisRanges);

            // Build font-variation-settings string
            const fontVariationSettings = Object.entries(axisValues)
                .map(([tag, val]) => `"${tag}" ${val}`)
                .join(', ');

            return {
                glyphHex,
                description,
                block,
                axes,
                fontFamily,
                axisValues,
                axisRanges,
                fontVariationSettings
            };
        }
    };

    // Bind all methods to preserve 'this' context
    Object.keys(AutoFontVar).forEach(key => {
        if (typeof AutoFontVar[key] === 'function') {
            AutoFontVar[key] = AutoFontVar[key].bind(AutoFontVar);
        }
    });

    // Auto-initialize on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => AutoFontVar.init());
    } else {
        AutoFontVar.init();
    }

    // Export
    global.AutoFontVar = AutoFontVar;
    console.log('AutoFontVar engine loaded');

})(window);
