// Configuration
var divCounter = 4;
var glyphsPerDiv = 2;
var baseFontSize = '12vw';

var container = [];
var mycolors = [];
var mycolors2 = [];

// Display options
var preventRepeats = true; // Set to true to ensure all glyphs are distinct, false to allow repeats
var forceGlyphIndex = null; // Set to glyph index (0-48) to show only that glyph, or null for random


// Load standardQuad.js
var scriptCSS = document.createElement('script');
scriptCSS.src = "../js_layout/standardQuad.js";
document.getElementsByTagName('body')[0].appendChild(scriptCSS);

// Load contrast_tester.js
var scriptContrast = document.createElement('script');
scriptContrast.src = "../js_funct/contrast_tester.js";
document.getElementsByTagName('body')[0].appendChild(scriptContrast);


// Wait for all required signals
function jsWait() {
    if (typeof whirldArraySignal == "undefined" || 
        typeof msucdArraySignal == "undefined" || 
        typeof signalArray == "undefined") {
        window.setTimeout(jsWait, 100);
    } else {
        initDiv();
        initStyle();
        initContent();
        startTimers();
    }
}

function initDiv() {
    for (var i = 1; i <= divCounter; i++) {
        container[i] = document.createElement("div");
        document.body.appendChild(container[i]);
        container[i].id = 'myid' + i;
        container[i].className = 'display';
    }
}

// Helper function to select a color with good contrast
function selectContrastingColor(colorArray, backgroundColor, minContrast) {
    minContrast = minContrast || 2.0; // Default minimum contrast ratio
    var maxAttempts = 20;
    var bestColor = null;
    var bestContrast = 0;

    for (var attempt = 0; attempt < maxAttempts; attempt++) {
        var testColor = colorArray[Math.floor(Math.random() * colorArray.length)];
        var contrast = typeof getContrastRatio === 'function'
            ? getContrastRatio(testColor, backgroundColor)
            : 999; // If contrast function not loaded yet, allow any color

        if (contrast >= minContrast) {
            return testColor; // Found a good color
        }

        // Track best option in case we don't find one meeting the threshold
        if (contrast > bestContrast) {
            bestContrast = contrast;
            bestColor = testColor;
        }
    }

    // Return best color found, even if it doesn't meet minimum
    return bestColor || colorArray[0];
}

function initStyle() {
    mycolors = [];
    mycolors2 = [];

    // Generate primary color palette
    for (var i = 0; i < 8; i++) {
        var hue = Math.round(Math.random() * 360);
        var sat = Math.round(Math.random() * 80) + 1;
        var light = Math.round(Math.random() * 70) + 10;
        var alpha = Math.random() + 0.1;
        mycolors.push('hsla(' + hue + ',' + sat + '%,' + light + '%,' + alpha + ')');
    }

    // Generate secondary color palette
    var baseHue = Math.round(Math.random() * 360);
    for (var i = 0; i < 50; i++) {
        var hue = Math.round(baseHue + Math.random() * 40 - 20);
        var sat = Math.round(Math.random() * 80) + 1;
        var light = Math.round(Math.random() * 100);
        var alpha = Math.random() + 0.1;
        mycolors2.push('hsla(' + hue + ',' + sat + '%,' + light + '%,' + alpha + ')');
    }

    // Apply styles to containers with contrast checking (lower thresholds for more variety)
    for (var i = 1; i <= divCounter; i++) {
        var bgColor = mycolors2[Math.floor(Math.random() * mycolors2.length)];
        container[i].style.backgroundColor = bgColor;

        // Select colors with good contrast against background (lower thresholds = more variety)
        container[i].style.color = selectContrastingColor(mycolors, bgColor, 1.5);

        var shadowColor = selectContrastingColor(mycolors2, bgColor, 1.2);
        container[i].style.textShadow =
            Math.round(Math.random() * 10 - 1) + 'px ' +
            Math.round(Math.random() * 4- 1) + 'px ' +
            shadowColor;

        container[i].style.webkitTextFillColor = selectContrastingColor(mycolors2, bgColor, 1.5);
        container[i].style.webkitTextStrokeWidth = (Math.random() * 5) + "px";
        container[i].style.webkitTextStrokeColor = selectContrastingColor(mycolors, bgColor, 1.8);
    }
}

function initContent() {
    var usedGlyphs = []; // Track which glyphs have been used

    for (var i = 1; i <= divCounter; i++) {
        container[i].innerHTML = '';
        for (var sp = 1; sp <= glyphsPerDiv; sp++) {
            var span = document.createElement("span");
            container[i].appendChild(span);
            span.id = 'span' + i + '_' + sp;
            span.style.fontSize = baseFontSize;
            span.style.paddingRight = '2vw';
            setRandomGlyph(span, usedGlyphs);
        }
    }
}

