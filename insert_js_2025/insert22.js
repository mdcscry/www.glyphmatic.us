// Configuration
//var maskSize = '45vw';
//var maskYPosition = '58%'; // vertical position of mask (50% = center)
var backgroundGlyphSize = '1.1vw';
var backgroundGlyphCount = 3000;
var gridSpacingX = 1.75; // horizontal multiplier for glyph size
var gridSpacingY = 3 // vertical multiplier for glyph size
var maskDissolveDuration = 5000; // milliseconds
var glyphColorChangeDuration = 3000; // how often background glyphs change color
var forceMaskIndex = null; // Set to null for random, or glyph index (0-48) to force specific mask for testing

var container;
var svgContainer;
var currentScheme; // 'A' or 'B'
var schemeColors = {};
var maskCounter = 0; // Track unique mask IDs
let glyphStylesLookup;
var descriptionLabel;

// Wait for signals
function jsWait() {
    if (typeof whirldArraySignal == "undefined" || 
        typeof myFontSet == "undefined") {
        window.setTimeout(jsWait, 100);
    } else {
        glyphStylesLookup = generateAllGlyphStyles(defaultMaskStyle, outlierDefinitions, myFontSet);
        init();
    }
}

function init() {
    // Randomly pick scheme
    var rand = Math.random();
    if (rand < 0.33) {
        currentScheme = 'A';
    } else if (rand < 0.66) {
        currentScheme = 'B';
    } else {
        currentScheme = 'C';
    }
    console.log('Selected Scheme:', currentScheme);
    
    generateSchemeColors();
    createContainer();
    createMask();
    createBackgroundGlyphs();
    startMaskDissolve();
}

function generateSchemeColors() {
    if (currentScheme === 'A') {
        // Scheme A: Dark saturated mask
        var maskHue = Math.floor(Math.random() * 360);
        schemeColors.maskColor = `hsl(${maskHue}, 80%, 30%)`; // dark saturated
        schemeColors.backgroundColor = `hsl(${maskHue}, 80%, 40%)`; // slightly lighter
        schemeColors.brightness = 55; // vivid, not pastel
        schemeColors.saturation = 95; // high saturation

    } else if (currentScheme === 'B') {
        // Scheme B: Light grayscale mask
        var grayValue = Math.floor(Math.random() * 30 + 70); // 70-100% lightness
        schemeColors.maskColor = `hsl(0, 0%, ${grayValue}%)`; // light gray
        schemeColors.backgroundColor = `hsl(0, 0%, ${grayValue - 10}%)`; // slightly darker

        // Narrow hue range for background glyphs
        var baseHue = Math.floor(Math.random() * 360);
        schemeColors.baseHue = baseHue;
        schemeColors.hueRange = 40; // +/- 20 degrees
        schemeColors.saturation = 80;
        schemeColors.brightness = 40;

    } else {
        // Scheme C: Grayscale variations
        var subVariant = Math.random() < 0.5 ? 'C1' : 'C2';

        if (subVariant === 'C1') {
            // C1: Light mask on dark background
            var maskLightness = Math.floor(Math.random() * 15 + 85); // 85-100% (white to light gray)
            var bgLightness = Math.floor(Math.random() * 15); // 0-15% (black to dark charcoal)
            schemeColors.maskColor = `hsl(0, 0%, ${maskLightness}%)`;
            schemeColors.backgroundColor = `hsl(0, 0%, ${bgLightness}%)`;
        } else {
            // C2: Dark mask on light background
            var maskLightness = Math.floor(Math.random() * 15); // 0-15% (black to dark charcoal)
            var bgLightness = Math.floor(Math.random() * 15 + 85); // 85-100% (white to light gray)
            schemeColors.maskColor = `hsl(0, 0%, ${maskLightness}%)`;
            schemeColors.backgroundColor = `hsl(0, 0%, ${bgLightness}%)`;
        }

        schemeColors.subVariant = subVariant;
    }

    console.log('Scheme colors:', schemeColors);
}

