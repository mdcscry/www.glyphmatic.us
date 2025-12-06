/**
 * Insert 28: DeGenerator Legacy 9 - Multi-Flavor Edition
 * Consolidates 4 variants into one file with random flavor selection
 * Randomly selects one of 4 flavor configurations on page load.
 * Keyboard controls (0-3) allow switching between flavors.
 */

// Store interval IDs to clear them on flavor change
let intervalIds = [];

function startVisualization(flavor) {
    // Clear previous intervals and wrapper
    intervalIds.forEach(clearInterval);
    intervalIds = [];
    document.getElementById('degen9-wrapper')?.remove();

    const FLAVOR = flavor;
    // Flavor configurations:
    // 0: myarray, all-direction shadows, borders (original insert28)
    // 1: allMoireSymbols, all-direction shadows, borders (was insert31)
    // 2: allMoireCircleSquareSymbols, all-direction shadows, no borders (was insert32)
    // 3: allMoireCircleSymbols, vertical-only shadows, no borders (was insert33)

    const flavorConfig = {
        glyphArray: [
            'myarray',
            'allMoireSymbols',
            'allMoireCircleSquareSymbols',
            'allMoireCircleSymbols'
        ][FLAVOR],
        shadowMode: (FLAVOR === 3) ? 'vertical' : 'all',
        hasBorders: (FLAVOR === 0 || FLAVOR === 1),
        hasExtraCSS: (FLAVOR === 2 || FLAVOR === 3)
    };

    console.log(`DeGenerator 9 Legacy: Selected FLAVOR ${FLAVOR}`);
    console.log('Config:', flavorConfig);

        // --- CSS Injection (insert-specific styles only) ---
        const style = document.createElement('style');
        let styleContent = `
            #degen9-wrapper {
                position: absolute;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                display: flex;
                overflow: hidden;
                z-index: -1;
            }
        `;

        // Add extra CSS for flavors 2 and 3 (no borders)
        if (flavorConfig.hasExtraCSS) {
            styleContent += `
            .layer > span {
                padding: 0 !important;
                margin: 0 !important;
                line-height: 1 !important;
                display: inline-block !important;
                overflow: visible !important;
                box-sizing: border-box !important;
            }
            `;
        }

        style.textContent = styleContent;
        document.head.appendChild(style);

        // --- Main Logic ---
        const wrapper = document.createElement('div');
        wrapper.id = 'degen9-wrapper';
        document.body.appendChild(wrapper);

        const leftBlock = document.createElement('div');
        leftBlock.id = 'leftBlock';
        leftBlock.className = 'main-block';
        wrapper.appendChild(leftBlock);

        const rightBlock = document.createElement('div');
        rightBlock.id = 'rightBlock';
        rightBlock.className = 'main-block';
        wrapper.appendChild(rightBlock);

        let allLayers = [];
        let themeColor, themeColor2, themeColor3;
        const fontChangeRate = 6000;

        function getRandomColor() { return themeColor; }
        function getRandomColor2() { return themeColor2; }
        function getRandomColor3() { return themeColor3; }

        function getRandomRGBAColor(minAlpha = 0.01, maxAlpha = 0.1) {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            const a = (Math.random() * (maxAlpha - minAlpha)) + minAlpha;
            return `rgba(${r},${g},${b},${a.toFixed(2)})`;
        }

        function getRandomNoiseGradient() {
            const fromAngle = Math.floor(Math.random() * 360);
            const opacity1 = (Math.random() * 0.2 + 0.15).toFixed(4);
            const stopAngle = (Math.random() * 0.001 + 0.0005).toFixed(6);

            return `repeating-conic-gradient(from ${fromAngle}deg,
                rgba(255, 255, 255, 0) 0deg ${stopAngle}deg,
                rgba(255, 255, 255, ${opacity1}) ${stopAngle}deg ${(stopAngle * 2).toFixed(6)}deg)`;
        }

        function getRandomRadialGradient() {
            const centerX = Math.floor(Math.random() * 100);
            const centerY = Math.floor(Math.random() * 100);
            const color1 = getRandomRGBAColor(0.3, 0.6);
            const color2 = getRandomRGBAColor(0.2, 0.5);
            const color3 = getRandomRGBAColor(0.1, 0.4);

            return `radial-gradient(circle at ${centerX}% ${centerY}%, ${color1}, ${color2}, ${color3})`;
        }

        function getRandomBlendMode() {
            if (typeof mixBlendModes === 'undefined' || mixBlendModes.length === 0) {
                return 'normal';
            }
            return mixBlendModes[Math.floor(Math.random() * mixBlendModes.length)];
        }

        function getRandomBorderStyle() {
            const styles = ['solid', 'dashed', 'double'];
            return styles[Math.floor(Math.random() * styles.length)];
        }

        function getRandomBorderWidth(max = 10) {
            return Math.floor(Math.random() * (max + 1)) + 'px';
        }

        function getRandomShadow() {
            if (Math.random() < 0.6) {
                return 'none';
            }

            // Shadow mode based on flavor
            let offsetX, offsetY;
            if (flavorConfig.shadowMode === 'vertical') {
                // Vertical-only shadows (flavor 3)
                offsetX = 0;
                offsetY = Math.floor(Math.random() * 100) - 50;
            } else {
                // All-direction shadows (flavors 0, 1, 2)
                offsetX = Math.floor(Math.random() * 100) - 50;
                offsetY = Math.floor(Math.random() * 100) - 50;
            }

            const blur = Math.floor(Math.random() * 5);
            return `${offsetX}px ${offsetY}px ${blur}px ${getRandomColor2()}`;
        }

        function createAndAddLayer(parentBlock) {
            const layerDiv = document.createElement("div");
            layerDiv.className = "layer";

            const charSpan = document.createElement("span");
            layerDiv.appendChild(charSpan);

            parentBlock.appendChild(layerDiv);
            allLayers.push(layerDiv);
            updateLayer(layerDiv);
            return layerDiv;
        }

        function updateLayer(layerElement) {
            // Layer background
            if (Math.random() < 0.4) {
                layerElement.style.background = getRandomRadialGradient();
            } else {
                layerElement.style.backgroundColor = getRandomRGBAColor();
                layerElement.style.background = '';
            }

            layerElement.style.mixBlendMode = getRandomBlendMode();
            layerElement.style.opacity = .95;
            layerElement.style.border = 'none';

            const charSpan = layerElement.querySelector('span');
            if (charSpan) {
                charSpan.style.color = getRandomColor();
                charSpan.style.mixBlendMode = getRandomBlendMode();

                // Border logic based on flavor
                if (flavorConfig.hasBorders) {
                    // Flavors 0 and 1: Sometimes add borders
                    if (Math.random() < 0.975) {
                        charSpan.style.border = 'none';
                    } else {
                        const borderWidth = getRandomBorderWidth(100);
                        const borderStyle = getRandomBorderStyle();
                        const borderColor = getRandomColor3();
                        charSpan.style.border = `${borderWidth} ${borderStyle} ${borderColor}`;
                    }
                } else {
                    // Flavors 2 and 3: Never add borders
                    charSpan.style.border = 'none';
                }

                // Text stroke
                if (Math.random() < 0.1) {
                    charSpan.style.webkitTextStrokeWidth = '0px';
                    charSpan.style.webkitTextStrokeColor = 'transparent';
                } else {
                    charSpan.style.webkitTextFillColor = getRandomColor3();
                    charSpan.style.webkitTextStrokeWidth = (Math.random() * 3 + 1) + "px";
                    charSpan.style.webkitTextStrokeColor = getRandomColor2();
                }

                // Noise gradient (90% chance)
                if (Math.random() < 0.90) {
                    charSpan.classList.add('noise-glyph');
                    charSpan.style.setProperty('--glyph-noise-gradient', getRandomNoiseGradient());
                    charSpan.style.webkitTextFillColor = 'transparent';
                } else {
                    charSpan.classList.remove('noise-glyph');
                }

                // Text shadow
                charSpan.style.textShadow = getRandomShadow();

                // Change character (50% chance) - Use the appropriate glyph array based on flavor
                if (Math.random() < 0.5) {
                    let glyphArray;

                    // Select glyph array based on flavor
                    switch (flavorConfig.glyphArray) {
                        case 'myarray':
                            glyphArray = typeof myarray !== 'undefined' ? myarray : null;
                            break;
                        case 'allMoireSymbols':
                            glyphArray = typeof allMoireSymbols !== 'undefined' ? allMoireSymbols : null;
                            break;
                        case 'allMoireCircleSquareSymbols':
                            glyphArray = typeof allMoireCircleSquareSymbols !== 'undefined' ? allMoireCircleSquareSymbols : null;
                            break;
                        case 'allMoireCircleSymbols':
                            glyphArray = typeof allMoireCircleSymbols !== 'undefined' ? allMoireCircleSymbols : null;
                            break;
                        default:
                            glyphArray = null;
                    }

                    if (glyphArray && glyphArray.length > 0) {
                        const randomGlyphHex = glyphArray[Math.round((glyphArray.length - 1) * Math.random())];
                        charSpan.innerHTML = `&#x${randomGlyphHex};`;
                        layerElement.title = `Glyph HEX: ${randomGlyphHex}`;
                    }
                }
            }
        }

        function setupDynamicBlocks() {
            leftBlock.innerHTML = '';
            rightBlock.innerHTML = '';
            allLayers = [];

            if (typeof mycolors === 'undefined' || mycolors.length === 0) {
                themeColor = '#000000';
                themeColor2 = '#000000';
                themeColor3 = '#000000';
                document.body.style.backgroundColor = themeColor;
                return;
            }

            themeColor = mycolors[Math.round((mycolors.length - 1) * Math.random())];
            themeColor2 = mycolors[Math.round((mycolors.length - 1) * Math.random())];
            themeColor3 = mycolors[Math.round((mycolors.length - 1) * Math.random())];
            document.body.style.backgroundColor = themeColor;

            const numLayersLeft = Math.floor(Math.random() * (20 - 5 + 1)) + 5;
            for (let i = 0; i < numLayersLeft; i++) {
                createAndAddLayer(leftBlock);
            }

            const numLayersRight = Math.floor(Math.random() * (20 - 5 + 1)) + 5;
            for (let i = 0; i < numLayersRight; i++) {
                createAndAddLayer(rightBlock);
            }
        }

        // Initial setup
        setupDynamicBlocks();

        // Main update interval
        window.setInterval(function() {
            if (allLayers.length > 0) {
                const randomLayerIndex = Math.floor(Math.random() * allLayers.length);
                updateLayer(allLayers[randomLayerIndex]);
            }
        }, fontChangeRate);

        // Change theme color
        window.setInterval(function() {
            if (typeof mycolors === 'undefined' || mycolors.length === 0) {
                return;
            }
            themeColor = mycolors[Math.round((mycolors.length - 1) * Math.random())];
            document.body.style.backgroundColor = themeColor;
        }, fontChangeRate * 20);

        // Regenerate all layers
        window.setInterval(function() {
            setupDynamicBlocks();
        }, fontChangeRate * 20);
}

function init() {
    // --- Load CSS ---
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = '../css/boxplot.css';
    document.head.appendChild(cssLink);

    // --- Load Dependencies ---
    const script = document.createElement('script');
    script.src = '../js_glyph/boxplot.js?v=' + Date.now();
    script.onload = () => {
        console.log('DeGenerator 9 Legacy: Dependencies loaded.');
        // Start with a random flavor
        startVisualization(Math.floor(Math.random() * 4));

        // Add keyboard listeners
        window.addEventListener('keydown', (e) => {
            if (['0', '1', '2', '3'].includes(e.key)) {
                startVisualization(parseInt(e.key, 10));
            }
        });
    };
    document.head.appendChild(script);
}

init();
