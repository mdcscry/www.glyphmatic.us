/**
 * artist_palettes/_loaded.js
 * Loaded LAST — signals that all palette files have been parsed.
 */
(function() {
    window.ARTIST_PALETTES_LOADED = true;
    console.log('artist_palettes: loaded', Object.keys(window.ARTIST_PALETTES).length, 'palettes');
})();
