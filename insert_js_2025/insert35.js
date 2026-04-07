// insert35.js — Flags Fun
// Country flag glyphs with AutoFont, color morphing, and flag emoji overlay
console.log('insert35.js loaded');

// ===== REQUIRED STUB =====
function changeHtmlDisplayInline() {
    renderRecipe();
}

// ===== STATE =====
var i35_FLAG_RECIPES = [];
var i35_currentRecipeIndex = 0;
var i35_dataLoaded = false;
var i35_currentCountry = null;
var i35_currentColors = [];
var i35_currentAnimationId = null;
var i35_flattenedGlyphsCache = null;
var i35_alphaIndex = 0;
var i35_warnedBlocks = new Set();

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

function loadStylesheet(href) {
    return new Promise(function(resolve, reject) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.onload = resolve;
        link.onerror = reject;
        document.head.appendChild(link);
    });
}

async function loadDependencies() {
    // Load CSS
    await loadStylesheet('./css_font/glyphmatic-fonts.css');
    await loadStylesheet('./css/flagsfun.css');

    // Load scripts
    await loadScript('./js_glyph/2025_block_17/block_lang_skeleton_17.js');
    await loadScript('./js_funct/autoFont.js');
    await loadScript('./js_glyph/country_glyphs.js');
}

// ===== STYLES =====
function injectStyles() {
    var style = document.createElement('style');
    style.id = 'i35-style';
    style.textContent = `
        body {
            background: #1a1a1a !important;
            color: #fff !important;
            font-family: 'Noto Sans', sans-serif !important;
            min-height: 100vh !important;
            padding: 0 !important;
            overflow: hidden !important;
            margin: 0 !important;
        }
        .flag-container {
            position: fixed !important;
            inset: 0 !important;
            overflow: hidden !important;
        }
    `;
    document.head.appendChild(style);
}

// ===== DOM =====
function createDOM() {
    var container = document.createElement('div');
    container.className = 'flag-container';
    container.id = 'flagContainer';
    document.body.appendChild(container);

    var recipeInfo = document.createElement('div');
    recipeInfo.className = 'recipe-info';
    recipeInfo.id = 'recipeInfo';
    recipeInfo.addEventListener('click', function() {
        recipeInfo.classList.toggle('expanded');
    });

    var titleDiv = document.createElement('div');
    titleDiv.className = 'title';
    recipeInfo.appendChild(titleDiv);

    var metaList = document.createElement('div');
    metaList.className = 'meta-list';
    recipeInfo.appendChild(metaList);

    document.body.appendChild(recipeInfo);
}

// ===== HELPERS =====
function getStandardBlockName(blockName) {
    if (blockName === 'Combining Forms-flag') return 'Basic Latin';
    if (blockName.startsWith('Arabic-')) return 'Arabic';
    if (blockName.startsWith('Bengali-')) return 'Bengali';
    return blockName;
}

function getBlockClassName(blockName) {
    var standardName = getStandardBlockName(blockName);
    return 'block-' + standardName.toLowerCase().replace(/ /g, '-');
}

function getFontForBlock(blockName) {
    var fontDuJour = AutoFont.selectFont(blockName, block_lang, lang_font);
    if (fontDuJour === 'Noto Sans-local') {
        if (!i35_warnedBlocks.has(blockName)) {
            console.warn('No font mapping for block: ' + blockName);
            i35_warnedBlocks.add(blockName);
        }
    }
    return AutoFont.loadFont(fontDuJour);
}

