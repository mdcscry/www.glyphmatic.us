// Configuration
var divCounter = 3;
var glyphsPerDiv = 200;
var baseFontSize = '30vw';

var container = [];
var svgContainer = [];
var mycolors = [];
var sharedMaskGlyph = null;

// Wait for signals
function jsWait() {
    if (typeof whirldArraySignal == "undefined" || 
        typeof msucdArraySignal == "undefined") {
        window.setTimeout(jsWait, 100);
    } else {
        initDiv();
        initStyle();
        initContent();
        startTimers();
    }
}


function initDiv() {
    // Triangle arrangement: 1 top center, 2 bottom
    var positions = [
        { top: '5%', left: '25%', width: '50%', height: '45%' },  // top center
        { top: '52%', left: '0%', width: '50%', height: '45%' },  // bottom left
        { top: '52%', left: '50%', width: '50%', height: '45%' }  // bottom right
    ];
    
    for (var i = 1; i <= divCounter; i++) {
        container[i] = document.createElement("div");
        document.body.appendChild(container[i]);
        container[i].id = 'myid' + i;
        container[i].style.position = 'absolute';
        container[i].style.top = positions[i-1].top;
        container[i].style.left = positions[i-1].left;
        container[i].style.width = positions[i-1].width;
        container[i].style.height = positions[i-1].height;
        container[i].style.overflow = 'visible';
        
        // Create SVG container - oversized to allow bleeding
        svgContainer[i] = document.createElementNS("https://www.w3.org/2000/svg", "svg");
        svgContainer[i].style.width = '200%';
        svgContainer[i].style.height = '200%';
        svgContainer[i].style.position = 'absolute';
        svgContainer[i].style.top = '-35%';
        svgContainer[i].style.left = '-50%';
        container[i].appendChild(svgContainer[i]);
    }
}

function initStyle() {
    mycolors = [];
    
    // Generate color palette
    var baseHue = Math.round(Math.random() * 360);
    for (var i = 0; i < 30; i++) {
        var hue = (baseHue + Math.random() * 70 - 30 + 360) % 360;
        var sat = Math.round(Math.random() * 60 + 40);
        var light = Math.round(Math.random() * 20 + 10);
        var alpha = Math.random() * 0.5 + 0.3;
        mycolors.push('hsla(' + hue + ',' + sat + '%,' + light + '%,' + alpha + ')');
    }
    
    // Set page background to a color from palette
    document.body.style.backgroundColor = mycolors[Math.floor(Math.random() * mycolors.length)];
}

function initContent() {
    // Pick ONE shared mask glyph for all three panels
    var maskGlyphIndex = Math.floor(Math.random() * myFontSet.length);
    sharedMaskGlyph = parseCodepoint(myFontSet[maskGlyphIndex][0]);
    
    for (var i = 1; i <= divCounter; i++) {
        createMask(i);
        
        // Create many glyphs underneath
        for (var layer = 0; layer < glyphsPerDiv; layer++) {
            createGlyphLayer(i);
        }
    }
}

function createMask(quadIndex) {
    var svg = svgContainer[quadIndex];
    
    // Create defs
    var defs = document.createElementNS("https://www.w3.org/2000/svg", "defs");
    svg.appendChild(defs);
    
    // Create blur filter
    var filter = document.createElementNS("https://www.w3.org/2000/svg", "filter");
    filter.setAttribute('id', 'blur_' + quadIndex);
    var blur = document.createElementNS("https://www.w3.org/2000/svg", "feGaussianBlur");
    blur.setAttribute('in', 'SourceGraphic');
    blur.setAttribute('stdDeviation', '15');
    filter.appendChild(blur);
    defs.appendChild(filter);
    
    // Create clip path
    var clipPath = document.createElementNS("https://www.w3.org/2000/svg", "clipPath");
    clipPath.setAttribute('id', 'clip_' + quadIndex);
    
    var maskText = document.createElementNS("https://www.w3.org/2000/svg", "text");
    maskText.setAttribute('x', '50%');
    maskText.setAttribute('y', '50%');
    maskText.setAttribute('text-anchor', 'middle');
    maskText.setAttribute('dominant-baseline', 'middle');
    maskText.setAttribute('font-size', baseFontSize);
    maskText.innerHTML = sharedMaskGlyph;
    
    clipPath.appendChild(maskText);
    defs.appendChild(clipPath);
    
    // Create wrapper for fade animation
    var maskWrapper = document.createElementNS("https://www.w3.org/2000/svg", "g");
    maskWrapper.setAttribute('class', 'mask-wrapper');
    maskWrapper.setAttribute('id', 'wrapper_' + quadIndex);
    maskWrapper.style.opacity = '0';
    svg.appendChild(maskWrapper);
    
    // Fade in
    setTimeout(function() {
        maskWrapper.style.transition = 'opacity 6s ease-in-out';
        maskWrapper.style.opacity = '1';
    }, 100);
}

