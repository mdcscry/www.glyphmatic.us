// insert25.js - Rectangle Tiling with Random Configuration
// Randomly displays either glyph-based or line-based Mondrian tiling

console.log('insert25.js loaded');

// Define stub function expected by g.us3.htm watermark onclick
function changeHtmlDisplayInline() {
    // No-op - insert25 doesn't need this functionality
}

// ============================================
// RANDOM CONFIGURATION GENERATION
// ============================================

const VARIANTS = ['glyphs', 'lines'];
const selectedVariant = VARIANTS[Math.floor(Math.random() * VARIANTS.length)];

// Generate random configuration
const CONFIG = {
    variant: selectedVariant,
    paletteSize: 2 + Math.floor(Math.random() * 7), // 4-10
    maxDepth: 1 + Math.floor(Math.random() * 10), // 3-7
    minContrast: 2.0 + Math.random() * 3.0, // 2.0-5.0
    maxContrast: 4.0 + Math.random() * 3.0, // 4.0-7.0
    maxAttempts: 50,
    useOKLCH: true
};

// Glyph variant specific settings
if (selectedVariant === 'glyphs') {
    CONFIG.animationDuration = 10.0 + Math.random() * 10.0; // 10-20 seconds
    CONFIG.glyphMorphInterval = 5.0 + Math.random() * 10.0; // 5-15 seconds
    CONFIG.backflip = {
        travelDistance: 100 + Math.floor(Math.random() * 100), // 100-200
        rotationDegrees: 180 + Math.floor(Math.random() * 180), // 180-360
        scaleMin: 0.3 + Math.random() * 0.4, // 0.3-0.7
        easingOut: 'ease-in-out',
        easingIn: 'ease-in-out'
    };
}

console.log('Insert25 Configuration:', CONFIG);

// ============================================
// INJECT STYLES
// ============================================

function injectStyles() {
    const style = document.createElement('style');

    if (selectedVariant === 'glyphs') {
        style.textContent = `
            body {
                margin: 0;
                padding: 0;
                overflow: hidden;
                background: #000;
            }
            #container {
                position: relative;
                width: 100vw;
                height: 100vh;
            }
            .rectangle {
                position: absolute;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
                border: 2px solid #999;
            }
            .glyph {
                text-align: center;
                user-select: none;
                display: inline-block;
                transform-style: preserve-3d;
                backface-visibility: hidden;
                transition: none;
            }
            @keyframes fade-out-twist {
                0% {
                    opacity: 1;
                    transform: rotateY(0deg) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: rotateY(180deg) scale(0.7);
                }
            }
            @keyframes fade-in-twist {
                0% {
                    opacity: 0;
                    transform: rotateY(180deg) scale(0.7);
                }
                100% {
                    opacity: 1;
                    transform: rotateY(360deg) scale(1);
                }
            }
            @keyframes backflip-dive-out {
                0% {
                    opacity: 1;
                    transform: rotateX(0deg) translateY(0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: rotateX(-${CONFIG.backflip.rotationDegrees}deg) translateY(-${CONFIG.backflip.travelDistance}%) scale(${CONFIG.backflip.scaleMin});
                }
            }
            @keyframes backflip-dive-in {
                0% {
                    opacity: 0;
                    transform: rotateX(-${CONFIG.backflip.rotationDegrees}deg) translateY(${CONFIG.backflip.travelDistance}%) scale(${CONFIG.backflip.scaleMin});
                }
                100% {
                    opacity: 1;
                    transform: rotateX(-${CONFIG.backflip.rotationDegrees * 2}deg) translateY(0) scale(1);
                }
            }
            .glyph.is-fading-out {
                animation: fade-out-twist ${CONFIG.animationDuration}s ease-in-out forwards;
            }
            .glyph.is-fading-in {
                animation: fade-in-twist ${CONFIG.animationDuration}s ease-in-out forwards;
            }
            .glyph.is-diving-out {
                animation: backflip-dive-out ${CONFIG.animationDuration}s ${CONFIG.backflip.easingOut} forwards;
            }
            .glyph.is-diving-in {
                animation: backflip-dive-in ${CONFIG.animationDuration}s ${CONFIG.backflip.easingIn} forwards;
            }
        `;
    } else {
        style.textContent = `
            body {
                margin: 0;
                padding: 0;
                overflow: hidden;
                background: #f5f5dc;
            }
            #container {
                position: relative;
                width: 100vw;
                height: 100vh;
            }
            .rectangle {
                position: absolute;
                box-sizing: border-box;
            }
            @keyframes flow-horizontal {
                0% { background-position-x: 0px; }
                100% { background-position-x: 100px; }
            }
            @keyframes flow-vertical {
                0% { background-position-y: 0px; }
                100% { background-position-y: 100px; }
            }
            @keyframes flow-diagonal {
                0% { background-position: 0px 0px; }
                100% { background-position: 100px 100px; }
            }
            @keyframes pulse-scale {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.02); }
            }
        `;
    }

    document.head.appendChild(style);
}

