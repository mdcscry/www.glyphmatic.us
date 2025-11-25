// Configuration
var divCounter = 4;
var glyphsPerDiv = 20;
var baseFontSize = '12vw';

var container = [];
var mycolors = [];
var mycolors2 = [];

// Test mode - set to glyph index to display only that glyph, or null for random
var testGlyphIndex = null; // Change to number like 41 for peace hand


// Load standardQuad.js
var scriptCSS = document.createElement('script');
scriptCSS.src = "../js_layout/standardQuad.js";
document.getElementsByTagName('body')[0].appendChild(scriptCSS);


// Wait for all required signals
function jsWait() {
    if (typeof whirldArraySignal == "undefined" ||
        typeof msucdArraySignal == "undefined" ||
        typeof signalArray == "undefined") {
        window.setTimeout(jsWait, 100);
    } else {
        console.log("1. All custom JS signals are ready. Waiting for web fonts...");
        document.fonts.ready.then(function () {
            console.log("2. SUCCESS: document.fonts.ready resolved. All web fonts should now be loaded.");
            initDiv();
            initStyle();
            initContent(); // This will call setRandomGlyph
            startTimers();
            console.log("3. initContent and timers started.");
        }).catch(function (error) {
            console.error("ERROR: document.fonts.ready rejected:", error);
            console.warn("Proceeding anyway, but web fonts might not be available.");
            initDiv();
            initStyle();
            initContent();
            startTimers();
        });
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
    
    // Apply styles to containers
    for (var i = 1; i <= divCounter; i++) {
        container[i].style.backgroundColor = mycolors2[Math.floor(Math.random() * mycolors2.length)];
        container[i].style.color = mycolors[Math.floor(Math.random() * mycolors.length)];
        container[i].style.textShadow = 
            Math.round(Math.random() * 2 - 1) + 'px ' +
            Math.round(Math.random() * 3 - 1) + 'px ' +
            mycolors2[Math.floor(Math.random() * mycolors2.length)];
        container[i].style.webkitTextFillColor = mycolors2[Math.floor(Math.random() * mycolors2.length)];
        container[i].style.webkitTextStrokeWidth = (Math.random() * 2) + "px";
        container[i].style.webkitTextStrokeColor = mycolors[Math.floor(Math.random() * mycolors.length)];
    }
}

function initContent() {
    for (var i = 1; i <= divCounter; i++) {
        container[i].innerHTML = '';
        for (var sp = 1; sp <= glyphsPerDiv; sp++) {
            var span = document.createElement("span");
            container[i].appendChild(span);
            span.id = 'span' + i + '_' + sp;
            span.style.fontSize = baseFontSize;
            span.style.paddingRight = '2vw';
            setRandomGlyph(span);
        }
    }
}

function setRandomGlyph(spanElement) {
    var glyphIndex;
    
    if (testGlyphIndex !== null) {
        glyphIndex = testGlyphIndex;
    } else {
        // Keep trying until we find a valid glyph
        do {
            glyphIndex = Math.floor(Math.random() * myFontSet.length);
        } while (!myFontSet[glyphIndex]);
    }
    
    var codepoint = myFontSet[glyphIndex][0];
    var fontList = myFontSet[glyphIndex].slice(1);
    var randomFont = fontList[Math.floor(Math.random() * fontList.length)];

    // --- CRITICAL INSPECTION BLOCK ---
    if (randomFont.includes('Noto Sans Symbols 2')) { // Use includes to catch subtle variants if any
        console.groupCollapsed(">>> DEBUG: Inspecting problematic font string: '" + randomFont + "' <<<");
        console.log("Actual string length:", randomFont.length);
        console.log("Does it exactly match 'Noto Sans Symbols 2'?", randomFont === 'Noto Sans Symbols 2');

        let charCodeString = '';
        for (let i = 0; i < randomFont.length; i++) {
            charCodeString += `${randomFont[i]}:${randomFont.charCodeAt(i)} `;
        }
        console.log("Char codes (char:code):", charCodeString);
        console.groupEnd();
    }




    let veryCleanedFontName = randomFont.replace(/[^\w\s-]/g, '').replace(/\s+/g, ' ').trim();
    console.log('this should have Noto Sans Symbols 2 in it: '+randomFont)


            // Check if the problematic font is selected
    if (randomFont === "Noto Sans Symbols 2") {
        spanElement.classList.add('noto-sans-symbols-2'); // Apply the CSS class
        spanElement.style.fontFamily = ''; // Ensure no conflicting inline style
    } else {
        spanElement.style.fontFamily = randomFont; // For all other fonts, use inline style
    }
    //spanElement.style.fontFamily = veryCleanedFontName;
    console.log('This is the value of spanElement.style.fontFamily: ' + spanElement.style.fontFamily)
    spanElement.innerHTML = parseCodepoint(codepoint);
    
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
    
    // Background color timer
    window.setInterval(function() {
        var rndDiv = Math.floor(Math.random() * divCounter) + 1;
        container[rndDiv].style.backgroundColor = mycolors2[Math.floor(Math.random() * mycolors2.length)];
    }, Math.random() * 10000 + 5000);
    
    // Text color timer
    window.setInterval(function() {
        var rndDiv = Math.floor(Math.random() * divCounter) + 1;
        container[rndDiv].style.color = mycolors2[Math.floor(Math.random() * mycolors2.length)];
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
console.log('insert12.js loaded');
jsWait();