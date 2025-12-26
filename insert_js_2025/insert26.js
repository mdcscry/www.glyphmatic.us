// insert26.js - Animated Bezier Curves with Morphing Glyphs
// Grid-based SVG visualization with multiple animation presets

console.log('insert26.js loaded');

// Define stub function expected by g.us3.htm watermark onclick
function changeHtmlDisplayInline() {
    // No-op - insert26 doesn't need this functionality
}

// ============================================
// GLOBAL STATE
// ============================================

let palette = [];
let animatedPaths = [];
let drawingPaths = [];
let currentPreset = null;
let selectedPresetIndex = null; // null means random mode
let gridContainer;

// ============================================
// ANIMATION PRESETS
// ============================================

const ANIMATION_PRESETS = [
    {
        name: "Original Pulse",
        curveCycle: false,
        curveBreathing: false,
        glyphFadeIn: { min: 300, max: 2000 },
        drawSpeed: { min: 2000, max: 8000 }
    },
    {
        name: "Slow Emergence",
        curveCycle: false,
        curveBreathing: true,
        glyphFadeIn: { min: 2000, max: 12000 },
        drawSpeed: { min: 5000, max: 25000 }
    },
    {
        name: "Simple Loop",
        curveCycle: true,
        cyclePhases: { draw: 0.5, pause1: 0, undraw: 0.5, pause2: 0 },
        curveBreathing: true,
        glyphFadeIn: { min: 1000, max: 6000 },
        drawSpeed: { min: 3000, max: 15000 },
        startDrawnPercent: 0
    },
    {
        name: "Breathing Pause",
        curveCycle: true,
        cyclePhases: { draw: 0.33, pause1: 0.17, undraw: 0.33, pause2: 0.17 },
        curveBreathing: true,
        glyphFadeIn: { min: 2000, max: 12000 },
        drawSpeed: { min: 5000, max: 25000 },
        startDrawnPercent: 0
    },
    {
        name: "Balanced Rhythm",
        curveCycle: true,
        cyclePhases: { draw: 0.35, pause1: 0.15, undraw: 0.35, pause2: 0.15 },
        curveBreathing: true,
        glyphFadeIn: { min: 2000, max: 12000 },
        drawSpeed: { min: 5000, max: 25000 },
        startDrawnPercent: 0.1
    },
    {
        name: "Fast Pulse",
        curveCycle: true,
        cyclePhases: { draw: 0.4, pause1: 0.1, undraw: 0.4, pause2: 0.1 },
        curveBreathing: true,
        glyphFadeIn: { min: 500, max: 3000 },
        drawSpeed: { min: 1000, max: 8000 },
        startDrawnPercent: 0.15
    },
    {
        name: "Meditative",
        curveCycle: true,
        cyclePhases: { draw: 0.3, pause1: 0.2, undraw: 0.3, pause2: 0.2 },
        curveBreathing: true,
        glyphFadeIn: { min: 3000, max: 15000 },
        drawSpeed: { min: 8000, max: 35000 },
        startDrawnPercent: 0.05
    },
    {
        name: "Shape Shifter",
        curveCycle: true,
        cyclePhases: { draw: 0.35, pause1: 0.15, undraw: 0.35, pause2: 0.15 },
        curveBreathing: true,
        glyphFadeIn: { min: 2000, max: 12000 },
        drawSpeed: { min: 5000, max: 25000 },
        startDrawnPercent: 0.1,
        morphCurves: true
    },
    {
        name: "Slow Shifter",
        curveCycle: true,
        cyclePhases: { draw: 0.35, pause1: 0.15, undraw: 0.35, pause2: 0.15 },
        curveBreathing: true,
        glyphFadeIn: { min: 4000, max: 24000 },
        drawSpeed: { min: 10000, max: 50000 },
        startDrawnPercent: 0.1,
        morphCurves: true
    }
];

const SYMBOL_GLYPHS = [
    '○', '🞅', '🞄', '●',
    '◌','⚬','⠈','⬭','⯺','⯼','𐄡','𐄜',
    '𓇳','𓋪','𓐎','𓏸','𓊗','𓇸','𓆇','𓄹','𓄼','𓄺',
    '𓃎','🜳','🜛','🝿','🜔','🜚','🤅',
    '🤇','🤈','𖠁','𖡦','𖥚','𖧾','𖥤','𖥋',
    '𖣐','𖢨','𖡼','𖠟',
    '𔓷','𔐙','𔓏','𔓐','𔕇','𔗢','𔘒',
    '𑫏','ⱄ','Ⱉ','Ⱄ','⏾','⌓','⌔',
    'ᯆ','᯼','ᯅ','᭦','᪣','ᦹ','ᝪ','ᚙ','፨','֍','֎','߷','ࠈ','ࡇ','ࡔ',
    '৩','ଞ','ஃ','౷','ౚ','ൠ','ෆ','෴','༓','༜','༶','࿂','࿃',
    '࿀','࿁','ဧ','ဗ',
    '꧁꧂',
    '꧞','𐂴','𐇛','𐇣','𐙮',
    '𐙔','𐘺','𐠗','𐠅'
];

