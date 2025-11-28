// Configuration
const CONFIG = {
    testMode: false,
    testGlyph: '1F937',
    testBlocks: ["Supplemental Symbols and Pictographs"]
};

// Data variant selection
const DATA_VARIANTS = [
    {
        name: 'full',
        hex: '../js_glyph/2025_block_17/block_hex_17.js',
        desc: '../js_glyph/2025_block_17/block_hex_desc_17.js',
        footerText: 'Unicode',
        footerFont: 'Noto Sans Mono'
    },
    {
        name: 'no_punct',
        hex: '../js_glyph/2025_block_17/block_hex_no_punct_17.js',
        desc: '../js_glyph/2025_block_17/block_hex_desc_no_punct_17.js',
        footerText: 'Unicode Letters Numbers and Symbols',
        footerFont: 'Noto Serif Mono'
    }
];

const SKELETON_FILE = '../js_glyph/2025_block_17/block_lang_skeleton_17.js';

// Randomly select a variant
const selectedVariant = DATA_VARIANTS[Math.floor(Math.random() * DATA_VARIANTS.length)];
console.log('Insert25 - Selected data variant:', selectedVariant.name);

// Load required scripts
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.type = 'text/javascript';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Load all required dependencies
async function loadDependencies() {
    try {
        // Load core libraries first
        await loadScript('../js_funct/contrast_tester.js');
        await loadScript('../js_funct/colorpalette.js');
        await loadScript('../js_funct/autoFont.js');

        // Load data variant files
        await loadScript(selectedVariant.hex);
        await loadScript(selectedVariant.desc);
        await loadScript(SKELETON_FILE);

        console.log('Insert25 - All dependencies loaded');
    } catch (error) {
        console.error('Insert25 - Error loading dependencies:', error);
    }
}

// Wait for dependencies
function jsWait() {
    if (typeof blockHexWait === "undefined" ||
        typeof blockHexDescWait === "undefined" ||
        typeof blockHexSkeletonWait === "undefined" ||
        typeof AutoFont === "undefined" ||
        typeof ColorPalette === "undefined") {
        window.setTimeout(jsWait, 100);
    } else {
        init();
    }
}

// Generate row of glyphs
function spectacular(start, numberOfGlyphs) {
    let spansString = '';

    for (let i = start; i <= start + numberOfGlyphs; i++) {
        try {
            const glyphData = AutoFont.generateGlyph(
                block_hex,
                block_hex_desc,
                block_lang,
                lang_font,
                CONFIG.testMode,
                {
                    blocks: CONFIG.testBlocks,
                    glyph: CONFIG.testGlyph
                }
            );

            const glyphColor = ColorPalette.randomPaletteGlyphColor();

            spansString += `<td><span id="sid${i}" style="font-family: ${glyphData.fontStack}; color: ${glyphColor};" title="${glyphData.glyph}-${glyphData.desc}">&#x${glyphData.glyph};</span></td>`;
        } catch (error) {
            console.error(`Error generating glyph at position ${i}:`, error);
            // Insert a placeholder span on error
            spansString += `<td><span id="sid${i}" style="color: red;" title="Error">?</span></td>`;
        }
    }
    return spansString;
}

