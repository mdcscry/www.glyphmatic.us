/**
 * Insert 13: Braided Marquee - Multi-Flavor Edition
 * Consolidates 2 variants into one file with random flavor selection
 * Randomly selects one of 2 palette configurations on page load
 */

console.log('INSERT13 TOP');

// === FLAVOR SELECTION ===
const FLAVOR = Math.floor(Math.random() * 2);

// Flavor configurations:
// 0: Light strips (95-99% L), dark glyphs (30-60% L), smaller font (original insert13)
// 1: Dark strips (30-45% L), light glyphs (60-80% L), larger font (was insert15)

const flavorConfig = {
    stripLightness: FLAVOR === 0 ? { mean: Math.random() * 4 + 95, jitter: 2 } : { mean: Math.random() * 15 + 30, jitter: 8 },
    stripChroma: FLAVOR === 0 ? { mean: Math.random() * 0.1 + 0.05, jitter: 0.03 } : { mean: Math.random() * 0.06 + 0.06, jitter: 0.03 },
    glyphLightness: FLAVOR === 0 ? { mean: Math.random() * 30 + 30, jitter: 15 } : { mean: Math.random() * 20 + 60, jitter: 10 },
    glyphChroma: FLAVOR === 0 ? { mean: Math.random() * 0.15 + 0.25, jitter: 0.075 } : { mean: Math.random() * 0.1 + 0.12, jitter: 0.05 },
    stripLightnessClamp: FLAVOR === 0 ? { min: 95, max: 99 } : { min: 25, max: 50 },
    stripChromaClamp: FLAVOR === 0 ? { min: 0.01, max: 0.15 } : { min: 0.03, max: 0.20 },
    glyphLightnessClamp: FLAVOR === 0 ? { min: 30, max: 60 } : { min: 55, max: 85 },
    glyphChromaClamp: FLAVOR === 0 ? { min: 0.2, max: 0.5 } : { min: 0.08, max: 0.30 },
    fontSize: FLAVOR === 0 ? { min: 2, max: 5 } : { min: 4, max: 6 }
};

console.log(`Braided Marquee: Selected FLAVOR ${FLAVOR}`);
console.log('Config:', flavorConfig);

// insert13.js - Braided Marquee
var divCounter = 0; // Compatibility with nav
var GRID_SIZE = Math.floor(Math.random() * 10) + 15;
var STRIP_SIZE = 100 / GRID_SIZE;
var BASE_SPEED = 0.01 + Math.random() * 0.02;
var FONT_SIZE = Math.floor(Math.random() * (flavorConfig.fontSize.max - flavorConfig.fontSize.min + 1)) + flavorConfig.fontSize.min;

var mycolors = [];
var mycolors2 = [];
var hStrips = [];
var vStrips = [];
var selectedPattern;

// Z-patterns
var zPatterns = [
    {
        name: 'vertical_on_top_evens',
        h: function(i) { return i % 2 === 0 ? 2 : 1; },
        v: function(i) { return i % 2 === 0 ? 1 : 2; }
    },
    {
        name: 'horizontal_on_top_evens',
        h: function(i) { return i % 2 === 0 ? 1 : 2; },
        v: function(i) { return i % 2 === 0 ? 2 : 1; }
    },
    {
        name: 'peak_middle',
        h: function(i) { return i < GRID_SIZE/2 ? i * 2 : (GRID_SIZE - i) * 2; },
        v: function(i) { return i < GRID_SIZE/2 ? i * 2 + 1 : (GRID_SIZE - i) * 2 + 1; }
    },
    {
        name: 'palindromic_3',
        h: function(i) { return [1, 2, 3, 2][i % 4]; },
        v: function(i) { return [2, 3, 1, 3][i % 4]; }
    },
    {
        name: 'diagonal_cascade',
        h: function(i) { return (i * 2) % 5 + 1; },
        v: function(i) { return (i * 2 + 1) % 5 + 1; }
    }
];