function createGlyphLayer(quadIndex) {
    var wrapper = document.getElementById('wrapper_' + quadIndex);
    
    // Random glyph from myFontSet
    var glyphIndex = Math.floor(Math.random() * myFontSet.length);
    if (!myFontSet[glyphIndex]) return; // Skip if undefined
    
    var glyph = parseCodepoint(myFontSet[glyphIndex][0]);
    
    // Random font from that glyph's font list
    var fontList = myFontSet[glyphIndex].slice(1);
    var randomFont = fontList[Math.floor(Math.random() * fontList.length)];
    
    // Create group with clip and blur
    var group = document.createElementNS("https://www.w3.org/2000/svg", "g");
    group.setAttribute('clip-path', 'url(#clip_' + quadIndex + ')');
    group.setAttribute('filter', 'url(#blur_' + quadIndex + ')');
    group.setAttribute('class', 'glyph-layer');
    group.style.opacity = '0';
    
    // Random position
    var x = Math.random() * 100;
    var y = Math.random() * 100;
    
    // Create text WITH FONT
    var text = document.createElementNS("https://www.w3.org/2000/svg", "text");
    text.setAttribute('x', x + '%');
    text.setAttribute('y', y + '%');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('font-size', (Math.random() * 15 + 10) + 'vw');
    text.setAttribute('font-family', randomFont); // ADD THIS
    text.setAttribute('fill', mycolors[Math.floor(Math.random() * mycolors.length)]);
    text.innerHTML = glyph;
    
    group.appendChild(text);
    wrapper.appendChild(group);
    
    // Animate with color change
    fadeWithColorChange(group, text, Math.random() * 40000 + 18000);
}

function fadeWithColorChange(element, textElement, duration) {
    var fadeIn = true;
    
    setInterval(function() {
        element.style.transition = 'opacity ' + (duration / 1000) + 's ease-in-out';
        
        if (fadeIn) {
            textElement.setAttribute('fill', mycolors[Math.floor(Math.random() * mycolors.length)]);
            element.style.opacity = '1';
            fadeIn = false;
        } else {
            element.style.opacity = '0';
            fadeIn = true;
        }
    }, duration);
    
    // Start with random delay
    setTimeout(function() {
        element.style.opacity = '1';
    }, Math.random() * duration);
}

function startTimers() {
    // Change masks periodically
    setInterval(function() {

        document.body.style.transition = 'background-color 4s ease-in-out';
        // Regenerate color palette
        initStyle();
        
        // Pick new shared mask glyph
        var maskGlyphIndex = Math.floor(Math.random() * myFontSet.length);
        sharedMaskGlyph = parseCodepoint(myFontSet[maskGlyphIndex][0]);
        
        for (var q = 1; q <= divCounter; q++) {
            (function(quadIndex) {
                var wrapper = document.getElementById('wrapper_' + quadIndex);
                
                // Fade out
                if (wrapper) {
                    wrapper.style.transition = 'opacity 4s ease-in-out';
                    wrapper.style.opacity = '0';
                }
                
                // After fade, rebuild
                setTimeout(function() {
                    var svg = svgContainer[quadIndex];
                    
                    // Clear old content
                    while (svg.firstChild) {
                        svg.removeChild(svg.firstChild);
                    }
                    
                    // Rebuild with new colors
                    createMask(quadIndex);
                    for (var layer = 0; layer < glyphsPerDiv; layer++) {
                        createGlyphLayer(quadIndex);
                    }
                }, 4000);
            })(q);
        }
    }, Math.random() * 20000 + 25000);
}

function parseCodepoint(cp) {
    if (cp.indexOf(';') > -1) {
        var parts = cp.split(';');
        var output = '&#' + parts[0] + ';';
        for (var i = 1; i < parts.length; i++) {
            if (parts[i]) output += parts[i] + ';';
        }
        return output;
    }
    else if (cp.charAt(0) === 'x') {
        return '&#' + cp + ';';
    }
    else {
        return '&#' + cp + ';';
    }
}

console.log('insert14.js loaded - masked dissolve');
jsWait();