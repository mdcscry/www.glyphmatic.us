document.addEventListener('DOMContentLoaded', () => {
    const TransitionEngine = {
        emojiData: [], // Will be populated by buildEmojiData
        transitions: [],
        styleSheet: null,
        glyphElement: document.getElementById('glyph'),
        metadataDisplay: document.getElementById('metadata-display'),
        captureBtn: document.getElementById('captureBtn'),
        currentTransitionIndex: -1,
        isAnimating: false,

        init() {
            // buildEmojiData is now called before init()
            this.createStyleSheet();
            this.generateTransitions(40);
            this.setupEventListeners();
            console.log('Transition Engine Initialized.');
            console.log('Generated Transitions Metadata:', this.transitions);
        },

        // --- NEW: Build a single emojiData array from the versioned files ---
        buildEmojiData() {
            // Since 'const' doesn't attach to 'window', we must reference them directly.
            // This list should match the arrays in emoji_versions_data2.js
            const emojiArrays = [
                'emoji_zwj_v1_0', 'emoji_zwj_v2_0', 'emoji_zwj_v3_0', 'emoji_zwj_v4_0',
                'emoji_zwj_v5_0', 'emoji_v8_0_skintones', 'emoji_zwj_v11_0', 'emoji_zwj_v12_0',
                'emoji_zwj_v12_1', 'emoji_zwj_v13_0', 'emoji_zwj_v13_1', 'emoji_zwj_v14_0',
                'emoji_zwj_v15_0', 'emoji_zwj_v15_1', 'emoji_zwj_v16_0', 'emoji_zwj_v17_0'
            ];

            const allEmojis = [];
            emojiArrays.forEach(arrName => {
                // Check if the variable exists in the global scope
                if (typeof window[arrName] !== 'undefined' && Array.isArray(window[arrName])) {
                    allEmojis.push(...window[arrName]);
                } else if (typeof self[arrName] !== 'undefined' && Array.isArray(self[arrName])) {
                    // Fallback for different global contexts
                    allEmojis.push(...self[arrName]);
                } else {
                    // This is a safe way to check for non-window globals
                    try {
                        const directEval = eval(arrName);
                        if (Array.isArray(directEval)) {
                            allEmojis.push(...directEval);
                        }
                    } catch (e) { /* Variable doesn't exist, do nothing */ }
                }
            });

            if (allEmojis.length === 0) return false;

            // Convert the string array to the object array the engine expects
            this.emojiData = allEmojis.map(emojiStr => ({
                hex: [...emojiStr].map(char => char.codePointAt(0).toString(16)).join('-')
            }));
            return true;
        },

        createStyleSheet() {
            const style = document.createElement('style');
            style.id = 'transition-engine-styles';
            document.head.appendChild(style);
            this.styleSheet = style.sheet;
        },

        // --- DATA STRUCTURE GENERATION ---
        generateTransitions(count) {
            for (let i = 0; i < count; i++) {
                const transitionData = this.createRandomTransitionData(i);
                this.transitions.push(transitionData);

                // Create keyframes and classes from the data
                const { keyframesOut, keyframesIn } = this.createKeyframes(transitionData);
                this.styleSheet.insertRule(keyframesOut, this.styleSheet.cssRules.length);
                this.styleSheet.insertRule(keyframesIn, this.styleSheet.cssRules.length);

                const classOut = `
                    .transition-${i}-out {
                        animation: transition-${i}-out ${transitionData.out.duration}s ${transitionData.out.timingFunction} forwards;
                    }`;
                const classIn = `
                    .transition-${i}-in {
                        animation: transition-${i}-in ${transitionData.in.duration}s ${transitionData.in.timingFunction} forwards;
                    }`;
                this.styleSheet.insertRule(classOut, this.styleSheet.cssRules.length);
                this.styleSheet.insertRule(classIn, this.styleSheet.cssRules.length);
            }
        },

        createRandomTransitionData(index) {
            const rand = (min, max) => Math.random() * (max - min) + min;
            const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

            const timingFunctions = ['ease-in-out', 'ease-in', 'ease-out', 'linear'];

            // --- NEW: A library of unique transition "recipes" ---
            const recipes = [
                // Name, Out Transform, In Transform
                ['yTwist', { rotateY: '90deg', scale: 0.5 }, { rotateY: '-90deg', scale: 0.5 }],
                ['xTumble', { rotateX: '-90deg', scale: 0.5 }, { rotateX: '90deg', scale: 0.5 }],
                ['zSpin', { rotateZ: '180deg', scale: 0 }, { rotateZ: '-180deg', scale: 0 }],
                ['scaleDown', { scale: 0 }, { scale: 0 }],
                ['slideOutRight', { translateX: '100%', opacity: 0 }, { translateX: '-100%', opacity: 0 }],
                ['slideOutLeft', { translateX: '-100%', opacity: 0 }, { translateX: '100%', opacity: 0 }],
                ['slideOutUp', { translateY: '-100%', opacity: 0 }, { translateY: '100%', opacity: 0 }],
                ['slideOutDown', { translateY: '100%', opacity: 0 }, { translateY: '-100%', opacity: 0 }],
                ['fallOver', { rotateX: '90deg', translateY: '50%', scale: 0.8 }, { rotateX: '-90deg', translateY: '-50%', scale: 0.8 }],
                ['peelAway', { rotateY: '-90deg', translateX: '-50%', scale: 0.8 }, { rotateY: '90deg', translateX: '50%', scale: 0.8 }],
                ['corkscrewOut', { rotateZ: '180deg', scale: 0, translateY: '100%' }, { rotateZ: '-180deg', scale: 0, translateY: '-100%' }],
                ['zoomIn', { scale: 2, opacity: 0 }, { scale: 0, opacity: 0 }],
                ['diagonalSlideTopLeft', { translateX: '-100%', translateY: '-100%', rotateZ: '-45deg', opacity: 0 }, { translateX: '100%', translateY: '100%', rotateZ: '45deg', opacity: 0 }],
                ['diagonalSlideTopRight', { translateX: '100%', translateY: '-100%', rotateZ: '45deg', opacity: 0 }, { translateX: '-100%', translateY: '100%', rotateZ: '-45deg', opacity: 0 }],
                ['cornerTwist', { rotateZ: '90deg', scale: 0.5, translateX: '50%', translateY: '-50%' }, { rotateZ: '-90deg', scale: 0.5, translateX: '-50%', translateY: '50%' }],
                ['skewSlide', { rotateY: '45deg', rotateX: '-45deg', translateX: '100%' }, { rotateY: '-45deg', rotateX: '45deg', translateX: '-100%' }],
                ['flip3D-Y', { rotateY: '180deg' }, { rotateY: '-180deg' }],
                ['flip3D-X', { rotateX: '180deg' }, { rotateX: '-180deg' }],
                ['carouselLeft', { rotateY: '-90deg', translateX: '-100%', scale: 0.7 }, { rotateY: '90deg', translateX: '100%', scale: 0.7 }],
                ['carouselRight', { rotateY: '90deg', translateX: '100%', scale: 0.7 }, { rotateY: '-90deg', translateX: '-100%', scale: 0.7 }],
                ['dropAndSpin', { translateY: '100%', rotateZ: '-180deg', opacity: 0 }, { translateY: '-100%', rotateZ: '180deg', opacity: 0 }],
                ['riseAndSpin', { translateY: '-100%', rotateZ: '180deg', opacity: 0 }, { translateY: '100%', rotateZ: '-180deg', opacity: 0 }],
                ['squeezeOut', { scaleX: 0, opacity: 0 }, { scaleX: 0, opacity: 0 }],
                ['stretchOut', { scaleY: 0, opacity: 0 }, { scaleY: 0, opacity: 0 }],
                ['tumbleAndFade', { rotateX: '90deg', rotateY: '90deg', opacity: 0 }, { rotateX: '-90deg', rotateY: '-90deg', opacity: 0 }],
                ['swingOut', { rotateZ: '60deg', translateX: '100%', opacity: 0 }, { rotateZ: '-60deg', translateX: '-100%', opacity: 0 }],
                ['hingeTop', { rotateX: '-90deg', translateY: '-50%' }, { rotateX: '90deg', translateY: '50%' }],
                ['hingeBottom', { rotateX: '90deg', translateY: '50%' }, { rotateX: '-90deg', translateY: '-50%' }],
                ['gateFold', { scaleX: 0.1, rotateY: '80deg' }, { scaleX: 0.1, rotateY: '-80deg' }],
                ['irisOut', { scale: 0.1, rotateZ: '360deg' }, { scale: 0.1, rotateZ: '-360deg' }],
                ['revolveOut', { rotateY: '180deg', scale: 0.5 }, { rotateY: '0deg', scale: 2, opacity: 0 }],
                ['unfold', { scaleY: 0.1, rotateX: '90deg' }, { scaleY: 0.1, rotateX: '-90deg' }],
                ['slideAndRotate', { translateX: '50%', rotateY: '90deg' }, { translateX: '-50%', rotateY: '-90deg' }],
                ['bounceOut', { scale: 1.2, opacity: 0.5 }, { scale: 0.8, opacity: 0 }],
                ['shrinkAndRotate', { scale: 0.2, rotateZ: '-180deg' }, { scale: 0.2, rotateZ: '180deg' }],
                ['skewAndExit', { rotateY: '30deg', rotateX: '30deg', translateX: '100%', opacity: 0 }, { rotateY: '-30deg', rotateX: '-30deg', translateX: '-100%', opacity: 0 }],
            ];

            // Use a recipe for each transition, cycling through the list
            const [recipeName, outTransform, inTransform] = recipes[index % recipes.length];

            // Helper to format transform values, providing defaults
            const formatTransform = (transform) => {
                return {
                    rotateX: transform.rotateX || '0deg',
                    rotateY: transform.rotateY || '0deg',
                    rotateZ: transform.rotateZ || '0deg',
                    scale: transform.scale !== undefined ? transform.scale : 1,
                    scaleX: transform.scaleX !== undefined ? transform.scaleX : 1,
                    scaleY: transform.scaleY !== undefined ? transform.scaleY : 1,
                    translateX: transform.translateX || '0%',
                    translateY: transform.translateY || '0%',
                };
            };

            const finalOutTransform = formatTransform(outTransform);
            const finalInTransform = formatTransform(inTransform);

            // Common structure for all transition types
            return {
                name: `transition-${index}`,
                index: index,
                type: recipeName, // Store the recipe name for easy debugging
                out: {
                    duration: rand(1.5, 3.0),
                    timingFunction: pick(timingFunctions),
                    opacity: outTransform.opacity !== undefined ? outTransform.opacity : 0,
                    transform: finalOutTransform
                },
                in: {
                    duration: rand(1.5, 3.0),
                    timingFunction: pick(timingFunctions),
                    opacity: 1,
                    transform: finalInTransform
                }
            };
        },

        // --- CSS GENERATION FROM DATA ---
        createKeyframes(transitionData) {
            const tOut = transitionData.out.transform; // Already formatted
            const tIn = transitionData.in.transform;   // Already formatted

            const keyframesOut = `
                @keyframes ${transitionData.name}-out {
                    from { opacity: 1; transform: rotateX(0) rotateY(0) rotateZ(0) scaleX(1) scaleY(1) translateX(0) translateY(0); }
                    to {
                        opacity: ${transitionData.out.opacity};
                        transform: rotateX(${tOut.rotateX}) rotateY(${tOut.rotateY}) rotateZ(${tOut.rotateZ}) scaleX(${tOut.scaleX}) scaleY(${tOut.scaleY}) scale(${tOut.scale}) translateX(${tOut.translateX}) translateY(${tOut.translateY});
                    }
                }`;

            const keyframesIn = `
                @keyframes ${transitionData.name}-in {
                    from {
                        opacity: 0;
                        transform: rotateX(${tIn.rotateX}) rotateY(${tIn.rotateY}) rotateZ(${tIn.rotateZ}) scaleX(${tIn.scaleX}) scaleY(${tIn.scaleY}) scale(${tIn.scale}) translateX(${tIn.translateX}) translateY(${tIn.translateY});
                    }
                    to { opacity: 1; transform: rotateX(0) rotateY(0) rotateZ(0) scaleX(1) scaleY(1) translateX(0) translateY(0); }
                }`;

            return { keyframesOut, keyframesIn };
        },

        // --- ANIMATION LOGIC ---
        applyTransition(index) {
            if (this.isAnimating || index < 0 || index >= this.transitions.length) {
                return;
            }
            this.isAnimating = true;
            this.currentTransitionIndex = index;

            const transitionData = this.transitions[index];
            this.displayMetadata(transitionData);

            const outClassName = `transition-${index}-out`;
            const inClassName = `transition-${index}-in`;

            // 1. Start the 'out' animation
            this.glyphElement.className = outClassName;

            // 2. Wait for the 'out' animation to finish
            setTimeout(() => {
                // 3. Change the glyph content
                const randomEmojiData = this.emojiData[Math.floor(Math.random() * this.emojiData.length)];
                this.glyphElement.innerHTML = `&#x${(randomEmojiData.hex || '').replace(/-/g, ';&#x')};`;

                // 4. Apply the 'in' animation
                this.glyphElement.className = inClassName;

                // 5. Wait for the 'in' animation to finish
                setTimeout(() => {
                    // 6. Clean up and allow next animation
                    this.glyphElement.className = '';
                    this.isAnimating = false;
                }, transitionData.in.duration * 1000);

            }, transitionData.out.duration * 1000);
        },

        // --- UI AND EVENT LISTENERS ---
        displayMetadata(data) {
            const prettyJSON = JSON.stringify(data, null, 2);
            this.metadataDisplay.innerHTML = `<pre>${prettyJSON}</pre>`;
        },

        captureCurrentTransition() {
            if (this.currentTransitionIndex !== -1) {
                const dataToCapture = this.transitions[this.currentTransitionIndex];
                console.log('--- CAPTURED TRANSITION ---');
                // Log as a string that can be copied
                console.log(JSON.stringify(dataToCapture, null, 2) + ',');
                alert(`Transition ${this.currentTransitionIndex} metadata logged to console.`);
            } else {
                alert('No transition has been played yet to capture.');
            }
        },

        setupEventListeners() {
            const keyMap = {
                // Top row
                '1': 0, '2': 1, '3': 2, '4': 3, '5': 4, '6': 5, '7': 6, '8': 7, '9': 8, '0': 9,
                // QWERTY row
                'q': 10, 'w': 11, 'e': 12, 'r': 13, 't': 14, 'y': 15, 'u': 16, 'i': 17, 'o': 18, 'p': 19,
                // Home row
                'a': 20, 's': 21, 'd': 22, 'f': 23, 'g': 24, 'h': 25, 'j': 26, 'k': 27, 'l': 28,
                // Bottom row
                'z': 29, 'x': 30, 'c': 31, 'v': 32, 'b': 33, 'n': 34, 'm': 35,
            };

            window.addEventListener('keydown', (e) => {
                const key = e.key.toLowerCase();

                if (keyMap.hasOwnProperty(key)) {
                    const index = keyMap[key];
                    this.applyTransition(index);
                }
                // --- SCROLLING LOGIC ---
                else if (key === 'arrowright' || key === 'arrowup') {
                    e.preventDefault(); // Prevent page scrolling
                    let nextIndex = this.currentTransitionIndex + 1;
                    if (nextIndex >= this.transitions.length) {
                        nextIndex = 0; // Wrap around to the start
                    }
                    this.applyTransition(nextIndex);
                } else if (key === 'arrowleft' || key === 'arrowdown') {
                    e.preventDefault(); // Prevent page scrolling
                    let prevIndex = this.currentTransitionIndex - 1;
                    if (this.currentTransitionIndex === -1) { // If nothing has been played yet
                        prevIndex = 0;
                    } else if (prevIndex < 0) {
                        prevIndex = this.transitions.length - 1; // Wrap around to the end
                    }
                    this.applyTransition(prevIndex);
                }
            });

            this.captureBtn.addEventListener('click', () => {
                this.captureCurrentTransition();
            });
        }
    };

    // Check if all required elements exist before initializing
    const canInitialize = TransitionEngine.buildEmojiData(); // Call it once here
    if (
        document.getElementById('glyph') &&
        document.getElementById('metadata-display') &&
        document.getElementById('captureBtn') &&
        canInitialize
    ) {
        TransitionEngine.init();
        // Expose to window for debugging
        window.TransitionEngine = TransitionEngine;
    } else {
        console.error('Could not initialize TransitionEngine. Required HTML elements or emojiData not found.');
    }
});