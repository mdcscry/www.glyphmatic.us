/**
 * AutoFont - Modular Unicode font management system
 * Handles dynamic font loading and intelligent fallback chains
 */
(function(global) {
    'use strict';
    
    const AutoFont = {
        // Font style sheets
        importSheet: null,
        familySheet: null,
        faceSheet: null,
        
        // Initialize style sheets
        init: function() {
            if (this.importSheet) return Promise.resolve(); // Already initialized
            
            const createSheet = () => {
                if (!document.head) {
                    console.error('document.head does not exist!');
                    return null;
                }
                const style = document.createElement('style');
                document.head.appendChild(style);
                return style.sheet; 
            };
            
            AutoFont.importSheet = createSheet();
            AutoFont.familySheet = createSheet();
            AutoFont.faceSheet = createSheet();
            
            // Wait for browser to process style sheets
            return new Promise(resolve => {
                requestAnimationFrame(() => {
                    console.log('Sheets ready:', AutoFont.importSheet, AutoFont.familySheet, AutoFont.faceSheet);
                    resolve();
                });
            });
        },
        
        // Attach Google Font
        attachGoogleFont: function(font) {
            console.log('we are in attachGooglefont')
            const fontFormatted = font.replace(/ /g, '+');
            const rule = `@import url(https://fonts.googleapis.com/css?family=${fontFormatted});`;
            console.log('Loading Google Font:', font, '→', rule);
            AutoFont.importSheet.insertRule(rule, AutoFont.importSheet.cssRules.length);
        },
        
        // Attach local font
        attachLocalFont: function(font, directory = 'tff') {
                // console.log('attachLocalFont called');
                // console.log('this:', this);
                // console.log('this.faceSheet:', this.faceSheet);
                // console.log('AutoFont.faceSheet:', AutoFont.faceSheet);

            const fontFormatted = font.replace(/ /g, '');
            let filename;
            
            if (directory === 'otf') {
                filename = `${fontFormatted}-Regular.otf`;
            } else if (directory === 'tff') {
                filename = `${fontFormatted}-Regular.ttf`;
            } else {
                filename = `${fontFormatted}.ttf`;
            }
            
            const rule = `@font-face {
                font-family: "${font}";
                src: url('../${directory}/${filename}');
            }`;
            
            AutoFont.faceSheet.insertRule(rule, AutoFont.faceSheet.cssRules.length);
        },
        
        // Get random element from array
        randomFrom: function(array) {
            return array[Math.floor(Math.random() * array.length)];
        },
        
        // Get random index from block array
        randomIndexFrom: function(blockArray) {
            return Math.floor(Math.random() * blockArray.length);
        },
        
        // Select font for block with intelligent fallbacks
        selectFont: function(block, blockLang, langFont) {
            const fontArray = blockLang[block];
            if (!fontArray || fontArray.length === 0) {
                return 'Noto Sans Full-google';
            }
            
            const fontLookup = this.randomFrom(fontArray);
            const fonts = langFont[fontLookup];
            
            return fonts ? this.randomFrom(fonts) : 'Noto Sans Full-google';
        },
        
        // Build font stack with intelligent fallbacks
        buildFontStack: function(fontDuJour) {
            const fontFamily = fontDuJour.split('-')[0];
            const genericFallback = fontFamily.includes('Serif') ? 'serif' : 'sans-serif';
            
            // Symbol/special fonts get comprehensive fallback
            const symbolFonts = [
                'Noto Sans Symbols', 'Noto Sans Symbols 2', 'BabelStone Pseudographica',
                'Quivira', 'Everson Mono', 'DejaVu', 'Segoe', 'Code2000',
                'Fluent', 'Open Moji', 'Alphabetum'
            ];
            
            if (symbolFonts.some(sf => fontFamily.includes(sf))) {
                return `'${fontFamily}','Noto Emoji','Symbola','Noto Sans Symbols 2',${genericFallback}`;
            }
            
            if (fontFamily.includes('Symbola')) {
                return `'${fontFamily}','Noto Sans Symbols','Noto Sans Symbols 2','Noto Emoji','Noto Sans Math',${genericFallback}`;
            }
            
            return `'${fontFamily}','Noto Sans Full',${genericFallback}`;
        },
        
        // Load font and return font stack
        loadFont: function(fontDuJour) {
            const parts = fontDuJour.split('-');
            const fontName = parts[0];
            const fontType = parts[1];
            const directory = parts[2] || 'tff';
            
            if (fontType === 'local') {
                AutoFont.attachLocalFont(fontName, directory);
            } else {
                AutoFont.attachGoogleFont(fontName);
            }
            
            return AutoFont.buildFontStack(fontDuJour);
        },
        
        // Generate complete glyph data
        generateGlyph: function(blockHex, blockHexDesc, blockLang, langFont, testMode = false, testConfig = {}) {
            let block, glyphVal, glyph;
            
            if (testMode) {
                const blocks = Array.isArray(testConfig.blocks) ? testConfig.blocks : [testConfig.block];
                block = this.randomFrom(blocks);
                
                if (testConfig.glyph) {
                    glyph = testConfig.glyph;
                    glyphVal = blockHex[block].indexOf(glyph);
                    if (glyphVal === -1) {
                        console.error('Test glyph not found in block!');
                        glyphVal = this.randomIndexFrom(blockHex[block]);
                        glyph = blockHex[block][glyphVal];
                    }
                } else {
                    glyphVal = this.randomIndexFrom(blockHex[block]);
                    glyph = blockHex[block][glyphVal];
                }
            } else {
                const blocks = Object.keys(blockHex);
                block = this.randomFrom(blocks);
                glyphVal = this.randomIndexFrom(blockHex[block]);
                glyph = blockHex[block][glyphVal];
            }
            
            const glyphDesc = blockHexDesc[block][glyphVal].replace(/ /g, '_');
            const fontDuJour = this.selectFont(block, blockLang, langFont);
            const fontStack = this.loadFont(fontDuJour);
            console.log('Generated fontStack:', fontStack);
            return {
                glyph: glyph,
                desc: glyphDesc,
                block: block,
                fontStack: fontStack
            };
        }
    };
    
    // Bind all methods to preserve 'this' context
    Object.keys(AutoFont).forEach(key => {
        if (typeof AutoFont[key] === 'function') {
            AutoFont[key] = AutoFont[key].bind(AutoFont);
        }
    });

    // Auto-initialize on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => AutoFont.init());
    } else {
        AutoFont.init();
    }

    // Export
    global.AutoFont = AutoFont;
    console.log('AutoFont engine loaded');
    
})(window);