// ============================================
// COLOR GENERATION (OKLCH)
// ============================================

function generateOKLCH(lightness, chroma, hue) {
    const l = lightness !== undefined ? lightness : 0.3 + Math.random() * 0.6;
    const c = chroma !== undefined ? chroma : Math.random() * 0.3;
    const h = hue !== undefined ? hue : Math.random() * 360;
    return `oklch(${l} ${c} ${h})`;
}

function oklchToRgb(oklchString) {
    const match = oklchString.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
    if (!match) return null;

    const L = parseFloat(match[1]);
    const C = parseFloat(match[2]);
    const H = parseFloat(match[3]);

    const hRad = H * Math.PI / 180;
    const a = C * Math.cos(hRad);
    const b = C * Math.sin(hRad);

    const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

    const l = l_ * l_ * l_;
    const m = m_ * m_ * m_;
    const s = s_ * s_ * s_;

    let r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
    let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
    let bl = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

    const toSrgb = (val) => {
        val = Math.max(0, Math.min(1, val));
        return val <= 0.0031308
            ? 12.92 * val
            : 1.055 * Math.pow(val, 1/2.4) - 0.055;
    };

    return {
        r: Math.round(toSrgb(r) * 255),
        g: Math.round(toSrgb(g) * 255),
        b: Math.round(toSrgb(bl) * 255)
    };
}

function colorToRgb(color) {
    if (color.startsWith('#')) return hexToRgb(color);
    if (color.startsWith('oklch')) return oklchToRgb(color);
    if (color.startsWith('hsl')) return hslToRgb(color);
    if (color.startsWith('rgb')) return rgbStringToRgb(color);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    return hexToRgb(ctx.fillStyle);
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function hslToRgb(hslString) {
    const match = hslString.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%/);
    if (!match) return null;

    let h = parseInt(match[1]) / 360;
    let s = parseInt(match[2]) / 100;
    let l = parseInt(match[3]) / 100;

    let r, g, b;
    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function rgbStringToRgb(rgbString) {
    const match = rgbString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!match) return null;

    return {
        r: parseInt(match[1]),
        g: parseInt(match[2]),
        b: parseInt(match[3])
    };
}

