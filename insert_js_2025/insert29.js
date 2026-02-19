/**
 * Insert 29: Lotus of Life Mandala - Multi-Flavor Edition
 * Consolidates 6 lotus experiment variants into one file with keyboard-selectable flavors
 * 
 * Flavors:
 * 0: Lotus of Life - Enhanced with radial spokes, variable rings, and info panel
 * 1: Lotus of Life Basic - Simple mandala with toroidal circles (no info panel)
 * 2: Lotus of Life CirclePack - Circle packing algorithm
 * 3: Lotus of Life CirclePack Grid - Circle packing with grid layout
 * 4: Lotus of Life CirclePack NoOverlap - Circle packing without overlaps
 * 5: Lotus of Life Grid - Grid-based multi-mandala layout
 */

console.log('insert29.js loaded');

// Store current flavor and wrapper for cleanup
let currentFlavor = null;
let mainContainer = null;

// Required stub function for g.us3.htm watermark onclick
function changeHtmlDisplayInline() {
    // No-op - insert29 doesn't need this functionality
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function createCircle(x, y, diameter, className, baseSize) {
    const circle = document.createElement('div');
    circle.className = className;
    circle.style.width = (diameter / baseSize * 100) + '%';
    circle.style.height = (diameter / baseSize * 100) + '%';
    circle.style.left = ((x - diameter / 2) / baseSize * 100) + '%';
    circle.style.top = ((y - diameter / 2) / baseSize * 100) + '%';
    return circle;
}

function createConcentricRing(diameter, baseSize, centerX, centerY) {
    const ring = document.createElement('div');
    ring.className = 'concentric-ring';
    ring.style.width = (diameter / baseSize * 100) + '%';
    ring.style.height = (diameter / baseSize * 100) + '%';
    ring.style.left = ((centerX - diameter / 2) / baseSize * 100) + '%';
    ring.style.top = ((centerY - diameter / 2) / baseSize * 100) + '%';
    return ring;
}

function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1&display=swap');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a15 100%);
            overflow: hidden;
            position: relative;
        }

        /* Force any watermark or overlay from g.us3.htm to be positioned fixed in top-left */
        body > *:not(#lotus-container):not(script):not(style):not(.info-panel):not(#glyphmatic1):not([class*="watermark"]) {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            z-index: 1 !important;
            pointer-events: auto;
        }

        /* Watermark positioning - upper-left with high z-index */
        #glyphmatic1,
        [class*="watermark"] {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            z-index: 9999 !important;
            pointer-events: auto;
        }

        #lotus-container {
            position: relative;
            width: 90vh;
            height: 90vh;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
        }

        #lotus-container.single-mandala {
            border-radius: 50%;
        }

        .mandala-container {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
        }

        @keyframes rotateClockwise {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        @keyframes rotateCounterClockwise {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
        }

        .circle {
            position: absolute;
            border-radius: 50%;
            border: 1.5px solid;
            background: transparent;
            pointer-events: none;
        }

        .concentric-ring {
            position: absolute;
            border-radius: 50%;
            border-width: 2px;
            border-style: solid;
            pointer-events: none;
        }

        .fol-circle {
            width: 100px;
            height: 100px;
        }

        .fol-center-circle {
            width: 100px;
            height: 100px;
            border-width: 2px;
        }

        .center-glow {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
        }

        .lotus-petal {
            position: absolute;
            font-family: 'Shippori Mincho B1', serif;
            font-size: 25vh;
            font-weight: 100;
            line-height: 1;
            pointer-events: none;
            transform-origin: center center;
            z-index: -1;
        }

        .outer-ring {
            position: absolute;
            border-radius: 50%;
            border-width: 2px;
            border-style: solid;
            border-color: #000;
            background: transparent;
            pointer-events: none;
            z-index: 1;
        }

        .grid-container {
            position: relative;
            width: 100vw;
            height: 100vh;
            display: grid;
            grid-gap: 10px;
            padding: 10px;
            overflow: hidden;
        }

        .grid-2x2 { grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(2, 1fr); }
        .grid-3x3 { grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(3, 1fr); }

        .lotus-cell {
            position: relative;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 2px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .lotus-cell-container {
            position: relative;
            width: 90%;
            height: 90%;
            max-width: 90vh;
            max-height: 90vh;
        }

        .lotus-circle {
            position: absolute;
            border-radius: 50%;
            border-width: 1.5px;
            border-style: solid;
            background: transparent;
            pointer-events: none;
        }

        .lotus-concentric-ring {
            position: absolute;
            border-radius: 50%;
            border-width: 2px;
            border-style: solid;
            pointer-events: none;
        }

        @keyframes rotateLotus-cw {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        @keyframes rotateLotus-ccw {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
        }

        .info-panel {
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(26, 26, 46, 0.9);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            padding: 10px 15px;
            color: #ffffff;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            z-index: 1000;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .info-panel:hover {
            background: rgba(26, 26, 46, 0.95);
            border-color: rgba(255, 255, 255, 0.4);
        }

        .info-panel.collapsed {
            padding: 6px 10px;
        }

        .info-panel.collapsed .info-content {
            display: none;
        }

        .info-panel .info-header {
            font-weight: bold;
            margin-bottom: 5px;
            margin: 0;
        }

        .info-panel.collapsed .info-header {
            margin-bottom: 0;
        }

        .info-panel.collapsed .info-header::after {
            content: ' [+]';
        }

        .info-panel:not(.collapsed) .info-header::after {
            content: ' [−]';
        }

        /* Additional watermark positioning rules for g.us3.htm injection */
        /* If watermark is a direct child, force it fixed with highest z-index */
        img[src*="glyphmatic"], 
        img[src*="watermark"],
        .watermark,
        .glyph-watermark {
            position: fixed !important;
            top: 10px !important;
            left: 10px !important;
            z-index: 9999 !important;
            max-width: 200px !important;
            max-height: 200px !important;
            pointer-events: auto !important;
            visibility: visible !important;
            opacity: 1 !important;
        }

        /* Ensure info panel stays on top */
        #infoPanel {
            z-index: 1001 !important;
        }

        /* Lotus Circle Packing state classes (flavor 0) */
        .lotus-container {
            position: absolute;
            transform: translate(-50%, -50%);
            pointer-events: auto;
            opacity: 0;
            cursor: pointer;
            transition: all 1s ease;
        }

        .lotus-container.focused {
            z-index: 9999;
            cursor: pointer;
        }

        .lotus-container.hidden {
            opacity: 0 !important;
            pointer-events: none;
        }

        .lotus-container.visible {
            opacity: 1;
        }

        .lotus-container.rotating-cw {
            animation: rotateLotus-cw var(--rotation-duration, 20s) linear infinite;
        }

        .lotus-container.rotating-ccw {
            animation: rotateLotus-ccw var(--rotation-duration, 20s) linear infinite;
        }

        .lotus-container.fading-out {
            opacity: 0;
        }

        @keyframes rotateLotus-cw {
            from {
                transform: translate(-50%, -50%) rotate(0deg) scale(var(--lotus-scale, 1));
            }
            to {
                transform: translate(-50%, -50%) rotate(360deg) scale(var(--lotus-scale, 1));
            }
        }

        @keyframes rotateLotus-ccw {
            from {
                transform: translate(-50%, -50%) rotate(0deg) scale(var(--lotus-scale, 1));
            }
            to {
                transform: translate(-50%, -50%) rotate(-360deg) scale(var(--lotus-scale, 1));
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// FLAVOR CREATION FUNCTIONS
// ============================================

function createFlavor0(container, palette, baseSize, centerX, centerY) {
    // Flavor 1: Lotus Circle Packing - Complete implementation from lotus_circlepack.htm
    // Full viewport background 100vw x 100vh with random warm background color
    // Circle packing algorithm that scatters multiple lotus containers
    // Each lotus is clickable with focus/replace functionality
    // Lotuses rotate independently
    
    container.id = 'packing-container';
    container.style.width = '100vw';
    container.style.height = '100vh';
    
    // Random background color from warm/light palette + black for contrast
    const bgPalette = ['AntiqueWhite', 'Linen', 'OldLace', 'Cornsilk', 'BlanchedAlmond', 'PapayaWhip', 'Wheat', 'NavajoWhite', 'black'];
    const randomBgColor = bgPalette[Math.floor(Math.random() * bgPalette.length)];
    container.style.backgroundColor = randomBgColor;
    container.style.position = 'relative';
    container.style.overflow = 'visible';
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    const centerX_cp = width / 2;
    const centerY_cp = height / 2;

    let circles = [];
    let lotusElements = [];
    let focusedLotus = null;

    function distance(p1, p2) {
        return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
    }

    function generateCirclePacking() {
        const margin = 0;
        const numBoundaryPoints = 3 + Math.random() * 18;
        const rectWidth = width - margin * 2;
        const rectHeight = height - margin * 2;
        const perimeter = 2 * (rectWidth + rectHeight);
        const segmentLength = perimeter / numBoundaryPoints;

        circles = [];

        // Generate boundary points around rectangle perimeter
        for (let i = 0; i < numBoundaryPoints; i++) {
            const dist = i * segmentLength;
            let x, y;

            if (dist < rectWidth) {
                // Top edge
                x = margin + dist;
                y = margin;
            } else if (dist < rectWidth + rectHeight) {
                // Right edge
                x = width - margin;
                y = margin + (dist - rectWidth);
            } else if (dist < 2 * rectWidth + rectHeight) {
                // Bottom edge
                x = width - margin - (dist - rectWidth - rectHeight);
                y = height - margin;
            } else {
                // Left edge
                x = margin;
                y = height - margin - (dist - 2 * rectWidth - rectHeight);
            }

            const r = 80 + Math.random() * 60; // Larger boundary circles
            circles.push({ x, y, r, type: 'boundary', id: i });
        }

        // Generate interior circles with random placement
        const numInterior = Math.floor(3 + Math.random() * 8); // 3-10 circles

        for (let i = 0; i < numInterior; i++) {
            let x, y, r;
            let attempts = 0;
            do {
                x = margin + Math.random() * rectWidth;
                y = margin + Math.random() * rectHeight;
                r = 150 + Math.random() * 150; // Much larger interior circles
                attempts++;
            } while (attempts < 100 && circles.some(c => distance({x, y}, c) < r + c.r + 20));

            if (attempts < 100) {
                circles.push({ x, y, r, type: 'interior', id: numBoundaryPoints + i });
            }
        }

        // Simple relaxation to improve packing
        for (let iter = 0; iter < 150; iter++) {
            for (let i = 0; i < circles.length; i++) {
                if (circles[i].type === 'boundary') continue;

                let fx = 0, fy = 0;

                // Attract to center slightly
                fx += (centerX_cp - circles[i].x) * 0.005;
                fy += (centerY_cp - circles[i].y) * 0.005;

                // Repel from other circles
                for (let j = 0; j < circles.length; j++) {
                    if (i === j) continue;
                    const d = distance(circles[i], circles[j]);
                    const minDist = circles[i].r + circles[j].r;
                    if (d < minDist * 1.8) {
                        const force = (minDist * 1.8 - d) / d;
                        fx += (circles[i].x - circles[j].x) * force * 0.4;
                        fy += (circles[i].y - circles[j].y) * force * 0.4;
                    }
                }

                circles[i].x += fx;
                circles[i].y += fy;

                // Keep in bounds
                circles[i].x = Math.max(margin + circles[i].r, Math.min(width - margin - circles[i].r, circles[i].x));
                circles[i].y = Math.max(margin + circles[i].r, Math.min(height - margin - circles[i].r, circles[i].y));
            }
        }
    }

    function createLotus(circle, color1, color2) {
        const lotusDiv = document.createElement('div');
        lotusDiv.className = 'lotus-container';
        lotusDiv.style.left = `${circle.x}px`;
        lotusDiv.style.top = `${circle.y}px`;
        lotusDiv.style.width = `${circle.r * 2}px`;
        lotusDiv.style.height = `${circle.r * 2}px`;

        // Store reference to the circle data
        lotusDiv.circleData = circle;

        const inner = document.createElement('div');
        inner.style.position = 'relative';
        inner.style.width = '100%';
        inner.style.height = '100%';

        // Randomly add gradient background (50% chance)
        if (Math.random() < 0.5) {
            const gradientStyle = Math.random() < 0.5 ?
                `radial-gradient(circle at center, ${color1}22 0%, ${color2}11 50%, transparent 70%)` :
                `radial-gradient(circle at center, ${color2}22 0%, ${color1}11 50%, transparent 70%)`;
            inner.style.background = gradientStyle;
        }

        // Scale factor - lotus is designed for 800px, we need to scale to circle size
        const scale = (circle.r * 2) / 900;
        const cx = circle.r;
        const cy = circle.r;

        // Flower of Life (scaled)
        const folCircleRadius = 50 * scale;
        const folOffset = 50 * scale;

        // Center circle
        const centerCircle = document.createElement('div');
        centerCircle.style.position = 'absolute';
        centerCircle.style.width = `${folCircleRadius * 2}px`;
        centerCircle.style.height = `${folCircleRadius * 2}px`;
        centerCircle.style.left = `${cx - folCircleRadius}px`;
        centerCircle.style.top = `${cy - folCircleRadius}px`;
        centerCircle.style.borderRadius = '50%';
        centerCircle.style.borderWidth = `calc(2px * var(--border-scale, 1))`;
        centerCircle.style.borderStyle = 'solid';
        centerCircle.style.borderColor = color2;
        centerCircle.style.background = 'transparent';
        inner.appendChild(centerCircle);

        // Outer 6 circles
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 2;
            const x = cx + folOffset * Math.cos(angle);
            const y = cy + folOffset * Math.sin(angle);

            const fol = document.createElement('div');
            fol.style.position = 'absolute';
            fol.style.width = `${folCircleRadius * 2}px`;
            fol.style.height = `${folCircleRadius * 2}px`;
            fol.style.left = `${x - folCircleRadius}px`;
            fol.style.top = `${y - folCircleRadius}px`;
            fol.style.borderRadius = '50%';
            fol.style.borderWidth = `calc(1.5px * var(--border-scale, 1))`;
            fol.style.borderStyle = 'solid';
            fol.style.borderColor = color1;
            fol.style.background = 'transparent';
            inner.appendChild(fol);
        }

        // Concentric rings
        const innerRadius = 100 * scale;
        const outerRadius = 350 * scale;
        const concentricRadii = [100, 150, 200, 250, 300, 350].map(r => r * scale);

        concentricRadii.forEach((radius, index) => {
            const ring = document.createElement('div');
            ring.style.position = 'absolute';
            ring.style.width = `${radius * 2}px`;
            ring.style.height = `${radius * 2}px`;
            ring.style.left = `${cx - radius}px`;
            ring.style.top = `${cy - radius}px`;
            ring.style.borderRadius = '50%';
            ring.style.borderWidth = `calc(2px * var(--border-scale, 1))`;
            ring.style.borderStyle = 'solid';
            ring.style.borderColor = index < 3 ? color1 : color2;
            ring.style.opacity = '0.6';
            inner.appendChild(ring);
        });

        // Toroidal circles
        const torusDiameter = (outerRadius - innerRadius);
        const torusCenterRadius = (innerRadius + outerRadius) / 2;
        const torusOptions = [24, 36, 48, 60, 72, 84];
        const numTorusCircles = torusOptions[Math.floor(Math.random() * torusOptions.length)];

        for (let i = 0; i < numTorusCircles; i++) {
            const angle = (2 * Math.PI / numTorusCircles) * i - Math.PI / 2;
            const x = cx + torusCenterRadius * Math.cos(angle);
            const y = cy + torusCenterRadius * Math.sin(angle);

            const tc = document.createElement('div');
            tc.style.position = 'absolute';
            tc.style.width = `${torusDiameter}px`;
            tc.style.height = `${torusDiameter}px`;
            tc.style.left = `${x - torusDiameter / 2}px`;
            tc.style.top = `${y - torusDiameter / 2}px`;
            tc.style.borderRadius = '50%';
            tc.style.borderWidth = `calc(1.5px * var(--border-scale, 1))`;
            tc.style.borderStyle = 'solid';
            tc.style.borderColor = i % 2 === 0 ? color1 : color2;
            tc.style.opacity = '0.5';
            tc.style.background = 'transparent';
            inner.appendChild(tc);
        }

        lotusDiv.appendChild(inner);

        // Add click handler for fullscreen focus
        lotusDiv.addEventListener('click', (e) => {
            e.stopPropagation();
            if (focusedLotus) {
                // Already in focus mode - regenerate page
                unfocusLotus();
                regeneratePage();
            } else {
                // Enter focus mode
                focusLotus(lotusDiv);
            }
        });

        return lotusDiv;
    }

    function focusLotus(lotus) {
        focusedLotus = lotus;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const ccx = vw / 2;
        const ccy = vh / 2;

        // Calculate scale to make it fill most of the viewport height
        const currentSize = parseFloat(lotus.style.width);
        const targetSize = vh * 0.995;
        const scale = targetSize / currentSize;

        // Hide all other lotuses
        lotusElements.forEach(el => {
            if (el !== lotus) {
                el.classList.add('hidden');
            }
        });

        // Focus and scale the selected lotus
        lotus.classList.add('focused');
        lotus.style.left = `${ccx}px`;
        lotus.style.top = `${ccy}px`;

        // Set scale using CSS custom property so animation can use it
        lotus.style.setProperty('--lotus-scale', scale);

        // Compensate border width for scale to keep lines thin
        lotus.style.setProperty('--border-scale', 1 / scale);

        // Make sure it's spinning
        if (!lotus.classList.contains('rotating-cw') && !lotus.classList.contains('rotating-ccw')) {
            const direction = Math.random() < 0.5 ? 'cw' : 'ccw';
            lotus.classList.add(`rotating-${direction}`);
        }
    }

    function unfocusLotus() {
        if (!focusedLotus) return;
        focusedLotus.classList.remove('focused');
        focusedLotus = null;
    }

    function regeneratePage() {
        // Clear existing lotuses
        lotusElements.forEach(el => el.remove());
        lotusElements = [];
        focusedLotus = null;

        generateCirclePacking();
        render();

        // Restart rotation animation
        setTimeout(startRotation, 1000);
    }

    function render() {
        // Clear existing
        lotusElements.forEach(el => el.remove());
        lotusElements = [];

        // Only render interior circles as lotuses
        const interiorCircles = circles.filter(c => c.type === 'interior');

        interiorCircles.forEach((circle, index) => {
            // Generate unique palette for each lotus
            const color1 = palette[index % palette.length];
            const color2 = palette[(index + 1) % palette.length];

            const lotus = createLotus(circle, color1, color2);
            container.appendChild(lotus);
            lotusElements.push(lotus);

            // Random fade-in duration (2-5 seconds)
            const fadeInDuration = 2000 + Math.random() * 3000;
            lotus.style.transition = `opacity ${fadeInDuration}ms ease`;

            // Staggered fade in
            setTimeout(() => {
                lotus.classList.add('visible');
            }, 100 * index);
        });
    }

    function startRotation() {
        function rotateRandomLotus() {
            if (lotusElements.length === 0) {
                // Try again later if no lotuses available
                setTimeout(rotateRandomLotus, 1000);
                return;
            }

            // Skip if we're in focus mode
            if (focusedLotus) {
                setTimeout(rotateRandomLotus, 1000);
                return;
            }

            // Randomly select a lotus
            const randomIndex = Math.floor(Math.random() * lotusElements.length);
            const selectedLotus = lotusElements[randomIndex];

            // Skip if this lotus is already rotating
            if (selectedLotus.classList.contains('rotating-cw') || selectedLotus.classList.contains('rotating-ccw')) {
                // Try again soon with a different lotus
                setTimeout(rotateRandomLotus, 500);
                return;
            }

            // Calculate rotation duration based on lotus size
            const radius = selectedLotus.circleData.r;
            const sizeRatio = radius / 80;
            const minTime = 10 * sizeRatio;
            const maxTime = 25 * sizeRatio;
            const rotationTime = minTime * 1000 + Math.random() * (maxTime - minTime) * 1000;

            // Set rotation duration dynamically
            selectedLotus.style.setProperty('--rotation-duration', `${rotationTime}ms`);

            // Random rotation direction
            const direction = Math.random() < 0.5 ? 'cw' : 'ccw';
            selectedLotus.classList.add(`rotating-${direction}`);

            // After rotation completes, fade out
            setTimeout(() => {
                // Skip fade-out if we're now in focus mode
                if (focusedLotus) {
                    return;
                }

                // Random fade-out duration (4-8 seconds), longer for larger lotuses
                const fadeOutDuration = 4000 + Math.random() * 4000 + (sizeRatio * 2000);
                selectedLotus.style.transition = `opacity ${fadeOutDuration}ms ease`;
                selectedLotus.classList.add('fading-out');

                // After fade-out completes, remove and create new
                setTimeout(() => {
                    // Skip removal/creation if we're now in focus mode
                    if (focusedLotus) {
                        return;
                    }

                    // Remove circle from circles array FIRST
                    if (selectedLotus.circleData) {
                        const circleIndex = circles.findIndex(c => c.id === selectedLotus.circleData.id);
                        if (circleIndex !== -1) {
                            circles.splice(circleIndex, 1);
                        }
                    }

                    // Then remove from DOM and lotusElements array
                    selectedLotus.remove();
                    const indexToRemove = lotusElements.indexOf(selectedLotus);
                    if (indexToRemove !== -1) {
                        lotusElements.splice(indexToRemove, 1);
                    }
                }, fadeOutDuration);
            }, rotationTime);

            // Schedule next rotation with random delay (1-4 seconds)
            const nextDelay = 1000 + Math.random() * 3000;
            setTimeout(rotateRandomLotus, nextDelay);
        }

        // Start multiple concurrent rotation schedulers
        const numConcurrent = 2 + Math.floor(Math.random() * 2); // 2-3 concurrent
        for (let i = 0; i < numConcurrent; i++) {
            setTimeout(rotateRandomLotus, 1000 + i * 1000);
        }
    }

    // Initialize
    generateCirclePacking();
    render();
    // Start rotation after render
    setTimeout(startRotation, 1000);
}

function createFlavor1(container, palette, baseSize, centerX, centerY) {
    // Flavor 1: Lotus of Life Enhanced - Enhanced with radial spokes and variable rings
    
    const mainRotatingContainer = document.createElement('div');
    mainRotatingContainer.style.position = 'absolute';
    mainRotatingContainer.style.width = '100%';
    mainRotatingContainer.style.height = '100%';

    const folRotatingContainer = document.createElement('div');
    folRotatingContainer.style.position = 'absolute';
    folRotatingContainer.style.width = '100%';
    folRotatingContainer.style.height = '100%';

    const rotationDirection = Math.random() < 0.5 ? 'rotateClockwise' : 'rotateCounterClockwise';
    const oppositeDirection = rotationDirection === 'rotateClockwise' ? 'rotateCounterClockwise' : 'rotateClockwise';
    const rotationSpeed = 60 + Math.random() * 120;

    mainRotatingContainer.style.animation = `${rotationDirection} ${rotationSpeed}s linear infinite`;
    folRotatingContainer.style.animation = `${oppositeDirection} ${rotationSpeed}s linear infinite`;

    container.appendChild(mainRotatingContainer);
    container.appendChild(folRotatingContainer);

    const gradientColor = palette[0];
    container.style.background = `radial-gradient(
        circle,
        ${gradientColor.replace(')', ' / 0.5)')} 0%,
        ${gradientColor.replace(')', ' / 0.4)')} 8%,
        ${gradientColor.replace(')', ' / 0.35)')} 16%,
        ${gradientColor.replace(')', ' / 0.3)')} 24%,
        ${gradientColor.replace(')', ' / 0.25)')} 32%,
        ${gradientColor.replace(')', ' / 0.2)')} 40%,
        ${gradientColor.replace(')', ' / 0.15)')} 48%,
        ${gradientColor.replace(')', ' / 0.1)')} 56%,
        ${gradientColor.replace(')', ' / 0.05)')} 70%,
        transparent 87.5%
    )`;

    const folCircleRadius = 50;
    const folOffset = 50;
    const innerRadius = 100;
    const outerRadius = 350;

    const innerRingCount = 4 + Math.floor(Math.random() * 4);
    const totalRings = innerRingCount + 2;

    const concentricRadii = [];
    for (let i = 0; i < totalRings; i++) {
        const radius = innerRadius + (outerRadius - innerRadius) * (i / (totalRings - 1));
        concentricRadii.push(radius);
    }

    // Lotus of Life edge ring
    const folEdgeRing = createConcentricRing(innerRadius * 2, baseSize, centerX, centerY);
    folEdgeRing.style.borderColor = palette[0];
    folEdgeRing.style.borderWidth = '2px';
    mainRotatingContainer.appendChild(folEdgeRing);

    concentricRadii.forEach((radius, index) => {
        const ring = createConcentricRing(radius * 2, baseSize, centerX, centerY);
        ring.style.borderColor = palette[index % palette.length];
        mainRotatingContainer.appendChild(ring);
    });

    // Spokes
    const spokesContainer = document.createElement('div');
    spokesContainer.style.position = 'absolute';
    spokesContainer.style.width = '100%';
    spokesContainer.style.height = '100%';
    spokesContainer.style.overflow = 'hidden';
    spokesContainer.style.borderRadius = '50%';
    spokesContainer.style.clipPath = `circle(${outerRadius / baseSize * 100}% at 50% 50%)`;
    mainRotatingContainer.appendChild(spokesContainer);

    const innerMask = document.createElement('div');
    innerMask.style.position = 'absolute';
    innerMask.style.width = (innerRadius * 2 / baseSize * 100) + '%';
    innerMask.style.height = (innerRadius * 2 / baseSize * 100) + '%';
    innerMask.style.left = ((centerX - innerRadius) / baseSize * 100) + '%';
    innerMask.style.top = ((centerY - innerRadius) / baseSize * 100) + '%';
    innerMask.style.background = 'radial-gradient(circle, #1a1a2e 0%, #1a1a2e 100%)';
    innerMask.style.borderRadius = '50%';
    innerMask.style.zIndex = '5';
    spokesContainer.appendChild(innerMask);

    const spokeCircleDiameter = 371;
    const spokeCircleRadius = spokeCircleDiameter / 2;
    const spokeCount = [18, 36, 54, 72, 108][Math.floor(Math.random() * 5)];

    // Update info panel with spoke count
    const spokeCountDisplay = document.getElementById('spokeCount');
    if (spokeCountDisplay) {
        spokeCountDisplay.textContent = spokeCount;
    }

    for (let i = 0; i < spokeCount; i++) {
        const angle = (2 * Math.PI / spokeCount) * i - Math.PI / 2;
        const x = centerX + spokeCircleRadius * Math.cos(angle);
        const y = centerY + spokeCircleRadius * Math.sin(angle);
        const spokeCircle = createCircle(x, y, spokeCircleDiameter, 'circle', baseSize);
        spokeCircle.style.borderColor = palette[i % palette.length];
        spokeCircle.style.zIndex = '1';
        spokesContainer.appendChild(spokeCircle);
    }

    const outerMask = document.createElement('div');
    outerMask.className = 'outer-ring';
    outerMask.style.width = (outerRadius * 2 / baseSize * 100) + '%';
    outerMask.style.height = (outerRadius * 2 / baseSize * 100) + '%';
    outerMask.style.left = ((centerX - outerRadius) / baseSize * 100) + '%';
    outerMask.style.top = ((centerY - outerRadius) / baseSize * 100) + '%';
    outerMask.style.borderColor = palette[palette.length - 1];
    mainRotatingContainer.appendChild(outerMask);

    // Lotus of Life pattern (rendered separately with opposite rotation)
    const folColor = palette[1] || palette[0];

    const centerCircle = createCircle(centerX, centerY, folCircleRadius * 2, 'circle fol-center-circle', baseSize);
    centerCircle.style.borderColor = folColor;
    centerCircle.style.zIndex = '10';
    folRotatingContainer.appendChild(centerCircle);

    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        const x = centerX + folOffset * Math.cos(angle);
        const y = centerY + folOffset * Math.sin(angle);
        const circle = createCircle(x, y, folCircleRadius * 2, 'circle fol-circle', baseSize);
        circle.style.borderColor = folColor;
        circle.style.zIndex = '10';
        folRotatingContainer.appendChild(circle);
    }

    // Center glow
    const glow = document.createElement('div');
    glow.className = 'center-glow';
    const glowSize = 500;
    glow.style.width = (glowSize / baseSize * 100) + '%';
    glow.style.height = (glowSize / baseSize * 100) + '%';
    glow.style.left = ((centerX - glowSize / 2) / baseSize * 100) + '%';
    glow.style.top = ((centerY - glowSize / 2) / baseSize * 100) + '%';
    glow.style.zIndex = '10';
    const glowColor = palette[palette.length - 1];
    glow.style.background = `radial-gradient(
        circle,
        ${glowColor.replace(')', ' / 0.4)')} 0%,
        ${glowColor.replace(')', ' / 0.3)')} 15%,
        ${glowColor.replace(')', ' / 0.2)')} 30%,
        ${glowColor.replace(')', ' / 0.1)')} 50%,
        ${glowColor.replace(')', ' / 0.05)')} 70%,
        transparent 90%
    )`;
    mainRotatingContainer.appendChild(glow);

    // Lotus petals
    const petalCount = 12;
    const petalColor = palette[Math.floor(palette.length / 2)];

    for (let i = 0; i < petalCount; i++) {
        const angle = (2 * Math.PI / petalCount) * i - Math.PI / 2;
        const petal = document.createElement('div');
        petal.className = 'lotus-petal';
        petal.innerHTML = '}';
        petal.style.color = petalColor;

        const petalDistance = outerRadius + 20;
        const x = centerX + petalDistance * Math.cos(angle);
        const y = centerY + petalDistance * Math.sin(angle);

        petal.style.left = (x / baseSize * 100) + '%';
        petal.style.top = (y / baseSize * 100) + '%';

        const rotationDeg = (360 / petalCount) * i - 90 + 2;
        petal.style.transform = `translate(-50%, -50%) rotate(${rotationDeg}deg)`;

        mainRotatingContainer.appendChild(petal);
    }
}

function createFlavor2(container, palette) {
    // Flavor 2: Lotus of Life CirclePack - Circle packing with multiple lotus mandalas
    container.style.background = 'radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a15 100%)';
    container.style.position = 'relative';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.overflow = 'hidden';
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    const centerX = width / 2;
    const centerY = height / 2;

    // Circle packing algorithm
    function distance(p1, p2) {
        return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
    }

    let circles = [];

    // Generate boundary circles
    const numBoundaryPoints = 3 + Math.random() * 18;
    const margin = 0;
    const rectWidth = width - margin * 2;
    const rectHeight = height - margin * 2;
    const perimeter = 2 * (rectWidth + rectHeight);
    const segmentLength = perimeter / numBoundaryPoints;

    for (let i = 0; i < numBoundaryPoints; i++) {
        const dist = i * segmentLength;
        let x, y;

        if (dist < rectWidth) {
            x = margin + dist;
            y = margin;
        } else if (dist < rectWidth + rectHeight) {
            x = width - margin;
            y = margin + (dist - rectWidth);
        } else if (dist < 2 * rectWidth + rectHeight) {
            x = width - margin - (dist - rectWidth - rectHeight);
            y = height - margin;
        } else {
            x = margin;
            y = height - margin - (dist - 2 * rectWidth - rectHeight);
        }

        const r = 80 + Math.random() * 60;
        circles.push({ x, y, r, type: 'boundary', id: i });
    }

    // Generate interior circles
    const numInterior = Math.floor(3 + Math.random() * 8);
    for (let i = 0; i < numInterior; i++) {
        let x, y, r;
        let attempts = 0;
        do {
            x = margin + Math.random() * rectWidth;
            y = margin + Math.random() * rectHeight;
            r = 150 + Math.random() * 150;
            attempts++;
        } while (attempts < 100 && circles.some(c => distance({x, y}, c) < r + c.r + 20));

        if (attempts < 100) {
            circles.push({ x, y, r, type: 'interior', id: numBoundaryPoints + i });
        }
    }

    // Relaxation
    for (let iter = 0; iter < 150; iter++) {
        for (let i = 0; i < circles.length; i++) {
            if (circles[i].type === 'boundary') continue;

            let fx = 0, fy = 0;
            fx += (centerX - circles[i].x) * 0.005;
            fy += (centerY - circles[i].y) * 0.005;

            for (let j = 0; j < circles.length; j++) {
                if (i === j) continue;
                const d = distance(circles[i], circles[j]);
                const minDist = circles[i].r + circles[j].r;
                if (d < minDist * 1.8) {
                    const force = (minDist * 1.8 - d) / d;
                    fx += (circles[i].x - circles[j].x) * force * 0.4;
                    fy += (circles[i].y - circles[j].y) * force * 0.4;
                }
            }

            circles[i].x += fx;
            circles[i].y += fy;
            circles[i].x = Math.max(margin + circles[i].r, Math.min(width - margin - circles[i].r, circles[i].x));
            circles[i].y = Math.max(margin + circles[i].r, Math.min(height - margin - circles[i].r, circles[i].y));
        }
    }

    // Render interior circles as lotuses
    const interiorCircles = circles.filter(c => c.type === 'interior');
    interiorCircles.forEach((circle, index) => {
        const lotusDiv = document.createElement('div');
        lotusDiv.style.position = 'absolute';
        lotusDiv.style.left = circle.x + 'px';
        lotusDiv.style.top = circle.y + 'px';
        lotusDiv.style.width = (circle.r * 2) + 'px';
        lotusDiv.style.height = (circle.r * 2) + 'px';
        lotusDiv.style.transform = 'translate(-50%, -50%)';
        lotusDiv.style.opacity = '0';
        lotusDiv.style.transition = 'opacity 1s ease';

        const inner = document.createElement('div');
        inner.style.position = 'relative';
        inner.style.width = '100%';
        inner.style.height = '100%';

        const scale = (circle.r * 2) / 900;
        const cx = circle.r;
        const cy = circle.r;

        // FOL
        const folR = 50 * scale;
        const folOff = 50 * scale;

        const ccirc = document.createElement('div');
        ccirc.style.position = 'absolute';
        ccirc.style.width = (folR * 2) + 'px';
        ccirc.style.height = (folR * 2) + 'px';
        ccirc.style.left = (cx - folR) + 'px';
        ccirc.style.top = (cy - folR) + 'px';
        ccirc.style.borderRadius = '50%';
        ccirc.style.border = '2px solid ' + palette[1 % palette.length];
        ccirc.style.background = 'transparent';
        inner.appendChild(ccirc);

        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 2;
            const x = cx + folOff * Math.cos(angle);
            const y = cy + folOff * Math.sin(angle);

            const fol = document.createElement('div');
            fol.style.position = 'absolute';
            fol.style.width = (folR * 2) + 'px';
            fol.style.height = (folR * 2) + 'px';
            fol.style.left = (x - folR) + 'px';
            fol.style.top = (y - folR) + 'px';
            fol.style.borderRadius = '50%';
            fol.style.border = '1.5px solid ' + palette[0 % palette.length];
            fol.style.background = 'transparent';
            inner.appendChild(fol);
        }

        // Concentric rings
        const iR = 100 * scale;
        const oR = 350 * scale;
        const radii = [100, 150, 200, 250, 300, 350].map(r => r * scale);

        radii.forEach((radius, idx) => {
            const ring = document.createElement('div');
            ring.style.position = 'absolute';
            ring.style.width = (radius * 2) + 'px';
            ring.style.height = (radius * 2) + 'px';
            ring.style.left = (cx - radius) + 'px';
            ring.style.top = (cy - radius) + 'px';
            ring.style.borderRadius = '50%';
            ring.style.border = '2px solid ' + palette[idx % palette.length];
            ring.style.opacity = '0.6';
            inner.appendChild(ring);
        });

        // Toroidal circles
        const tD = (oR - iR);
        const tR = (iR + oR) / 2;
        const torusOpts = [24, 36, 48, 60, 72, 84];
        const numTorus = torusOpts[Math.floor(Math.random() * torusOpts.length)];

        for (let i = 0; i < numTorus; i++) {
            const angle = (2 * Math.PI / numTorus) * i - Math.PI / 2;
            const x = cx + tR * Math.cos(angle);
            const y = cy + tR * Math.sin(angle);

            const tc = document.createElement('div');
            tc.style.position = 'absolute';
            tc.style.width = tD + 'px';
            tc.style.height = tD + 'px';
            tc.style.left = (x - tD / 2) + 'px';
            tc.style.top = (y - tD / 2) + 'px';
            tc.style.borderRadius = '50%';
            tc.style.border = '1.5px solid ' + palette[i % palette.length];
            tc.style.opacity = '0.5';
            tc.style.background = 'transparent';
            inner.appendChild(tc);
        }

        lotusDiv.appendChild(inner);
        container.appendChild(lotusDiv);

        // Fade in
        setTimeout(() => {
            lotusDiv.style.opacity = '1';
        }, 100 * index);
    });
}

function createFlavor3(container, palette) {
    // Flavor 3: Lotus CirclePack NoOverlap - Scattered lotus circles with no overlap
    container.style.background = '#0a0a15';
    container.style.position = 'relative';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.overflow = 'hidden';

    const circles = [];

    function distance(p1, p2) {
        return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
    }

    function generateCirclePacking() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const minRadius = 80;
        const maxRadius = 270;

        // Boundary circles on viewport edge
        const numBoundaryPoints = 6 + Math.floor(Math.random() * 5);
        for (let i = 0; i < numBoundaryPoints; i++) {
            const angle = (2 * Math.PI / numBoundaryPoints) * i;
            const r = minRadius + Math.random() * (maxRadius - minRadius);
            let x, y;
            const side = i % 4;
            if (side === 0) { x = r + Math.random() * (width - 2 * r); y = r; }
            else if (side === 1) { x = width - r; y = r + Math.random() * (height - 2 * r); }
            else if (side === 2) { x = r + Math.random() * (width - 2 * r); y = height - r; }
            else { x = r; y = r + Math.random() * (height - 2 * r); }
            circles.push({ x, y, r, type: 'boundary', id: i });
        }

        // Interior circles with no overlap
        const targetInterior = 5 + Math.floor(Math.random() * 10);
        let currentMinRadius = 80;
        for (let i = 0; i < targetInterior; i++) {
            if (i > 5) currentMinRadius = 40;
            let placed = false;
            let attempts = 0;
            while (attempts < 500 && !placed) {
                const x = currentMinRadius + Math.random() * (width - 2 * currentMinRadius);
                const y = currentMinRadius + Math.random() * (height - 2 * currentMinRadius);
                const r = currentMinRadius + Math.random() * (maxRadius - currentMinRadius);
                if (r > maxRadius) r = maxRadius;
                let overlap = false;
                for (let c of circles) {
                    if (distance({x, y}, c) < r + c.r + 3) { overlap = true; break; }
                }
                if (!overlap) { circles.push({ x, y, r, type: 'interior', id: circles.length }); placed = true; }
                attempts++;
            }
        }

        // Relaxation
        for (let iter = 0; iter < 50; iter++) {
            for (let i = 0; i < circles.length; i++) {
                if (circles[i].type === 'boundary') continue;
                let fx = 0, fy = 0;
                for (let j = 0; j < circles.length; j++) {
                    if (i === j) continue;
                    const d = distance(circles[i], circles[j]);
                    const minDist = circles[i].r + circles[j].r + 3;
                    if (d < minDist) {
                        const force = (minDist - d) / d;
                        fx += (circles[i].x - circles[j].x) * force * 0.5;
                        fy += (circles[i].y - circles[j].y) * force * 0.5;
                    }
                }
                circles[i].x += fx;
                circles[i].y += fy;
            }
        }
    }

    generateCirclePacking();

    // Create lotus for each interior circle
    circles.filter(c => c.type === 'interior').forEach((circle, idx) => {
        const lotusDiv = document.createElement('div');
        lotusDiv.style.position = 'absolute';
        lotusDiv.style.left = circle.x + 'px';
        lotusDiv.style.top = circle.y + 'px';
        lotusDiv.style.width = (circle.r * 2) + 'px';
        lotusDiv.style.height = (circle.r * 2) + 'px';
        lotusDiv.style.transform = 'translate(-50%, -50%)';
        lotusDiv.style.opacity = '0';
        lotusDiv.style.transition = 'opacity 1s ease';

        const scale = (circle.r * 2) / 400;
        const cx = circle.r;
        const cy = circle.r;

        const inner = document.createElement('div');
        inner.style.position = 'relative';
        inner.style.width = '100%';
        inner.style.height = '100%';

        // Center circle
        const ccirc = document.createElement('div');
        ccirc.style.position = 'absolute';
        ccirc.style.width = (50 * scale) + 'px';
        ccirc.style.height = (50 * scale) + 'px';
        ccirc.style.left = (cx - 25 * scale) + 'px';
        ccirc.style.top = (cy - 25 * scale) + 'px';
        ccirc.style.borderRadius = '50%';
        ccirc.style.border = '2px solid ' + palette[(idx + 1) % palette.length];
        ccirc.style.opacity = '0.5';
        inner.appendChild(ccirc);

        // 6 FOL circles
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 2;
            const x = cx + 50 * scale * Math.cos(angle);
            const y = cy + 50 * scale * Math.sin(angle);
            const fol = document.createElement('div');
            fol.style.position = 'absolute';
            fol.style.width = (50 * scale) + 'px';
            fol.style.height = (50 * scale) + 'px';
            fol.style.left = (x - 25 * scale) + 'px';
            fol.style.top = (y - 25 * scale) + 'px';
            fol.style.borderRadius = '50%';
            fol.style.border = '1.5px solid ' + palette[idx % palette.length];
            inner.appendChild(fol);
        }

        // Concentric rings
        [100, 150, 200, 250, 300, 350].forEach((baseR, ri) => {
            const r = baseR * scale;
            const ring = document.createElement('div');
            ring.style.position = 'absolute';
            ring.style.width = (r * 2) + 'px';
            ring.style.height = (r * 2) + 'px';
            ring.style.left = (cx - r) + 'px';
            ring.style.top = (cy - r) + 'px';
            ring.style.borderRadius = '50%';
            ring.style.border = '1.5px solid ' + palette[ri % palette.length];
            ring.style.opacity = 0.3 + (ri * 0.1);
            inner.appendChild(ring);
        });

        lotusDiv.appendChild(inner);
        container.appendChild(lotusDiv);
        setTimeout(() => { lotusDiv.style.opacity = '1'; }, 100 + Math.random() * 500);
    });
}

