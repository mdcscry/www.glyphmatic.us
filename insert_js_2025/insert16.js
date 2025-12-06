/**
 * Insert 16: Emoji Grid - Multi-Flavor Edition
 * Consolidates 3 emoji exploration variants into one file with random flavor selection
 * Randomly selects one of 3 flavor configurations on page load
 */

(function() {
    // === FLAVOR SELECTION ===
    const FLAVOR = Math.floor(Math.random() * 3);

    // Flavor configurations:
    // 0: 10x10 grid, vibrant pastels (50-60% L), larger emojis, no font switching (original insert16)
    // 1: 5x5 grid, very light pastels (90-100% L), largest emojis, no font switching (was insert17)
    // 2: 10x10 grid, vibrant pastels (50-60% L), smaller emojis, WITH font switching (was insert19)

    const flavorConfig = {
        gridSize: [10, 5, 10][FLAVOR],
        fontSize: [
            'min(10rem, 8vh, 5rem)',
            'min(16vh, 10rem)',
            'min(7vh, 5rem)'
        ][FLAVOR],
        lineHeight: [1.75, 1.5, 1][FLAVOR],
        cellWidth: [10, 20, 10][FLAVOR],
        cellHeight: [10, 20, 10][FLAVOR],
        pastelLightness: (FLAVOR === 1) ? [90, 100] : [50, 60],
        pastelSaturation: (FLAVOR === 1) ? [50, 100] : [90, 100],
        hasFontSwitching: (FLAVOR === 2),
        flipTiming: (FLAVOR === 1) ? [40000, 8000] : [45000, 5000],
        initialDelay: (FLAVOR === 1) ? [30000, 7000] : [80000, 5000]
    };

    console.log(`Emoji Grid: Selected FLAVOR ${FLAVOR}`);
    console.log('Config:', flavorConfig);

    // === SHARED STATE ===
    var allEmojis = [];
    var remainingEmojis = [];
    let globalBodyBgColor = '';

    // === FONT SWITCHING (Flavor 2 only) ===
    const emojiFonts = [
        '"Apple Color Emoji"',
        '"Noto Color Emoji"',
        '"Noto Emoji"',
        '"Open Moji 0"',
        '"Segoe Emoji"',
        '"Twitter Color Emoji"',
        '"Open Moji Black"',
        '"Emoji Two"',
        '"Fluent Emoji Color"',
        '"Fluent Emoji Flat"',
        '"Fluent Emoji HC"',
        '"Fluent Emoji INV HC"',
        '"Blobmoji"',
        '"TossfaceOTF"',
        '"WhatsApp Emoji"'
    ];

    // Convert emoji to hex sequence (for exclusion matching in flavor 2)
    function emojiToHexSequence(emoji) {
        const codePoints = [];
        for (const char of emoji) {
            const cp = char.codePointAt(0);
            if (cp !== undefined) {
                codePoints.push(cp.toString(16).toUpperCase());
            }
        }
        return codePoints.join('-');
    }

    // Check if emoji is excluded for a given font (flavor 2 only)
    function isEmojiExcluded(emoji, fontName, version) {
        if (!flavorConfig.hasFontSwitching) return false;

        const cleanFont = fontName.replace(/['"]/g, '');
        const exclusions = exclude_emoji_font[cleanFont];

        if (!exclusions) return false;

        // Check block exclusion
        if (exclusions.blocks?.includes(version)) {
            console.log(`🚫 BLOCK excluded: ${emoji} [${version}] from ${cleanFont}`);
            return true;
        }

        // Check sequence exclusion
        const emojiHex = emojiToHexSequence(emoji);
        if (exclusions.sequences?.includes(emojiHex)) {
            console.log(`🚫 SEQUENCE excluded: ${emoji} (${emojiHex}) from ${cleanFont}`);
            return true;
        }

        return false;
    }

    // Pick a valid random emoji-font combination (flavor 2 only)
    function getRandomValidCombo() {
        let attempts = 0;
        const maxAttempts = 50000;

        while (attempts < maxAttempts) {
            const poolIndex = Math.floor(Math.random() * remainingEmojis.length);
            const emojiObj = remainingEmojis[poolIndex];
            const font = emojiFonts[Math.floor(Math.random() * emojiFonts.length)];

            if (!isEmojiExcluded(emojiObj.emoji, font, emojiObj.version)) {
                remainingEmojis.splice(poolIndex, 1);
                console.log(`✅ ${emojiObj.emoji} (${emojiToHexSequence(emojiObj.emoji)}) [${emojiObj.version}] in ${font}`);
                return {emoji: emojiObj.emoji, font, version: emojiObj.version};
            }

            console.log(`❌ Rejected: ${emojiObj.emoji} (${emojiToHexSequence(emojiObj.emoji)}) [${emojiObj.version}] in ${font}`);
            attempts++;
        }

        const emojiObj = remainingEmojis.splice(0, 1)[0] || {emoji: '❓', version: 'unknown'};
        return {emoji: emojiObj.emoji, font: '"Apple Color Emoji"', version: emojiObj.version};
    }

    function getRandomFont() {
        return emojiFonts[Math.floor(Math.random() * emojiFonts.length)];
    }

    function setEmojiFont(fontName) {
        const allEmojiSpans = document.querySelectorAll('.emoji-content');
        allEmojiSpans.forEach(span => {
            span.style.fontFamily = fontName;
        });
    }

    function setRandomFonts() {
        const allEmojiSpans = document.querySelectorAll('.emoji-content');
        allEmojiSpans.forEach(span => {
            span.style.fontFamily = getRandomFont();
        });
    }

    // === HEX CONVERSION (for tooltips) ===
    function emojiToHex(emoji) {
        const codePoints = [];
        for (const char of emoji) {
            codePoints.push(char.codePointAt(0).toString(16).toUpperCase().padStart(4, '0'));
        }
        return codePoints.map(cp => `U+${cp}`).join(' ');
    }

    // === CONTENT INITIALIZATION ===
    function initContent() {
        const emojiArrays = [
            emoji_zwj_v1_0,
            emoji_zwj_v2_0,
            emoji_zwj_v3_0,
            emoji_zwj_v4_0,
            emoji_zwj_v5_0,
            emoji_zwj_v11_0,
            emoji_zwj_v12_0,
            emoji_zwj_v12_1,
            emoji_zwj_v13_0,
            emoji_zwj_v13_1,
            emoji_zwj_v14_0,
            emoji_zwj_v15_0,
            emoji_zwj_v15_1,
            emoji_zwj_v16_0,
        ];

        if (flavorConfig.hasFontSwitching) {
            // Flavor 2: Store emojis with version info
            const emojiVersions = {
                'v1_0': emoji_zwj_v1_0,
                'v2_0': emoji_zwj_v2_0,
                'v3_0': emoji_zwj_v3_0,
                'v4_0': emoji_zwj_v4_0,
                'v5_0': emoji_zwj_v5_0,
                'v11_0': emoji_zwj_v11_0,
                'v12_0': emoji_zwj_v12_0,
                'v12_1': emoji_zwj_v12_1,
                'v13_0': emoji_zwj_v13_0,
                'v13_1': emoji_zwj_v13_1,
                'v14_0': emoji_zwj_v14_0,
                'v15_0': emoji_zwj_v15_0,
                'v15_1': emoji_zwj_v15_1,
                'v16_0': emoji_zwj_v16_0,
            };

            for (const [version, emojiArray] of Object.entries(emojiVersions)) {
                if (Array.isArray(emojiArray)) {
                    emojiArray.forEach(emoji => {
                        allEmojis.push({emoji, version});
                    });
                }
            }
            console.log(`✅ Loaded ${allEmojis.length} total emojis with version tags`);
        } else {
            // Flavors 0 & 1: Simple emoji array
            emojiArrays.forEach(arr => {
                if (Array.isArray(arr)) allEmojis = allEmojis.concat(arr);
            });
            console.log(`✅ Loaded ${allEmojis.length} total emojis`);
        }

        if (allEmojis.length === 0) {
            console.warn("No emoji data found.");
            return;
        }

        remainingEmojis = [...allEmojis];
    }

    // === CSS INJECTION ===
    const embeddedCss = `
        *, *::before, *::after { box-sizing: border-box; }
        html, body {
            height: 100%; width: 100%; margin: 0; padding: 0; overflow: hidden;
        }
        body {
            font-family: Arial, sans-serif;
            display: flex; justify-content: center; align-items: center;
        }
        #emojiGrid {
            display: flex; flex-wrap: wrap; width: 100%; height: 100%;
            border: 25px solid; box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .grid-cell {
            width: ${flavorConfig.cellWidth}%; height: ${flavorConfig.cellHeight}%;
            display: flex; justify-content: center; align-items: center;
            line-height: ${flavorConfig.lineHeight}; border: 3px solid;
            background-color: transparent; perspective: 1000px; border-radius: 8px;
            position: relative;
        }
        .emoji-content {
            display: block;
            font-size: ${flavorConfig.fontSize};
            line-height: 1 !important;
            opacity: 1;
            transform: rotateY(0deg) scale(1);
            transform-style: preserve-3d;
            backface-visibility: hidden;
            transition: none;
            cursor: pointer;
            position: relative;
        }
        /* Tooltip styling */
        .emoji-content::after {
            content: attr(${flavorConfig.hasFontSwitching ? 'data-tooltip' : 'data-hex'});
            position: fixed;
            top: ${flavorConfig.hasFontSwitching ? '50%' : '10px'};
            left: 50%;
            transform: translate${flavorConfig.hasFontSwitching ? '(-50%, -50%)' : 'X(-50%)'};
            background: rgba(0, 0, 0, 0.95);
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: ${flavorConfig.hasFontSwitching ? '12px' : '14px'};
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s;
            z-index: ${flavorConfig.hasFontSwitching ? '8' : '10000'};
            font-family: ${flavorConfig.hasFontSwitching ? 'Noto Sans, sans-serif' : 'monospace'};
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            ${flavorConfig.hasFontSwitching ? 'text-align: center;' : ''}
        }
        .emoji-content:hover::after {
            opacity: 1;
        }
        ${flavorConfig.hasFontSwitching ? '.emoji-content:hover { z-index: 9; }' : ''}
        @keyframes fade-out-twist {
            0% { opacity: 1; transform: rotateY(0deg) scale(1); }
            100% { opacity: 0; transform: rotateY(180deg) scale(0.7); }
        }
        @keyframes fade-in-twist {
            0% { opacity: 0; transform: rotateY(180deg) scale(0.7); }
            100% { opacity: 1; transform: rotateY(360deg) scale(1); }
        }
        .emoji-content.is-fading-out { animation: fade-out-twist 4s ease-in-out forwards; }
        .emoji-content.is-fading-in  { animation: fade-in-twist 2s ease-in-out forwards; }
    `;

    function injectStyle(css) {
        const s = document.createElement('style');
        s.textContent = css;
        document.head.appendChild(s);
    }

    // === COLOR UTILITIES ===
    function getRandomPastelColor() {
        const hue = Math.floor(Math.random() * 360);
        const saturation = Math.floor(Math.random() * (flavorConfig.pastelSaturation[1] - flavorConfig.pastelSaturation[0])) + flavorConfig.pastelSaturation[0];
        const lightness = Math.floor(Math.random() * (flavorConfig.pastelLightness[1] - flavorConfig.pastelLightness[0])) + flavorConfig.pastelLightness[0];
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    function getRandomMainColor() {
        const hue = Math.floor(Math.random() * 360);
        const saturation = Math.floor(Math.random() * 40) + 60;
        const lightness = Math.floor(Math.random() * 30) + 60;
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    // === FLIP ANIMATION ===
    function flipCell(span) {
        if (flavorConfig.hasFontSwitching) {
            console.log("We're flipping");
        }

        span.classList.remove('is-fading-in', 'is-fading-out');
        span.style.removeProperty('transform');
        span.style.removeProperty('opacity');

        span.classList.add('is-fading-out');

        const handleOut = (e) => {
            if (e.animationName !== 'fade-out-twist') return;
            span.removeEventListener('animationend', handleOut);
            span.classList.remove('is-fading-out');

            // Check if pool is empty, reset if needed
            if (remainingEmojis.length === 0) {
                remainingEmojis = [...allEmojis];
                console.log("🔄 Pool exhausted - resetting with all emojis");
            }

            if (flavorConfig.hasFontSwitching) {
                // Flavor 2: Use font switching logic
                const combo = getRandomValidCombo();
                span.textContent = combo.emoji;
                span.setAttribute('data-tooltip', `${combo.font.replace(/['"]/g, '')} [${combo.version}]`);
                span.setAttribute('data-hex', emojiToHex(combo.emoji));
                span.style.fontFamily = combo.font;
            } else {
                // Flavors 0 & 1: Simple random selection
                const poolIndex = Math.floor(Math.random() * remainingEmojis.length);
                const newEmoji = remainingEmojis.splice(poolIndex, 1)[0];
                span.textContent = newEmoji;
                span.setAttribute('data-hex', emojiToHex(newEmoji));
            }

            span.style.transform = 'rotateY(180deg) scale(0.7)';
            span.style.opacity = '0';
            void span.offsetWidth;
            span.classList.add('is-fading-in');

            const handleIn = (e2) => {
                if (e2.animationName !== 'fade-in-twist') return;
                span.removeEventListener('animationend', handleIn);
                span.classList.remove('is-fading-in');
                span.style.removeProperty('transform');
                span.style.removeProperty('opacity');
                setTimeout(() => flipCell(span),
                    Math.random() * flavorConfig.flipTiming[0] + flavorConfig.flipTiming[1]);
            };
            span.addEventListener('animationend', handleIn);
        };
        span.addEventListener('animationend', handleOut);
    }

    // === GRID INITIALIZATION ===
    function initGrid() {
        const grid = document.createElement('div');
        grid.id = 'emojiGrid';
        document.body.appendChild(grid);
        const emojiGrid = document.getElementById('emojiGrid');
        const bodyElement = document.body;

        console.log(`Total emojis in pool: ${allEmojis.length}`);

        if (allEmojis.length === 0) {
            emojiGrid.textContent = "No ZWJ emojis found in the provided data for the target versions.";
            emojiGrid.style.justifyContent = 'center';
            emojiGrid.style.alignItems = 'center';
            emojiGrid.style.fontSize = '1.5em';
        } else {
            globalBodyBgColor = getRandomMainColor();
            bodyElement.style.backgroundColor = globalBodyBgColor;

            emojiGrid.style.borderColor = getRandomMainColor();
            emojiGrid.style.zIndex = 100;
            emojiGrid.style.position = 'absolute';
            const gridSize = flavorConfig.gridSize;
            const totalCells = gridSize * gridSize;

            for (let i = 0; i < totalCells; i++) {
                const cell = document.createElement('div');
                cell.classList.add('grid-cell');

                const emojiContentSpan = document.createElement('span');
                emojiContentSpan.classList.add('emoji-content');

                // Check if pool is empty, reset if needed
                if (remainingEmojis.length === 0) {
                    remainingEmojis = [...allEmojis];
                }

                if (flavorConfig.hasFontSwitching) {
                    // Flavor 2: Use font switching logic
                    const combo = getRandomValidCombo();
                    emojiContentSpan.textContent = combo.emoji;
                    emojiContentSpan.setAttribute('data-tooltip', `${combo.font.replace(/['"]/g, '')} [${combo.version}]`);
                    emojiContentSpan.setAttribute('data-hex', `${emojiToHex(combo.emoji)} [${combo.version}]`);
                    emojiContentSpan.style.fontFamily = combo.font;
                } else {
                    // Flavors 0 & 1: Simple random selection
                    const poolIndex = Math.floor(Math.random() * remainingEmojis.length);
                    const initialEmoji = remainingEmojis.splice(poolIndex, 1)[0];
                    emojiContentSpan.textContent = initialEmoji;
                    emojiContentSpan.setAttribute('data-hex', emojiToHex(initialEmoji));
                }

                cell.style.backgroundColor = getRandomPastelColor();
                cell.style.borderColor = globalBodyBgColor;

                cell.appendChild(emojiContentSpan);
                emojiGrid.appendChild(cell);

                const initialAnimationDelay = (Math.random() * flavorConfig.initialDelay[0]) + flavorConfig.initialDelay[1];
                setTimeout(() => flipCell(emojiContentSpan), initialAnimationDelay);
            }
        }
    }

    // === KEYBOARD SHORTCUTS (Flavor 2 only) ===
    if (flavorConfig.hasFontSwitching) {
        window.addEventListener('keydown', (e) => {
            if (e.key === '1') setEmojiFont('"Apple Color Emoji"');
            if (e.key === '2') setEmojiFont('"Noto Color Emoji"');
            if (e.key === '3') setEmojiFont('"OpenMoji"');
            if (e.key === '4') setEmojiFont('"Segoe UI Emoji"');
            if (e.key === 'r' || e.key === 'R') setRandomFonts();
        });
    }

    // === WAIT FOR SIGNALS ===
    function jsWait() {
        const signalsReady =
            typeof emojiSequenceArraySignal !== 'undefined' &&
            typeof msucdArraySignal !== 'undefined';

        if (!signalsReady) {
            setTimeout(jsWait, 100);
        } else {
            console.log("✅ Signals ready → initializing emoji grid");
            if (flavorConfig.hasFontSwitching) {
                console.log("🎨 Font controls: Press 1-4 to switch fonts, R for random");
            }
            injectStyle(embeddedCss);
            initContent();
            initGrid();
        }
    }

    console.log("insert16.js loaded — waiting for emojiSequenceArraySignal + msucdArraySignal");
    jsWait();
})();
