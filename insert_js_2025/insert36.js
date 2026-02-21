// insert36.js — Numbers Systems (AutoFont)
// 4x6 grid of Unicode number system tiles, each cycling through block glyphs
console.log('insert36.js loaded');

// ===== REQUIRED STUB =====
function changeHtmlDisplayInline() {
    // Regenerate — reload page to reshuffle
    location.reload();
}

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
    await loadScript('./js_funct/autoFont.js');
    await loadScript('./js_glyph/2025_block_17/block_hex_numbers_17.js');
    await loadScript('./js_glyph/2025_block_17/block_hex_desc_numbers_17.js');
    await loadScript('./js_glyph/2025_block_17/block_lang_skeleton_17.js');
}

// ===== STYLES =====
function injectStyles() {
    var style = document.createElement('style');
    style.id = 'i36-style';
    style.textContent = `
        :root { --bg:#0f0f12; --panel:#131416; --muted:#9aa0a6; --accent:#ffd166 }
        body { margin:0 !important; padding:0 !important; font-family:Inter,system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial !important; background:var(--bg) !important; color:#eee !important; overflow:hidden !important; height:100% !important; }
        #i36-wrap { position:fixed; top:0; left:0; right:0; bottom:0; padding:1em; overflow:hidden; display:flex; flex-direction:column; z-index:1 }
        html { height:100% !important; }
        #i36-header { display:flex; align-items:center; justify-content:flex-end; gap:12px; margin-bottom:0.8em }
        #i36-header .titleMain { font-weight:800; font-size:1.05rem }
        #i36-grid { display:grid; grid-template-columns:repeat(6,1fr); grid-template-rows:repeat(4,1fr); grid-gap:14px; flex:1; min-height:0 }
        .i36-tile { background:linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.06)); border-radius:12px; padding:12px; height:100%; min-height:0; box-shadow:0 8px 18px rgba(0,0,0,0.6); display:flex; flex-direction:column; align-items:center; justify-content:flex-start; transition:transform 220ms ease,box-shadow 220ms ease; cursor:pointer; position:relative; overflow:visible }
        .i36-tile:hover { transform:translateY(-6px); box-shadow:0 18px 32px rgba(0,0,0,0.7) }
        .i36-tile .circle { width:clamp(64px,14vmin,140px); height:clamp(64px,14vmin,140px); border-radius:50%; display:flex; align-items:center; justify-content:center; background:linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.06)); box-shadow:inset 0 -8px 18px rgba(0,0,0,0.25); transition:background-color 350ms ease,transform 300ms cubic-bezier(.2,.9,.2,1); position:relative; overflow:hidden }
        .i36-tile:hover .circle { transform:scale(1.04) }
        .i36-glyph { font-size:58px; line-height:1; display:block; width:100%; text-align:center; color:var(--glyph-color,#fff); opacity:1; transition:transform 560ms ease,opacity 1060ms ease; position:relative; z-index:2 }
        .i36-glyph.fade-out { opacity:0; transform:scale(0.92) }
        .i36-flash { animation:i36-flash 420ms ease }
        @keyframes i36-flash { 0%{transform:scale(1);box-shadow:0 0 0 0 rgba(255,255,255,0)} 30%{transform:scale(1.02);box-shadow:0 12px 30px rgba(255,255,255,0.08)} 100%{transform:scale(1);box-shadow:none} }
        .i36-glyph.first-highlight { transform:scale(1.08); color:var(--highlight,#ffd166); text-shadow:0 8px 18px rgba(0,0,0,0.18),0 2px 6px rgba(255,209,102,0.06); transition:transform 560ms ease,color 1060ms ease }
        .i36-title { margin-top:10px; font-weight:700; font-size:0.95rem; color:#e7e7e7; text-align:center }
        .i36-desc { font-size:0.78rem; color:var(--muted); text-align:center; margin-top:6px }
    `;
    document.head.appendChild(style);
}

