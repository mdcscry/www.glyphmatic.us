/**
 * Configuration for each insert (animation/visualization)
 * Defines which controls are available and watermark settings
 */

const INSERT_CONFIG = {
    // Default config applied to all inserts unless overridden
    defaults: {
        controls: {
            style: false,      // △STYLE button
            html: false,       // △HTML button
            resize: false,     // +/- Size buttons
            moveUpDown: false // Move up/down (currently disabled globally)
        },
        watermarks: {
            count: 1,         // Number of watermark glyphs
            zIndex: 10,       // z-index for watermarks
            positioning: 'top-left' // 'top-left', 'scattered', 'hidden'
        },
        description: 'No description available for this insert.' // Default description
    },
    
    // Per-insert overrides
    // Only specify what differs from defaults
    inserts: {
        0: {
            controls: {
                html: true,
                style: true,
                resize: true,
                moveUpDown: true

            },
            watermarks: {
                count: 10,
                zIndex: 10,
                positioning: 'scattered',
            },
            description: 'A multi-script Unicode visualization that renders glyphs as hollow outlines by matching the webkit text stroke color with the page background color. Only the character borders remain visible, creating a skeletal display that cycles through Hangul Jamo (U+1100–U+11FF), box-drawing characters (U+2500–U+257F), CJK ideographs, Japanese katakana, mathematical operators, and full-width forms with randomized stroke widths that continuously shift and transform. Each glyph layer receives a random skew transformation (-60° to +60° on both X and Y axes) creating dynamic angular distortions, while text-shadow effects with randomized offsets (-5px to +5px) and palette-based colors add dimensional depth. Three interval functions independently update horizontal, vertical, and bidirectional drop shadows across the eight div layers, creating continuous shadow motion that enhances the geometric complexity. This technique reveals the pure structural geometry of complex Unicode glyphs stripped of their fills, allowing observation of how different fonts construct these specialized character blocks at their most fundamental level.'
        },
        1: {
            watermarks: {
                count: 8,
                zIndex: 10,
                positioning: 'scattered'
            }
        },
        2: {
            watermarks: {
                count: 8,
                zIndex: -1,
                positioning: 'scattered'
            }
        },
        4: {
            controls: {
                style: true,      // △STYLE button
                html: false,       // △HTML button
                resize: false,     // +/- Size buttons
                moveUpDown: false // Move up/down (currently disabled globally)
            },
            watermarks: {
                count: 1,
                zIndex: 100,
                positioning: 'top-left'
            }
        },   
        5: {
            controls: {
                style: true,      // △STYLE button
                html: false,       // △HTML button
                resize: false,     // +/- Size buttons
                moveUpDown: false // Move up/down (currently disabled globally)
            },
            watermarks: {
                count: 1,
                zIndex: 100,
                positioning: 'top-left'
            }
        },          
        
        6: {
            controls: {
                html: true,
                style: true,
                resize: true,
                moveUpDown: true
            },
            watermarks: {
                count: 1,
                zIndex: -1,
                positioning: 'top-left'
            }
        },
        7: {
            watermarks: {
                count: 8,
                zIndex: -1,
                positioning: 'scattered'
            }
        },
        8: {
            controls: {
                html: false,
                style: true,
                resize: true,
                moveUpDown: true
            },
            watermarks: {
                count: 8,
                zIndex: -1,
                positioning: 'scattered'
            }
        },
        9: {
            watermarks: {
                count: 8,
                zIndex: 10,
                positioning: 'scattered'
            }
        },
        11: {
            controls: {
                style: true,      // △STYLE button
                html: false,       // △HTML button
                resize: false,     // +/- Size buttons
                moveUpDown: true // Move up/down (currently disabled globally)
            },
            watermarks: {
                count: 1,
                zIndex: -1,
                positioning: 'top-left'
            }
        },
        13: {
            controls: {
                style: false,      // △STYLE button
                html: true,       // △HTML button
                resize: true,     // +/- Size buttons
                moveUpDown: false // Move up/down (currently disabled globally)
            },
            watermarks: {
                count: 1,
                zIndex: -1,
                positioning: 'top-left'
            }
        },
        23: {
            controls: {
                style: false,      // △STYLE button
                html: false,       // △HTML button
                resize: false,     // +/- Size buttons
                moveUpDown: false, // Move up/down (currently disabled globally)
                description: 'The Macroglyph uses the autofont engine to selects from as many as 270 blocks and 37k glyphs.<br><br> Versions with fewer glyphs include Letters Symbols and Numbers Only, Combining forms and a Variable Font Morphing Version. <br><br> You can use 1,2,3,4 to see the versions and b,w,r,g,t to see the palettes.<br><br> Every glyph is styled with its font selection. Hover to see glyph codepoint and description.'
            },
            watermarks: {
                count: 0,
                zIndex: -1,
                positioning: 'hidden'
            }
        },
        3: { description: 'Spiral layout with layered Unicode glyphs featuring randomized HSLA colors and three independent drop shadow timers (bidirectional, horizontal, and vertical).' },
        10: { description: 'Multi-script mandala with rotating glyphs from geometric, Cyrillic, Arabic, Devanagari, and other writing systems using Noto font families with smooth color transitions and webkit text effects.' },
        12: { description: 'Quad grid displaying multi-font Unicode glyphs with hover tooltips showing codepoints and font names, featuring periodic glyph/font/color swaps.' },
        14: { description: 'SVG masked dissolve with multi-glyph layers fading in and out within a shared mask shape that periodically changes to reveal different Unicode symbols.' },
        15: { description: 'DeGenerator Legacy 8: Split-screen visualization dividing the viewport into left and right halves, each containing 5-20 stacked layers that fade in sequentially with 300ms stagger delays. Box-drawing glyphs from the boxplot.js array render at 70vmin size within layers featuring ultra-transparent RGBA backgrounds (alpha 0.01-0.1) and randomized CSS blend modes.<br><br>Each layer updates independently every 6 seconds with new background colors, blend modes, and glyphs, while a theme color selected from the main palette controls both glyph fills and the full-page background, which changes every 12 seconds. The overlapping semi-transparent layers with varied blend modes create complex optical mixing effects where dozens of box-drawing characters composite together into an evolving abstract composition.<br><br>The combination of long 15-second transitions for colors and blend modes with the 12-second opacity fade creates smooth, meditative cross-fades between states, making the split panels appear to breathe and shift organically as the layered geometric glyphs recombine in continuously varying chromatic and compositional arrangements.' },
        16: { description: 'Emoji grid displaying ZWJ sequences with various backgrounds and 3D twist fade animations cycling through Unicode emoji versions. Uses keyboard to shift through emojis in flavor 3' },
        17: { description: 'DeGenerator Legacy 9: Split-screen with radial gradient backgrounds that cross-fade while displaying box-drawing glyphs with webkit text strokes, shadows, and occasional borders.' },
        18: { description: 'Astronomical orbital animation with classical planets, trans-Neptunian objects, Uranian symbols, and asteroids rotating around a pulsing sun with randomized orbit speeds.' },
        19: { description: 'DaGenerator Doublefast: Fills screen with 15,000 box-drawing double-line characters that change colors and shapes independently on separate fast timers.' },
        20: { description: 'Spinning spirals grid with random OKLCH color palettes, configurable grid layouts (1x1 to 10x10), and directional rotation based on spiral symbol characteristics.' },
        21: { description: 'Quad layout with 20 glyphs per quadrant featuring multi-font Unicode rendering with class-based styling and periodic background/text color changes.' },
        22: { description: 'Similar to insert 21 - Quad grid displaying font-styled Unicode glyphs with class names derived from codepoints and fonts for CSS targeting.' },
        24: { description: 'DeGenerator Legacy 1: Displays 1000 overlapping Symbols2 block characters (U+1FB00-1FBCA) with 8 child layers per container, creating a dense mosaic with color-changing intervals.' },
        25: {
            controls: {
                style: false,
                html: false,
                resize: false,
                moveUpDown: false
            },
            watermarks: {
                count: 1,
                zIndex: 10,
                positioning: 'top-left'
            },
            description: 'Rectangle Tiling: Randomly displays either glyph-based or line-based Mondrian-style recursive rectangle subdivision with OKLCH color harmonies. Uses randomized palette sizes (4-10 colors), subdivision depths (3-7 levels), and contrast ratios (2.0-7.0) for infinite variation. Glyph variant features geometric Unicode symbols with backflip dive animations. Line variant features flowing gradient patterns with controlled animation cycling. Click to regenerate with new random parameters.'
        },
        26: {
            controls: {
                style: false,
                html: false,
                resize: false,
                moveUpDown: false
            },
            watermarks: {
                count: 1,
                zIndex: 10,
                positioning: 'top-left'
            },
            description: 'Animated Bezier Curves: A grid-based SVG visualization featuring randomly generated cubic Bezier curves that draw and undraw in continuous cycles with configurable pause phases.<br><br>Each visualization displays 4-200 curves per cell alongside 1-5 pulsing Unicode glyphs from an extended symbol set including ancient scripts (Egyptian hieroglyphs, Phags-Pa, Tai Tham) and geometric forms. Nine distinct animation presets control curve behavior—from static drawings to morphing shapes that transform into entirely new curves during pause phases, with timing ranges from fast (1-8 seconds) to meditative (8-50 seconds).<br><br>The Shape Shifter and Slow Shifter presets feature dynamic curve morphing where paths regenerate at each cycle, creating an ever-evolving composition. Keyboard controls (0-9) allow direct preset selection or random mode, while an expandable info panel displays the active preset name, grid layout, curve/glyph counts, selected symbol, and HSL color palette with matching border accents. Grid layouts vary from minimal (1×1) to complex (5×6), with each regeneration selecting a new random configuration.'
        },
        27: {
            controls: {
                style: false,
                html: false,
                resize: false,
                moveUpDown: false
            },
            watermarks: {
                count: 1,
                zIndex: 10000,
                positioning: 'top-left'
            },
            description: 'Ghost Shapes: A multi-recipe CSS visualization system featuring 7 distinct layouts that combine Unicode glyphs with geometric composition using AutoFont and CSS shape-outside/clip-path techniques.<br><br>Press 0-6 to switch between recipes: (0) Two-panel grid with quarter-circle cutouts and center circle overlay, (1) Dual centered circles with 8-panel grid background, (2) Lissajous Stripes - animated parametric curves alternating with glyph stripes featuring floating circles, (3) Infinity sign with color-cycling gradient glow and two-panel background, (4) Quad circles layout with 16 mini-panels and 4 positioned circles, (5) Half circles positioned left & right wrapping primary-colored text, (6) Half circles positioned top & bottom.<br><br>Each recipe randomly selects colors and inverted/normal modes on load. Layouts feature complex CSS Grid/Flexbox arrangements with floating shapes that use shape-outside for text wrapping. Lissajous recipe animates parametric curves with coprime ratios for perfect standing patterns. Infinity recipe features continuous HSL hue cycling. All recipes generate thousands of Unicode glyphs using AutoFont with proper font stack fallbacks across diverse scripts.'
        },
        28: {
            controls: {
                style: false,
                html: false,
                resize: false,
                moveUpDown: false
            },
            watermarks: {
                count: 1,
                zIndex: 10,
                positioning: 'top-left'
            },
            description: 'DeGenerator 1 Complete - All 9 variants of the original DeGenerator1 with box mix, color mix, and splat variations'
        },
        29: {
            controls: {
                style: false,
                html: false,
                resize: false,
                moveUpDown: false
            },
            watermarks: {
                count: 1,
                zIndex: 10,
                positioning: 'top-left'
            },
            description: 'Lotus Mandala - Multi-Flavor Edition: Consolidates 6 lotus experiment variants with keyboard-selectable flavors. Press 0-5 to switch between: (0) Basic mandala with toroidal circles and 12 petals, (1) Enhanced with opposing rotation and random radial spokes, (2) Circle packing algorithm, (3) Circle packing with grid layout, (4) Non-overlapping circle packing, (5) Grid-based multi-mandala layout. Each flavor generates random OKLCH color palettes with rotating animations and geometric flower-of-life patterns.<br><br>URL parameter support: ?i=29&flavor=N to load specific flavor directly.'
        },
        30: {
            controls: {
                style: false,
                html: false,
                resize: false,
                moveUpDown: false
            },
            watermarks: {
                count: 1,
                zIndex: 10,
                positioning: 'top-left'
            },
            description: 'Plotly Charts - Multi-Flavor Edition: Five Plotly.js data visualization styles selectable via keys 0-4. (0) Stacked bar charts: random grid of normalized 100% stacked bars with shuffled color palettes. (1) Violin plots: grid of violin distributions with random spreads and palette-colored fills. (2) Polar scatter: WebGL-accelerated elliptical point clouds with random rotations and 10k-30k data points per cell. (3) Animated 3D scatter: 4x4 grid of rotating 3D point clouds cycling through 5 geometric patterns (cloud, spiral, sphere, clusters, wave) with 60-frame bounce animation. (4) Stacked area charts: spline-smoothed 100% stacked areas with random grid layouts and palette fills.'
        },
        31: {
            controls: {
                style: false,
                html: false,
                resize: false,
                moveUpDown: false
            },
            watermarks: {
                count: 1,
                zIndex: 10,
                positioning: 'top-left'
            },
            description: 'Fibonacci Spirals - Concentric Fibonacci grid with two character set variants. Press 1 for basic Latin (A-Z, a-z), press 2 for IPA Extensions + Extended Latin (dense, exotic characters). Each key press triggers a full re-render of the grid and character layer.'
        },
        32: {
            controls: {
                style: false,
                html: false,
                resize: false,
                moveUpDown: false
            },
            watermarks: {
                count: 1,
                zIndex: 10,
                positioning: 'top-left'
            },
            description: 'Mad Punctuation - Multi-Flavor: Two punctuation visualizations. (0) Animated: Color-cycling punctuation grid with 5x3 layout, press R to regenerate. (1) Static Grids: Random grid layouts with keys 1-5 for different looks.'
        },
        33: {
            controls: {
                style: false,
                html: false,
                resize: false,
                moveUpDown: false
            },
            watermarks: {
                count: 0,
                zIndex: 10,
                positioning: 'hidden'
            },
            description: 'T H E   G E N E R A T O R: Typography design tool. Generates random typographic renderings of technical commands (HTML, CSS, JS, SQL, Git, Unix, crypto hashes, ML/AI terms, corporate admonitions) using random Google Fonts with randomized webkit styling. Use the control panel (top-right) to change command type, font, style, border, background, and export as PNG. "man the_generator" opens the full documentation.'
        },
    }
};

/**
 * Get merged configuration for a specific insert index
 * @param {number} insertIndex - The insert array index
 * @returns {object} Merged configuration object
 */
function getInsertConfig(insertIndex) {
    const defaults = INSERT_CONFIG.defaults;
    const override = INSERT_CONFIG.inserts[insertIndex] || {};
    
    return {
        controls: {
            ...defaults.controls,
            ...(override.controls || {})
        },
        watermarks: {
            ...defaults.watermarks,
            ...(override.watermarks || {})
        },
        // Merge description, ensuring override takes precedence
        description: override.description || defaults.description
    };
}

/**
 * Check if a specific control is enabled for an insert
 * @param {number} insertIndex - The insert array index
 * @param {string} controlName - Name of control (style, html, resize, moveUpDown)
 * @returns {boolean}
 */
function isControlEnabled(insertIndex, controlName) {
    const config = getInsertConfig(insertIndex);
    return config.controls[controlName] === true;
}
