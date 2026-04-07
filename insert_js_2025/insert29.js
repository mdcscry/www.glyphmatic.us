/**
 * Insert 29: Lotus / Flower-Of-Life - Multi-Flavor Edition
 *
 * Flavors (0-6):
 * 0: flower_of_life_grid.htm
 * 1: lotus_redo.htm
 * 2: lotus_circlepack.htm
 * 3: lotus_circlepack_grid.htm
 * 4: lotus_circlepack_nooverlap.htm
 * 5: lotus_grid.htm
 * 6: petals_circlepack.htm
 */

console.log('insert29.js loaded');

var INSERT29 = {
    currentFlavor: null,
    root: null,
    infoPanel: null,
    styleEl: null,
    keyHandlerAttached: false,
    runToken: 0,
    timerIds: new Set(),
    cleanupFns: []
};

function changeHtmlDisplayInline() {
    // Required by g.us3.htm
}

function trackTimeout(fn, delay, token) {
    var id = setTimeout(function () {
        INSERT29.timerIds.delete(id);
        if (token !== INSERT29.runToken) return;
        fn();
    }, delay);
    INSERT29.timerIds.add(id);
    return id;
}

function clearAllTrackedTimeouts() {
    INSERT29.timerIds.forEach(function (id) {
        clearTimeout(id);
    });
    INSERT29.timerIds.clear();
}

function registerCleanup(fn) {
    INSERT29.cleanupFns.push(fn);
}

function runCleanup() {
    clearAllTrackedTimeouts();
    INSERT29.cleanupFns.forEach(function (fn) {
        try { fn(); } catch (e) { console.warn('insert29 cleanup warning:', e); }
    });
    INSERT29.cleanupFns = [];
}

function injectStyles() {
    if (document.getElementById('insert29-style')) return;
    var style = document.createElement('style');
    style.id = 'insert29-style';
    style.textContent = "\
@import url('https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1&display=swap');\
\
#insert29-root {\
  position: fixed;\
  inset: 0;\
  overflow: hidden;\
  z-index: 1;\
}\
\
#insert29-root .mandala-stage {\
  position: relative;\
  width: 100%;\
  height: 100%;\
}\
\
#insert29-root .single-center {\
  display: flex;\
  align-items: center;\
  justify-content: center;\
}\
\
#insert29-root .mandala-wrap {\
  position: relative;\
  border-radius: 50%;\
  overflow: visible;\
}\
\
#insert29-root .mandala-main-layer,\
#insert29-root .mandala-inner-layer {\
  position: absolute;\
  inset: 0;\
}\
\
#insert29-root .mandala-ring,\
#insert29-root .mandala-circle,\
#insert29-root .mandala-fol {\
  position: absolute;\
  border-radius: 50%;\
  background: transparent;\
  pointer-events: none;\
}\
\
#insert29-root .mandala-ring {\
  border: 2px solid;\
}\
\
#insert29-root .mandala-circle {\
  border: 1.5px solid;\
}\
\
#insert29-root .mandala-fol {\
  border: 1.8px solid;\
}\
\
#insert29-root .mandala-petal {\
  position: absolute;\
  font-family: 'Shippori Mincho B1', serif;\
  line-height: 1;\
  font-weight: 100;\
  pointer-events: none;\
}\
\
#insert29-root .mandala-glow {\
  position: absolute;\
  border-radius: 50%;\
  pointer-events: none;\
}\
\
#insert29-root .mandala-spoke-mask {\
  position: absolute;\
  inset: 0;\
  overflow: hidden;\
  border-radius: 50%;\
}\
\
#insert29-root .gm-grid {\
  position: relative;\
  width: 100%;\
  height: 100%;\
  display: grid;\
  gap: 8px;\
  padding: 8px;\
  box-sizing: border-box;\
}\
\
#insert29-root .gm-cell {\
  position: relative;\
  overflow: hidden;\
  border-radius: 2px;\
  display: flex;\
  align-items: center;\
  justify-content: center;\
}\
\
#insert29-root .fol-cell {\
  position: relative;\
  width: 100%;\
  height: 100%;\
  border-radius: 2px;\
  overflow: visible;\
  display: flex;\
  align-items: center;\
  justify-content: center;\
}\
\
#insert29-root .fol-container {\
  position: relative;\
  opacity: 0;\
  transition: opacity 1s ease;\
}\
\
#insert29-root .fol-circle {\
  position: absolute;\
  border-radius: 50%;\
  border-width: 0.5px;\
  border-style: solid;\
  background: transparent;\
  pointer-events: none;\
  transition: border-color 8s ease-in-out;\
  box-sizing: border-box;\
}\
\
#insert29-root .hexagon-border {\
  position: absolute;\
  width: 100%;\
  height: 100%;\
  top: 0;\
  left: 0;\
  pointer-events: none;\
}\
\
#insert29-root .pack-lotus {\
  position: absolute;\
  transform: translate(-50%, -50%);\
  opacity: 0;\
  cursor: pointer;\
  transition: all 1s ease;\
}\
\
#insert29-root .pack-lotus.visible {\
  opacity: 1;\
}\
\
#insert29-root .pack-lotus.hidden {\
  opacity: 0 !important;\
  pointer-events: none;\
}\
\
#insert29-root .pack-lotus.focused {\
  z-index: 9999;\
  transform-origin: center center !important;\
}\
\
#insert29-root .pack-lotus.rotating-cw {\
  animation: insert29RotateCW var(--rotation-duration, 20s) linear infinite;\
  transform-origin: center center;\
}\
\
#insert29-root .pack-lotus.rotating-ccw {\
  animation: insert29RotateCCW var(--rotation-duration, 20s) linear infinite;\
  transform-origin: center center;\
}\
\
#insert29-root .pack-lotus.fading-out {\
  opacity: 0;\
}\
\
#insert29-root #packing-container {\
  width: 100%;\
  height: 100%;\
  position: relative;\
}\
\
#insert29-root .lotus-container {\
  position: absolute;\
  transform: translate(-50%, -50%);\
  pointer-events: auto;\
  opacity: 0;\
  cursor: pointer;\
  transition: all 1s ease;\
}\
\
#insert29-root .lotus-container.focused {\
  z-index: 9999;\
  cursor: pointer;\
}\
\
#insert29-root .lotus-container.hidden {\
  opacity: 0 !important;\
  pointer-events: none;\
}\
\
#insert29-root .lotus-container.visible {\
  opacity: 1;\
}\
\
#insert29-root .lotus-container.rotating-cw {\
  animation: rotateLotus-cw var(--rotation-duration, 20s) linear infinite;\
}\
\
#insert29-root .lotus-container.rotating-ccw {\
  animation: rotateLotus-ccw var(--rotation-duration, 20s) linear infinite;\
}\
\
#insert29-root .lotus-container.fading-out {\
  opacity: 0;\
}\
\
#insert29-root .lotus-inner {\
  position: relative;\
  width: 100%;\
  height: 100%;\
}\
\
#insert29-root .lotus-circle {\
  position: absolute;\
  border-radius: 50%;\
  border-width: calc(1.5px * var(--border-scale, 1));\
  border-style: solid;\
  background: transparent;\
  pointer-events: none;\
}\
\
#insert29-root .lotus-concentric-ring {\
  position: absolute;\
  border-radius: 50%;\
  border-width: calc(2px * var(--border-scale, 1));\
  border-style: solid;\
  pointer-events: none;\
}\
\
#insert29-root .lotus-fol-circle {\
  position: absolute;\
  border-radius: 50%;\
  border-width: calc(1.5px * var(--border-scale, 1));\
  border-style: solid;\
  background: transparent;\
}\
\
#insert29-root .lotus-center-circle {\
  border-width: calc(2px * var(--border-scale, 1)) !important;\
}\
\
@keyframes rotateLotus-cw {\
  from { transform: translate(-50%, -50%) rotate(0deg) scale(var(--lotus-scale, 1)); }\
  to { transform: translate(-50%, -50%) rotate(360deg) scale(var(--lotus-scale, 1)); }\
}\
\
@keyframes rotateLotus-ccw {\
  from { transform: translate(-50%, -50%) rotate(0deg) scale(var(--lotus-scale, 1)); }\
  to { transform: translate(-50%, -50%) rotate(-360deg) scale(var(--lotus-scale, 1)); }\
}\
\
.insert29-info {\
  position: fixed;\
  bottom: 20px;\
  left: 20px;\
  background: rgba(20, 20, 35, 0.9);\
  border: 1px solid rgba(255,255,255,0.25);\
  color: #fff;\
  font-family: 'Courier New', monospace;\
  padding: 8px 12px;\
  border-radius: 8px;\
  font-size: 13px;\
  z-index: 1002;\
  cursor: pointer;\
}\
\
.insert29-info.collapsed .insert29-info-body {\
  display: none;\
}\
\
.insert29-help {\
  position: fixed;\
  right: 16px;\
  bottom: 16px;\
  background: rgba(0,0,0,0.7);\
  color: #ddd;\
  font-family: 'Courier New', monospace;\
  font-size: 12px;\
  padding: 6px 8px;\
  border-radius: 6px;\
  z-index: 1001;\
  pointer-events: none;\
}\
\
@keyframes insert29RotateCW {\
  from { transform: translate(-50%, -50%) rotate(0deg) scale(var(--lotus-scale, 1)); }\
  to { transform: translate(-50%, -50%) rotate(360deg) scale(var(--lotus-scale, 1)); }\
}\
\
@keyframes insert29RotateCCW {\
  from { transform: translate(-50%, -50%) rotate(0deg) scale(var(--lotus-scale, 1)); }\
  to { transform: translate(-50%, -50%) rotate(-360deg) scale(var(--lotus-scale, 1)); }\
}\
\
@keyframes insert29LayerCW {\
  from { transform: rotate(0deg); }\
  to { transform: rotate(360deg); }\
}\
\
@keyframes insert29LayerCCW {\
  from { transform: rotate(0deg); }\
  to { transform: rotate(-360deg); }\
}\
";
    document.head.appendChild(style);
    INSERT29.styleEl = style;
}

function withAlpha(oklchColor, alpha) {
    if (typeof oklchColor !== 'string') return oklchColor;
    return oklchColor.replace(/\)\s*$/, ' / ' + alpha + ')');
}

function rand(min, max) {
    return min + Math.random() * (max - min);
}

function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function pickWeighted(items) {
    var total = 0;
    for (var i = 0; i < items.length; i++) total += items[i].weight;
    var r = Math.random() * total;
    var acc = 0;
    for (var j = 0; j < items.length; j++) {
        acc += items[j].weight;
        if (r <= acc) return items[j].value;
    }
    return items[items.length - 1].value;
}

function createEl(tag, cls) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    return el;
}

function buildPalette(size) {
    var count = size || (2 + Math.floor(Math.random() * 3));
    var out = [];
    for (var i = 0; i < count; i++) out.push(ColorPalette.generateOKLCH());
    return out;
}

function addCircle(parent, cls, x, y, d, color, borderW) {
    var el = createEl('div', cls);
    el.style.width = d + 'px';
    el.style.height = d + 'px';
    el.style.left = (x - d / 2) + 'px';
    el.style.top = (y - d / 2) + 'px';
    if (color) el.style.borderColor = color;
    if (borderW) el.style.borderWidth = borderW + 'px';
    parent.appendChild(el);
    return el;
}