function createFlavor4(container, palette) {
    // Flavor 4: Lotus Grid - Simple lotus flowers in grid
    container.style.background = '#0a0a15';
    container.style.position = 'relative';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.overflow = 'hidden';

    // Random grid config
    const gridConfigs = [
        { cols: 2, rows: 2 },
        { cols: 3, rows: 3 },
        { cols: 4, rows: 4 },
        { cols: 5, rows: 5 },
        { cols: 6, rows: 6 },
        { cols: 8, rows: 8 },
        { cols: 10, rows: 10 },
        { cols: 5, rows: 4 },
        { cols: 6, rows: 4 },
        { cols: 8, rows: 4 }
    ];
    const config = gridConfigs[Math.floor(Math.random() * gridConfigs.length)];
    const cellCount = config.cols * config.rows;

    const gridContainer = document.createElement('div');
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = `repeat(${config.cols}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${config.rows}, 1fr)`;
    gridContainer.style.gap = '8px';
    gridContainer.style.padding = '8px';
    gridContainer.style.width = '100%';
    gridContainer.style.height = '100%';
    gridContainer.style.boxSizing = 'border-box';

    // Calculate cell size
    const gapSize = 8;
    const totalGapWidth = gapSize * (config.cols - 1);
    const totalGapHeight = gapSize * (config.rows - 1);
    const availableWidth = window.innerWidth - 16 - totalGapWidth;
    const availableHeight = window.innerHeight - 16 - totalGapHeight;
    const cellWidth = availableWidth / config.cols;
    const cellHeight = availableHeight / config.rows;
    const size = Math.min(cellWidth, cellHeight);

    function createSimpleLotus(idx) {
        const lotusDiv = document.createElement('div');
        lotusDiv.style.width = size + 'px';
        lotusDiv.style.height = size + 'px';
        lotusDiv.style.position = 'relative';

        // Random rotation direction
        const direction = Math.random() < 0.5 ? 'cw' : 'ccw';
        const duration = 15 + Math.random() * 20;
        lotusDiv.style.animation = `rotateLotus-${direction} ${duration}s linear infinite`;

        const inner = document.createElement('div');
        inner.style.position = 'relative';
        inner.style.width = '100%';
        inner.style.height = '100%';

        // Center circle
        const ccirc = document.createElement('div');
        ccirc.style.position = 'absolute';
        ccirc.style.width = '12%';
        ccirc.style.height = '12%';
        ccirc.style.left = '44%';
        ccirc.style.top = '44%';
        ccirc.style.borderRadius = '50%';
        ccirc.style.border = '2px solid ' + palette[(idx + 1) % palette.length];
        ccirc.style.opacity = '0.6';
        inner.appendChild(ccirc);

        // 6 FOL circles
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 2;
            const x = 50 + 12 * Math.cos(angle);
            const y = 50 + 12 * Math.sin(angle);
            const fol = document.createElement('div');
            fol.style.position = 'absolute';
            fol.style.width = '12%';
            fol.style.height = '12%';
            fol.style.left = x + '%';
            fol.style.top = y + '%';
            fol.style.borderRadius = '50%';
            fol.style.border = '1.5px solid ' + palette[idx % palette.length];
            inner.appendChild(fol);
        }

        // Concentric rings
        [25, 37, 50, 62, 75, 87].forEach((baseR, ri) => {
            const ring = document.createElement('div');
            ring.style.position = 'absolute';
            ring.style.width = baseR + '%';
            ring.style.height = baseR + '%';
            ring.style.left = ((100 - baseR) / 2) + '%';
            ring.style.top = ((100 - baseR) / 2) + '%';
            ring.style.borderRadius = '50%';
            ring.style.border = '1.5px solid ' + palette[ri % palette.length];
            ring.style.opacity = 0.3 + (ri * 0.1);
            inner.appendChild(ring);
        });

        lotusDiv.appendChild(inner);
        return lotusDiv;
    }

    for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement('div');
        cell.style.background = 'rgba(0, 0, 0, 0.3)';
        cell.style.borderRadius = '2px';
        cell.style.overflow = 'hidden';
        cell.style.display = 'flex';
        cell.style.alignItems = 'center';
        cell.style.justifyContent = 'center';
        cell.appendChild(createSimpleLotus(i));
        gridContainer.appendChild(cell);
    }

    container.appendChild(gridContainer);
}

