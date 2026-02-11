/**
 * insert32.js - Mad Punctuation (Multi-Flavor)
 * 
 * Flavor 0: mad_punct.htm - Animated color cycling
 * Flavor 1: mad_punct_grids.htm - Static grids with keyboard looks
 */

const INSERT32_CSS = `
    #insert32-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #000;
        z-index: 9999;
    }
    #insert32-label {
        position: fixed;
        bottom: 12px;
        right: 12px;
        color: rgba(255,255,255,0.25);
        font-family: monospace;
        font-size: 12px;
        z-index: 10000;
        pointer-events: none;
    }
`;

const INSERT32_PALETTES = [
    ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'],
    ['#00d2d3', '#ff9f43', '#ee5a24', '#9c88ff', '#badc58'],
    ['#e056fd', '#686de0', '#30336b', '#f8a5c2', '#63cdda'],
    ['#25CCF7', '#FD7272', '#54a0ff', '#00d2d3', '#1B9CFC'],
    ['#F8EFBA', '#f6e58d', '#ffbe76', '#ff7979', '#badc58'],
    ['#4834d4', '#be2edd', '#22a6b3', '#6ab04c', '#eb4d4b'],
    ['#7bed9f', '#70a1ff', '#5352ed', '#ff4757', '#ffa502'],
    ['#2ed573', '#1e90ff', '#3742fa', '#ff6348', '#eccc68'],
];

// Simple character set (punctuation)
const INSERT32_CHARS = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';

// ── Flavor 0: Mad Punct Animation ───────────────────────────────────────────
function startFlavor0() {
    const container = document.createElement('div');
    container.id = 'insert32-container';
    
    const label = document.createElement('div');
    label.id = 'insert32-label';
    container.appendChild(label);
    
    document.body.appendChild(container);
    
    const chars = INSERT32_CHARS;
    let animationFrameId = null;
    let currentPalette = [];
    let colorOffset = 0;
    
    function randomPalette() {
        return INSERT32_PALETTES[Math.floor(Math.random() * INSERT32_PALETTES.length)];
    }
    
    function createGrid(palette) {
        const grid = document.getElementById('insert32-grid');
        if (!grid) return;
        
        grid.innerHTML = '';
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(5, 1fr)';
        grid.style.gridTemplateRows = 'repeat(3, 1fr)';
        grid.style.height = '100vh';
        grid.style.width = '100vw';
        
        // Select 4 random chars
        const selected = [];
        while (selected.length < 4) {
            const c = chars[Math.floor(Math.random() * chars.length)];
            if (!selected.includes(c)) selected.push(c);
        }
        const mainChars = selected.slice(0, 3);
        const middleChar = selected[3];
        
        const middleCol = 2;
        
        for (let i = 0; i < 15; i++) {
            const cell = document.createElement('div');
            cell.style.display = 'flex';
            cell.style.justifyContent = 'center';
            cell.style.alignItems = 'center';
            cell.style.padding = '10px';
            
            const isMiddle = i % 5 === middleCol;
            const char = isMiddle ? middleChar : mainChars[Math.floor(Math.random() * mainChars.length)];
            cell.style.color = palette[Math.floor(Math.random() * palette.length)];
            cell.style.fontSize = '3rem';
            cell.innerHTML = char;
            
            grid.appendChild(cell);
        }
        
        grid._chars = { mainChars, middleChar };
        grid._palette = palette;
    }
    
    function animate() {
        const grid = document.getElementById('insert32-grid');
        if (!grid) return;
        
        const cells = grid.querySelectorAll('div');
        const middleCol = 2;
        
        cells.forEach((cell, i) => {
            const isMiddle = i % 5 === middleCol;
            const pal = isMiddle ? [...grid._palette].reverse() : grid._palette;
            cell.style.color = pal[(i + colorOffset) % pal.length];
        });
        
        colorOffset = (colorOffset + 1) % grid._palette.length;
        animationFrameId = requestAnimationFrame(animate);
    }
    
    // Initialize
    currentPalette = randomPalette();
    const grid = document.createElement('div');
    grid.id = 'insert32-grid';
    container.appendChild(grid);
    createGrid(currentPalette);
    animate();
    
    document.getElementById('insert32-label').textContent = 'mad_punct · animated [0]';
    
    // R to regenerate
    document.addEventListener('keydown', function onKey(e) {
        if (e.key === 'r') {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            currentPalette = randomPalette();
            createGrid(currentPalette);
            colorOffset = 0;
            animate();
        }
    });
    
    container._cleanup = () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
}