function makeMandala(options) {
    var opts = options || {};
    var size = opts.size || 800;
    var scale = size / 800;
    var cx = size / 2;
    var cy = size / 2;

    var palette = opts.palette || buildPalette();
    var wrap = createEl('div', 'mandala-wrap');
    wrap.style.width = size + 'px';
    wrap.style.height = size + 'px';

    if (opts.backgroundGradient !== false) {
        var g = palette[0];
        wrap.style.background = 'radial-gradient(circle, ' + withAlpha(g, 0.5) + ' 0%, ' + withAlpha(g, 0.25) + ' 35%, transparent 85%)';
    }

    var mainLayer = createEl('div', 'mandala-main-layer');
    var innerLayer = createEl('div', 'mandala-inner-layer');
    wrap.appendChild(mainLayer);
    wrap.appendChild(innerLayer);

    var dir = Math.random() < 0.5 ? 'insert29LayerCW' : 'insert29LayerCCW';
    var opp = dir === 'insert29LayerCW' ? 'insert29LayerCCW' : 'insert29LayerCW';
    var mainSpeed = opts.mainSpeed || rand(60, 180);
    var innerSpeed = opts.innerSpeed || rand(60, 180);

    mainLayer.style.animation = dir + ' ' + mainSpeed + 's linear infinite';
    innerLayer.style.animation = opp + ' ' + innerSpeed + 's linear infinite';

    var folRadiusRatio = (typeof opts.folRadiusRatio === 'number') ? opts.folRadiusRatio : (50 / 800);
    var folR = size * folRadiusRatio;
    var folOffset = folR;
    var innerRadius = 100 * scale;
    var outerRadius = 350 * scale;

    if (opts.concentric !== false) {
        var ringCount = opts.ringCount || (6 + Math.floor(Math.random() * 3));
        for (var ri = 0; ri < ringCount; ri++) {
            var t = ringCount === 1 ? 0 : ri / (ringCount - 1);
            var rr = innerRadius + (outerRadius - innerRadius) * t;
            addCircle(mainLayer, 'mandala-ring', cx, cy, rr * 2, palette[ri % palette.length], 2);
        }
    }

    if (opts.spokes) {
        var spokesMask = createEl('div', 'mandala-spoke-mask');
        spokesMask.style.clipPath = 'circle(' + outerRadius + 'px at ' + cx + 'px ' + cy + 'px)';
        mainLayer.appendChild(spokesMask);

        var innerMask = createEl('div', 'mandala-ring');
        innerMask.style.width = (innerRadius * 2) + 'px';
        innerMask.style.height = (innerRadius * 2) + 'px';
        innerMask.style.left = (cx - innerRadius) + 'px';
        innerMask.style.top = (cy - innerRadius) + 'px';
        innerMask.style.border = 'none';
        innerMask.style.background = '#111522';
        innerMask.style.zIndex = '5';
        spokesMask.appendChild(innerMask);

        var spokeCountSet = opts.spokeCountSet || [18, 36, 54, 72, 108];
        var spokeCount = pick(spokeCountSet);
        var spokeDiameter = (opts.spokeDiameter || 371) * scale;
        var spokeRadius = spokeDiameter / 2;

        for (var si = 0; si < spokeCount; si++) {
            var sa = ((Math.PI * 2) / spokeCount) * si - Math.PI / 2;
            var sx = cx + spokeRadius * Math.cos(sa);
            var sy = cy + spokeRadius * Math.sin(sa);
            addCircle(spokesMask, 'mandala-circle', sx, sy, spokeDiameter, palette[si % palette.length], 1.5);
        }

        wrap.dataset.spokeCount = String(spokeCount);
    }

    if (opts.toroidal) {
        var torusDiameter = (outerRadius - innerRadius);
        var torusCenterRadius = (innerRadius + outerRadius) / 2;
        var torusCount = opts.torusCount || pick([24, 36, 48, 60, 72, 84]);
        for (var ti = 0; ti < torusCount; ti++) {
            var ta = ((Math.PI * 2) / torusCount) * ti - Math.PI / 2;
            var tx = cx + torusCenterRadius * Math.cos(ta);
            var ty = cy + torusCenterRadius * Math.sin(ta);
            addCircle(mainLayer, 'mandala-circle', tx, ty, torusDiameter, palette[ti % palette.length], 1.5).style.opacity = '0.5';
        }
    }

    var folColor = palette[1] || palette[0];
    var folOuterColor = palette[2] || folColor;
    addCircle(innerLayer, 'mandala-fol', cx, cy, folR * 2, folColor, 2);
    for (var fi = 0; fi < 6; fi++) {
        var fa = (Math.PI / 3) * fi - Math.PI / 2;
        var fx = cx + folOffset * Math.cos(fa);
        var fy = cy + folOffset * Math.sin(fa);
        addCircle(innerLayer, 'mandala-fol', fx, fy, folR * 2, folColor, 1.6);
    }

    if (opts.folOuterRing) {
        var outerAlignedScale = opts.folOuterAlignedScale || 2;
        var outerInterleavedScale = opts.folOuterInterleavedScale || Math.sqrt(3);
        for (var fo = 0; fo < 6; fo++) {
            // Aligned outer ring circles (distance 2*offset)
            var foA1 = (Math.PI / 3) * fo - Math.PI / 2;
            var foX1 = cx + (folOffset * outerAlignedScale) * Math.cos(foA1);
            var foY1 = cy + (folOffset * outerAlignedScale) * Math.sin(foA1);
            addCircle(innerLayer, 'mandala-fol', foX1, foY1, folR * 2, folOuterColor, 1.5);

            // Interleaved outer ring circles (distance sqrt(3)*offset)
            var foA2 = (Math.PI / 3) * fo + (Math.PI / 6) - Math.PI / 2;
            var foX2 = cx + (folOffset * outerInterleavedScale) * Math.cos(foA2);
            var foY2 = cy + (folOffset * outerInterleavedScale) * Math.sin(foA2);
            addCircle(innerLayer, 'mandala-fol', foX2, foY2, folR * 2, folOuterColor, 1.5);
        }
    }

    if (opts.hexBorder) {
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 ' + size + ' ' + size);
        svg.style.position = 'absolute';
        svg.style.inset = '0';

        var poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        var hexRadiusRatio = (typeof opts.hexRadiusRatio === 'number') ? opts.hexRadiusRatio : 0.46;
        var hexRadius = size * hexRadiusRatio;
        var pts = [];
        for (var hi = 0; hi < 6; hi++) {
            var ha = (Math.PI / 3) * hi - Math.PI / 2;
            pts.push((cx + hexRadius * Math.cos(ha)).toFixed(2) + ',' + (cy + hexRadius * Math.sin(ha)).toFixed(2));
        }
        poly.setAttribute('points', pts.join(' '));
        poly.setAttribute('fill', 'none');
        poly.setAttribute('stroke', palette[0]);
        poly.setAttribute('stroke-width', '2');
        poly.setAttribute('opacity', '0.6');
        svg.appendChild(poly);
        mainLayer.appendChild(svg);
    }

    if (opts.surroundingCircle) {
        var surround = size * 0.96;
        addCircle(mainLayer, 'mandala-ring', cx, cy, surround, pick(palette), 2).style.opacity = '0.7';
    }

    var glow = createEl('div', 'mandala-glow');
    var glowSize = 500 * scale;
    glow.style.width = glowSize + 'px';
    glow.style.height = glowSize + 'px';
    glow.style.left = (cx - glowSize / 2) + 'px';
    glow.style.top = (cy - glowSize / 2) + 'px';
    var gcol = palette[palette.length - 1];
    glow.style.background = 'radial-gradient(circle, ' + withAlpha(gcol, 0.35) + ' 0%, ' + withAlpha(gcol, 0.15) + ' 40%, transparent 85%)';
    mainLayer.appendChild(glow);

    if (opts.petals) {
        var petalCount = opts.petalCount || 12;
        var petalColor = palette[Math.floor(palette.length / 2)];
        var petalDistance = outerRadius + 20 * scale;
        for (var pi = 0; pi < petalCount; pi++) {
            var pa = ((Math.PI * 2) / petalCount) * pi - Math.PI / 2;
            var px = cx + petalDistance * Math.cos(pa);
            var py = cy + petalDistance * Math.sin(pa);
            var petal = createEl('div', 'mandala-petal');
            petal.textContent = '}';
            petal.style.fontSize = (opts.petalFontSize || 200) * scale + 'px';
            petal.style.color = petalColor;
            petal.style.left = px + 'px';
            petal.style.top = py + 'px';
            petal.style.transform = 'translate(-50%, -50%) rotate(' + (((360 / petalCount) * pi) - 88) + 'deg)';
            mainLayer.appendChild(petal);
        }
    }

    return {
        el: wrap,
        palette: palette,
        spokeCount: wrap.dataset.spokeCount ? parseInt(wrap.dataset.spokeCount, 10) : null
    };
}

function createRoot() {
    if (INSERT29.root) INSERT29.root.remove();
    var root = createEl('div');
    root.id = 'insert29-root';
    document.body.appendChild(root);
    INSERT29.root = root;
    return root;
}

function createHelpOverlay() {
    var help = createEl('div', 'insert29-help');
    help.textContent = 'insert29  keys: 0-6 flavors';
    INSERT29.root.appendChild(help);
}

function setupInfoPanel(title, bodyRows) {
    if (INSERT29.infoPanel) INSERT29.infoPanel.remove();
    var panel = createEl('div', 'insert29-info collapsed');
    var head = createEl('div', 'insert29-info-head');
    head.textContent = title;
    panel.appendChild(head);

    var body = createEl('div', 'insert29-info-body');
    bodyRows.forEach(function (row) {
        var line = createEl('div');
        line.textContent = row;
        body.appendChild(line);
    });
    panel.appendChild(body);

    panel.addEventListener('click', function () {
        panel.classList.toggle('collapsed');
    });

    document.body.appendChild(panel);
    INSERT29.infoPanel = panel;
}

function removeInfoPanel() {
    if (INSERT29.infoPanel) {
        INSERT29.infoPanel.remove();
        INSERT29.infoPanel = null;
    }
}

