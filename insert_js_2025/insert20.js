// Spinning Spirals Insert
divCounter = Math.round(Math.random() * 20 + 5);

var scriptCSS = document.createElement('script');
scriptCSS.src = "./css_js/whirldsymbols.js";
document.getElementsByTagName('body')[0].appendChild(scriptCSS);

function jsWait() {
    if (typeof myFontSet == "undefined") {
        window.setTimeout(jsWait, 100);
    } else {
        initGrid();
    }
}

function initGrid() {
    // Grid options
    gridOptions = [ [1, 1], [1, 2], [2, 1], [2, 2], [2, 4], [4, 2], [3, 3], [4, 4], [5, 5], [5, 5]
               ,[5, 5], [10, 10], [10, 10], [10, 10], [20, 20], [20, 10],[1, 1] ];
    
    const [rows, cols] = gridOptions[Math.floor(Math.random() * gridOptions.length)];
    
    // Pick one spiral glyph for entire rendering
    const spiralIndices = [73,159,226,186,228]; // Cham spiral, Cyclone, Armenian Eternity, Permanent paper infinity
    const selectedIndex = spiralIndices[Math.floor(Math.random() * spiralIndices.length)];
    const glyphCode = parseInt(myFontSet[selectedIndex][0].replace('x', ''), 16);
    
    // Armenian Eternity (186) spins counterclockwise, all others clockwise
    const animationName = selectedIndex === 186 ? 'spinCCW' : 'spinCW';
    
    // Pick one random font from that glyph's font set
    const fontSet = myFontSet[selectedIndex].slice(1);
    const selectedFont = fontSet[Math.floor(Math.random() * fontSet.length)];
    
    // Generate OKLCH color palette
    function generateOklchPalette(colNum) {
        const mycolors = [];
        const baseHue = Math.floor(Math.random() * 360);
        const baseChroma = 0.15 + Math.random() * 0.15;
        
        for (let i = 0; i < colNum; i++) {
            const lightness = Math.floor(Math.random() * 90) + 10;
            const opacity = Math.random() * 0.3 + 0.6;
            const color = `oklch(${lightness}% ${baseChroma.toFixed(2)} ${baseHue} / ${opacity.toFixed(2)})`;
            mycolors.push(color);
        }
        
        return mycolors;
    }
    
    const colors = generateOklchPalette(20);
    const backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    const gridLineColor = backgroundColor;
    
    // Random spin duration
    const spinDuration = Math.floor(Math.random() * 3) + 3; // 3-5 seconds
    
    // Ensure spiral color has enough contrast with background
    let spiralColor;
    const bgLightness = parseInt(backgroundColor.match(/oklch\((\d+)%/)[1]);
    
    // Pick a color with sufficient lightness difference
    do {
        spiralColor = colors[Math.floor(Math.random() * colors.length)];
        const spiralLightness = parseInt(spiralColor.match(/oklch\((\d+)%/)[1]);
        if (Math.abs(bgLightness - spiralLightness) > 30) break;
    } while (true);
    
    // Random 3D effects (uniform for all spirals)
    const strokeWidth = Math.floor(Math.random() * 5) + 6;
    const strokeColor = colors[Math.floor(Math.random() * colors.length)];
    const shadowOffsetX = Math.floor(Math.random() * 3+2) - 2;
    const shadowOffsetY = Math.floor(Math.random() * 3+2) - 2;
    const shadowBlur = Math.floor(Math.random() * 2) + 1;
    const shadowColor = colors[Math.floor(Math.random() * colors.length)];
    const textShadow = `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${shadowColor}, ${shadowOffsetX*2}px ${shadowOffsetY*2}px ${shadowBlur*2}px ${shadowColor}`;
    
    // Set body styles
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    document.body.style.backgroundColor = backgroundColor;
    
    // Create background grid (static colored boxes)
    const backgroundGrid = document.createElement('div');
    backgroundGrid.style.position = 'fixed';
    backgroundGrid.style.top = '0';
    backgroundGrid.style.left = '0';
    backgroundGrid.style.width = '100vw';
    backgroundGrid.style.height = '100vh';
    backgroundGrid.style.display = 'grid';
    backgroundGrid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    backgroundGrid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    backgroundGrid.style.gap = '3px';
    backgroundGrid.style.zIndex = '0';
    document.body.appendChild(backgroundGrid);
    
    // Create foreground grid (spinning glyphs)
    const foregroundGrid = document.createElement('div');
    foregroundGrid.style.position = 'fixed';
    foregroundGrid.style.top = '0';
    foregroundGrid.style.left = '0';
    foregroundGrid.style.width = '100vw';
    foregroundGrid.style.height = '100vh';
    foregroundGrid.style.display = 'grid';
    foregroundGrid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    foregroundGrid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    foregroundGrid.style.gap = '3px';
    foregroundGrid.style.zIndex = '1';
    foregroundGrid.style.pointerEvents = 'none';
    document.body.appendChild(foregroundGrid);
    
    // Create grid cells
    for (let i = 0; i < rows * cols; i++) {
        // Background cell (static colored box)
        const bgCell = document.createElement('div');
        bgCell.style.backgroundColor = gridLineColor;
        bgCell.style.borderRadius = '8px';
        bgCell.style.animation = 'none';
        backgroundGrid.appendChild(bgCell);
        
        // Foreground cell (spinning glyph)
        const fgCell = document.createElement('div');
        fgCell.innerHTML = '&#' + glyphCode + ';';
        fgCell.style.display = 'flex';
        fgCell.style.alignItems = 'center';
        fgCell.style.justifyContent = 'center';
        fgCell.style.backgroundColor = 'transparent';
        fgCell.style.color = spiralColor;
        fgCell.style.fontSize = `${Math.min(80 / rows, 80 / cols)}vmin`;
        fgCell.style.fontFamily = selectedFont;
        fgCell.style.lineHeight = '1';
        fgCell.style.webkitTextFillColor = spiralColor;     
        fgCell.style.webkitTextStroke = `${strokeWidth}px ${strokeColor}`;
        fgCell.style.textShadow = textShadow;
        fgCell.style.animation = `${animationName} ${spinDuration}s linear infinite`;
        
        foregroundGrid.appendChild(fgCell);
    }

    // Add rotation animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spinCW {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
        }
        @keyframes spinCCW {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

jsWait();