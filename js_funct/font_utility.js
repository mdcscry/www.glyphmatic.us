/**
 * FontUtility: A singleton utility for managing Google Fonts.
 * Uses a pre-filtered list of monospace fonts to avoid API calls.
 * Generated: 2025-12-04T15:35:49.817Z
 */
const FontUtility = (function() {
    let googleFonts = null;
    let fontsLoaded = false;
    let fetchPromise = null;

    const API_KEY = 'AIzaSyBPEC-k91wzgVIMm9CZSJIINd-WKmR2Wmo';
    const API_URL = `https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}`;

    // Hardcoded list of monospace fonts from Google Fonts (excluding barcode/icon fonts)
    // Total fonts: 42
    const MONOSPACE_FONTS = [
        'Anonymous Pro',
        'Azeret Mono',
        'B612 Mono',
        'Chivo Mono',
        'Courier Prime',
        'Cousine',
        'Cutive Mono',
        'DM Mono',
        'Fira Code',
        'Fira Mono',
        'Fragment Mono',
        'Geist Mono',
        'Google Sans Code',
        'IBM Plex Mono',
        'Inconsolata',
        'Intel One Mono',
        'JetBrains Mono',
        'Kode Mono',
        'LXGW WenKai Mono TC',
        'Lekton',
        'Libertinus Mono',
        'M PLUS 1 Code',
        'Major Mono Display',
        'Martian Mono',
        'Nova Mono',
        'Overpass Mono',
        'Oxygen Mono',
        'PT Mono',
        'Red Hat Mono',
        'Reddit Mono',
        'Roboto Mono',
        'Share Tech Mono',
        'Sometype Mono',
        'Source Code Pro',
        'Space Mono',
        'Spline Sans Mono',
        'Syne Mono',
        'Ubuntu Mono',
        'Ubuntu Sans Mono',
        'VT323',
        'Victor Mono',
        'Xanh Mono'
    ];

    // Keywords and font names to exclude (for reference/future use)
    const excludeKeywords = [
        'barcode', 'material icons', 'material symbols', 'jacqard',
        'wavefont', 'flow', 'yarndings', 'guides', 'redacted', 'charted'
    ];
    const excludeSpecificFonts = [
        'Sixtyfour', 'Workbench', 'Monofett', 'Martian Mono SemiExpanded', 'Sixtyfour Convergence'
    ];

    /**
     * Fetches and filters the font list from the Google Fonts API.
     * This function is designed to run only once.
     * @returns {Promise<object>} A promise that resolves with the filtered font data.
     */
    function fetchAndFilterFonts() {
        if (fetchPromise) {
            return fetchPromise;
        }

        fetchPromise = fetch(API_URL)
            .then(response => {
                if (!response.ok) throw new Error(`Google Fonts API request failed: ${response.status}`);
                return response.json();
            })
            .then(json => {
                const filteredItems = json.items.filter(font => {
                    const fontName = font.family.toLowerCase();
                    const isKeywordExcluded = excludeKeywords.some(keyword => fontName.includes(keyword));
                    const isSpecificFontExcluded = excludeSpecificFonts.includes(font.family);
                    return !isKeywordExcluded && !isSpecificFontExcluded;
                });

                googleFonts = { items: filteredItems };
                console.log(`FontUtility: Loaded and filtered ${googleFonts.items.length} fonts.`);
                loadFontLinks(googleFonts.items);
                return googleFonts;
            })
            .catch(error => {
                console.error('FontUtility: Failed to fetch or process fonts.', error);
                fetchPromise = null; // Allow retrying on failure
                return null;
            });

        return fetchPromise;
    }

    /**
     * Injects <link> tags into the <head> to load the specified fonts from Google Fonts.
     * @param {Array} fontItems - The array of font objects from the Google Fonts API.
     */
    function loadFontLinks(fontItems) {
        if (fontsLoaded) return;

        const head = document.getElementsByTagName('head')[0];
        if (!head) {
            console.error("FontUtility: Cannot load fonts, <head> element not found.");
            return;
        }

        fontItems.forEach(font => {
            const link = document.createElement('link');
            link.href = `https://fonts.googleapis.com/css?family=${font.family.replace(/ /g, '+')}`;
            link.rel = 'stylesheet';
            head.appendChild(link);
        });

        fontsLoaded = true;
        console.log('FontUtility: Injected font links into document head.');
    }

    /**
     * Returns a random monospace font family from the hardcoded list.
     * @returns {string} A font family name from the MONOSPACE_FONTS array.
     */
    function getRandomMonospaceFont() {
        return MONOSPACE_FONTS[Math.floor(Math.random() * MONOSPACE_FONTS.length)];
    }

    /**
     * Returns the full list of monospace fonts.
     * @returns {Array<string>} Array of monospace font family names.
     */
    function getMonospaceFonts() {
        return [...MONOSPACE_FONTS]; // Return a copy
    }

    /**
     * Loads monospace fonts into the page by injecting link tags.
     * Uses the hardcoded MONOSPACE_FONTS list.
     */
    function loadMonospaceFonts() {
        if (fontsLoaded) {
            console.log('FontUtility: Fonts already loaded.');
            return;
        }

        const head = document.getElementsByTagName('head')[0];
        if (!head) {
            console.error("FontUtility: Cannot load fonts, <head> element not found.");
            return;
        }

        MONOSPACE_FONTS.forEach(fontFamily => {
            const link = document.createElement('link');
            link.href = `https://fonts.googleapis.com/css?family=${fontFamily.replace(/ /g, '+')}`;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            head.appendChild(link);
        });

        fontsLoaded = true;
        console.log(`FontUtility: Loaded ${MONOSPACE_FONTS.length} monospace fonts.`);
    }

    // Public interface
    return {
        getFonts: fetchAndFilterFonts, // Keep for backwards compatibility if needed
        getRandomMonospaceFont: getRandomMonospaceFont,
        getMonospaceFonts: getMonospaceFonts,
        loadMonospaceFonts: loadMonospaceFonts
    };
})();