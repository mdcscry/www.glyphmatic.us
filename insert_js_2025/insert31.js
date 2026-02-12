/**
 * insert31.js - Fibonacci Spirals
 * 
 * Randomly chooses between two variants on each page load:
 * - Variant 1: Basic Latin, normal weight, simpler center
 * - Variant 2: IPA + Extended Latin, bold, complex center
 * 
 * Uses AutoFont system to properly select glyphs and fonts from Unicode blocks
 */

(function() {
  'use strict';

  let container = null;
  let variant = Math.floor(Math.random() * 3) + 1; // Random choice on load (1, 2, or 3)

  // Palettes for variant 3: [glyphColor1, glyphColor2, lineColor1, lineColor2]
  const PALETTES_V3 = [
    ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3'],
    ['#00d2d3', '#ff9f43', '#a29bfe', '#55efc4'],
    ['#e056fd', '#badc58', '#fdcb6e', '#00cec9'],
    ['#6c5ce7', '#fd79a8', '#00b894', '#fdcb6e'],
    ['#2ed573', '#1e90ff', '#ff4757', '#eccc68'],
    ['#a29bfe', '#fd79a8', '#55efc4', '#ff7675'],
    ['#ffeaa7', '#dfe6e9', '#74b9ff', '#fd79a8'],
    ['#00cec9', '#e17055', '#0984e3', '#6c5ce7'],
  ];
  let currentPalette = PALETTES_V3[Math.floor(Math.random() * PALETTES_V3.length)];

  // Block arrays for each variant
  const variantBlocks = {
    1: ["Basic Latin"],
    2: [
      "IPA Extensions",
      "Phonetic Extensions",
      "Phonetic Extensions Supplement",
      "Basic Latin",
      "Latin-1 Supplement",
      "Latin Extended-A",
      "Latin Extended-B",
      "Latin Extended Additional",
      "Latin Extended-C",
      "Latin Extended-D",
      "Latin Extended-E"
    ],
    3: [
      "Basic Latin",
      "Latin-1 Supplement",
      "Latin Extended-A",
      "General Punctuation",
      "Letterlike Symbols",
      "Mathematical Operators"
    ]
  };

  // Load required scripts
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.type = 'text/javascript';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Load all required dependencies
  async function loadDependencies() {
    try {
      // Load core libraries
      await loadScript('../js_funct/autoFont.js');
      
      // Load data files
      await loadScript('../js_glyph/2025_block_17/block_hex_17.js');
      await loadScript('../js_glyph/2025_block_17/block_hex_desc_17.js');
      await loadScript('../js_glyph/2025_block_17/block_lang_skeleton_17.js');

      console.log('[insert31] All dependencies loaded');
    } catch (error) {
      console.error('[insert31] Error loading dependencies:', error);
    }
  }

  // Wait for dependencies
  function waitForDependencies() {
    const ready = typeof blockHexWait !== "undefined" &&
                  typeof blockHexDescWait !== "undefined" &&
                  typeof blockHexSkeletonWait !== "undefined" &&
                  typeof AutoFont !== "undefined";

    if (ready) {
      console.log('[insert31] Dependencies ready, initializing AutoFont...');
      initAutoFont();
    } else {
      setTimeout(waitForDependencies, 100);
    }
  }

  async function initAutoFont() {
    await AutoFont.init();
    console.log('[insert31] AutoFont initialized');
    init();
  }

  function getFibonacci(max) {
    const fibs = [1, 1];
    while (fibs[fibs.length - 1] + fibs[fibs.length - 2] <= max) {
      fibs.push(fibs[fibs.length - 1] + fibs[fibs.length - 2]);
    }
    return fibs;
  }

  function render() {
    container.innerHTML = '';

    const width = window.innerWidth;
    const height = window.innerHeight;
    const maxVal = Math.max(width, height) * 2;
    const fibs = getFibonacci(maxVal);
    const diagLength = Math.sqrt(width * width + height * height) * 1.5;

    // === GRID LINES ===
    // For variant 3, use palette line colors instead of CSS classes
    const lineColor1 = variant === 3 ? currentPalette[2] : null;
    const lineColor2 = variant === 3 ? currentPalette[3] : null;
    function applyLineColor(el, cssClass) {
      el.className = `line-v line-h line-d ${cssClass}`.trim();
      if (variant === 3) {
        el.style.background = cssClass === 'red' ? lineColor1 : lineColor2;
      }
    }

    // Vertical lines - left to right
    fibs.forEach(f => {
      const x = (f / maxVal) * width;
      if (x < width) {
        const line = document.createElement('div');
        line.className = 'line-v red';
        if (variant === 3) line.style.background = lineColor1;
        line.style.position = 'absolute';
        line.style.top = '0';
        line.style.height = '100vh';
        line.style.width = '1px';
        line.style.opacity = '0.7';
        line.style.left = `${x}px`;
        container.appendChild(line);
      }
    });
    
    // Vertical lines - right to left (red, mirrored)
    fibs.forEach(f => {
      const x = width - (f / maxVal) * width;
      if (x > 0) {
        const line = document.createElement('div');
        line.className = 'line-v red';
        if (variant === 3) line.style.background = lineColor1;
        line.style.position = 'absolute';
        line.style.top = '0';
        line.style.height = '100vh';
        line.style.width = '1px';
        line.style.opacity = '0.7';
        line.style.left = `${x}px`;
        container.appendChild(line);
      }
    });
    
    // Horizontal lines - from top (orange)
    fibs.forEach(f => {
      const y = (f / maxVal) * height;
      if (y < height) {
        const line = document.createElement('div');
        line.className = 'line-h orange';
        if (variant === 3) line.style.background = lineColor2;
        line.style.position = 'absolute';
        line.style.left = '0';
        line.style.width = '100vw';
        line.style.height = '1px';
        line.style.opacity = '0.7';
        line.style.top = `${y}px`;
        container.appendChild(line);
      }
    });
    
    // Horizontal lines - from bottom (orange, mirrored)
    fibs.forEach(f => {
      const y = height - (f / maxVal) * height;
      if (y > 0) {
        const line = document.createElement('div');
        line.className = 'line-h orange';
        if (variant === 3) line.style.background = lineColor2;
        line.style.position = 'absolute';
        line.style.left = '0';
        line.style.width = '100vw';
        line.style.height = '1px';
        line.style.opacity = '0.7';
        line.style.top = `${y}px`;
        container.appendChild(line);
      }
    });
    
    // 45° diagonals (red) - from left edge
    fibs.forEach(f => {
      const pos = (f / maxVal) * height;
      if (pos < height) {
        const line = document.createElement('div');
        line.className = 'line-d red';
        if (variant === 3) line.style.background = lineColor1;
        line.style.width = '1px';
        line.style.height = `${diagLength}px`;
        line.style.left = '0px';
        line.style.top = `${pos}px`;
        line.style.transformOrigin = 'top left';
        line.style.transform = 'rotate(45deg)';
        container.appendChild(line);
      }
    });
    
    // From top edge
    fibs.forEach(f => {
      const pos = (f / maxVal) * width;
      if (pos < width && pos > 0) {
        const line = document.createElement('div');
        line.className = 'line-d red';
        if (variant === 3) line.style.background = lineColor1;
        line.style.width = '1px';
        line.style.height = `${diagLength}px`;
        line.style.left = `${pos}px`;
        line.style.top = '0px';
        line.style.transformOrigin = 'top left';
        line.style.transform = 'rotate(45deg)';
        container.appendChild(line);
      }
    });
    
    // Mirror: from right edge
    fibs.forEach(f => {
      const pos = (f / maxVal) * height;
      if (pos < height) {
        const line = document.createElement('div');
        line.className = 'line-d red';
        if (variant === 3) line.style.background = lineColor1;
        line.style.width = '1px';
        line.style.height = `${diagLength}px`;
        line.style.left = `${width}px`;
        line.style.top = `${height - pos}px`;
        line.style.transformOrigin = 'top left';
        line.style.transform = 'rotate(-135deg)';
        container.appendChild(line);
      }
    });
    
    // Mirror: from bottom edge
    fibs.forEach(f => {
      const pos = (f / maxVal) * width;
      if (pos < width && pos > 0) {
        const line = document.createElement('div');
        line.className = 'line-d red';
        if (variant === 3) line.style.background = lineColor1;
        line.style.width = '1px';
        line.style.height = `${diagLength}px`;
        line.style.left = `${width - pos}px`;
        line.style.top = `${height}px`;
        line.style.transformOrigin = 'top left';
        line.style.transform = 'rotate(-135deg)';
        container.appendChild(line);
      }
    });
    
    // -45° diagonals (orange) - from right edge
    fibs.forEach(f => {
      const pos = (f / maxVal) * height;
      if (pos < height) {
        const line = document.createElement('div');
        line.className = 'line-d orange';
        if (variant === 3) line.style.background = lineColor2;
        line.style.width = '1px';
        line.style.height = `${diagLength}px`;
        line.style.left = `${width}px`;
        line.style.top = `${pos}px`;
        line.style.transformOrigin = 'top left';
        line.style.transform = 'rotate(135deg)';
        container.appendChild(line);
      }
    });
    
    // From top edge
    fibs.forEach(f => {
      const pos = (f / maxVal) * width;
      if (pos < width && pos > 0) {
        const line = document.createElement('div');
        line.className = 'line-d orange';
        if (variant === 3) line.style.background = lineColor2;
        line.style.width = '1px';
        line.style.height = `${diagLength}px`;
        line.style.left = `${width - pos}px`;
        line.style.top = '0px';
        line.style.transformOrigin = 'top left';
        line.style.transform = 'rotate(135deg)';
        container.appendChild(line);
      }
    });
    
    // Mirror: from left edge
    fibs.forEach(f => {
      const pos = (f / maxVal) * height;
      if (pos < height) {
        const line = document.createElement('div');
        line.className = 'line-d orange';
        if (variant === 3) line.style.background = lineColor2;
        line.style.width = '1px';
        line.style.height = `${diagLength}px`;
        line.style.left = '0px';
        line.style.top = `${height - pos}px`;
        line.style.transformOrigin = 'top left';
        line.style.transform = 'rotate(-45deg)';
        container.appendChild(line);
      }
    });
    
    // Mirror: from bottom edge
    fibs.forEach(f => {
      const pos = (f / maxVal) * width;
      if (pos < width && pos > 0) {
        const line = document.createElement('div');
        line.className = 'line-d orange';
        if (variant === 3) line.style.background = lineColor2;
        line.style.width = '1px';
        line.style.height = `${diagLength}px`;
        line.style.left = `${pos}px`;
        line.style.top = `${height}px`;
        line.style.transformOrigin = 'top left';
        line.style.transform = 'rotate(-45deg)';
        container.appendChild(line);
      }
    });

    // === CHARACTER FILLING ===
    
    const fibPositionsX = fibs.map(f => (f / maxVal) * width);
    const fibPositionsY = fibs.map(f => (f / maxVal) * height);
    const fibPositionsXRight = fibs.map(f => width - (f / maxVal) * width);
    const fibPositionsYBottom = fibs.map(f => height - (f / maxVal) * height);
    
    const allX = [...fibPositionsX, ...fibPositionsXRight].sort((a, b) => a - b);
    const allY = [...fibPositionsY, ...fibPositionsYBottom].sort((a, b) => a - b);
    
    const centerX = width / 2;
    const centerY = height / 2;
    
    let leftOfCenter, rightOfCenter;
    for (let i = 0; i < allX.length - 1; i++) {
      if (allX[i] < centerX && allX[i + 1] > centerX) {
        leftOfCenter = allX[i];
        rightOfCenter = allX[i + 1];
        break;
      }
    }
    
    let topOfCenter, bottomOfCenter;
    for (let i = 0; i < allY.length - 1; i++) {
      if (allY[i] < centerY && allY[i + 1] > centerY) {
        topOfCenter = allY[i];
        bottomOfCenter = allY[i + 1];
        break;
      }
    }
    
    let farLeft, farRight, farTop, farBottom;
    for (let i = 0; i < allX.length - 1; i++) {
      if (allX[i] < leftOfCenter && allX[i + 1] >= leftOfCenter) {
        farLeft = allX[i];
      }
      if (allX[i] <= rightOfCenter && allX[i + 1] > rightOfCenter) {
        farRight = allX[i + 1];
      }
    }
    for (let i = 0; i < allY.length - 1; i++) {
      if (allY[i] < topOfCenter && allY[i + 1] >= topOfCenter) {
        farTop = allY[i];
      }
      if (allY[i] <= bottomOfCenter && allY[i + 1] > bottomOfCenter) {
        farBottom = allY[i + 1];
      }
    }
    
    // Central squares (different for v1 and v2)
    let squares;
    if (variant === 1) {
      // v1: 4 squares, all RED
      squares = [
        { x1: farLeft, y1: farTop, x2: leftOfCenter, y2: topOfCenter, color: '#d03020' },
        { x1: rightOfCenter, y1: farTop, x2: farRight, y2: topOfCenter, color: '#d03020' },
        { x1: farLeft, y1: bottomOfCenter, x2: leftOfCenter, y2: farBottom, color: '#d03020' },
        { x1: rightOfCenter, y1: bottomOfCenter, x2: farRight, y2: farBottom, color: '#d03020' }
      ];
    } else {
      // v2: 9 squares (4 corners ORANGE, 4 cross RED, 1 center ORANGE)
      squares = [
        { x1: farLeft, y1: farTop, x2: leftOfCenter, y2: topOfCenter, color: '#e08020' },
        { x1: rightOfCenter, y1: farTop, x2: farRight, y2: topOfCenter, color: '#e08020' },
        { x1: farLeft, y1: bottomOfCenter, x2: leftOfCenter, y2: farBottom, color: '#e08020' },
        { x1: rightOfCenter, y1: bottomOfCenter, x2: farRight, y2: farBottom, color: '#e08020' },
        { x1: leftOfCenter, y1: farTop, x2: rightOfCenter, y2: topOfCenter, color: '#d03020' },
        { x1: leftOfCenter, y1: bottomOfCenter, x2: rightOfCenter, y2: farBottom, color: '#d03020' },
        { x1: farLeft, y1: topOfCenter, x2: leftOfCenter, y2: bottomOfCenter, color: '#d03020' },
        { x1: rightOfCenter, y1: topOfCenter, x2: farRight, y2: bottomOfCenter, color: '#d03020' },
        { x1: leftOfCenter, y1: topOfCenter, x2: rightOfCenter, y2: bottomOfCenter, color: '#e08020' }
      ];
    }
    
    // Find outer ring boundaries
    let farFarLeft, farFarRight, farFarTop, farFarBottom;
    for (let i = 0; i < allX.length - 1; i++) {
      if (allX[i] < farLeft && allX[i + 1] >= farLeft) farFarLeft = allX[i];
      if (allX[i] <= farRight && allX[i + 1] > farRight) farFarRight = allX[i + 1];
    }
    for (let i = 0; i < allY.length - 1; i++) {
      if (allY[i] < farTop && allY[i + 1] >= farTop) farFarTop = allY[i];
      if (allY[i] <= farBottom && allY[i + 1] > farBottom) farFarBottom = allY[i + 1];
    }
    
    // Ring 1 (color differs by variant)
    const ring1Color = variant === 3 ? currentPalette[0] : variant === 1 ? '#e08020' : '#d03020';
    const ring1 = [
      { x1: farFarLeft, y1: farFarTop, x2: farLeft, y2: farTop },
      { x1: farLeft, y1: farFarTop, x2: farRight, y2: farTop },
      { x1: farRight, y1: farFarTop, x2: farFarRight, y2: farTop },
      { x1: farFarLeft, y1: farTop, x2: farLeft, y2: topOfCenter },
      { x1: farRight, y1: farTop, x2: farFarRight, y2: topOfCenter },
      { x1: farFarLeft, y1: topOfCenter, x2: farLeft, y2: bottomOfCenter },
      { x1: farRight, y1: topOfCenter, x2: farFarRight, y2: bottomOfCenter },
      { x1: farFarLeft, y1: bottomOfCenter, x2: farLeft, y2: farBottom },
      { x1: farRight, y1: bottomOfCenter, x2: farFarRight, y2: farBottom },
      { x1: farFarLeft, y1: farBottom, x2: farLeft, y2: farFarBottom },
      { x1: farLeft, y1: farBottom, x2: farRight, y2: farFarBottom },
      { x1: farRight, y1: farBottom, x2: farFarRight, y2: farFarBottom },
    ].map(b => ({ ...b, color: ring1Color }));
    
    // Ring 2
    let fff_Left, fff_Right, fff_Top, fff_Bottom;
    for (let i = 0; i < allX.length - 1; i++) {
      if (allX[i] < farFarLeft && allX[i + 1] >= farFarLeft) fff_Left = allX[i];
      if (allX[i] <= farFarRight && allX[i + 1] > farFarRight) fff_Right = allX[i + 1];
    }
    for (let i = 0; i < allY.length - 1; i++) {
      if (allY[i] < farFarTop && allY[i + 1] >= farFarTop) fff_Top = allY[i];
      if (allY[i] <= farFarBottom && allY[i + 1] > farFarBottom) fff_Bottom = allY[i + 1];
    }
    
    const ring2Color = variant === 3 ? currentPalette[1] : variant === 1 ? '#d03020' : '#e08020';
    const ring2 = [
      { x1: fff_Left, y1: fff_Top, x2: farFarLeft, y2: farFarTop },
      { x1: farFarLeft, y1: fff_Top, x2: farFarRight, y2: farFarTop },
      { x1: farFarRight, y1: fff_Top, x2: fff_Right, y2: farFarTop },
      { x1: fff_Left, y1: farFarTop, x2: farFarLeft, y2: farTop },
      { x1: farFarRight, y1: farFarTop, x2: fff_Right, y2: farTop },
      { x1: fff_Left, y1: farTop, x2: farFarLeft, y2: topOfCenter },
      { x1: farFarRight, y1: farTop, x2: fff_Right, y2: topOfCenter },
      { x1: fff_Left, y1: topOfCenter, x2: farFarLeft, y2: bottomOfCenter },
      { x1: farFarRight, y1: topOfCenter, x2: fff_Right, y2: bottomOfCenter },
      { x1: fff_Left, y1: bottomOfCenter, x2: farFarLeft, y2: farBottom },
      { x1: farFarRight, y1: bottomOfCenter, x2: fff_Right, y2: farBottom },
      { x1: fff_Left, y1: farBottom, x2: farFarLeft, y2: farFarBottom },
      { x1: farFarRight, y1: farBottom, x2: fff_Right, y2: farFarBottom },
      { x1: fff_Left, y1: farFarBottom, x2: farFarLeft, y2: fff_Bottom },
      { x1: farFarLeft, y1: farFarBottom, x2: farFarRight, y2: fff_Bottom },
      { x1: farFarRight, y1: farFarBottom, x2: fff_Right, y2: fff_Bottom },
    ].map(b => ({ ...b, color: ring2Color }));
    
    // Ring 3
    let ffff_Left, ffff_Right, ffff_Top, ffff_Bottom;
    for (let i = 0; i < allX.length - 1; i++) {
      if (allX[i] < fff_Left && allX[i + 1] >= fff_Left) ffff_Left = allX[i];
      if (allX[i] <= fff_Right && allX[i + 1] > fff_Right) ffff_Right = allX[i + 1];
    }
    for (let i = 0; i < allY.length - 1; i++) {
      if (allY[i] < fff_Top && allY[i + 1] >= fff_Top) ffff_Top = allY[i];
      if (allY[i] <= fff_Bottom && allY[i + 1] > fff_Bottom) ffff_Bottom = allY[i + 1];
    }
    
    const ring3Color = variant === 3 ? currentPalette[0] : variant === 1 ? '#e08020' : '#d03020';
    const ring3 = [
      { x1: ffff_Left, y1: ffff_Top, x2: fff_Left, y2: fff_Top },
      { x1: fff_Left, y1: ffff_Top, x2: fff_Right, y2: fff_Top },
      { x1: fff_Right, y1: ffff_Top, x2: ffff_Right, y2: fff_Top },
      { x1: ffff_Left, y1: fff_Top, x2: fff_Left, y2: farFarTop },
      { x1: fff_Right, y1: fff_Top, x2: ffff_Right, y2: farFarTop },
      { x1: ffff_Left, y1: farFarTop, x2: fff_Left, y2: farTop },
      { x1: fff_Right, y1: farFarTop, x2: ffff_Right, y2: farTop },
      { x1: ffff_Left, y1: farTop, x2: fff_Left, y2: topOfCenter },
      { x1: fff_Right, y1: farTop, x2: ffff_Right, y2: topOfCenter },
      { x1: ffff_Left, y1: topOfCenter, x2: fff_Left, y2: bottomOfCenter },
      { x1: fff_Right, y1: topOfCenter, x2: ffff_Right, y2: bottomOfCenter },
      { x1: ffff_Left, y1: bottomOfCenter, x2: fff_Left, y2: farBottom },
      { x1: fff_Right, y1: bottomOfCenter, x2: ffff_Right, y2: farBottom },
      { x1: ffff_Left, y1: farBottom, x2: fff_Left, y2: farFarBottom },
      { x1: fff_Right, y1: farBottom, x2: ffff_Right, y2: farFarBottom },
      { x1: ffff_Left, y1: farFarBottom, x2: fff_Left, y2: fff_Bottom },
      { x1: fff_Right, y1: farFarBottom, x2: ffff_Right, y2: fff_Bottom },
      { x1: ffff_Left, y1: fff_Bottom, x2: fff_Left, y2: ffff_Bottom },
      { x1: fff_Left, y1: fff_Bottom, x2: fff_Right, y2: ffff_Bottom },
      { x1: fff_Right, y1: fff_Bottom, x2: ffff_Right, y2: ffff_Bottom },
    ].map(b => ({ ...b, color: ring3Color }));
    
    // Ring 4
    let fffff_Left = 0, fffff_Right = width, fffff_Top = 0, fffff_Bottom = height;
    for (let i = 0; i < allX.length - 1; i++) {
      if (allX[i] < ffff_Left && allX[i + 1] >= ffff_Left) fffff_Left = allX[i];
      if (allX[i] <= ffff_Right && allX[i + 1] > ffff_Right) fffff_Right = allX[i + 1];
    }
    for (let i = 0; i < allY.length - 1; i++) {
      if (allY[i] < ffff_Top && allY[i + 1] >= ffff_Top) fffff_Top = allY[i];
      if (allY[i] <= ffff_Bottom && allY[i + 1] > ffff_Bottom) fffff_Bottom = allY[i + 1];
    }
    
    const ring4Color = variant === 3 ? currentPalette[1] : variant === 1 ? '#d03020' : '#e08020';
    const ring4 = [
      { x1: fffff_Left, y1: fffff_Top, x2: ffff_Left, y2: ffff_Top },
      { x1: ffff_Left, y1: fffff_Top, x2: ffff_Right, y2: ffff_Top },
      { x1: ffff_Right, y1: fffff_Top, x2: fffff_Right, y2: ffff_Top },
      { x1: fffff_Left, y1: ffff_Top, x2: ffff_Left, y2: fff_Top },
      { x1: ffff_Right, y1: ffff_Top, x2: fffff_Right, y2: fff_Top },
      { x1: fffff_Left, y1: fff_Top, x2: ffff_Left, y2: farFarTop },
      { x1: ffff_Right, y1: fff_Top, x2: fffff_Right, y2: farFarTop },
      { x1: fffff_Left, y1: farFarTop, x2: ffff_Left, y2: farTop },
      { x1: ffff_Right, y1: farFarTop, x2: fffff_Right, y2: farTop },
      { x1: fffff_Left, y1: farTop, x2: ffff_Left, y2: topOfCenter },
      { x1: ffff_Right, y1: farTop, x2: fffff_Right, y2: topOfCenter },
      { x1: fffff_Left, y1: topOfCenter, x2: ffff_Left, y2: bottomOfCenter },
      { x1: ffff_Right, y1: topOfCenter, x2: fffff_Right, y2: bottomOfCenter },
      { x1: fffff_Left, y1: bottomOfCenter, x2: ffff_Left, y2: farBottom },
      { x1: ffff_Right, y1: bottomOfCenter, x2: fffff_Right, y2: farBottom },
      { x1: fffff_Left, y1: farBottom, x2: ffff_Left, y2: farFarBottom },
      { x1: ffff_Right, y1: farBottom, x2: fffff_Right, y2: farFarBottom },
      { x1: fffff_Left, y1: farFarBottom, x2: ffff_Left, y2: fff_Bottom },
      { x1: ffff_Right, y1: farFarBottom, x2: fffff_Right, y2: fff_Bottom },
      { x1: fffff_Left, y1: fff_Bottom, x2: ffff_Left, y2: ffff_Bottom },
      { x1: ffff_Right, y1: fff_Bottom, x2: fffff_Right, y2: ffff_Bottom },
      { x1: fffff_Left, y1: ffff_Bottom, x2: ffff_Left, y2: fffff_Bottom },
      { x1: ffff_Left, y1: ffff_Bottom, x2: ffff_Right, y2: fffff_Bottom },
      { x1: ffff_Right, y1: ffff_Bottom, x2: fffff_Right, y2: fffff_Bottom },
    ].map(b => ({ ...b, color: ring4Color }));
    
    const allBoxes = [...squares, ...ring1, ...ring2, ...ring3, ...ring4];
    
    // Font settings differ by variant
    const fontSize = variant === 1 ? 10 : 11;
    const fontWeight = variant === 1 ? 'normal' : '900';
    const minBoxSize = variant === 1 ? 20 : 10;
    
    allBoxes.forEach(sq => {
      if (!sq.x1 || !sq.x2 || !sq.y1 || !sq.y2) return;
      const sqWidth = sq.x2 - sq.x1;
      const sqHeight = sq.y2 - sq.y1;
      
      if (sqWidth > minBoxSize && sqHeight > minBoxSize) {
        const cols = Math.floor(sqWidth / 12);
        const rows = Math.floor(sqHeight / 14);
        
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            // Use AutoFont to generate glyph with proper font
            const glyphData = AutoFont.generateGlyph(
              block_hex,
              block_hex_desc,
              block_lang,
              lang_font,
              true, // testMode enabled
              { blocks: variantBlocks[variant], glyph: null },
              null // no exclusions
            );

            const char = document.createElement('div');
            char.textContent = String.fromCodePoint(parseInt(glyphData.glyph, 16));
            char.style.position = 'absolute';
            char.style.left = `${sq.x1 + 6 + col * 12}px`;
            char.style.top = `${sq.y1 + 4 + row * 14}px`;
            char.style.fontSize = `${fontSize}px`;
            char.style.fontWeight = fontWeight;
            char.style.color = sq.color;
            char.style.fontFamily = glyphData.fontStack || 'monospace';
            char.style.zIndex = '50';
            container.appendChild(char);
          }
        }
      }
    });

    console.log(`[insert31] Variant ${variant} rendered with ${allBoxes.length} boxes`);
  }

  function init() {
    container = document.getElementById('container') || document.body;
    
    if (!container.id) {
      container.id = 'container';
    }

    injectStyles();
    render();
    addKeyboardHandler();

    console.log(`[insert31] Fibonacci Spirals initialized (variant ${variant})`);
  }

  function addKeyboardHandler() {
    document.addEventListener('keydown', (e) => {
      if (e.key === '1') {
        variant = 1;
        console.log('[insert31] Switched to variant 1 (Basic Latin)');
        updateBackground();
        render();
      } else if (e.key === '2') {
        variant = 2;
        console.log('[insert31] Switched to variant 2 (IPA + Extended Latin)');
        updateBackground();
        render();
      } else if (e.key === '3') {
        variant = 3;
        currentPalette = PALETTES_V3[Math.floor(Math.random() * PALETTES_V3.length)];
        console.log('[insert31] Switched to variant 3 (palette colors)');
        updateBackground();
        render();
      }
    });
  }

  function updateBackground() {
    const bgColor = variant === 1 ? '#0a0a0a' : '#000';
    document.body.style.background = bgColor;
  }

  function injectStyles() {
    const bgColor = variant === 1 ? '#0a0a0a' : '#000';
    
    const style = document.createElement('style');
    style.textContent = `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        background: ${bgColor};
        margin: 0;
        padding: 0;
        overflow: hidden;
      }

      #container {
        width: 100vw;
        height: 100vh;
        position: relative;
      }

      .line-v, .line-h, .line-d {
        position: absolute;
        opacity: 0.7;
      }

      .line-v {
        top: 0;
        height: 100%;
        width: 1px;
      }

      .line-h {
        left: 0;
        width: 100%;
        height: 1px;
      }

      .line-d {
        width: 1px;
        height: 200vmax;
        transform-origin: top left;
      }

      .red { background: #d03020; }
      .orange { background: #e08020; }
    `;
    document.head.appendChild(style);
  }

  function changeHtmlDisplayInline() {
    // Required stub for insert system
  }

  // Start dependency loading
  loadDependencies().then(() => {
    waitForDependencies();
  });

  // Export for testing
  window.insert31 = { variant };
})();