// ── Flavor 1: Mad Punct Grids (Static) ───────────────────────────────────────
function startFlavor1() {
    const container = document.createElement('div');
    container.id = 'insert32-container';
    
    const label = document.createElement('div');
    label.id = 'insert32-label';
    container.appendChild(label);
    
    document.body.appendChild(container);
    
    const chars = INSERT32_CHARS;
    
    const layouts = [
        { cols: 2, rows: 2 }, { cols: 3, rows: 2 }, { cols: 2, rows: 3 },
        { cols: 3, rows: 3 }, { cols: 4, rows: 3 }, { cols: 3, rows: 4 },
        { cols: 4, rows: 4 }, { cols: 5, rows: 3 }, { cols: 3, rows: 5 }
    ];
    
    function randomPalette() {
        return INSERT32_PALETTES[Math.floor(Math.random() * INSERT32_PALETTES.length)];
    }
    
    function displayLook(lookNum) {
        const grid = document.getElementById('insert32-grid');
        if (!grid) return;
        
        grid.innerHTML = '';
        const layout = layouts[Math.floor(Math.random() * layouts.length)];
        grid.style.gridTemplateColumns = `repeat(${layout.cols}, 1fr)`;
        grid.style.gridTemplateRows = `repeat(${layout.rows}, 1fr)`;
        
        const palette = randomPalette();
        grid.style.backgroundColor = `hsl(${Math.random() * 360}, 20%, 10%)`;
        
        // Select 4 chars
        const selected = [];
        while (selected.length < 4) {
            const c = chars[Math.floor(Math.random() * chars.length)];
            if (!selected.includes(c)) selected.push(c);
        }
        const mainChars = selected.slice(0, 3);
        
        const cellCount = layout.cols * layout.rows;
        for (let i = 0; i < cellCount; i++) {
            const cell = document.createElement('div');
            cell.style.display = 'flex';
            cell.style.justifyContent = 'center';
            cell.style.alignItems = 'center';
            cell.style.padding = '10px';
            cell.style.color = palette[Math.floor(Math.random() * palette.length)];
            cell.style.fontSize = '2.5rem';
            cell.innerHTML = mainChars[Math.floor(Math.random() * mainChars.length)];
            grid.appendChild(cell);
        }
        
        document.getElementById('insert32-label').textContent = `mad_punct · grids [1]`;
    }
    
    const grid = document.createElement('div');
    grid.id = 'insert32-grid';
    grid.style.display = 'grid';
    grid.style.gap = '2px';
    grid.style.padding = '2px';
    grid.style.height = '100vh';
    grid.style.width = '100vw';
    grid.style.boxSizing = 'border-box';
    container.appendChild(grid);
    
    // Keys 1-5 for looks
    document.addEventListener('keydown', function onKey(e) {
        if (e.key >= '1' && e.key <= '5') {
            displayLook(parseInt(e.key));
        }
    });
    
    // Initialize
    const randomLook = Math.floor(Math.random() * 5) + 1;
    displayLook(randomLook);
}

// ── Main Setup ─────────────────────────────────────────────────────────────
let currentFlavor = null;
let currentContainer = null;

function teardown() {
    const existing = document.getElementById('insert32-container');
    if (existing) {
        if (existing._cleanup) existing._cleanup();
        existing.remove();
    }
    const styles = document.getElementById('insert31-styles');
    if (styles) styles.remove();
}

function startVisualization(flavor) {
    teardown();
    currentFlavor = flavor !== undefined ? flavor : Math.floor(Math.random() * 2);
    
    if (!document.getElementById('insert32-styles')) {
        const style = document.createElement('style');
        style.id = 'insert31-styles';
        style.textContent = INSERT32_CSS;
        document.head.appendChild(style);
    }
    
    switch (currentFlavor) {
        case 0: startFlavor0(); break;
        case 1: startFlavor1(); break;
        default: startFlavor0();
    }
}

// Keyboard: 0-1 switch flavors
document.addEventListener('keydown', function(e) {
    if (e.key >= '0' && e.key <= '1') {
        startVisualization(parseInt(e.key));
    }
});

// Auto-start with random flavor
startVisualization(Math.floor(Math.random() * 2));