function jsWait() {
    if (typeof whirldArraySignal == "undefined" ||
        typeof msucdArraySignal == "undefined") {
        window.setTimeout(jsWait, 100);
    } else {
        console.log('SIGNALS READY, STARTING INSERT13');
        selectedPattern = zPatterns[Math.floor(Math.random() * zPatterns.length)];
        initStyle();
        initBraid();
        startAnimation();
    }
}

function initStyle() {
    mycolors = [];
    mycolors2 = [];

    if (FLAVOR === 0) {
        // === FLAVOR 0: Original insert13 style ===
        initStyleFlavor0();
    } else {
        // === FLAVOR 1: Original insert15 style ===
        initStyleFlavor1();
    }
}

function initStyleFlavor0() {
    const totalColorsToGenerate = 12;

    // --- 1. Pick a base hue and a harmony type ---
    const baseHue = Math.random() * 360;
    const harmonyTypes = ["complementary", "triadic", "analogous", "splitComplementary", "tetradic"];
    const harmony = harmonyTypes[Math.floor(Math.random() * harmonyTypes.length)];

    // Determine core hue angles based on harmony
    let hues = [];
    switch (harmony) {
        case "complementary":
            hues = [baseHue, (baseHue + 180) % 360];
            break;
        case "triadic":
            hues = [baseHue, (baseHue + 120) % 360, (baseHue + 240) % 360];
            break;
        case "analogous":
            hues = [baseHue, (baseHue + 15) % 360, (baseHue - 15 + 360) % 360];
            hues = hues.map(h => (h + 360) % 360).sort((a, b) => a - b);
            break;
        case "splitComplementary":
            hues = [baseHue, (baseHue + 150) % 360, (baseHue + 210) % 360];
            break;
        case "tetradic":
            hues = [baseHue, (baseHue + 90) % 360, (baseHue + 180) % 360, (baseHue + 270) % 360];
            break;
    }

    // --- mycolors (the vertical strips): VERY VERY LIGHT (near-white) and SUBTLY TINTED ---
    const stripLightnessMean = Math.random() * 10 + 95;
    const stripLightnessJitter = 5;
    const stripChromaMean = Math.random() * 0.1 + 0.05;
    const stripChromaJitter = 0.03;

    // --- mycolors2 (the glyphs/text): DARKER and VIBRANTLY saturated ---
    const glyphLightnessMean = Math.random() * 30 + 30;
    const glyphLightnessJitter = 15;
    const glyphChromaMean = Math.random() * 0.15 + 0.25;
    const glyphChromaJitter = 0.075;

    // --- Build arrays ---
    for (let i = 0; i < totalColorsToGenerate; i++) {
        const hueBase = hues[i % hues.length];
        let hue = hueBase + (Math.random() * 4 - 2);

        // Strips
        let stripL = stripLightnessMean + (Math.random() * stripLightnessJitter * 2 - stripLightnessJitter);
        let stripC = stripChromaMean + (Math.random() * stripChromaJitter * 2 - stripChromaJitter);
        stripL = Math.min(99, Math.max(95, stripL));
        stripC = Math.min(0.15, Math.max(0.01, stripC));
        hue = (hue + 360) % 360;

        mycolors2.push(`oklch(${stripL.toFixed(1)}% ${stripC.toFixed(2)} ${hue.toFixed(1)})`);

        // Glyphs
        let glyphL = glyphLightnessMean + (Math.random() * glyphLightnessJitter * 2 - glyphLightnessJitter);
        let glyphC = glyphChromaMean + (Math.random() * glyphChromaJitter * 2 - glyphChromaJitter);
        const clampedGlyphL = Math.min(60, Math.max(30, glyphL));
        const clampedGlyphC = Math.min(0.5, Math.max(0.2, glyphC));

        mycolors.push(`oklch(${clampedGlyphL.toFixed(1)}% ${clampedGlyphC.toFixed(2)} ${hue.toFixed(1)})`);
    }

    // --- Global page background and text ---
    const bgHue = hues[Math.floor(Math.random() * hues.length)];
    const canvasBgLightness = Math.random() * 10 + 10;
    const canvasBgChroma = Math.random() * 0.02 + 0.01;
    const globalTextColorLightness = Math.random() * 10 + 85;
    const globalTextColorChroma = Math.random() * 0.01;

    const backgroundColor = `oklch(${canvasBgLightness.toFixed(1)}% ${canvasBgChroma.toFixed(2)} ${bgHue.toFixed(1)})`;
    const textColor = `oklch(${globalTextColorLightness.toFixed(1)}% ${globalTextColorChroma.toFixed(2)} ${bgHue.toFixed(1)})`;

    document.body.style.backgroundColor = backgroundColor;
    document.body.style.color = textColor;

    console.log("Harmony:", harmony);
    console.log("🎨 FLAVOR 0 - mycolors2 (strips - LIGHT):", mycolors2);
    console.log("🎨 FLAVOR 0 - mycolors (glyphs - DARK):", mycolors);
}