function rectBoundaryPacking(width, height) {
    var circles = [];
    var numBoundaryPoints = Math.floor(rand(3, 21));
    var margin = 0;
    var rectWidth = width - margin * 2;
    var rectHeight = height - margin * 2;
    var perimeter = 2 * (rectWidth + rectHeight);
    var segmentLength = perimeter / numBoundaryPoints;

    function dist(a, b) {
        var dx = a.x - b.x;
        var dy = a.y - b.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    for (var i = 0; i < numBoundaryPoints; i++) {
        var d = i * segmentLength;
        var x, y;
        if (d < rectWidth) {
            x = margin + d; y = margin;
        } else if (d < rectWidth + rectHeight) {
            x = width - margin; y = margin + (d - rectWidth);
        } else if (d < 2 * rectWidth + rectHeight) {
            x = width - margin - (d - rectWidth - rectHeight); y = height - margin;
        } else {
            x = margin; y = height - margin - (d - 2 * rectWidth - rectHeight);
        }
        circles.push({ x: x, y: y, r: rand(80, 140), type: 'boundary', id: i });
    }

    var numInterior = Math.floor(rand(3, 11));
    for (var ii = 0; ii < numInterior; ii++) {
        var attempts = 0;
        while (attempts < 100) {
            var ix = margin + Math.random() * rectWidth;
            var iy = margin + Math.random() * rectHeight;
            var ir = rand(150, 300);
            var overlap = circles.some(function (c) { return dist({ x: ix, y: iy }, c) < ir + c.r + 20; });
            attempts++;
            if (!overlap) {
                circles.push({ x: ix, y: iy, r: ir, type: 'interior', id: circles.length });
                break;
            }
        }
    }

    var cx = width / 2;
    var cy = height / 2;
    for (var iter = 0; iter < 140; iter++) {
        for (var ci = 0; ci < circles.length; ci++) {
            if (circles[ci].type === 'boundary') continue;
            var fx = (cx - circles[ci].x) * 0.005;
            var fy = (cy - circles[ci].y) * 0.005;

            for (var cj = 0; cj < circles.length; cj++) {
                if (ci === cj) continue;
                var d2 = dist(circles[ci], circles[cj]);
                var minDist = circles[ci].r + circles[cj].r;
                if (d2 < minDist * 1.8 && d2 > 0.001) {
                    var force = (minDist * 1.8 - d2) / d2;
                    fx += (circles[ci].x - circles[cj].x) * force * 0.4;
                    fy += (circles[ci].y - circles[cj].y) * force * 0.4;
                }
            }

            circles[ci].x += fx;
            circles[ci].y += fy;
            circles[ci].x = Math.max(margin + circles[ci].r, Math.min(width - margin - circles[ci].r, circles[ci].x));
            circles[ci].y = Math.max(margin + circles[ci].r, Math.min(height - margin - circles[ci].r, circles[ci].y));
        }
    }

    return circles;
}

function noOverlapPacking(width, height, opts) {
    var options = opts || {};
    var minRadius = options.minRadius || 80;
    var maxRadius = options.maxRadius || 270;
    var circles = [];

    function dist(a, b) {
        var dx = a.x - b.x;
        var dy = a.y - b.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    var numBoundaryPoints = 6 + Math.floor(Math.random() * 5);
    for (var i = 0; i < numBoundaryPoints; i++) {
        var r = rand(minRadius, maxRadius);
        var side = i % 4;
        var x, y;
        if (side === 0) { x = r + Math.random() * (width - 2 * r); y = r; }
        else if (side === 1) { x = width - r; y = r + Math.random() * (height - 2 * r); }
        else if (side === 2) { x = r + Math.random() * (width - 2 * r); y = height - r; }
        else { x = r; y = r + Math.random() * (height - 2 * r); }
        circles.push({ x: x, y: y, r: r, type: 'boundary', id: circles.length });
    }

    var targetInterior = (options.interiorMin || 5) + Math.floor(Math.random() * ((options.interiorMax || 15) - (options.interiorMin || 5) + 1));

    for (var t = 0; t < targetInterior; t++) {
        var placed = false;
        var attempts = 0;
        var currentMin = minRadius;
        if (t > 5) currentMin = 40;

        while (attempts < 400 && !placed) {
            var rr = rand(currentMin, maxRadius);
            if (width < 2 * rr || height < 2 * rr) {
                attempts++;
                continue;
            }
            var xx = rr + Math.random() * (width - 2 * rr);
            var yy = rr + Math.random() * (height - 2 * rr);

            var overlap = false;
            for (var c = 0; c < circles.length; c++) {
                if (dist({ x: xx, y: yy }, circles[c]) < rr + circles[c].r + 3) {
                    overlap = true;
                    break;
                }
            }
            if (!overlap) {
                circles.push({ x: xx, y: yy, r: rr, type: 'interior', id: circles.length });
                placed = true;
            }
            attempts++;
        }
    }

    for (var iter = 0; iter < 70; iter++) {
        for (var i2 = 0; i2 < circles.length; i2++) {
            if (circles[i2].type === 'boundary') continue;
            var fx2 = 0;
            var fy2 = 0;
            for (var j2 = 0; j2 < circles.length; j2++) {
                if (i2 === j2) continue;
                var d3 = dist(circles[i2], circles[j2]);
                var minD = circles[i2].r + circles[j2].r + 3;
                if (d3 < minD && d3 > 0.001) {
                    var f = (minD - d3) / d3;
                    fx2 += (circles[i2].x - circles[j2].x) * f * 0.5;
                    fy2 += (circles[i2].y - circles[j2].y) * f * 0.5;
                }
            }
            circles[i2].x += fx2;
            circles[i2].y += fy2;
            circles[i2].x = Math.max(circles[i2].r, Math.min(width - circles[i2].r, circles[i2].x));
            circles[i2].y = Math.max(circles[i2].r, Math.min(height - circles[i2].r, circles[i2].y));
        }
    }

    return circles;
}

function attachFocusForLotusCollection(items, stateObj, token) {
    function focusLotus(lotus) {
        stateObj.focused = lotus;
        var vw = window.innerWidth;
        var vh = window.innerHeight;
        var scale = (vh * 0.995) / parseFloat(lotus.style.width);

        items.forEach(function (el) {
            if (el !== lotus) el.classList.add('hidden');
        });

        lotus.classList.add('focused');
        lotus.style.left = (vw / 2) + 'px';
        lotus.style.top = (vh / 2) + 'px';
        lotus.style.transform = 'translate(-50%, -50%) scale(var(--lotus-scale, 1))';
        lotus.style.animationDirection = 'normal';
        lotus.style.animationTimingFunction = 'linear';
        lotus.style.setProperty('--lotus-scale', scale);
        lotus.style.setProperty('--border-scale', 1 / scale);
        lotus.querySelectorAll('.mandala-ring, .mandala-circle, .mandala-fol').forEach(function (s) {
            if (!s.dataset.origBw) {
                s.dataset.origBw = String(parseFloat(getComputedStyle(s).borderTopWidth) || 1);
            }
            var base = parseFloat(s.dataset.origBw) || 1;
            s.style.borderWidth = (base / scale) + 'px';
        });

        var innerLayers = lotus.querySelectorAll('.mandala-main-layer, .mandala-inner-layer');
        innerLayers.forEach(function (layer) {
            layer.dataset.origAnim = layer.style.animation;
            var m = layer.style.animation.match(/(insert29LayerCW|insert29LayerCCW)\s+([\d.]+)s/);
            if (m) {
                layer.style.animation = m[1] + ' ' + (parseFloat(m[2]) * 2.5) + 's linear infinite';
            }
        });
    }

    function unfocusLotus() {
        if (!stateObj.focused) return;
        var lotus = stateObj.focused;
        lotus.classList.remove('focused');
        lotus.style.setProperty('--lotus-scale', 1);
        lotus.style.setProperty('--border-scale', 1);
        lotus.querySelectorAll('.mandala-ring, .mandala-circle, .mandala-fol').forEach(function (s) {
            if (s.dataset.origBw) s.style.borderWidth = s.dataset.origBw + 'px';
        });

        var innerLayers = lotus.querySelectorAll('.mandala-main-layer, .mandala-inner-layer');
        innerLayers.forEach(function (layer) {
            if (layer.dataset.origAnim) layer.style.animation = layer.dataset.origAnim;
        });

        items.forEach(function (el) {
            el.classList.remove('hidden');
        });

        stateObj.focused = null;
    }

    stateObj.unfocus = unfocusLotus;

    items.forEach(function (lotus) {
        lotus.addEventListener('click', function (e) {
            e.stopPropagation();
            if (token !== INSERT29.runToken) return;
            if (stateObj.focused) {
                unfocusLotus();
                if (typeof stateObj.regenerate === 'function') stateObj.regenerate();
            } else {
                focusLotus(lotus);
            }
        });
    });
}

function runFlavor0_FlowerOfLifeGrid(token) {
    var stage = createEl('div', 'mandala-stage');
    INSERT29.root.appendChild(stage);

    var gridConfigs = {
        '2x2': { cols: 2, rows: 2 },
        '3x3': { cols: 3, rows: 3 },
        '4x4': { cols: 4, rows: 4 },
        '5x5': { cols: 5, rows: 5 },
        '6x6': { cols: 6, rows: 6 },
        '5x4': { cols: 5, rows: 4 },
        '6x4': { cols: 6, rows: 4 }
    };

    var currentLayout = pickWeighted([
        { value: '2x2', weight: 10 },
        { value: '3x3', weight: 9 },
        { value: '4x4', weight: 5 },
        { value: '5x5', weight: 2 },
        { value: '6x6', weight: 1 },
        { value: '5x4', weight: 4 },
        { value: '6x4', weight: 2 }
    ]);
    var cfg = gridConfigs[currentLayout];

    var bg = ColorPalette.generateOKLCH(rand(0.15, 0.35), 0.05, rand(0, 360));
    document.body.style.backgroundColor = bg;

    var grid = createEl('div', 'gm-grid');
    grid.style.gridTemplateColumns = 'repeat(' + cfg.cols + ', 1fr)';
    grid.style.gridTemplateRows = 'repeat(' + cfg.rows + ', 1fr)';
    stage.appendChild(grid);

    var focused = null;

    function createRoundedHexPath(centerX, centerY, hexRadius, cornerRadius) {
        var points = [];
        for (var i = 0; i < 6; i++) {
            var angle = (Math.PI / 3) * i - Math.PI / 2;
            points.push({
                x: centerX + hexRadius * Math.cos(angle),
                y: centerY + hexRadius * Math.sin(angle)
            });
        }

        var pathData = '';
        for (var p = 0; p < points.length; p++) {
            var curr = points[p];
            var next = points[(p + 1) % points.length];
            var prev = points[(p - 1 + points.length) % points.length];

            var dx1 = curr.x - prev.x;
            var dy1 = curr.y - prev.y;
            var len1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);

            var dx2 = next.x - curr.x;
            var dy2 = next.y - curr.y;
            var len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

            var offset = Math.min(cornerRadius, len1 / 2, len2 / 2);
            var p1x = curr.x - (dx1 / len1) * offset;
            var p1y = curr.y - (dy1 / len1) * offset;
            var p2x = curr.x + (dx2 / len2) * offset;
            var p2y = curr.y + (dy2 / len2) * offset;

            if (p === 0) pathData += 'M ' + p1x + ' ' + p1y;
            pathData += ' Q ' + curr.x + ' ' + curr.y + ' ' + p2x + ' ' + p2y;

            if (p < points.length - 1) {
                var nextP1x = next.x - (dx2 / len2) * offset;
                var nextP1y = next.y - (dy2 / len2) * offset;
                pathData += ' L ' + nextP1x + ' ' + nextP1y;
            }
        }

        pathData += ' Z';
        return pathData;
    }

    function createFlowerOfLife(size) {
        if (!size || size <= 0) size = 100;
        var strokePx = Math.max(0.5, 1 / (window.devicePixelRatio || 1));

        var container = createEl('div', 'fol-container');
        container.style.position = 'relative';
        container.style.width = size + 'px';
        container.style.height = size + 'px';
        container.style.opacity = '0';
        container.style.transition = 'opacity 1s ease';

        var centerX = size / 2;
        var centerY = size / 2;
        var circleRadius = size / 7.2;
        var offset = circleRadius;

        var colorCount = 2 + Math.floor(Math.random() * 2);
        var colors = [];
        for (var c = 0; c < colorCount; c++) colors.push(ColorPalette.generateOKLCH());

        var centerRing = [];
        var innerRing = [];
        var outerRing = [];

        function addFolCircle(x, y, radius, color, borderWidth) {
            var circle = createEl('div', 'fol-circle');
            circle.style.width = (radius * 2) + 'px';
            circle.style.height = (radius * 2) + 'px';
            circle.style.left = (x - radius) + 'px';
            circle.style.top = (y - radius) + 'px';
            circle.style.borderColor = color;
            circle.style.borderWidth = (typeof borderWidth === 'number' ? borderWidth : strokePx) + 'px';
            circle.style.transition = 'border-color 8s ease-in-out';
            container.appendChild(circle);
            return circle;
        }

        centerRing.push(addFolCircle(centerX, centerY, circleRadius, colors[0], strokePx));

        for (var i1 = 0; i1 < 6; i1++) {
            var a1 = (Math.PI / 3) * i1 - Math.PI / 2;
            innerRing.push(addFolCircle(
                centerX + offset * Math.cos(a1),
                centerY + offset * Math.sin(a1),
                circleRadius,
                colors[1 % colors.length],
                strokePx
            ));
        }

        for (var i2 = 0; i2 < 6; i2++) {
            var a2 = (Math.PI / 3) * i2 - Math.PI / 2;
            outerRing.push(addFolCircle(
                centerX + (offset * 2) * Math.cos(a2),
                centerY + (offset * 2) * Math.sin(a2),
                circleRadius,
                colors[2 % colors.length],
                strokePx
            ));

            var a3 = (Math.PI / 3) * i2 + (Math.PI / 6) - Math.PI / 2;
            outerRing.push(addFolCircle(
                centerX + (offset * Math.sqrt(3)) * Math.cos(a3),
                centerY + (offset * Math.sqrt(3)) * Math.sin(a3),
                circleRadius,
                colors[2 % colors.length],
                strokePx
            ));
        }

        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'hexagon-border');
        svg.setAttribute('viewBox', '0 0 ' + size + ' ' + size);
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', createRoundedHexPath(centerX, centerY, size * 0.46, size * 0.05));
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', colors[0]);
        path.setAttribute('stroke-width', String(strokePx));
        path.setAttribute('opacity', '0.6');
        path.setAttribute('vector-effect', 'non-scaling-stroke');
        path.style.transition = 'stroke 3s ease-in-out';
        svg.appendChild(path);
        container.appendChild(svg);

        var surroundingRadius = size * 0.48;
        var surrounding = addFolCircle(
            centerX,
            centerY,
            surroundingRadius,
            colors[Math.floor(Math.random() * colors.length)],
            strokePx
        );

        surrounding.style.transition = 'border-color 8s ease-in-out';

        function animateColors() {
            if (token !== INSERT29.runToken) return;
            var newCenter = ColorPalette.generateOKLCH();
            var newInner = ColorPalette.generateOKLCH();
            var newOuter = ColorPalette.generateOKLCH();
            var newHex = ColorPalette.generateOKLCH();
            var newSurround = ColorPalette.generateOKLCH();
            centerRing.forEach(function (el) { el.style.borderColor = newCenter; });
            innerRing.forEach(function (el) { el.style.borderColor = newInner; });
            outerRing.forEach(function (el) { el.style.borderColor = newOuter; });
            surrounding.style.borderColor = newSurround;
            path.setAttribute('stroke', newHex);
            trackTimeout(animateColors, 15000 + Math.random() * 15000, token);
        }

        trackTimeout(animateColors, 1000 + Math.random() * 2000, token);
        trackTimeout(function () { container.style.opacity = '1'; }, 100, token);
        return container;
    }

    function focusFlower(wrap, cell) {
        if (focused) return;
        focused = {
            wrap: wrap,
            cell: cell,
            parent: cell.parentElement,
            previousStyle: cell.getAttribute('style') || ''
        };
        INSERT29.root.appendChild(cell);
        cell.style.position = 'fixed';
        cell.style.left = '0';
        cell.style.top = '0';
        cell.style.width = '100vw';
        cell.style.height = '100vh';
        cell.style.zIndex = '1000';
        cell.style.display = 'flex';
        cell.style.alignItems = 'center';
        cell.style.justifyContent = 'center';
        cell.style.borderRadius = '0';
        cell.style.overflow = 'visible';
        cell.style.background = '#0a0a15';
        cell.style.transition = 'all 1s ease';
        cell.style.cursor = 'pointer';
        cell.style.pointerEvents = 'auto';

        var target = Math.min(window.innerWidth, window.innerHeight) * 0.95;
        var current = parseFloat(wrap.style.width || '100');
        var scale = target / current;
        wrap.style.transform = 'scale(' + scale + ')';
        wrap.style.transformOrigin = 'center center';
    }

    function unfocusFlower() {
        if (!focused) return;
        focused.wrap.style.transform = 'none';
        focused.cell.setAttribute('style', focused.previousStyle);
        grid.style.display = 'grid';
        grid.appendChild(focused.cell);
        focused = null;
    }

    for (var i = 0; i < cfg.cols * cfg.rows; i++) {
        var cell = createEl('div', 'fol-cell');
        var c1 = ColorPalette.generateOKLCH(rand(0.2, 0.45), 0.04, rand(0, 360));
        cell.style.background = withAlpha(c1, 0.3);
        cell.style.overflow = 'visible';

        var cellW = Math.max(grid.clientWidth / cfg.cols - 8, 0);
        var cellH = Math.max(grid.clientHeight / cfg.rows - 8, 0);
        var mandalaSize = Math.max(Math.min(cellW, cellH) * 0.9, 100);

        var built = createFlowerOfLife(mandalaSize);

        built.style.cursor = 'pointer';
        built.style.pointerEvents = 'auto';
        built.addEventListener('click', (function (w, c) {
            return function (e) {
                e.stopPropagation();
                if (token !== INSERT29.runToken) return;
                if (focused) {
                    unfocusFlower();
                } else {
                    grid.style.display = 'none';
                    focusFlower(w, c);
                }
            };
        })(built, cell));

        cell.appendChild(built);
        grid.appendChild(cell);
    }

    var onResize = function () {
        if (token !== INSERT29.runToken) return;
        startVisualization(INSERT29.currentFlavor);
    };
    window.addEventListener('resize', onResize);
    registerCleanup(function () { window.removeEventListener('resize', onResize); });
}

