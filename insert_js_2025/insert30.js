/**
 * Insert 30: Plotly Data Visualizations - Multi-Flavor
 * Consolidates 4 Plotly.js experiments into one insert with keyboard-selectable flavors
 *
 * Flavors:
 *   0 - Stacked Bar Charts (barshart.htm)
 *   1 - Violin Plots (violin.htm)
 *   2 - Polar Scatter (polar.htm)
 *   3 - Animated 3D Scatter (scatter.htm)
 *
 * Keys 0-3 to switch flavors
 */

(function() {
    'use strict';

    // ── State ────────────────────────────────────────────────────────────────
    let currentFlavor = 0;
    let activeIntervals = [];
    let plotlyLoaded = false;
    let plotlyLoading = false;
    let pendingFlavor = null;
    const PLOTLY_CDN = 'https://cdn.plot.ly/plotly-3.3.1.min.js';

    // ── Shared Palettes ──────────────────────────────────────────────────────
    const ALL_PALETTES = [
        ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'],
        ['#00d2d3', '#ff9f43', '#ee5a24', '#9c88ff', '#badc58'],
        ['#e056fd', '#686de0', '#30336b', '#f8a5c2', '#63cdda'],
        ['#25CCF7', '#FD7272', '#54a0ff', '#00d2d3', '#1B9CFC'],
        ['#F8EFBA', '#f6e58d', '#ffbe76', '#ff7979', '#badc58'],
        ['#4834d4', '#be2edd', '#22a6b3', '#6ab04c', '#eb4d4b'],
        ['#7bed9f', '#70a1ff', '#5352ed', '#ff4757', '#ffa502'],
        ['#2ed573', '#1e90ff', '#3742fa', '#ff6348', '#eccc68'],
        ['#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#43e97b'],
        ['#fa709a', '#fee140', '#30cfd0', '#330867', '#a8edea'],
        ['#ff9a56', '#ff6a88', '#fcb69f', '#ffecd2', '#ff8177'],
        ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe'],
        ['#fbc2eb', '#a6c1ee', '#fdcbf1', '#e6dee9', '#c3cfe2'],
        ['#08aeea', '#2af598', '#00c9ff', '#92fe9d', '#fa8bff'],
        ['#ff0844', '#ffb199', '#ff6348', '#ff9ff3', '#feca57'],
        ['#11998e', '#38ef7d', '#0ba360', '#3cba92', '#56ab2f'],
        ['#ee0979', '#ff6a00', '#f79d00', '#64f38c', '#ffd89b'],
        ['#c471f5', '#fa71cd', '#a770ef', '#fda085', '#f093fb'],
        ['#43cea2', '#185a9d', '#667eea', '#764ba2', '#f093fb'],
        ['#f2709c', '#ff9472', '#f9a825', '#ffb75e', '#ed8f03']
    ];

    // ── CSS ──────────────────────────────────────────────────────────────────
    const CSS = `
        #insert30-container {
            position: fixed;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            background: #0a0a0a;
            overflow: hidden;
            z-index: 1;
        }
        #insert30-grid {
            display: grid;
            gap: 0;
            height: 100vh;
            width: 100vw;
        }
        .i30-chart {
            background: #111;
            overflow: hidden;
        }
        #insert30-label {
            position: fixed;
            bottom: 12px;
            right: 12px;
            color: rgba(255,255,255,0.25);
            font-family: monospace;
            font-size: 11px;
            z-index: 10;
            pointer-events: none;
        }
    `;

    const FLAVOR_NAMES = ['bar', 'violin', 'polar', '3d-scatter', 'area', 'mixed'];

    // ── Grid Configs ─────────────────────────────────────────────────────────
    const GRID_CONFIGS_FULL = [
        { cols: 1, rows: 2 }, { cols: 2, rows: 1 }, { cols: 2, rows: 2 },
        { cols: 3, rows: 2 }, { cols: 2, rows: 3 }, { cols: 3, rows: 3 },
        { cols: 4, rows: 3 }, { cols: 3, rows: 4 }, { cols: 4, rows: 4 },
        { cols: 5, rows: 3 }, { cols: 3, rows: 5 }, { cols: 5, rows: 4 },
        { cols: 4, rows: 5 }, { cols: 5, rows: 5 }, { cols: 6, rows: 4 },
        { cols: 4, rows: 6 }
    ];

    // Polar uses WebGL — limit to 8 charts max
    const GRID_CONFIGS_POLAR = [
        { cols: 1, rows: 2 }, { cols: 2, rows: 1 }, { cols: 2, rows: 2 },
        { cols: 3, rows: 2 }, { cols: 2, rows: 3 }, { cols: 4, rows: 2 },
        { cols: 2, rows: 4 }
    ];

    // ── Teardown ─────────────────────────────────────────────────────────────
    function teardown() {
        activeIntervals.forEach(id => clearInterval(id));
        activeIntervals = [];
        const container = document.getElementById('insert30-container');
        if (container) container.remove();
    }

    // ── DOM Helpers ──────────────────────────────────────────────────────────
    function buildGrid(gridConfigs) {
        const cfg = gridConfigs[Math.floor(Math.random() * gridConfigs.length)];
        const total = cfg.cols * cfg.rows;

        const container = document.createElement('div');
        container.id = 'insert30-container';

        const grid = document.createElement('div');
        grid.id = 'insert30-grid';
        grid.style.gridTemplateColumns = `repeat(${cfg.cols}, 1fr)`;
        grid.style.gridTemplateRows = `repeat(${cfg.rows}, 1fr)`;
        container.appendChild(grid);

        const label = document.createElement('div');
        label.id = 'insert30-label';
        container.appendChild(label);

        document.body.appendChild(container);

        for (let i = 0; i < total; i++) {
            const div = document.createElement('div');
            div.className = 'i30-chart';
            div.id = `i30-cell-${i}`;
            grid.appendChild(div);
        }

        return { total, cfg };
    }

    function shuffledPalettes(total) {
        const shuffled = ALL_PALETTES.slice().sort(() => Math.random() - 0.5);
        const result = [];
        for (let i = 0; i < total; i++) result.push(shuffled[i % shuffled.length]);
        return result;
    }

    function updateLabel(flavor) {
        const label = document.getElementById('insert30-label');
        if (label) label.textContent = `plotly · ${FLAVOR_NAMES[flavor]} [${flavor}]`;
    }

    // ── Flavor 0: Stacked Bar Charts ─────────────────────────────────────────
    function generateBarData(palette) {
        const numCategories = Math.floor(Math.random() * 8) + 5;
        const numStacks = Math.floor(Math.random() * 3) + 3;
        const categories = [];
        for (let i = 0; i < numCategories; i++) categories.push(`Cat ${i + 1}`);

        const rawData = [];
        for (let i = 0; i < numStacks; i++) {
            const values = [];
            for (let j = 0; j < numCategories; j++) values.push(Math.random() * 100 + 20);
            rawData.push(values);
        }

        const traces = [];
        for (let i = 0; i < numStacks; i++) {
            const normalizedValues = [];
            for (let j = 0; j < numCategories; j++) {
                let total = 0;
                for (let k = 0; k < numStacks; k++) total += rawData[k][j];
                normalizedValues.push((rawData[i][j] / total) * 100);
            }
            traces.push({
                x: categories,
                y: normalizedValues,
                type: 'bar',
                marker: { color: palette[i % palette.length] },
                hoverinfo: 'none'
            });
        }
        return traces;
    }

    function createBarChart(containerId, palette) {
        const traces = generateBarData(palette);
        const layout = {
            paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)',
            margin: { l: 0, r: 0, t: 0, b: 0 }, barmode: 'stack', bargap: 0, showlegend: false,
            xaxis: { visible: false, showgrid: false, zeroline: false, showticklabels: false },
            yaxis: { visible: false, showgrid: false, zeroline: false, showticklabels: false, range: [0, 100], fixedrange: true }
        };
        Plotly.newPlot(containerId, traces, layout, { displayModeBar: false, responsive: true });
    }

    function startFlavor0() {
        const { total } = buildGrid(GRID_CONFIGS_FULL);
        const palettes = shuffledPalettes(total);
        for (let i = 0; i < total; i++) createBarChart(`i30-cell-${i}`, palettes[i]);
        updateLabel(0);
    }

    // ── Flavor 1: Violin Plots ───────────────────────────────────────────────
    function generateViolinData() {
        const numPoints = Math.floor(Math.random() * 100) + 50;
        const data = [];
        const mean = Math.random() * 10;
        const spread = Math.random() * 5 + 1;
        for (let i = 0; i < numPoints; i++) {
            data.push(mean + (Math.random() - 0.5) * spread * 2);
        }
        return data;
    }

    function createViolinChart(containerId, palette) {
        const numViolins = Math.floor(Math.random() * 4) + 2;
        const traces = [];
        for (let i = 0; i < numViolins; i++) {
            traces.push({
                type: 'violin', y: generateViolinData(), name: `V${i}`,
                box: { visible: false }, meanline: { visible: false }, points: false,
                marker: { color: palette[i % palette.length] },
                fillcolor: palette[i % palette.length],
                opacity: 0.8, hoverinfo: 'none'
            });
        }
        const layout = {
            paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)',
            margin: { l: 0, r: 0, t: 0, b: 0 }, showlegend: false,
            xaxis: { visible: false, showgrid: false, zeroline: false, showticklabels: false },
            yaxis: { visible: false, showgrid: false, zeroline: false, showticklabels: false }
        };
        Plotly.newPlot(containerId, traces, layout, { displayModeBar: false, responsive: true });
    }

    function startFlavor1() {
        const { total } = buildGrid(GRID_CONFIGS_FULL);
        const palettes = shuffledPalettes(total);
        for (let i = 0; i < total; i++) createViolinChart(`i30-cell-${i}`, palettes[i]);
        updateLabel(1);
    }

    // ── Flavor 2: Polar Scatter ──────────────────────────────────────────────
    function generatePolarData(N, palette) {
        const x = [], y = [], colors = [];
        const scaleX = Math.random() * 0.5 + 0.5;
        const scaleY = Math.random() * 0.5 + 0.5;
        const rotation = Math.random() * Math.PI;

        for (let i = 0; i < N; i++) {
            const r = Math.random();
            const theta = Math.random() * 2 * Math.PI;
            let px = r * Math.cos(theta) * scaleX;
            let py = r * Math.sin(theta) * scaleY;
            const rotatedX = px * Math.cos(rotation) - py * Math.sin(rotation);
            const rotatedY = px * Math.sin(rotation) + py * Math.cos(rotation);
            x.push(rotatedX);
            y.push(rotatedY);
            colors.push(palette[Math.floor(Math.random() * palette.length)]);
        }
        return { x, y, colors };
    }

    function createPolarChart(containerId, palette) {
        const N = Math.floor(Math.random() * 20000) + 10000;
        const data = generatePolarData(N, palette);
        const trace = {
            x: data.x, y: data.y, mode: 'markers', type: 'scattergl',
            marker: { size: Math.random() * 2 + 1, color: data.colors, opacity: Math.random() * 0.4 + 0.4, line: { width: 0 } },
            hoverinfo: 'none'
        };
        const layout = {
            paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)',
            margin: { l: 0, r: 0, t: 0, b: 0 }, showlegend: false,
            xaxis: { visible: false, showgrid: false, zeroline: false, showticklabels: false, range: [-1.1, 1.1] },
            yaxis: { visible: false, showgrid: false, zeroline: false, showticklabels: false, range: [-1.1, 1.1], scaleanchor: 'x' }
        };
        Plotly.newPlot(containerId, [trace], layout, { displayModeBar: false, responsive: true });
    }

    function startFlavor2() {
        const { total } = buildGrid(GRID_CONFIGS_POLAR);
        const palettes = shuffledPalettes(total);
        for (let i = 0; i < total; i++) createPolarChart(`i30-cell-${i}`, palettes[i]);
        updateLabel(2);
    }

    // ── Flavor 3: Animated 3D Scatter ────────────────────────────────────────
    const NUM_FRAMES = 60;

    function scatter3dRandomColor() {
        const palettes = [
            ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'],
            ['#00d2d3', '#ff9f43', '#ee5a24', '#9c88ff', '#badc58'],
            ['#e056fd', '#686de0', '#30336b', '#f8a5c2', '#63cdda'],
            ['#25CCF7', '#FD7272', '#54a0ff', '#00d2d3', '#1B9CFC'],
            ['#F8EFBA', '#f6e58d', '#ffbe76', '#ff7979', '#badc58'],
            ['#4834d4', '#be2edd', '#22a6b3', '#6ab04c', '#eb4d4b'],
            ['#7bed9f', '#70a1ff', '#5352ed', '#ff4757', '#ffa502'],
            ['#2ed573', '#1e90ff', '#3742fa', '#ff6348', '#eccc68']
        ];
        return palettes[Math.floor(Math.random() * palettes.length)];
    }

    function generateBaseData3d() {
        const n = Math.floor(Math.random() * 150) + 50;
        const points = [];
        const palette = scatter3dRandomColor();
        const pattern = Math.floor(Math.random() * 5);

        for (let i = 0; i < n; i++) {
            let px, py, pz;
            switch (pattern) {
                case 0:
                    px = Math.random() * 10 - 5; py = Math.random() * 10 - 5; pz = Math.random() * 10 - 5; break;
                case 1: {
                    const t = i / n * 4 * Math.PI;
                    px = Math.cos(t) * (1 + t / 3); py = Math.sin(t) * (1 + t / 3); pz = t; break;
                }
                case 2: {
                    const phi = Math.random() * Math.PI * 2;
                    const theta = Math.random() * Math.PI;
                    const r = 3;
                    px = r * Math.sin(theta) * Math.cos(phi);
                    py = r * Math.sin(theta) * Math.sin(phi);
                    pz = r * Math.cos(theta); break;
                }
                case 3: {
                    const cx = (Math.floor(Math.random() * 3) - 1) * 4;
                    const cy = (Math.floor(Math.random() * 3) - 1) * 4;
                    const cz = (Math.floor(Math.random() * 3) - 1) * 4;
                    px = cx + (Math.random() - 0.5) * 2;
                    py = cy + (Math.random() - 0.5) * 2;
                    pz = cz + (Math.random() - 0.5) * 2; break;
                }
                case 4:
                    px = (i / n) * 10 - 5;
                    py = Math.sin(i / n * Math.PI * 4) * 3;
                    pz = Math.cos(i / n * Math.PI * 4) * 3; break;
            }
            points.push({ x: px, y: py, z: pz, color: palette[Math.floor(Math.random() * palette.length)] });
        }
        return { points, palette };
    }

    function rotatePoint3d(point, angleY, angleZ) {
        const x1 = point.x * Math.cos(angleY) - point.z * Math.sin(angleY);
        const z1 = point.x * Math.sin(angleY) + point.z * Math.cos(angleY);
        const y1 = point.y;
        const x2 = x1 * Math.cos(angleZ) - y1 * Math.sin(angleZ);
        const y2 = x1 * Math.sin(angleZ) + y1 * Math.cos(angleZ);
        return { x: x2, y: y2, z: z1, color: point.color };
    }

    function generateFrames3d(baseData) {
        const frames = [];
        for (let f = 0; f < NUM_FRAMES; f++) {
            const progress = f / NUM_FRAMES;
            const angleY = progress * Math.PI * 2;
            const angleZ = progress * Math.PI;
            frames.push(baseData.points.map(p => rotatePoint3d(p, angleY, angleZ)));
        }
        return frames;
    }

    function createScatter3dPlot(containerId) {
        const baseData = generateBaseData3d();
        const frames = generateFrames3d(baseData);
        const markerSize = Math.random() * 4 + 2;
        const markerOpacity = Math.random() * 0.4 + 0.6;

        const trace = {
            x: frames[0].map(p => p.x), y: frames[0].map(p => p.y), z: frames[0].map(p => p.z),
            mode: 'markers', type: 'scatter3d',
            marker: { size: markerSize, color: frames[0].map(p => p.color), opacity: markerOpacity },
            hoverinfo: 'none'
        };
        const layout = {
            paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)',
            margin: { l: 0, r: 0, t: 0, b: 0 }, showlegend: false,
            scene: {
                xaxis: { visible: false, showgrid: false, zeroline: false, showticklabels: false },
                yaxis: { visible: false, showgrid: false, zeroline: false, showticklabels: false },
                zaxis: { visible: false, showgrid: false, zeroline: false, showticklabels: false },
                bgcolor: 'rgba(0,0,0,0)',
                camera: { eye: { x: (Math.random() - 0.5) * 3, y: (Math.random() - 0.5) * 3, z: (Math.random() - 0.5) * 3 + 1.5 } }
            }
        };

        Plotly.newPlot(containerId, [trace], layout, { displayModeBar: false, responsive: true }).then(() => {
            let currentFrame = 0;
            let direction = 1;
            const intervalId = setInterval(() => {
                // Only animate if still in DOM
                if (!document.getElementById(containerId)) {
                    clearInterval(intervalId);
                    return;
                }
                const frameData = frames[currentFrame];
                Plotly.restyle(containerId, {
                    x: [frameData.map(p => p.x)],
                    y: [frameData.map(p => p.y)],
                    z: [frameData.map(p => p.z)]
                }, [0]);
                currentFrame += direction;
                if (currentFrame >= NUM_FRAMES - 1) direction = -1;
                else if (currentFrame <= 0) direction = 1;
            }, 50);
            activeIntervals.push(intervalId);
        });
    }

    function startFlavor3() {
        // Fixed 4x4 grid for 3D scatter (same as original)
        const container = document.createElement('div');
        container.id = 'insert30-container';
        document.body.appendChild(container);

        const grid = document.createElement('div');
        grid.id = 'insert30-grid';
        grid.style.gridTemplateColumns = 'repeat(4, 1fr)';
        grid.style.gridTemplateRows = 'repeat(4, 1fr)';
        grid.style.gap = '5px';
        grid.style.height = 'calc(100vh - 20px)';
        grid.style.padding = '10px';
        grid.style.boxSizing = 'border-box';
        container.appendChild(grid);

        const label = document.createElement('div');
        label.id = 'insert30-label';
        container.appendChild(label);

        for (let i = 0; i < 16; i++) {
            const div = document.createElement('div');
            div.className = 'i30-chart';
            div.id = `i30-cell-${i}`;
            div.style.borderRadius = '8px';
            grid.appendChild(div);
        }

        for (let i = 0; i < 16; i++) createScatter3dPlot(`i30-cell-${i}`);
        updateLabel(3);
    }

    // ── Flavor 4: Stacked Area Charts ────────────────────────────────────────
    function generateAreaData(palette) {
        const numPoints = Math.floor(Math.random() * 30) + 20;
        const numStacks = Math.floor(Math.random() * 3) + 3;
        const x = [];
        for (let i = 0; i < numPoints; i++) x.push(i);

        const rawData = [];
        for (let i = 0; i < numStacks; i++) {
            const values = [];
            for (let j = 0; j < numPoints; j++) values.push(Math.random() * 100 + 20);
            rawData.push(values);
        }

        const traces = [];
        for (let i = 0; i < numStacks; i++) {
            const normalizedValues = [];
            for (let j = 0; j < numPoints; j++) {
                let total = 0;
                for (let k = 0; k < numStacks; k++) total += rawData[k][j];
                normalizedValues.push((rawData[i][j] / total) * 100);
            }
            traces.push({
                x: x, y: normalizedValues,
                type: 'scatter', mode: 'none', fill: 'tonexty',
                fillcolor: palette[i % palette.length],
                line: { width: 0, shape: 'spline', smoothing: 1.3 },
                stackgroup: 'one', hoverinfo: 'none'
            });
        }
        return traces;
    }

    function createAreaChart(containerId, palette) {
        const traces = generateAreaData(palette);
        const layout = {
            paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)',
            margin: { l: 0, r: 0, t: 0, b: 0 }, showlegend: false,
            xaxis: { visible: false, showgrid: false, zeroline: false, showticklabels: false },
            yaxis: { visible: false, showgrid: false, zeroline: false, showticklabels: false, range: [0, 100], fixedrange: true }
        };
        Plotly.newPlot(containerId, traces, layout, { displayModeBar: false, responsive: true });
    }

    function startFlavor4() {
        const { total } = buildGrid(GRID_CONFIGS_FULL);
        const palettes = shuffledPalettes(total);
        for (let i = 0; i < total; i++) createAreaChart(`i30-cell-${i}`, palettes[i]);
        updateLabel(4);
    }

    // ── Flavor 5: Mixed Random Grid ──────────────────────────────────────────
    // Smaller grid configs to stay within WebGL context limits when mixing
    // polar (scattergl) and 3d-scatter cells
    const GRID_CONFIGS_MIXED = [
        { cols: 2, rows: 2 }, { cols: 3, rows: 2 }, { cols: 2, rows: 3 },
        { cols: 3, rows: 3 }, { cols: 4, rows: 3 }, { cols: 3, rows: 4 },
        { cols: 4, rows: 4 }
    ];

    function createMixedCell(cellId, type, palette) {
        switch (type) {
            case 0: createBarChart(cellId, palette); break;
            case 1: createViolinChart(cellId, palette); break;
            case 2: createPolarChart(cellId, palette); break;
            case 3: createScatter3dPlot(cellId); break;
            case 4: createAreaChart(cellId, palette); break;
        }
    }

    function startFlavor5() {
        const cfg = GRID_CONFIGS_MIXED[Math.floor(Math.random() * GRID_CONFIGS_MIXED.length)];
        const total = cfg.cols * cfg.rows;

        const container = document.createElement('div');
        container.id = 'insert30-container';

        const grid = document.createElement('div');
        grid.id = 'insert30-grid';
        grid.style.gridTemplateColumns = `repeat(${cfg.cols}, 1fr)`;
        grid.style.gridTemplateRows = `repeat(${cfg.rows}, 1fr)`;
        container.appendChild(grid);

        const label = document.createElement('div');
        label.id = 'insert30-label';
        container.appendChild(label);

        document.body.appendChild(container);

        for (let i = 0; i < total; i++) {
            const div = document.createElement('div');
            div.className = 'i30-chart';
            div.id = `i30-cell-${i}`;
            grid.appendChild(div);
        }

        const palettes = shuffledPalettes(total);

        // Track WebGL budget: polar + 3d each cost 1 context; cap at 8 total
        let webglCount = 0;
        const MAX_WEBGL = 8;

        for (let i = 0; i < total; i++) {
            let type = Math.floor(Math.random() * 5); // 0-4
            // If WebGL budget exhausted, remap polar(2) and 3d(3) to non-WebGL types
            if ((type === 2 || type === 3) && webglCount >= MAX_WEBGL) {
                type = Math.floor(Math.random() * 2) === 0 ? 0 : 4; // bar or area
            }
            if (type === 2 || type === 3) webglCount++;
            createMixedCell(`i30-cell-${i}`, type, palettes[i]);
        }

        const label2 = document.getElementById('insert30-label');
        if (label2) label2.textContent = `plotly · mixed [5]`;
    }

    // ── Plotly Loader ────────────────────────────────────────────────────────
    function loadPlotly(callback) {
        if (plotlyLoaded) { callback(); return; }
        if (plotlyLoading) { pendingFlavor = callback; return; }
        plotlyLoading = true;

        const script = document.createElement('script');
        script.src = PLOTLY_CDN;
        script.onload = function() {
            plotlyLoaded = true;
            plotlyLoading = false;
            callback();
            if (pendingFlavor) { pendingFlavor(); pendingFlavor = null; }
        };
        script.onerror = function() {
            console.error('insert30: Failed to load Plotly.js from CDN');
            plotlyLoading = false;
        };
        document.head.appendChild(script);
    }

    // ── Start Visualization ──────────────────────────────────────────────────
    function startVisualization(flavor) {
        teardown();
        currentFlavor = flavor !== undefined ? flavor : 0;

        // Inject CSS once
        if (!document.getElementById('insert30-styles')) {
            const style = document.createElement('style');
            style.id = 'insert30-styles';
            style.textContent = CSS;
            document.head.appendChild(style);
        }

        loadPlotly(function() {
            switch (currentFlavor) {
                case 0: startFlavor0(); break;
                case 1: startFlavor1(); break;
                case 2: startFlavor2(); break;
                case 3: startFlavor3(); break;
                case 4: startFlavor4(); break;
                case 5: startFlavor5(); break;
                default: startFlavor0();
            }
        });
    }

    // ── Keyboard Handler ─────────────────────────────────────────────────────
    function handleKeydown(e) {
        const key = parseInt(e.key);
        if (!isNaN(key) && key >= 0 && key <= 5) {
            startVisualization(key);
        }
    }

    // ── Watermark Click ──────────────────────────────────────────────────────
    function handleWatermarkClick() {}

    // ── Init ─────────────────────────────────────────────────────────────────
    document.addEventListener('keydown', handleKeydown);
    startVisualization(Math.floor(Math.random() * 6));

})();
