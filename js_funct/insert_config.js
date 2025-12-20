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
        26: { description: 'A high-performance grid of box-drawing characters with a 3-color palette that refreshes periodically.' },
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
        15: { description: 'Braided marquee featuring scrolling horizontal and vertical strips in a grid pattern using z-index weaving and OKLCH color harmony schemes.' },
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