const LAYOUTS = [
    [1, 1], [1, 2], [2, 1], [2, 2], [2, 3], [3, 2], [2, 4], [4, 2],
    [3, 4], [4, 3], [4, 4], [3, 6], [4, 5], [5, 4], [4, 6],
    [5, 5], [3, 7], [4, 7], [3, 9],
    [5, 6], [4, 8]
];

// ============================================
// INJECT STYLES
// ============================================

function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
        body, html {
            margin: 0;
            padding: 0;
            background-color: #000;
            overflow: hidden;
        }
        #grid-container {
            position: fixed;
            top: 0;
            left: 0;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(2, 1fr);
            width: 100vw;
            height: 100vh;
            gap: 2px;
            z-index: 1;
            pointer-events: none;
        }
        .panel {
            background-color: transparent;
            pointer-events: auto;
        }
        svg {
            display: block;
            width: 100%;
            height: 100%;
            overflow: visible;
        }
        #info-panel {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid rgba(255, 255, 255, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-family: sans-serif;
            z-index: 1000;
        }
        #info-panel.expanded {
            border-radius: 12px;
            width: 280px;
            height: auto;
            padding: 16px;
            display: block;
        }
        #info-panel .circle-icon {
            display: block;
            font-size: 18px;
        }
        #info-panel.expanded .circle-icon {
            display: none;
        }
        #info-panel .info-content {
            display: none;
        }
        #info-panel.expanded .info-content {
            display: block;
        }
        .info-row {
            margin: 8px 0;
            font-size: 12px;
            font-family: sans-serif;
        }
        .info-label {
            opacity: 0.7;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .info-value {
            margin-top: 2px;
        }
        .palette-colors {
            display: flex;
            gap: 4px;
            margin-top: 4px;
        }
        .palette-color {
            width: 20px;
            height: 20px;
            border-radius: 3px;
        }
        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            25% {
                transform: scale(0.92);
            }
            75% {
                transform: scale(1.08);
            }
            100% {
                transform: scale(1);
            }
        }
        .pulsing-glyph {
            animation: pulse 10s ease-in-out infinite;
            transform-origin: center;
            transform-box: fill-box;
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// PALETTE GENERATION
// ============================================

function generatePalette() {
    palette = [];
    const paletteSize = 2 + Math.floor(Math.random() * 5);
    const baseHue = Math.random() * 360;

    for (let i = 0; i < paletteSize; i++) {
        const hue = (baseHue + (i * 25) + (Math.random() * 100)) % 360;
        const saturation = 10 + Math.random() * 90;
        const lightness = 10 + Math.random() * 90;
        palette.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    }
}

function getRandomColorFromPalette() {
    return palette[Math.floor(Math.random() * palette.length)];
}

// ============================================
// BEZIER PATH GENERATION
// ============================================

function generateRandomBezierPath(width, height) {
    const startX = Math.random() * width;
    const startY = Math.random() * height;
    const endX = Math.random() * width;
    const endY = Math.random() * height;
    const cp1X = (Math.random() - 0.5) * width * 2;
    const cp1Y = (Math.random() - 0.5) * height * 2;
    const cp2X = (Math.random() - 0.5) * width * 2 + width;
    const cp2Y = (Math.random() - 0.5) * height * 2 + height;

    return `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
}

function drawRandomBezierSVG(svgElement, width, height) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const pathData = generateRandomBezierPath(width, height);

    path.setAttribute('d', pathData);
    path.setAttribute('stroke', getRandomColorFromPalette());
    path.setAttribute('fill', 'none');

    const baseWidth = 1 + Math.random() * 2;
    const baseOpacity = 0.1 + Math.random() * 0.6;
    const widthVariation = 0.3 + Math.random() * 0.8;
    const speed = 0.0001 + Math.random() * 0.0002;
    const phase = Math.random() * Math.PI * 2;

    path.setAttribute('stroke-opacity', `${baseOpacity}`);
    svgElement.appendChild(path);

    const pathLength = path.getTotalLength();
    const drawDuration = currentPreset.drawSpeed.min +
        Math.random() * (currentPreset.drawSpeed.max - currentPreset.drawSpeed.min);
    const drawDelay = Math.random() * 10000;

    const startDrawn = currentPreset.startDrawnPercent &&
        Math.random() < currentPreset.startDrawnPercent;

    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = startDrawn ? 0 : pathLength;

    drawingPaths.push({
        element: path,
        pathLength: pathLength,
        duration: drawDuration,
        delay: drawDelay,
        startTime: null,
        startDrawn: startDrawn,
        curveCycle: currentPreset.curveCycle,
        cyclePhases: currentPreset.cyclePhases,
        width: width,
        height: height,
        morphCurves: currentPreset.morphCurves,
        lastMorphPhase: -1
    });

    animatedPaths.push({
        element: path,
        baseWidth: baseWidth,
        widthVariation: widthVariation,
        speed: speed,
        phase: phase
    });
}

function drawRandomGlyphSVG(svgElement, width, height, glyphToDraw) {
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');

    text.setAttribute('x', `${Math.random() * width}`);
    text.setAttribute('y', `${Math.random() * height}`);

    const fontSize = 10 + Math.random() * 80;
    const targetOpacity = 0.3 + Math.random() * 0.2;
    const pulseDelay = Math.random() * 3;

    text.setAttribute('fill', getRandomColorFromPalette());
    text.setAttribute('font-size', `${fontSize}px`);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'central');
    text.setAttribute('class', 'pulsing-glyph');
    text.setAttribute('style', `animation-delay: ${pulseDelay}s;`);
    text.setAttribute('opacity', '0');

    text.textContent = glyphToDraw;
    svgElement.appendChild(text);

    const fadeInDuration = currentPreset.glyphFadeIn.min +
        Math.random() * (currentPreset.glyphFadeIn.max - currentPreset.glyphFadeIn.min);
    const fadeInDelay = Math.random() * 6000;

    setTimeout(() => {
        const startTime = performance.now();
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / fadeInDuration, 1);
            const currentOpacity = targetOpacity * progress;
            text.setAttribute('opacity', currentOpacity);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                text.setAttribute('opacity', targetOpacity);
            }
        };
        requestAnimationFrame(animate);
    }, fadeInDelay);
}

// ============================================
// ANIMATION LOOP
// ============================================

function animatePaths(timestamp) {
    drawingPaths.forEach((pathData) => {
        if (pathData.startTime === null) {
            if (!pathData.delayStart) {
                pathData.delayStart = timestamp;
            }
            if (timestamp - pathData.delayStart >= pathData.delay) {
                pathData.startTime = timestamp;
            }
        } else {
            if (pathData.curveCycle) {
                const elapsed = timestamp - pathData.startTime;
                const cycleDuration = pathData.duration * 3;
                let cycleProgress = (elapsed % cycleDuration) / cycleDuration;

                if (pathData.startDrawn) {
                    cycleProgress = (cycleProgress + 0.5) % 1;
                }

                const phases = pathData.cyclePhases;
                const drawEnd = phases.draw;
                const pause1End = drawEnd + phases.pause1;
                const undrawEnd = pause1End + phases.undraw;

                if (pathData.morphCurves && cycleProgress >= undrawEnd) {
                    const currentCycle = Math.floor(elapsed / cycleDuration);
                    if (currentCycle !== pathData.lastMorphPhase) {
                        const newPathData = generateRandomBezierPath(pathData.width, pathData.height);
                        pathData.element.setAttribute('d', newPathData);
                        pathData.pathLength = pathData.element.getTotalLength();
                        pathData.element.style.strokeDasharray = pathData.pathLength;
                        pathData.lastMorphPhase = currentCycle;
                    }
                }

                let drawProgress;
                if (cycleProgress < drawEnd) {
                    drawProgress = cycleProgress / phases.draw;
                } else if (cycleProgress < pause1End) {
                    drawProgress = 1;
                } else if (cycleProgress < undrawEnd) {
                    drawProgress = 1 - ((cycleProgress - pause1End) / phases.undraw);
                } else {
                    drawProgress = 0;
                }

                const offset = pathData.pathLength * (1 - drawProgress);
                pathData.element.style.strokeDashoffset = offset;
            } else {
                const elapsed = timestamp - pathData.startTime;
                const progress = Math.min(elapsed / pathData.duration, 1);
                const offset = pathData.pathLength * (1 - progress);
                pathData.element.style.strokeDashoffset = offset;

                if (progress >= 1) {
                    pathData.element.style.strokeDasharray = 'none';
                    pathData.element.style.strokeDashoffset = '0';
                }
            }
        }
    });

    if (currentPreset && currentPreset.curveBreathing) {
        animatedPaths.forEach(pathData => {
            const oscillation = Math.sin(timestamp * pathData.speed + pathData.phase);
            const width = pathData.baseWidth + (oscillation * pathData.widthVariation);
            pathData.element.setAttribute('stroke-width', width);
        });
    }

    requestAnimationFrame(animatePaths);
}

// ============================================
// INFO PANEL
// ============================================

function updateInfoPanel(rows, cols, numCurves, numGlyphs, selectedGlyph) {
    const infoPanel = document.getElementById('info-panel');

    document.getElementById('preset-name').textContent = currentPreset.name;
    document.getElementById('layout-info').textContent = `${cols} × ${rows}`;
    document.getElementById('curves-count').textContent = `${numCurves} per cell`;
    document.getElementById('glyphs-count').textContent = `${numGlyphs} per cell`;
    document.getElementById('selected-glyph').textContent = selectedGlyph;

    const paletteDisplay = document.getElementById('palette-display');
    paletteDisplay.innerHTML = '';
    palette.forEach(color => {
        const colorDiv = document.createElement('div');
        colorDiv.className = 'palette-color';
        colorDiv.style.backgroundColor = color;
        paletteDisplay.appendChild(colorDiv);
    });

    infoPanel.style.borderColor = palette[0];
    document.querySelector('.circle-icon').style.color = palette[0];
}

// ============================================
// ART GENERATION
// ============================================

function generateArt() {
    gridContainer.innerHTML = '';
    animatedPaths = [];
    drawingPaths = [];

    if (selectedPresetIndex !== null) {
        currentPreset = ANIMATION_PRESETS[selectedPresetIndex];
        console.log(`🎨 Animation Preset [${selectedPresetIndex + 1}]: ${currentPreset.name}`);
    } else {
        currentPreset = ANIMATION_PRESETS[Math.floor(Math.random() * ANIMATION_PRESETS.length)];
        console.log(`🎨 Animation Preset [Random]: ${currentPreset.name}`);
    }

    const [rows, cols] = LAYOUTS[Math.floor(Math.random() * LAYOUTS.length)];
    const totalCells = rows * cols;

    gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    generatePalette();

    const numCurves = 4 + Math.floor(Math.random() * 200);
    const numGlyphs = 1 + Math.floor(Math.random() * 5);
    const selectedGlyph = SYMBOL_GLYPHS[Math.floor(Math.random() * SYMBOL_GLYPHS.length)];

    for (let i = 0; i < totalCells; i++) {
        const panel = document.createElement('div');
        panel.className = 'panel';
        gridContainer.appendChild(panel);

        const panelWidth = panel.clientWidth;
        const panelHeight = panel.clientHeight;

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        panel.appendChild(svg);

        for (let j = 0; j < numGlyphs; j++) {
            drawRandomGlyphSVG(svg, panelWidth, panelHeight, selectedGlyph);
        }

        for (let j = 0; j < numCurves; j++) {
            drawRandomBezierSVG(svg, panelWidth, panelHeight);
        }
    }

    updateInfoPanel(rows, cols, numCurves, numGlyphs, selectedGlyph);
}

// ============================================
// INITIALIZATION
// ============================================

function init() {
    injectStyles();

    // Create grid container
    gridContainer = document.createElement('div');
    gridContainer.id = 'grid-container';
    document.body.appendChild(gridContainer);

    // Create info panel
    const infoPanel = document.createElement('div');
    infoPanel.id = 'info-panel';
    infoPanel.innerHTML = `
        <span class="circle-icon">i</span>
        <div class="info-content">
            <div class="info-row">
                <div class="info-label">Preset</div>
                <div class="info-value" id="preset-name">-</div>
            </div>
            <div class="info-row">
                <div class="info-label">Layout</div>
                <div class="info-value" id="layout-info">-</div>
            </div>
            <div class="info-row">
                <div class="info-label">Curves</div>
                <div class="info-value" id="curves-count">-</div>
            </div>
            <div class="info-row">
                <div class="info-label">Glyphs</div>
                <div class="info-value" id="glyphs-count">-</div>
            </div>
            <div class="info-row">
                <div class="info-label">Selected Glyph</div>
                <div class="info-value" id="selected-glyph">-</div>
            </div>
            <div class="info-row">
                <div class="info-label">Palette</div>
                <div class="palette-colors" id="palette-display"></div>
            </div>
        </div>
    `;
    document.body.appendChild(infoPanel);

    // Toggle info panel
    infoPanel.addEventListener('click', (e) => {
        e.stopPropagation();
        infoPanel.classList.toggle('expanded');
    });

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        const key = e.key;
        if (key >= '0' && key <= '9') {
            const presetNum = parseInt(key);
            if (presetNum === 0) {
                selectedPresetIndex = null;
                console.log('🎲 Switched to random preset mode');
            } else if (presetNum <= ANIMATION_PRESETS.length) {
                selectedPresetIndex = presetNum - 1;
                console.log(`🎯 Selected preset ${presetNum}: ${ANIMATION_PRESETS[selectedPresetIndex].name}`);
            }
            generateArt();
        }
    });

    // Initial generation
    generateArt();
    requestAnimationFrame(animatePaths);

    // Event listeners
    window.addEventListener('resize', generateArt);
    document.body.addEventListener('click', generateArt);

    console.log('Insert26 initialized - Animated Bezier Curves');
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
