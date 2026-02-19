console.log('insert28.js loaded - Multi-Flavor DeGenerator');

// ===== CONFIGURATION =====
// Color palette for all variants
const COLOR_PALETTE = [
    '#000000', '#000080', '#00008B', '#0000CD', '#0000FF', '#006400', '#008000', '#008080', '#008B8B', '#00BFFF', '#00CED1',
    '#00FA9A', '#00FF00', '#00FF7F', '#00FFFF', '#191970', '#1E90FF', '#20B2AA', '#228B22', '#2E8B57', '#2F4F4F',
    '#32CD32', '#3CB371', '#40E0D0', '#4169E1', '#4682B4', '#483D8B', '#48D1CC', '#4B0082', '#556B2F', '#5F9EA0',
    '#6495ED', '#66CDAA', '#696969', '#6A5ACD', '#6B8E23', '#708090', '#778899', '#7B68EE',
    '#7CFC00', '#7FFF00', '#7FFFD4', '#800000', '#800080', '#808000', '#808080', '#87CEEB', '#87CEFA', '#8A2BE2',
    '#8B0000', '#8B008B', '#8B4513', '#8FBC8F', '#90EE90', '#9370DB', '#9400D3', '#98FB98', '#9932CC', '#9ACD32', '#A0522D',
    '#A52A2A', '#A9A9A9', '#ADD8E6', '#ADFF2F', '#AFEEEE', '#B0C4DE', '#B0E0E6', '#B22222', '#B8860B', '#BA55D3',
    '#BC8F8F', '#BDB76B', '#C0C0C0', '#C71585', '#CD5C5C', '#CD853F', '#D2691E', '#D2B48C', '#D3D3D3', '#D8BFD8',
    '#DA70D6', '#DAA520', '#DB7093', '#DC143C', '#DCDCDC', '#DDA0DD', '#DEB887', '#E0FFFF', '#E6E6FA', '#E9967A', '#EE82EE',
    '#EEE8AA', '#F08080', '#F0E68C', '#F0F8FF', '#F0FFF0', '#F0FFFF', '#F4A460', '#F5DEB3', '#F5F5DC', '#F5F5F5', '#F5FFFA',
    '#F8F8FF', '#FA8072', '#FAEBD7', '#FAF0E6', '#FAFAD2', '#FDF5E6', '#FF0000', '#FF00FF', '#FF1493', '#FF4500',
    '#FF6347', '#FF69B4', '#FF7F50', '#FF8C00', '#FFA07A', '#FFA500', '#FFB6C1', '#FFC0CB', '#FFD700', '#FFDAB9', '#FFDEAD',
    '#FFE4B5', '#FFE4C4', '#FFE4E1', '#FFEBCD', '#FFEFD5', '#FFF0F5', '#FFF5EE', '#FFF8DC', '#FFFACD', '#FFFAF0', '#FFFAFA',
    '#FFFF00', '#FFFFE0', '#FFFFF0', '#FFFFFF'
];