function getFlattenedGlyphs(countryId) {
    var glyphsData = countryGlyphs[countryId];
    if (!glyphsData) return [];

    var flattened = [];
    var blockKeys = Object.keys(glyphsData);
    for (var b = 0; b < blockKeys.length; b++) {
        var blockKey = blockKeys[b];
        var glyphs = glyphsData[blockKey];
        if (!glyphs || !Array.isArray(glyphs)) continue;
        for (var g = 0; g < glyphs.length; g++) {
            var glyph = glyphs[g];
            if (typeof glyph !== 'string') continue;
            var hasZeroWidth = /[\u200B-\u200F\u2028-\u202F\uFEFF]/.test(glyph);
            var hasControl = /[\x00-\x1F\x7F-\x9F]/.test(glyph);
            if (hasZeroWidth || hasControl) continue;
            flattened.push({ glyph: glyph, blockKey: blockKey });
        }
    }

    // Add special glyphs
    var data = countryData[countryId];
    if (data && data.specialGlyphs) {
        for (var s = 0; s < data.specialGlyphs.length; s++) {
            var special = data.specialGlyphs[s];
            flattened.push({
                glyph: special.glyph,
                blockKey: 'Miscellaneous Symbols',
                special: true,
                background: special.background,
                color: special.color
            });
        }
    }
    return flattened;
}

// Strip invisible/control characters
function stripInvisible(str) {
    return str.replace(/[\x00-\x1F\x7F-\x9F\u00AD\u034F\u061C\u115F\u1160\u17B4\u17B5\u180B-\u180E\u200B-\u200F\u202A-\u202E\u2028-\u202F\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0\uFFF0-\uFFFF]/g, '');
}

function generateGlyphText(length, colors) {
    if (!i35_currentCountry || !countryGlyphs[i35_currentCountry]) return '';
    if (!i35_flattenedGlyphsCache) {
        i35_flattenedGlyphsCache = getFlattenedGlyphs(i35_currentCountry);
    }
    if (i35_flattenedGlyphsCache.length === 0) return '';

    var html = '';
    for (var i = 0; i < length; i++) {
        try {
            var entry = i35_flattenedGlyphsCache[Math.floor(Math.random() * i35_flattenedGlyphsCache.length)];
            var cleanGlyph = stripInvisible(entry.glyph);
            var fontStack = getFontForBlock(entry.blockKey);
            var blockClass = getBlockClassName(entry.blockKey);

            if (entry.special) {
                html += '<span class="glyph ' + blockClass + ' special-glyph" style="font-family: ' + fontStack + '; display: inline-flex; align-items: center; justify-content: center; width: .8em; height: .8em; color: ' + entry.color + '; background: ' + entry.background + '; border-radius: 50%;">' + cleanGlyph + '</span>';
            } else {
                var randomColor = colors[Math.floor(Math.random() * colors.length)];
                html += '<span class="glyph ' + blockClass + '" style="font-family: ' + fontStack + '; color: ' + randomColor + '; transition: color 3s ease;">' + cleanGlyph + '</span>';
            }
        } catch (error) {
            // Skip failed glyphs
        }
    }
    return html;
}

function animateGlyphColors(colors) {
    if (i35_currentAnimationId) {
        cancelAnimationFrame(i35_currentAnimationId);
    }
    var glyphs = document.querySelectorAll('.glyph:not(.special-glyph)');
    if (glyphs.length === 0) return;

    function morphColors() {
        var numToChange = Math.ceil(glyphs.length * 0.002);
        for (var i = 0; i < numToChange; i++) {
            var randomGlyph = glyphs[Math.floor(Math.random() * glyphs.length)];
            var newColor = colors[Math.floor(Math.random() * colors.length)];
            randomGlyph.style.color = newColor;
        }
        i35_currentAnimationId = requestAnimationFrame(morphColors);
    }
    morphColors();
}

function isWhiteColor(color) {
    var c = color.toUpperCase().trim();
    return c === '#FFF' || c === '#FFFFFF' || c === 'WHITE' || c === '#F4F5F8';
}

function isOrangeColor(color) {
    var c = color.toUpperCase().trim();
    return c === '#8B4513' || c === '#D47600' || c === '#DBA10E' || c === '#DD7500' ||
           c === '#E05206' || c === '#EF7D00' || c === '#F2A800' || c === '#F6B40E' ||
           c === '#F77F00' || c === '#FDB913' || c === '#FF4E12' || c === '#FF7722' ||
           c === '#FF883E' || c === '#FF8C00' || c === '#FF9933' || c === '#FFB81C' ||
           c === '#FFBE29' || c === '#FFC61E' || c === '#FFC726' || c === '#FFC72C' ||
           c === 'ORANGE';
}