function createContainer() {
    document.body.style.backgroundColor = schemeColors.backgroundColor;
    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';
    
    container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100vw';
    container.style.height = '100vh';
    document.body.appendChild(container);
    
    // Create SVG
    svgContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgContainer.style.width = '100%';
    svgContainer.style.height = '100%';
    svgContainer.style.position = 'absolute';
    container.appendChild(svgContainer);
}

function createMask() {
    maskCounter++;
    var clipId = 'omMaskClip_' + maskCounter;

    // Pick random Om for mask with error checking (or use forced index if set)
    var maskIndex;
    if (forceMaskIndex !== null && forceMaskIndex >= 0 && forceMaskIndex < myFontSet.length) {
        maskIndex = forceMaskIndex;
        console.log('Using forced mask index:', maskIndex);
    } else {
        var attempts = 0;
        do {
            maskIndex = Math.floor(Math.random() * myFontSet.length);
            attempts++;
        } while ((!myFontSet[maskIndex] || !myFontSet[maskIndex][0]) && attempts < 50);
    }

    if (!myFontSet[maskIndex] || !myFontSet[maskIndex][0]) {
        console.error('Failed to find valid mask glyph');
        return;
    }

    var maskCodepoint = myFontSet[maskIndex][0];
    var maskFontList = myFontSet[maskIndex].slice(1);
    var maskFont = maskFontList[Math.floor(Math.random() * maskFontList.length)];
    var maskGlyph = parseCodepoint(maskCodepoint);

    const glyphStyle = glyphStylesLookup[maskIndex];

    let currentMaskSize, currentMaskYPosition, currentMaskXPosition;

    if (!glyphStyle) {
        console.warn(`No specific style found in glyphStylesLookup for maskIndex: ${maskIndex}. Using fallback to a default style.`);
        // Fallback to a sensible default if for some reason a glyph has no style
        // (This should ideally not happen if generateAllGlyphStyles handles all glyphs)
        currentMaskSize = '45vw';
        currentMaskYPosition = '58%';
        currentMaskXPosition = '50%';
    } else {
        console.log(`Style found: ${maskIndex}`);

        currentMaskSize = glyphStyle.maskSize;
        currentMaskYPosition = glyphStyle.maskYPosition;
        currentMaskXPosition = glyphStyle.maskXPosition;
    }

    // Check if this glyph needs rotation
    var needsRotation = (maskCodepoint === 'xE5B' || // Thai Khomut
                         maskCodepoint === 'xA85D;&#xA861;&#xA84F' || // Phags-pa Om
                         maskCodepoint === 'x17DA'); // Khmer Avakrahasanya

    // Mongolian needs opposite rotation (+90 instead of -90)
    var needsRotationReverse = (maskCodepoint === 'x1880;&#x1823' || // Manchu Om
                                maskCodepoint === 'x1880;&#x1823;&#x1838;&#x1820'); // Mongolian Om

    var rotationLabel = needsRotation ? '(rotated -90°)' : (needsRotationReverse ? '(rotated +90°)' : '');
    console.log('Mask glyph:', glyphDescriptions[maskIndex], maskFont, rotationLabel, 'clipId:', clipId,
                'Style:', { size: currentMaskSize, y: currentMaskYPosition, x: currentMaskXPosition });

    // Update description label
    updateDescriptionLabel(maskIndex);

    // Generate CSS classes for mask (same as background glyphs)
    var maskCodepointClass = maskCodepoint.split(';')[0].replace(/^x/, '').toLowerCase();
    maskCodepointClass = 'u' + maskCodepointClass;
    var maskFontClassName = maskFont.toLowerCase().replace(/\s+/g, '-');
    var maskClasses = 'mask-glyph ' + maskCodepointClass + ' ' + maskFontClassName;

    // Calculate center point for rotation in pixels.
    // This assumes currentMaskXPosition and currentMaskYPosition are percentage strings (e.g., "50%", "70%").
    const parsedMaskX = parseFloat(currentMaskXPosition);
    const parsedMaskY = parseFloat(currentMaskYPosition);

    // The rotation center should correspond to the x,y placement of the text element.
    // Given 'text-anchor: middle' and 'dominant-baseline: middle', the 'x' and 'y' attributes
    // already define the visual center of the glyph.
    var centerX = window.innerWidth * (parsedMaskX / 100);
    var centerY = window.innerHeight * (parsedMaskY / 100);

    // Create defs
    var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    svgContainer.appendChild(defs);

    // Create clip path with unique ID
    var clipPath = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
    clipPath.setAttribute('id', clipId);

    var maskText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    maskText.setAttribute('x', currentMaskXPosition); // Use the specific X position for this glyph
    maskText.setAttribute('y', currentMaskYPosition); // Use the specific Y position for this glyph
    maskText.setAttribute('text-anchor', 'middle');
    maskText.setAttribute('dominant-baseline', 'middle');
    maskText.setAttribute('font-size', currentMaskSize); // Use the specific font size for this glyph
    maskText.setAttribute('font-family', maskFont);
    maskText.setAttribute('class', maskClasses); // Apply codepoint and font classes
    // Use inline style with !important to override CSS .mask-glyph.u1880 { transform: none }
    if (needsRotation) {
        maskText.style.setProperty('transform', 'rotate(-90deg)', 'important');
        maskText.style.setProperty('transform-origin', currentMaskXPosition + ' ' + currentMaskYPosition, 'important');
    } else if (needsRotationReverse) {
        // Mongolian needs scale(0.6) to match background glyphs
        maskText.style.setProperty('transform', 'rotate(90deg) scale(0.6)', 'important');
        maskText.style.setProperty('transform-origin', currentMaskXPosition + ' ' + currentMaskYPosition, 'important');
    }
    maskText.innerHTML = maskGlyph;

    clipPath.appendChild(maskText);
    defs.appendChild(clipPath);

    // Update background glyphs to use new clip path
    var backgroundGroup = svgContainer.querySelector('g[clip-path]');
    if (backgroundGroup) {
        backgroundGroup.setAttribute('clip-path', 'url(#' + clipId + ')');
    }

    // Create mask shape (colored) with same rotation
    var maskShape = document.createElementNS("http://www.w3.org/2000/svg", "text");
    maskShape.setAttribute('id', 'maskShape_' + maskCounter);
    maskShape.setAttribute('class', maskClasses); // Apply codepoint and font classes
    maskShape.setAttribute('x', currentMaskXPosition); // Use the specific X position for this glyph
    maskShape.setAttribute('y', currentMaskYPosition); // Use the specific Y position for this glyph
    maskShape.setAttribute('text-anchor', 'middle');
    maskShape.setAttribute('dominant-baseline', 'middle');
    maskShape.setAttribute('font-size', currentMaskSize); // Use the specific font size for this glyph
    maskShape.setAttribute('font-family', maskFont);
    maskShape.setAttribute('fill', schemeColors.maskColor);
    maskShape.setAttribute('opacity', '0'); // Set initial opacity as attribute
    // Use inline style with !important to override CSS
    if (needsRotation) {
        maskShape.style.setProperty('transform', 'rotate(-90deg)', 'important');
        maskShape.style.setProperty('transform-origin', currentMaskXPosition + ' ' + currentMaskYPosition, 'important');
    } else if (needsRotationReverse) {
        // Mongolian needs scale(0.6) to match background glyphs
        maskShape.style.setProperty('transform', 'rotate(90deg) scale(0.6)', 'important');
        maskShape.style.setProperty('transform-origin', currentMaskXPosition + ' ' + currentMaskYPosition, 'important');
    }
    maskShape.innerHTML = maskGlyph;
    svgContainer.appendChild(maskShape);

    // Fade in with delay to ensure it renders
    setTimeout(function() {
        maskShape.style.transition = `opacity ${maskDissolveDuration / 1000}s ease-in-out`;
        maskShape.setAttribute('opacity', '1');
    }, 200);
}

