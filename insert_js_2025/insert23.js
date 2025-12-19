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
        type: 'static',
        hex: '../js_glyph/2025_block_17/block_hex_17.js',
        desc: '../js_glyph/2025_block_17/block_hex_desc_17.js',
        skeleton: '../js_glyph/2025_block_17/block_lang_skeleton_17.js',
        footerText: 'Unicode',
        footerFont: 'Noto Sans Mono'
    },
    {
        name: 'no_punct',
        type: 'static',
        hex: '../js_glyph/2025_block_17/block_hex_no_punct_17.js',
        desc: '../js_glyph/2025_block_17/block_hex_desc_no_punct_17.js',
        skeleton: '../js_glyph/2025_block_17/block_lang_skeleton_17.js',
        footerText: 'Unicode Letters Numbers and Symbols',
        footerFont: 'Noto Serif Mono'
    },
    {
        name: 'variable',
        type: 'variable',
        hex: '../js_glyph/2025_block_17/block_hex_17.js',
        desc: '../js_glyph/2025_block_17/block_hex_desc_17.js',
        varFiles: {
            axis: '../js_glyph/2025_var_blocks/var_axis.js',
            skeleton: '../js_glyph/2025_var_blocks/var_block_skeleton.js',
            blocks: '../js_glyph/2025_var_blocks/var_blocks.js',
            blocksList: '../js_glyph/2025_var_blocks/var_blocks_list.js',
            axisRanges: '../js_glyph/2025_var_blocks/font_axis_ranges.js',
            langFont: '../js_glyph/2025_var_blocks/var_lang_font.js'
        },
        animationConfig: {
            durationMin: 3000,
            durationMax: 7500
        },
        footerText: 'Variable Font Unicode',
        footerFont: 'Noto Serif Mono'
    }
];

// Randomly select a variant
const selectedVariant = DATA_VARIANTS[Math.floor(Math.random() * DATA_VARIANTS.length)];
console.log('Insert23 - Selected data variant:', selectedVariant.name);

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

        // Load appropriate font library based on variant type
        if (selectedVariant.type === 'variable') {
            await loadScript('../js_funct/autoFontVar.js');
        } else {
            await loadScript('../js_funct/autoFont.js');
        }

        // Load data files
        await loadScript(selectedVariant.hex);
        await loadScript(selectedVariant.desc);

        // Load skeleton or variable font files
        if (selectedVariant.type === 'variable') {
            await loadScript(selectedVariant.varFiles.axis);
            await loadScript(selectedVariant.varFiles.skeleton);
            await loadScript(selectedVariant.varFiles.blocks);
            await loadScript(selectedVariant.varFiles.blocksList);
            await loadScript(selectedVariant.varFiles.axisRanges);
            await loadScript(selectedVariant.varFiles.langFont);
        } else {
            await loadScript(selectedVariant.skeleton);
        }

        console.log('Insert23 - All dependencies loaded');
    } catch (error) {
        console.error('Insert23 - Error loading dependencies:', error);
    }
}

// Wait for dependencies
function jsWait() {
    let ready = false;

    if (selectedVariant.type === 'variable') {
        // Check for variable font dependencies
        ready = typeof blockHexWait !== "undefined" &&
                typeof blockHexDescWait !== "undefined" &&
                typeof var_axesWait !== "undefined" &&
                typeof var_blocksWait !== "undefined" &&
                typeof var_blocks_listWait !== "undefined" &&
                typeof var_block_langWait !== "undefined" &&
                typeof var_lang_fontWait !== "undefined" &&
                typeof font_axis_rangesWait !== "undefined" &&
                typeof AutoFontVar !== "undefined" &&
                typeof ColorPalette !== "undefined";
    } else {
        // Check for static font dependencies
        ready = typeof blockHexWait !== "undefined" &&
                typeof blockHexDescWait !== "undefined" &&
                typeof blockHexSkeletonWait !== "undefined" &&
                typeof AutoFont !== "undefined" &&
                typeof ColorPalette !== "undefined";
    }

    if (!ready) {
        window.setTimeout(jsWait, 100);
    } else {
        init();
    }
}

// Animation state for variable font glyphs
const glyphAnimations = [];