function createFlavor5(container, palette) {
    // Flavor 5: Lotus CirclePack - Circle packing with lotus mandalas
    container.style.background = '#0a0a15';
    container.style.position = 'relative';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.overflow = 'hidden';

    const circles = [];

    function distance(p1, p2) {
        return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
    }

    function generateCirclePacking() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const centerX = width / 2;
        const centerY = height / 2;
        const minRadius = 60;
        const maxRadius = 220;

        // Boundary circles
        const numBoundaryPoints = 8 + Math.floor(Math.random() * 12);
        for (let i = 0; i < numBoundaryPoints; i++) {
            const angle = (2 * Math.PI / numBoundaryPoints) * i - Math.PI / 2;
            const x = centerX + (Math.min(width, height) * 0.35) * Math.cos(angle);
            const y = centerY + (Math.min(width, height) * 0.35) * Math.sin(angle);
            const r = minRadius + Math.random() * (maxRadius - minRadius);
            circles.push({ x, y, r, type: 'boundary', id: i });
        }

        // Interior circles
        const numInterior = 3 + Math.floor(Math.random() * 6);
        for (let i = 0; i < numInterior; i++) {
            let x, y, r;
            let attempts = 0;
            while (attempts < 200) {
                x = centerX + (Math.random() - 0.5) * Math.min(width, height) * 0.5;
                y = centerY + (Math.random() - 0.5) * Math.min(width, height) * 0.5;
                r = minRadius + Math.random() * (maxRadius - minRadius);
                let overlap = false;
                for (let c of circles) {
                    if (distance({x, y}, c) < r + c.r + 15) { overlap = true; break; }
                }
                if (!overlap) { circles.push({ x, y, r, type: 'interior', id: numBoundaryPoints + i }); break; }
                attempts++;
            }
        }

        // Relaxation
        for (let iter = 0; iter < 80; iter++) {
            for (let i = 0; i < circles.length; i++) {
                if (circles[i].type === 'boundary') continue;
                let fx = 0, fy = 0;
                fx += (centerX - circles[i].x) * 0.02;
                fy += (centerY - circles[i].y) * 0.02;
                for (let j = 0; j < circles.length; j++) {
                    if (i === j) continue;
                    const d = distance(circles[i], circles[j]);
                    const minDist = circles[i].r + circles[j].r + 15;
                    if (d < minDist * 1.8) {
                        const force = (minDist * 1.8 - d) / d;
                        fx += (circles[i].x - circles[j].x) * force * 0.4;
                        fy += (circles[i].y - circles[j].y) * force * 0.4;
                    }
                }
                circles[i].x += fx;
                circles[i].y += fy;
            }
        }
    }

    generateCirclePacking();

    // Create lotus for each circle
    circles.forEach((circle, idx) => {
        const lotusDiv = document.createElement('div');
        lotusDiv.style.position = 'absolute';
        lotusDiv.style.left = circle.x + 'px';
        lotusDiv.style.top = circle.y + 'px';
        lotusDiv.style.width = (circle.r * 2) + 'px';
        lotusDiv.style.height = (circle.r * 2) + 'px';
        lotusDiv.style.transform = 'translate(-50%, -50%)';
        lotusDiv.style.opacity = '0';
        lotusDiv.style.transition = 'opacity 0.8s ease';

        const scale = (circle.r * 2) / 400;
        const cx = circle.r;
        const cy = circle.r;

        const inner = document.createElement('div');
        inner.style.position = 'relative';
        inner.style.width = '100%';
        inner.style.height = '100%';

        // Random rotation
        const direction = Math.random() < 0.5 ? 'cw' : 'ccw';
        const duration = 12 + Math.random() * 15;
        inner.style.animation = `rotateLotus-${direction} ${duration}s linear infinite`;

        // Center circle
        const ccirc = document.createElement('div');
        ccirc.style.position = 'absolute';
        ccirc.style.width = (50 * scale) + 'px';
        ccirc.style.height = (50 * scale) + 'px';
        ccirc.style.left = (cx - 25 * scale) + 'px';
        ccirc.style.top = (cy - 25 * scale) + 'px';
        ccirc.style.borderRadius = '50%';
        ccirc.style.border = '2px solid ' + palette[(idx + 1) % palette.length];
        inner.appendChild(ccirc);

        // 6 FOL circles
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 2;
            const x = cx + 50 * scale * Math.cos(angle);
            const y = cy + 50 * scale * Math.sin(angle);
            const fol = document.createElement('div');
            fol.style.position = 'absolute';
            fol.style.width = (50 * scale) + 'px';
            fol.style.height = (50 * scale) + 'px';
            fol.style.left = (x - 25 * scale) + 'px';
            fol.style.top = (y - 25 * scale) + 'px';
            fol.style.borderRadius = '50%';
            fol.style.border = '1.5px solid ' + palette[idx % palette.length];
            inner.appendChild(fol);
        }

        // Concentric rings
        [100, 150, 200, 250, 300, 350].forEach((baseR, ri) => {
            const r = baseR * scale;
            const ring = document.createElement('div');
            ring.style.position = 'absolute';
            ring.style.width = (r * 2) + 'px';
            ring.style.height = (r * 2) + 'px';
            ring.style.left = (cx - r) + 'px';
            ring.style.top = (cy - r) + 'px';
            ring.style.borderRadius = '50%';
            ring.style.border = '1.5px solid ' + palette[ri % palette.length];
            ring.style.opacity = 0.3 + (ri * 0.1);
            inner.appendChild(ring);
        });

        lotusDiv.appendChild(inner);
        container.appendChild(lotusDiv);
        setTimeout(() => { lotusDiv.style.opacity = '0.7'; }, 100 + Math.random() * 400);
    });
}