// Unicode symbols (Extended Symbols block)
const SYMBOL_ARRAY = [
    '1FB00', '1FB01', '1FB02', '1FB03', '1FB04', '1FB05', '1FB06', '1FB07', '1FB08', '1FB09', '1FB0A', '1FB0B', '1FB0C', '1FB0D', '1FB0E', '1FB0F',
    '1FB10', '1FB11', '1FB12', '1FB13', '1FB14', '1FB15', '1FB16', '1FB17', '1FB18', '1FB19', '1FB1A', '1FB1B', '1FB1C', '1FB1D', '1FB1E', '1FB1F',
    '1FB20', '1FB21', '1FB22', '1FB23', '1FB24', '1FB25', '1FB26', '1FB27', '1FB28', '1FB29', '1FB2A', '1FB2B', '1FB2C', '1FB2D', '1FB2E', '1FB2F',
    '1FB30', '1FB31', '1FB32', '1FB33', '1FB34', '1FB35', '1FB36', '1FB37', '1FB38', '1FB39', '1FB3A', '1FB3B', '1FB3C', '1FB3D', '1FB3E', '1FB3F',
    '1FB40', '1FB41', '1FB42', '1FB43', '1FB44', '1FB45', '1FB46', '1FB47', '1FB48', '1FB49', '1FB4A', '1FB4B', '1FB4C', '1FB4D', '1FB4E', '1FB4F',
    '1FB50', '1FB51', '1FB52', '1FB53', '1FB54', '1FB55', '1FB56', '1FB57', '1FB58', '1FB59', '1FB5A', '1FB5B', '1FB5C', '1FB5D', '1FB5E', '1FB5F',
    '1FB60', '1FB61', '1FB62', '1FB63', '1FB64', '1FB65', '1FB66', '1FB67', '1FB68', '1FB69', '1FB6A', '1FB6B', '1FB6C', '1FB6D', '1FB6E', '1FB6F',
    '1FB70', '1FB71', '1FB72', '1FB73', '1FB74', '1FB75', '1FB76', '1FB77', '1FB78', '1FB79', '1FB7A', '1FB7B', '1FB7C', '1FB7D', '1FB7E', '1FB7F',
    '1FB80', '1FB81', '1FB82', '1FB83', '1FB84', '1FB85', '1FB86', '1FB87', '1FB88', '1FB89', '1FB8A', '1FB8B', '1FB8C', '1FB8D', '1FB8E', '1FB8F',
    '1FB90', '1FB91', '1FB92', '1FB93', '1FB94', '1FB95', '1FB96', '1FB97', '1FB98', '1FB99', '1FB9A', '1FB9B', '1FB9C', '1FB9D', '1FB9E', '1FB9F',
    '1FBA0', '1FBA1', '1FBA2', '1FBA3', '1FBA4', '1FBA5', '1FBA6', '1FBA7', '1FBA8', '1FBA9', '1FBAA', '1FBAB', '1FBAC', '1FBAD', '1FBAE', '1FBAF',
    '1FBB0', '1FBB1', '1FBB2', '1FBB3', '1FBB4', '1FBB5', '1FBB6', '1FBB7', '1FBB8', '1FBB9', '1FBBA', '1FBBB', '1FBBC', '1FBBD', '1FBBE', '1FBBF',
    '1FBC0', '1FBC1', '1FBC2', '1FBC3', '1FBC4', '1FBC5', '1FBC6', '1FBC7', '1FBC8', '1FBC9', '1FBCA',
    '1FBF0', '1FBF1', '1FBF2', '1FBF3', '1FBF4', '1FBF5', '1FBF6', '1FBF7', '1FBF8', '1FBF9'
];

// Splatter symbols (special set for splat variant)
const SPLATTER_SYMBOLS = ['1CDFD', '1CDFE', '1CDFF'];

