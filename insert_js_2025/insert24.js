// Configuration
var backgroundGlyphSize = '1.5vw'; // <<< Keep this as a string for direct CSS application >>>
var backgroundGlyphCount = 2000;
var gridSpacingX = 1.65;
var gridSpacingY = 2.1;
var maskDissolveDuration = 5000; // milliseconds for fade-out/fade-in
var glyphColorChangeDuration = 3000; // how often background glyphs change color

const sandwichLayers = 3; // Number of pre-created mask pairs

var container;
var svgContainer;
var currentTheme;
var schemeColors = {};

let glyphStylesLookup;
var backgroundGlyphGroups = [];
var maskShapes = [];
var clipPaths = [];

var currentActiveLayerIndex = 0;
var transitionTimeoutId = null;

function jsWait() {
    if (typeof whirldArraySignal === "undefined" ||
        typeof myFontSet === "undefined" ||
        typeof glyphDescriptions === "undefined" ||
        typeof defaultMaskStyle === "undefined" ||
        typeof outlierDefinitions === "undefined"
    ) {
        window.setTimeout(jsWait, 100);
    } else {
        glyphStylesLookup = generateAllGlyphStyles(defaultMaskStyle, outlierDefinitions, myFontSet);
        init();
    }
}

function init() {
    currentTheme = Math.random() < 0.5 ? 'A' : 'B';
    console.log('Selected Theme:', currentTheme);
    generateThemeColors();
    createContainer();
    
    createAllSandwichLayers();
    
    // Initial visibility setup: Make the first mask and its background group visible
    maskShapes[currentActiveLayerIndex].style.setProperty('opacity', '1');
    backgroundGlyphGroups[currentActiveLayerIndex].style.setProperty('opacity', '1');
    
    // Start the transition chain after an initial display duration for the first layer
    transitionTimeoutId = setTimeout(scheduleNextTransition, maskDissolveDuration * 2); 
    console.log(`Initial Layer ${currentActiveLayerIndex} visible. Next transition scheduled in ${maskDissolveDuration * 2}ms.`);
}

function generateThemeColors() {
    if (currentTheme === 'A') {
        var maskHue = Math.floor(Math.random() * 360);
        schemeColors.maskColor = `hsl(${maskHue}, 80%, 30%)`; // Darker mask color
        schemeColors.backgroundColor = `hsl(${maskHue}, 80%, 90%)`; // Lighter background
        schemeColors.brightness = 55;
        schemeColors.saturation = 95;
        schemeColors.maskFillOpacity = 0.2; // Adjust between 0 and 1
    } else {
        var grayValue = Math.floor(Math.random() * 30 + 70);
        schemeColors.maskColor = `hsl(0, 0%, ${grayValue}%)`; // Light grey mask color
        schemeColors.backgroundColor = `hsl(0, 0%, ${grayValue - 10}%)`; // Slightly darker background
        
        var baseHue = Math.floor(Math.random() * 360);
        schemeColors.baseHue = baseHue;
        schemeColors.hueRange = 40;
        schemeColors.saturation = 80;
        schemeColors.brightness = 40;
        schemeColors.maskFillOpacity = 0.3; // Adjust between 0 and 1
    }
    document.body.style.setProperty('background-color', schemeColors.backgroundColor);
    console.log('Scheme colors:', schemeColors);
}

function createContainer() {
    document.body.style.setProperty('margin', '0');
    document.body.style.setProperty('overflow', 'hidden');
    
    container = document.createElement('div');
    container.style.setProperty('position', 'fixed');
    container.style.setProperty('top', '0');
    container.style.setProperty('left', '0');
    container.style.setProperty('width', '100vw');
    container.style.setProperty('height', '100vh');
    container.style.setProperty('display', 'block');
    document.body.appendChild(container);

    svgContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgContainer.style.setProperty('width', '100%');
    svgContainer.style.setProperty('height', '100%');
    svgContainer.style.setProperty('position', 'absolute');
    // <<< Essential for consistent unit interpretation in x, y, font-size (as numbers) >>>
    svgContainer.setAttribute('viewBox', '0 0 100 100'); 
    container.appendChild(svgContainer);

    let defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    svgContainer.appendChild(defs);
}

