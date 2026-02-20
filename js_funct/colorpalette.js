/**
 * ColorPalette - OKLCH color generation with contrast control
 * Generates harmonious, accessible color palettes
 */
(function(global) {
    'use strict';
    
    // Fixed color palettes
    const FIXED_PALETTES = {
        black_lightgray: {
            name: 'Black & Light Gray',
            bodyBg: '#000000',
            bodyColor: 'darkgray',
            glyphColors: ['white', 'white', 'white', 'white'],
            footerColors: null,  // Use fixed colors
            footerUnicode: 'red',
            footerGlyphmatic: 'darkgray',
            tableBorder: '#110c11',
            titleBorder: 'rgba(0, 0, 0, 0.2)',
            rowBorder: 'red',
            useBoxMuller: false
        },
        brown: {
            name: 'Brown Earth',
            bodyBg: '#86796C',
            bodyColor: '#2a2520',
            glyphColors: ['linen', 'ivory', 'beige', 'blanchedalmond', '#D9D0C8', '#B3A291', '#4B3218', '#332211', '#26190C'],
            footerColors: ['linen', 'ivory', 'beige', 'blanchedalmond', '#D9D0C8', '#B3A291', '#4B3218', '#332211', '#26190C'],  // Random from these
            tableBorder: null,  // Random from footerColors
            titleBorder: '#86796C',
            rowBorder: null,  // Random from footerColors
            useBoxMuller: true
        },
        white_teal_red: {
            name: 'White with Teal & Red',
            bodyBg: '#ffffff',
            bodyColor: '#000000',
            // Box-Muller clusters around middle, so put common grays in middle, sporadic red/teal at edges
            // Darker grays for better contrast on white: #8A8A8A, #7A7A7A, #6A6A6A
            glyphColors: ['#CD5C5C', '#96cdcd', '#CD5C5C', '#96cdcd', '#7A7A7A', '#7A7A7A', '#6A6A6A', '#6A6A6A', '#96cdcd', '#CD5C5C', '#96cdcd', '#CD5C5C'],
            footerColors: ['#CD5C5C', '#96cdcd','#CD5C5C', '#96cdcd', '#7A7A7A', '#7A7A7A', '#6A6A6A', '#6A6A6A', '#96cdcd', '#CD5C5C', '#96cdcd', '#CD5C5C'],
            tableBorder: null,  // Random from footerColors
            titleBorder: 'white',
            rowBorder: null,  // Random from footerColors
            useBoxMuller: true
        },
        white_primary: {
            name: 'White & Primary Colors',
            bodyBg: '#ffffff',
            bodyColor: '#000000',
            // Classic primary colors - duplicates in array provide weighting (from auto3-font.htm)
            glyphColors: ['red', 'red', 'blue', 'green', 'orange', 'purple', 'gold', 'gold','blue'],
            footerColors: ['red', 'red', 'blue', 'green', 'orange', 'purple', 'gold', 'gold','blue'],
            tableBorder: null,  // Random from footerColors
            titleBorder: 'white',
            rowBorder: null,  // Random from footerColors
            useBoxMuller: false
        },
        silver_lightgray: {
            name: 'Silver & Light Gray',
            bodyBg: 'Gainsboro',
            bodyColor: 'DarkSlateGray',
            // Box-Muller clusters around middle, so put common silvers in middle, sporadic red/teal at edges
            glyphColors: ['darkpurple', 'darkblue', 'darkpurple', 'darkblue', 'DarkSlateGray', 'DarkSlateGray', 'DarkSlateGray', 'DarkSlateGray', 'darkblue', 'darkpurple', 'darkblue', 'darkpurple'],
            footerColors: ['darkpurple', 'darkblue', 'DarkSlateGray', 'DarkSlateGray', 'darkblue', 'DarkSlateGray', 'DarkSlateGray', 'DarkSlateGray', 'DarkSlateGray', 'DarkSlateGray', 'darkblue', 'darkpurple'],
            tableBorder: null,  // Random from footerColors
            titleBorder: 'Gainsboro',
            rowBorder: null,  // Random from footerColors
            useBoxMuller: true
        }
    };

    const ColorPalette = {
        currentPageBg: null,
        currentGridBg: null,
        currentGlyphColors: [],
        currentPalette: null,
        currentPaletteKey: null,  // Store the palette key for easy reference
        morphing: false,
        morphInterval: null,
        
        // Generate OKLCH color
        generateOKLCH: function(lightness, chroma, hue) {
            const l = lightness !== undefined ? lightness : 0.3 + Math.random() * 0.6;
            const c = chroma !== undefined ? chroma : Math.random() * 0.3;
            const h = hue !== undefined ? hue : Math.random() * 360;
            return `oklch(${l} ${c} ${h})`;
        },
        
        // Generate page background
        generatePageBackground: function() {
            return this.generateOKLCH();
        },
        
        // Generate grid background with low contrast to page
        generateGridBackground: function(pageColor) {
            const oklch = this.parseOKLCH(pageColor);
            if (!oklch) return this.generateOKLCH();
            
            const newL = oklch.l + (Math.random() - 0.5) * 0.2;
            const newC = oklch.c * 0.5;
            const newH = oklch.h + (Math.random() - 0.5) * 30;
            
            return this.generateOKLCH(
                Math.max(0, Math.min(1, newL)),
                Math.max(0, newC),
                newH
            );
        },
        
        // Parse OKLCH string to components
        parseOKLCH: function(oklchString) {
            const match = oklchString.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
            if (!match) return null;
            
            return {
                l: parseFloat(match[1]),
                c: parseFloat(match[2]),
                h: parseFloat(match[3])
            };
        },
        
        // Generate glyph palette with contrast constraints
        generateGlyphPalette: function(bgColor, count = 4, minContrast = 5, maxContrast = 6, maxAttempts = 500) {
            const palette = [];
            let attempts = 0;
            
            while (palette.length < count && attempts < maxAttempts) {
                const color = this.generateOKLCH();
                const contrast = this.getContrastRatio(color, bgColor);
                
                if (contrast >= minContrast && contrast <= maxContrast) {
                    palette.push(color);
                }
                attempts++;
            }
            
            // Fallback
            while (palette.length < count) {
                palette.push(this.generateOKLCH());
            }
            
            return palette;
        },
        
        // Get random color from palette
        randomGlyphColor: function() {
            if (this.currentGlyphColors.length === 0) return this.generateOKLCH();
            return this.currentGlyphColors[Math.floor(Math.random() * this.currentGlyphColors.length)];
        },
        
        // Initialize palette
        init: function(minContrast = 5, maxContrast = 6) {
            this.currentPageBg = this.generatePageBackground();
            this.currentGridBg = this.generateGridBackground(this.currentPageBg);
            this.currentGlyphColors = this.generateGlyphPalette(this.currentGridBg, 4, minContrast, maxContrast);
            
            console.log('Color palette initialized:', {
                page: this.currentPageBg,
                grid: this.currentGridBg,
                glyphs: this.currentGlyphColors
            });
            
            return {
                pageBg: this.currentPageBg,
                gridBg: this.currentGridBg,
                glyphColors: this.currentGlyphColors
            };
        },
        
        // Apply colors to elements
        apply: function(pageElement, gridElement) {
            if (pageElement) pageElement.style.backgroundColor = this.currentPageBg;
            if (gridElement) {
                gridElement.style.backgroundColor = this.currentGridBg;
                gridElement.style.borderColor = this.currentGridBg;
            }
        },
        
        // Morph to new palette smoothly
        morphPalette: function(pageElement, gridElement, cellElements, duration = 3000) {
            const newPageBg = this.generatePageBackground();
            const newGridBg = this.generateGridBackground(newPageBg);
            const newGlyphColors = this.generateGlyphPalette(newGridBg, 4);
            
            // Set transitions
            if (pageElement) pageElement.style.transition = `background-color ${duration}ms ease`;
            if (gridElement) gridElement.style.transition = `background-color ${duration}ms ease, border-color ${duration}ms ease`;
            if (cellElements) {
                cellElements.forEach(cell => {
                    cell.style.transition = `background-color ${duration}ms ease`;
                    const span = cell.querySelector('span');
                    if (span) span.style.transition = `color ${duration}ms ease`;
                });
            }
            
            // Apply new colors
            this.currentPageBg = newPageBg;
            this.currentGridBg = newGridBg;
            this.currentGlyphColors = newGlyphColors;
            
            if (pageElement) pageElement.style.backgroundColor = newPageBg;
            if (gridElement) {
                gridElement.style.backgroundColor = newGridBg;
                gridElement.style.borderColor = newGridBg;
            }
            if (cellElements) {
                cellElements.forEach(cell => {
                    cell.style.backgroundColor = newGridBg;
                    const span = cell.querySelector('span');
                    if (span) span.style.color = this.randomGlyphColor();
                });
            }
        },
        
        // Start continuous morphing
        startMorphing: function(pageElement, gridElement, cellSelector, minInterval = 10000, maxInterval = 40000) {
            if (this.morphing) return;
            
            this.morphing = true;
            
            const scheduleNextMorph = () => {
                const interval = minInterval + Math.random() * (maxInterval - minInterval);
                const duration = minInterval + Math.random() * (maxInterval - minInterval);
                this.morphInterval = setTimeout(() => {
                    if (!this.morphing) return;
                    
                    const cells = cellSelector ? document.querySelectorAll(cellSelector) : null;
                    this.morphPalette(pageElement, gridElement, cells, duration);
                    
                    scheduleNextMorph();
                }, interval);
            };
            
            scheduleNextMorph();
            console.log('Color morphing started');
        },
        
        // Stop morphing
        stopMorphing: function() {
            this.morphing = false;
            if (this.morphInterval) {
                clearTimeout(this.morphInterval);
                this.morphInterval = null;
            }
            console.log('Color morphing stopped');
        },
        
        // Get contrast ratio (requires contrast_tester.js)
        getContrastRatio: function(color1, color2) {
            if (typeof getContrastRatio === 'function') {
                return getContrastRatio(color1, color2);
            }
            console.warn('getContrastRatio not found, returning default');
            return 5;
        },

        // =========================================================
        // TWO WAYS TO USE ColorPalette — READ BEFORE USING
        // =========================================================
        //
        // PATH A — OKLCH GENERATIVE (truly random, infinite variety)
        //   Use this when you want a fresh, unpredictable palette each time.
        //   Does NOT use FIXED_PALETTES at all.
        //
        //   ColorPalette.init();                   // generates bg + glyph colors
        //   document.body.style.backgroundColor = ColorPalette.currentPageBg;
        //   const color = ColorPalette.randomGlyphColor();
        //
        //   To refresh mid-session:
        //   ColorPalette.init();                   // regenerates everything
        //
        // PATH B — FIXED PALETTES (5 curated hand-crafted schemes)
        //   Use this when you want one of the named palettes:
        //   black_lightgray, brown, white_teal_red, white_primary, silver_lightgray.
        //   This is what insert23 (Macroglyph) uses. Do NOT use this path
        //   when the goal is "random palette each time" — you only get 5 options.
        //
        //   ColorPalette.selectRandomPalette();    // picks one of the 5
        //   const color = ColorPalette.randomPaletteGlyphColor();
        //   ColorPalette.applyFixedPalette(body, table, footer1, footer2, borderRow);
        //
        // =========================================================

        // === Fixed Palette Methods ===

        // Select a random fixed palette
        selectRandomPalette: function() {
            const paletteKeys = Object.keys(FIXED_PALETTES);
            const randomKey = paletteKeys[Math.floor(Math.random() * paletteKeys.length)];
            this.currentPaletteKey = randomKey;  // Store the key
            this.currentPalette = FIXED_PALETTES[randomKey];
            console.log('Selected palette:', this.currentPalette.name, `(${randomKey})`);
            return this.currentPalette;
        },

        // Get random glyph color from current palette (using Box-Muller if specified)
        randomPaletteGlyphColor: function() {
            if (!this.currentPalette || !this.currentPalette.glyphColors) {
                return '#000000';
            }

            const colors = this.currentPalette.glyphColors;
            let index;

            if (this.currentPalette.useBoxMuller && typeof randn_bm === 'function') {
                // Use Box-Muller for sporadic/natural distribution
                index = Math.floor(randn_bm() * colors.length);
            } else {
                // Use uniform random distribution
                index = Math.floor(Math.random() * colors.length);
            }

            return colors[index];
        },

        // Get random color from footer palette using Box-Muller if specified
        _getRandomFooterColor: function() {
            if (!this.currentPalette || !this.currentPalette.footerColors) {
                return null;
            }

            const colors = this.currentPalette.footerColors;
            let index;

            if (this.currentPalette.useBoxMuller && typeof randn_bm === 'function') {
                // Use Box-Muller for sporadic/natural distribution
                index = Math.floor(randn_bm() * colors.length);
            } else {
                // Use uniform random distribution
                index = Math.floor(Math.random() * colors.length);
            }

            return colors[index];
        },

        // Apply title border color dynamically via CSS
        _applyTitleBorder: function(titleBorderColor) {
            // Find or create style element for title borders
            let styleEl = document.getElementById('palette-title-border');
            if (!styleEl) {
                styleEl = document.createElement('style');
                styleEl.id = 'palette-title-border';
                document.head.appendChild(styleEl);
            }
            styleEl.textContent = `[title] { border-bottom-color: ${titleBorderColor} !important; }`;
        },

        // Apply fixed palette to page elements
        applyFixedPalette: function(bodyElement, tableElement, footerUnicodeElement, footerGlyphmatiElement, rowBorderElement) {
            if (!this.currentPalette) {
                console.warn('No palette selected, selecting random palette');
                this.selectRandomPalette();
            }

            const p = this.currentPalette;

            // Apply body styles
            if (bodyElement) {
                bodyElement.style.backgroundColor = p.bodyBg;
                bodyElement.style.color = p.bodyColor;
            }

            // Apply table border (random or fixed)
            if (tableElement) {
                const borderColor = p.tableBorder || this._getRandomFooterColor();
                tableElement.style.borderBottomColor = borderColor;
            }

            // Apply footer colors (random or fixed)
            if (footerUnicodeElement) {
                const color = p.footerColors ? this._getRandomFooterColor() : p.footerUnicode;
                footerUnicodeElement.style.color = color;
            }
            if (footerGlyphmatiElement) {
                const color = p.footerColors ? this._getRandomFooterColor() : p.footerGlyphmatic;
                footerGlyphmatiElement.style.color = color;
            }

            // Apply row border color if element provided
            if (rowBorderElement) {
                const borderColor = p.rowBorder || this._getRandomFooterColor();
                // Apply to TD elements inside the TR (since CSS rule targets tr.border_bottom td)
                const tds = rowBorderElement.querySelectorAll('td');
                tds.forEach(td => {
                    td.style.borderBottomColor = borderColor;
                });
            }

            // Apply title border color
            if (p.titleBorder) {
                this._applyTitleBorder(p.titleBorder);
            }

            console.log('Applied fixed palette:', p.name);
        }
    };

    // Export
    global.ColorPalette = ColorPalette;
    console.log('ColorPalette loaded');
    
})(window);