function initStyleFlavor1() {
    const totalColorsToGenerate = 12;

    // --- 1. Pick a base hue and a harmony type ---
    const baseHue = Math.random() * 360;
    const harmonyTypes = ["complementary", "triadic", "analogous", "splitComplementary", "tetradic"];
    const harmony = harmonyTypes[Math.floor(Math.random() * harmonyTypes.length)];

    // Determine core hue angles based on harmony
    let hues = [];
    switch (harmony) {
        case "complementary":
            hues = [baseHue, (baseHue + 180) % 360];
            break;
        case "triadic":
            hues = [baseHue, (baseHue + 120) % 360, (baseHue + 240) % 360];
            break;
        case "analogous":
            hues = [baseHue, (baseHue + 15) % 360, (baseHue - 15 + 360) % 360];
            hues = hues.map(h => (h + 360) % 360).sort((a, b) => a - b);
            break;
        case "splitComplementary":
            hues = [baseHue, (baseHue + 150) % 360, (baseHue + 210) % 360];
            break;
        case "tetradic":
            hues = [baseHue, (baseHue + 90) % 360, (baseHue + 180) % 360, (baseHue + 270) % 360];
            break;
    }

    // --- mycolors (the vertical strips): DARK and MUTED ---
    const stripLightnessMean = Math.random() * 15 + 30;
    const stripLightnessJitter = 8;
    const stripChromaMean = Math.random() * 0.06 + 0.06;
    const stripChromaJitter = 0.03;

    // --- mycolors2 (the glyphs/text): LIGHTER and somewhat more VIBRANT to stand out ---
    const glyphLightnessMean = Math.random() * 20 + 60;
    const glyphLightnessJitter = 10;
    const glyphChromaMean = Math.random() * 0.1 + 0.12;
    const glyphChromaJitter = 0.05;

    // --- Build arrays ---
    for (let i = 0; i < totalColorsToGenerate; i++) {
        const hueBase = hues[i % hues.length];
        let hue = hueBase + (Math.random() * 4 - 2);

        // Strips (note: these go to mycolors, not mycolors2)
        let stripL = stripLightnessMean + (Math.random() * stripLightnessJitter * 2 - stripLightnessJitter);
        let stripC = stripChromaMean + (Math.random() * stripChromaJitter * 2 - stripChromaJitter);
        stripL = Math.min(50, Math.max(25, stripL));
        stripC = Math.min(0.20, Math.max(0.03, stripC));
        hue = (hue + 360) % 360;

        mycolors.push(`oklch(${stripL.toFixed(1)}% ${stripC.toFixed(2)} ${hue.toFixed(1)})`);

        // Glyphs (note: these go to mycolors2, not mycolors)
        let glyphL = glyphLightnessMean + (Math.random() * glyphLightnessJitter * 2 - glyphLightnessJitter);
        let glyphC = glyphChromaMean + (Math.random() * glyphChromaJitter * 2 - glyphChromaJitter);
        const clampedGlyphL = Math.min(85, Math.max(55, glyphL));
        const clampedGlyphC = Math.min(0.30, Math.max(0.08, glyphC));

        mycolors2.push(`oklch(${clampedGlyphL.toFixed(1)}% ${clampedGlyphC.toFixed(2)} ${hue.toFixed(1)})`);
    }

    // --- Global page background and text ---
    const bgHue = hues[Math.floor(Math.random() * hues.length)];
    const canvasBgLightness = Math.random() * 10 + 10;
    const canvasBgChroma = Math.random() * 0.02 + 0.01;
    const globalTextColorLightness = Math.random() * 10 + 85;
    const globalTextColorChroma = Math.random() * 0.01;

    const backgroundColor = `oklch(${canvasBgLightness.toFixed(1)}% ${canvasBgChroma.toFixed(2)} ${bgHue.toFixed(1)})`;
    const textColor = `oklch(${globalTextColorLightness.toFixed(1)}% ${globalTextColorChroma.toFixed(2)} ${bgHue.toFixed(1)})`;

    document.body.style.backgroundColor = backgroundColor;
    document.body.style.color = textColor;

    console.log("Harmony:", harmony);
    console.log("🎨 FLAVOR 1 - mycolors (strips - DARK):", mycolors);
    console.log("🎨 FLAVOR 1 - mycolors2 (glyphs - LIGHT):", mycolors2);
}