function createAllSandwichLayers() {
    for (let i = 0; i < sandwichLayers; i++) {
        createSandwichLayer(i);
    }
}

function createSandwichLayer(layerIndex) {
    const clipPathId = `omMaskClip_${layerIndex}`;
    const maskShapeId = `maskShape_${layerIndex}`;

    // --- 1. Populate Mask Content ---
    var maskIndex, attempts = 0;
    let maskCodepoint, maskFont;
    let actualGlyphDescription = "Unknown Glyph";

    do {
         maskIndex = Math.floor(Math.random() * myFontSet.length);
         attempts++;
    } while ( (attempts < 50) && (!myFontSet[maskIndex] || !myFontSet[maskIndex][0] || typeof glyphDescriptions[maskIndex] === 'undefined' ));

    if (!myFontSet[maskIndex] || !myFontSet[maskIndex][0] || typeof glyphDescriptions[maskIndex] === 'undefined') {
        console.error(`Failed to find valid mask glyph for layer ${layerIndex} after ${attempts} attempts. Using fallback to default square.`);
        maskIndex = Array.isArray(myFontSet) && myFontSet.findIndex(entry => entry && entry[0] === 'x25A1') !== -1 ? myFontSet.findIndex(entry => entry && entry[0] === 'x25A1') : 0;
        if (!myFontSet[maskIndex] || !myFontSet[maskIndex][0]) myFontSet[maskIndex] = ['x25A1', 'Arial']; // Ensure valid fallback
        actualGlyphDescription = "Fallback Square";
    } else {
        actualGlyphDescription = glyphDescriptions[maskIndex];
    }
    
    maskCodepoint = myFontSet[maskIndex][0];
    var maskFontList = myFontSet[maskIndex].slice(1);
    maskFont = maskFontList[Math.floor(Math.random() * maskFontList.length)];
    var maskGlyphContent = parseCodepoint(maskCodepoint);

    const glyphStyle = glyphStylesLookup[maskCodepoint]; 
    
    let maskFontSizeStr; // e.g., '45vw'
    let maskXPosPcStr; // e.g., '50%'
    let maskYPosPcStr; // e.g., '58%'

    if (!glyphStyle) {
        console.warn(`No specific style found for mask glyph ${maskCodepoint} in layer ${layerIndex}. Using default (45vw).`);
        maskFontSizeStr = '45vw';
        maskYPosPcStr = '58%';
        maskXPosPcStr = '50%';
    } else {
        maskFontSizeStr = glyphStyle.maskSize;
        maskYPosPcStr = glyphStyle.maskYPosition;
        maskXPosPcStr = glyphStyle.maskXPosition;
    }
    console.log(`Layer ${layerIndex} - maskCodepoint: ${maskCodepoint}, Font: ${maskFont}, Size: ${maskFontSizeStr}, Desc: ${actualGlyphDescription}`);

    // Parse percentage position strings to unitless numbers (0-100) for viewBox x/y attributes
    const xPosNum = parseFloat(maskXPosPcStr); // e.g., '50%' -> 50
    const yPosNum = parseFloat(maskYPosPcStr); // e.g., '58%' -> 58


    var needsRotation = (maskCodepoint === 'xE5B' || maskCodepoint === 'xA85D;&#xA861;&#xA84F' || maskCodepoint === 'x17DA');
    
    // --- 2. Create ClipPath ---
    const defs = svgContainer.querySelector('defs');
    const clipPath = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
    clipPath.setAttribute('id', clipPathId);
    
    clipPaths[layerIndex] = clipPath; // Store reference
    
    const maskTextClip = document.createElementNS("http://www.w3.org/2000/svg", "text");
    maskTextClip.setAttribute('x', xPosNum); // <<< Units are numbers for viewBox >>>
    maskTextClip.setAttribute('y', yPosNum); // <<< Units are numbers for viewBox >>>
    maskTextClip.setAttribute('text-anchor', 'middle');
    maskTextClip.setAttribute('dominant-baseline', 'middle');
    // <<< Font size remains 'vw' string for direct CSS interpretation >>>
    maskTextClip.setAttribute('font-size', maskFontSizeStr); 
    maskTextClip.setAttribute('font-family', maskFont);
    maskTextClip.innerHTML = maskGlyphContent;
    if (needsRotation) {
        maskTextClip.setAttribute('transform', `rotate(-90)`); // Rotates around text's own center
    }
    
    clipPath.appendChild(maskTextClip);
    defs.appendChild(clipPath);

    // --- 3. Create Background Glyph Grid ---
    const backgroundGroup = createBackgroundGlyphGrid(layerIndex, clipPathId, maskFont);
    backgroundGlyphGroups[layerIndex] = backgroundGroup; // Store reference
    backgroundGroup.style.setProperty('opacity', '0'); // All background groups initially transparent
    backgroundGroup.style.setProperty('transition', `opacity ${maskDissolveDuration / 1000}s ease-in-out`);
    svgContainer.appendChild(backgroundGroup);

    // --- 4. Create Visible Mask Shape (FILLED & TRANSLUCENT) ---
    const maskShape = document.createElementNS("http://www.w3.org/2000/svg", "text");
    maskShape.setAttribute('id', maskShapeId);
    maskShape.setAttribute('class', 'maskShape');
    maskShape.setAttribute('x', xPosNum); // <<< Units are numbers for viewBox >>>
    maskShape.setAttribute('y', yPosNum); // <<< Units are numbers for viewBox >>>
    maskShape.setAttribute('text-anchor', 'middle');
    maskShape.setAttribute('dominant-baseline', 'middle');
    maskShape.setAttribute('font-size', maskFontSizeStr); // <<< FIX: Use original vw string >>>
    maskShape.setAttribute('font-family', maskFont);
    
    // <<< FIX for "Film" Effect: Use fill with fill-opacity >>>
    maskShape.setAttribute('fill', schemeColors.maskColor);
    maskShape.setAttribute('fill-opacity', schemeColors.maskFillOpacity); 
    
    maskShape.innerHTML = maskGlyphContent;
    if (needsRotation) {
        maskShape.setAttribute('transform', `rotate(-90)`);
    }
    maskShape.style.setProperty('opacity', '0'); // All masks initially transparent
    maskShape.style.setProperty('transition', `opacity ${maskDissolveDuration / 1000}s ease-in-out`);
    
    maskShapes[layerIndex] = maskShape; // Store reference
    svgContainer.appendChild(maskShape);

    console.log(`Layer ${layerIndex} created. Mask: ${maskShapeId}, ClipPath: ${clipPathId}.`);
}