// ============================================
// MAIN INITIALIZATION
// ============================================

function startVisualization(flavor) {
    // Clear previous DOM
    if (mainContainer) {
        mainContainer.remove();
    }

    // Remove previous info panel if it exists
    const oldInfoPanel = document.getElementById('infoPanel');
    if (oldInfoPanel) {
        oldInfoPanel.remove();
    }

    currentFlavor = flavor;
    console.log(`Insert29: Starting flavor ${flavor}`);

    // Create wrapper
    mainContainer = document.createElement('div');
    mainContainer.id = 'lotus-container';
    document.body.appendChild(mainContainer);

    // Create info panel for flavor 0 only (Lotus of Life with spokes)
    if (flavor === 0) {
        const infoPanel = document.createElement('div');
        infoPanel.id = 'infoPanel';
        infoPanel.className = 'info-panel collapsed';
        infoPanel.innerHTML = `
            <div class="info-header">Info</div>
            <div class="info-content">
                <div>Spoke Count: <span id="spokeCount">--</span></div>
            </div>
        `;
        document.body.appendChild(infoPanel);
        
        // Add click handler for collapse/expand
        infoPanel.addEventListener('click', function() {
            this.classList.toggle('collapsed');
        });
    }

    // Load ColorPalette
    const script = document.createElement('script');
    script.src = '../js_funct/colorpalette.js';
    script.onload = () => {
        ColorPalette.init();
        
        // Generate palette
        const paletteSize = 2 + Math.floor(Math.random() * 3);
        const palette = [];
        for (let i = 0; i < paletteSize; i++) {
            palette.push(ColorPalette.generateOKLCH());
        }

        // Create flavor-specific visualization
        const baseSize = 800;
        const centerX = baseSize / 2;
        const centerY = baseSize / 2;

        // Flavors 0 & 1 use the circular mandala container; 2-5 are full viewport
        if (flavor === 0 || flavor === 1) {
            mainContainer.classList.add('single-mandala');
        }

        // SWAPPED: Flavor 0 is now Redo (with info), Flavor 1 is now Basic (without info)
        if (flavor === 0) {
            // Flavor 0: Lotus of Life Enhanced (lotus_redo.htm) - WITH info panel
            const container = document.createElement('div');
            container.className = 'mandala-container';
            mainContainer.appendChild(container);
            createFlavor1(container, palette, baseSize, centerX, centerY);
        } else if (flavor === 1) {
            // Flavor 1: Lotus of Life CirclePack - Full viewport, no wrapper
            // Don't wrap in mandala-container - use mainContainer directly for full viewport
            mainContainer.style.width = '100vw';
            mainContainer.style.height = '100vh';
            mainContainer.style.display = 'block';
            mainContainer.style.overflow = 'visible';
            mainContainer.style.zIndex = 'auto'; // Allow watermark (z-index: 9999) to appear above flavor 1 content
            createFlavor0(mainContainer, palette, baseSize, centerX, centerY);
        } else if (flavor === 2) {
            mainContainer.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;border-radius:0;display:block;overflow:hidden;z-index:1;';
            createFlavor2(mainContainer, palette);
        } else if (flavor === 3) {
            mainContainer.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;border-radius:0;display:block;overflow:hidden;z-index:1;';
            createFlavor3(mainContainer, palette);
        } else if (flavor === 4) {
            mainContainer.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;border-radius:0;display:block;overflow:hidden;z-index:1;';
            createFlavor4(mainContainer, palette);
        } else if (flavor === 5) {
            mainContainer.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;border-radius:0;display:block;overflow:hidden;z-index:1;';
            createFlavor5(mainContainer, palette);
        }
    };
    document.head.appendChild(script);
}

function init() {
    injectStyles();

    // Get flavor from URL parameter
    const params = new URLSearchParams(window.location.search);
    const urlFlavor = params.get('flavor');
    
    let selectedFlavor;
    if (urlFlavor !== null) {
        const index = parseInt(urlFlavor);
        if (!isNaN(index) && index >= 0 && index < 6) {
            selectedFlavor = index;
        } else {
            selectedFlavor = Math.floor(Math.random() * 6);
        }
    } else {
        selectedFlavor = Math.floor(Math.random() * 6);
    }

    startVisualization(selectedFlavor);

    // Add keyboard controls
    window.addEventListener('keydown', (e) => {
        if (['0', '1', '2', '3', '4', '5'].includes(e.key)) {
            startVisualization(parseInt(e.key, 10));
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