function getRandomGlyph() {
    var glyphIndex = Math.floor(Math.random() * myFontSet.length);
    if (!myFontSet[glyphIndex]) {
        glyphIndex = Math.floor(Math.random() * myFontSet.length);
    }

    var codepoint = myFontSet[glyphIndex][0];
    var fontList = myFontSet[glyphIndex].slice(1);
    var randomFont = fontList[Math.floor(Math.random() * fontList.length)];

    return {
        char: parseCodepoint(codepoint),
        font: randomFont
    };
}

function parseCodepoint(cp) {
    if (cp.indexOf(';') > -1) {
        var parts = cp.split(';');
        var output = '&#' + parts[0] + ';';
        for (var i = 1; i < parts.length; i++) {
            if (parts[i]) output += parts[i] + ';';
        }
        return output;
    } else if (cp.charAt(0) === 'x') {
        return '&#' + cp + ';';
    } else {
        return '&#' + cp + ';';
    }
}

function initBraid() {
    // Clear body but keep nav elements
    console.log('initBraid START');
    console.log('GRID_SIZE:', GRID_SIZE);
    var navElements = ['spanNavColor', 'spanNavHTML', 'spanNavSizeDown', 'spanNavSizeUp', 'navPanel', 'navTabContainer'];
    var savedNavs = {};
    navElements.forEach(function(id) {
        var el = document.getElementById(id);
        if (el) savedNavs[id] = el;
    });

    // Also save glyphmatic divs
    var glyphDivs = [];
    for (var i = 1; i <= 8; i++) {
        var el = document.getElementById('glyphmatic' + i);
        if (el) glyphDivs.push(el);
    }

    document.body.innerHTML = '';

    // Restore nav
    Object.keys(savedNavs).forEach(function(id) {
        document.body.appendChild(savedNavs[id]);
    });
    glyphDivs.forEach(function(el) {
        document.body.appendChild(el);
    });

    // Create horizontal strips
    for (var row = 0; row < GRID_SIZE; row++) {
        var strip = document.createElement('div');
        strip.style.position = 'absolute';
        strip.style.display = 'flex';
        strip.style.flexDirection = 'row';
        strip.style.height = STRIP_SIZE + 'vh';
        strip.style.top = (row * STRIP_SIZE) + 'vh';
        strip.style.left = '0';
        strip.style.zIndex = selectedPattern.h(row);

        var colorIdx = Math.floor(Math.random() * mycolors.length);

        var glyphCount = GRID_SIZE + 10;
        for (var col = 0; col < glyphCount; col++) {
            var cell = document.createElement('div');
            cell.style.flexShrink = '0';
            cell.style.width = STRIP_SIZE + 'vw';
            cell.style.height = STRIP_SIZE + 'vh';
            cell.style.display = 'flex';
            cell.style.alignItems = 'center';
            cell.style.justifyContent = 'center';
            cell.style.fontSize = FONT_SIZE + 'vmin';
            cell.style.backgroundColor = mycolors2[colorIdx];
            cell.style.color = mycolors[colorIdx];

            var glyph = getRandomGlyph();

            if (glyph.font === "Noto Sans Symbols 2") {
                cell.classList.add('noto-sans-symbols-2');
                cell.style.fontFamily = '';
            } else {
                cell.style.fontFamily = glyph.font;
            }
            cell.innerHTML = glyph.char;

            strip.appendChild(cell);
        }

        document.body.appendChild(strip);
        hStrips.push(strip);
    }

    // Create vertical strips
    for (var col = 0; col < GRID_SIZE; col++) {
        var strip = document.createElement('div');
        strip.style.position = 'absolute';
        strip.style.display = 'flex';
        strip.style.flexDirection = 'column';
        strip.style.width = STRIP_SIZE + 'vw';
        strip.style.left = (col * STRIP_SIZE) + 'vw';
        strip.style.top = '0';
        strip.style.zIndex = selectedPattern.v(col);

        var colorIdx = Math.floor(Math.random() * mycolors.length);

        var glyphCount = GRID_SIZE + 10;
        for (var row = 0; row < glyphCount; row++) {
            var cell = document.createElement('div');
            cell.style.flexShrink = '0';
            cell.style.width = STRIP_SIZE + 'vw';
            cell.style.height = STRIP_SIZE + 'vh';
            cell.style.display = 'flex';
            cell.style.alignItems = 'center';
            cell.style.justifyContent = 'center';
            cell.style.fontSize = FONT_SIZE + 'vmin';
            cell.style.backgroundColor = mycolors2[colorIdx];
            cell.style.color = mycolors[colorIdx];

            var glyph = getRandomGlyph();
            if (glyph.font === "Noto Sans Symbols 2") {
                cell.classList.add('noto-sans-symbols-2');
                cell.style.fontFamily = '';
            } else {
                cell.style.fontFamily = glyph.font;
            }
            cell.innerHTML = glyph.char;

            strip.appendChild(cell);
        }

        document.body.appendChild(strip);
        vStrips.push(strip);
    }
    console.log('initBraid COMPLETE, total strips:', hStrips.length);
}