function getLuminance(rgb) {
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(val => {
        val = val / 255;
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getContrastRatio(color1, color2) {
    const rgb1 = colorToRgb(color1);
    const rgb2 = colorToRgb(color2);

    if (!rgb1 || !rgb2) return 1;

    const lum1 = getLuminance(rgb1);
    const lum2 = getLuminance(rgb2);

    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);

    return (lighter + 0.05) / (darker + 0.05);
}

function generatePalette() {
    const palette = [];
    let attempts = 0;
    const maxTotalAttempts = CONFIG.paletteSize * 100;

    while (palette.length < CONFIG.paletteSize && attempts < maxTotalAttempts) {
        const color = generateOKLCH();

        let acceptable = true;
        for (const existingColor of palette) {
            const contrast = getContrastRatio(color, existingColor);
            if (contrast < CONFIG.minContrast || contrast > CONFIG.maxContrast) {
                acceptable = false;
                break;
            }
        }

        if (acceptable) {
            palette.push(color);
        }
        attempts++;
    }

    while (palette.length < CONFIG.paletteSize) {
        palette.push(generateOKLCH());
    }

    return palette;
}

let colors = generatePalette();

function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function getContrastingColor(bgColor, minContrast = CONFIG.minContrast) {
    let attempts = 0;
    let fgColor;

    do {
        fgColor = randomColor();
        attempts++;
        if (attempts > CONFIG.maxAttempts) break;
    } while (getContrastRatio(bgColor, fgColor) < minContrast);

    return fgColor;
}

// ============================================
// GLYPHS (for glyph variant)
// ============================================

const glyphs = [
    '■', '□', '▢', '▣', '▤', '▥', '▦', '▧', '▨', '▩', '▪', '▫', '▬', '▭', '▮', '▯', '▰', '▱',
    '▲', '△', '▴', '▵', '▶', '▷', '▸', '▹', '►', '▻', '▼', '▽', '▾', '▿', '◀', '◁', '◂', '◃',
    '◄', '◅', '◆', '◇', '◈', '◉', '◊', '○', '◌', '◍', '◎', '●', '◐', '◑', '◒', '◓', '◔', '◕',
    '◖', '◗', '◘', '◙', '◚', '◛', '◜', '◝', '◞', '◟', '◠', '◡', '◢', '◣', '◤', '◥', '◦', '◧',
    '◨', '◩', '◪', '◫', '◬', '◭', '◮', '◯', '◰', '◱', '◲', '◳', '◴', '◵', '◶', '◷', '◸', '◹',
    '◺', '◻', '◽', '◿',
    '🞀', '🞁', '🞂', '🞃', '🞄', '🞅', '🞆', '🞇', '🞈', '🞉', '🞊', '🞋', '🞌', '🞍', '🞎', '🞏',
    '🞐', '🞑', '🞒', '🞓', '🞔', '🞕', '🞖', '🞗', '🞘', '🞙', '🞚', '🞛', '🞜', '🞝', '🞞', '🞟',
    '🞠', '🞡', '🞢', '🞣', '🞤', '🞥', '🞦', '🞧', '🞨', '🞩', '🞪', '🞫', '🞬', '🞭', '🞮', '🞯',
    '🞰', '🞱', '🞲', '🞳', '🞴', '🞵', '🞶', '🞷', '🞸', '🞹', '🞺', '🞻', '🞼', '🞽', '🞾', '🞿',
    '🟀', '🟁', '🟂', '🟃', '🟄', '🟅', '🟆', '🟇', '🟈', '🟉', '🟊', '🟋', '🟌', '🟍', '🟎', '🟏',
    '🟐', '🟑', '🟒', '🟓', '🟔', '🟕', '🟖', '🟗', '🟘', '🟙'
];

function randomGlyph() {
    return glyphs[Math.floor(Math.random() * glyphs.length)];
}

// ============================================
// LINE PATTERNS (for lines variant)
// ============================================

function createPattern(fgColor) {
    const patternType = Math.floor(Math.random() * 8);

    switch(patternType) {
        case 0:
            return { pattern: createVerticalLines(fgColor), type: 'vertical' };
        case 1:
            return { pattern: createHorizontalLines(fgColor), type: 'horizontal' };
        case 2:
            return { pattern: createVerticalGrating(fgColor), type: 'vertical' };
        case 3:
            return { pattern: createHorizontalGrating(fgColor), type: 'horizontal' };
        case 4:
            return { pattern: createDenseVerticalLines(fgColor), type: 'vertical' };
        case 5:
            return { pattern: createDenseHorizontalLines(fgColor), type: 'horizontal' };
        case 6:
            return { pattern: createCrossPattern(fgColor), type: 'cross' };
        case 7:
            return { pattern: createDenseCrossPattern(fgColor), type: 'cross' };
    }
}

function createVerticalLines(fgColor) {
    const lineWidth = 1 + Math.floor(Math.random() * 3);
    const spacing = 8 + Math.floor(Math.random() * 20);
    return `repeating-linear-gradient(90deg, transparent 0px, transparent ${spacing - lineWidth}px, ${fgColor} ${spacing - lineWidth}px, ${fgColor} ${spacing}px)`;
}

function createHorizontalLines(fgColor) {
    const lineWidth = 1 + Math.floor(Math.random() * 3);
    const spacing = 8 + Math.floor(Math.random() * 20);
    return `repeating-linear-gradient(0deg, transparent 0px, transparent ${spacing - lineWidth}px, ${fgColor} ${spacing - lineWidth}px, ${fgColor} ${spacing}px)`;
}

function createVerticalGrating(fgColor) {
    const stripeWidth = 3 + Math.floor(Math.random() * 12);
    return `repeating-linear-gradient(90deg, ${fgColor} 0px, ${fgColor} ${stripeWidth}px, transparent ${stripeWidth}px, transparent ${stripeWidth * 2}px)`;
}

function createHorizontalGrating(fgColor) {
    const stripeWidth = 3 + Math.floor(Math.random() * 12);
    return `repeating-linear-gradient(0deg, ${fgColor} 0px, ${fgColor} ${stripeWidth}px, transparent ${stripeWidth}px, transparent ${stripeWidth * 2}px)`;
}

function createDenseVerticalLines(fgColor) {
    const spacing = 2 + Math.floor(Math.random() * 4);
    return `repeating-linear-gradient(90deg, transparent 0px, transparent ${spacing - 1}px, ${fgColor} ${spacing - 1}px, ${fgColor} ${spacing}px)`;
}

function createDenseHorizontalLines(fgColor) {
    const spacing = 2 + Math.floor(Math.random() * 4);
    return `repeating-linear-gradient(0deg, transparent 0px, transparent ${spacing - 1}px, ${fgColor} ${spacing - 1}px, ${fgColor} ${spacing}px)`;
}

function createCrossPattern(fgColor) {
    const lineWidth = 1 + Math.floor(Math.random() * 2);
    const verticalSpacing = 8 + Math.floor(Math.random() * 25);
    const horizontalSpacing = 8 + Math.floor(Math.random() * 25);

    const horizontal = `repeating-linear-gradient(0deg, transparent 0px, transparent ${horizontalSpacing - lineWidth}px, ${fgColor} ${horizontalSpacing - lineWidth}px, ${fgColor} ${horizontalSpacing}px)`;
    const vertical = `repeating-linear-gradient(90deg, transparent 0px, transparent ${verticalSpacing - lineWidth}px, ${fgColor} ${verticalSpacing - lineWidth}px, ${fgColor} ${verticalSpacing}px)`;

    return `${horizontal}, ${vertical}`;
}

function createDenseCrossPattern(fgColor) {
    const verticalSpacing = 2 + Math.floor(Math.random() * 8);
    const horizontalSpacing = 2 + Math.floor(Math.random() * 8);

    const horizontal = `repeating-linear-gradient(0deg, transparent 0px, transparent ${horizontalSpacing - 1}px, ${fgColor} ${horizontalSpacing - 1}px, ${fgColor} ${horizontalSpacing}px)`;
    const vertical = `repeating-linear-gradient(90deg, transparent 0px, transparent ${verticalSpacing - 1}px, ${fgColor} ${verticalSpacing - 1}px, ${fgColor} ${verticalSpacing}px)`;

    return `${horizontal}, ${vertical}`;
}

// ============================================
// SUBDIVISION ALGORITHM
// ============================================

function subdivideRectangle(x, y, width, height, depth, maxDepth, parentElement) {
    const minDepth = maxDepth - 5;
    const canStop = depth <= minDepth;

    if (depth === 0 || (canStop && ((width < 60 && height < 60) || Math.random() < 0.15))) {
        const rect = document.createElement('div');
        rect.className = 'rectangle';
        rect.style.left = x + 'px';
        rect.style.top = y + 'px';
        rect.style.width = width + 'px';
        rect.style.height = height + 'px';

        const bgColor = randomColor();
        rect.style.backgroundColor = bgColor;

        if (selectedVariant === 'glyphs') {
            createGlyphContent(rect, width, height, bgColor);
        } else {
            createLineContent(rect, bgColor);
        }

        parentElement.appendChild(rect);
        return;
    }

    const aspectRatio = width / height;
    let splitHorizontally;

    if (aspectRatio > 1.5) {
        splitHorizontally = true;
    } else if (aspectRatio < 0.67) {
        splitHorizontally = false;
    } else {
        splitHorizontally = Math.random() < 0.5;
    }

    if (splitHorizontally) {
        const splitRatio = 0.3 + Math.random() * 0.4;
        const splitX = width * splitRatio;

        subdivideRectangle(x, y, splitX, height, depth - 1, maxDepth, parentElement);
        subdivideRectangle(x + splitX, y, width - splitX, height, depth - 1, maxDepth, parentElement);
    } else {
        const splitRatio = 0.3 + Math.random() * 0.4;
        const splitY = height * splitRatio;

        subdivideRectangle(x, y, width, splitY, depth - 1, maxDepth, parentElement);
        subdivideRectangle(x, y + splitY, width, height - splitY, depth - 1, maxDepth, parentElement);
    }
}

// ============================================
// CONTENT CREATION
// ============================================

function createGlyphContent(rect, width, height, bgColor) {
    const aspectRatio = width / height;

    if (aspectRatio > 2.2) {
        const numGlyphs = Math.floor(width / (height * 0.8));
        const fontSize = height * 0.65;
        const fgColor = getContrastingColor(bgColor);

        rect.style.flexDirection = 'row';
        rect.style.justifyContent = 'space-around';

        for (let i = 0; i < numGlyphs; i++) {
            const span = document.createElement('span');
            span.className = 'glyph';
            span.textContent = randomGlyph();
            span.style.fontSize = fontSize + 'px';
            span.style.color = fgColor;
            span.style.lineHeight = '1';
            rect.appendChild(span);
        }
    } else if (aspectRatio < 0.45) {
        const numGlyphs = Math.floor(height / (width * 0.8));
        const fontSize = width * 0.65;
        const fgColor = getContrastingColor(bgColor);

        rect.style.flexDirection = 'column';
        rect.style.justifyContent = 'space-around';

        for (let i = 0; i < numGlyphs; i++) {
            const span = document.createElement('span');
            span.className = 'glyph';
            span.textContent = randomGlyph();
            span.style.fontSize = fontSize + 'px';
            span.style.color = fgColor;
            span.style.lineHeight = '1';
            rect.appendChild(span);
        }
    } else {
        const fontSize = Math.min(width, height) * 0.65;
        const fgColor = getContrastingColor(bgColor);

        const span = document.createElement('span');
        span.className = 'glyph';
        span.textContent = randomGlyph();
        span.style.fontSize = fontSize + 'px';
        span.style.color = fgColor;
        span.style.lineHeight = '1';
        rect.appendChild(span);
    }
}

function createLineContent(rect, bgColor) {
    const fgColor = getContrastingColor(bgColor);
    const patternData = createPattern(fgColor);

    rect.style.backgroundImage = patternData.pattern;
    rect.dataset.patternType = patternData.type;
    rect.dataset.duration = (10 + Math.random() * 20).toFixed(2);
    rect.dataset.direction = Math.random() < 0.5 ? 'normal' : 'reverse';

    const borderColor = randomColor();
    const borderWidth = Math.random() < 0.5 ? 1 : 2;
    rect.style.border = `${borderWidth}px solid ${borderColor}`;
}

// ============================================
// GLYPH MORPHING (for glyph variant)
// ============================================

function morphGlyph(glyphElement) {
    const useDive = Math.random() < 0.5;
    const outClass = useDive ? 'is-diving-out' : 'is-fading-out';
    const inClass = useDive ? 'is-diving-in' : 'is-fading-in';
    const duration = CONFIG.animationDuration * 1000;

    glyphElement.classList.add(outClass);

    setTimeout(() => {
        const newGlyph = randomGlyph();
        glyphElement.textContent = newGlyph;

        glyphElement.classList.remove(outClass);
        glyphElement.classList.add(inClass);

        setTimeout(() => {
            glyphElement.classList.remove(inClass);
        }, duration);

    }, duration / 2);
}

function startGlyphMorphing() {
    setInterval(() => {
        const allGlyphs = document.querySelectorAll('.glyph');
        if (allGlyphs.length === 0) return;

        const numToMorph = 1 + Math.floor(Math.random() * Math.min(5, allGlyphs.length));

        for (let i = 0; i < numToMorph; i++) {
            const randomIndex = Math.floor(Math.random() * allGlyphs.length);
            const glyphElement = allGlyphs[randomIndex];

            const delay = Math.random() * 2000;
            setTimeout(() => {
                morphGlyph(glyphElement);
            }, delay);
        }
    }, CONFIG.glyphMorphInterval * 1000);
}

// ============================================
// LINE ANIMATION (for lines variant)
// ============================================

let activeAnimations = new Set();
const MAX_SIMULTANEOUS_ANIMATIONS = 5;

function startRectangleAnimation(rect) {
    const patternType = rect.dataset.patternType;
    const duration = rect.dataset.duration;
    const direction = rect.dataset.direction;

    let animationName = '';
    if (patternType === 'vertical') {
        animationName = 'flow-horizontal';
    } else if (patternType === 'horizontal') {
        animationName = 'flow-vertical';
    } else if (patternType === 'cross') {
        animationName = 'flow-diagonal';
    }

    if (!rect.style.animation || rect.style.animation === 'none') {
        rect.style.animation = `${animationName} ${duration}s linear infinite ${direction}`;
    }

    rect.style.animationPlayState = 'running';
    activeAnimations.add(rect);
}

function stopRectangleAnimation(rect) {
    rect.style.animationPlayState = 'paused';
    activeAnimations.delete(rect);
}

function cycleAnimations() {
    const allRectangles = Array.from(document.querySelectorAll('.rectangle'));
    if (allRectangles.length === 0) return;

    activeAnimations.forEach(rect => stopRectangleAnimation(rect));

    const numToAnimate = Math.min(
        1 + Math.floor(Math.random() * MAX_SIMULTANEOUS_ANIMATIONS),
        allRectangles.length
    );

    const shuffled = allRectangles.sort(() => Math.random() - 0.5);
    for (let i = 0; i < numToAnimate; i++) {
        startRectangleAnimation(shuffled[i]);
    }
}

function startAnimationCycling() {
    cycleAnimations();

    setInterval(() => {
        cycleAnimations();
    }, 8000 + Math.random() * 4000);
}

// ============================================
// GENERATION & REGENERATION
// ============================================

let container;

function generate() {
    container.innerHTML = '';
    colors = generatePalette();
    subdivideRectangle(0, 0, window.innerWidth, window.innerHeight, CONFIG.maxDepth, CONFIG.maxDepth, container);

    // Start animations based on variant
    if (selectedVariant === 'glyphs') {
        startGlyphMorphing();
    } else {
        startAnimationCycling();
    }
}

function regenerate() {
    container.innerHTML = '';
    colors = generatePalette();
    subdivideRectangle(0, 0, window.innerWidth, window.innerHeight, CONFIG.maxDepth, CONFIG.maxDepth, container);
}

// ============================================
// INITIALIZATION
// ============================================

function init() {
    // Inject styles
    injectStyles();

    // Create container
    container = document.createElement('div');
    container.id = 'container';
    document.body.appendChild(container);

    // Initial generation
    generate();

    // Click to regenerate
    container.addEventListener('click', regenerate);

    // Handle window resize
    window.addEventListener('resize', () => {
        regenerate();
    });

    console.log('Insert25 initialized with variant:', selectedVariant);
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
