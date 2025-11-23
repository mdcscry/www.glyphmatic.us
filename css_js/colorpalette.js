/**
 * ColorPalette - OKLCH color generation with contrast control
 * Generates harmonious, accessible color palettes
 */
(function(global) {
    'use strict';
    
    const ColorPalette = {
        currentPageBg: null,
        currentGridBg: null,
        currentGlyphColors: [],
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
        }
    };
    
    // Export
    global.ColorPalette = ColorPalette;
    console.log('ColorPalette loaded');
    
})(window);