function createBackgroundGlyphGrid(layerIndex, clipPathId, maskFont) {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute('clip-path', `url(#${clipPathId})`); // <<< This is where clipping is applied >>>
    
    var backgroundGlyphSizeNum = parseFloat(backgroundGlyphSize); // <<< Parse vw string to number for calculation >>>
    var spacingX = backgroundGlyphSizeNum * gridSpacingX; 
    var spacingY = backgroundGlyphSizeNum * gridSpacingY; 
    
    var cols = Math.ceil(100 / spacingX); // Calculated based on viewBox width (100 units)
    var rows = Math.ceil(100 / spacingY); // Calculated based on viewBox height (100 units)
    const actualBackgroundGlyphCount = Math.min(backgroundGlyphCount, cols * rows); 

    for (var i = 0; i < actualBackgroundGlyphCount; i++) {
        var row = Math.floor(i / cols);
        var col = i % cols;
        var xCoord = (col * spacingX) + (spacingX / 2);
        var yCoord = (row * spacingY) + (spacingY / 2); 
        
        createBackgroundGlyph(group, xCoord, yCoord, maskFont);
    }
    return group;
}


function createBackgroundGlyph(parent, x, y, baseFont = null) {
    var glyphIndex = Math.floor(Math.random() * myFontSet.length);
    if (!myFontSet[glyphIndex] || !myFontSet[glyphIndex][0]) {
        console.warn('Skipping background glyph creation due to invalid myFontSet entry at index', glyphIndex);
        return;
    }
    
    var codepoint = myFontSet[glyphIndex][0];
    var fontList = myFontSet[glyphIndex].slice(1);
    var font = baseFont && Math.random() < 0.5 ? baseFont : fontList[Math.floor(Math.random() * fontList.length)];
    var glyphContent = parseCodepoint(codepoint);
    
    var color;
    if (currentTheme === 'A') {
        var hue = Math.floor(Math.random() * 360);
        color = `hsl(${hue}, 80%, 30%)`; // Ensure good contrast with mask and background
    } else {
        var hue = schemeColors.baseHue + (Math.random() * schemeColors.hueRange - schemeColors.hueRange / 2);
        color = `hsl(${hue}, ${schemeColors.saturation}%, ${schemeColors.brightness}%)`;
    }
    
    var text = document.createElementNS("http://www.w3.org/2000/svg", "text"); // <<< FIX: Correct createElementNS >>>
    
    // <<< FIX: x and y now unitless numbers, relative to viewBox >>>
    text.setAttribute('x', x); 
    text.setAttribute('y', y);
    
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');

    // <<< FIX: Use backgroundGlyphSize string (e.g., '1.5vw') directly >>>
    text.setAttribute('font-size', backgroundGlyphSize); 
    text.setAttribute('font-family', font);
    text.setAttribute('fill', color);
    text.setAttribute('class', 'bg-glyph');
    text.innerHTML = glyphContent;
    
    parent.appendChild(text);
    
    // Reintegrate color animation for background glyphs
    if (currentTheme === 'A') {
        animateGlyphColorA(text);
    } else {
        animateGlyphColorB(text);
    }
}