function runFlavor1_LotusRedo(token) {
    var stage = createEl('div', 'mandala-stage single-center');
    INSERT29.root.appendChild(stage);

    var built = makeMandala({
        size: Math.min(window.innerWidth, window.innerHeight) * 0.9,
        palette: buildPalette(),
        concentric: true,
        toroidal: false,
        petals: true,
        spokes: true,
        hexBorder: false,
        surroundingCircle: false,
        mainSpeed: rand(60, 180),
        innerSpeed: rand(60, 180)
    });

    stage.appendChild(built.el);

    var spokeText = built.spokeCount !== null ? ('Spokes: ' + built.spokeCount) : 'Spokes: --';
    setupInfoPanel('Lotus Redo', [spokeText]);

    var onResize = function () {
        if (token !== INSERT29.runToken) return;
        startVisualization(INSERT29.currentFlavor);
    };
    window.addEventListener('resize', onResize);
    registerCleanup(function () { window.removeEventListener('resize', onResize); });
}

function runFlavor2_LotusCirclePack(token) {
    var stage = createEl('div', 'mandala-stage');
    var container = createEl('div');
    container.id = 'packing-container';
    stage.appendChild(container);
    INSERT29.root.appendChild(stage);

    var circles = [];
    var lotusElements = [];
    var focusedLotus = null;
    var bodyBgColor = null;

    function distance(p1, p2) {
        return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
    }

    function generateCirclePacking() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        var centerX = width / 2;
        var centerY = height / 2;
        var margin = 0;
        var numBoundaryPoints = 3 + Math.random() * 18;

        circles = [];

        var rectWidth = width - margin * 2;
        var rectHeight = height - margin * 2;
        var perimeter = 2 * (rectWidth + rectHeight);
        var segmentLength = perimeter / numBoundaryPoints;

        for (var i = 0; i < numBoundaryPoints; i++) {
            var dist = i * segmentLength;
            var x, y;
            if (dist < rectWidth) {
                x = margin + dist; y = margin;
            } else if (dist < rectWidth + rectHeight) {
                x = width - margin; y = margin + (dist - rectWidth);
            } else if (dist < 2 * rectWidth + rectHeight) {
                x = width - margin - (dist - rectWidth - rectHeight); y = height - margin;
            } else {
                x = margin; y = height - margin - (dist - 2 * rectWidth - rectHeight);
            }

            var r = 80 + Math.random() * 60;
            circles.push({ x: x, y: y, r: r, type: 'boundary', id: i });
        }

        var numInterior = Math.floor(3 + Math.random() * 8);
        for (var ii = 0; ii < numInterior; ii++) {
            var ix, iy, ir;
            var attempts = 0;
            do {
                ix = margin + Math.random() * rectWidth;
                iy = margin + Math.random() * rectHeight;
                ir = 150 + Math.random() * 150;
                attempts++;
            } while (attempts < 100 && circles.some(function (c) { return distance({ x: ix, y: iy }, c) < ir + c.r + 20; }));
            circles.push({ x: ix, y: iy, r: ir, type: 'interior', id: numBoundaryPoints + ii });
        }

        for (var iter = 0; iter < 150; iter++) {
            for (var ci = 0; ci < circles.length; ci++) {
                if (circles[ci].type === 'boundary') continue;
                var fx = 0;
                var fy = 0;
                fx += (centerX - circles[ci].x) * 0.005;
                fy += (centerY - circles[ci].y) * 0.005;

                for (var cj = 0; cj < circles.length; cj++) {
                    if (ci === cj) continue;
                    var d = distance(circles[ci], circles[cj]);
                    var minDist = circles[ci].r + circles[cj].r;
                    if (d < minDist * 1.8) {
                        var force = (minDist * 1.8 - d) / d;
                        fx += (circles[ci].x - circles[cj].x) * force * 0.4;
                        fy += (circles[ci].y - circles[cj].y) * force * 0.4;
                    }
                }

                circles[ci].x += fx;
                circles[ci].y += fy;
                circles[ci].x = Math.max(margin + circles[ci].r, Math.min(width - margin - circles[ci].r, circles[ci].x));
                circles[ci].y = Math.max(margin + circles[ci].r, Math.min(height - margin - circles[ci].r, circles[ci].y));
            }
        }
    }

    function createLotus(circle, color1, color2) {
        var lotusDiv = createEl('div', 'lotus-container');
        lotusDiv.style.left = circle.x + 'px';
        lotusDiv.style.top = circle.y + 'px';
        lotusDiv.style.width = (circle.r * 2) + 'px';
        lotusDiv.style.height = (circle.r * 2) + 'px';
        lotusDiv.circleData = circle;

        var inner = createEl('div', 'lotus-inner');
        if (Math.random() < 0.5) {
            inner.style.background = Math.random() < 0.5
                ? 'radial-gradient(circle at center, ' + color1 + '22 0%, ' + color2 + '11 50%, transparent 70%)'
                : 'radial-gradient(circle at center, ' + color2 + '22 0%, ' + color1 + '11 50%, transparent 70%)';
        }
        var outerLayer = createEl('div', 'mandala-main-layer');
        var figurateLayer = createEl('div', 'mandala-inner-layer');
        var outerLayer = createEl('div', 'mandala-main-layer');
        var figurateLayer = createEl('div', 'mandala-inner-layer');
        var outerLayer = createEl('div', 'mandala-main-layer');
        var figurateLayer = createEl('div', 'mandala-inner-layer');
        lotusDiv.appendChild(inner);
        inner.appendChild(outerLayer);
        inner.appendChild(figurateLayer);
        inner.appendChild(outerLayer);
        inner.appendChild(figurateLayer);
        inner.appendChild(outerLayer);
        inner.appendChild(figurateLayer);

        var scale = (circle.r * 2) / 900;
        var centerX = circle.r;
        var centerY = circle.r;
        var folCircleRadius = 50 * scale;
        var folOffset = 50 * scale;

        var centerCircle = createEl('div', 'lotus-fol-circle lotus-center-circle');
        centerCircle.style.width = (folCircleRadius * 2) + 'px';
        centerCircle.style.height = (folCircleRadius * 2) + 'px';
        centerCircle.style.left = (centerX - folCircleRadius) + 'px';
        centerCircle.style.top = (centerY - folCircleRadius) + 'px';
        centerCircle.style.borderColor = color2;
        figurateLayer.appendChild(centerCircle);

        for (var i = 0; i < 6; i++) {
            var angle = (Math.PI / 3) * i - Math.PI / 2;
            var x = centerX + folOffset * Math.cos(angle);
            var y = centerY + folOffset * Math.sin(angle);
            var fol = createEl('div', 'lotus-fol-circle');
            fol.style.width = (folCircleRadius * 2) + 'px';
            fol.style.height = (folCircleRadius * 2) + 'px';
            fol.style.left = (x - folCircleRadius) + 'px';
            fol.style.top = (y - folCircleRadius) + 'px';
            fol.style.borderColor = color1;
            figurateLayer.appendChild(fol);
        }

        var innerRadius = 100 * scale;
        var outerRadius = 350 * scale;
        var concentricRadii = [100, 150, 200, 250, 300, 350].map(function (r) { return r * scale; });
        concentricRadii.forEach(function (radius, index) {
            var ring = createEl('div', 'lotus-concentric-ring');
            ring.style.width = (radius * 2) + 'px';
            ring.style.height = (radius * 2) + 'px';
            ring.style.left = (centerX - radius) + 'px';
            ring.style.top = (centerY - radius) + 'px';
            ring.style.borderColor = index / (concentricRadii.length - 1) < 0.5 ? color1 : color2;
            ring.style.opacity = String(0.6 + ((index / (concentricRadii.length - 1)) * 0.4));
            outerLayer.appendChild(ring);
        });

        var torusDiameter = (outerRadius - innerRadius);
        var torusCenterRadius = (innerRadius + outerRadius) / 2;
        var torusOptions = [24, 36, 48, 60, 72, 84];
        var numTorusCircles = torusOptions[Math.floor(Math.random() * torusOptions.length)];

        for (var ti = 0; ti < numTorusCircles; ti++) {
            var ta = (2 * Math.PI / numTorusCircles) * ti - Math.PI / 2;
            var tx = centerX + torusCenterRadius * Math.cos(ta);
            var ty = centerY + torusCenterRadius * Math.sin(ta);
            var tc = createEl('div', 'lotus-circle');
            tc.style.width = torusDiameter + 'px';
            tc.style.height = torusDiameter + 'px';
            tc.style.left = (tx - torusDiameter / 2) + 'px';
            tc.style.top = (ty - torusDiameter / 2) + 'px';
            tc.style.borderColor = ti % 2 === 0 ? color1 : color2;
            tc.style.opacity = '0.5';
            inner.appendChild(tc);
        }

        lotusDiv.addEventListener('click', function (e) {
            e.stopPropagation();
            if (token !== INSERT29.runToken) return;
            if (focusedLotus) {
                unfocusLotus();
                regeneratePage();
            } else {
                focusLotus(lotusDiv);
            }
        });

        return lotusDiv;
    }

    function generateNewLotusCircle() {
        if (Math.random() < 0.1) return null;
        var width = window.innerWidth;
        var height = window.innerHeight;
        var margin = 150;
        var rectWidth = width - margin * 2;
        var rectHeight = height - margin * 2;
        var x, y, r;
        var attempts = 0;
        var maxAttempts = 100;
        do {
            x = margin + Math.random() * rectWidth;
            y = margin + Math.random() * rectHeight;
            r = 100 + Math.random() * 300;
            attempts++;
        } while (attempts < maxAttempts && circles.some(function (c) { return c.type === 'interior' && distance({ x: x, y: y }, c) < r + c.r + 100; }));
        if (attempts >= maxAttempts) return null;
        return { x: x, y: y, r: r, type: 'interior', id: Date.now() };
    }

    function createNewLotus() {
        var circle = generateNewLotusCircle();
        if (!circle) return null;
        circles.push(circle);
        var palette = ColorPalette.generateGlyphPalette(bodyBgColor, 6, 4, 8);
        var color1 = palette[Math.floor(Math.random() * palette.length)];
        var color2 = palette[Math.floor(Math.random() * palette.length)];
        while (color2 === color1 && palette.length > 1) color2 = palette[Math.floor(Math.random() * palette.length)];
        var lotus = createLotus(circle, color1, color2);
        container.appendChild(lotus);
        var fadeInDuration = 2000 + Math.random() * 3000;
        lotus.style.transition = 'opacity ' + fadeInDuration + 'ms ease';
        trackTimeout(function () { lotus.classList.add('visible'); }, 100, token);
        return lotus;
    }

    function focusLotus(lotus) {
        focusedLotus = lotus;
        var vw = window.innerWidth;
        var vh = window.innerHeight;
        var centerX = vw / 2;
        var centerY = vh / 2;
        var currentSize = parseFloat(lotus.style.width);
        var targetSize = vh * 0.995;
        var scale = targetSize / currentSize;
        lotusElements.forEach(function (el) { if (el !== lotus) el.classList.add('hidden'); });
        lotus.classList.add('focused');
        lotus.style.left = centerX + 'px';
        lotus.style.top = centerY + 'px';
        lotus.style.setProperty('--lotus-scale', scale);
        lotus.style.setProperty('--border-scale', 1 / scale);
        if (!lotus.classList.contains('rotating-cw') && !lotus.classList.contains('rotating-ccw')) {
            lotus.classList.add(Math.random() < 0.5 ? 'rotating-cw' : 'rotating-ccw');
        }
    }

    function unfocusLotus() {
        if (!focusedLotus) return;
        focusedLotus.classList.remove('focused');
        focusedLotus = null;
    }

    function regeneratePage() {
        lotusElements.forEach(function (el) { el.remove(); });
        lotusElements = [];
        focusedLotus = null;
        bodyBgColor = ColorPalette.generateOKLCH(0.2 + Math.random() * 0.3, 0.05 + Math.random() * 0.1, Math.random() * 360);
        stage.style.backgroundColor = bodyBgColor;
        generateCirclePacking();
        render();
        trackTimeout(startRotation, 1000, token);
    }

    function render() {
        lotusElements.forEach(function (el) { el.remove(); });
        lotusElements = [];
        var interiorCircles = circles.filter(function (c) { return c.type === 'interior'; });
        interiorCircles.forEach(function (circle, index) {
            var palette = ColorPalette.generateGlyphPalette(bodyBgColor, 6, 4, 8);
            var color1 = palette[Math.floor(Math.random() * palette.length)];
            var color2 = palette[Math.floor(Math.random() * palette.length)];
            while (color2 === color1 && palette.length > 1) color2 = palette[Math.floor(Math.random() * palette.length)];
            var lotus = createLotus(circle, color1, color2);
            container.appendChild(lotus);
            lotusElements.push(lotus);
            var fadeInDuration = 2000 + Math.random() * 3000;
            lotus.style.transition = 'opacity ' + fadeInDuration + 'ms ease';
            trackTimeout(function () { lotus.classList.add('visible'); }, 100 * index, token);
        });
    }

    function startRotation() {
        function rotateRandomLotus() {
            if (token !== INSERT29.runToken) return;
            if (lotusElements.length === 0) {
                trackTimeout(rotateRandomLotus, 1000, token);
                return;
            }
            if (focusedLotus) {
                trackTimeout(rotateRandomLotus, 1000, token);
                return;
            }
            var selectedLotus = lotusElements[Math.floor(Math.random() * lotusElements.length)];
            if (selectedLotus.classList.contains('rotating-cw') || selectedLotus.classList.contains('rotating-ccw')) {
                trackTimeout(rotateRandomLotus, 500, token);
                return;
            }

            var radius = selectedLotus.circleData.r;
            var sizeRatio = radius / 80;
            var minTime = 10 * sizeRatio;
            var maxTime = 25 * sizeRatio;
            var rotationTime = minTime * 1000 + Math.random() * (maxTime - minTime) * 1000;
            selectedLotus.style.setProperty('--rotation-duration', rotationTime + 'ms');
            selectedLotus.classList.add(Math.random() < 0.5 ? 'rotating-cw' : 'rotating-ccw');

            trackTimeout(function () {
                if (token !== INSERT29.runToken || focusedLotus) return;
                var fadeOutDuration = 4000 + Math.random() * 4000 + (sizeRatio * 2000);
                selectedLotus.style.transition = 'opacity ' + fadeOutDuration + 'ms ease';
                selectedLotus.classList.add('fading-out');

                trackTimeout(function () {
                    if (token !== INSERT29.runToken || focusedLotus) return;
                    if (selectedLotus.circleData) {
                        var circleIndex = circles.findIndex(function (c) { return c.id === selectedLotus.circleData.id; });
                        if (circleIndex !== -1) circles.splice(circleIndex, 1);
                    }
                    selectedLotus.remove();
                    var indexToRemove = lotusElements.indexOf(selectedLotus);
                    if (indexToRemove !== -1) lotusElements.splice(indexToRemove, 1);
                    var newLotus = createNewLotus();
                    if (newLotus) lotusElements.push(newLotus);
                }, fadeOutDuration, token);
            }, rotationTime, token);

            var nextDelay = 1000 + Math.random() * 3000;
            trackTimeout(rotateRandomLotus, nextDelay, token);
        }

        var numConcurrent = 2 + Math.floor(Math.random() * 2);
        for (var i = 0; i < numConcurrent; i++) {
            trackTimeout(rotateRandomLotus, 1000 + i * 1000, token);
        }
    }

    bodyBgColor = ColorPalette.generateOKLCH(0.2 + Math.random() * 0.3, 0.05 + Math.random() * 0.1, Math.random() * 360);
    stage.style.backgroundColor = bodyBgColor;
    generateCirclePacking();
    render();
    trackTimeout(startRotation, 1000, token);

    var onResize = function () {
        if (token !== INSERT29.runToken) return;
        lotusElements.forEach(function (el) { el.remove(); });
        lotusElements = [];
        generateCirclePacking();
        render();
        trackTimeout(startRotation, 1000, token);
    };
    window.addEventListener('resize', onResize);
    registerCleanup(function () { window.removeEventListener('resize', onResize); });
}