function startAnimation() {
    hStrips.forEach(function(strip) {
        animateHorizontal(strip);
    });

    vStrips.forEach(function(strip) {
        animateVertical(strip);
    });
}

function animateHorizontal(strip) {
    var offset = -STRIP_SIZE;
    var speed = BASE_SPEED * (0.8 + Math.random() * 0.4);

    function step() {
        offset += speed;

        if (offset >= 0) {
            offset = -STRIP_SIZE;
            var lastCell = strip.children[strip.children.length - 1];
            var glyph = getRandomGlyph();
            if (glyph.font === "Noto Sans Symbols 2") {
                lastCell.classList.add('noto-sans-symbols-2');
                lastCell.style.fontFamily = '';
            } else {
                lastCell.style.fontFamily = glyph.font;
            }
            lastCell.innerHTML = glyph.char;
            strip.insertBefore(lastCell, strip.children[0]);
        }

        strip.style.transform = 'translateX(' + offset + 'vw)';
        requestAnimationFrame(step);
    }

    step();
}

function animateVertical(strip) {
    var offset = -STRIP_SIZE;
    var speed = BASE_SPEED * (0.8 + Math.random() * 0.4);

    function step() {
        offset += speed;

        if (offset >= 0) {
            offset = -STRIP_SIZE;
            var lastCell = strip.children[strip.children.length - 1];
            var glyph = getRandomGlyph();
            lastCell.style.fontFamily = glyph.font;
            lastCell.innerHTML = glyph.char;
            strip.insertBefore(lastCell, strip.children[0]);
        }

        strip.style.transform = 'translateY(' + offset + 'vh)';
        requestAnimationFrame(step);
    }

    step();
}

// Nav button compatibility
function changeHtmlDisplayInline() {
    // Regenerate with new pattern
    hStrips = [];
    vStrips = [];
    selectedPattern = zPatterns[Math.floor(Math.random() * zPatterns.length)];
    initBraid();
    startAnimation();
}

console.log('insert13.js loaded');
jsWait();