function animateGlyphColorA(element) {
    var isSynced = Math.random() < 0.3;
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
    setInterval(function() {
        var hue = schemeColors.baseHue + (Math.random() * schemeColors.hueRange - schemeColors.hueRange / 2);
        var color = `hsl(${hue}, ${schemeColors.saturation}%, ${schemeColors.brightness}%)`;
            element.setAttribute('fill', color);
        }, glyphColorChangeDuration / 2);
}

function scheduleNextTransition() {
    if (transitionTimeoutId !== null) {
        clearTimeout(transitionTimeoutId);
        transitionTimeoutId = null;
    }

    const prevLayerIndex = currentActiveLayerIndex;
    currentActiveLayerIndex = (currentActiveLayerIndex + 1) % sandwichLayers;

    const prevMaskShape = maskShapes[prevLayerIndex];
    const prevBackgroundGroup = backgroundGlyphGroups[prevLayerIndex];
    const nextMaskShape = maskShapes[currentActiveLayerIndex];
    const nextBackgroundGroup = backgroundGlyphGroups[currentActiveLayerIndex];

    // PHASE 1: Start fading OUT the PREVIOUS layer
    prevMaskShape.style.setProperty('opacity', '0');
    prevBackgroundGroup.style.setProperty('opacity', '0');

    console.log(`Starting fade-out for Layer ${prevLayerIndex}.`);

    // PHASE 2 & 3: After fade-out, fade IN the NEXT layer
    transitionTimeoutId = setTimeout(() => {
        // Ensure prev layer is fully transparent (important for recycling)
        prevMaskShape.style.setProperty('opacity', '0'); 
        prevBackgroundGroup.style.setProperty('opacity', '0'); 

        // CRITICAL RECYLING STEP: Set the NEXT layer's opacity to 0 to prepare for fade-in.
        nextMaskShape.style.setProperty('opacity', '0');
        nextBackgroundGroup.style.setProperty('opacity', '0');

        // Now, trigger the fade-in for the NEXT layer
        nextMaskShape.style.setProperty('opacity', '1');
        nextBackgroundGroup.style.setProperty('opacity', '1');

        console.log(`Starting fade-in for Layer ${currentActiveLayerIndex}.`);
        
        // Schedule the next transition after the 'next' layer has fully faded in and displayed.
        transitionTimeoutId = setTimeout(scheduleNextTransition, maskDissolveDuration); 

    }, maskDissolveDuration); // This setTimeout duration matches the fade-out duration.
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

console.log('om_mask_dissolve.js loaded');
jsWait();