function runPackFlavor(token, options) {
    var opts = options || {};
    var stage = createEl('div', 'mandala-stage');
    INSERT29.root.appendChild(stage);

    var warmBg = opts.warmBg ? pick(['AntiqueWhite', 'Linen', 'OldLace', 'Cornsilk', 'BlanchedAlmond', 'PapayaWhip', 'Wheat', 'NavajoWhite', 'black']) : '#0a0a15';
    stage.style.background = warmBg;

    var circles = opts.packing === 'nooverlap'
        ? noOverlapPacking(window.innerWidth, window.innerHeight, opts.packOpts)
        : rectBoundaryPacking(window.innerWidth, window.innerHeight);

    var lotuses = [];
    var state = { focused: null, unfocus: null, regenerate: null };

    function createLotus(circle, idx) {
        var el = createEl('div', 'pack-lotus');
        el.style.left = circle.x + 'px';
        el.style.top = circle.y + 'px';
        el.style.width = (circle.r * 2) + 'px';
        el.style.height = (circle.r * 2) + 'px';
        el.circleData = circle;

        var lotusSizeScale = (typeof opts.lotusSizeScale === 'number') ? opts.lotusSizeScale : 1;
        var config = {
            size: circle.r * 2 * lotusSizeScale,
            palette: opts.perLotusPalette ? buildPalette() : [ColorPalette.generateOKLCH(), ColorPalette.generateOKLCH(), ColorPalette.generateOKLCH()],
            concentric: true,
            toroidal: !!opts.toroidal,
            petals: !!opts.petals,
            spokes: !!opts.spokes,
            hexBorder: false,
            surroundingCircle: false,
            mainSpeed: opts.counterRotate ? rand(100, 170) : rand(40, 90),
            innerSpeed: opts.counterRotate ? rand(60, 120) : rand(40, 90)
        };

        var mandala = makeMandala(config);
        el.appendChild(mandala.el);

        stage.appendChild(el);
        trackTimeout(function () { el.classList.add('visible'); }, 100 * idx, token);
        return el;
    }

    var interior = circles.filter(function (c) { return opts.includeBoundary ? true : c.type === 'interior'; });
    interior.forEach(function (c, i) {
        lotuses.push(createLotus(c, i));
    });

    if (opts.focusable) {
        attachFocusForLotusCollection(lotuses, state, token);
    }

    function regenerate() {
        if (state.unfocus) state.unfocus();
        lotuses.forEach(function (el) { el.remove(); });
        lotuses = [];

        circles = opts.packing === 'nooverlap'
            ? noOverlapPacking(window.innerWidth, window.innerHeight, opts.packOpts)
            : rectBoundaryPacking(window.innerWidth, window.innerHeight);

        interior = circles.filter(function (c) { return opts.includeBoundary ? true : c.type === 'interior'; });
        interior.forEach(function (c, i) {
            lotuses.push(createLotus(c, i));
        });

        if (opts.focusable) attachFocusForLotusCollection(lotuses, state, token);

        trackTimeout(startRotationLifecycle, 800, token);
    }
    state.regenerate = regenerate;

    function createNewCircle() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        var minR = opts.newMinRadius || 50;
        var maxR = opts.newMaxRadius || 270;
        var attempts = 0;

        function dist(a, b) {
            var dx = a.x - b.x;
            var dy = a.y - b.y;
            return Math.sqrt(dx * dx + dy * dy);
        }

        while (attempts < 240) {
            var r = rand(minR, maxR);
            if (width < 2 * r || height < 2 * r) {
                attempts++;
                continue;
            }
            var x = r + Math.random() * (width - 2 * r);
            var y = r + Math.random() * (height - 2 * r);

            var overlap = false;
            for (var i = 0; i < circles.length; i++) {
                if (circles[i].type !== 'interior') continue;
                if (dist({ x: x, y: y }, circles[i]) < r + circles[i].r + (opts.minGap || 3)) {
                    overlap = true;
                    break;
                }
            }
            if (!overlap) return { x: x, y: y, r: r, type: 'interior', id: Date.now() + Math.floor(Math.random() * 1000) };
            attempts++;
        }
        return null;
    }

    function startRotationLifecycle() {
        function spinOne() {
            if (token !== INSERT29.runToken) return;
            if (!lotuses.length) {
                trackTimeout(spinOne, 1000, token);
                return;
            }
            if (state.focused) {
                trackTimeout(spinOne, 1000, token);
                return;
            }

            var selected = pick(lotuses);
            if (!selected || selected.classList.contains('rotating-cw') || selected.classList.contains('rotating-ccw') || selected.classList.contains('fading-out')) {
                trackTimeout(spinOne, 500, token);
                return;
            }

            var radius = selected.circleData ? selected.circleData.r : 100;
            var ratio = radius / 80;
            var spinMs = (opts.spinBaseMin || 10000) * ratio + Math.random() * ((opts.spinBaseMax || 25000) * ratio - (opts.spinBaseMin || 10000) * ratio);
            var dir = Math.random() < 0.5 ? 'cw' : 'ccw';

            selected.style.setProperty('--rotation-duration', spinMs + 'ms');
            selected.classList.add('rotating-' + dir);

            trackTimeout(function () {
                if (token !== INSERT29.runToken || state.focused) return;
                var fadeMs = (opts.fadeBaseMin || 4000) + Math.random() * ((opts.fadeBaseMax || 9000) - (opts.fadeBaseMin || 4000)) + ratio * 1500;
                selected.style.transition = 'opacity ' + fadeMs + 'ms ease';
                selected.classList.add('fading-out');

                trackTimeout(function () {
                    if (token !== INSERT29.runToken || state.focused) return;

                    if (selected.circleData) {
                        var ci = circles.findIndex(function (c) { return c.id === selected.circleData.id; });
                        if (ci !== -1) circles.splice(ci, 1);
                    }

                    selected.remove();
                    var li = lotuses.indexOf(selected);
                    if (li !== -1) lotuses.splice(li, 1);

                    if (opts.dynamicReplenish !== false) {
                        var nc = createNewCircle();
                        if (nc) {
                            circles.push(nc);
                            lotuses.push(createLotus(nc, 0));
                            if (opts.focusable) attachFocusForLotusCollection(lotuses, state, token);
                        }
                    }
                }, fadeMs, token);
            }, spinMs, token);

            trackTimeout(spinOne, (opts.nextDelayMin || 1000) + Math.random() * ((opts.nextDelayMax || 4000) - (opts.nextDelayMin || 1000)), token);
        }

        var concurrent = opts.concurrent || 3;
        for (var i = 0; i < concurrent; i++) {
            trackTimeout(spinOne, 900 + i * 900, token);
        }
    }

    if (opts.lifecycle !== false) {
        trackTimeout(startRotationLifecycle, 900, token);
    }

    var onResize = function () {
        if (token !== INSERT29.runToken) return;
        regenerate();
    };
    window.addEventListener('resize', onResize);
    registerCleanup(function () { window.removeEventListener('resize', onResize); });
}

