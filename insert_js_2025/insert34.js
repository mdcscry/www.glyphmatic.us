// insert34.js — Artist Grid
// 10×10 color grid cycling through ~244 curated artist palettes
console.log('insert34.js loaded');

// ===== REQUIRED STUB =====
function changeHtmlDisplayInline() {
    skipToNext();
}

// ===== STATE =====
var i34_cells1 = [];
var i34_cells2 = [];
var i34_currentPaletteKey = null;
var i34_currentBg = '#ffffff';
var i34_panelTimer = null;
var i34_morphTimer = null;
var i34_bgTimer = null;
var i34_activeGenre = '';
var i34_activeArtistQuery = '';
var i34_paletteGenre = {};  // built from .school property after load

// ===== DEPENDENCY LOADING =====
function loadScript(src) {
    return new Promise(function(resolve, reject) {
        var script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

async function loadDependencies() {
    var paletteFiles = [
        'impressionism',
        'expressionism_fauvism',
        'cubism_bauhaus',
        'surrealism',
        'abstract_expressionism',
        'pop_minimal',
        'old_masters',
        'americas',
        'contemporary'
    ];

    // Init global if not already present
    if (!window.ARTIST_PALETTES) window.ARTIST_PALETTES = {};

    for (var i = 0; i < paletteFiles.length; i++) {
        await loadScript('./js_funct/artist_palettes/' + paletteFiles[i] + '.js');
    }
    await loadScript('./js_funct/artist_palettes/_loaded.js');

    // Build genre map from each palette's .school property
    var keys = Object.keys(ARTIST_PALETTES);
    for (var j = 0; j < keys.length; j++) {
        var k = keys[j];
        if (ARTIST_PALETTES[k].school) {
            i34_paletteGenre[k] = ARTIST_PALETTES[k].school;
        }
    }
}

// ===== STYLES =====
function injectStyles() {
    var style = document.createElement('style');
    style.id = 'i34-style';
    style.textContent = `
        body {
            background: #000000 !important;
            transition: background-color 30s ease !important;
            margin: 0 !important;
            overflow: hidden !important;
        }
        #i34-grid-wrapper {
            position: fixed;
            inset: 0;
            display: flex;
            gap: 50px;
            align-items: center;
            justify-content: center;
            pointer-events: none;
        }
        #i34-grid-wrapper > * { pointer-events: auto; }
        #i34-grid, #i34-grid2 {
            display: grid;
            grid-template-columns: repeat(10, 1fr);
            gap: 3px;
        }
        #i34-grid-wrapper.single #i34-grid {
            width: min(70vw, 70vh);
            height: min(70vw, 70vh);
        }
        #i34-grid-wrapper.single #i34-grid2 { display: none; }
        #i34-grid-wrapper.dual #i34-grid,
        #i34-grid-wrapper.dual #i34-grid2 {
            width: min(47vw, 70vh);
            height: min(47vw, 70vh);
        }
        .i34-cell {
            transition: background-color 14s ease, border-radius 14s ease;
            background: transparent;
        }
        #i34-info-btn {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.65);
            color: #fff;
            border: none;
            border-radius: 20px;
            padding: 7px 18px;
            font-family: monospace;
            font-size: 13px;
            cursor: pointer;
            white-space: nowrap;
            z-index: 100;
            transition: background 0.3s;
        }
        #i34-info-panel {
            display: none;
            position: fixed;
            bottom: 58px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.75);
            color: #ddd;
            border-radius: 12px;
            padding: 12px 20px;
            font-family: monospace;
            font-size: 12px;
            line-height: 1.7;
            z-index: 100;
            width: 280px;
            text-align: center;
        }
        #i34-info-panel.open { display: block; }
        #i34-info-panel strong { color: #fff; font-size: 13px; }
        .i34-panel-thumb {
            width: 100%;
            border-radius: 6px;
            margin-bottom: 8px;
            display: block;
            cursor: pointer;
        }
        #i34-lightbox {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.85);
            z-index: 200;
            cursor: pointer;
            align-items: center;
            justify-content: center;
        }
        #i34-lightbox.open { display: flex; }
        #i34-lightbox img {
            max-width: 90vw;
            max-height: 90vh;
            border-radius: 8px;
            box-shadow: 0 0 40px rgba(0,0,0,0.5);
        }
        #i34-school-filter {
            display: none;
            position: fixed;
            top: 24px;
            right: 24px;
            z-index: 100;
        }
        #i34-school-filter select {
            background: rgba(0,0,0,0.65);
            color: #fff;
            border: none;
            border-radius: 20px;
            padding: 7px 18px;
            font-family: monospace;
            font-size: 13px;
            cursor: pointer;
            outline: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            padding-right: 32px;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23fff'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 12px center;
        }
        #i34-school-filter select:hover { background-color: rgba(0,0,0,0.8); }
        #i34-school-filter select option { background: #222; color: #fff; }
        #i34-next-btn {
            position: fixed;
            bottom: 20px;
            right: 24px;
            background: rgba(0,0,0,0.65);
            color: #fff;
            border: none;
            border-radius: 20px;
            padding: 7px 18px;
            font-family: monospace;
            font-size: 13px;
            cursor: pointer;
            z-index: 100;
            transition: background 0.3s;
        }
        #i34-next-btn:hover { background: rgba(0,0,0,0.85); }
    `;
    document.head.appendChild(style);
}

// ===== DOM =====
function createDOM() {
    // Grid wrapper
    var wrapper = document.createElement('div');
    wrapper.id = 'i34-grid-wrapper';
    wrapper.className = 'single';

    var grid1 = document.createElement('div');
    grid1.id = 'i34-grid';
    var grid2 = document.createElement('div');
    grid2.id = 'i34-grid2';

    // Build 100 cells per grid
    for (var i = 0; i < 100; i++) {
        var c1 = document.createElement('div');
        c1.className = 'i34-cell';
        grid1.appendChild(c1);
        i34_cells1.push(c1);

        var c2 = document.createElement('div');
        c2.className = 'i34-cell';
        grid2.appendChild(c2);
        i34_cells2.push(c2);
    }

    wrapper.appendChild(grid1);
    wrapper.appendChild(grid2);
    document.body.appendChild(wrapper);

    // Lightbox
    var lightbox = document.createElement('div');
    lightbox.id = 'i34-lightbox';
    var lbImg = document.createElement('img');
    lbImg.id = 'i34-lightbox-img';
    lightbox.appendChild(lbImg);
    lightbox.addEventListener('click', function() {
        lightbox.classList.remove('open');
    });
    document.body.appendChild(lightbox);

    // School filter dropdown
    var schoolFilter = document.createElement('div');
    schoolFilter.id = 'i34-school-filter';
    var schoolSelect = document.createElement('select');
    schoolSelect.id = 'i34-school-select';
    var defaultOpt = document.createElement('option');
    defaultOpt.value = '';
    defaultOpt.textContent = 'All Schools';
    schoolSelect.appendChild(defaultOpt);
    schoolFilter.appendChild(schoolSelect);
    document.body.appendChild(schoolFilter);

    // Info panel
    var panel = document.createElement('div');
    panel.id = 'i34-info-panel';
    panel.addEventListener('click', function(e) {
        if (e.target && e.target.className === 'i34-panel-thumb') {
            lbImg.src = e.target.src;
            lightbox.classList.add('open');
        }
    });
    document.body.appendChild(panel);

    // Info button
    var btn = document.createElement('button');
    btn.id = 'i34-info-btn';
    btn.textContent = '\u25B2 artist';
    btn.addEventListener('click', function() {
        panel.classList.toggle('open');
        btn.textContent = panel.classList.contains('open') ? '\u25BC artist' : '\u25B2 artist';
    });
    document.body.appendChild(btn);

    // Next button
    var nextBtn = document.createElement('button');
    nextBtn.id = 'i34-next-btn';
    nextBtn.textContent = 'next \u2192';
    nextBtn.addEventListener('click', function() { skipToNext(); });
    document.body.appendChild(nextBtn);
}

// ===== HELPERS =====
function matchesArtistQuery(key, query) {
    if (!query) return true;
    var lc = query.toLowerCase().replace(/[\s\-_]/g, '');
    var artistNorm = ARTIST_PALETTES[key].artist.toLowerCase().replace(/[\s\-_]/g, '');
    var keyNorm = key.toLowerCase().replace(/[\s\-_]/g, '');
    return artistNorm.indexOf(lc) !== -1 || keyNorm.indexOf(lc) !== -1;
}

function getFilteredKeys() {
    return Object.keys(ARTIST_PALETTES).filter(function(k) {
        var genreOk = !i34_activeGenre || i34_paletteGenre[k] === i34_activeGenre;
        var artistOk = matchesArtistQuery(k, i34_activeArtistQuery);
        return genreOk && artistOk;
    });
}

function pickRandomKey(exclude) {
    var keys = getFilteredKeys().filter(function(k) { return k !== exclude; });
    if (!keys.length) keys = getFilteredKeys();
    if (!keys.length) keys = Object.keys(ARTIST_PALETTES);
    return keys[Math.floor(Math.random() * keys.length)];
}

function pickShapeMode() {
    var r = Math.random();
    if (r < 0.50) return 'squares';
    if (r < 0.90) return 'mixed';
    return 'circles';
}

function cellRadius(mode) {
    if (mode === 'circles') return '50%';
    if (mode === 'squares') return '0%';
    return Math.random() < 0.4 ? '50%' : '0%';
}

function bgFromKey(key) {
    var p = ARTIST_PALETTES[key];
    var bg = p.bg;
    var r = parseInt(bg.slice(1, 3), 16);
    var g = parseInt(bg.slice(3, 5), 16);
    var b = parseInt(bg.slice(5, 7), 16);
    var lum = (r * 299 + g * 587 + b * 114) / 1000;
    return lum > 160 ? '#ffffff' : '#000000';
}

function weightedColor(colors, pcts) {
    if (!pcts || !pcts.length) return colors[Math.floor(Math.random() * colors.length)];
    var total = pcts.reduce(function(a, b) { return a + b; }, 0);
    var r = Math.random() * total;
    var acc = 0;
    for (var i = 0; i < colors.length; i++) {
        acc += (pcts[i] || 0);
        if (r <= acc) return colors[i];
    }
    return colors[colors.length - 1];
}

function fillGrid(cellArr, colors, pcts, shapeMode) {
    var n = cellArr.length;
    var nColors = colors.length;
    var assignments = [];
    for (var i = 0; i < nColors; i++) assignments.push(colors[i]);
    var transparentCount = Math.round(n * 0.35);
    for (var i = 0; i < transparentCount; i++) assignments.push(null);
    while (assignments.length < n) {
        assignments.push(weightedColor(colors, pcts));
    }
    // Shuffle (Fisher-Yates)
    for (var i = assignments.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = assignments[i]; assignments[i] = assignments[j]; assignments[j] = tmp;
    }
    cellArr.forEach(function(cell, idx) {
        cell.style.borderRadius = cellRadius(shapeMode);
        cell.style.backgroundColor = assignments[idx] || 'transparent';
    });
}

function applyPalette(key, instant) {
    i34_currentPaletteKey = key;
    var p = ARTIST_PALETTES[key];
    var shapeMode = pickShapeMode();
    var wrapper = document.getElementById('i34-grid-wrapper');
    var panel = document.getElementById('i34-info-panel');

    if (i34_panelTimer) { clearTimeout(i34_panelTimer); i34_panelTimer = null; }

    // ~20% chance: dual grid
    if (Math.random() < 0.20) {
        wrapper.className = 'dual';
        fillGrid(i34_cells1, p.colors, p.pcts, shapeMode);
        fillGrid(i34_cells2, p.colors, p.pcts, shapeMode);
    } else {
        wrapper.className = 'single';
        fillGrid(i34_cells1, p.colors, p.pcts, shapeMode);
    }

    var desc = p.name.indexOf(' \u2014 ') !== -1 ? p.name.split(' \u2014 ')[1] : p.name;
    var html = '<img class="i34-panel-thumb" src="./tools/paintings/' + key + '.jpg"'
        + ' onerror="this.style.display=\'none\'">'
        + '<strong>' + p.artist + '</strong>'
        + '<br><span style="opacity:0.85; font-size:11px; font-style:italic;">' + (p.school || '') + '</span>'
        + '<br>' + desc
        + '<br><span style="opacity:0.7;">' + p.ref + '</span>';

    if (!panel.innerHTML || instant) {
        panel.innerHTML = html;
    } else {
        i34_panelTimer = setTimeout(function() { panel.innerHTML = html; i34_panelTimer = null; }, 7000);
    }
}

function skipToNext() {
    var allCells = i34_cells1.concat(i34_cells2);
    allCells.forEach(function(c) { c.style.transition = 'none'; });
    document.body.style.transition = 'none';
    applyPalette(pickRandomKey(i34_currentPaletteKey), true);
    i34_currentBg = bgFromKey(i34_currentPaletteKey);
    document.body.style.backgroundColor = i34_currentBg;
    void document.body.offsetHeight;
    allCells.forEach(function(c) { c.style.transition = ''; });
    document.body.style.transition = '';
}

function scheduleMorph() {
    var delay = 30000 + Math.random() * 60000;
    i34_morphTimer = setTimeout(function() {
        applyPalette(pickRandomKey(i34_currentPaletteKey));
        scheduleMorph();
    }, delay);
}

function scheduleBgShift() {
    var delay = 120000 + Math.random() * 180000;
    i34_bgTimer = setTimeout(function() {
        var newBg = bgFromKey(i34_currentPaletteKey);
        if (newBg !== i34_currentBg) {
            i34_currentBg = newBg;
            document.body.style.backgroundColor = i34_currentBg;
        }
        scheduleBgShift();
    }, delay);
}

function pickKeyForArtist(name) {
    var matches = Object.keys(ARTIST_PALETTES).filter(function(k) {
        return matchesArtistQuery(k, name);
    });
    if (matches.length === 0) return null;
    return matches[Math.floor(Math.random() * matches.length)];
}

// ===== KEYBOARD =====
document.addEventListener('keydown', function(e) {
    if (e.key === 'n' || e.key === 'ArrowRight') {
        skipToNext();
    } else if (e.key === 'i') {
        var panel = document.getElementById('i34-info-panel');
        var btn = document.getElementById('i34-info-btn');
        panel.classList.toggle('open');
        btn.textContent = panel.classList.contains('open') ? '\u25BC artist' : '\u25B2 artist';
    }
});

// ===== INIT =====
async function init() {
    await loadDependencies();
    injectStyles();
    createDOM();

    var params = new URLSearchParams(window.location.search);
    var urlArtist = params.get('artist');
    i34_activeArtistQuery = urlArtist || '';

    // Populate genre dropdown if ?school=true
    if (params.get('school') === 'true') {
        var schoolFilter = document.getElementById('i34-school-filter');
        var schoolSelect = document.getElementById('i34-school-select');
        schoolFilter.style.display = 'block';
        var genres = [];
        Object.keys(i34_paletteGenre).forEach(function(k) {
            var g = i34_paletteGenre[k];
            if (genres.indexOf(g) === -1) genres.push(g);
        });
        genres.forEach(function(g) {
            var opt = document.createElement('option');
            opt.value = g;
            opt.textContent = g;
            schoolSelect.appendChild(opt);
        });
        schoolSelect.addEventListener('change', function() {
            i34_activeGenre = this.value;
            applyPalette(pickRandomKey(i34_currentPaletteKey));
            i34_currentBg = bgFromKey(i34_currentPaletteKey);
            document.body.style.backgroundColor = i34_currentBg;
        });
    }

    var firstKey = (urlArtist && pickKeyForArtist(urlArtist)) || pickRandomKey(null);
    i34_currentBg = bgFromKey(firstKey);

    // Snap first palette instantly — no transitions on initial load
    var allCells = i34_cells1.concat(i34_cells2);
    allCells.forEach(function(c) { c.style.transition = 'none'; });
    document.body.style.transition = 'none';
    document.body.style.backgroundColor = i34_currentBg;
    applyPalette(firstKey, true);
    void document.body.offsetHeight;  // force reflow
    allCells.forEach(function(c) { c.style.transition = ''; });
    document.body.style.transition = '';

    // Open panel on load if ?artist= or ?panel=open
    if (urlArtist || params.get('panel') === 'open') {
        document.getElementById('i34-info-panel').classList.add('open');
        document.getElementById('i34-info-btn').textContent = '\u25BC artist';
    }

    scheduleMorph();
    scheduleBgShift();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
