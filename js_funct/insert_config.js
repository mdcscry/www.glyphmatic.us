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
        }
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
                positioning: 'scattered'
            }
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
                html: true,       // △HTML button
                resize: true,     // +/- Size buttons
                moveUpDown: false // Move up/down (currently disabled globally)
            },
            watermarks: {
                count: 0,
                zIndex: -1,
                positioning: 'hidden'
            }
        }        
        // Add more insert-specific configs as needed
        // Example for disabling controls on a specific insert:
        // 16: {
        //     controls: {
        //         style: false,
        //         resize: false
        //     }
        // }
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
        }
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
