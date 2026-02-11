/**
 * insert32.js - Mad Punctuation (Multi-Flavor)
 *
 * Flavor 0: Animated color cycling (from mad_punct.htm)
 * Flavor 1: Static grids with keyboard looks 1-5 (from mad_punct_grids.htm)
 */

(function () {

const INSERT32_PUNCT = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~¡¢£¤¥¦§¨©ª«¬®¯°±´µ¶·¸»¿×÷\u2010\u2011\u2012\u2013\u2014\u2015\u2016\u2017\u2018\u2019\u201A\u201B\u201C\u201D\u201E\u201F\u2020\u2021\u2022\u2026\u2030\u2031\u2032\u2033\u2034\u2035\u2036\u2037\u2039\u203A\u203B\u203C\u203D\u203E\u2044\u2045\u2046\u2047\u2048\u2049\u204A\u204E\u204F\u2500\u2501\u2502\u2503\u250C\u250F\u2510\u2513\u2514\u2517\u2518\u251B\u251C\u251F\u2520\u2523\u2524\u2527\u2528\u252B\u252C\u252F\u2530\u2533\u2534\u2537\u2538\u253B\u253C\u253F\u2540\u2543\u254B\u2550\u2551\u2554\u2557\u255A\u255D\u2560\u2563\u2566\u2569\u256C\u256D\u256E\u256F\u2570\u2571\u2572\u2573';

const INSERT32_PALETTES = [
    ['#ff6b6b','#feca57','#48dbfb','#ff9ff3','#54a0ff'],
    ['#00d2d3','#ff9f43','#ee5a24','#9c88ff','#badc58'],
    ['#e056fd','#686de0','#30336b','#f8a5c2','#63cdda'],
    ['#25CCF7','#FD7272','#54a0ff','#00d2d3','#1B9CFC'],
    ['#7bed9f','#70a1ff','#5352ed','#ff4757','#ffa502'],
    ['#2ed573','#1e90ff','#3742fa','#ff6348','#eccc68'],
    ['#a29bfe','#fd79a8','#55efc4','#fdcb6e','#e17055'],
    ['#00b894','#0984e3','#6c5ce7','#e84393','#d63031'],
];

const INSERT32_CSS = `
    #insert32-container {
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        background: #000;
        z-index: 9999;
        overflow: hidden;
    }
    #insert32-label {
        position: fixed;
        bottom: 12px; right: 12px;
        color: rgba(255,255,255,0.2);
        font-family: monospace;
        font-size: 11px;
        z-index: 10001;
        pointer-events: none;
    }
    .i32-grid {
        display: grid;
        gap: 10px;
        padding: 10px;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }
    .i32-cell {
        overflow: hidden;
        box-sizing: border-box;
        font-size: 0.85em;
        line-height: 1.1;
        word-break: break-all;
        padding: 6px;
        display: flex;
        flex-direction: column;
    }
    .i32-cell .i32-top { height: 20%; overflow: hidden; word-break: break-all; }
    .i32-cell .i32-mid-row { height: 80%; display: flex; flex-direction: row; }
    .i32-cell .i32-left { flex: 45; overflow: hidden; word-break: break-all; }
    .i32-cell .i32-middle {
        flex: 10;
        display: flex; align-items: center; justify-content: center;
        border-left: 1px solid rgba(128,128,128,0.2);
        border-right: 1px solid rgba(128,128,128,0.2);
        font-size: 2em;
    }
    .i32-cell .i32-right { flex: 45; overflow: hidden; word-break: break-all; }
`;

function randomPalette() {
    return INSERT32_PALETTES[Math.floor(Math.random() * INSERT32_PALETTES.length)];
}

function randomChars() {
    const chars = INSERT32_PUNCT;
    const selected = new Set();
    while (selected.size < 4) {
        selected.add(chars[Math.floor(Math.random() * chars.length)]);
    }
    const arr = Array.from(selected);
    return { main: arr.slice(0, 3), middle: arr[3] };
}

function buildColorList(palette, count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        colors.push(palette[i % palette.length]);
    }
    return colors;
}

function packHTML(chars, colors, count) {
    let html = '';
    for (let i = 0; i < count; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const col = colors[i % colors.length];
        html += `<span style="color:${col}">${ch}</span>`;
    }
    return html;
}

function buildCell(mainChars, middleChar, palette) {
    const colors = buildColorList(palette, 300);
    const revColors = [...colors].reverse();

    const cell = document.createElement('div');
    cell.className = 'i32-cell';

    const top = document.createElement('div');
    top.className = 'i32-top';
    top.innerHTML = packHTML(mainChars, colors, 400);

    const midRow = document.createElement('div');
    midRow.className = 'i32-mid-row';

    const left = document.createElement('div');
    left.className = 'i32-left';
    left.innerHTML = packHTML(mainChars, colors, 1200);

    const middle = document.createElement('div');
    middle.className = 'i32-middle';
    middle.innerHTML = `<span style="color:${palette[Math.floor(Math.random()*palette.length)]}">${middleChar}</span>`;

    const right = document.createElement('div');
    right.className = 'i32-right';
    right.innerHTML = packHTML(mainChars, revColors, 1200);

    midRow.appendChild(left);
    midRow.appendChild(middle);
    midRow.appendChild(right);
    cell.appendChild(top);
    cell.appendChild(midRow);
    return cell;
}

const LAYOUTS = [
    { rows: 1, cols: 1 },
    { rows: 1, cols: 2 },
    { rows: 2, cols: 2 },
    { rows: 3, cols: 3 },
];

function buildGrid(container, palette) {
    const grid = document.createElement('div');
    grid.className = 'i32-grid';

    const layout = LAYOUTS[Math.floor(Math.random() * LAYOUTS.length)];
    grid.style.gridTemplateRows = `repeat(${layout.rows}, 1fr)`;
    grid.style.gridTemplateColumns = `repeat(${layout.cols}, 1fr)`;

    const { main, middle } = randomChars();
    const n = layout.rows * layout.cols;
    for (let i = 0; i < n; i++) {
        grid.appendChild(buildCell(main, middle, palette));
    }

    container.appendChild(grid);
    return grid;
}

// ── Flavor 0: Animated (color cycling) ────────────────────────────────────

function startFlavor0() {
    const container = document.getElementById('insert32-container');
    let palette = randomPalette();
    let grid = buildGrid(container, palette);
    let colorOffset = 0;
    let raf = null;

    function animate() {
        const spans = grid.querySelectorAll('span');
        spans.forEach((s, i) => {
            s.style.color = palette[(i + colorOffset) % palette.length];
        });
        colorOffset = (colorOffset + 1) % palette.length;
        raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);

    container._cleanup = () => { if (raf) cancelAnimationFrame(raf); };

    document.getElementById('insert32-label').textContent = 'mad_punct · animated [0] — R:regenerate';

    document.addEventListener('keydown', function onKey(e) {
        if (e.key === 'r' || e.key === 'R') {
            if (raf) cancelAnimationFrame(raf);
            grid.remove();
            palette = randomPalette();
            grid = buildGrid(container, palette);
            colorOffset = 0;
            raf = requestAnimationFrame(animate);
        }
    });
}

// ── Flavor 1: Static grids with looks 1-5 ─────────────────────────────────

function startFlavor1() {
    const container = document.getElementById('insert32-container');
    let grid = null;

    function show() {
        if (grid) grid.remove();
        const palette = randomPalette();
        container.style.background = `hsl(${Math.random()*360},20%,8%)`;
        grid = buildGrid(container, palette);
    }

    show();
    document.getElementById('insert32-label').textContent = 'mad_punct · grids [1] — 1-5:new look';

    document.addEventListener('keydown', function onKey(e) {
        if (e.key >= '1' && e.key <= '5') show();
    });
}

// ── Main ───────────────────────────────────────────────────────────────────

function teardown() {
    const existing = document.getElementById('insert32-container');
    if (existing) {
        if (existing._cleanup) existing._cleanup();
        existing.remove();
    }
    const s = document.getElementById('insert32-styles');
    if (s) s.remove();
}

function startVisualization(flavor) {
    teardown();

    if (!document.getElementById('insert32-styles')) {
        const style = document.createElement('style');
        style.id = 'insert32-styles';
        style.textContent = INSERT32_CSS;
        document.head.appendChild(style);
    }

    const container = document.createElement('div');
    container.id = 'insert32-container';
    document.body.appendChild(container);

    const label = document.createElement('div');
    label.id = 'insert32-label';
    document.body.appendChild(label);

    const f = flavor !== undefined ? flavor : Math.floor(Math.random() * 2);
    if (f === 0) startFlavor0();
    else startFlavor1();
}

document.addEventListener('keydown', function (e) {
    if (e.key === '0') startVisualization(0);
    if (e.key === '1') startVisualization(1);
});

startVisualization(Math.floor(Math.random() * 2));

})();