function isYellowColor(color) {
    var c = color.toUpperCase().trim();
    return c === '#ECC81D' || c === '#F1BF00' || c === '#F4F100' || c === '#F7D618' ||
           c === '#F7E017' || c === '#F9CF02' || c === '#F9E300' || c === '#FAD201' ||
           c === '#FBDE4A' || c === '#FCD116' || c === '#FCD856' || c === '#FCDC04' ||
           c === '#FCDD09' || c === '#FCE300' || c === '#FDCE12' || c === '#FDEF42' ||
           c === '#FEC50C' || c === '#FECB00' || c === '#FECC00' || c === '#FED100' ||
           c === '#FFC400' || c === '#FFC90E' || c === '#FFCC00' || c === '#FFCD00' ||
           c === '#FFCE00' || c === '#FFD100' || c === '#FFD500' || c === '#FFD520' ||
           c === '#FFD700' || c === '#FFDE00' || c === '#FFDF00' || c === '#FFED00' ||
           c === '#FFEF00' || c === '#FFFF00' || c === 'YELLOW';
}

function renderGenericFlag(countryId) {
    i35_currentCountry = countryId;
    i35_currentColors = countryColors[countryId] || ['#fff'];
    i35_flattenedGlyphsCache = null;

    var hasWhite = i35_currentColors.some(isWhiteColor);
    var hasOrange = i35_currentColors.some(isOrangeColor);
    var hasYellow = i35_currentColors.some(isYellowColor);
    document.body.classList.toggle('flag-has-white', hasWhite);
    document.body.classList.toggle('flag-has-orange', hasOrange);
    document.body.classList.toggle('flag-has-yellow', hasYellow);

    var topGlyphs = generateGlyphText(775, i35_currentColors);
    var leftGlyphs = generateGlyphText(1200, i35_currentColors);
    var rightGlyphs = generateGlyphText(1200, i35_currentColors);

    var flagData = getCountryFlagEmoji(countryId);
    var flagDisplay = '';
    if (flagData) {
        if (flagData.type === 'image') {
            flagDisplay = '<img src="' + flagData.src + '" class="flag-image" style="width: 420px; height: auto;">';
        } else if (flagData.type === 'emoji') {
            flagDisplay = '<span class="flag-emoji" style="margin-top: -.35em;">' + flagData.content + '</span>';
        }
    }

    var html = '<div class="glyph-wrapper">' +
        '<div class="top-row">' + topGlyphs + '</div>' +
        '<div class="bottom-row">' +
            '<div class="bottom-panel bottom-panel-left"><div class="flag-half"></div>' + leftGlyphs + '</div>' +
            '<div class="bottom-panel bottom-panel-right"><div class="flag-half"></div>' + rightGlyphs + '</div>' +
        '</div>' +
    '</div>' +
    '<div class="flag-generic">' + flagDisplay + '</div>';

    return { html: html, colors: i35_currentColors };
}