function createBackgroundGlyphs() {
    // Create group with clip - NO ID needed, stays static
    var backgroundGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    backgroundGroup.setAttribute('clip-path', 'url(#omMaskClip_1)'); // Start with first clip
    svgContainer.appendChild(backgroundGroup);
    
    // Calculate grid with separate X and Y spacing
    var glyphSizeVw = parseFloat(backgroundGlyphSize);
    var spacingX = glyphSizeVw * gridSpacingX;
    var spacingY = glyphSizeVw * gridSpacingY;
    var cols = Math.ceil(100 / spacingX);
    var rows = Math.ceil(100 / spacingY);
    var totalPositions = cols * rows;
    
    // Create glyphs - these stay permanent
    for (var i = 0; i < Math.min(backgroundGlyphCount, totalPositions); i++) {
        var row = Math.floor(i / cols);
        var col = i % cols;
        var x = (col * spacingX) + (spacingX / 2);
        var y = (row * spacingY) + (spacingY / 2);
        
        createBackgroundGlyph(backgroundGroup, x, y);
    }
}

function createBackgroundGlyph(parent, x, y) {
    // Pick random Om
    var glyphIndex = Math.floor(Math.random() * myFontSet.length);
    if (!myFontSet[glyphIndex]) return;
    
    var codepoint = myFontSet[glyphIndex][0];
    var fontList = myFontSet[glyphIndex].slice(1);
    var font = fontList[Math.floor(Math.random() * fontList.length)];
    var glyph = parseCodepoint(codepoint);
    
    // Generate color based on scheme
    var color;
    if (currentScheme === 'A') {
        // Random hue, high saturation, vivid
        var hue = Math.floor(Math.random() * 360);
        color = `hsl(${hue}, ${schemeColors.saturation}%, ${schemeColors.brightness}%)`;
    } else if (currentScheme === 'B') {
        // Within narrow hue range
        var hue = schemeColors.baseHue + (Math.random() * schemeColors.hueRange - schemeColors.hueRange / 2);
        color = `hsl(${hue}, ${schemeColors.saturation}%, ${schemeColors.brightness}%)`;
    } else {
        // Scheme C: Grayscale variations
        if (schemeColors.subVariant === 'C1') {
            // C1: White mask on black background - dark glyphs
            var lightness = Math.floor(Math.random() * 30);
            color = `hsl(0, 0%, ${lightness}%)`;
        } else {
            // C2: Black mask on white background - light glyphs
            var lightness = Math.floor(Math.random() * 30 + 70);
            color = `hsl(0, 0%, ${lightness}%)`;
        }
    }
    
// Generate the .u#### class from the codepoint
var codepointClass = codepoint.split(';')[0].replace(/^x/, '').toLowerCase();
codepointClass = 'u' + codepointClass;

var fontClassName = font.toLowerCase().replace(/\s+/g, '-');

console.log('Codepoint:', codepoint, '-> Class:', codepointClass);

var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
text.setAttribute('x', x + '%');
text.setAttribute('y', y + '%');
text.setAttribute('text-anchor', 'middle');
text.setAttribute('dominant-baseline', 'middle');
text.setAttribute('font-size', backgroundGlyphSize);
text.setAttribute('font-family', font);
text.setAttribute('fill', color);
text.setAttribute('class', 'bg-glyph ' + codepointClass + ' ' + fontClassName);
text.innerHTML = glyph;

console.log('Applied classes:', text.getAttribute('class'));

parent.appendChild(text);
    
    // Start color animation
    if (currentScheme === 'A') {
        animateGlyphColorA(text);
    } else if (currentScheme === 'B') {
        animateGlyphColorB(text);
    } else {
        animateGlyphColorC(text);
    }
}

