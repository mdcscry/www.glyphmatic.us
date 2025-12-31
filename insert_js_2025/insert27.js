// Ghost Shapes - AutoFont Edition
console.log('insert27.js - Ghost Shapes loaded');

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
        // Load autoFont library
        await loadScript('../js_funct/autoFont.js');

        // Load full Unicode variant data files
        await loadScript('../js_glyph/2025_block_17/block_hex_17.js');
        await loadScript('../js_glyph/2025_block_17/block_hex_desc_17.js');
        await loadScript('../js_glyph/2025_block_17/block_lang_skeleton_17.js');

        console.log('insert27 - All dependencies loaded');
    } catch (error) {
        console.error('insert27 - Error loading dependencies:', error);
    }
}

// Wait for dependencies
function jsWait() {
    const ready = typeof blockHexWait !== "undefined" &&
                  typeof blockHexDescWait !== "undefined" &&
                  typeof blockHexSkeletonWait !== "undefined" &&
                  typeof AutoFont !== "undefined";

    if (!ready) {
        window.setTimeout(jsWait, 100);
    } else {
        init();
    }
}

// Generate glyph text using AutoFont
function generateGlyphText(length) {
    let text = '';
    for (let i = 0; i < length; i++) {
        try {
            const glyphData = AutoFont.generateGlyph(
                block_hex,
                block_hex_desc,
                block_lang,
                lang_font,
                false, // testMode
                null,  // testOptions
                null   // exclusions
            );
            text += String.fromCodePoint(parseInt(glyphData.glyph, 16));
            if (Math.random() < 0.05) text += ' ';
        } catch (error) {
            // On error, add a space
            text += ' ';
        }
    }
    return text;
}

// Ghost shapes configuration with approximate glyph counts for fill
const ghosts = [
    { class: 'circle', fill: 180 },
    { class: 'circle-sm', fill: 80 },
    { class: 'circle-lg', fill: 300 },
    { class: 'ellipse', fill: 200 },
    { class: 'ellipse-wide', fill: 180 },
    { class: 'triangle', fill: 150 },
    { class: 'triangle-inv', fill: 140 },
    { class: 'triangle-right', fill: 110 },
    { class: 'triangle-left', fill: 110 },
    { class: 'diamond', fill: 160 },
    { class: 'pentagon', fill: 170 },
    { class: 'hexagon', fill: 180 },
    { class: 'octagon', fill: 190 },
    { class: 'star', fill: 200 },
    { class: 'cross', fill: 140 },
    { class: 'arrow-right', fill: 130 },
    { class: 'arrow-left', fill: 130 },
    { class: 'heart', fill: 170 },
    { class: 'blob', fill: 220 },
    { class: 'blob2', fill: 190 },
    { class: 'crescent', fill: 140 },
    { class: 'trapezoid', fill: 160 },
    { class: 'parallelogram', fill: 150 },
    { class: 'leaf', fill: 180 },
    { class: 'drop', fill: 140 }
];

