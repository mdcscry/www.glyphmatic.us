/**
 * insert32.js - Mad Punctuation (Multi-Flavor)
 *
 * Flavor 0: mad_punct.htm    - structured cells, animated middle column, 5 looks
 * Flavor 1: mad_punct_grids  - simple packed cells, 5 looks, per-cell backgrounds
 *
 * Keys 1-5: trigger looks. Keys 0/1: switch flavor.
 */

(function () {

// ── Characters ──────────────────────────────────────────────────────────────
const PUNCT = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~\xA1\xA2\xA3\xA4\xA5\xA6\xA7\xA8\xA9\xAA\xAB\xAC\xAE\xAF\xB0\xB1\xB4\xB5\xB6\xB7\xB8\xBB\xBF\xD7\xF7\u2010\u2011\u2012\u2013\u2014\u2015\u2016\u2017\u2018\u2019\u201A\u201B\u201C\u201D\u201E\u201F\u2020\u2021\u2022\u2026\u2030\u2031\u2032\u2033\u2034\u2035\u2036\u2037\u2039\u203A\u203B\u203C\u203D\u203E\u2044\u2045\u2046\u2047\u2048\u2049\u204A\u204E\u204F\u2500\u2501\u2502\u2503\u250C\u250F\u2510\u2513\u2514\u2517\u2518\u251B\u251C\u253C\u2550\u2551\u2554\u2557\u255A\u255D\u2560\u2563\u2566\u2569\u256C\u2571\u2572\u2573';

function randomChars() {
    const selected = new Set();
    while (selected.size < 4) selected.add(PUNCT[Math.floor(Math.random() * PUNCT.length)]);
    const arr = Array.from(selected);
    return { main: arr.slice(0, 3), middle: arr[3] };
}

// ── Color schemes (5 looks) ─────────────────────────────────────────────────
function interpolateGray(hex1, hex2, factor) {
    const v1 = parseInt(hex1, 16), v2 = parseInt(hex2, 16);
    const v = Math.round(v1 + (v2 - v1) * factor).toString(16).toUpperCase().padStart(2, '0');
    return `#${v}${v}${v}`;
}

function generateColors(lookType) {
    const colors = [];
    let bg;

    if (lookType === 1) {
        // Rainbow HSL on black
        bg = '#000000';
        const startHue = Math.random() * 360;
        for (let i = 0; i < 200; i++) {
            const hue = (startHue + (i / 200) * 360 * 3) % 360;
            colors.push(`hsl(${hue},100%,60%)`);
        }
    } else if (lookType === 2) {
        // Random gray bg + random OKLCH palette sweep
        const grayHex = Math.floor(Math.random() * 16).toString(16).toUpperCase().repeat(6);
        bg = `#${grayHex}`;
        const h0 = Math.random() * 360, h1 = (h0 + 120 + Math.random() * 120) % 360;
        for (let i = 0; i < 200; i++) {
            const t = i / 200;
            const h = (h0 + (h1 - h0) * t) % 360;
            colors.push(`hsl(${h},80%,${45 + t * 20}%)`);
        }
    } else if (lookType === 3) {
        // Black bg, dark-to-mid gray
        bg = '#000000';
        for (let i = 0; i < 200; i++) colors.push(interpolateGray('33', 'AA', i / 200));
    } else if (lookType === 4) {
        // Off-white bg, mid-to-light gray
        bg = '#F5F5F5';
        for (let i = 0; i < 200; i++) colors.push(interpolateGray('88', 'FF', i / 200));
    } else {
        // Look 5: White bg, black-to-white
        bg = '#FFFFFF';
        for (let i = 0; i < 200; i++) colors.push(interpolateGray('00', 'FF', i / 200));
    }
    return { bg, colors };
}

function packHTML(chars, colors, count) {
    let html = '';
    for (let i = 0; i < count; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        html += `<span class="mp-char" style="color:${colors[i % colors.length]}">${ch}</span>`;
    }
    return html;
}

// ── CSS ───────────────────────────────────────────────────────────────────────
const CSS = `
    #mp-overlay {
        position: fixed; top:0; left:0; width:100vw; height:100vh;
        display:flex; align-items:center; justify-content:center;
        z-index:9999;
    }
    #mp-box {
        width:80vw; height:80vh;
        border:1px solid #444;
        display:grid;
        gap:10px; padding:2px;
        box-sizing:border-box;
        overflow:hidden;
    }
    .mp-cell {
        box-sizing:border-box; overflow:hidden;
        display:flex; flex-direction:column;
    }
    .mp-top {
        height:20%; overflow:hidden;
        word-break:break-all; font-size:1.2em; line-height:1.2;
        padding:4px; box-sizing:border-box;
    }
    .mp-bottom {
        height:80%; display:flex; flex-direction:row;
    }
    .mp-left, .mp-right {
        flex:45; overflow:hidden;
        word-break:break-all; font-size:1.2em; line-height:1.2;
        padding:4px; box-sizing:border-box;
    }
    .mp-mid {
        flex:10; overflow:hidden;
        word-break:break-all; font-size:1.2em; line-height:1.2;
        text-align:center;
        border-left:1px solid rgba(128,128,128,0.25);
        border-right:1px solid rgba(128,128,128,0.25);
        padding:4px; box-sizing:border-box;
    }
    .mp-simple-cell {
        box-sizing:border-box; overflow:hidden;
        word-break:break-all; font-size:1.2em; line-height:1.2;
        padding:10px;
    }
    .mp-char { display:inline; }
    #mp-label {
        position:fixed; bottom:12px; right:12px;
        color:rgba(255,255,255,0.2); font-family:monospace; font-size:11px;
        z-index:10001; pointer-events:none;
    }
`;

const LAYOUTS = [
    { rows:1, cols:1 },
    { rows:1, cols:2 },
    { rows:2, cols:2 },
    { rows:3, cols:3 },
];

// ── Flavor 0: mad_punct.htm ───────────────────────────────────────────────────
function startFlavor0() {
    const overlay = document.getElementById('mp-overlay');
    const box = document.getElementById('mp-box');
    let rafId = null;

    function displayLook(lookNum) {
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
        box.innerHTML = '';
        const { bg, colors } = generateColors(lookNum);
        overlay.style.background = bg;
        box.style.background = bg;

        const layout = LAYOUTS[Math.floor(Math.random() * LAYOUTS.length)];
        box.style.gridTemplateRows = `repeat(${layout.rows},1fr)`;
        box.style.gridTemplateColumns = `repeat(${layout.cols},1fr)`;
        const n = layout.rows * layout.cols;

        const seeSaw = lookNum >= 3 ? colors.concat([...colors].reverse()) : colors;

        for (let i = 0; i < n; i++) {
            const { main, middle } = randomChars();

            const cell = document.createElement('div');
            cell.className = 'mp-cell';
            cell.style.backgroundColor = bg;

            const top = document.createElement('div'); top.className = 'mp-top';
            const bottom = document.createElement('div'); bottom.className = 'mp-bottom';
            const left = document.createElement('div'); left.className = 'mp-left';
            const mid = document.createElement('div'); mid.className = 'mp-mid';
            const right = document.createElement('div'); right.className = 'mp-right';

            top.innerHTML = packHTML(main, seeSaw, 600);
            left.innerHTML = packHTML(main, seeSaw, 1500);
            mid.innerHTML = packHTML([middle], colors, 400);
            right.innerHTML = packHTML(main, [...seeSaw].reverse(), 1500);

            bottom.append(left, mid, right);
            cell.append(top, bottom);
            box.appendChild(cell);
        }

        // Animate middle columns
        const interval = lookNum === 1 ? 150 : 50;
        let colorOffset = 0, lastTime = 0;
        function animate(ts) {
            if (!lastTime) lastTime = ts;
            if (ts - lastTime > interval) {
                lastTime = ts;
                colorOffset = (colorOffset + 1) % seeSaw.length;
                document.querySelectorAll('.mp-mid .mp-char').forEach((s, i) => {
                    s.style.color = seeSaw[(i + colorOffset) % seeSaw.length];
                });
            }
            rafId = requestAnimationFrame(animate);
        }
        rafId = requestAnimationFrame(animate);

        document.getElementById('mp-label').textContent = `mad_punct · structured [0] — look ${lookNum}`;
    }

    const startLook = Math.floor(Math.random() * 5) + 1;
    displayLook(startLook);

    document.addEventListener('keydown', function f0key(e) {
        if (e.key >= '1' && e.key <= '5') displayLook(parseInt(e.key));
    });

    return { cleanup: () => { if (rafId) cancelAnimationFrame(rafId); } };
}

// ── Flavor 1: mad_punct_grids.htm ────────────────────────────────────────────
function startFlavor1() {
    const overlay = document.getElementById('mp-overlay');
    const box = document.getElementById('mp-box');

    function displayLook(lookNum) {
        box.innerHTML = '';
        const { bg, colors } = generateColors(lookNum);
        overlay.style.background = bg;
        box.style.background = '#444'; // gap color

        const layout = LAYOUTS[Math.floor(Math.random() * LAYOUTS.length)];
        box.style.gridTemplateRows = `repeat(${layout.rows},1fr)`;
        box.style.gridTemplateColumns = `repeat(${layout.cols},1fr)`;
        const cellCount = layout.rows * layout.cols;
        const charCount = Math.floor(20000 / cellCount);

        for (let i = 0; i < cellCount; i++) {
            const { main } = randomChars();
            const { bg: cellBg } = generateColors(lookNum);

            const cell = document.createElement('div');
            cell.className = 'mp-simple-cell';
            cell.style.backgroundColor = cellBg;
            cell.innerHTML = packHTML(main, colors, charCount);
            box.appendChild(cell);
        }

        document.getElementById('mp-label').textContent = `mad_punct · grids [1] — look ${lookNum}`;
    }

    const startLook = Math.floor(Math.random() * 5) + 1;
    displayLook(startLook);

    document.addEventListener('keydown', function f1key(e) {
        if (e.key >= '1' && e.key <= '5') displayLook(parseInt(e.key));
    });

    return { cleanup: () => {} };
}

// ── Main ──────────────────────────────────────────────────────────────────────
let currentCleanup = null;

function teardown() {
    if (currentCleanup) { currentCleanup(); currentCleanup = null; }
    document.getElementById('mp-overlay')?.remove();
    document.getElementById('mp-label')?.remove();
    document.getElementById('mp-styles')?.remove();
}

function startVisualization(flavor) {
    teardown();

    const style = document.createElement('style');
    style.id = 'mp-styles';
    style.textContent = CSS;
    document.head.appendChild(style);

    const overlay = document.createElement('div'); overlay.id = 'mp-overlay';
    const box = document.createElement('div'); box.id = 'mp-box';
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    const label = document.createElement('div'); label.id = 'mp-label';
    document.body.appendChild(label);

    const f = flavor !== undefined ? flavor : Math.floor(Math.random() * 2);
    const result = f === 0 ? startFlavor0() : startFlavor1();
    currentCleanup = result.cleanup;
}

document.addEventListener('keydown', function (e) {
    if (e.key === '0') startVisualization(0);
    // Note: '1' is also used for looks, so flavor switch is only on '0'
});

startVisualization(Math.floor(Math.random() * 2));

})();
