(function(global) {
    'use strict';

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function randInt(max) {
        return Math.floor(Math.random() * max);
    }

    function shuffle(arr) {
        var out = arr.slice();
        for (var i = out.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = out[i];
            out[i] = out[j];
            out[j] = tmp;
        }
        return out;
    }

    function padHex(n) {
        var s = n.toString(16);
        return s.length === 1 ? '0' + s : s;
    }

    function hexToRgb(hex) {
        if (!hex || typeof hex !== 'string') return null;
        var normalized = hex.trim();
        if (normalized[0] !== '#') return null;
        if (normalized.length === 4) {
            normalized = '#' + normalized[1] + normalized[1] + normalized[2] + normalized[2] + normalized[3] + normalized[3];
        }
        if (normalized.length !== 7) return null;
        return {
            r: parseInt(normalized.slice(1, 3), 16),
            g: parseInt(normalized.slice(3, 5), 16),
            b: parseInt(normalized.slice(5, 7), 16)
        };
    }

    function rgbToHex(rgb) {
        return '#' + padHex(clamp(Math.round(rgb.r), 0, 255)) + padHex(clamp(Math.round(rgb.g), 0, 255)) + padHex(clamp(Math.round(rgb.b), 0, 255));
    }

    function mixHex(hexA, hexB, t) {
        var a = hexToRgb(hexA);
        var b = hexToRgb(hexB);
        if (!a && !b) return '#888888';
        if (!a) return hexB;
        if (!b) return hexA;
        var tt = clamp(t, 0, 1);
        return rgbToHex({
            r: a.r + (b.r - a.r) * tt,
            g: a.g + (b.g - a.g) * tt,
            b: a.b + (b.b - a.b) * tt
        });
    }

    function withBias(hex, backgroundBias, amount) {
        if (!hexToRgb(hex)) return hex;
        if (backgroundBias === 'light') return mixHex(hex, '#ffffff', amount);
        return mixHex(hex, '#000000', amount);
    }

    function relativeLuminance(hex) {
        var rgb = hexToRgb(hex);
        if (!rgb) return 0;
        function channel(v) {
            v = v / 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        }
        return 0.2126 * channel(rgb.r) + 0.7152 * channel(rgb.g) + 0.0722 * channel(rgb.b);
    }

    function getTextColor(bg) {
        return relativeLuminance(bg) > 0.45 ? '#111111' : '#f4f4f4';
    }

    function expandForCount(colors, count) {
        var source = Array.isArray(colors) ? colors.filter(Boolean) : [];
        if (!source.length) source = ['#888888'];
        if (count <= source.length) return shuffle(source).slice(0, count);
        var out = [];
        while (out.length < count) {
            out = out.concat(shuffle(source));
        }
        return out.slice(0, count);
    }

    function deriveRamp(colors, count) {
        var source = Array.isArray(colors) ? colors.filter(function(c) { return !!hexToRgb(c); }) : [];
        if (!source.length) return expandForCount(['#666666', '#bbbbbb'], count);
        if (source.length === 1) return expandForCount(source, count);
        if (source.length >= count) return source.slice(0, count);

        var out = [];
        for (var i = 0; i < count; i++) {
            var p = count === 1 ? 0 : i / (count - 1);
            var scaled = p * (source.length - 1);
            var left = Math.floor(scaled);
            var right = Math.min(source.length - 1, Math.ceil(scaled));
            var t = scaled - left;
            out.push(mixHex(source[left], source[right], t));
        }
        return out;
    }

    var FAMILY_DEFAULTS = {
        insert37: { mode: 'oklch', backgroundBias: 'dark' },
        insert38: { mode: 'artist', backgroundBias: 'dark' },
        insert39: { mode: 'hybrid', backgroundBias: 'dark' },
        insert40: { mode: 'artist', backgroundBias: 'light' },
        insert41: { mode: 'oklch', backgroundBias: 'dark' },
        insert42: { mode: 'artist', backgroundBias: 'dark' },
        insert43: { mode: 'hybrid', backgroundBias: 'dark' }
    };

    function resolveOptions(options) {
        options = options || {};
        var familyDefaults = options.family && FAMILY_DEFAULTS[options.family] ? FAMILY_DEFAULTS[options.family] : {};
        return {
            mode: options.mode || familyDefaults.mode || 'artist',
            count: options.count || 8,
            key: options.key || null,
            family: options.family || null,
            flavor: typeof options.flavor === 'number' ? options.flavor : null,
            backgroundBias: options.backgroundBias || familyDefaults.backgroundBias || 'dark',
            panelContrast: typeof options.panelContrast === 'number' ? options.panelContrast : 0.12,
            textBias: options.textBias || 'auto'
        };
    }

    function artistKeys() {
        return global.ARTIST_PALETTES ? Object.keys(global.ARTIST_PALETTES) : [];
    }

    function normalizeArtistPalette(key, options) {
        var palettes = global.ARTIST_PALETTES || {};
        var keys = artistKeys();
        if (!keys.length) return null;

        var chosenKey = key && palettes[key] ? key : keys[randInt(keys.length)];
        var src = palettes[chosenKey];
        var bg = src.bg || (options.backgroundBias === 'light' ? '#f4f0e8' : '#0b0a14');
        var panelBg = withBias(bg, options.backgroundBias === 'light' ? 'dark' : 'light', options.panelContrast);
        var lineColors = expandForCount(src.colors || [], options.count);
        var fillColors = deriveRamp(src.colors || [], options.count);
        var accent = lineColors[0] || '#ffffff';
        var text = getTextColor(bg);

        return {
            key: chosenKey,
            label: src.name || chosenKey,
            bg: bg,
            panelBg: panelBg,
            lineColors: lineColors,
            fillColors: fillColors,
            accent: accent,
            text: text,
            raw: src
        };
    }

    function normalizeOKLCHPalette(options) {
        if (!global.ColorPalette || typeof global.ColorPalette.init !== 'function') return null;

        global.ColorPalette.init();
        var bg = global.ColorPalette.currentPageBg || (options.backgroundBias === 'light' ? '#ffffff' : '#0a0a0a');
        var panelBg = global.ColorPalette.currentGridBg || bg;
        var glyphs = Array.isArray(global.ColorPalette.currentGlyphColors) ? global.ColorPalette.currentGlyphColors.slice() : [];
        if (!glyphs.length && typeof global.ColorPalette.randomGlyphColor === 'function') {
            for (var i = 0; i < options.count; i++) glyphs.push(global.ColorPalette.randomGlyphColor());
        }
        var lineColors = expandForCount(glyphs, options.count);
        var fillColors = expandForCount(glyphs, options.count);
        var accent = lineColors[0] || '#ffffff';
        var text = getTextColor(bg);

        return {
            key: 'oklch:auto',
            label: 'OKLCH Auto',
            bg: bg,
            panelBg: panelBg,
            lineColors: lineColors,
            fillColors: fillColors,
            accent: accent,
            text: text,
            raw: {
                pageBg: global.ColorPalette.currentPageBg,
                gridBg: global.ColorPalette.currentGridBg,
                glyphColors: glyphs
            }
        };
    }

    function normalizeHybridPalette(options) {
        var artist = normalizeArtistPalette(options.key, options);
        var oklch = normalizeOKLCHPalette(options);
        if (!artist && !oklch) return null;
        if (!artist) return oklch;
        if (!oklch) return artist;

        return {
            key: artist.key + '+oklch',
            label: artist.label + ' + OKLCH',
            bg: oklch.bg || artist.bg,
            panelBg: oklch.panelBg || artist.panelBg,
            lineColors: expandForCount(artist.lineColors.concat(oklch.lineColors), options.count),
            fillColors: deriveRamp(artist.fillColors.concat(oklch.fillColors), options.count),
            accent: artist.accent || oklch.accent,
            text: getTextColor(oklch.bg || artist.bg),
            raw: {
                artist: artist.raw,
                oklch: oklch.raw
            }
        };
    }

    function emergencyPalette(options) {
        var bg = options.backgroundBias === 'light' ? '#f2ede4' : '#0c0b14';
        return {
            key: 'emergency:fallback',
            label: 'Emergency Fallback',
            bg: bg,
            panelBg: options.backgroundBias === 'light' ? '#e5ddd1' : '#171523',
            lineColors: expandForCount(['#e4572e', '#17bebb', '#ffc914', '#2e282a'], options.count),
            fillColors: deriveRamp(['#e4572e', '#17bebb', '#ffc914'], options.count),
            accent: '#e4572e',
            text: getTextColor(bg),
            raw: null
        };
    }

    function create(options) {
        var resolved = resolveOptions(options);
        var palette;

        if (resolved.mode === 'artist') {
            palette = normalizeArtistPalette(resolved.key, resolved);
            if (!palette) palette = normalizeOKLCHPalette(resolved);
        } else if (resolved.mode === 'oklch') {
            palette = normalizeOKLCHPalette(resolved);
            if (!palette) palette = normalizeArtistPalette(resolved.key, resolved);
        } else {
            palette = normalizeHybridPalette(resolved);
            if (!palette) palette = normalizeArtistPalette(resolved.key, resolved) || normalizeOKLCHPalette(resolved);
        }

        if (!palette) palette = emergencyPalette(resolved);

        return {
            mode: resolved.mode,
            index: 0,
            seedHint: null,
            options: resolved,
            palette: palette
        };
    }

    function next(state, options) {
        var base = state && state.options ? state.options : {};
        var merged = {};
        var k;
        for (k in base) merged[k] = base[k];
        options = options || {};
        for (k in options) merged[k] = options[k];

        var nextState = create(merged);
        nextState.index = state && typeof state.index === 'number' ? state.index + 1 : 1;
        return nextState;
    }

    function pick(palette, channel) {
        if (!palette) return '#888888';
        var arr = palette[channel];
        if (!Array.isArray(arr) || !arr.length) return palette.accent || '#888888';
        return arr[randInt(arr.length)];
    }

    global.VisPaletteAdapter = {
        FAMILY_DEFAULTS: FAMILY_DEFAULTS,
        create: create,
        next: next,
        getArtistPaletteKeys: artistKeys,
        expandForCount: expandForCount,
        deriveRamp: deriveRamp,
        pick: pick,
        getTextColor: getTextColor
    };

    console.log('VisPaletteAdapter loaded');
})(window);