// ===== MULTI-FLAVOR PATTERN =====
const FLAVORS = [
    {
        name: 'Scattered Base',
        description: 'Classic scattered divs layout (1000 containers)',
        layoutType: 'scattered',
        containerCount: 1000,
        fontChangeRate: 400,
        childDivCount: 8,
        fontSize: '125px',
        containerWidth: '125px',
        opacity: 0.5,
        symbols: SYMBOL_ARRAY
    },
    {
        name: 'Two-Block Slow',
        description: 'Two-block overlay with 10s change rate',
        layoutType: 'two-block',
        fontChangeRate: 10000,
        symbolSize: '40vw',
        opacity: 1.0,
        symbols: SYMBOL_ARRAY
    },
    {
        name: 'Dynamic Overlays',
        description: 'Dynamic overlays with 6200ms change rate',
        layoutType: 'dynamic-overlay',
        fontChangeRate: 6200,
        symbolSize: '40vw',
        layerCount: 3,
        symbols: SYMBOL_ARRAY
    },
    {
        name: 'Slow Overlays',
        description: 'Slow overlay mode with 6000ms change rate',
        layoutType: 'dynamic-overlay',
        fontChangeRate: 6000,
        symbolSize: '40vw',
        layerCount: 3,
        symbols: SYMBOL_ARRAY
    },
    {
        name: 'Color Mix',
        description: 'Scattered with extended color palette mixing',
        layoutType: 'scattered-colormix',
        containerCount: 1000,
        fontChangeRate: 400,
        childDivCount: 8,
        fontSize: '125px',
        containerWidth: '125px',
        opacity: 0.5,
        enableColorMix: true,
        symbols: SYMBOL_ARRAY
    },
    {
        name: 'Splat Effect',
        description: 'Scattered divs with splatter symbols',
        layoutType: 'scattered-splat',
        containerCount: 1000,
        fontChangeRate: 400,
        childDivCount: 8,
        fontSize: '125px',
        containerWidth: '125px',
        opacity: 0.5,
        symbols: SPLATTER_SYMBOLS
    },
    {
        name: 'Enhanced Overlays',
        description: 'Enhanced dynamic overlays with 6000ms',
        layoutType: 'dynamic-overlay',
        fontChangeRate: 6000,
        symbolSize: '40vw',
        layerCount: 3,
        symbols: SYMBOL_ARRAY
    },
    {
        name: 'Box Mix Layout',
        description: 'Two-block overlay with box mixing at 6000ms',
        layoutType: 'two-block',
        fontChangeRate: 6000,
        symbolSize: '40vw',
        opacity: 1.0,
        symbols: SYMBOL_ARRAY
    },
    {
        name: 'Fast Scattered',
        description: 'Scattered layout with faster 800ms change rate',
        layoutType: 'scattered-fast',
        containerCount: 1000,
        fontChangeRate: 800,
        childDivCount: 8,
        fontSize: '125px',
        containerWidth: '125px',
        opacity: 0.5,
        symbols: SYMBOL_ARRAY
    }
];

// Global state
let currentFlavorIndex = null;
let animationIntervals = [];
let containers = [];
let wrapper = null;
let styleTag = null;

// ===== HELPER FUNCTIONS =====
function randomColor() {
    return COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
}