function runFlavor3_CirclePackGrid(token) {
    var stage = createEl('div', 'mandala-stage');
    INSERT29.root.appendChild(stage);

    var gridConfigs = {
        '2x2': { cols: 2, rows: 2 },
        '3x3': { cols: 3, rows: 3 },
        '4x4': { cols: 4, rows: 4 },
        '5x5': { cols: 5, rows: 5 },
        '6x6': { cols: 6, rows: 6 },
        '5x4': { cols: 5, rows: 4 },
        '6x4': { cols: 6, rows: 4 }
    };

    var currentLayout = pickWeighted([
        { value: '2x2', weight: 10 },
        { value: '3x3', weight: 9 },
        { value: '4x4', weight: 5 },
        { value: '5x5', weight: 2 },
        { value: '6x6', weight: 1 },
        { value: '5x4', weight: 4 },
        { value: '6x4', weight: 2 }
    ]);
    var cfg = gridConfigs[currentLayout];

    function distance(p1, p2) {
        return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
    }

    function getInteriorRange(cellCount) {
        if (cellCount <= 4) return { min: 6, max: 10 };
        if (cellCount <= 9) return { min: 5, max: 8 };
        if (cellCount <= 16) return { min: 4, max: 7 };
        if (cellCount <= 25) return { min: 3, max: 5 };
        if (cellCount <= 36) return { min: 2, max: 4 };
        return { min: 1, max: 4 };
    }

    function generateCirclePacking(width, height, cellCount) {
        var centerX = width / 2;
        var centerY = height / 2;
        var boundaryRadius = Math.min(width, height) * 0.45;
        var circles = [];

        var numBoundaryPoints = 6 + Math.floor(Math.random() * 12);
        for (var i = 0; i < numBoundaryPoints; i++) {
            var angle = (2 * Math.PI / numBoundaryPoints) * i - Math.PI / 2;
            var x = centerX + boundaryRadius * Math.cos(angle);
            var y = centerY + boundaryRadius * Math.sin(angle);
            var r = boundaryRadius * (0.08 + Math.random() * 0.12);
            circles.push({ x: x, y: y, r: r, type: 'boundary', id: circles.length });
        }

        var range = getInteriorRange(cellCount);
        var numInterior = range.min + Math.floor(Math.random() * (range.max - range.min + 1));
        for (var j = 0; j < numInterior; j++) {
            var a = Math.random() * 2 * Math.PI;
            var d = Math.random() * boundaryRadius * 0.6;
            var ix = centerX + d * Math.cos(a);
            var iy = centerY + d * Math.sin(a);
            var ir = boundaryRadius * (0.13 + Math.random() * 0.19);
            circles.push({ x: ix, y: iy, r: ir, type: 'interior', id: circles.length });
        }

        for (var iter = 0; iter < 100; iter++) {
            for (var ci = 0; ci < circles.length; ci++) {
                if (circles[ci].type === 'boundary') continue;

                var fx = 0;
                var fy = 0;
                fx += (centerX - circles[ci].x) * 0.04;
                fy += (centerY - circles[ci].y) * 0.04;

                for (var cj = 0; cj < circles.length; cj++) {
                    if (ci === cj) continue;
                    var dd = distance(circles[ci], circles[cj]);
                    var minDist = circles[ci].r + circles[cj].r;
                    if (dd < minDist * 2.45) {
                        var force = (minDist * 2.45 - dd) / dd;
                        fx += (circles[ci].x - circles[cj].x) * force * 0.38;
                        fy += (circles[ci].y - circles[cj].y) * force * 0.38;
                    }
                }

                circles[ci].x += fx;
                circles[ci].y += fy;

                var maxDist = boundaryRadius - circles[ci].r;
                var distFromCenter = distance(circles[ci], { x: centerX, y: centerY });
                if (distFromCenter > maxDist) {
                    var scaleIn = maxDist / distFromCenter;
                    circles[ci].x = centerX + (circles[ci].x - centerX) * scaleIn;
                    circles[ci].y = centerY + (circles[ci].y - centerY) * scaleIn;
                }
            }
        }

        return circles;
    }

    function createLotus(circle, color1, color2, packWidth, packHeight, cellWidth, cellHeight) {
        var lotusDiv = createEl('div', 'lotus-container');
        var scaleX = cellWidth / packWidth;
        var scaleY = cellHeight / packHeight;
        // Small safety margin keeps all packed lotuses inside the cell bounds.
        var coordScale = Math.min(scaleX, scaleY) * 0.96;
        var scaledWidth = packWidth * coordScale;
        var scaledHeight = packHeight * coordScale;
        var offsetX = (cellWidth - scaledWidth) / 2;
        var offsetY = (cellHeight - scaledHeight) / 2;

        lotusDiv.style.left = (circle.x * coordScale + offsetX) + 'px';
        lotusDiv.style.top = (circle.y * coordScale + offsetY) + 'px';
        lotusDiv.style.width = (circle.r * 2 * coordScale) + 'px';
        lotusDiv.style.height = (circle.r * 2 * coordScale) + 'px';

        var inner = createEl('div', 'lotus-inner');
        if (Math.random() < 0.5) {
            inner.style.background = Math.random() < 0.5
                ? 'radial-gradient(circle at center, ' + color1 + '22 0%, ' + color2 + '11 50%, transparent 70%)'
                : 'radial-gradient(circle at center, ' + color2 + '22 0%, ' + color1 + '11 50%, transparent 70%)';
        }
        var outerLayer = createEl('div', 'mandala-main-layer');
        var figurateLayer = createEl('div', 'mandala-inner-layer');
        lotusDiv.appendChild(inner);
        inner.appendChild(outerLayer);
        inner.appendChild(figurateLayer);

        var scale = (circle.r * 2 * coordScale) / 100;
        var centerX = circle.r * coordScale;
        var centerY = circle.r * coordScale;

        var folCircleRadius = 12.5 * scale;
        var folOffset = 12.5 * scale;

        var centerCircle = createEl('div', 'lotus-fol-circle lotus-center-circle');
        centerCircle.style.width = (folCircleRadius * 2) + 'px';
        centerCircle.style.height = (folCircleRadius * 2) + 'px';
        centerCircle.style.left = (centerX - folCircleRadius) + 'px';
        centerCircle.style.top = (centerY - folCircleRadius) + 'px';
        centerCircle.style.borderColor = color2;
        figurateLayer.appendChild(centerCircle);

        for (var fi = 0; fi < 6; fi++) {
            var fa = (Math.PI / 3) * fi - Math.PI / 2;
            var fx = centerX + folOffset * Math.cos(fa);
            var fy = centerY + folOffset * Math.sin(fa);
            var fol = createEl('div', 'lotus-fol-circle');
            fol.style.width = (folCircleRadius * 2) + 'px';
            fol.style.height = (folCircleRadius * 2) + 'px';
            fol.style.left = (fx - folCircleRadius) + 'px';
            fol.style.top = (fy - folCircleRadius) + 'px';
            fol.style.borderColor = color1;
            inner.appendChild(fol);
        }

        var innerRadius = 25 * scale;
        var outerRadius = 43.75 * scale;
        var concentricRadii = [25, 31.25, 37.5, 43.75].map(function (r) { return r * scale; });
        concentricRadii.forEach(function (radius, index) {
            var ring = createEl('div', 'lotus-concentric-ring');
            ring.style.width = (radius * 2) + 'px';
            ring.style.height = (radius * 2) + 'px';
            ring.style.left = (centerX - radius) + 'px';
            ring.style.top = (centerY - radius) + 'px';
            ring.style.borderColor = index / (concentricRadii.length - 1) < 0.5 ? color1 : color2;
            ring.style.opacity = String(0.6 + ((index / (concentricRadii.length - 1)) * 0.4));
            inner.appendChild(ring);
        });

        var torusDiameter = (outerRadius - innerRadius);
        var torusCenterRadius = (innerRadius + outerRadius) / 2;
        var torusOptions = [12, 24, 36];
        var numTorusCircles = torusOptions[Math.floor(Math.random() * torusOptions.length)];
        for (var ti = 0; ti < numTorusCircles; ti++) {
            var ta = (2 * Math.PI / numTorusCircles) * ti - Math.PI / 2;
            var tx = centerX + torusCenterRadius * Math.cos(ta);
            var ty = centerY + torusCenterRadius * Math.sin(ta);
            var tc = createEl('div', 'lotus-circle');
            tc.style.width = torusDiameter + 'px';
            tc.style.height = torusDiameter + 'px';
            tc.style.left = (tx - torusDiameter / 2) + 'px';
            tc.style.top = (ty - torusDiameter / 2) + 'px';
            tc.style.borderColor = ti % 2 === 0 ? color1 : color2;
            tc.style.opacity = '0.5';
            inner.appendChild(tc);
        }

        lotusDiv.classList.add(Math.random() < 0.5 ? 'rotating-cw' : 'rotating-ccw');
        lotusDiv.style.setProperty('--rotation-duration', (20 + Math.random() * 40) + 's');

        return lotusDiv;
    }

    function generateGrid() {
        var cellCount = cfg.cols * cfg.rows;
        var grid = createEl('div', 'gm-grid');
        grid.style.gridTemplateColumns = 'repeat(' + cfg.cols + ', 1fr)';
        grid.style.gridTemplateRows = 'repeat(' + cfg.rows + ', 1fr)';

        var stageW = window.innerWidth;
        var stageH = window.innerHeight;
        var gridPadding = 8;
        var gapSize = 8;
        var totalGapW = gapSize * (cfg.cols - 1);
        var totalGapH = gapSize * (cfg.rows - 1);
        var availableW = stageW - (gridPadding * 2) - totalGapW;
        var availableH = stageH - (gridPadding * 2) - totalGapH;
        var cellW = availableW / cfg.cols;
        var cellH = availableH / cfg.rows;

        for (var cellIdx = 0; cellIdx < cellCount; cellIdx++) {
            var cell = createEl('div', 'gm-cell');
            cell.style.backgroundColor = cellBgColor;
            cell.style.overflow = 'hidden';

            var packWidth = 400;
            var packHeight = 400;
            var circles = generateCirclePacking(packWidth, packHeight, cellCount);

            circles.filter(function (c) { return c.type === 'interior'; }).forEach(function (circle) {
                var palette = ColorPalette.generateGlyphPalette(gridBgColor, 6, 4, 8);
                var color1 = palette[Math.floor(Math.random() * palette.length)];
                var color2 = palette[Math.floor(Math.random() * palette.length)];
                while (color2 === color1 && palette.length > 1) {
                    color2 = palette[Math.floor(Math.random() * palette.length)];
                }

                var lotus = createLotus(circle, color1, color2, packWidth, packHeight, cellW, cellH);
                cell.appendChild(lotus);
                trackTimeout(function () { lotus.classList.add('visible'); }, 100 + Math.random() * 500, token);
            });

            grid.appendChild(cell);
        }

        stage.replaceChildren(grid);
    }

    var gridBgColor = ColorPalette.generateOKLCH(0.15 + Math.random() * 0.2, 0.05, Math.random() * 360);
    var cellBgColorBase;
    var attempts = 0;
    var minContrast = 3.5;
    var maxAttempts = 100;
    do {
        cellBgColorBase = ColorPalette.generateOKLCH(0.2 + Math.random() * 0.3, 0.08 + Math.random() * 0.1, Math.random() * 360);
        attempts++;
    } while (typeof getContrastRatio === 'function' && getContrastRatio(gridBgColor, cellBgColorBase) < minContrast && attempts < maxAttempts);

    var cellBgColor = cellBgColorBase;
    var m = cellBgColor && cellBgColor.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
    if (m) {
        cellBgColor = 'oklch(' + m[1] + ' ' + m[2] + ' ' + m[3] + ' / 0.4)';
    }

    stage.style.backgroundColor = gridBgColor;
    generateGrid();

    var onResize = function () {
        if (token !== INSERT29.runToken) return;
        startVisualization(INSERT29.currentFlavor);
    };
    window.addEventListener('resize', onResize);
    registerCleanup(function () { window.removeEventListener('resize', onResize); });
}

