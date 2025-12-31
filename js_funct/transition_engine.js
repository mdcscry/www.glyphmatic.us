/**
 * TransitionEngine - Reusable 3D CSS transition generator
 * Generates diverse transition animations with configurable parameters
 */
(function(global) {
    'use strict';

    class TransitionEngine {
        constructor(options = {}) {
            // Configuration
            this.count = options.count || 40;
            this.prefix = options.prefix || 'transition';
            this.durationMin = options.durationMin || 1.5;
            this.durationMax = options.durationMax || 3.0;
            this.styleElementId = options.styleElementId || 'transition-engine-styles';

            // State
            this.transitions = [];
            this.styleSheet = null;

            // Initialize
            this.createStyleSheet();
            this.generateTransitions();
        }

        createStyleSheet() {
            // Remove existing style element if it exists
            const existing = document.getElementById(this.styleElementId);
            if (existing) {
                existing.remove();
            }

            const style = document.createElement('style');
            style.id = this.styleElementId;
            document.head.appendChild(style);
            this.styleSheet = style.sheet;
        }

        generateTransitions() {
            for (let i = 0; i < this.count; i++) {
                const transitionData = this.createTransitionData(i);
                this.transitions.push(transitionData);

                // Create keyframes and classes from the data
                const { keyframesOut, keyframesIn } = this.createKeyframes(transitionData);
                this.styleSheet.insertRule(keyframesOut, this.styleSheet.cssRules.length);
                this.styleSheet.insertRule(keyframesIn, this.styleSheet.cssRules.length);

                const classOut = `
                    .${transitionData.name}-out {
                        animation: ${transitionData.name}-out ${transitionData.out.duration}s ${transitionData.out.timingFunction} forwards;
                    }`;
                const classIn = `
                    .${transitionData.name}-in {
                        animation: ${transitionData.name}-in ${transitionData.in.duration}s ${transitionData.in.timingFunction} forwards;
                    }`;
                this.styleSheet.insertRule(classOut, this.styleSheet.cssRules.length);
                this.styleSheet.insertRule(classIn, this.styleSheet.cssRules.length);
            }

            console.log(`TransitionEngine: Generated ${this.transitions.length} transitions`);
        }

        createTransitionData(index) {
            const rand = (min, max) => Math.random() * (max - min) + min;
            const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

            const timingFunctions = ['ease-in-out', 'ease-in', 'ease-out', 'linear'];

            // Library of transition recipes
            const recipes = [
                // Name, Out Transform, In Transform
                ['yTwist', { rotateY: '90deg', scale: 0.5 }, { rotateY: '-90deg', scale: 0.5 }],
                ['xTumble', { rotateX: '-90deg', scale: 0.5 }, { rotateX: '90deg', scale: 0.5 }],
                ['zSpin', { rotateZ: '180deg', scale: 0.05 }, { rotateZ: '-180deg', scale: 0.05 }],
                ['scaleDown', { scale: 0.1 }, { scale: 0.1 }],
                ['slideOutRight', { translateX: '100%', opacity: 0 }, { translateX: '-100%', opacity: 0 }],
                ['slideOutLeft', { translateX: '-100%', opacity: 0 }, { translateX: '100%', opacity: 0 }],
                ['slideOutUp', { translateY: '-100%', opacity: 0 }, { translateY: '100%', opacity: 0 }],
                ['slideOutDown', { translateY: '100%', opacity: 0 }, { translateY: '-100%', opacity: 0 }],
                ['fallOver', { rotateX: '90deg', translateY: '50%', scale: 0.8 }, { rotateX: '-90deg', translateY: '-50%', scale: 0.8 }],
                ['peelAway', { rotateY: '-90deg', translateX: '-50%', scale: 0.8 }, { rotateY: '90deg', translateX: '50%', scale: 0.8 }],
                ['corkscrewOut', { rotateZ: '180deg', scale: 0.1, translateY: '100%' }, { rotateZ: '-180deg', scale: 0.1, translateY: '-100%' }],
                ['zoomIn', { scale: 2, opacity: 0 }, { scale: 0.1, opacity: 0 }],
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
                ['squeezeOut', { scaleX: 0.05, opacity: 0 }, { scaleX: 0.05, opacity: 0 }],
                ['stretchOut', { scaleY: 0.05, opacity: 0 }, { scaleY: 0.05, opacity: 0 }],
                ['tumbleAndFade', { rotateX: '90deg', rotateY: '90deg', opacity: 0 }, { rotateX: '-90deg', rotateY: '-90deg', opacity: 0 }],
                ['swingOut', { rotateZ: '60deg', translateX: '100%', opacity: 0 }, { rotateZ: '-60deg', translateX: '-100%', opacity: 0 }],
                ['hingeTop', { rotateX: '-90deg', translateY: '-50%' }, { rotateX: '90deg', translateY: '50%' }],
                ['hingeBottom', { rotateX: '90deg', translateY: '50%' }, { rotateX: '-90deg', translateY: '-50%' }],
                ['gateFold', { scaleX: 0.1, rotateY: '80deg' }, { scaleX: 0.1, rotateY: '-80deg' }],
                ['irisOut', { scale: 0.1, rotateZ: '360deg' }, { scale: 0.1, rotateZ: '-360deg' }],
                ['revolveOut', { rotateY: '180deg', scale: 0.5 }, { rotateY: '0deg', scale: 2, opacity: 0 }],
                ['unfold', { scaleY: 0.1, rotateX: '90deg' }, { scaleY: 0.1, rotateX: '-90deg' }],
                ['slideAndRotate', { translateX: '50%', rotateY: '90deg' }, { translateX: '-50%', rotateY: '-90deg' }],
                ['bounceOut', { scale: 1.2, opacity: 0 }, { scale: 0.8, opacity: 0 }],
                ['shrinkAndRotate', { scale: 0.2, rotateZ: '-180deg' }, { scale: 0.2, rotateZ: '180deg' }],
                ['skewAndExit', { rotateY: '30deg', rotateX: '30deg', translateX: '100%', opacity: 0 }, { rotateY: '-30deg', rotateX: '-30deg', translateX: '-100%', opacity: 0 }],
                // New unique recipes
                ['bookFlip', { rotateY: '-180deg', translateX: '-50%', scale: 0.8 }, { rotateY: '180deg', translateX: '50%', scale: 0.8 }],
                ['spiralOut', { rotateZ: '720deg', scale: .05, translateY: '-100%' }, { rotateZ: '-720deg', scale: 0.05, translateY: '100%' }],
                ['zigzagLeft', { translateX: '-150%', translateY: '50%', rotateZ: '-15deg' }, { translateX: '150%', translateY: '-50%', rotateZ: '15deg' }],
                ['warpOut', { scaleX: 0.1, scaleY: 1.5, rotateZ: '45deg', opacity: 0 }, { scaleX: 0.1, scaleY: 1.5, rotateZ: '-45deg', opacity: 0 }],
                ['elasticBounce', { scale: 1.5, translateY: '-30%', opacity: 0 }, { scale: 0.5, translateY: '30%', opacity: 0 }],
                ['prismSplit', { rotateY: '90deg', scaleX: 0.3, translateX: '100%' }, { rotateY: '-90deg', scaleX: 0.3, translateX: '-100%' }],
                ['origamiFold', { rotateX: '90deg', scaleY: 0.1, translateY: '50%' }, { rotateX: '-90deg', scaleY: 0.1, translateY: '-50%' }],
                ['curtainClose', { scaleX: 0, rotateY: '15deg', translateX: '10%' }, { scaleX: 0, rotateY: '-15deg', translateX: '-10%' }],
                ['doorSwingLeft', { rotateY: '-120deg', translateX: '-100%', scale: 0.9 }, { rotateY: '120deg', translateX: '100%', scale: 0.9 }],
                ['doorSwingRight', { rotateY: '120deg', translateX: '100%', scale: 0.9 }, { rotateY: '-120deg', translateX: '-100%', scale: 0.9 }],
                ['vortexSpin', { rotateZ: '1080deg', scale: 0.1, opacity: 0 }, { rotateZ: '-1080deg', scale: 0.1, opacity: 0 }],
                ['perspectiveZoom', { rotateX: '-45deg', scale: 2, translateY: '-50%', opacity: 0 }, { rotateX: '45deg', scale: 2, translateY: '50%', opacity: 0 }],
                ['rubberBand', { scaleX: 1.5, scaleY: 0.5, rotateZ: '10deg' }, { scaleX: 0.5, scaleY: 1.5, rotateZ: '-10deg' }],
                ['tornadoTwist', { rotateY: '360deg', rotateZ: '360deg', translateY: '100%', scale: 0.3 }, { rotateY: '-360deg', rotateZ: '-360deg', translateY: '-100%', scale: 0.3 }],
                ['paperCrumple', { scale: 0.2, rotateX: '180deg', rotateY: '180deg', rotateZ: '180deg', opacity: 0 }, { scale: 0.2, rotateX: '-180deg', rotateY: '-180deg', rotateZ: '-180deg', opacity: 0 }],
                ['ribbonTwirl', { rotateY: '720deg', scaleY: 0.2, translateY: '50%' }, { rotateY: '-720deg', scaleY: 0.2, translateY: '-50%' }],
                ['kaleidoscope', { rotateZ: '360deg', rotateY: '360deg', scale: 0.1, opacity: 0 }, { rotateZ: '-360deg', rotateY: '-360deg', scale: 0.1, opacity: 0 }],
                ['accordionVertical', { scaleY: .05, rotateX: '45deg', translateY: '-50%' }, { scaleY: 0.05, rotateX: '-45deg', translateY: '50%' }],
                ['accordionHorizontal', { scaleX: 0.05, rotateY: '45deg', translateX: '-50%' }, { scaleX: 0.05, rotateY: '-45deg', translateX: '50%' }],
                ['windmill', { rotateZ: '180deg', rotateY: '90deg', scale: 0.5 }, { rotateZ: '-180deg', rotateY: '-90deg', scale: 0.5 }],
                ['tiltAndSlide', { rotateX: '60deg', translateY: '100%', scale: 0.7 }, { rotateX: '-60deg', translateY: '-100%', scale: 0.7 }],
                ['flipFlop', { rotateX: '180deg', rotateY: '180deg', scale: 0.5 }, { rotateX: '-180deg', rotateY: '-180deg', scale: 0.5 }],
                ['snakeSlide', { translateX: '100%', translateY: '20%', rotateZ: '45deg', scaleY: 0.8 }, { translateX: '-100%', translateY: '-20%', rotateZ: '-45deg', scaleY: 0.8 }],
                ['venetianBlind', { scaleY: 0.1, rotateX: '75deg', opacity: 0 }, { scaleY: 0.1, rotateX: '-75deg', opacity: 0 }],
                ['fanOut', { rotateZ: '90deg', scaleX: 0.3, translateX: '50%', translateY: '50%' }, { rotateZ: '-90deg', scaleX: 0.3, translateX: '-50%', translateY: '-50%' }],
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
                name: `${this.prefix}-${index}`,
                index: index,
                type: recipeName, // Store the recipe name for debugging
                out: {
                    duration: rand(this.durationMin, this.durationMax),
                    timingFunction: pick(timingFunctions),
                    opacity: outTransform.opacity !== undefined ? outTransform.opacity : 0,
                    transform: finalOutTransform
                },
                in: {
                    duration: rand(this.durationMin, this.durationMax),
                    timingFunction: pick(timingFunctions),
                    opacity: 1,
                    transform: finalInTransform
                }
            };
        }

        createKeyframes(transitionData) {
            const tOut = transitionData.out.transform;
            const tIn = transitionData.in.transform;

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
        }

        getRandomTransition() {
            return this.transitions[Math.floor(Math.random() * this.transitions.length)];
        }

        getTransition(index) {
            if (index >= 0 && index < this.transitions.length) {
                return this.transitions[index];
            }
            return null;
        }
    }

    // Export to global scope
    global.TransitionEngine = TransitionEngine;
    console.log('TransitionEngine library loaded');

})(window);