function animateGlyphColorA(element) {
    // Scheme A: Cycle through all hues
    // Sometimes sync, sometimes independent
    var isSynced = Math.random() < 0.3; // 30% chance of sync
    var delay = isSynced ? 0 : Math.random() * glyphColorChangeDuration;
    
    setTimeout(function() {
        setInterval(function() {
            var hue = Math.floor(Math.random() * 360);
            var color = `hsl(${hue}, ${schemeColors.saturation}%, ${schemeColors.brightness}%)`;
            element.setAttribute('fill', color);
        }, glyphColorChangeDuration);
    }, delay);
}

function animateGlyphColorB(element) {
    // Scheme B: Stay within narrow hue range, change frequently
    setInterval(function() {
        var hue = schemeColors.baseHue + (Math.random() * schemeColors.hueRange - schemeColors.hueRange / 2);
        var color = `hsl(${hue}, ${schemeColors.saturation}%, ${schemeColors.brightness}%)`;
        element.setAttribute('fill', color);
    }, glyphColorChangeDuration / 2); // More frequent changes
}

function animateGlyphColorC(element) {
    // Scheme C: Grayscale twinkle
    setInterval(function() {
        if (schemeColors.subVariant === 'C1') {
            // C1: Dark grays (0-30% lightness)
            var lightness = Math.floor(Math.random() * 30);
            element.setAttribute('fill', `hsl(0, 0%, ${lightness}%)`);
        } else {
            // C2: Light grays (70-100% lightness)
            var lightness = Math.floor(Math.random() * 30 + 70);
            element.setAttribute('fill', `hsl(0, 0%, ${lightness}%)`);
        }
    }, glyphColorChangeDuration);
}