function runFlavor4_LotusCirclePackNoOverlap(token) {
    var stage = createEl('div', 'mandala-stage');
    stage.style.background = 'radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a15 100%)';
    var container = createEl('div');
    container.id = 'packing-container';
    stage.appendChild(container);
    INSERT29.root.appendChild(stage);

    var circles = [];
    var lotusElements = [];
    var focusedLotus = null;

    function distance(p1, p2) {
        return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
    }

    function generateCirclePacking() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        var centerX = width / 2;
        var centerY = height / 2;

        circles = [];

        var minRadius = 80;
        var maxRadius = 270;
        var numBoundaryPoints = 6 + Math.random() * 5;

        for (var i = 0; i < numBoundaryPoints; i++) {
            var r = minRadius + Math.random() * (maxRadius - minRadius);
            var x, y;
            var side = i % 4;

            if (side === 0) {
                x = r + Math.random() * (width - 2 * r);
                y = r;
            } else if (side === 1) {
                x = width - r;
                y = r + Math.random() * (height - 2 * r);
            } else if (side === 2) {
                x = r + Math.random() * (width - 2 * r);
                y = height - r;
            } else {
                x = r;
                y = r + Math.random() * (height - 2 * r);
            }

            circles.push({ x: x, y: y, r: r, type: 'boundary', id: i });
        }

        var targetInterior = Math.floor(5 + Math.random() * 10);
        var interiorPlaced = 0;

        for (var ii = 0; ii < targetInterior; ii++) {
            var attempts = 0;
            var placed = false;
            var currentMaxRadius = maxRadius;
            var currentMinRadius = minRadius;
            if (ii > 6) currentMinRadius = 40;

            while (attempts < 2000 && !placed && currentMaxRadius > 30) {
                var ir = currentMinRadius + Math.random() * (currentMaxRadius - currentMinRadius);
                if (width < 2 * ir || height < 2 * ir) {
                    currentMaxRadius *= 0.9;
                    attempts++;
                    continue;
                }

                var ix = ir + Math.random() * (width - 2 * ir);
                var iy = ir + Math.random() * (height - 2 * ir);
                var overlaps = false;
                var minGap = 3;

                for (var cIdx = 0; cIdx < circles.length; cIdx++) {
                    var c = circles[cIdx];
                    var d = distance({ x: ix, y: iy }, c);
                    if (d < ir + c.r + minGap) {
                        overlaps = true;
                        break;
                    }
                }

                if (!overlaps) {
                    placed = true;
                    circles.push({ x: ix, y: iy, r: ir, type: 'interior', id: numBoundaryPoints + interiorPlaced });
                    interiorPlaced++;
                }

                attempts++;
                if (attempts % 100 === 0) currentMaxRadius *= 0.9;
            }

            if (!placed) break;
        }

        for (var iter = 0; iter < 100; iter++) {
            for (var i3 = 0; i3 < circles.length; i3++) {
                if (circles[i3].type === 'boundary') continue;

                var fx = 0;
                var fy = 0;
                fx += (centerX - circles[i3].x) * 0.002;
                fy += (centerY - circles[i3].y) * 0.002;

                for (var j3 = 0; j3 < circles.length; j3++) {
                    if (i3 === j3) continue;
                    var dd = distance(circles[i3], circles[j3]);
                    var minDist = circles[i3].r + circles[j3].r + 3;
                    if (dd < minDist) {
                        var force = (minDist - dd) / Math.max(dd, 1);
                        fx += (circles[i3].x - circles[j3].x) * force * 0.5;
                        fy += (circles[i3].y - circles[j3].y) * force * 0.5;
                    }
                }

                circles[i3].x += fx;
                circles[i3].y += fy;

                var rr = circles[i3].r;
                circles[i3].x = Math.max(rr, Math.min(width - rr, circles[i3].x));
                circles[i3].y = Math.max(rr, Math.min(height - rr, circles[i3].y));
            }
        }
    }

    function createLotus(circle, color1, color2) {
        var lotusDiv = createEl('div', 'lotus-container');
        lotusDiv.style.left = circle.x + 'px';
        lotusDiv.style.top = circle.y + 'px';
        lotusDiv.style.width = (circle.r * 2) + 'px';
        lotusDiv.style.height = (circle.r * 2) + 'px';
        lotusDiv.circleData = circle;

        var inner = createEl('div', 'lotus-inner');
        if (Math.random() < 0.5) {
            inner.style.background = Math.random() < 0.5
                ? 'radial-gradient(circle at center, ' + color1 + '22 0%, ' + color2 + '11 50%, transparent 70%)'
                : 'radial-gradient(circle at center, ' + color2 + '22 0%, ' + color1 + '11 50%, transparent 70%)';
        }
        var outerLayer = createEl('div', 'mandala-main-layer');
        var figurateLayer = createEl('div', 'mandala-inner-layer');
        lotusDiv.appendChild(inner);
        inner.appendChild(outerLayer);
        inner.appendChild(figurateLayer);

        var scale = (circle.r * 2) / 800;
        var centerX = circle.r;
        var centerY = circle.r;
        var folCircleRadius = 50 * scale;
        var folOffset = 50 * scale;

        var centerCircle = createEl('div', 'lotus-fol-circle lotus-center-circle');
        centerCircle.style.width = (folCircleRadius * 2) + 'px';
        centerCircle.style.height = (folCircleRadius * 2) + 'px';
        centerCircle.style.left = (centerX - folCircleRadius) + 'px';
        centerCircle.style.top = (centerY - folCircleRadius) + 'px';
        centerCircle.style.borderColor = color2;
        figurateLayer.appendChild(centerCircle);

        for (var fi = 0; fi < 6; fi++) {
            var fa = (Math.PI / 3) * fi - Math.PI / 2;
            var fx = centerX + folOffset * Math.cos(fa);
            var fy = centerY + folOffset * Math.sin(fa);
            var fol = createEl('div', 'lotus-fol-circle');
            fol.style.width = (folCircleRadius * 2) + 'px';
            fol.style.height = (folCircleRadius * 2) + 'px';
            fol.style.left = (fx - folCircleRadius) + 'px';
            fol.style.top = (fy - folCircleRadius) + 'px';
            fol.style.borderColor = color1;
            inner.appendChild(fol);
        }

        var innerRadius = 100 * scale;
        var outerRadius = 350 * scale;
        var concentricRadii = [100, 150, 200, 250, 300, 350].map(function (r) { return r * scale; });
        concentricRadii.forEach(function (radius, index) {
            var ring = createEl('div', 'lotus-concentric-ring');
            ring.style.width = (radius * 2) + 'px';
            ring.style.height = (radius * 2) + 'px';
            ring.style.left = (centerX - radius) + 'px';
            ring.style.top = (centerY - radius) + 'px';
            ring.style.borderColor = index / (concentricRadii.length - 1) < 0.5 ? color1 : color2;
            ring.style.opacity = String(0.6 + ((index / (concentricRadii.length - 1)) * 0.4));
            inner.appendChild(ring);
        });

        var torusDiameter = (outerRadius - innerRadius);
        var torusCenterRadius = (innerRadius + outerRadius) / 2;
        var torusOptions = [24, 36, 48, 60, 72, 84];
        var numTorusCircles = torusOptions[Math.floor(Math.random() * torusOptions.length)];
        for (var ti = 0; ti < numTorusCircles; ti++) {
            var ta = (2 * Math.PI / numTorusCircles) * ti - Math.PI / 2;
            var tx = centerX + torusCenterRadius * Math.cos(ta);
            var ty = centerY + torusCenterRadius * Math.sin(ta);
            var tc = createEl('div', 'lotus-circle');
            tc.style.width = torusDiameter + 'px';
            tc.style.height = torusDiameter + 'px';
            tc.style.left = (tx - torusDiameter / 2) + 'px';
            tc.style.top = (ty - torusDiameter / 2) + 'px';
            tc.style.borderColor = ti % 2 === 0 ? color1 : color2;
            tc.style.opacity = '0.5';
            inner.appendChild(tc);
        }

        lotusDiv.addEventListener('click', function (e) {
            e.stopPropagation();
            if (token !== INSERT29.runToken) return;
            if (focusedLotus) {
                unfocusLotus();
                regeneratePage();
            } else {
                focusLotus(lotusDiv);
            }
        });

        return lotusDiv;
    }

    function focusLotus(lotus) {
        focusedLotus = lotus;
        var vw = window.innerWidth;
        var vh = window.innerHeight;
        var centerX = vw / 2;
        var centerY = vh / 2;
        var currentSize = parseFloat(lotus.style.width);
        var targetSize = vh * 0.995;
        var scale = targetSize / currentSize;

        lotusElements.forEach(function (el) {
            if (el !== lotus) el.classList.add('hidden');
        });
        lotus.classList.add('focused');
        lotus.style.left = centerX + 'px';
        lotus.style.top = centerY + 'px';
        lotus.style.setProperty('--lotus-scale', scale);
        lotus.style.setProperty('--border-scale', 1 / scale);
        if (!lotus.classList.contains('rotating-cw') && !lotus.classList.contains('rotating-ccw')) {
            lotus.classList.add(Math.random() < 0.5 ? 'rotating-cw' : 'rotating-ccw');
        }
    }

    function unfocusLotus() {
        if (!focusedLotus) return;
        focusedLotus.classList.remove('focused');
        focusedLotus = null;
    }

    function generateNewLotusCircle() {
        if (Math.random() < 0.1) return null;
        var width = window.innerWidth;
        var height = window.innerHeight;
        var minRadius = 50;
        var maxRadius = 270;
        var attempts = 0;
        var currentMaxRadius = maxRadius;
        var currentMinRadius = minRadius;

        while (attempts < 250 && currentMaxRadius >= currentMinRadius) {
            var r = currentMinRadius + Math.random() * (currentMaxRadius - currentMinRadius);
            if (width < 2 * r || height < 2 * r) {
                currentMaxRadius *= 0.9;
                attempts++;
                continue;
            }
            var x = r + Math.random() * (width - 2 * r);
            var y = r + Math.random() * (height - 2 * r);

            var overlaps = false;
            var minGap = 3;
            for (var i = 0; i < circles.length; i++) {
                var c = circles[i];
                if (c.type !== 'interior') continue;
                var d = distance({ x: x, y: y }, c);
                if (d < r + c.r + minGap) {
                    overlaps = true;
                    break;
                }
            }
            if (!overlaps) return { x: x, y: y, r: r, type: 'interior', id: Date.now() };

            attempts++;
            if (attempts % 30 === 0) currentMaxRadius *= 0.9;
        }
        return null;
    }

    function createNewLotus() {
        var circle = generateNewLotusCircle();
        if (!circle) return null;
        circles.push(circle);

        var bgColor = ColorPalette.generateOKLCH(0.2 + Math.random() * 0.2, 0.1, Math.random() * 360);
        var palette = ColorPalette.generateGlyphPalette(bgColor, 6, 3, 7);
        var color1 = palette[Math.floor(Math.random() * palette.length)];
        var color2 = palette[Math.floor(Math.random() * palette.length)];
        while (color2 === color1 && palette.length > 1) color2 = palette[Math.floor(Math.random() * palette.length)];

        var lotus = createLotus(circle, color1, color2);
        container.appendChild(lotus);
        var fadeInDuration = 2000 + Math.random() * 5000;
        lotus.style.transition = 'opacity ' + fadeInDuration + 'ms ease';
        trackTimeout(function () { lotus.classList.add('visible'); }, 100, token);
        return lotus;
    }

    function render() {
        lotusElements.forEach(function (el) { el.remove(); });
        lotusElements = [];

        var interior = circles.filter(function (c) { return c.type === 'interior'; });
        interior.forEach(function (circle, index) {
            var bgColor = ColorPalette.generateOKLCH(0.2 + Math.random() * 0.2, 0.1, Math.random() * 360);
            var palette = ColorPalette.generateGlyphPalette(bgColor, 6, 3, 7);
            var color1 = palette[Math.floor(Math.random() * palette.length)];
            var color2 = palette[Math.floor(Math.random() * palette.length)];
            while (color2 === color1 && palette.length > 1) color2 = palette[Math.floor(Math.random() * palette.length)];

            var lotus = createLotus(circle, color1, color2);
            container.appendChild(lotus);
            lotusElements.push(lotus);

            var fadeInDuration = 2000 + Math.random() * 3000;
            lotus.style.transition = 'opacity ' + fadeInDuration + 'ms ease';
            trackTimeout(function () { lotus.classList.add('visible'); }, 100 * index, token);
        });
    }

    function startRotation() {
        function rotateRandomLotus() {
            if (token !== INSERT29.runToken) return;
            if (lotusElements.length === 0) {
                trackTimeout(rotateRandomLotus, 1000, token);
                return;
            }
            if (focusedLotus) {
                trackTimeout(rotateRandomLotus, 1000, token);
                return;
            }

            var selectedLotus = lotusElements[Math.floor(Math.random() * lotusElements.length)];
            if (selectedLotus.classList.contains('rotating-cw') || selectedLotus.classList.contains('rotating-ccw')) {
                trackTimeout(rotateRandomLotus, 500, token);
                return;
            }

            var radius = selectedLotus.circleData.r;
            var sizeRatio = radius / 80;
            var minTime = 10 * sizeRatio;
            var maxTime = 45 * sizeRatio;
            var rotationTime = minTime * 1000 + Math.random() * (maxTime - minTime) * 1000;
            selectedLotus.style.setProperty('--rotation-duration', rotationTime + 'ms');
            selectedLotus.classList.add(Math.random() < 0.5 ? 'rotating-cw' : 'rotating-ccw');

            trackTimeout(function () {
                if (token !== INSERT29.runToken || focusedLotus) return;
                var fadeOutDuration = 5500 + Math.random() * 7500 + (sizeRatio * 2200);
                selectedLotus.style.transitionProperty = 'opacity';
                selectedLotus.style.transitionDuration = fadeOutDuration + 'ms';
                selectedLotus.style.transitionTimingFunction = 'cubic-bezier(0.22, 0.61, 0.36, 1)';
                // Ensure transition settings are committed before toggling opacity.
                void selectedLotus.offsetWidth;
                selectedLotus.classList.add('fading-out');

                trackTimeout(function () {
                    if (token !== INSERT29.runToken || focusedLotus) return;
                    if (selectedLotus.circleData) {
                        var circleIndex = circles.findIndex(function (c) { return c.id === selectedLotus.circleData.id; });
                        if (circleIndex !== -1) circles.splice(circleIndex, 1);
                    }
                    selectedLotus.remove();
                    var idx = lotusElements.indexOf(selectedLotus);
                    if (idx !== -1) lotusElements.splice(idx, 1);
                    var newLotus = createNewLotus();
                    if (newLotus) lotusElements.push(newLotus);
                }, fadeOutDuration, token);
            }, rotationTime, token);

            trackTimeout(rotateRandomLotus, 1000 + Math.random() * 3000, token);
        }

        var numConcurrent = 3 + Math.floor(Math.random() * 3);
        for (var i = 0; i < numConcurrent; i++) {
            trackTimeout(rotateRandomLotus, 1000 + i * 4000, token);
        }
    }

    function regeneratePage() {
        lotusElements.forEach(function (el) { el.remove(); });
        lotusElements = [];
        focusedLotus = null;
        generateCirclePacking();
        render();
        trackTimeout(startRotation, 1000, token);
    }

    generateCirclePacking();
    render();
    trackTimeout(startRotation, 1000, token);

    var onResize = function () {
        if (token !== INSERT29.runToken) return;
        lotusElements.forEach(function (el) { el.remove(); });
        lotusElements = [];
        focusedLotus = null;
        generateCirclePacking();
        render();
        trackTimeout(startRotation, 1000, token);
    };
    window.addEventListener('resize', onResize);
    registerCleanup(function () { window.removeEventListener('resize', onResize); });
}