function randomSymbol(symbols = SYMBOL_ARRAY) {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// TODO: Create text node with symbol instead of using innerHTML
function createSymbolTextNode(symbolHex) {
    const codePoint = parseInt(symbolHex, 16);
    const char = String.fromCodePoint(codePoint);
    return document.createTextNode(char);
}

// ===== LAYOUT IMPLEMENTATIONS =====

function createScatteredLayout(flavor) {
    // Create wrapper
    wrapper = document.createElement('div');
    wrapper.id = 'insert28-wrapper';
    
    // Create style tag
    styleTag = document.createElement('style');
    styleTag.id = 'insert28-style';
    const styles = `
        @font-face {
            font-family: 'Symbols2';
            src: url('../tff/NotoSansSymbols2-Regular.ttf');
        }
        
        body {
            font-family: 'Symbols2';
            margin: 0;
            padding: 0;
            overflow: hidden;
        }
        
        #insert28-wrapper {
            width: 100%;
            height: 100%;
        }
        
        .insert28-container {
            position: relative;
            float: left;
            font-size: ${flavor.fontSize};
            width: ${flavor.containerWidth};
            text-align: center;
            line-height: 1;
            opacity: ${flavor.opacity};
        }
        
        .insert28-container-child {
            position: absolute;
            float: none;
            opacity: 0.65;
            line-height: 1;
            font-size: ${flavor.fontSize};
            width: ${flavor.containerWidth};
            background-color: transparent;
        }
    `;
    styleTag.textContent = styles;
    document.head.appendChild(styleTag);
    
    // Set body background
    document.body.style.backgroundColor = randomColor();
    document.body.appendChild(wrapper);
    
    // Create containers
    containers = [];
    for (let i = 1; i <= flavor.containerCount; i++) {
        const container = document.createElement('div');
        container.className = 'insert28-container';
        container.id = `insert28-container-${i}`;
        container.style.color = randomColor();
        
        // Use text node instead of innerHTML
        const symbol = createSymbolTextNode(randomSymbol(flavor.symbols));
        container.appendChild(symbol);
        
        wrapper.appendChild(container);
        containers.push(container);
        
        // Create child divs
        for (let j = 1; j <= flavor.childDivCount; j++) {
            const childDiv = document.createElement('div');
            childDiv.className = 'insert28-container-child';
            childDiv.id = `insert28-container-${i}-child-${j}`;
            childDiv.style.color = randomColor();
            childDiv.style.top = '0px';
            childDiv.style.left = '0px';
            
            // Use text node instead of innerHTML
            const childSymbol = createSymbolTextNode(randomSymbol(flavor.symbols));
            childDiv.appendChild(childSymbol);
            
            container.appendChild(childDiv);
        }
    }
}

function createTwoBlockLayout(flavor) {
    // Create wrapper
    wrapper = document.createElement('div');
    wrapper.id = 'insert28-wrapper';
    
    // Create style tag
    styleTag = document.createElement('style');
    styleTag.id = 'insert28-style';
    const styles = `
        @font-face {
            font-family: 'Symbols2';
            src: url('../tff/NotoSansSymbols2-Regular.ttf');
        }
        
        body {
            font-family: 'Symbols2';
            margin: 0;
            overflow: hidden;
            width: 100vw;
            height: 100vh;
            display: flex;
            background-color: #000;
        }
        
        #insert28-wrapper {
            display: flex;
            width: 100%;
            height: 100%;
        }
        
        .insert28-block {
            position: relative;
            width: 50vw;
            height: 100vh;
            overflow: hidden;
        }
        
        .insert28-layer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            mix-blend-mode: normal;
            opacity: 1;
            transition: background-color 2s ease-out, color 1s ease-out, opacity 1s ease-out;
        }
        
        .insert28-layer > span {
            font-size: ${flavor.symbolSize};
            line-height: 1;
            position: absolute;
        }
    `;
    styleTag.textContent = styles;
    document.head.appendChild(styleTag);
    
    document.body.style.backgroundColor = '#000';
    document.body.appendChild(wrapper);
    
    // Create two blocks
    for (let blockNum = 0; blockNum < 2; blockNum++) {
        const block = document.createElement('div');
        block.className = 'insert28-block';
        block.id = `insert28-block-${blockNum}`;
        
        // Create 3 layers
        for (let layerNum = 0; layerNum < 3; layerNum++) {
            const layer = document.createElement('div');
            layer.className = 'insert28-layer';
            layer.id = `insert28-block-${blockNum}-layer-${layerNum}`;
            layer.style.color = randomColor();
            
            const span = document.createElement('span');
            const symbol = createSymbolTextNode(randomSymbol(flavor.symbols));
            span.appendChild(symbol);
            layer.appendChild(span);
            
            block.appendChild(layer);
        }
        
        wrapper.appendChild(block);
    }
}

function createDynamicOverlayLayout(flavor) {
    // Similar to two-block but with dynamic features
    createTwoBlockLayout(flavor);
}

// ===== ANIMATION FUNCTIONS =====

function animateScatteredLayout(flavor) {
    const interval = setInterval(() => {
        const randomContainer = containers[Math.floor(Math.random() * containers.length)];
        const randomChild = Math.floor(Math.random() * flavor.childDivCount) + 1;
        const targetChild = document.getElementById(`${randomContainer.id}-child-${randomChild}`);
        
        if (targetChild) {
            targetChild.style.color = randomColor();
            // Clear and recreate text node instead of using innerHTML
            while (targetChild.firstChild) {
                targetChild.removeChild(targetChild.firstChild);
            }
            const newSymbol = createSymbolTextNode(randomSymbol(flavor.symbols));
            targetChild.appendChild(newSymbol);
        }
    }, Math.random() * flavor.fontChangeRate);
    
    animationIntervals.push(interval);
    
    // Background color change
    const bgInterval = setInterval(() => {
        document.body.style.backgroundColor = randomColor();
    }, flavor.fontChangeRate * 2);
    animationIntervals.push(bgInterval);
}

function animateTwoBlockLayout(flavor) {
    const interval = setInterval(() => {
        for (let blockNum = 0; blockNum < 2; blockNum++) {
            for (let layerNum = 0; layerNum < 3; layerNum++) {
                const layer = document.getElementById(`insert28-block-${blockNum}-layer-${layerNum}`);
                if (layer) {
                    layer.style.color = randomColor();
                    const span = layer.querySelector('span');
                    if (span) {
                        while (span.firstChild) {
                            span.removeChild(span.firstChild);
                        }
                        const newSymbol = createSymbolTextNode(randomSymbol(flavor.symbols));
                        span.appendChild(newSymbol);
                    }
                }
            }
        }
    }, flavor.fontChangeRate);
    
    animationIntervals.push(interval);
    
    // Background color change
    const bgInterval = setInterval(() => {
        document.body.style.backgroundColor = randomColor();
    }, flavor.fontChangeRate * 2);
    animationIntervals.push(bgInterval);
}

// ===== FLAVOR SWITCHING =====

function startVisualization(flavorIndex) {
    // Cleanup previous
    animationIntervals.forEach(clearInterval);
    animationIntervals = [];
    containers = [];
    
    if (wrapper) {
        wrapper.remove();
        wrapper = null;
    }
    if (styleTag) {
        styleTag.remove();
        styleTag = null;
    }
    
    const flavor = FLAVORS[flavorIndex];
    currentFlavorIndex = flavorIndex;
    
    console.log(`Starting flavor ${flavorIndex}: ${flavor.name}`);
    
    // Create layout based on flavor type
    switch (flavor.layoutType) {
        case 'scattered':
        case 'scattered-colormix':
        case 'scattered-splat':
        case 'scattered-fast':
            createScatteredLayout(flavor);
            animateScatteredLayout(flavor);
            break;
        case 'two-block':
            createTwoBlockLayout(flavor);
            animateTwoBlockLayout(flavor);
            break;
        case 'dynamic-overlay':
            createDynamicOverlayLayout(flavor);
            animateTwoBlockLayout(flavor);
            break;
    }
}

function getFlavorFromURL() {
    const params = new URLSearchParams(window.location.search);
    const flavor = params.get('flavor');
    if (flavor !== null) {
        const index = parseInt(flavor);
        if (!isNaN(index) && index >= 0 && index < FLAVORS.length) {
            return index;
        }
    }
    return null;
}

// ===== KEYBOARD CONTROLS =====

document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        const index = parseInt(e.key);
        if (index < FLAVORS.length) {
            console.log(`Keyboard: switching to flavor ${index}`);
            startVisualization(index);
            // Update URL without page reload
            window.history.replaceState({}, '', `?flavor=${index}`);
        }
    }
});

// ===== REQUIRED STUB =====
function changeHtmlDisplayInline() {
    // Required by g.us3.htm - leave empty if not needed
}

// ===== INIT =====
async function init() {
    // Check for flavor in URL, otherwise start with flavor 0
    const urlFlavor = getFlavorFromURL();
    const startFlavor = urlFlavor !== null ? urlFlavor : 0;
    
    startVisualization(startFlavor);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ===== TODO ITEMS FOR MANUAL CLEANUP =====
// TODO: Add blend mode support for two-block layouts
// TODO: Test all 9 flavor variants on actual glyphmatic.us site
// TODO: Add info display showing current flavor name and controls (press 0-9 to switch)
// TODO: Add animation speed controls (faster/slower keyboard shortcuts)
// TODO: Optimize performance for 1000+ containers in scattered layout
// TODO: Add touch/mobile support for flavor switching
// TODO: Consider using requestAnimationFrame for smoother animations
// TODO: Add localStorage persistence for user's favorite flavor
// TODO: Test compatibility with different symbol fonts
