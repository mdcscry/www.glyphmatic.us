console.log('INSERT13 TOP');

// insert13.js - Braided Marquee
var divCounter = 0; // Compatibility with nav
var GRID_SIZE = Math.floor(Math.random() * 10) + 15;
var STRIP_SIZE = 100 / GRID_SIZE;
var BASE_SPEED = 0.01 + Math.random() * 0.02;
var FONT_SIZE = Math.floor(Math.random() * 3) + 2;

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
    mycolors = []; // Clear previous colors (strips)
    mycolors2 = []; // Clear previous colors (glyphs)

    const totalColorsToGenerate = 12; // Still generating 12 colors

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
            // Slightly spread analogous hues, sorted for consistency
            hues = [baseHue, (baseHue + 15) % 360, (baseHue - 15 + 360) % 360];
            hues = hues.map(h => (h + 360) % 360).sort((a, b) => a - b);
            break;
        case "splitComplementary":
            hues = [baseHue, (baseHue + 150) % 360, (baseHue + 210) % 360];
            break;
        case "tetradic":
            // Square (90 degree separation)
            hues = [baseHue, (baseHue + 90) % 360, (baseHue + 180) % 360, (baseHue + 270) % 360];
            break;
    }

    // --- 2. Define ranges for Lightness and Chroma ---

    // --- mycolors (the vertical strips): VERY VERY LIGHT (near-white) and SUBTLY TINTED ---
    const stripLightnessMean = Math.random() * 10 + 95; // Center lightness 85-95% (Extremely light)
    const stripLightnessJitter = 5; // +/- 5% from the mean for consistency

    const stripChromaMean = Math.random() * 0.1 + 0.05; // Center chroma 0.05-0.15 (Subtle tint of color)
    const stripChromaJitter = 0.03; // +/- 0.03 from the mean

    // --- mycolors2 (the glyphs/text): BRIGHT, meaning DARKER than strips and VIBRANTLY saturated ---
    // These settings are maintained to ensure strong contrast and vivid color against the very light strips.
    const glyphLightnessMean = Math.random() * 5 + 95; // Center lightness 35-55% (Darker than strips)
    const glyphLightnessJitter = 0.06; // +/- 10% from the mean

    const glyphChromaMean = Math.random() * 0.15 + 0.25; // Center chroma 0.25-0.4 (Very vibrant)
    const glyphChromaJitter = 0.06; // +/- 0.06 from the mean

    // --- 3. Build mycolors and mycolors2 arrays ---
    for (let i = 0; i < totalColorsToGenerate; i++) {
        const hueBase = hues[i % hues.length];

        // Apply a very small hue jitter to make each instance unique but still harmonious
        let hue = hueBase + (Math.random() * 4 - 2); // +/- 2 degrees, extremely subtle

        // Generate lightness and chroma for mycolors (strips)
        let stripL = stripLightnessMean + (Math.random() * stripLightnessJitter * 2 - stripLightnessJitter);
        let stripC = stripChromaMean + (Math.random() * stripChromaJitter * 2 - stripChromaJitter);

        // Clamp values for mycolors (strips) - ensure they are extremely light and subtly colored
        stripL = Math.min(99, Math.max(99, stripL)); // Strips are 80-95% lightness (very very light)
        stripC = Math.min(0.15, Math.max(0.01, stripC)); // Chromaticity is very low for subtle tint
        hue = (hue + 360) % 360; // Ensure hue is always positive and within 0-360

        // Push primary color to mycolors (strips)
        mycolors2.push(`oklch(${stripL.toFixed(1)}% ${stripC.toFixed(2)} ${hue.toFixed(1)})`);

        // Generate lightness and chroma for mycolors2 (glyphs)
        let glyphL = glyphLightnessMean + (Math.random() * glyphLightnessJitter * 2 - glyphLightnessJitter);
        let glyphC = glyphChromaMean + (Math.random() * glyphChromaJitter * 2 - glyphChromaJitter);

        // Clamp glyph values - ensuring they are darker than strips and highly vibrant
        const clampedGlyphL = Math.min(60, Math.max(30, glyphL)); // Glyphs are 30-60% lightness (darker than strips)
        const clampedGlyphC = Math.min(0.5, Math.max(0.2, glyphC)); // High chromaticity for vibrant colors

        mycolors.push(`oklch(${clampedGlyphL.toFixed(1)}% ${clampedGlyphC.toFixed(2)} ${hue.toFixed(1)})`);
    }

    // --- 4. Global page background and text (these settings create overall context, not related to strips/glyphs contrast) ---
    // The main canvas background should still be a dark, muted color.
    // The global text for the body should be light for readability on a dark canvas.
    const bgHue = hues[Math.floor(Math.random() * hues.length)];

    const canvasBgLightness = Math.random() * 10 + 10; // Very dark background L (10-20%)
    const canvasBgChroma = Math.random() * 0.02 + 0.01; // Very muted (0.01-0.03)

    const globalTextColorLightness = Math.random() * 10 + 85; // Very light text L (85-95%)
    const globalTextColorChroma = Math.random() * 0.01;      // Extremely muted, near grayscale

    const backgroundColor = `oklch(${canvasBgLightness.toFixed(1)}% ${canvasBgChroma.toFixed(2)} ${bgHue.toFixed(1)})`;
    const textColor = `oklch(${globalTextColorLightness.toFixed(1)}% ${globalTextColorChroma.toFixed(2)} ${bgHue.toFixed(1)})`;

    // Apply styles to the body
    document.body.style.backgroundColor = backgroundColor;
    document.body.style.color = textColor;

    // Log for debugging/information
    console.log("Harmony:", harmony);
    console.log("🎨 Generated mycolors (all 12, strips - VERY VERY LIGHT & SUBTLY TINTED):", mycolors);
    console.log("🎨 Generated mycolors2 (all 12, glyphs - DARKER & VIBRANTLY BRIGHT):", mycolors2);
    console.log("🌈 Background Color (canvas - dark):", backgroundColor);
    console.log("📖 Text Color (global - light):", textColor);
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
    var navElements = ['spanNavColor', 'spanNavHTML', 'spanNavSizeDown', 'spanNavSizeUp'];
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
            cell.style.fontFamily = glyph.font;
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
            cell.style.fontFamily = glyph.font
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
            lastCell.style.fontFamily = glyph.font;
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