function formatCountryName(countryId) {
    var abbreviations = new Set(['us', 'uk', 'uae', 'un', 'drc', 'png']);
    var lowercase = new Set(['and', 'of', 'the']);

    return countryId.split('_').map(function(word, index) {
        var lower = word.toLowerCase();
        if (abbreviations.has(lower)) return word.toUpperCase();
        if (index > 0 && lowercase.has(lower)) return lower;
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}

var NON_UN_ENTITIES = [
    'pirate', 'pride', 'trans', 'peace', 'checkered', 'alert', 'black_flag', 'crossed_flags',
    'england', 'scotland', 'wales',
    'aland_islands', 'american_samoa', 'anguilla', 'antarctica', 'aruba',
    'bermuda', 'british_indian_ocean_territory', 'british_virgin_islands',
    'caribbean_netherlands', 'cayman_islands', 'christmas_island', 'cocos_islands',
    'cook_islands', 'curacao', 'falkland_islands', 'faroe_islands', 'french_guiana',
    'french_polynesia', 'french_southern_territories', 'gibraltar', 'greenland',
    'guadeloupe', 'guam', 'guernsey', 'hong_kong', 'isle_of_man', 'jersey',
    'macau', 'martinique', 'mayotte', 'montserrat', 'new_caledonia', 'niue',
    'norfolk_island', 'northern_mariana_islands', 'pitcairn_islands', 'puerto_rico',
    'reunion', 'saint_barthelemy', 'saint_martin', 'sint_maarten', 'south_georgia',
    'svalbard', 'tokelau', 'turks_and_caicos', 'us_virgin_islands', 'wallis_and_futuna',
    'western_sahara', 'taiwan', 'palestine', 'kosovo', 'tibetan'
];

// ===== MAIN RENDER =====
function renderRecipe(recipeIndex) {
    if (!i35_dataLoaded) return;

    if (i35_currentAnimationId) {
        cancelAnimationFrame(i35_currentAnimationId);
        i35_currentAnimationId = null;
    }

    if (recipeIndex === undefined || recipeIndex >= i35_FLAG_RECIPES.length) {
        recipeIndex = Math.floor(Math.random() * i35_FLAG_RECIPES.length);
    }

    i35_currentRecipeIndex = recipeIndex;
    i35_alphaIndex = recipeIndex;
    var recipe = i35_FLAG_RECIPES[recipeIndex];
    var container = document.getElementById('flagContainer');
    var recipeInfo = document.getElementById('recipeInfo');

    var result = renderGenericFlag(recipe.country);
    container.innerHTML = result.html;

    // Update info box
    var infoColor = result.colors[Math.floor(Math.random() * result.colors.length)] || '#333';
    var textColor = (isYellowColor(infoColor) || isWhiteColor(infoColor)) ? '#000' : '#fff';

    recipeInfo.style.background = infoColor;
    recipeInfo.style.color = textColor;
    recipeInfo.classList.remove('expanded');

    recipeInfo.querySelector('.title').textContent = recipeIndex + ': ' + recipe.name;

    // Build meta list
    var currentCountryData = countryData[recipe.country];
    var langData = (currentCountryData && currentCountryData.languages) || { national: [], other: [] };
    var glyphsData = countryGlyphs[recipe.country] || {};
    var rawBlocks = Object.keys(glyphsData);
    var seen = {};
    var displayBlocks = [];
    for (var i = 0; i < rawBlocks.length; i++) {
        var std = getStandardBlockName(rawBlocks[i]);
        if (!seen[std]) { seen[std] = true; displayBlocks.push(std); }
    }

    var metaList = recipeInfo.querySelector('.meta-list');
    metaList.innerHTML = '';

    function addMetaEntry(label, value) {
        var labelDiv = document.createElement('div');
        labelDiv.className = 'meta-label';
        labelDiv.textContent = label;
        metaList.appendChild(labelDiv);
        var valueDiv = document.createElement('div');
        valueDiv.textContent = value;
        metaList.appendChild(valueDiv);
    }

    if (currentCountryData && currentCountryData.iso) {
        addMetaEntry('Country Code:', currentCountryData.iso);
    }
    addMetaEntry('National Language:', (langData.national || []).join(', ') || 'N/A');
    if (langData.other && langData.other.length > 0) {
        addMetaEntry('Other:', langData.other.join(', '));
    }

    // Blocks with hover interactivity
    var blocksLabel = document.createElement('div');
    blocksLabel.className = 'meta-label';
    blocksLabel.textContent = 'Blocks:';
    metaList.appendChild(blocksLabel);

    var blocksValueDiv = document.createElement('div');
    displayBlocks.forEach(function(blockName, i) {
        var blockSpan = document.createElement('span');
        blockSpan.textContent = blockName;
        blockSpan.style.cursor = 'pointer';
        var hoverClass = 'hover-' + getBlockClassName(blockName);
        blockSpan.addEventListener('mouseover', function() { document.body.classList.add(hoverClass); });
        blockSpan.addEventListener('mouseout', function() { document.body.classList.remove(hoverClass); });
        blocksValueDiv.appendChild(blockSpan);
        if (i < displayBlocks.length - 1) blocksValueDiv.append(', ');
    });
    metaList.appendChild(blocksValueDiv);

    if (currentCountryData && currentCountryData.notes) {
        addMetaEntry('Notes:', currentCountryData.notes);
    }

    // Start color morphing
    if (result.colors.length > 0) {
        setTimeout(function() { animateGlyphColors(result.colors); }, 100);
    }
}

// ===== KEYBOARD =====
document.addEventListener('keydown', function(event) {
    var key = event.key;
    if (key >= '0' && key <= '9') {
        var index = parseInt(key);
        if (index < i35_FLAG_RECIPES.length) {
            i35_alphaIndex = index;
            renderRecipe(index);
        }
    } else if (key === 'ArrowRight' || key === ' ' || key === 'n') {
        i35_alphaIndex = (i35_alphaIndex + 1) % i35_FLAG_RECIPES.length;
        renderRecipe(i35_alphaIndex);
    } else if (key === 'ArrowLeft' || key === 'p') {
        i35_alphaIndex = (i35_alphaIndex - 1 + i35_FLAG_RECIPES.length) % i35_FLAG_RECIPES.length;
        renderRecipe(i35_alphaIndex);
    } else if (key === 'r') {
        renderRecipe();
    }
});

// ===== URL PARAMS =====
function getQueryParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// ===== INIT =====
async function init() {
    injectStyles();
    createDOM();
    await loadDependencies();

    // Wait for country data to load
    window.countryDataLoaded = loadCountryData('./js_glyph');

    // Poll for all data
    function checkDataLoaded() {
        var hasBlockLang = typeof block_lang !== 'undefined' || typeof var_block_lang !== 'undefined';
        var hasLangFont = typeof lang_font !== 'undefined' || typeof var_lang_font !== 'undefined';
        if (typeof countryGlyphs !== 'undefined' &&
            typeof countryColors !== 'undefined' &&
            typeof countryData !== 'undefined' &&
            hasBlockLang && hasLangFont &&
            typeof countries !== 'undefined' &&
            countries.length > 0) {
            initializeData();
        } else {
            setTimeout(checkDataLoaded, 100);
        }
    }

    if (window.countryDataLoaded) {
        await window.countryDataLoaded;
    }
    checkDataLoaded();
}

async function initializeData() {
    await AutoFont.init();
    console.log('insert35: All data loaded');

    var filteredCountries = countries.slice();
    var alphaMode = false;

    var mode = getQueryParam('mode');
    if (mode === 'UN') {
        filteredCountries = filteredCountries.filter(function(c) { return NON_UN_ENTITIES.indexOf(c) === -1; });
    } else if (mode === 'NON-UN') {
        filteredCountries = filteredCountries.filter(function(c) { return NON_UN_ENTITIES.indexOf(c) !== -1; });
    }

    if (getQueryParam('alpha') !== null) {
        alphaMode = true;
        filteredCountries.sort(function(a, b) { return a.localeCompare(b); });
    }

    i35_FLAG_RECIPES = filteredCountries.map(function(country) {
        return { id: country, name: formatCountryName(country), country: country, layout: 'generic-tricolor' };
    });

    console.log('insert35: Countries available:', i35_FLAG_RECIPES.length);
    i35_dataLoaded = true;

    var countryCode = getQueryParam('country');
    if (countryCode) {
        var countryIndex = -1;
        for (var i = 0; i < i35_FLAG_RECIPES.length; i++) {
            var recipe = i35_FLAG_RECIPES[i];
            var cdata = countryData[recipe.id];
            if (!cdata) continue;
            var code = countryCode.toLowerCase();
            if (recipe.id.toLowerCase() === code || (cdata.iso && cdata.iso.toLowerCase() === code)) {
                countryIndex = i;
                break;
            }
        }
        if (countryIndex !== -1) {
            i35_alphaIndex = countryIndex;
            renderRecipe(countryIndex);
        } else {
            renderRecipe(alphaMode ? 0 : undefined);
        }
    } else {
        renderRecipe(alphaMode ? 0 : undefined);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
