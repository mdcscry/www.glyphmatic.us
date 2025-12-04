/**
 * Insert 27: DeGenerator Legacy 8
 * Based on 2025_exp/degenerator8_legacy.htm
 */

function createDegenerator8() {
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
                console.log('DeGenerator 8: All dependencies loaded.');
                run();
            }
        };
        document.head.appendChild(script);
    });

    function run() {
        // --- CSS Injection ---
        const style = document.createElement('style');
        style.textContent = `
            #degen8-wrapper {
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
                transition: opacity 12s ease-in-out, background-color 15s ease-in-out, mix-blend-mode 15s ease-in-out;
            }
            .layer > span {
                font-size: 70vmin; line-height: 1; position: absolute; pointer-events: none;
                transition: color 15s ease-in-out, mix-blend-mode 15s ease-in-out;
            }
        `;
        document.head.appendChild(style);

        // --- Main Logic ---
        const wrapper = document.createElement('div');
        wrapper.id = 'degen8-wrapper';
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
        let themeColor;

        function getRandomColor() { return themeColor; }

        function getRandomRGBAColor(minAlpha = 0.01, maxAlpha = 0.1) {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            const a = (Math.random() * (maxAlpha - minAlpha)) + minAlpha;
            return `rgba(${r},${g},${b},${a.toFixed(2)})`;
        }

        function getRandomBlendMode() {
            return mixBlendModes[Math.floor(Math.random() * mixBlendModes.length)];
        }

        function createAndAddLayer(parentBlock, delay) {
            const layerDiv = document.createElement("div");
            layerDiv.className = "layer";
            const charSpan = document.createElement("span");
            layerDiv.appendChild(charSpan);
            parentBlock.appendChild(layerDiv);
            allLayers.push(layerDiv);
            updateLayer(layerDiv);

            // Staggered fade-in
            setTimeout(() => {
                layerDiv.style.opacity = 0.9;
            }, delay);
        }

        function updateLayer(layerElement) {
            layerElement.style.backgroundColor = getRandomRGBAColor();
            layerElement.style.mixBlendMode = getRandomBlendMode();

            const charSpan = layerElement.querySelector('span');
            if (charSpan) {
                charSpan.style.color = getRandomColor();
                charSpan.style.mixBlendMode = getRandomBlendMode();
                if (Math.random() < 0.5) {
                    const randomGlyphHex = myarray[Math.round((myarray.length - 1) * Math.random())];
                    charSpan.innerHTML = `&#x${randomGlyphHex};`;
                    layerElement.title = `Glyph HEX: ${randomGlyphHex}`;
                }
            }
        }

        function setupDynamicBlocks() {
            leftBlock.innerHTML = '';
            rightBlock.innerHTML = '';
            allLayers = [];

            // Use the main page's color palette
            themeColor = mycolors[Math.round((mycolors.length - 1) * Math.random())];
            document.body.style.backgroundColor = themeColor;

            const numLayersLeft = Math.floor(Math.random() * 15) + 5;
            for (let i = 0; i < numLayersLeft; i++) {
                createAndAddLayer(leftBlock, i * 300); // Stagger fade-in by 300ms
            }

            const numLayersRight = Math.floor(Math.random() * 15) + 5;
            for (let i = 0; i < numLayersRight; i++) {
                createAndAddLayer(rightBlock, i * 300); // Stagger fade-in by 300ms
            }
        }

        setupDynamicBlocks();

        // Continuous updates
        window.setInterval(() => {
            if (allLayers.length > 0) {
                const randomLayerIndex = Math.floor(Math.random() * allLayers.length);
                updateLayer(allLayers[randomLayerIndex]);
            }
        }, 6000);

        window.setInterval(() => {
            themeColor = mycolors[Math.round((mycolors.length - 1) * Math.random())];
            document.body.style.backgroundColor = themeColor;
        }, 12000);
    }
}

createDegenerator8();