(function() {
    'use strict';

    var INSERT37 = {
        currentFlavor: 0,
        root: null,
        svg: null,
        canvas: null,
        ctx: null,
        hudEl: null,
        toggleBtn: null,
        styleEl: null,
        runToken: 0,
        resizeAttached: false,
        keyAttached: false,
        paletteState: null,
        paletteModeIndex: 0,
        hudVisible: false,
        family: 'insert37',
        flavorNames: [
            'contours-grid',
            'optimization-landscapes',
            'function-contours',
            'perlin-noise',
            'perlin-glyphs',
            'sincos-contour',
            'contour-blocks',
            'perlin-square',
            'perlin-square-circles'
        ]
    };

    var PALETTE_MODES = ['artist', 'oklch', 'hybrid'];
    var GRID = 5;
    var GAP = 3;
    var RES = 80;
    var D3_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js';
    var D3_CONTOUR_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/d3-contour/4.0.2/d3-contour.min.js';
    var GLYPH_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞĀĂĄĆĈĊČĎĐĒĔĖĘĚĜĞĠĢĤĦ';
    var BLOCKS = ['▀','▄','█','▁','▂','▃','▅','▆','▇','▉','▊','▋','▌','▍','▎','▏'];
    var DIVERGING_PAIRS = [
        ['#b2182b','#f7f7f7','#2166ac'],
        ['#d73027','#ffffbf','#4575b4'],
        ['#762a83','#f7f7f7','#1b7837'],
        ['#b35806','#f7f7f7','#542788'],
        ['#c51b7d','#f7f7f7','#4d9221'],
        ['#d6604d','#f5f5f5','#4393c3']
    ];
    var SINCOS_FUNCTIONS = [
        { label: 'sin(x)·cos(y)', fn: function(x,y){ return Math.sin(x)*Math.cos(y); } },
        { label: 'cos(x)·cos(y)', fn: function(x,y){ return Math.cos(x)*Math.cos(y); } },
        { label: 'sin(x+y)', fn: function(x,y){ return Math.sin(x+y); } },
        { label: 'sin(x)·sin(y)', fn: function(x,y){ return Math.sin(x)*Math.sin(y); } },
        { label: 'sin(x²+y²)', fn: function(x,y){ return Math.sin(x*x*0.25+y*y*0.25); } },
        { label: 'cos(x)·sin(x+y)', fn: function(x,y){ return Math.cos(x)*Math.sin(x+y); } },
        { label: 'sin(2x)·cos(2y)', fn: function(x,y){ return Math.sin(2*x)*Math.cos(2*y); } },
        { label: 'sin(x+cos(y))', fn: function(x,y){ return Math.sin(x+Math.cos(y)); } }
    ];
    var currentSincosFnIdx = 0;
    var currentDivergingPair = DIVERGING_PAIRS[0];
    var currentNoiseModeIdx = 0;
    var noiseSeed = Math.random() * 100;
    var noiseOffset = [Math.random()*1000, Math.random()*1000];
    var glyphGrid = [];
    var rimHue = Math.random() * 360;

    function changeHtmlDisplayInline() {}
    window.changeHtmlDisplayInline = changeHtmlDisplayInline;

    function loadScriptOnce(src, testFn, callback) {
        if (testFn && testFn()) return callback();
        var existing = document.querySelector('script[data-gm-src="' + src + '"]');
        if (existing) {
            existing.addEventListener('load', callback, { once: true });
            return;
        }
        var script = document.createElement('script');
        script.src = src;
        script.async = false;
        script.setAttribute('data-gm-src', src);
        script.onload = callback;
        script.onerror = function() {
            console.warn('insert37 failed to load dependency:', src);
            callback();
        };
        document.head.appendChild(script);
    }

    function ensureDependencies(callback) {
        loadScriptOnce(D3_SRC, function() { return typeof window.d3 !== 'undefined'; }, function() {
            loadScriptOnce(D3_CONTOUR_SRC, function() { return typeof window.d3 !== 'undefined' && typeof window.d3.contours === 'function'; }, function() {
                loadScriptOnce('./js_funct/artist_palettes.js', function() { return typeof window.ARTIST_PALETTES !== 'undefined'; }, function() {
                    loadScriptOnce('./js_funct/colorpalette.js', function() { return typeof window.ColorPalette !== 'undefined'; }, function() {
                        loadScriptOnce('./js_funct/vis_palette_adapter.js', function() { return typeof window.VisPaletteAdapter !== 'undefined'; }, callback);
                    });
                });
            });
        });
    }

    function injectStyles() {
        if (document.getElementById('insert37-style')) return;
        var style = document.createElement('style');
        style.id = 'insert37-style';
        style.textContent = [
            '#insert37-root{position:fixed;inset:0;z-index:1;overflow:hidden;}',
            '#insert37-svg,#insert37-canvas{position:absolute;inset:0;width:100%;height:100%;display:block;}',
            '#insert37-hud{position:fixed;right:12px;bottom:52px;max-width:min(56vw,620px);padding:10px 12px;border-radius:10px;font:11px/1.45 monospace;letter-spacing:.03em;pointer-events:none;z-index:12;white-space:normal;transition:opacity .2s ease;}',
            '#insert37-toggle{position:fixed;right:12px;bottom:12px;width:30px;height:30px;border:none;border-radius:16px;cursor:pointer;z-index:13;font:16px/30px monospace;padding:0;box-shadow:0 8px 24px rgba(0,0,0,0.28);}',
            '#insert37-hud b{font-weight:700;}',
            '#insert37-hud .muted{opacity:.8;}'
        ].join('');
        document.head.appendChild(style);
        INSERT37.styleEl = style;
    }

    function destroyRoot() {
        if (INSERT37.root && INSERT37.root.parentNode) INSERT37.root.parentNode.removeChild(INSERT37.root);
        INSERT37.root = null;
        INSERT37.svg = null;
        INSERT37.canvas = null;
        INSERT37.ctx = null;
        INSERT37.hudEl = null;
        INSERT37.toggleBtn = null;
    }

    function createRoot() {
        destroyRoot();
        var root = document.createElement('div');
        root.id = 'insert37-root';
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('id', 'insert37-svg');
        root.appendChild(svg);
        var canvas = document.createElement('canvas');
        canvas.id = 'insert37-canvas';
        root.appendChild(canvas);
        var hud = document.createElement('div');
        hud.id = 'insert37-hud';
        root.appendChild(hud);
        var toggleBtn = document.createElement('button');
        toggleBtn.id = 'insert37-toggle';
        toggleBtn.type = 'button';
        toggleBtn.textContent = 'i';
        toggleBtn.addEventListener('click', function() {
            INSERT37.hudVisible = !INSERT37.hudVisible;
            updateHud();
        });
        root.appendChild(toggleBtn);
        document.body.appendChild(root);
        INSERT37.root = root;
        INSERT37.svg = svg;
        INSERT37.canvas = canvas;
        INSERT37.ctx = canvas.getContext('2d');
        INSERT37.hudEl = hud;
        INSERT37.toggleBtn = toggleBtn;
        sizeCanvas();
    }

    function sizeCanvas() {
        if (!INSERT37.canvas) return;
        var w = window.innerWidth, h = window.innerHeight;
        INSERT37.canvas.width = w;
        INSERT37.canvas.height = h;
        INSERT37.canvas.style.width = w + 'px';
        INSERT37.canvas.style.height = h + 'px';
        INSERT37.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    function showSVG() { if (INSERT37.svg) INSERT37.svg.style.display = 'block'; if (INSERT37.canvas) INSERT37.canvas.style.display = 'none'; }
    function showCanvas() { if (INSERT37.svg) INSERT37.svg.style.display = 'none'; if (INSERT37.canvas) INSERT37.canvas.style.display = 'block'; sizeCanvas(); }

    function getFlavorFromUrl() {
        var params = new URLSearchParams(window.location.search);
        var raw = params.get('flavor');
        if (raw === null || raw === '') return Math.floor(Math.random() * 9);
        var value = parseInt(raw, 10);
        if (isNaN(value)) return Math.floor(Math.random() * 9);
        return Math.max(0, Math.min(8, value));
    }

    function buildPalette(mode) {
        if (!window.VisPaletteAdapter) {
            return { mode: mode, index: 0, options: { mode: mode, count: 12, family: INSERT37.family }, palette: { key: 'fallback', label: 'Fallback', bg: '#0b0a14', panelBg: '#171523', lineColors: ['#ff6b6b','#ffd166','#06d6a0','#4cc9f0'], fillColors: ['#ff6b6b','#ffd166','#06d6a0','#4cc9f0'], accent: '#ffd166', text: '#f4f4f4' } };
        }
        return window.VisPaletteAdapter.create({ mode: mode, family: INSERT37.family, flavor: INSERT37.currentFlavor, count: 12 });
    }

    function makeDiscreteScheme(palette) {
        var colors = (palette.fillColors && palette.fillColors.length ? palette.fillColors : palette.lineColors).slice();
        if (!colors.length) colors = [palette.accent || '#ffffff'];
        return function(t) {
            var tt = Math.max(0, Math.min(0.999999, isFinite(t) ? t : 0));
            var index = Math.floor(tt * colors.length);
            return colors[index] || colors[colors.length - 1] || palette.accent || '#ffffff';
        };
    }

    function updateHud(status) {
        if (!INSERT37.hudEl || !INSERT37.paletteState) return;
        var palette = INSERT37.paletteState.palette;
        INSERT37.hudEl.style.opacity = INSERT37.hudVisible ? '1' : '0';
        INSERT37.hudEl.style.background = palette.panelBg;
        INSERT37.hudEl.style.color = palette.text;
        INSERT37.hudEl.style.boxShadow = '0 12px 40px rgba(0,0,0,0.28)';
        if (INSERT37.toggleBtn) {
            INSERT37.toggleBtn.style.background = palette.panelBg;
            INSERT37.toggleBtn.style.color = palette.text;
            INSERT37.toggleBtn.textContent = INSERT37.hudVisible ? '×' : 'i';
        }
        INSERT37.hudEl.innerHTML = '<b>insert37</b> · flavor ' + INSERT37.currentFlavor + ' ' + INSERT37.flavorNames[INSERT37.currentFlavor] +
            '<br><span class="muted">palette:</span> ' + palette.label + ' <span class="muted">· mode:</span> ' + INSERT37.paletteState.mode +
            (status ? '<br><span class="muted">status:</span> ' + status : '') +
            '<br><span class="muted">keys:</span> 0–8 flavor · r regenerate · p palette · a mode · m submode · h hud';
    }

    function cyclePalette() {
        var mode = PALETTE_MODES[INSERT37.paletteModeIndex];
        INSERT37.paletteState = window.VisPaletteAdapter && INSERT37.paletteState
            ? window.VisPaletteAdapter.next(INSERT37.paletteState, { mode: mode, family: INSERT37.family, flavor: INSERT37.currentFlavor, count: 12 })
            : buildPalette(mode);
        renderCurrentFlavor();
    }

    function cycleMode() {
        INSERT37.paletteModeIndex = (INSERT37.paletteModeIndex + 1) % PALETTE_MODES.length;
        INSERT37.paletteState = buildPalette(PALETTE_MODES[INSERT37.paletteModeIndex]);
        renderCurrentFlavor();
    }

    function clearSVG() { var d3 = window.d3; var svg = d3.select(INSERT37.svg).attr('width', window.innerWidth).attr('height', window.innerHeight); svg.selectAll('*').remove(); return svg; }
    function clearCanvas(bg) { var ctx = INSERT37.ctx; ctx.clearRect(0,0,window.innerWidth,window.innerHeight); ctx.fillStyle = bg; ctx.fillRect(0,0,window.innerWidth,window.innerHeight); }

    function randomField() {
        var n = RES, m = RES, values = new Float64Array(n * m);
        var numBlobs = 3 + Math.floor(Math.random() * 6);
        var blobs = Array.from({ length: numBlobs }, function() { return { cx: Math.random(), cy: Math.random(), sx: 0.08 + Math.random() * 0.28, sy: 0.08 + Math.random() * 0.28, amp: (Math.random() < 0.15 ? -1 : 1) * (0.4 + Math.random() * 0.6) }; });
        for (var j = 0; j < m; j++) for (var i = 0; i < n; i++) { var x = i / (n - 1), y = j / (m - 1), v = 0; blobs.forEach(function(b){ var dx=(x-b.cx)/b.sx, dy=(y-b.cy)/b.sy; v += b.amp * Math.exp(-(dx*dx+dy*dy)/2); }); values[j*n+i]=v; }
        return values;
    }

    function renderContourDataset(svg, values, ox, oy, cellW, cellH, scheme, palette, levels) {
        var d3 = window.d3;
        var ext = d3.extent(values), vMin = ext[0], vMax = ext[1], range = (vMax - vMin) || 1;
        var thresholds = Array.from({ length: levels }, function(_, i) { return vMin + range * (levels === 20 ? i : i + 0.5) / levels; });
        var contours = d3.contours().size([RES, RES]).thresholds(thresholds)(values);
        var xSc = d3.scaleLinear().domain([0, RES]).range([ox, ox + cellW]);
        var ySc = d3.scaleLinear().domain([0, RES]).range([oy, oy + cellH]);
        var pathGen = d3.geoPath().projection(d3.geoTransform({ point: function(x, y) { this.stream.point(xSc(x), ySc(y)); } }));
        return { contours: contours, pathGen: pathGen, vMin: vMin, range: range };
    }

    function renderFlavor0() {
        showSVG();
        var d3 = window.d3, palette = INSERT37.paletteState.palette, scheme = makeDiscreteScheme(palette), svg = clearSVG();
        svg.append('rect').attr('width', window.innerWidth).attr('height', window.innerHeight).attr('fill', palette.bg);
        var datasets = Array.from({ length: GRID * GRID }, function() { return randomField(); });
        var cellW = (window.innerWidth - GAP * (GRID + 1)) / GRID, cellH = (window.innerHeight - GAP * (GRID + 1)) / GRID;
        datasets.forEach(function(values, idx) {
            var row = Math.floor(idx / GRID), col = idx % GRID, ox = GAP + col * (cellW + GAP), oy = GAP + row * (cellH + GAP);
            var rd = renderContourDataset(svg, values, ox, oy, cellW, cellH, scheme, palette, 16);
            var g = svg.append('g');
            g.selectAll('path.band').data(rd.contours).join('path').attr('class','band').attr('d', rd.pathGen).attr('fill', function(d){ return scheme((d.value-rd.vMin)/rd.range); }).attr('stroke','none').attr('opacity',1);
            g.selectAll('path.line').data(rd.contours).join('path').attr('class','line').attr('d', rd.pathGen).attr('fill','none').attr('stroke', function(d,i){ var lines = palette.lineColors.length ? palette.lineColors : palette.fillColors; return lines[i % lines.length] || palette.accent; }).attr('stroke-width',0.4).attr('opacity',0.72);
        });
        document.body.style.backgroundColor = palette.bg;
        updateHud('v23-derived port');
    }

    var OPT_FUNCTIONS = [
        { name: 'Rastrigin', domain: [-5.12, 5.12, -5.12, 5.12], fn: function(x, y) { return 20 + x * x - 10 * Math.cos(2 * Math.PI * x) + y * y - 10 * Math.cos(2 * Math.PI * y); } },
        { name: 'Ackley', domain: [-5, 5, -5, 5], fn: function(x, y) { return -20 * Math.exp(-0.2 * Math.sqrt(0.5 * (x * x + y * y))) - Math.exp(0.5 * (Math.cos(2 * Math.PI * x) + Math.cos(2 * Math.PI * y))) + Math.E + 20; } },
        { name: 'Sphere', domain: [-4, 4, -4, 4], fn: function(x, y) { return x * x + y * y; } },
        { name: 'Rosenbrock', domain: [-2, 2, -1, 3], fn: function(x, y) { return 100 * Math.pow(y - x * x, 2) + Math.pow(1 - x, 2); } },
        { name: 'Beale', domain: [-4.5, 4.5, -4.5, 4.5], fn: function(x, y) { return Math.pow(1.5 - x + x * y, 2) + Math.pow(2.25 - x + x * y * y, 2) + Math.pow(2.625 - x + x * y * y * y, 2); } },
        { name: 'Goldstein–Price', domain: [-2, 2, -2, 2], fn: function(x, y) { var a = 1 + (x + y + 1) * (x + y + 1) * (19 - 14 * x + 3 * x * x - 14 * y + 6 * x * y + 3 * y * y); var b = 30 + (2 * x - 3 * y) * (2 * x - 3 * y) * (18 - 32 * x + 12 * x * x + 48 * y - 36 * x * y + 27 * y * y); return a * b; } },
        { name: 'Booth', domain: [-10, 10, -10, 10], fn: function(x, y) { return Math.pow(x + 2 * y - 7, 2) + Math.pow(2 * x + y - 5, 2); } },
        { name: 'Matyas', domain: [-10, 10, -10, 10], fn: function(x, y) { return 0.26 * (x * x + y * y) - 0.48 * x * y; } },
        { name: 'Lévi N.13', domain: [-10, 10, -10, 10], fn: function(x, y) { return Math.pow(Math.sin(3 * Math.PI * x), 2) + Math.pow(x - 1, 2) * (1 + Math.pow(Math.sin(3 * Math.PI * y), 2)) + Math.pow(y - 1, 2) * (1 + Math.pow(Math.sin(2 * Math.PI * y), 2)); } },
        { name: 'Himmelblau', domain: [-5, 5, -5, 5], fn: function(x, y) { return Math.pow(x * x + y - 11, 2) + Math.pow(x + y * y - 7, 2); } },
        { name: 'Three-Hump Camel', domain: [-5, 5, -5, 5], fn: function(x, y) { return 2 * x * x - 1.05 * Math.pow(x, 4) + Math.pow(x, 6) / 6 + x * y + y * y; } },
        { name: 'Easom', domain: [-10, 10, -10, 10], fn: function(x, y) { return -Math.cos(x) * Math.cos(y) * Math.exp(-((x - Math.PI) * (x - Math.PI) + (y - Math.PI) * (y - Math.PI))); } },
        { name: 'Cross-in-Tray', domain: [-10, 10, -10, 10], fn: function(x, y) { return -0.0001 * Math.pow(Math.abs(Math.sin(x) * Math.sin(y) * Math.exp(Math.abs(100 - Math.sqrt(x * x + y * y) / Math.PI))) + 1, 0.1); } },
        { name: 'Eggholder', domain: [-512, 512, -512, 512], fn: function(x, y) { return -(y + 47) * Math.sin(Math.sqrt(Math.abs(x / 2 + (y + 47)))) - x * Math.sin(Math.sqrt(Math.abs(x - (y + 47)))); } },
        { name: 'Hölder Table', domain: [-10, 10, -10, 10], fn: function(x, y) { return -Math.abs(Math.sin(x) * Math.cos(y) * Math.exp(Math.abs(1 - Math.sqrt(x * x + y * y) / Math.PI))); } },
        { name: 'McCormick', domain: [-1.5, 4, -3, 4], fn: function(x, y) { return Math.sin(x + y) + Math.pow(x - y, 2) - 1.5 * x + 2.5 * y + 1; } },
        { name: 'Schaffer N.2', domain: [-50, 50, -50, 50], fn: function(x, y) { return 0.5 + (Math.pow(Math.sin(x * x - y * y), 2) - 0.5) / Math.pow(1 + 0.001 * (x * x + y * y), 2); } },
        { name: 'Schaffer N.4', domain: [-50, 50, -50, 50], fn: function(x, y) { return 0.5 + (Math.pow(Math.cos(Math.sin(Math.abs(x * x - y * y))), 2) - 0.5) / Math.pow(1 + 0.001 * (x * x + y * y), 2); } },
        { name: 'Styblinski–Tang', domain: [-5, 5, -5, 5], fn: function(x, y) { return 0.5 * (Math.pow(x, 4) - 16 * x * x + 5 * x + Math.pow(y, 4) - 16 * y * y + 5 * y); } },
        { name: 'Griewank', domain: [-8, 8, -8, 8], fn: function(x, y) { return 1 + (x * x + y * y) / 4000 - Math.cos(x) * Math.cos(y / Math.sqrt(2)); } },
        { name: 'Bukin N.6', domain: [-15, -5, -3, 3], fn: function(x, y) { return 100 * Math.sqrt(Math.abs(y - 0.01 * x * x)) + 0.01 * Math.abs(x + 10); } },
        { name: 'Mishra Bird', domain: [-10, 0, -6.5, 0], fn: function(x, y) { return Math.sin(y) * Math.exp(Math.pow(1 - Math.cos(x), 2)) + Math.cos(x) * Math.exp(Math.pow(1 - Math.sin(y), 2)) + Math.pow(x - y, 2); } },
        { name: 'Townsend', domain: [-2.25, 2.25, -2.5, 1.75], fn: function(x, y) { return -Math.pow(Math.cos((x - 0.1) * y), 2) - x * Math.sin(3 * x + y); } },
        { name: 'Six-Hump Camel', domain: [-3, 3, -2, 2], fn: function(x, y) { return (4 - 2.1 * x * x + Math.pow(x, 4) / 3) * x * x + x * y + (-4 + 4 * y * y) * y * y; } },
        { name: 'Drop-Wave', domain: [-5.12, 5.12, -5.12, 5.12], fn: function(x, y) { return -(1 + Math.cos(12 * Math.sqrt(x * x + y * y))) / (0.5 * (x * x + y * y) + 2); } }
    ];

    function perturbDomain(xMin, xMax, yMin, yMax) {
        var xRange = xMax - xMin, yRange = yMax - yMin;
        var shift = 0.10 + Math.random() * 0.16;
        var scale = 0.82 + Math.random() * 0.38;
        var cx = (xMin + xMax) / 2 + (Math.random() - 0.5) * xRange * shift;
        var cy = (yMin + yMax) / 2 + (Math.random() - 0.5) * yRange * shift;
        var hw = xRange * scale / 2, hh = yRange * scale / 2;
        return [cx - hw, cx + hw, cy - hh, cy + hh];
    }

    function sampleFunction(fn, xMin, xMax, yMin, yMax, res) {
        var vals = new Float64Array(res * res);
        for (var j = 0; j < res; j++) for (var i = 0; i < res; i++) { var x = xMin + (xMax - xMin) * i / (res - 1); var y = yMin + (yMax - yMin) * j / (res - 1); var v = fn(x, y); if (!isFinite(v)) v = 0; vals[j * res + i] = v; }
        return vals;
    }

    function renderFlavor1() {
        showSVG();
        var d3 = window.d3, palette = INSERT37.paletteState.palette, scheme = makeDiscreteScheme(palette), svg = clearSVG();
        svg.append('rect').attr('width', window.innerWidth).attr('height', window.innerHeight).attr('fill', palette.bg);
        var pool = OPT_FUNCTIONS.slice();
        for (var i = pool.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp; }
        var selected = []; for (var k = 0; k < GRID * GRID; k++) selected.push(pool[k % pool.length]);
        var cellW = (window.innerWidth - GAP * (GRID + 1)) / GRID, cellH = (window.innerHeight - GAP * (GRID + 1)) / GRID, res = 120;
        selected.forEach(function(func, idx) {
            var row = Math.floor(idx / GRID), col = idx % GRID, ox = GAP + col * (cellW + GAP), oy = GAP + row * (cellH + GAP);
            var d = perturbDomain(func.domain[0], func.domain[1], func.domain[2], func.domain[3]);
            var values = sampleFunction(func.fn, d[0], d[1], d[2], d[3], res);
            var ext = d3.extent(values), vMin = ext[0], vMax = ext[1], range = (vMax - vMin) || 1;
            var thresholds = Array.from({ length: 20 }, function(_, ii) { return vMin + range * ii / 20; });
            var contours = d3.contours().size([res, res]).thresholds(thresholds)(values);
            var xSc = d3.scaleLinear().domain([0, res]).range([ox, ox + cellW]);
            var ySc = d3.scaleLinear().domain([0, res]).range([oy, oy + cellH]);
            var pathGen = d3.geoPath().projection(d3.geoTransform({ point: function(x, y) { this.stream.point(xSc(x), ySc(y)); } }));
            var g = svg.append('g');
            g.append('rect').attr('x', ox).attr('y', oy).attr('width', cellW).attr('height', cellH).attr('fill', scheme(0));
            g.selectAll('path.band').data(contours).join('path').attr('class','band').attr('d', pathGen).attr('fill', function(cd){ return scheme((cd.value - vMin) / range); }).attr('stroke','none').attr('opacity',1);
            g.selectAll('path.line').data(contours).join('path').attr('class','line').attr('d', pathGen).attr('fill','none').attr('stroke', function(cd,ii){ var lines = palette.lineColors.length ? palette.lineColors : palette.fillColors; return lines[ii % lines.length] || palette.accent; }).attr('stroke-width',0.35).attr('opacity',0.6);
        });
        document.body.style.backgroundColor = palette.bg;
        updateHud('v25-derived port');
    }

    function makeFunctionPalette(count) {
        var palette = INSERT37.paletteState.palette;
        var colors = palette.lineColors && palette.lineColors.length ? palette.lineColors : palette.fillColors;
        if (!colors || !colors.length) colors = [palette.accent || '#ffffff'];
        var out = [];
        for (var i = 0; i < count; i++) out.push(colors[i % colors.length]);
        return out;
    }

    function makeFunctionLibrary() {
        var a = 0.5 + Math.random()*2.5, b = 0.5 + Math.random()*2.5, k = 1 + Math.floor(Math.random()*4), m = 1 + Math.floor(Math.random()*4), p = Math.random()*Math.PI*2, q = Math.random()*Math.PI*2;
        return [
            { fn:function(x,y){return Math.sin(x*a)*Math.cos(y*b);}, domain:[-Math.PI*2,Math.PI*2,-Math.PI*2,Math.PI*2] },
            { fn:function(x,y){return Math.sin(Math.sqrt(x*x+y*y)+p);}, domain:[-8,8,-8,8] },
            { fn:function(x,y){return Math.cos(x*a+p)*Math.sin(y*b+q);}, domain:[-Math.PI*2,Math.PI*2,-Math.PI*2,Math.PI*2] },
            { fn:function(x,y){return Math.sin(x*k+p)*Math.sin(y*m+q);}, domain:[-Math.PI*2,Math.PI*2,-Math.PI*2,Math.PI*2] },
            { fn:function(x,y){return (x*x-y*y)/(x*x+y*y+0.1);}, domain:[-3,3,-3,3] },
            { fn:function(x,y){return Math.sin(x*x+y*y);}, domain:[-3,3,-3,3] },
            { fn:function(x,y){return Math.cos(x*a)*Math.cos(y*b)+Math.sin((x+y)*0.5);}, domain:[-Math.PI*3,Math.PI*3,-Math.PI*3,Math.PI*3] },
            { fn:function(x,y){return Math.sin(x+Math.sin(y+Math.sin(x)));}, domain:[-Math.PI*2,Math.PI*2,-Math.PI*2,Math.PI*2] },
            { fn:function(x,y){return Math.sin(x*a)*Math.sin(b*y)*Math.cos(x*y*0.3);}, domain:[-Math.PI*2,Math.PI*2,-Math.PI*2,Math.PI*2] },
            { fn:function(x,y){return x*Math.sin(y*b)+y*Math.sin(x*a);}, domain:[-Math.PI*2,Math.PI*2,-Math.PI*2,Math.PI*2] },
            { fn:function(x,y){return Math.sin(x*a+y*b)*Math.cos(x*b-y*a);}, domain:[-Math.PI*2,Math.PI*2,-Math.PI*2,Math.PI*2] },
            { fn:function(x,y){return Math.sin(Math.sqrt(Math.abs(x*y))+p)*Math.cos(x-y);}, domain:[-Math.PI*2,Math.PI*2,-Math.PI*2,Math.PI*2] },
            { fn:function(x,y){return (Math.sin(x*a)+Math.cos(y*b))/(Math.abs(x-y)+0.5);}, domain:[-Math.PI*2,Math.PI*2,-Math.PI*2,Math.PI*2] },
            { fn:function(x,y){return Math.sin(x*x*0.2-y*y*0.2);}, domain:[-4,4,-4,4] },
            { fn:function(x,y){return Math.cos(x*k)*Math.cos(y*m)-Math.cos((x+y)*0.5*a);}, domain:[-Math.PI*2,Math.PI*2,-Math.PI*2,Math.PI*2] },
            { fn:function(x,y){return Math.sin(x+p)*Math.sin(y+q)+Math.cos(x*y*0.3);}, domain:[-Math.PI*2,Math.PI*2,-Math.PI*2,Math.PI*2] },
            { fn:function(x,y){return Math.tanh(x*a)*Math.tanh(y*b);}, domain:[-3,3,-3,3] },
            { fn:function(x,y){return Math.sin(x*a)*Math.cos(x+y)+Math.cos(y*b)*Math.sin(x-y);}, domain:[-Math.PI*2,Math.PI*2,-Math.PI*2,Math.PI*2] },
            { fn:function(x,y){return Math.sin(x*x*b-y*y*a+p);}, domain:[-3,3,-3,3] },
            { fn:function(x,y){return Math.cos(x*k*0.7+y*m*0.7)*Math.sin(x*m*0.7-y*k*0.7);}, domain:[-Math.PI*2,Math.PI*2,-Math.PI*2,Math.PI*2] },
            { fn:function(x,y){return Math.sin(x+Math.cos(y*b))+Math.cos(y+Math.sin(x*a));}, domain:[-Math.PI*3,Math.PI*3,-Math.PI*3,Math.PI*3] },
            { fn:function(x,y){return (Math.sin(x*a)+Math.sin(y*b)+Math.sin((x+y)*0.7*a))/3;}, domain:[-Math.PI*3,Math.PI*3,-Math.PI*3,Math.PI*3] },
            { fn:function(x,y){return Math.sin(Math.pow(x*x+y*y,0.4)*a+p);}, domain:[-4,4,-4,4] },
            { fn:function(x,y){return Math.cos(x*y*b*0.3+p);}, domain:[-Math.PI*2,Math.PI*2,-Math.PI*2,Math.PI*2] },
            { fn:function(x,y){return Math.sin(x*a+y*y*0.3)*Math.cos(y*b+x*x*0.3);}, domain:[-Math.PI*2,Math.PI*2,-Math.PI*2,Math.PI*2] }
        ];
    }

    function renderFlavor2() {
        showSVG();
        var d3 = window.d3, palette = INSERT37.paletteState.palette, svg = clearSVG();
        svg.append('rect').attr('width', window.innerWidth).attr('height', window.innerHeight).attr('fill', palette.bg);
        var cellColors = makeFunctionPalette(GRID * GRID);
        var pool = d3.shuffle(makeFunctionLibrary().slice());
        var datasets = Array.from({ length: GRID * GRID }, function(_, i) { return pool[i % pool.length]; });
        var cellW = (window.innerWidth - 2*(GRID+1)) / GRID, cellH = (window.innerHeight - 2*(GRID+1)) / GRID;
        datasets.forEach(function(ds, idx) {
            var row = Math.floor(idx / GRID), col = idx % GRID, ox = 2 + col * (cellW + 2), oy = 2 + row * (cellH + 2), color = cellColors[idx];
            var vals = sampleFunction(ds.fn, ds.domain[0], ds.domain[1], ds.domain[2], ds.domain[3], 140);
            var ext = d3.extent(vals), vMin = ext[0], vMax = ext[1], range = (vMax-vMin)||1;
            var nLevels = 18 + Math.floor(Math.random()*14);
            var thresholds = Array.from({ length:nLevels }, function(_,i){ return vMin + range*(i+0.5)/nLevels; });
            var contours = d3.contours().size([140,140]).thresholds(thresholds)(vals);
            var xSc = d3.scaleLinear().domain([0,140]).range([ox,ox+cellW]);
            var ySc = d3.scaleLinear().domain([0,140]).range([oy,oy+cellH]);
            var pathGen = d3.geoPath().projection(d3.geoTransform({ point: function(x,y){ this.stream.point(xSc(x),ySc(y)); } }));
            var clipId = 'i37-f2-' + idx + '-' + INSERT37.runToken;
            svg.append('defs').append('clipPath').attr('id', clipId).append('rect').attr('x', ox).attr('y', oy).attr('width', cellW).attr('height', cellH);
            var g = svg.append('g').attr('clip-path','url(#'+clipId+')');
            g.append('rect').attr('x',ox).attr('y',oy).attr('width',cellW).attr('height',cellH).attr('fill',palette.bg);
            g.selectAll('path').data(contours).join('path').attr('d', pathGen).attr('fill','none').attr('stroke', color).attr('stroke-width',0.7).attr('opacity', function(d,i){ return 0.4 + 0.5*(i/contours.length); });
        });
        document.body.style.backgroundColor = palette.bg;
        updateHud('v33-derived port');
    }

    const P_BASE = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
    var P = new Uint8Array(512); for (var pi=0; pi<512; pi++) P[pi]=P_BASE[pi&255];
    function fade(t){ return t*t*t*(t*(t*6-15)+10); }
    function lerp(t,a,b){ return a+t*(b-a); }
    function grad(h,x,y,z){ h&=15; var u=h<8?x:y, v=h<4?y:(h===12||h===14?x:z); return ((h&1)?-u:u)+((h&2)?-v:v); }
    function noise(x,y,z){ var X=Math.floor(x)&255,Y=Math.floor(y)&255,Z=Math.floor(z)&255; x-=Math.floor(x);y-=Math.floor(y);z-=Math.floor(z); var u=fade(x),v=fade(y),w=fade(z),A=P[X]+Y,AA=P[A]+Z,AB=P[A+1]+Z,B=P[X+1]+Y,BA=P[B]+Z,BB=P[B+1]+Z; return lerp(w,lerp(v,lerp(u,grad(P[AA],x,y,z),grad(P[BA],x-1,y,z)),lerp(u,grad(P[AB],x,y-1,z),grad(P[BB],x-1,y-1,z))),lerp(v,lerp(u,grad(P[AA+1],x,y,z-1),grad(P[BA+1],x-1,y,z-1)),lerp(u,grad(P[AB+1],x,y-1,z-1),grad(P[BB+1],x-1,y-1,z-1)))); }
    function fbm(x,y,z,oct,lac,gain){ var val=0,amp=1,freq=1,max=0; for(var i=0;i<oct;i++){ val += noise(x*freq,y*freq,z*freq)*amp; max+=amp; amp*=gain; freq*=lac; } return val/max; }

    function renderFlavor3() {
        showCanvas();
        var palette = INSERT37.paletteState.palette;
        clearCanvas(palette.bg);
        var W = window.innerWidth, H = window.innerHeight, mode = currentNoiseModeIdx % 6, t = noiseOffset[0] * 0.001;
        var imgData = INSERT37.ctx.createImageData(W, H), px = imgData.data, step = 2;
        for (var y=0; y<H; y+=step) {
            for (var x=0; x<W; x+=step) {
                var rgb = getNoiseColor(x + noiseOffset[1], y + noiseOffset[0], t, mode, palette);
                for (var dy=0; dy<step && y+dy<H; dy++) for (var dx=0; dx<step && x+dx<W; dx++) { var ii=((y+dy)*W+(x+dx))*4; px[ii]=rgb[0]; px[ii+1]=rgb[1]; px[ii+2]=rgb[2]; px[ii+3]=255; }
            }
        }
        INSERT37.ctx.putImageData(imgData,0,0);
        document.body.style.backgroundColor = palette.bg;
        updateHud('v34-derived port · mode ' + currentNoiseModeIdx);
    }

    function buildGlyphGrid() {
        var W = window.innerWidth, H = window.innerHeight, fontSize = 13, colW = fontSize * 0.62, rowH = fontSize * 1.1, cols = Math.ceil(W/colW)+1, rows = Math.ceil(H/rowH)+1;
        glyphGrid = Array.from({length:rows}, function(){ return Array.from({length:cols}, function(){ return GLYPH_SET[Math.floor(Math.random()*GLYPH_SET.length)]; }); });
    }

    function drawGlyphOverlay() {
        var ctx = INSERT37.ctx, fontSize = 13, colW = fontSize*0.62, rowH = fontSize*1.1;
        ctx.save(); ctx.font = fontSize + 'px monospace'; ctx.textBaseline='top'; ctx.globalCompositeOperation='overlay'; ctx.globalAlpha=0.55; ctx.fillStyle='#ffffff';
        glyphGrid.forEach(function(row,ri){ row.forEach(function(glyph,ci){ ctx.fillText(glyph, ci*colW, ri*rowH); }); });
        ctx.restore();
    }

    function renderFlavor4() {
        renderFlavor3();
        buildGlyphGrid();
        drawGlyphOverlay();
        updateHud('v35-derived port · mode ' + currentNoiseModeIdx);
    }

    function rgbArrayToCss(rgb) { return 'rgb(' + Math.round(rgb[0]) + ',' + Math.round(rgb[1]) + ',' + Math.round(rgb[2]) + ')'; }
    function makeDivergingScale(pair, v) {
        var d3 = window.d3, t = (v+1)/2;
        return t<=0.5 ? d3.interpolateRgb(pair[0], pair[1])(t*2) : d3.interpolateRgb(pair[1], pair[2])((t-0.5)*2);
    }
    function safeRgb(colorStr) { var c = window.d3.color(colorStr); c = c ? c.rgb() : {r:200,g:200,b:200}; return c; }
    function makePalettePair(palette) {
        var left = palette.lineColors[0] || palette.fillColors[0] || palette.accent || '#2166ac';
        var right = palette.lineColors[1] || palette.fillColors[1] || palette.accent || '#b2182b';
        var midRgb = cssColorToRgb(palette.panelBg || palette.bg || '#f7f7f7');
        return [left, rgbArrayToCss(midRgb), right];
    }

    function renderFlavor5() {
        showCanvas();
        var palette = INSERT37.paletteState.palette;
        clearCanvas(palette.bg);
        var W = window.innerWidth, H = window.innerHeight, fn = SINCOS_FUNCTIONS[currentSincosFnIdx].fn, xDomain = 6*Math.PI, yDomain = 4*Math.PI;
        var imgData = INSERT37.ctx.createImageData(W, H), px = imgData.data;
        var pair = makePalettePair(palette);
        for (var py=0; py<H; py++) for (var px2=0; px2<W; px2++) { var x=(px2/W)*xDomain, y=(py/H)*yDomain, v=fn(x,y), col=safeRgb(makeDivergingScale(pair,v)), i=(py*W+px2)*4; px[i]=col.r; px[i+1]=col.g; px[i+2]=col.b; px[i+3]=255; }
        INSERT37.ctx.putImageData(imgData,0,0);
        var res=200, vals=new Float64Array(res*res); for (var j=0;j<res;j++) for (var i=0;i<res;i++) vals[j*res+i]=fn((i/res)*xDomain,(j/res)*yDomain);
        var thresholds = Array.from({length:16}, function(_,i){ return -1 + 2*(i+0.5)/16; });
        var contours = window.d3.contours().size([res,res]).thresholds(thresholds)(vals);
        var xSc = window.d3.scaleLinear().domain([0,res]).range([0,W]);
        var ySc = window.d3.scaleLinear().domain([0,res]).range([0,H]);
        var pathGen = window.d3.geoPath().projection(window.d3.geoTransform({ point: function(x,y){ this.stream.point(xSc(x),ySc(y)); } }));
        INSERT37.ctx.save(); INSERT37.ctx.strokeStyle='rgba(0,0,0,0.18)'; INSERT37.ctx.lineWidth=0.5; contours.forEach(function(c){ INSERT37.ctx.stroke(new Path2D(pathGen(c))); }); INSERT37.ctx.restore();
        document.body.style.backgroundColor = palette.bg;
        updateHud('v36-derived port · ' + SINCOS_FUNCTIONS[currentSincosFnIdx].label);
    }

    function renderFlavor6() {
        showCanvas();
        var palette = INSERT37.paletteState.palette;
        clearCanvas(palette.bg);
        var W = window.innerWidth, H = window.innerHeight, fn = SINCOS_FUNCTIONS[currentSincosFnIdx % 7].fn, xDomain = 6*Math.PI, yDomain = 4*Math.PI;
        var pair = makePalettePair(palette);
        var imgData = INSERT37.ctx.createImageData(W, H), px = imgData.data;
        for (var py=0; py<H; py++) for (var x2=0; x2<W; x2++) { var x=(x2/W)*xDomain, y=(py/H)*yDomain, v=fn(x,y), col=safeRgb(makeDivergingScale(pair,v)), i=(py*W+x2)*4; px[i]=col.r; px[i+1]=col.g; px[i+2]=col.b; px[i+3]=255; }
        INSERT37.ctx.putImageData(imgData,0,0);
        var res=180, vals=new Float64Array(res*res); for (var jj=0;jj<res;jj++) for (var ii=0;ii<res;ii++) vals[jj*res+ii]=fn((ii/res)*xDomain,(jj/res)*yDomain);
        var thresholds = Array.from({length:16}, function(_,i){ return -1 + 2*(i+0.5)/16; });
        var contours = window.d3.contours().size([res,res]).thresholds(thresholds)(vals);
        var xSc = window.d3.scaleLinear().domain([0,res]).range([0,W]);
        var ySc = window.d3.scaleLinear().domain([0,res]).range([0,H]);
        var pathGen = window.d3.geoPath().projection(window.d3.geoTransform({ point: function(x,y){ this.stream.point(xSc(x),ySc(y)); } }));
        INSERT37.ctx.save(); INSERT37.ctx.strokeStyle='rgba(0,0,0,0.15)'; INSERT37.ctx.lineWidth=0.5; contours.forEach(function(c){ INSERT37.ctx.stroke(new Path2D(pathGen(c))); }); INSERT37.ctx.restore();
        var cellSize = 14 + Math.floor(Math.random()*16); INSERT37.ctx.save(); INSERT37.ctx.font = cellSize + 'px monospace'; INSERT37.ctx.textBaseline='top';
        var cols = Math.ceil(W/cellSize)+1, rows = Math.ceil(H/cellSize)+1;
        for (var r=0;r<rows;r++) for (var c=0;c<cols;c++) { var gx=c*cellSize, gy=r*cellSize, vx=(gx/W)*xDomain, vy=(gy/H)*yDomain, vv=fn(vx,vy), bg=safeRgb(makeDivergingScale(pair,vv)), lum=0.299*bg.r + 0.587*bg.g + 0.114*bg.b, alpha=0.08 + Math.random()*0.18; INSERT37.ctx.fillStyle = lum>128 ? 'rgba(0,0,0,'+alpha+')' : 'rgba(255,255,255,'+alpha+')'; INSERT37.ctx.fillText(BLOCKS[Math.floor(Math.random()*BLOCKS.length)], gx, gy); }
        INSERT37.ctx.restore();
        document.body.style.backgroundColor = palette.bg;
        updateHud('v37-derived port');
    }

    function squircleSDF(x, y, cx, cy, size, p) { var nx=Math.abs((x-cx)/size), ny=Math.abs((y-cy)/size), d=Math.pow(Math.pow(nx,p)+Math.pow(ny,p),1/p); return 1.0-d; }
    function hslToRgb(h,s,l){ var r,g,b; if(s===0){r=g=b=l;} else { var hue2rgb=function(p,q,t){ if(t<0)t+=1; if(t>1)t-=1; if(t<1/6)return p+(q-p)*6*t; if(t<1/2)return q; if(t<2/3)return p+(q-p)*(2/3-t)*6; return p; }; var q=l<0.5?l*(1+s):l+s-l*s, pp=2*l-q; r=hue2rgb(pp,q,h+1/3); g=hue2rgb(pp,q,h); b=hue2rgb(pp,q,h-1/3);} return [r,g,b]; }

    function renderFlavor7(circleOverlay) {
        showCanvas();
        var palette = INSERT37.paletteState.palette; clearCanvas('#000000');
        var W=window.innerWidth,H=window.innerHeight,cx=W/2,cy=H/2,size=Math.min(W,H)*0.38,pow=4.5+Math.random()*2,ns=0.0035,z=noiseSeed*0.1;
        var imgData=INSERT37.ctx.createImageData(W,H), px=imgData.data;
        for (var py=0; py<H; py++) {
            for (var px2=0; px2<W; px2++) {
                var sdf=squircleSDF(px2,py,cx,cy,size,pow), idx=(py*W+px2)*4;
                if (sdf < -0.08) { px[idx]=0; px[idx+1]=0; px[idx+2]=0; px[idx+3]=255; continue; }
                var nx=px2*ns, ny=py*ns, qx=fbm(nx,ny,z,5,2.1,0.5), qy=fbm(nx+5.2,ny+1.3,z,5,2.1,0.5), rx=fbm(nx+qx*3,ny+qy*3,z,5,2.1,0.5), ry=fbm(nx+qx*3+1.7,ny+qy*3+9.2,z,5,2.1,0.5), f=fbm(nx+rx*3,ny+ry*3,z,5,2.1,0.5), base=(f+1)*0.5;
                var r,g,b;
                if (sdf > 0.02) { var dark=Math.pow(base,2.2)*0.85; r=Math.floor(dark*210*(0.85+base*0.3)); g=Math.floor(dark*170*(0.75+base*0.25)); b=Math.floor(dark*130*(0.65+base*0.2)); }
                else { var t=(sdf+0.08)/0.10, rimT=1.0-t, dark2=Math.pow(base,2.2)*0.85, ir=dark2*210*(0.85+base*0.3), ig=dark2*170*(0.75+base*0.25), ib=dark2*130*(0.65+base*0.2), angle=Math.atan2(py-cy,px2-cx), hue=(rimHue+angle*60/Math.PI+base*40)%360, rim=hslToRgb(hue/360,0.8,0.55), rimR=rim[0]*255,rimG=rim[1]*255,rimB=rim[2]*255; r=Math.floor(ir*(1-rimT*0.9)+rimR*rimT*0.9); g=Math.floor(ig*(1-rimT*0.9)+rimG*rimT*0.9); b=Math.floor(ib*(1-rimT*0.9)+rimB*rimT*0.9); var fade2=Math.max(0,(sdf+0.08)/0.08); r=Math.floor(r*fade2); g=Math.floor(g*fade2); b=Math.floor(b*fade2); }
                px[idx]=Math.max(0,Math.min(255,r)); px[idx+1]=Math.max(0,Math.min(255,g)); px[idx+2]=Math.max(0,Math.min(255,b)); px[idx+3]=255;
            }
        }
        INSERT37.ctx.putImageData(imgData,0,0);
        var cell = (circleOverlay ? 12 : 14) + Math.floor(Math.random()*(circleOverlay ? 10 : 16));
        INSERT37.ctx.save();
        if (circleOverlay) {
            var rr = cell*0.42, cols2=Math.ceil(W/cell)+1, rows2=Math.ceil(H/cell)+1;
            for (var row=0; row<rows2; row++) for (var col=0; col<cols2; col++) { var gx=col*cell+cell*0.5, gy=row*cell+cell*0.5, alpha=0.07+Math.random()*0.18; INSERT37.ctx.fillStyle='rgba(255,176,0,'+alpha+')'; var type=Math.floor(Math.random()*4); INSERT37.ctx.beginPath(); if(type===0){ INSERT37.ctx.arc(gx,gy,rr,0,Math.PI*2); } else if(type===1){ INSERT37.ctx.arc(gx,gy,rr,Math.PI,0); INSERT37.ctx.closePath(); } else if(type===2){ INSERT37.ctx.arc(gx,gy,rr,0,Math.PI); INSERT37.ctx.closePath(); } else { var startA=Math.random()<0.5?Math.PI*0.5:Math.PI*1.5; INSERT37.ctx.arc(gx,gy,rr,startA,startA+Math.PI); INSERT37.ctx.closePath(); } INSERT37.ctx.fill(); }
        } else {
            INSERT37.ctx.font = cell + 'px monospace'; INSERT37.ctx.textBaseline='top'; var cols=Math.ceil(W/cell)+1, rows=Math.ceil(H/cell)+1; for (var r=0; r<rows; r++) for (var c=0; c<cols; c++) { var xg=c*cell, yg=r*cell; INSERT37.ctx.fillStyle='rgba(255,176,0,' + (0.07+Math.random()*0.18) + ')'; INSERT37.ctx.fillText('█', xg, yg); }
        }
        INSERT37.ctx.restore();
        document.body.style.backgroundColor = '#000000';
        updateHud(circleOverlay ? 'v39-derived port' : 'v38-derived port');
    }

    function getNoiseColor(x, y, t, mode, palette) {
        var scale = 0.004, nx = x*scale, ny = y*scale, v;
        if (mode === 0) { var qx = fbm(nx,ny,t,6,2.1,0.5), qy = fbm(nx+5.2,ny+1.3,t,6,2.1,0.5), rx = fbm(nx+qx*4,ny+qy*4,t,6,2.1,0.5), ry = fbm(nx+qx*4+1.7,ny+qy*4+9.2,t,6,2.1,0.5); v = fbm(nx+rx*4, ny+ry*4, t, 6, 2.1, 0.5); return paletteColorFromValue(palette, (v+1)*0.5); }
        if (mode === 1) { v = nx*3 + fbm(nx,ny,t,8,2.0,0.5)*5; return paletteColorFromValue(palette, (Math.sin(v*Math.PI)+1)*0.5); }
        if (mode === 2) { v = fbm(nx,ny,t,5,2.0,0.5)*8; return paletteColorFromValue(palette, v - Math.floor(v)); }
        if (mode === 3) { var turb=0,amp=1,freq=1,max=0; for (var i=0;i<8;i++){ turb += Math.abs(noise(nx*freq,ny*freq,t))*amp; max += amp; amp*=0.5; freq*=2.1; } return paletteColorFromValue(palette, Math.pow(turb/max, 1.5)); }
        if (mode === 4) { v = (fbm(nx,ny,t,7,2.0,0.55)+1)*0.5; return paletteColorFromValue(palette, v); }
        var n1=fbm(nx,ny,t,6,2.0,0.5), n2=fbm(nx+3.5,ny+7.1,t,6,2.0,0.5), mag=(Math.sqrt(n1*n1+n2*n2)+1)*0.5; return paletteColorFromValue(palette, mag);
    }

    var _i37_colorProbe = null;
    var _i37_colorProbeCtx = null;
    function cssColorToRgb(color) {
        if (!_i37_colorProbe) {
            _i37_colorProbe = document.createElement('canvas');
            _i37_colorProbe.width = 1;
            _i37_colorProbe.height = 1;
            _i37_colorProbeCtx = _i37_colorProbe.getContext('2d', { willReadFrequently: true });
        }
        try {
            _i37_colorProbeCtx.clearRect(0, 0, 1, 1);
            _i37_colorProbeCtx.fillStyle = color;
            _i37_colorProbeCtx.fillRect(0, 0, 1, 1);
            var data = _i37_colorProbeCtx.getImageData(0, 0, 1, 1).data;
            if (data && data.length >= 3) return [data[0], data[1], data[2]];
        } catch (e) {}
        var c = window.d3 && window.d3.color ? window.d3.color(color) : null;
        c = c ? c.rgb() : {r:128,g:128,b:128};
        return [c.r, c.g, c.b];
    }
    function paletteColorFromValue(palette, t) { var scheme = makeDiscreteScheme(palette); return cssColorToRgb(scheme(t)); }

    function renderPlaceholder() {
        showSVG();
        var d3 = window.d3, palette = INSERT37.paletteState.palette, svg = clearSVG();
        svg.append('rect').attr('width', window.innerWidth).attr('height', window.innerHeight).attr('fill', palette.bg);
        svg.append('rect').attr('x',20).attr('y',20).attr('width',window.innerWidth-40).attr('height',window.innerHeight-40).attr('rx',8).attr('fill',palette.panelBg).attr('opacity',0.95);
        svg.append('text').attr('x', window.innerWidth/2).attr('y', window.innerHeight/2-14).attr('text-anchor','middle').attr('fill', palette.text).attr('font-family','monospace').attr('font-size',20).text('Flavor ' + INSERT37.currentFlavor + ': ' + INSERT37.flavorNames[INSERT37.currentFlavor]);
        svg.append('text').attr('x', window.innerWidth/2).attr('y', window.innerHeight/2+18).attr('text-anchor','middle').attr('fill', palette.accent).attr('font-family','monospace').attr('font-size',13).text('Not ported yet — shell is honest until source-faithful conversion lands');
        document.body.style.backgroundColor = palette.bg;
        updateHud('placeholder only — not yet ported');
    }

    function renderCurrentFlavor() {
        INSERT37.runToken += 1;
        if (INSERT37.currentFlavor === 0) renderFlavor0();
        else if (INSERT37.currentFlavor === 1) renderFlavor1();
        else if (INSERT37.currentFlavor === 2) renderFlavor2();
        else if (INSERT37.currentFlavor === 3) renderFlavor3();
        else if (INSERT37.currentFlavor === 4) renderFlavor4();
        else if (INSERT37.currentFlavor === 5) renderFlavor5();
        else if (INSERT37.currentFlavor === 6) renderFlavor6();
        else if (INSERT37.currentFlavor === 7) renderFlavor7(false);
        else if (INSERT37.currentFlavor === 8) renderFlavor7(true);
        else renderPlaceholder();
    }

    function setFlavor(flavor) {
        INSERT37.currentFlavor = Math.max(0, Math.min(8, flavor));
        INSERT37.paletteState = buildPalette(PALETTE_MODES[INSERT37.paletteModeIndex]);
        renderCurrentFlavor();
    }

    function onResize() { renderCurrentFlavor(); }

    function regenerateCurrentFlavor() {
        if (INSERT37.currentFlavor === 3 || INSERT37.currentFlavor === 4) { noiseOffset = [Math.random()*1000, Math.random()*1000]; noiseSeed = Math.random()*100; }
        if (INSERT37.currentFlavor === 7 || INSERT37.currentFlavor === 8) { noiseSeed = Math.random()*100; rimHue = Math.random()*360; }
        renderCurrentFlavor();
    }

    function onKeydown(e) {
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        if (e.key >= '0' && e.key <= '8') return setFlavor(parseInt(e.key,10));
        if (e.key === 'r' || e.key === 'R') return regenerateCurrentFlavor();
        if (e.key === 'p' || e.key === 'P') return cyclePalette();
        if (e.key === 'a' || e.key === 'A') return cycleMode();
        if (e.key === 'm' || e.key === 'M') {
            if (INSERT37.currentFlavor === 3 || INSERT37.currentFlavor === 4) {
                currentNoiseModeIdx = (currentNoiseModeIdx + 1) % 6;
            } else if (INSERT37.currentFlavor === 5 || INSERT37.currentFlavor === 6) {
                currentSincosFnIdx = (currentSincosFnIdx + 1) % SINCOS_FUNCTIONS.length;
            }
            renderCurrentFlavor();
            return;
        }
        if (e.key === 'h' || e.key === 'H') { INSERT37.hudVisible = !INSERT37.hudVisible; updateHud(); return; }
    }

    function attachHandlers() {
        if (!INSERT37.resizeAttached) { window.addEventListener('resize', onResize); INSERT37.resizeAttached = true; }
        if (!INSERT37.keyAttached) { window.addEventListener('keydown', onKeydown); INSERT37.keyAttached = true; }
    }

    function init() {
        injectStyles();
        createRoot();
        attachHandlers();
        INSERT37.currentFlavor = getFlavorFromUrl();
        var defaultMode = 'oklch';
        if (window.VisPaletteAdapter && window.VisPaletteAdapter.FAMILY_DEFAULTS && window.VisPaletteAdapter.FAMILY_DEFAULTS[INSERT37.family] && window.VisPaletteAdapter.FAMILY_DEFAULTS[INSERT37.family].mode) defaultMode = window.VisPaletteAdapter.FAMILY_DEFAULTS[INSERT37.family].mode;
        INSERT37.paletteModeIndex = Math.max(0, PALETTE_MODES.indexOf(defaultMode));
        INSERT37.paletteState = buildPalette(PALETTE_MODES[INSERT37.paletteModeIndex]);
        renderCurrentFlavor();
        console.log('insert37 initialized');
    }

    ensureDependencies(init);
})();
