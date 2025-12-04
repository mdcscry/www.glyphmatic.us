/**
 * Insert 28: DeGenerator Legacy 9
 * Based on 2025_exp/degenerator9_legacy.htm
 */

function createDegenerator9() {
    // --- Dependencies ---
    const dependencies = [
        '../js_glyph/boxplot.js'
    ];

    let loadedCount = 0;

    dependencies.forEach(src => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            loadedCount++;
            if (loadedCount === dependencies.length) {
                console.log('DeGenerator 9: All dependencies loaded.');
                run();
            }
        };
        document.head.appendChild(script);
    });

    function run() {
        // --- CSS Injection ---
        const style = document.createElement('style');
        style.textContent = `
            #degen9-wrapper {
                position: absolute;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                display: flex !important; /* Use flexbox for side-by-side layout */
                overflow: hidden;
                z-index: -1; /* Position behind the watermark */
            }
            .main-block {
                position: relative; width: 50vw; height: 100vh; overflow: hidden;
            }
            .layer {
                position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                display: flex; align-items: center; justify-content: center;
                opacity: 0; /* Start transparent for fade-in */
                transition: opacity 12s ease-in-out, mix-blend-mode 20s ease-in-out;
            }
            .bg-pane {
                position: absolute;
                top: 0; left: 0; width: 100%; height: 100%;
                background-size: cover;
                transition: opacity 15s ease-in-out;
                z-index: -1;
            }
            .layer > span {
                font-size: 70vmin; line-height: 1; position: absolute; pointer-events: none;
                transition: color 7ßs ease-in-out, mix-blend-mode 15s ease-in-out, text-shadow 15s ease-in-out, border 15s ease-in-out;
            }
        `;
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

        function getRandomRadialGradient() {
            const centerX = Math.floor(Math.random() * 100);
            const centerY = Math.floor(Math.random() * 100);
            const color1 = getRandomRGBAColor(0.3, 0.6);
            const color2 = getRandomRGBAColor(0.2, 0.5);
            const color3 = getRandomRGBAColor(0.1, 0.4);
            return `radial-gradient(circle at ${centerX}% ${centerY}%, ${color1}, ${color2}, ${color3})`;
        }

        function getRandomBlendMode() { return mixBlendModes[Math.floor(Math.random() * mixBlendModes.length)]; }
        function getRandomBorderStyle() { return ['solid', 'dashed', 'double'][Math.floor(Math.random() * 3)]; }
        function getRandomBorderWidth(max = 10) { return Math.floor(Math.random() * (max + 1)) + 'px'; }

        function getRandomShadow() {
            if (Math.random() < 0.6) return 'none';
            const offsetX = Math.floor(Math.random() * 100) - 50;
            const offsetY = Math.floor(Math.random() * 100) - 50;
            const blur = Math.floor(Math.random() * 5);
            return `${offsetX}px ${offsetY}px ${blur}px ${getRandomColor2()}`;
        }

        function createAndAddLayer(parentBlock, delay) {
            const layerDiv = document.createElement("div");
            layerDiv.className = "layer";

            // Create two background panes for cross-fading
            const bgPane1 = document.createElement("div");
            bgPane1.className = "bg-pane";
            const bgPane2 = document.createElement("div");
            bgPane2.className = "bg-pane";
            layerDiv.appendChild(bgPane1);
            layerDiv.appendChild(bgPane2);

            const charSpan = document.createElement("span");
            layerDiv.appendChild(charSpan);
            parentBlock.appendChild(layerDiv);
            allLayers.push(layerDiv);
            updateLayer(layerDiv);

            setTimeout(() => { layerDiv.style.opacity = 0.95; }, delay);
        }

        function updateLayer(layerElement) {
            layerElement.style.mixBlendMode = getRandomBlendMode();

            const charSpan = layerElement.querySelector('span');
            if (charSpan) {
                charSpan.style.color = getRandomColor();
                charSpan.style.mixBlendMode = getRandomBlendMode();
                charSpan.style.textShadow = getRandomShadow();

                if (Math.random() < 0.975) {
                    charSpan.style.border = 'none';
                } else {
                    charSpan.style.border = `${getRandomBorderWidth(100)} ${getRandomBorderStyle()} ${getRandomColor3()}`;
                }

                if (Math.random() < 0.1) {
                    charSpan.style.webkitTextStrokeWidth = '0px';
                } else {
                    charSpan.style.webkitTextFillColor = getRandomColor3();
                    charSpan.style.webkitTextStrokeWidth = (Math.random() * 10 + 5) + "px";
                    charSpan.style.webkitTextStrokeColor = getRandomColor2();
                }

                if (Math.random() < 0.5) {
                    const randomGlyphHex = myarray[Math.round((myarray.length - 1) * Math.random())];
                    charSpan.innerHTML = `&#x${randomGlyphHex};`;
                    layerElement.title = `Glyph HEX: ${randomGlyphHex}`;
                }
            }
        }

        function updateLayerBackground(layerElement) {
            const panes = layerElement.querySelectorAll('.bg-pane');
            const topPane = panes[0];
            const bottomPane = panes[1];

            const newBackground = (Math.random() < 0.6)
                ? getRandomRadialGradient()
                : `radial-gradient(circle, ${getRandomRGBAColor(0.1, 0.4)}, ${getRandomRGBAColor(0.1, 0.4)})`;

            // Apply new background to the hidden pane (bottom)
            bottomPane.style.background = newBackground;

            // Fade out the top pane to reveal the new one
            topPane.style.opacity = 0;

            // After transition, swap them so the new one is on top and ready to be faded out next time
            setTimeout(() => {
                topPane.style.background = newBackground;
                topPane.style.opacity = 1;
            }, 15000); // Must match the transition duration in CSS
        }

        function setupDynamicBlocks() {
            leftBlock.innerHTML = '';
            rightBlock.innerHTML = '';
            allLayers = [];

            themeColor = mycolors[Math.round((mycolors.length - 1) * Math.random())];
            themeColor2 = mycolors[Math.round((mycolors.length - 1) * Math.random())];
            themeColor3 = mycolors[Math.round((mycolors.length - 1) * Math.random())];
            document.body.style.backgroundColor = themeColor;

            const numLayersLeft = Math.floor(Math.random() * 15) + 5;
            for (let i = 0; i < numLayersLeft; i++) {
                createAndAddLayer(leftBlock, i * 300);
            }

            const numLayersRight = Math.floor(Math.random() * 15) + 5;
            for (let i = 0; i < numLayersRight; i++) {
                createAndAddLayer(rightBlock, i * 300);
            }
        }

        setupDynamicBlocks();

        // NEW: Separate interval just for changing layer background colors
        window.setInterval(() => {
            if (allLayers.length > 0) {
                const randomLayer = allLayers[Math.floor(Math.random() * allLayers.length)];
                randomLayer.style.backgroundColor = getRandomRGBAColor(0.1, 0.4);
            }
        }, 4500); // Change a background color every 4.5 seconds

        window.setInterval(() => {
            if (allLayers.length > 0) updateLayer(allLayers[Math.floor(Math.random() * allLayers.length)]);
        }, 6000);

    }
}

createDegenerator9();