// Create styles
function createStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: #fff;
            color: #000;
            font-family: 'Noto Sans', 'Arial Unicode MS', 'Segoe UI Symbol', sans-serif;
            padding: 60px 80px;
            line-height: 1.5;
            font-size: 15px;
        }

        .text-container {
            max-width: 900px;
            margin: 0 auto;
            text-align: justify;
        }

        /* Floating shapes with red glyph fill */
        .ghost {
            margin: 15px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .ghost.left {
            float: left;
        }

        .ghost.right {
            float: right;
        }

        .ghost-fill {
            color: #cc0000;
            font-size: 13px;
            line-height: 1.3;
            letter-spacing: 0px;
            word-break: break-all;
            text-align: center;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            overflow: hidden;
        }

        /* Circle */
        .ghost.circle {
            width: 140px;
            height: 140px;
            shape-outside: circle(50%);
            clip-path: circle(50%);
        }

        .ghost.circle-sm {
            width: 90px;
            height: 90px;
            shape-outside: circle(50%);
            clip-path: circle(50%);
        }

        .ghost.circle-lg {
            width: 180px;
            height: 180px;
            shape-outside: circle(50%);
            clip-path: circle(50%);
        }

        /* Ellipse */
        .ghost.ellipse {
            width: 120px;
            height: 180px;
            shape-outside: ellipse(50% 50%);
            clip-path: ellipse(50% 50%);
        }

        .ghost.ellipse-wide {
            width: 200px;
            height: 100px;
            shape-outside: ellipse(50% 50%);
            clip-path: ellipse(50% 50%);
        }

        /* Triangle */
        .ghost.triangle {
            width: 150px;
            height: 150px;
            shape-outside: polygon(50% 0%, 0% 100%, 100% 100%);
            clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }

        .ghost.triangle-inv {
            width: 140px;
            height: 140px;
            shape-outside: polygon(0% 0%, 100% 0%, 50% 100%);
            clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
        }

        .ghost.triangle-right {
            width: 130px;
            height: 130px;
            shape-outside: polygon(0% 0%, 100% 100%, 0% 100%);
            clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
        }

        .ghost.triangle-left {
            width: 130px;
            height: 130px;
            shape-outside: polygon(100% 0%, 100% 100%, 0% 100%);
            clip-path: polygon(100% 0%, 100% 100%, 0% 100%);
        }

        /* Diamond */
        .ghost.diamond {
            width: 120px;
            height: 160px;
            shape-outside: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
            clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
        }

        /* Pentagon */
        .ghost.pentagon {
            width: 140px;
            height: 140px;
            shape-outside: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
            clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
        }

        /* Hexagon */
        .ghost.hexagon {
            width: 150px;
            height: 130px;
            shape-outside: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
            clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
        }

        /* Octagon */
        .ghost.octagon {
            width: 140px;
            height: 140px;
            shape-outside: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
            clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
        }

        /* Star */
        .ghost.star {
            width: 160px;
            height: 160px;
            shape-outside: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
            clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
        }

        /* Cross */
        .ghost.cross {
            width: 120px;
            height: 120px;
            shape-outside: polygon(35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0% 65%, 0% 35%, 35% 35%);
            clip-path: polygon(35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0% 65%, 0% 35%, 35% 35%);
        }

        /* Arrow */
        .ghost.arrow-right {
            width: 160px;
            height: 100px;
            shape-outside: polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%);
            clip-path: polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%);
        }

        .ghost.arrow-left {
            width: 160px;
            height: 100px;
            shape-outside: polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%);
            clip-path: polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%);
        }

        /* Heart */
        .ghost.heart {
            width: 150px;
            height: 140px;
            shape-outside: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='black' d='M50 88 C15 60 0 40 0 25 C0 10 15 0 30 0 C42 0 50 10 50 20 C50 10 58 0 70 0 C85 0 100 10 100 25 C100 40 85 60 50 88 Z'/%3E%3C/svg%3E");
            clip-path: path('M50 88 C15 60 0 40 0 25 C0 10 15 0 30 0 C42 0 50 10 50 20 C50 10 58 0 70 0 C85 0 100 10 100 25 C100 40 85 60 50 88 Z');
        }

        /* Blob */
        .ghost.blob {
            width: 170px;
            height: 150px;
            shape-outside: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='black' d='M50 5 Q85 10 92 45 Q96 80 60 90 Q25 95 12 60 Q2 30 25 12 Q42 0 50 5 Z'/%3E%3C/svg%3E");
            clip-path: path('M50 5 Q85 10 92 45 Q96 80 60 90 Q25 95 12 60 Q2 30 25 12 Q42 0 50 5 Z');
        }

        .ghost.blob2 {
            width: 160px;
            height: 140px;
            shape-outside: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='black' d='M30 10 Q70 0 85 30 Q100 60 75 85 Q45 100 20 80 Q0 55 10 30 Q20 15 30 10 Z'/%3E%3C/svg%3E");
            clip-path: path('M30 10 Q70 0 85 30 Q100 60 75 85 Q45 100 20 80 Q0 55 10 30 Q20 15 30 10 Z');
        }

        /* Crescent */
        .ghost.crescent {
            width: 130px;
            height: 130px;
            shape-outside: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='black' d='M50 0 A50 50 0 1 1 50 100 A35 35 0 1 0 50 0 Z'/%3E%3C/svg%3E");
            clip-path: path('M50 0 A50 50 0 1 1 50 100 A35 35 0 1 0 50 0 Z');
        }

        /* Trapezoid */
        .ghost.trapezoid {
            width: 160px;
            height: 110px;
            shape-outside: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
            clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
        }

        /* Parallelogram */
        .ghost.parallelogram {
            width: 170px;
            height: 100px;
            shape-outside: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);
            clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);
        }

        /* Leaf */
        .ghost.leaf {
            width: 130px;
            height: 160px;
            shape-outside: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 100'%3E%3Cpath fill='black' d='M40 0 Q80 25 80 50 Q80 90 40 100 Q0 90 0 50 Q0 25 40 0 Z'/%3E%3C/svg%3E");
            clip-path: path('M40 0 Q80 25 80 50 Q80 90 40 100 Q0 90 0 50 Q0 25 40 0 Z');
        }

        /* Drop */
        .ghost.drop {
            width: 110px;
            height: 150px;
            shape-outside: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 70 100'%3E%3Cpath fill='black' d='M35 0 Q60 35 60 60 Q60 85 35 100 Q10 85 10 60 Q10 35 35 0 Z'/%3E%3C/svg%3E");
            clip-path: path('M35 0 Q60 35 60 60 Q60 85 35 100 Q10 85 10 60 Q10 35 35 0 Z');
        }

        .glyph-text {
            word-wrap: break-word;
            word-break: break-all;
            letter-spacing: 1px;
        }
    `;
    document.head.appendChild(style);
}

// Create the page structure
function createPageStructure() {
    createStyles();

    // Clear body
    document.body.innerHTML = '';

    // Create container
    const container = document.createElement('div');
    container.className = 'text-container';

    const textSpan = document.createElement('span');
    textSpan.className = 'glyph-text';
    textSpan.id = 'text';

    container.appendChild(textSpan);
    document.body.appendChild(container);
}

// Initialize the page
async function init() {
    await AutoFont.init();

    createPageStructure();

    // Shuffle ghosts
    const shuffledGhosts = [...ghosts].sort(() => Math.random() - 0.5);

    // Build the content
    const textSpan = document.getElementById('text');
    let html = '';
    const glyphsPerSection = 180;

    shuffledGhosts.forEach((ghost, index) => {
        const side = index % 2 === 0 ? 'left' : 'right';
        const fillGlyphs = generateGlyphText(ghost.fill);

        html += `<span class="ghost ${side} ${ghost.class}"><span class="ghost-fill">${fillGlyphs}</span></span>`;
        html += generateGlyphText(glyphsPerSection);
    });

    textSpan.innerHTML = html;
}

// Start the loading process
loadDependencies().then(() => jsWait());
