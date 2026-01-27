// insert27.js - Ghost Shapes (Full Recipes Edition)
console.log('insert27.js - Ghost Shapes loaded');

// ===== DEPENDENCY LOADING =====
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

async function loadDependencies() {
    await loadScript('../js_funct/autoFont.js');
    await loadScript('../js_glyph/2025_block_17/block_hex_17.js');
    await loadScript('../js_glyph/2025_block_17/block_hex_desc_17.js');
    await loadScript('../js_glyph/2025_block_17/block_lang_skeleton_17.js');
}

// ===== REQUIRED STUB =====
function changeHtmlDisplayInline() {
    // Required by g.us3.htm - leave empty
}

// ===== RECIPE DEFINITIONS =====
const RECIPES = [
    {
        name: 'Two Panels',
        layout: 'grid',
        panels: [
            { position: 'left', glyphs: 2000 },
            { position: 'right', glyphs: 2000 }
        ],
        centerCircle: { glyphs: 1000 }
    },
    {
        name: 'Dueling Circles',
        layout: 'dual-circles',
        circles: [
            { position: 'left', size: 400 },
            { position: 'right', size: 400 }
        ]
    },
    {
        name: 'Glyphajous',
        layout: 'lissajous-stripes'
    },
    {
        name: 'Infinite Glyph',
        layout: 'infinity',
        panels: [
            { position: 'left', glyphs: 2000 },
            { position: 'right', glyphs: 2000 }
        ],
        infinityLobes: { glyphs: 800 }
    },
    {
        name: 'The Quad',
        layout: 'quad-circles'
    },
    {
        name: 'Hemi Demi Semi - Left & Right',
        backgroundTextPrimary: true,
        shapes: [
            { type: 'half-circle-left', float: 'left', width: 550, height: 1100, fillGlyphs: 1050 },
            { type: 'half-circle-right', float: 'right', width: 550, height: 1100, fillGlyphs: 1050 }
        ]
    },
    {
        name: 'Hemi Demi Semi - Up & Down',
        shapes: [
            { type: 'half-circle-top', float: 'left', width: '70vw', height: '35vw', fillGlyphs: 1200 },
            { type: 'half-circle-bottom', float: 'right', width: '70vw', height: '35vw', fillGlyphs: 1700 }
        ]
    }
];

let currentRecipeIndex = -1;
let dataLoaded = false;
let currentAnimationId = null;
let colorAnimationId = null;
let recipeStats = {
    outside: {
        totalGlyphs: 0,
        blocks: new Set(),
        fonts: new Set()
    },
    inside: {
        totalGlyphs: 0,
        blocks: new Set(),
        fonts: new Set()
    }
};

// ===== COLOR UTILITIES =====
function hexToRgb(hex) {
    // Handle both 3-digit (#fff) and 6-digit (#ffffff) hex colors
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
        return {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        };
    }

    // Try 3-digit format
    result = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(hex);
    if (result) {
        return {
            r: parseInt(result[1] + result[1], 16),
            g: parseInt(result[2] + result[2], 16),
            b: parseInt(result[3] + result[3], 16)
        };
    }

    return null;
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
}

function hexToHsl(hex) {
    const rgb = hexToRgb(hex);
    return rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;
}

function interpolateHsl(hsl1, hsl2, t) {
    // Smooth easing function
    const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    return {
        h: hsl1.h + (hsl2.h - hsl1.h) * ease,
        s: hsl1.s + (hsl2.s - hsl1.s) * ease,
        l: hsl1.l + (hsl2.l - hsl1.l) * ease
    };
}

function hslToString(hsl) {
    return `hsl(${hsl.h.toFixed(1)}, ${hsl.s.toFixed(1)}%, ${hsl.l.toFixed(1)}%)`;
}