// ===== DOM =====
function createDOM() {
    var wrap = document.createElement('div');
    wrap.id = 'i36-wrap';

    var header = document.createElement('div');
    header.id = 'i36-header';
    header.innerHTML = '<div><div class="titleMain">Numbers \u2014 Systems <span style="color:var(--muted);font-weight:600">(AutoFont)</span></div></div>';
    wrap.appendChild(header);

    var grid = document.createElement('div');
    grid.id = 'i36-grid';
    wrap.appendChild(grid);

    document.body.appendChild(wrap);
}

// ===== INIT =====
async function init() {
    injectStyles();
    createDOM();
    await loadDependencies();

    // Wait for data
    await new Promise(function(resolve) {
        (function check() {
            if (typeof blocks !== 'undefined' && typeof block_hex !== 'undefined' &&
                typeof block_hex_desc !== 'undefined' && typeof block_lang !== 'undefined') return resolve();
            setTimeout(check, 30);
        })();
    });

    if (typeof AutoFont === 'undefined') { console.error('AutoFont not found'); return; }
    await AutoFont.init();

    // ===== CORE LOGIC =====
    var grid = document.getElementById('i36-grid');

    var CONFIG = {
        DISPLAY_COUNT: 24,
        GLYPH_DISPLAY_MS: 12000,
        GLYPH_DISPLAY_JITTER: 4000,
        FADE_OUT_MS: 2020,
        FIRST_GLYPH_HIGHLIGHT_MS: 1200,
        INITIAL_DELAY_MAX_MS: 1800,
        EXCLUDE_BLOCKS: []
    };

    var PALETTES = {
        background: ['#1F2937', '#e2e8f0']
    };

    var blockSystemLookup = {};
    var allSystemsSet = new Set();
    var subgroupCycleState = {};
    var tiles = [];

    function findBlockLangKey(blockName) {
        if (block_lang[blockName]) return blockName;
        var key1 = blockName.replace(/\s+/g, '_'); if (block_lang[key1]) return key1;
        var key2 = blockName.replace(/[^A-Za-z0-9]/g, '_'); if (block_lang[key2]) return key2;
        var normalize = function(s) { return s.toLowerCase().replace(/[^a-z0-9]/g, ''); };
        var target = normalize(blockName);
        for (var k in block_lang) if (normalize(k) === target) return k;
        for (var k in block_lang) if (normalize(k).includes(target) || target.includes(normalize(k))) return k;
        return null;
    }

    function stripLeadingBlockName(desc, blockName) {
        if (!desc || !blockName) return (desc || '').replace(/_/g, ' ').trim().toLowerCase();
        var normalizedDesc = desc.replace(/_/g, ' ').trim().toLowerCase();
        var normalizedBlock = blockName.trim().toLowerCase();
        var prefixes = [normalizedBlock, normalizedBlock.replace(/\s/g, ''), normalizedBlock.split(' ')[0]];
        if (normalizedBlock === 'arabic') prefixes.push('arabic-indic', 'extended arabic-indic');
        else if (normalizedBlock === 'sinhala') prefixes.push('lith');
        for (var i = 0; i < prefixes.length; i++) {
            if (normalizedDesc.startsWith(prefixes[i] + ' ')) return normalizedDesc.substring(prefixes[i].length).trim();
        }
        return normalizedDesc;
    }

    function getDisplayName(blockName) {
        if (blockName === 'Gothic' || blockName === 'Runic') return 'Gothic & Runic';
        return blockName;
    }

    function shuffle(arr) {
        var a = arr.slice();
        for (var i = a.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
        }
        return a;
    }

    function getGlyphDataForBlock(blockName) {
        var glyphs = block_hex[blockName] || [];
        var descs = block_hex_desc[blockName] || [];
        var subSystemName = null;
        var blockHexContext = block_hex;
        var blockHexDescContext = block_hex_desc;

        if (glyphs && typeof glyphs === 'object' && !Array.isArray(glyphs)) {
            if (!subgroupCycleState[blockName]) {
                subgroupCycleState[blockName] = { keys: shuffle(Object.keys(glyphs)), lastIndex: -1 };
            }
            var state = subgroupCycleState[blockName];
            state.lastIndex = (state.lastIndex + 1) % state.keys.length;
            var cycleKey = state.keys[state.lastIndex];
            subSystemName = cycleKey;
            glyphs = block_hex[blockName][cycleKey];
            if (descs && typeof descs === 'object' && !Array.isArray(descs) && descs[cycleKey]) {
                descs = descs[cycleKey];
            }
            blockHexContext = Object.assign({}, block_hex);
            blockHexContext[blockName] = glyphs;
            blockHexDescContext = Object.assign({}, block_hex_desc);
            blockHexDescContext[blockName] = descs;
        }
        return { glyphs: (glyphs || []).slice(), descs: (descs || []).slice(), subSystemName: subSystemName, blockHexContext: blockHexContext, blockHexDescContext: blockHexDescContext };
    }

    var allBlocks = blocks.filter(function(b) { return CONFIG.EXCLUDE_BLOCKS.indexOf(b) === -1; });
    var currentShuffle = shuffle(allBlocks);
    var shuffleIndex = 0;

    function nextBlockFromShuffle() {
        if (shuffleIndex >= currentShuffle.length) {
            PALETTES.background[1] = generateRandomLightColor();
            shuffleIndex = 0;
        }
        return currentShuffle[shuffleIndex++];
    }

    var visibleBlocks = [];
    for (var i = 0; i < CONFIG.DISPLAY_COUNT; i++) visibleBlocks.push(nextBlockFromShuffle());

    // Symmetrical color patterns
    var PATTERNS_BY_INDEX = [
        [0, 5, 18, 23],
        [0, 1, 2, 6, 7, 8, 12, 13, 14, 18, 19, 20],
        [3, 4, 5, 9, 10, 11, 15, 16, 17, 21, 22, 23],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
        [0, 1, 2, 3, 4, 5, 6, 11, 12, 17, 18, 19, 20, 21, 22, 23],
        [0, 2, 4, 7, 9, 11, 12, 14, 16, 19, 21, 23],
        [8, 9, 14, 15],
        [1, 4, 7, 10, 13, 16, 19, 22],
        [1, 4, 19, 22],
        [7, 11, 12, 16],
        [0, 5, 7, 10, 14, 15, 18, 19, 22, 23]
    ];

    var selectedPatternIndices = PATTERNS_BY_INDEX[Math.floor(Math.random() * PATTERNS_BY_INDEX.length)];
    var patternIndexSet = new Set(selectedPatternIndices);

    function generateRandomLightColor() {
        var h = Math.random() * 360;
        var c = 0.05 + Math.random() * 0.1;
        var l = 0.9 + Math.random() * 0.08;
        return 'oklch(' + l.toFixed(3) + ' ' + c.toFixed(3) + ' ' + h.toFixed(0) + ')';
    }

    function hexMix(hex, amt) {
        if (String(hex).startsWith('oklch')) {
            var parts = hex.match(/oklch\(([\d\.]+)[\s,]+([\d\.]+)[\s,]+([\d\.]+)\)/);
            if (parts) {
                var l = Math.max(0, Math.min(1, parseFloat(parts[1]) + amt));
                return 'oklch(' + l.toFixed(3) + ' ' + parts[2] + ' ' + parts[3] + ')';
            }
        }
        var c = String(hex).replace('#', '');
        var num = parseInt(c, 16);
        var r = (num >> 16) + Math.round(255 * amt);
        var g = ((num >> 8) & 0xFF) + Math.round(255 * amt);
        var b = (num & 0xFF) + Math.round(255 * amt);
        r = Math.max(0, Math.min(255, r)); g = Math.max(0, Math.min(255, g)); b = Math.max(0, Math.min(255, b));
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    function pickContrastColor(colorStr) {
        if (String(colorStr).startsWith('oklch')) {
            var parts = colorStr.match(/oklch\(([\d\.]+)/);
            if (parts) return parseFloat(parts[1]) > 0.65 ? '#111' : '#fff';
        }
        var c = String(colorStr).replace('#', '');
        var r, g, b;
        if (c.length === 3) { r = parseInt(c[0]+c[0],16); g = parseInt(c[1]+c[1],16); b = parseInt(c[2]+c[2],16); }
        else if (c.length === 6) { r = parseInt(c.substring(0,2),16); g = parseInt(c.substring(2,4),16); b = parseInt(c.substring(4,6),16); }
        else return '#111';
        return (0.2126*r + 0.7152*g + 0.0722*b) > 160 ? '#111' : '#fff';
    }

    function applyColorToTile(tile, colorState) {
        var bg = PALETTES.background[colorState];
        tile.circle.style.background = 'linear-gradient(180deg, ' + hexMix(bg, 0.04) + ', ' + hexMix(bg, -0.06) + ')';
        tile.glyphElem.style.color = pickContrastColor(bg);
        tile.glyphElem.style.setProperty('--highlight', hexMix(bg, 0.5));
        tile.elem.style.border = '1px solid ' + hexMix(bg, -0.18);
    }

    function toggleTileColor(tile) {
        tile.colorState = tile.colorState === 0 ? 1 : 0;
        applyColorToTile(tile, tile.colorState);
    }

    function createTile(blockName, idx) {
        var tile = document.createElement('div');
        tile.className = 'i36-tile';
        tile.dataset.block = blockName;
        tile.dataset.idx = idx;

        var circle = document.createElement('div');
        circle.className = 'circle';
        if (idx === 0 || idx === 1) circle.style.opacity = '0.8';
        var glyphSpan = document.createElement('div');
        glyphSpan.className = 'i36-glyph';
        glyphSpan.id = 'i36-glyph-' + idx;
        glyphSpan.innerHTML = '&nbsp;';
        circle.appendChild(glyphSpan);

        var title = document.createElement('div');
        title.className = 'i36-title';
        var descDiv = document.createElement('div');
        descDiv.className = 'i36-desc';

        tile.appendChild(circle);
        tile.appendChild(title);
        tile.appendChild(descDiv);

        var data = getGlyphDataForBlock(blockName);
        var glyphList = data.glyphs;
        var blockHexContext = data.blockHexContext;
        var blockHexDescContext = data.blockHexDescContext;

        title.textContent = getDisplayName(blockName);

        grid.appendChild(tile);

        var blKey = findBlockLangKey(blockName);
        var systems = blKey && block_lang[blKey] ? block_lang[blKey] : ['(no system)'];
        systems.forEach(function(s) { allSystemsSet.add(s); });
        blockSystemLookup[blockName] = systems;

        var blockDesc = data.descs.length ? data.descs[0].replace(/_/g, ' ') : '';
        blockDesc = stripLeadingBlockName(blockDesc, blockName);
        descDiv.textContent = (blockDesc || '').replace(/_/g, ' ').trim().toLowerCase();

        var pausedByUser = false;
        var glyphIndex = 0;

        function showNextGlyph() {
            var g = glyphSpan;
            if (pausedByUser) return;
            if (glyphIndex >= glyphList.length) {
                switchToNextBlock();
                return;
            }

            // Fade out
            g.classList.add('fade-out');
            setTimeout(function() {
                try {
                    var usedBlock = tile.dataset.block;
                    var glyphVal = glyphList[glyphIndex++];
                    var glyphData = AutoFont.generateGlyph(blockHexContext, blockHexDescContext, block_lang, lang_font, true, { blocks: [usedBlock], glyph: glyphVal }, null);

                    if (tile.dataset.block !== usedBlock) return;

                    if (glyphData.fontStack) g.style.fontFamily = glyphData.fontStack;
                    g.innerHTML = '&#x' + glyphVal + ';';
                    var rawDesc = glyphData.desc.replace(/_/g, ' ');
                    descDiv.textContent = stripLeadingBlockName(rawDesc, blockName).replace(/_/g, ' ').trim().toLowerCase();
                    tile.title = 'hex: ' + glyphVal + '\ndescription: ' + rawDesc + '\nglyph ' + glyphIndex + '/' + glyphList.length;

                    if (glyphIndex === 1) {
                        g.classList.add('first-highlight');
                        setTimeout(function() { g.classList.remove('first-highlight'); }, CONFIG.FIRST_GLYPH_HIGHLIGHT_MS);
                    }

                    g.classList.remove('fade-out');
                } catch (e) {
                    console.error('showNextGlyph error', blockName, e);
                }

                setTimeout(function() { if (!pausedByUser) showNextGlyph(); }, CONFIG.GLYPH_DISPLAY_MS + Math.floor(Math.random() * CONFIG.GLYPH_DISPLAY_JITTER));
            }, CONFIG.FADE_OUT_MS);
        }

        function switchToNextBlock() {
            tile.classList.add('i36-flash');
            setTimeout(function() { tile.classList.remove('i36-flash'); }, 700);

            var next = nextBlockFromShuffle();
            if (!next) next = allBlocks[0];

            var nextData = getGlyphDataForBlock(next);
            blockHexContext = nextData.blockHexContext;
            blockHexDescContext = nextData.blockHexDescContext;

            tile.dataset.block = next;
            title.textContent = getDisplayName(next);
            blockName = next;

            var blKey2 = findBlockLangKey(next);
            var systems2 = blKey2 && block_lang[blKey2] ? block_lang[blKey2] : ['(no system)'];
            blockSystemLookup[next] = systems2;

            var tileRecord = tiles.find(function(t) { return t.idx === idx; });
            if (tileRecord) { tileRecord.block = next; tileRecord.systems = systems2; }

            glyphList.length = 0;
            Array.prototype.push.apply(glyphList, nextData.glyphs);
            glyphIndex = 0;

            title.title = glyphList.length + ' glyphs';

            var blockDesc2 = nextData.descs.length ? nextData.descs[0].replace(/_/g, ' ') : '';
            blockDesc2 = stripLeadingBlockName(blockDesc2, next);
            descDiv.textContent = (blockDesc2 || '').replace(/_/g, ' ').trim().toLowerCase();

            glyphSpan.innerHTML = '&nbsp;';
            glyphSpan.classList.remove('fade-out');
            glyphSpan.style.opacity = '';

            if (glyphList.length > 0) {
                try {
                    var firstVal = glyphList[0];
                    var usedBlockFirst = tile.dataset.block;
                    var glyphDataFirst = AutoFont.generateGlyph(blockHexContext, blockHexDescContext, block_lang, lang_font, true, { blocks: [usedBlockFirst], glyph: firstVal }, null);
                    if (tile.dataset.block !== usedBlockFirst) return;
                    if (glyphDataFirst.fontStack) glyphSpan.style.fontFamily = glyphDataFirst.fontStack;
                    glyphSpan.innerHTML = '&#x' + firstVal + ';';
                    var rawFirstDesc = glyphDataFirst.desc.replace(/_/g, ' ');
                    descDiv.textContent = stripLeadingBlockName(rawFirstDesc, usedBlockFirst).replace(/_/g, ' ').trim().toLowerCase();
                    tile.title = 'hex: ' + firstVal + '\ndescription: ' + rawFirstDesc + '\nglyph 1/' + glyphList.length;
                    glyphIndex = 1;
                    glyphSpan.classList.add('first-highlight');
                    setTimeout(function() { glyphSpan.classList.remove('first-highlight'); }, CONFIG.FIRST_GLYPH_HIGHLIGHT_MS);
                } catch (e) {
                    console.error('first glyph render error', next, e);
                }
            }

            var currentTile = tiles.find(function(t) { return t.idx === idx; });
            if (currentTile) toggleTileColor(currentTile);

            setTimeout(function() { if (!pausedByUser) showNextGlyph(); }, CONFIG.GLYPH_DISPLAY_MS + Math.floor(Math.random() * CONFIG.GLYPH_DISPLAY_JITTER));
        }

        tile.addEventListener('click', function() {
            pausedByUser = !pausedByUser;
            tile.style.opacity = pausedByUser ? '0.6' : '1';
            if (!pausedByUser) showNextGlyph();
        });

        var initialColorState = patternIndexSet.has(idx) ? 1 : 0;
        var tileRecord = { elem: tile, block: blockName, systems: systems, glyphCount: glyphList.length, idx: idx, circle: circle, glyphElem: glyphSpan, colorState: initialColorState, pausedByUser: false };
        tiles.push(tileRecord);
        applyColorToTile(tileRecord, initialColorState);

        setTimeout(function() { showNextGlyph(); }, 80 + Math.floor(Math.random() * CONFIG.INITIAL_DELAY_MAX_MS));
    }

    for (var i = 0; i < CONFIG.DISPLAY_COUNT; i++) {
        createTile(visibleBlocks[i], i);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