function startMaskDissolve() {
    setInterval(function() {
        var oldMask = document.getElementById('maskShape');
        var oldDefs = svgContainer.querySelector('defs');
        
        // Fade out old mask ONLY (not background glyphs)
        if (oldMask) {
            oldMask.style.transition = `opacity ${maskDissolveDuration / 1000}s ease-in-out`;
            oldMask.style.opacity = '0';
            
            // After fade out, remove old mask and defs, create new
            setTimeout(function() {
                oldMask.remove();
                if (oldDefs) oldDefs.remove();
                
                // Create new mask (with new clip path)
                createMask();
            }, maskDissolveDuration);
        }
        
    }, maskDissolveDuration * 3); // Change every 15 seconds (5s fade out + 5s fade in + 5s display)
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

// Contrast helper functions
function colorToRgb(color) {
    if (color.startsWith('hsl')) {
        return hslToRgb(color);
    }
    return null;
}

function hslToRgb(hslString) {
    var match = hslString.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%/);
    if (!match) return null;

    var h = parseInt(match[1]) / 360;
    var s = parseInt(match[2]) / 100;
    var l = parseInt(match[3]) / 100;

    var r, g, b;
    if (s === 0) {
        r = g = b = l;
    } else {
        var hue2rgb = function(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function getLuminance(rgb) {
    var vals = [rgb.r, rgb.g, rgb.b].map(function(val) {
        val = val / 255;
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * vals[0] + 0.7152 * vals[1] + 0.0722 * vals[2];
}

function getContrastingTextColor(backgroundColor) {
    var rgb = colorToRgb(backgroundColor);
    if (!rgb) return '#FFFFFF';

    var luminance = getLuminance(rgb);
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

function createDescriptionLabel() {
    descriptionLabel = document.createElement('div');
    descriptionLabel.id = 'glyphDescription';
    descriptionLabel.style.position = 'fixed';
    descriptionLabel.style.bottom = '2vw';
    descriptionLabel.style.right = '2vw';
    descriptionLabel.style.fontFamily = '"Noto Sans Mono", monospace';
    descriptionLabel.style.fontSize = '1.5vw';
    descriptionLabel.style.padding = '0.5vw';
    descriptionLabel.style.zIndex = '1000';
    descriptionLabel.style.transition = 'color 0.5s ease';
    descriptionLabel.style.textAlign = 'right';
    document.body.appendChild(descriptionLabel);
}

function updateDescriptionLabel(maskIndex) {
    if (!descriptionLabel) {
        createDescriptionLabel();
    }

    descriptionLabel.textContent = glyphDescriptions[maskIndex] || 'Unknown Om';

    // Choose color based on scheme
    if (currentScheme === 'A') {
        // Scheme A: Use contrasting color (white on dark background)
        descriptionLabel.style.color = getContrastingTextColor(schemeColors.backgroundColor);
    } else if (currentScheme === 'B') {
        // Scheme B: Use a color from the narrow hue range
        var hue = schemeColors.baseHue + (Math.random() * schemeColors.hueRange - schemeColors.hueRange / 2);
        descriptionLabel.style.color = `hsl(${hue}, ${schemeColors.saturation}%, ${schemeColors.brightness}%)`;
    } else {
        // Scheme C: Use contrasting color
        descriptionLabel.style.color = getContrastingTextColor(schemeColors.backgroundColor);
    }
}

console.log('om_mask_dissolve.js loaded');
jsWait();