function runFlavor5_LotusGrid(token) {
    var stage = createEl('div', 'mandala-stage');
    INSERT29.root.appendChild(stage);

    var configs = [
        { cols: 2, rows: 2 }, { cols: 3, rows: 3 }, { cols: 4, rows: 4 }, { cols: 5, rows: 5 },
        { cols: 6, rows: 6 }, { cols: 5, rows: 4 }, { cols: 6, rows: 4 }
    ];
    var cfg = pickWeighted([
        { value: configs[0], weight: 10 }, // 2x2
        { value: configs[1], weight: 9 },  // 3x3
        { value: configs[2], weight: 5 },  // 4x4
        { value: configs[3], weight: 2 },  // 5x5
        { value: configs[4], weight: 1 },  // 6x6
        { value: configs[5], weight: 4 },  // 5x4
        { value: configs[6], weight: 2 }   // 6x4
    ]);

    var bg = ColorPalette.generateOKLCH(rand(0.15, 0.35), 0.05, rand(0, 360));
    document.body.style.backgroundColor = bg;

    var grid = createEl('div', 'gm-grid');
    grid.style.gridTemplateColumns = 'repeat(' + cfg.cols + ', 1fr)';
    grid.style.gridTemplateRows = 'repeat(' + cfg.rows + ', 1fr)';
    stage.appendChild(grid);

    for (var i = 0; i < cfg.cols * cfg.rows; i++) {
        var cell = createEl('div', 'gm-cell');
        cell.style.background = 'rgba(0,0,0,0.30)';

        var cw = Math.max(grid.clientWidth / cfg.cols - 8, 0);
        var ch = Math.max(grid.clientHeight / cfg.rows - 8, 0);
        var size = Math.min(cw, ch) * 0.9;
        var palette = [ColorPalette.generateOKLCH(), ColorPalette.generateOKLCH(), ColorPalette.generateOKLCH()];

        var built = makeMandala({
            size: size,
            palette: palette,
            concentric: true,
            toroidal: true,
            petals: false,
            spokes: false,
            mainSpeed: rand(70, 140),
            innerSpeed: rand(40, 95)
        });

        cell.appendChild(built.el);
        grid.appendChild(cell);
    }

    var onResize = function () {
        if (token !== INSERT29.runToken) return;
        startVisualization(INSERT29.currentFlavor);
    };
    window.addEventListener('resize', onResize);
    registerCleanup(function () { window.removeEventListener('resize', onResize); });
}

function startVisualization(flavor) {
    runCleanup();
    removeInfoPanel();

    INSERT29.runToken += 1;
    var token = INSERT29.runToken;
    INSERT29.currentFlavor = flavor;

    createRoot();
    createHelpOverlay();

    if (flavor === 0) {
        runFlavor0_FlowerOfLifeGrid(token);
    } else if (flavor === 1) {
        runFlavor1_LotusRedo(token);
    } else if (flavor === 2) {
        runFlavor2_LotusCirclePack(token);
    } else if (flavor === 3) {
        runFlavor3_CirclePackGrid(token);
    } else if (flavor === 4) {
        runFlavor4_LotusCirclePackNoOverlap(token);
    } else if (flavor === 5) {
        runFlavor5_LotusGrid(token);
    } else if (flavor === 6) {
        runPackFlavor(token, {
            warmBg: false,
            packing: 'nooverlap',
            packOpts: { minRadius: 80, maxRadius: 270, interiorMin: 5, interiorMax: 15 },
            focusable: true,
            lifecycle: true,
            dynamicReplenish: true,
            spokes: true,
            toroidal: false,
            petals: true,
            counterRotate: true,
            concurrent: 4,
            includeBoundary: false,
            spinBaseMin: 10000,
            spinBaseMax: 45000,
            fadeBaseMin: 4000,
            fadeBaseMax: 11000
        });
    }
}

function parseFlavorFromURL() {
    var params = new URLSearchParams(window.location.search);
    var f = params.get('flavor');
    if (f !== null) {
        var n = parseInt(f, 10);
        if (!isNaN(n) && n >= 0 && n <= 6) return n;
    }
    return null;
}

function initKeyHandler() {
    if (INSERT29.keyHandlerAttached) return;
    window.addEventListener('keydown', function (e) {
        if (e.key >= '0' && e.key <= '6') {
            startVisualization(parseInt(e.key, 10));
        }
    });
    INSERT29.keyHandlerAttached = true;
}

function loadColorPaletteAndStart() {
    if (typeof ColorPalette !== 'undefined') {
        ColorPalette.init();
        initKeyHandler();

        var urlFlavor = parseFlavorFromURL();
        var initialFlavor = urlFlavor !== null ? urlFlavor : Math.floor(Math.random() * 7);
        startVisualization(initialFlavor);
        return;
    }

    var script = document.createElement('script');
    script.src = '../js_funct/colorpalette.js';
    script.onload = function () {
        ColorPalette.init();
        initKeyHandler();

        var urlFlavor = parseFlavorFromURL();
        var initialFlavor = urlFlavor !== null ? urlFlavor : Math.floor(Math.random() * 7);
        startVisualization(initialFlavor);
    };
    document.head.appendChild(script);
}

function init() {
    injectStyles();
    loadColorPaletteAndStart();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