// Animation helper functions
function lerp(start, end, t) {
    return start + (end - start) * t;
}

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Generate row of glyphs
function spectacular(start, numberOfGlyphs) {
    let spansString = '';

    for (let i = start; i <= start + numberOfGlyphs; i++) {
        try {
            if (selectedVariant.type === 'variable') {
                // Variable font mode
                const glyphData = AutoFontVar.generateGlyph(
                    block_hex,
                    block_hex_desc,
                    var_blocks_list,
                    var_blocks,
                    var_block_lang,
                    var_lang_font,
                    font_axis_ranges,
                    CONFIG.testMode,
                    { block: CONFIG.testBlocks ? CONFIG.testBlocks[0] : null }
                );

                if (!glyphData) {
                    console.error(`Failed to generate variable glyph at position ${i}`);
                    spansString += `<td><span id="sid${i}" style="color: red;" title="Error">?</span></td>`;
                    continue;
                }

                const glyphColor = ColorPalette.randomPaletteGlyphColor();

                // Initialize animation state with randomization
                const randomDuration = Math.random() * (selectedVariant.animationConfig.durationMax - selectedVariant.animationConfig.durationMin) + selectedVariant.animationConfig.durationMin;
                const randomProgress = Math.random();

                const animState = {
                    glyphData,
                    elementId: `sid${i}`,
                    currentValues: { ...glyphData.axisValues },
                    targetValues: { ...glyphData.axisValues },
                    progress: randomProgress,
                    duration: randomDuration,
                    lastTime: Date.now()
                };

                glyphAnimations.push(animState);

                // Apply desaturation filter if needed
                const filterStyle = glyphData.needsDesaturation ? 'filter: grayscale(1); -webkit-filter: grayscale(1);filter:saturate(0);-webkit-filter:saturate(0)' : '';

                spansString += `<td><span id="sid${i}" style="font-family: '${glyphData.fontFamily}', 'Noto Sans Georgian', 'Noto Sans Kannada','Noto Serif Armenian','Noto Emoji', 'Noto Sans Full'; color: ${glyphColor}; font-variation-settings: ${glyphData.fontVariationSettings}; ${filterStyle}" title="${glyphData.glyphHex}-${glyphData.description}">&#x${glyphData.glyphHex};</span></td>`;
            } else {
                // Static font mode
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
            }
        } catch (error) {
            console.error(`Error generating glyph at position ${i}:`, error);
            // Insert a placeholder span on error
            spansString += `<td><span id="sid${i}" style="color: red;" title="Error">?</span></td>`;
        }
    }
    return spansString;
}

// Animate single glyph (for variable font mode)
function animateGlyph(animState) {
    const now = Date.now();
    const deltaTime = now - animState.lastTime;
    animState.lastTime = now;

    // Update progress (use each glyph's own duration)
    animState.progress += deltaTime / animState.duration;

    if (animState.progress >= 1) {
        // Transition complete, set new targets
        animState.progress = 0;
        animState.currentValues = { ...animState.targetValues };

        // Randomize duration for next morph
        animState.duration = Math.random() * (selectedVariant.animationConfig.durationMax - selectedVariant.animationConfig.durationMin) + selectedVariant.animationConfig.durationMin;

        // Generate new random targets
        for (const [tag, range] of Object.entries(animState.glyphData.axisRanges)) {
            animState.targetValues[tag] = AutoFontVar.randomInRange(range.min, range.max);
        }
    } else {
        // Interpolate between current and target
        const t = easeInOutCubic(animState.progress);
        for (const tag of Object.keys(animState.currentValues)) {
            const current = animState.currentValues[tag];
            const target = animState.targetValues[tag];
            animState.currentValues[tag] = lerp(current, target, t);
        }
    }

    // Apply font-variation-settings
    const fontVariationSettings = Object.entries(animState.currentValues)
        .map(([tag, val]) => `"${tag}" ${Math.round(val)}`)
        .join(', ');

    const element = document.getElementById(animState.elementId);
    if (element) {
        element.style.fontVariationSettings = fontVariationSettings;
    }
}

// Main animation loop (for variable font mode)
function animate() {
    glyphAnimations.forEach(animState => animateGlyph(animState));
    requestAnimationFrame(animate);
}

// Initialize the table and layout
async function init() {
    // Initialize appropriate font library
    if (selectedVariant.type === 'variable') {
        await AutoFontVar.init();
    } else {
        await AutoFont.init();
    }

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

    // Start animation loop for variable fonts
    if (selectedVariant.type === 'variable') {
        // Wait a bit for fonts to load, then start animation
        setTimeout(() => {
            animate();
        }, 1000);
    }
}

// Create the table structure dynamically
function createTableStructure() {
    // Add Google Font imports
    const fontImport = document.createElement('style');
    if (selectedVariant.type === 'variable') {
        fontImport.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Noto+Emoji&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wdth,wght@62.5..100,100..900&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wdth,wght@62.5..100,100..900&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Armenian:wdth,wght@62.5..100,100..900&display=swap');
            @font-face {
                font-family: 'Noto Sans Full';
                src: url('../tff/NotoSans-Regular.ttf') format('truetype');
            }
        `;
    } else {
        fontImport.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Noto+Emoji&display=swap');

            @font-face {
                font-family: 'Noto Sans Full';
                src: url('../tff/NotoSans-Regular.ttf') format('truetype');
            }
        `;
    }
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
console.log('insert23.js loaded');
loadDependencies().then(() => jsWait());