// Initialize the table and layout
async function init() {
    await AutoFont.init();

    // Create table structure
    createTableStructure();

    // Select and apply random color palette
    ColorPalette.selectRandomPalette();
    const table = document.querySelector('table');
    const footerLeft = document.getElementById('footerLeft');
    const footerRight = document.querySelector('#footerRight');
    const borderRow = document.querySelector('tr.border_bottom');

    ColorPalette.applyFixedPalette(
        document.body,
        table,
        footerLeft,
        footerRight,
        borderRow
    );

    // Apply variant-specific footer text and font
    if (footerLeft) {
        if (CONFIG.testMode) {
            const blockText = CONFIG.testBlocks.length > 1
                ? `Blocks: ${CONFIG.testBlocks.join(', ')}`
                : `Block: ${CONFIG.testBlocks[0]}`;
            const glyphText = CONFIG.testGlyph ? ` - Glyph: ${CONFIG.testGlyph}` : '';
            footerLeft.textContent = `Test Mode - ${blockText}${glyphText}`;
        } else {
            footerLeft.textContent = selectedVariant.footerText;
        }
        footerLeft.style.fontFamily = `'${selectedVariant.footerFont}'`;
    }

    // Generate glyph rows
    const numberOfGlyphs = 20;
    document.getElementById('row1').innerHTML = spectacular(0, numberOfGlyphs - 1);
    document.getElementById('row2').innerHTML = spectacular(numberOfGlyphs, numberOfGlyphs - 1);
    document.getElementById('row3').innerHTML = spectacular(numberOfGlyphs * 2, numberOfGlyphs - 1);
    document.getElementById('row4').innerHTML = spectacular(numberOfGlyphs * 3, numberOfGlyphs - 1);
    document.getElementById('row5').innerHTML = spectacular(numberOfGlyphs * 4, numberOfGlyphs - 1);
}

// Create the table structure dynamically
function createTableStructure() {
    // Add Google Font import for Noto Emoji
    const fontImport = document.createElement('style');
    fontImport.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Noto+Emoji&display=swap');

        @font-face {
            font-family: 'Noto Sans Full';
            src: url('../tff/NotoSans-Regular.ttf') format('truetype');
        }
    `;
    document.head.appendChild(fontImport);

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        table {
            border-bottom: 50px solid #110c11;
            border-radius: 20px;
            max-height: 90vh;
            height: 75%;
        }

        div {
            display: inline;
            height: .1em;
        }

        tr {
            height: 1em;
            overflow: hidden;
            vertical-align: middle;
        }

        td {
            height: 1em;
            overflow: hidden;
            vertical-align: middle;
        }

        tr.border_bottom td {
            border-bottom: 1pt dotted transparent;
        }

        [title] {
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
            border-radius: 1px;
            position: relative;
        }

        body.touched [title] > * {
            user-select: none;
        }

        body.touched [title]:hover > * {
            user-select: auto;
        }

        body.touched [title]:hover:after {
            font-size: .12em;
            position: absolute;
            top: 100%;
            right: 0%;
            content: attr(title);
            border: 1px solid rgba(0, 0, 0, 0.2);
            background-color: white;
            color: black;
            padding: 0.1em;
            z-index: 1;
        }
    `;
    document.head.appendChild(style);

    // Set body styles
    document.body.style.overflow = 'hidden';
    document.body.style.fontSize = '3.75em';
    document.body.style.display = 'inline';

    // Touch support
    document.body.addEventListener('touchstart', function() {
        document.body.classList.add('touched');
    });

    // Create table
    const table = document.createElement('table');
    table.id = 'tab';
    table.setAttribute('align', 'center');
    table.setAttribute('width', '90%');

    table.innerHTML = `
        <tr>
            <td id="row1" style="text-align:center" colspan="2"></td>
        </tr>
        <tr>
            <td id="row2" style="text-align:center" colspan="2"></td>
        </tr>
        <tr>
            <td id="row3" style="text-align:center" colspan="2"></td>
        </tr>
        <tr class="border_bottom">
            <td id="row4" style="text-align:center" colspan="2"></td>
        </tr>
        <tr>
            <td id="row5" style="text-align:center" colspan="2"></td>
        </tr>
        <tr>
            <td style="text-align:left;">
                <div id="footerLeft" style="font-size:.35em;"></div>
            </td>
            <td style="text-align:right;">
                <div id="footerRight" style="font-size:.35em;font-family:'Noto Sans Mono';"> glyphmatic.us</div>
            </td>
        </tr>
    `;

    document.body.appendChild(table);
}

// Start the loading process
console.log('insert25.js loaded');
loadDependencies().then(() => jsWait());