// ===== GLYPH GENERATION =====
function generateGlyphText(length, isInsideShape = false) {
    let html = '';
    const stats = isInsideShape ? recipeStats.inside : recipeStats.outside;

    for (let i = 0; i < length; i++) {
        try {
            const glyphData = AutoFont.generateGlyph(
                block_hex,
                block_hex_desc,
                block_lang,
                lang_font,
                false,
                null,
                null
            );
            const fontStack = glyphData.fontStack + ", 'Noto Emoji', 'Noto Sans Full'";
            html += `<span style="font-family: ${fontStack};">&#x${glyphData.glyph};</span>`;

            // Track stats - extract first font from fontStack
            stats.totalGlyphs++;
            stats.blocks.add(glyphData.block);
            // Parse fontStack to get the primary font (first in the stack)
            const primaryFont = glyphData.fontStack.split(',')[0].trim().replace(/['"]/g, '');
            stats.fonts.add(primaryFont);
        } catch (error) {
            // Skip failed glyphs
        }
    }
    return html;
}

function generateGlyphRows(glyphsPerRow, numRows, isInsideShape = false) {
    let html = '';
    const stats = isInsideShape ? recipeStats.inside : recipeStats.outside;

    for (let row = 0; row < numRows; row++) {
        html += '<div style="white-space: nowrap;">';
        for (let i = 0; i < glyphsPerRow; i++) {
            try {
                const glyphData = AutoFont.generateGlyph(
                    block_hex,
                    block_hex_desc,
                    block_lang,
                    lang_font,
                    false,
                    null,
                    null
                );
                const fontStack = glyphData.fontStack + ", 'Noto Emoji', 'Noto Sans Full'";
                html += `<span style="font-family: ${fontStack};">&#x${glyphData.glyph};</span>`;

                // Track stats - extract first font from fontStack
                stats.totalGlyphs++;
                stats.blocks.add(glyphData.block);
                // Parse fontStack to get the primary font (first in the stack)
                const primaryFont = glyphData.fontStack.split(',')[0].trim().replace(/['"]/g, '');
                stats.fonts.add(primaryFont);
            } catch (error) {
                html += ' ';
            }
        }
        html += '</div>';
    }
    return html;
}

// ===== STYLES =====
function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
        body {
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            font-family: 'Noto Sans', 'Arial Unicode MS', 'Segoe UI Symbol', sans-serif;
            line-height: 1.6;
            font-size: 22px;
        }

        .text-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            text-align: justify;
            overflow: hidden;
            padding: 0;
            box-sizing: border-box;
        }

        .ghost {
            margin: 0;
            overflow: hidden;
        }

        .ghost-fill {
            color: #000000;
            font-size: 20px;
            line-height: 1.2;
            letter-spacing: 0px;
            word-break: break-all;
            text-align: left;
            width: 100%;
            height: 100%;
            display: block;
            overflow: hidden;
            padding: 25px;
            border: 1px solid #999;
        }

        .ghost.circle {
            shape-outside: circle(50%);
            shape-margin: 15px;
            clip-path: circle(50%);
            border-radius: 50%;
        }

        .ghost.half-circle-left {
            shape-outside: circle(50% at 0% 50%);
            shape-margin: 15px;
            clip-path: circle(50% at 0% 50%);
        }

        .ghost.half-circle-right {
            shape-outside: circle(50% at 100% 50%);
            shape-margin: 15px;
            clip-path: circle(50% at 100% 50%);
        }

        .ghost.half-circle-top {
            shape-outside: circle(50% at 50% 0%);
            shape-margin: 15px;
            clip-path: circle(50% at 50% 0%);
        }

        .ghost.half-circle-bottom {
            shape-outside: circle(50% at 50% 100%);
            shape-margin: 15px;
            clip-path: circle(50% at 50% 100%);
        }

        .ghost.half-circle-top .ghost-fill,
        .ghost.half-circle-bottom .ghost-fill,
        .ghost.half-circle-left .ghost-fill,
        .ghost.half-circle-right .ghost-fill {
            padding: 0;
            border: 15px solid var(--bg-color, #fff);
        }

        .ghost.half-circle-top {
            position: fixed;
            top: 0;
            left: 0;
        }

        .ghost.half-circle-bottom {
            position: fixed;
            bottom: 0;
            right: 0;
        }

        .glyph-text {
            word-wrap: break-word;
            word-break: break-all;
            letter-spacing: 1px;
            position: relative;
            z-index: 1;
            display: block;
            width: 100%;
            height: 100%;
        }

        .recipe-info {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: transparent;
            border: 2px solid var(--primary-color, #cc0000);
            color: var(--primary-color, #cc0000);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 12px;
            font-family: monospace;
            z-index: 10000;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            overflow: hidden;
            white-space: nowrap;
        }

        .recipe-info.expanded {
            width: auto;
            height: auto;
            padding: 10px 15px;
            border-radius: 20px;
            background: var(--primary-color, #cc0000);
            color: var(--info-text-color, #fff);
        }

        .recipe-info .label {
            display: none;
        }

        .recipe-info.expanded .label {
            display: block;
        }

        .recipe-info .recipe-name {
            font-weight: bold;
            margin-bottom: 5px;
        }

        .recipe-info .recipe-stats {
            font-size: 9px;
            line-height: 1.3;
            opacity: 0.9;
        }

        .recipe-info .recipe-stats strong {
            font-size: 10px;
        }

        .recipe-info .icon {
            font-size: 16px;
        }

        .recipe-info.expanded .icon {
            display: none;
        }

        .grid-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            display: grid;
            grid-template-columns: 1fr 1fr;
            width: 100vw;
            height: 100vh;
        }

        .panel {
            padding: 0 20px;
            overflow: hidden;
            word-break: break-all;
        }

        .panel-left { text-align: right; }
        .panel-right { text-align: left; }

        .panel-left .quarter-top {
            float: right;
            width: 200px;
            height: 200px;
            shape-outside: circle(200px at 100% 100%);
            margin-top: calc(50vh - 200px);
        }

        .panel-left .quarter-bottom {
            float: right;
            clear: right;
            width: 200px;
            height: 200px;
            shape-outside: circle(200px at 100% 0%);
        }

        .panel-right .quarter-top {
            float: left;
            width: 200px;
            height: 200px;
            shape-outside: circle(200px at 0% 100%);
            margin-top: calc(50vh - 200px);
        }

        .panel-right .quarter-bottom {
            float: left;
            clear: left;
            width: 200px;
            height: 200px;
            shape-outside: circle(200px at 0% 0%);
        }

        .dual-grid-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            display: flex;
            width: 100vw;
            height: 100vh;
        }

        .half-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            width: 50vw;
            height: 100vh;
        }

        .half-grid.left-half {
            border-right: 1px solid #cc0000;
        }

        .mini-panel {
            padding: 0 20px;
            overflow: hidden;
            word-break: break-all;
        }

        .quarter-br-corner {
            float: right;
            width: 200px;
            height: 200px;
            shape-outside: circle(200px at 100% 100%);
            shape-margin: 5px;
        }
        .quarter-bl-corner {
            float: left;
            width: 200px;
            height: 200px;
            shape-outside: circle(200px at 0% 100%);
            shape-margin: 5px;
        }
        .quarter-tr-corner {
            float: right;
            width: 200px;
            height: 200px;
            shape-outside: circle(200px at 100% 0%);
            shape-margin: 5px;
        }
        .quarter-tl-corner {
            float: left;
            width: 200px;
            height: 200px;
            shape-outside: circle(200px at 0% 0%);
            shape-margin: 5px;
        }

        .left-half .mini-tl { text-align: right; }
        .left-half .mini-tr { text-align: left; }
        .left-half .mini-bl { text-align: right; }
        .left-half .mini-br { text-align: left; }

        .left-half .mini-tl .quarter { margin-top: calc(50vh - 200px); }
        .left-half .mini-tr .quarter { margin-top: calc(50vh - 200px); }

        .right-half .mini-tl { text-align: right; }
        .right-half .mini-tr { text-align: left; }
        .right-half .mini-bl { text-align: right; }
        .right-half .mini-br { text-align: left; }

        .right-half .mini-tl .quarter { margin-top: calc(50vh - 200px); }
        .right-half .mini-tr .quarter { margin-top: calc(50vh - 200px); }

        .circle-left {
            position: fixed;
            left: 25vw;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 400px;
            height: 400px;
            border-radius: 50%;
            border: 2px solid #999;
            z-index: 10;
            overflow: hidden;
            background: #cc0000;
            color: #fff;
            font-size: 18px;
            line-height: 1.3;
            text-align: center;
        }

        .circle-right {
            position: fixed;
            left: 75vw;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 400px;
            height: 400px;
            border-radius: 50%;
            border: 2px solid #999;
            z-index: 10;
            overflow: hidden;
            background: #cc0000;
            color: #fff;
            font-size: 18px;
            line-height: 1.3;
            text-align: center;
        }

        .quad-grid-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            width: 100vw;
            height: 100vh;
            border: 3px solid #cc0000;
            border-radius: 40px;
            overflow: hidden;
            box-sizing: border-box;
            background: #fff;
        }

        .quadrant {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
        }

        .quadrant.quad-tl {
            border-right: 4px double #cc0000;
            border-bottom: 4px double #cc0000;
        }
        .quadrant.quad-tr {
            border-bottom: 4px double #cc0000;
        }
        .quadrant.quad-bl {
            border-right: 4px double #cc0000;
        }

        .quad-panel {
            padding: 0 10px;
            overflow: hidden;
            word-break: break-all;
        }

        .quadrant .quad-tl { text-align: right; }
        .quadrant .quad-tr { text-align: left; }
        .quadrant .quad-bl { text-align: right; padding-top: 150px; }
        .quadrant .quad-br { text-align: left; padding-top: 150px; }

        .quarter-br-corner-quad {
            float: right;
            width: 150px;
            height: 150px;
            shape-outside: circle(150px at 100% 100%);
            shape-margin: 10px;
        }
        .quarter-bl-corner-quad {
            float: left;
            width: 150px;
            height: 150px;
            shape-outside: circle(150px at 0% 100%);
            shape-margin: 10px;
        }
        .quarter-tr-corner-quad {
            float: right;
            width: 150px;
            height: 150px;
            shape-outside: circle(150px at 100% 0%);
            shape-margin: 10px;
        }
        .quarter-tl-corner-quad {
            float: left;
            width: 150px;
            height: 150px;
            shape-outside: circle(150px at 0% 0%);
            shape-margin: 10px;
        }

        .quadrant .quad-tl .quarter { margin-top: calc(22vh - 150px); }
        .quadrant .quad-tr .quarter { margin-top: calc(22vh - 150px); }

        .circle-quad-tl, .circle-quad-tr, .circle-quad-bl, .circle-quad-br {
            position: fixed;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            border: 3px solid #000;
            z-index: 10;
            overflow: hidden;
            background: #cc0000;
            color: #fff;
            font-size: 18px;
            line-height: 1.2;
            text-align: center;
            transform: translate(-50%, -50%);
        }

        .circle-quad-tl {
            left: 25vw;
            top: 22vh;
        }
        .circle-quad-tr {
            left: 75vw;
            top: 22vh;
        }
        .circle-quad-bl {
            left: 25vw;
            top: 75vh;
        }
        .circle-quad-br {
            left: 75vw;
            top: 75vh;
        }

        .center-circle {
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 400px;
            height: 400px;
            border-radius: 50%;
            border: 2px solid #999;
            z-index: 10;
            overflow: hidden;
            background: #cc0000;
            color: #fff;
            font-size: 18px;
            line-height: 1.3;
            padding: 0;
            text-align: center;
        }

        .infinity-grid-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            display: grid;
            grid-template-columns: 1fr 1fr;
            width: 100vw;
            height: 100vh;
        }

        .infinity-panel {
            padding: 0 20px;
            overflow: hidden;
            word-break: break-all;
        }

        .infinity-panel-left { text-align: right; }
        .infinity-panel-right { text-align: left; }

        .infinity-panel-left .infinity-quarter-top {
            float: right;
            width: 240px;
            height: 240px;
            shape-outside: circle(240px at 100% 100%);
            margin-top: calc(50vh - 240px);
        }
        .infinity-panel-left .infinity-quarter-bottom {
            float: right;
            clear: right;
            width: 240px;
            height: 240px;
            shape-outside: circle(240px at 100% 0%);
        }

        .infinity-panel-right .infinity-quarter-top {
            float: left;
            width: 240px;
            height: 240px;
            shape-outside: circle(240px at 0% 100%);
            margin-top: calc(50vh - 240px);
        }
        .infinity-panel-right .infinity-quarter-bottom {
            float: left;
            clear: left;
            width: 240px;
            height: 240px;
            shape-outside: circle(240px at 0% 0%);
        }

        .center-infinity {
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 509px;
            height: 240px;
            z-index: 10;
            box-sizing: content-box;
        }

        .center-infinity::before,
        .center-infinity::after {
            content: "";
            box-sizing: content-box;
            position: absolute;
            top: 0;
            left: 0;
            width: 144px;
            height: 144px;
            border: 48px solid var(--infinity-color, #cc0000);
            border-radius: 120px 120px 0 120px;
            transform: rotate(-45deg);
        }

        .center-infinity::after {
            left: auto;
            right: 0;
            border-radius: 120px 120px 120px 0;
            transform: rotate(45deg);
        }

        .infinity-glow {
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 200vmax;
            height: 200vmax;
            background: radial-gradient(circle at center, var(--glow-color, rgba(204, 0, 0, 0.6)) 0%, var(--glow-color-mid, rgba(204, 0, 0, 0.35)) 30%, var(--glow-color-outer, rgba(204, 0, 0, 0.15)) 60%, transparent 90%);
            z-index: 5;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
}

// ===== DOM CREATION =====
function createDOM() {
    // Create elements without wiping body (preserve watermarks)
    const textContainer = document.createElement('div');
    textContainer.className = 'text-container';

    const textSpan = document.createElement('span');
    textSpan.className = 'glyph-text';
    textSpan.id = 'text';

    textContainer.appendChild(textSpan);

    const gridContainer = document.createElement('div');
    gridContainer.id = 'gridContainer';
    gridContainer.style.display = 'none';
    gridContainer.style.position = 'fixed';
    gridContainer.style.top = '0';
    gridContainer.style.left = '0';
    gridContainer.style.width = '100vw';
    gridContainer.style.height = '100vh';

    const recipeInfo = document.createElement('div');
    recipeInfo.className = 'recipe-info';
    recipeInfo.id = 'recipeInfo';
    recipeInfo.innerHTML = `
        <span class="icon">i</span>
        <div class="label">
            <div class="recipe-name"></div>
            <div class="recipe-stats"></div>
        </div>
    `;

    // Add click handler for recipe info
    recipeInfo.addEventListener('click', function() {
        this.classList.toggle('expanded');
    });

    // Append to body (preserves existing elements like watermarks)
    document.body.appendChild(textContainer);
    document.body.appendChild(gridContainer);
    document.body.appendChild(recipeInfo);
}

// ===== RENDER RECIPE =====
function renderRecipe(recipeIndex) {
    if (!dataLoaded) return;

    currentRecipeIndex = recipeIndex;
    const recipe = RECIPES[recipeIndex];
    const textContainer = document.querySelector('.text-container');
    const gridContainer = document.getElementById('gridContainer');
    const recipeInfo = document.getElementById('recipeInfo');

    // Cancel animations
    if (currentAnimationId) {
        cancelAnimationFrame(currentAnimationId);
        currentAnimationId = null;
    }
    if (colorAnimationId) {
        cancelAnimationFrame(colorAnimationId);
        colorAnimationId = null;
    }

    // Clear content
    gridContainer.innerHTML = '';
    const textSpan = document.getElementById('text');
    if (textSpan) textSpan.innerHTML = '';

    // Small delay for garbage collection
    setTimeout(() => {
        renderRecipeContent(recipe, textContainer, gridContainer, textSpan, recipeInfo, recipeIndex);
    }, 50);
}

function renderRecipeContent(recipe, textContainer, gridContainer, textSpan, recipeInfo, recipeIndex) {
    // Reset stats
    recipeStats.outside = {
        totalGlyphs: 0,
        blocks: new Set(),
        fonts: new Set()
    };
    recipeStats.inside = {
        totalGlyphs: 0,
        blocks: new Set(),
        fonts: new Set()
    };

    // Random colors
    const primaryColors = ['#cc0000', '#0066cc', '#009933', '#ff6600', '#9933cc', '#b56b8c', '#006666', '#daa520'];
    const primaryColor = primaryColors[Math.floor(Math.random() * primaryColors.length)];
    const inverted = Math.random() > 0.5;
    const bgColor = inverted ? '#000' : '#fff';
    const textColor = inverted ? '#fff' : '#000';
    const circleTextColor = inverted ? '#000' : '#fff';

    document.body.style.background = bgColor;

    if (recipe.layout === 'grid') {
        textContainer.style.display = 'none';
        gridContainer.style.display = 'block';

        let html = `<div class="grid-wrapper" style="background: ${bgColor};">`;

        recipe.panels.forEach(panel => {
            const panelGlyphs = generateGlyphText(panel.glyphs, false); // false = outside shapes
            html += `
                <div class="panel panel-${panel.position}" style="color: ${textColor};">
                    <div class="quarter-top"></div>
                    <div class="quarter-bottom"></div>
                    <span class="text">${panelGlyphs}</span>
                </div>`;
        });

        html += '</div>';

        if (recipe.centerCircle) {
            const centerGlyphs = generateGlyphRows(50, 30, true); // true = inside shape
            html += `<div class="center-circle" style="background: ${primaryColor}; color: ${circleTextColor}; border: 3px solid ${textColor};">${centerGlyphs}</div>`;
        }

        gridContainer.innerHTML = html;

        // Start text color animation
        setTimeout(() => {
            startColorAnimation(textColor, primaryColor, ['.panel .text span']);
        }, 100);
    } else if (recipe.layout === 'dual-circles') {
        textContainer.style.display = 'none';
        gridContainer.style.display = 'block';

        const panelGlyphs = [];
        for (let i = 0; i < 8; i++) {
            panelGlyphs.push(generateGlyphText(500, false)); // false = outside shapes
        }

        const circleGlyphs = generateGlyphRows(50, 30, true); // true = inside shape
        const circleGlyphs2 = generateGlyphRows(50, 30, true); // true = inside shape

        let html = `<div class="dual-grid-wrapper" style="background: ${bgColor};">`;

        html += `<div class="half-grid left-half" style="border-color: ${primaryColor};">`;
        html += `<div class="mini-panel mini-tl" style="color: ${textColor};"><div class="quarter quarter-br-corner"></div><span class="text">${panelGlyphs[0]}</span></div>`;
        html += `<div class="mini-panel mini-tr" style="color: ${textColor};"><div class="quarter quarter-bl-corner"></div><span class="text">${panelGlyphs[1]}</span></div>`;
        html += `<div class="mini-panel mini-bl" style="color: ${textColor};"><div class="quarter quarter-tr-corner"></div><span class="text">${panelGlyphs[2]}</span></div>`;
        html += `<div class="mini-panel mini-br" style="color: ${textColor};"><div class="quarter quarter-tl-corner"></div><span class="text">${panelGlyphs[3]}</span></div>`;
        html += '</div>';

        html += '<div class="half-grid right-half">';
        html += `<div class="mini-panel mini-tl" style="color: ${textColor};"><div class="quarter quarter-br-corner"></div><span class="text">${panelGlyphs[4]}</span></div>`;
        html += `<div class="mini-panel mini-tr" style="color: ${textColor};"><div class="quarter quarter-bl-corner"></div><span class="text">${panelGlyphs[5]}</span></div>`;
        html += `<div class="mini-panel mini-bl" style="color: ${textColor};"><div class="quarter quarter-tr-corner"></div><span class="text">${panelGlyphs[6]}</span></div>`;
        html += `<div class="mini-panel mini-br" style="color: ${textColor};"><div class="quarter quarter-tl-corner"></div><span class="text">${panelGlyphs[7]}</span></div>`;
        html += '</div>';

        html += '</div>';

        html += `<div class="circle-left" style="background: ${primaryColor}; color: ${circleTextColor}; border: 3px solid ${textColor};">${circleGlyphs}</div>`;
        html += `<div class="circle-right" style="background: ${primaryColor}; color: ${circleTextColor}; border: 3px solid ${textColor};">${circleGlyphs2}</div>`;

        gridContainer.innerHTML = html;

        // Start text color animation (delay to ensure DOM is ready)
        setTimeout(() => {
            startColorAnimation(textColor, primaryColor, ['.mini-panel .text span']);
        }, 100);
    } else if (recipe.layout === 'lissajous-stripes') {
        textContainer.style.display = 'none';
        gridContainer.style.display = 'block';
        document.body.style.background = bgColor;

        const lissajousPool = [
            {a: 1, b: 2, phase: Math.PI/2},
            {a: 1, b: 3, phase: 0},
            {a: 2, b: 3, phase: Math.PI/2},
            {a: 1, b: 4, phase: Math.PI/2},
            {a: 3, b: 4, phase: 0},
            {a: 1, b: 5, phase: 0},
            {a: 2, b: 5, phase: Math.PI/2},
            {a: 3, b: 5, phase: 0},
            {a: 4, b: 5, phase: Math.PI/2},
            {a: 1, b: 6, phase: 0},
            {a: 5, b: 6, phase: Math.PI/2},
            {a: 1, b: 7, phase: 0},
            {a: 2, b: 7, phase: Math.PI/2},
            {a: 3, b: 7, phase: 0},
            {a: 4, b: 7, phase: Math.PI/2},
            {a: 5, b: 7, phase: 0},
            {a: 6, b: 7, phase: Math.PI/2},
            {a: 1, b: 8, phase: 0},
            {a: 3, b: 8, phase: Math.PI/2},
            {a: 5, b: 8, phase: 0},
            {a: 7, b: 8, phase: Math.PI/2}
        ];

        const ratio = lissajousPool[Math.floor(Math.random() * lissajousPool.length)];
        const animSpeed = 0.0005 + Math.random() * 0.001;

        const stripeGlyphs1 = generateGlyphText(400, false); // false = outside shapes
        const stripeGlyphs2 = generateGlyphText(410, false); // false = outside shapes
        const stripeGlyphs3 = generateGlyphText(475, false); // false = outside shapes

        const ballStyle = `width:120px;height:120px;border-radius:50%;background:${primaryColor};border:3px solid ${textColor};shape-outside:circle(50%);shape-margin:10px;`;

        let html = '<div style="display:flex;flex-direction:column;width:100vw;height:100vh;">';

        html += `<div class="stripe-text" style="height:24vh;overflow:hidden;color:${textColor};word-break:break-all;padding:5px 10px;">`;
        html += `<div style="${ballStyle}float:left;margin-right:15px;"></div>`;
        html += `<div style="${ballStyle}float:right;margin-left:15px;"></div>`;
        html += stripeGlyphs1;
        html += '</div>';

        html += '<div style="height:14vh;display:flex;">';
        for (let i = 0; i < 8; i++) {
            html += `<div style="width:12.5%;height:100%;display:flex;align-items:center;justify-content:center;">`;
            html += `<svg class="lissajous" data-a="${ratio.a}" data-b="${ratio.b}" data-phase="${ratio.phase}" viewBox="0 0 100 120" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%;">
                <polyline fill="none" stroke="${primaryColor}" stroke-width="2"/>
            </svg>`;
            html += '</div>';
        }
        html += '</div>';

        html += `<div class="stripe-text" style="height:24vh;overflow:hidden;color:${textColor};word-break:break-all;padding:5px 10px;">`;
        html += `<div style="${ballStyle}float:left;margin-right:15px;"></div>`;
        html += `<div style="${ballStyle}float:right;margin-left:15px;"></div>`;
        html += stripeGlyphs2;
        html += '</div>';

        html += '<div style="height:14vh;display:flex;">';
        for (let i = 0; i < 8; i++) {
            html += `<div style="width:12.5%;height:100%;display:flex;align-items:center;justify-content:center;">`;
            html += `<svg class="lissajous" data-a="${ratio.a}" data-b="${ratio.b}" data-phase="${ratio.phase}" viewBox="0 0 100 120" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%;">
                <polyline fill="none" stroke="${primaryColor}" stroke-width="2"/>
            </svg>`;
            html += '</div>';
        }
        html += '</div>';

        html += `<div class="stripe-text" style="height:24vh;overflow:hidden;color:${textColor};word-break:break-all;padding:5px 10px;">`;
        html += `<div style="${ballStyle}float:left;margin-right:15px;"></div>`;
        html += `<div style="${ballStyle}float:right;margin-left:15px;"></div>`;
        html += stripeGlyphs3;
        html += '</div>';

        html += '</div>';

        gridContainer.innerHTML = html;

        // Start text color animation
        setTimeout(() => {
            startColorAnimation(textColor, primaryColor, ['.stripe-text span']);
        }, 100);

        // Animate
        let time = 0;
        const TWO_PI = Math.PI * 2;
        function animateLissajous() {
            time += animSpeed;
            const phaseOffset = Math.sin(time) * 0.5;

            const svgs = gridContainer.querySelectorAll('.lissajous');
            svgs.forEach(svg => {
                const a = parseFloat(svg.dataset.a);
                const b = parseFloat(svg.dataset.b);
                const basePhase = parseFloat(svg.dataset.phase);
                const polyline = svg.querySelector('polyline');
                const points = [];
                const padding = 10;
                for (let t = 0; t <= TWO_PI; t += 0.02) {
                    const x = padding + 40 * (1 + Math.sin(a * t + basePhase + phaseOffset));
                    const y = padding + 50 * (1 + Math.sin(b * t));
                    points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
                }
                polyline.setAttribute('points', points.join(' '));
            });
            currentAnimationId = requestAnimationFrame(animateLissajous);
        }
        animateLissajous();
    } else if (recipe.layout === 'infinity') {
        textContainer.style.display = 'none';
        gridContainer.style.display = 'block';

        const infinityBgColor = '#000';
        const infinityTextColor = '#fff';

        let html = `<div class="infinity-grid-wrapper" style="background: ${infinityBgColor};">`;

        recipe.panels.forEach(panel => {
            const panelGlyphs = generateGlyphText(panel.glyphs, false); // false = outside shapes
            html += `
                <div class="infinity-panel infinity-panel-${panel.position}" style="color: ${infinityTextColor};">
                    <div class="infinity-quarter-top"></div>
                    <div class="infinity-quarter-bottom"></div>
                    <span class="text">${panelGlyphs}</span>
                </div>`;
        });

        html += '</div>';
        html += `<div class="infinity-glow" id="infinityGlow"></div>`;
        html += `<div class="center-infinity" id="infinityShape"></div>`;

        gridContainer.innerHTML = html;

        const infinityEl = document.getElementById('infinityShape');
        const glowEl = document.getElementById('infinityGlow');
        let hue = Math.random() * 360;

        // Start text color animation (white to infinity color)
        setTimeout(() => {
            startColorAnimation(infinityTextColor, '#ff0000', ['.infinity-panel .text span']);
        }, 100);

        function animateInfinityColor() {
            hue = (hue + 0.02) % 360;
            infinityEl.style.setProperty('--infinity-color', `hsl(${hue}, 70%, 50%)`);
            glowEl.style.setProperty('--glow-color', `hsla(${hue}, 70%, 50%, 0.6)`);
            glowEl.style.setProperty('--glow-color-mid', `hsla(${hue}, 70%, 50%, 0.35)`);
            glowEl.style.setProperty('--glow-color-outer', `hsla(${hue}, 70%, 50%, 0.15)`);
            currentAnimationId = requestAnimationFrame(animateInfinityColor);
        }
        animateInfinityColor();
    } else if (recipe.layout === 'quad-circles') {
        textContainer.style.display = 'none';
        gridContainer.style.display = 'block';
        document.body.style.background = primaryColor;

        const panelGlyphs = [];
        for (let i = 0; i < 16; i++) {
            panelGlyphs.push(generateGlyphText(700, false)); // false = outside shapes
        }

        const circleGlyphs1 = generateGlyphRows(25, 22, true); // true = inside shape
        const circleGlyphs2 = generateGlyphRows(25, 22, true); // true = inside shape
        const circleGlyphs3 = generateGlyphRows(25, 22, true); // true = inside shape
        const circleGlyphs4 = generateGlyphRows(25, 22, true); // true = inside shape

        let html = `<div class="quad-grid-wrapper" style="background: ${bgColor}; border-color: ${primaryColor};">`;

        html += `<div class="quadrant quad-tl" style="border-color: ${primaryColor};">`;
        html += `<div class="quad-panel quad-tl" style="color: ${textColor};"><div class="quarter quarter-br-corner-quad"></div><span class="text">${panelGlyphs[0]}</span></div>`;
        html += `<div class="quad-panel quad-tr" style="color: ${textColor};"><div class="quarter quarter-bl-corner-quad"></div><span class="text">${panelGlyphs[1]}</span></div>`;
        html += `<div class="quad-panel quad-bl" style="color: ${textColor};"><div class="quarter quarter-tr-corner-quad"></div><span class="text">${panelGlyphs[2]}</span></div>`;
        html += `<div class="quad-panel quad-br" style="color: ${textColor};"><div class="quarter quarter-tl-corner-quad"></div><span class="text">${panelGlyphs[3]}</span></div>`;
        html += '</div>';

        html += `<div class="quadrant quad-tr" style="border-color: ${primaryColor};">`;
        html += `<div class="quad-panel quad-tl" style="color: ${textColor};"><div class="quarter quarter-br-corner-quad"></div><span class="text">${panelGlyphs[4]}</span></div>`;
        html += `<div class="quad-panel quad-tr" style="color: ${textColor};"><div class="quarter quarter-bl-corner-quad"></div><span class="text">${panelGlyphs[5]}</span></div>`;
        html += `<div class="quad-panel quad-bl" style="color: ${textColor};"><div class="quarter quarter-tr-corner-quad"></div><span class="text">${panelGlyphs[6]}</span></div>`;
        html += `<div class="quad-panel quad-br" style="color: ${textColor};"><div class="quarter quarter-tl-corner-quad"></div><span class="text">${panelGlyphs[7]}</span></div>`;
        html += '</div>';

        html += `<div class="quadrant quad-bl" style="border-color: ${primaryColor};">`;
        html += `<div class="quad-panel quad-tl" style="color: ${textColor};"><div class="quarter quarter-br-corner-quad"></div><span class="text">${panelGlyphs[8]}</span></div>`;
        html += `<div class="quad-panel quad-tr" style="color: ${textColor};"><div class="quarter quarter-bl-corner-quad"></div><span class="text">${panelGlyphs[9]}</span></div>`;
        html += `<div class="quad-panel quad-bl" style="color: ${textColor};"><div class="quarter quarter-tr-corner-quad"></div><span class="text">${panelGlyphs[10]}</span></div>`;
        html += `<div class="quad-panel quad-br" style="color: ${textColor};"><div class="quarter quarter-tl-corner-quad"></div><span class="text">${panelGlyphs[11]}</span></div>`;
        html += '</div>';

        html += `<div class="quadrant quad-br" style="border-color: ${primaryColor};">`;
        html += `<div class="quad-panel quad-tl" style="color: ${textColor};"><div class="quarter quarter-br-corner-quad"></div><span class="text">${panelGlyphs[12]}</span></div>`;
        html += `<div class="quad-panel quad-tr" style="color: ${textColor};"><div class="quarter quarter-bl-corner-quad"></div><span class="text">${panelGlyphs[13]}</span></div>`;
        html += `<div class="quad-panel quad-bl" style="color: ${textColor};"><div class="quarter quarter-tr-corner-quad"></div><span class="text">${panelGlyphs[14]}</span></div>`;
        html += `<div class="quad-panel quad-br" style="color: ${textColor};"><div class="quarter quarter-tl-corner-quad"></div><span class="text">${panelGlyphs[15]}</span></div>`;
        html += '</div>';

        html += '</div>';

        html += `<div class="circle-quad-tl" style="background: ${primaryColor}; color: ${circleTextColor}; border-color: ${textColor};">${circleGlyphs1}</div>`;
        html += `<div class="circle-quad-tr" style="background: ${primaryColor}; color: ${circleTextColor}; border-color: ${textColor};">${circleGlyphs2}</div>`;
        html += `<div class="circle-quad-bl" style="background: ${primaryColor}; color: ${circleTextColor}; border-color: ${textColor};">${circleGlyphs3}</div>`;
        html += `<div class="circle-quad-br" style="background: ${primaryColor}; color: ${circleTextColor}; border-color: ${textColor};">${circleGlyphs4}</div>`;

        gridContainer.innerHTML = html;

        // Start text color animation
        setTimeout(() => {
            startColorAnimation(textColor, primaryColor, ['.quad-panel .text span']);
        }, 100);
    } else {
        textContainer.style.display = 'block';
        gridContainer.style.display = 'none';
        document.body.style.background = bgColor;
        document.body.style.setProperty('--bg-color', bgColor);
        textContainer.style.color = recipe.backgroundTextPrimary ? primaryColor : textColor;

        const textSpan = document.getElementById('text');
        textSpan.innerHTML = '';

        let html = '';
        if (recipe.shapes) {
            recipe.shapes.forEach((shape) => {
                const fillGlyphs = generateGlyphText(shape.fillGlyphs, true); // true = inside shape
                const width = typeof shape.width === 'number' ? `${shape.width}px` : shape.width;
                const height = typeof shape.height === 'number' ? `${shape.height}px` : shape.height;

                const style = `
                    width: ${width};
                    height: ${height};
                    float: ${shape.float};
                    background: ${primaryColor};
                `.trim();

                html += `<span class="ghost ${shape.type}" style="${style}">
                    <span class="ghost-fill" style="color: ${circleTextColor}; border-color: ${textColor};">${fillGlyphs}</span>
                </span>`;
            });
        }

        html += generateGlyphText(4000, false); // false = outside shapes
        textSpan.innerHTML = html;

        // Start text color animation (morph between default color and shape color)
        // Target individual glyph spans, excluding ghost shapes (they have inline styles)
        setTimeout(() => {
            startColorAnimation(textColor, primaryColor, ['#text > span:not(.ghost)']);
        }, 100);
    }

    // Update info box with 1-based indexing and stats
    recipeInfo.querySelector('.recipe-name').textContent = `Recipe ${recipeIndex + 1}/${RECIPES.length}: ${recipe.name}`;

    let statsHtml = '';
    if (recipeStats.inside.totalGlyphs > 0) {
        // Has shapes - calculate unique totals (union of both sets)
        const totalGlyphs = recipeStats.inside.totalGlyphs + recipeStats.outside.totalGlyphs;
        const uniqueBlocks = new Set([...recipeStats.inside.blocks, ...recipeStats.outside.blocks]);
        const uniqueFonts = new Set([...recipeStats.inside.fonts, ...recipeStats.outside.fonts]);

        statsHtml = `
            <strong>Inside shapes:</strong><br>
            ${recipeStats.inside.totalGlyphs.toLocaleString()} glyphs,
            ${recipeStats.inside.fonts.size} fonts<br>
            <strong>Outside shapes:</strong><br>
            ${recipeStats.outside.totalGlyphs.toLocaleString()} glyphs,
            ${recipeStats.outside.fonts.size} fonts<br>
            <strong>Total unique:</strong><br>
            ${totalGlyphs.toLocaleString()} glyphs,
            ${uniqueBlocks.size} blocks,
            ${uniqueFonts.size} fonts
        `;
    } else {
        // No shapes
        statsHtml = `
            ${recipeStats.outside.totalGlyphs.toLocaleString()} glyphs<br>
            ${recipeStats.outside.blocks.size} blocks<br>
            ${recipeStats.outside.fonts.size} fonts
        `;
    }

    recipeInfo.querySelector('.recipe-stats').innerHTML = statsHtml;
    recipeInfo.style.setProperty('--primary-color', primaryColor);
    recipeInfo.style.setProperty('--info-text-color', textColor);
}

// ===== COLOR ANIMATION =====
function startColorAnimation(textColor, shapeColor, selectors) {
    const hsl1 = hexToHsl(textColor);
    const hsl2 = hexToHsl(shapeColor);

    if (!hsl1 || !hsl2) {
        console.log('Aborting: hsl conversion failed');
        return;
    }

    // Collect all elements and assign each a random speed
    const glyphData = [];
    selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            glyphData.push({
                element: el,
                time: -Math.PI / 2,  // All start at base color (sin(-π/2) = -1, giving t=0)
                speed: 0.005 + Math.random() * 0.04  // Random speed between 0.005 and 0.045 (9x range)
            });
        });
    });

    function animateColors() {
        // Each glyph has its own time counter that advances at its own speed
        glyphData.forEach((data) => {
            data.time += data.speed;
            const t = (Math.sin(data.time) + 1) / 2; // Oscillate between 0 and 1
            const currentHsl = interpolateHsl(hsl1, hsl2, t);
            const colorString = hslToString(currentHsl);
            data.element.style.color = colorString;
        });

        colorAnimationId = requestAnimationFrame(animateColors);
    }

    animateColors();
}

// ===== KEYBOARD =====
function setupKeyboard() {
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        if (key >= '0' && key <= '9') {
            const index = parseInt(key);
            if (index < RECIPES.length) {
                renderRecipe(index);
            }
        }
    });
}

// ===== URL PARAMETER =====
function getRecipeFromURL() {
    const params = new URLSearchParams(window.location.search);
    const recipe = params.get('recipe');
    if (recipe !== null) {
        const index = parseInt(recipe);
        if (!isNaN(index) && index >= 0 && index < RECIPES.length) {
            return index;
        }
    }
    return null;
}

// ===== INIT =====
async function init() {
    await AutoFont.init();
    dataLoaded = true;

    injectStyles();
    createDOM();
    setupKeyboard();

    // Check URL parameter first, then fall back to random
    const urlRecipe = getRecipeFromURL();
    const recipeIndex = urlRecipe !== null ? urlRecipe : Math.floor(Math.random() * RECIPES.length);
    renderRecipe(recipeIndex);
}

// ===== WAIT AND START =====
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

loadDependencies().then(() => jsWait());