function setRandomGlyph(spanElement, usedGlyphs) {
    var glyphIndex;

    // Force specific glyph if set
    if (forceGlyphIndex !== null) {
        glyphIndex = forceGlyphIndex;
    }
    // Prevent repeats if enabled
    else if (preventRepeats && usedGlyphs) {
        var attempts = 0;
        do {
            glyphIndex = Math.floor(Math.random() * myFontSet.length);
            attempts++;
        } while ((!myFontSet[glyphIndex] || usedGlyphs.indexOf(glyphIndex) !== -1) && attempts < 100);

        // Add to used glyphs list
        if (usedGlyphs.indexOf(glyphIndex) === -1) {
            usedGlyphs.push(glyphIndex);
        }
    }
    // Default: random with possible repeats
    else {
        do {
            glyphIndex = Math.floor(Math.random() * myFontSet.length);
        } while (!myFontSet[glyphIndex]);
    }
    
    var codepoint = myFontSet[glyphIndex][0];
    var fontList = myFontSet[glyphIndex].slice(1);
    var randomFont = fontList[Math.floor(Math.random() * fontList.length)];
    
    spanElement.style.fontFamily = randomFont;
    spanElement.innerHTML = parseCodepoint(codepoint);
    
    // Generate class names
    var fontClassName = randomFont.toLowerCase().replace(/\s+/g, '-');
    var codepointClass = codepoint.split(';')[0].replace('x', '').toLowerCase();
    codepointClass = 'u' + codepointClass; // u30aa instead of x30aa

    // Apply classes including glyph index for specific CSS targeting
    spanElement.className = fontClassName + ' ' + codepointClass + ' glyph-' + glyphIndex;
 
    // Tooltip
    var description = glyphDescriptions[glyphIndex] || 'Unknown glyph';
    var cpDisplay = codepoint.indexOf(';') > -1 ? 'Composite' : 'U+' + codepoint.replace('x','');
    spanElement.title = description + ' (' + cpDisplay + ') — ' + randomFont;
}


function parseCodepoint(cp) {
    // Handle composite characters: 'x05D9;&#x05B0;...'
    if (cp.indexOf(';') > -1) {
        var parts = cp.split(';');
        var output = '&#' + parts[0] + ';';
        for (var i = 1; i < parts.length; i++) {
            if (parts[i]) output += parts[i] + ';';
        }
        return output;
    }
    // Handle hex: 'xFDFD'
    else if (cp.charAt(0) === 'x') {
        return '&#' + cp + ';';
    }
    // Handle decimal: '9767'
    else {
        return '&#' + cp + ';';
    }
}

function startTimers() {
    // Glyph swap timer (35-88 seconds)
    window.setInterval(function() {
        var rndContainer = Math.floor(Math.random() * divCounter) + 1;
        var rndSpan = Math.floor(Math.random() * glyphsPerDiv) + 1;
        var spanId = 'span' + rndContainer + '_' + rndSpan;
        var spanElement = document.getElementById(spanId);
        if (spanElement) {
            setRandomGlyph(spanElement);
        }
    }, Math.random() * 53000 + 35000);
    
    // Background color timer - when background changes, update all text colors for contrast
    window.setInterval(function() {
        var rndDiv = Math.floor(Math.random() * divCounter) + 1;
        var newBgColor = mycolors2[Math.floor(Math.random() * mycolors2.length)];
        container[rndDiv].style.backgroundColor = newBgColor;

        // Update text colors to maintain contrast
        container[rndDiv].style.color = selectContrastingColor(mycolors, newBgColor, 2.0);
        container[rndDiv].style.webkitTextFillColor = selectContrastingColor(mycolors2, newBgColor, 2.0);
        container[rndDiv].style.webkitTextStrokeColor = selectContrastingColor(mycolors, newBgColor, 2.5);
    }, Math.random() * 10000 + 5000);

    // Text color timer - ensure contrast with current background
    window.setInterval(function() {
        var rndDiv = Math.floor(Math.random() * divCounter) + 1;
        var currentBg = container[rndDiv].style.backgroundColor;
        container[rndDiv].style.color = selectContrastingColor(mycolors2, currentBg, 2.0);
    }, Math.random() * 10000 + 5000);
}

// Manual refresh function for nav
function changeHtmlDisplayInline() {
    var rndContainer = Math.floor(Math.random() * divCounter) + 1;
    for (var sp = 1; sp <= glyphsPerDiv; sp++) {
        var spanId = 'span' + rndContainer + '_' + sp;
        var spanElement = document.getElementById(spanId);
        if (spanElement) {
            setRandomGlyph(spanElement);
        }
    }
}
console.log('insert22.js loaded');
jsWait();