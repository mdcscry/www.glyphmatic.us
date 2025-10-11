console.log('INSERT13 TOP');

// insert13.js - Braided Marquee
var divCounter = 0; // Compatibility with nav
var GRID_SIZE = Math.floor(Math.random() * 10) + 15;
var STRIP_SIZE = 100 / GRID_SIZE;
var BASE_SPEED = 0.01 + Math.random() * 0.02;
var FONT_SIZE = Math.floor(Math.random() * 3) + 2;

var mycolors = [];
var mycolors2 = [];
var hStrips = [];
var vStrips = [];
var selectedPattern;

// Z-patterns
var zPatterns = [
    {
        name: 'vertical_on_top_evens',
        h: function(i) { return i % 2 === 0 ? 2 : 1; },
        v: function(i) { return i % 2 === 0 ? 1 : 2; }
    },
    {
        name: 'horizontal_on_top_evens',
        h: function(i) { return i % 2 === 0 ? 1 : 2; },
        v: function(i) { return i % 2 === 0 ? 2 : 1; }
    },
    {
        name: 'peak_middle',
        h: function(i) { return i < GRID_SIZE/2 ? i * 2 : (GRID_SIZE - i) * 2; },
        v: function(i) { return i < GRID_SIZE/2 ? i * 2 + 1 : (GRID_SIZE - i) * 2 + 1; }
    },
    {
        name: 'palindromic_3',
        h: function(i) { return [1, 2, 3, 2][i % 4]; },
        v: function(i) { return [2, 3, 1, 3][i % 4]; }
    },
    {
        name: 'diagonal_cascade',
        h: function(i) { return (i * 2) % 5 + 1; },
        v: function(i) { return (i * 2 + 1) % 5 + 1; }
    }
];

function jsWait() {
    if (typeof whirldArraySignal == "undefined" || 
        typeof msucdArraySignal == "undefined") {
        window.setTimeout(jsWait, 100);
    } else {
        console.log('SIGNALS READY, STARTING INSERT13');
        selectedPattern = zPatterns[Math.floor(Math.random() * zPatterns.length)];
        initStyle();
        initBraid();
        startAnimation();
    }
}

function initStyle() {
    mycolors = [];
    mycolors2 = [];
    
    var vibrantHues = [330, 270, 60, 210, 30, 150, 0, 120];
    for (var i = 0; i < 8; i++) {
        var hue = vibrantHues[i];
        var sat = 70 + Math.random() * 30;
        var lightBg = 30 + Math.random() * 20;
        var lightFg = 60 + Math.random() * 20;
        mycolors.push('hsl(' + hue + ',' + sat + '%,' + lightFg + '%)');
        mycolors2.push('hsl(' + hue + ',' + sat + '%,' + lightBg + '%)');
    }
    
    var bgHue = Math.random() * 360;
    var bgSat = Math.random() * 30;
    var bgLight = Math.random() * 15;
    document.body.style.backgroundColor = 'hsl(' + bgHue + ',' + bgSat + '%,' + bgLight + '%)';
}

function getRandomGlyph() {
    var glyphIndex = Math.floor(Math.random() * myFontSet.length);
    if (!myFontSet[glyphIndex]) {
        glyphIndex = Math.floor(Math.random() * myFontSet.length);
    }
    
    var codepoint = myFontSet[glyphIndex][0];
    var fontList = myFontSet[glyphIndex].slice(1);
    var randomFont = fontList[Math.floor(Math.random() * fontList.length)];
    
    return {
        char: parseCodepoint(codepoint),
        font: randomFont
    };
}

function parseCodepoint(cp) {
    if (cp.indexOf(';') > -1) {
        var parts = cp.split(';');
        var output = '&#' + parts[0] + ';';
        for (var i = 1; i < parts.length; i++) {
            if (parts[i]) output += parts[i] + ';';
        }
        return output;
    } else if (cp.charAt(0) === 'x') {
        return '&#' + cp + ';';
    } else {
        return '&#' + cp + ';';
    }
}

function initBraid() {
    // Clear body but keep nav elements
    console.log('initBraid START');
    console.log('GRID_SIZE:', GRID_SIZE);
    var navElements = ['spanNavColor', 'spanNavHTML', 'spanNavSizeDown', 'spanNavSizeUp'];
    var savedNavs = {};
    navElements.forEach(function(id) {
        var el = document.getElementById(id);
        if (el) savedNavs[id] = el;
    });
    
    // Also save glyphmatic divs
    var glyphDivs = [];
    for (var i = 1; i <= 8; i++) {
        var el = document.getElementById('glyphmatic' + i);
        if (el) glyphDivs.push(el);
    }
    
    document.body.innerHTML = '';
    
    // Restore nav
    Object.keys(savedNavs).forEach(function(id) {
        document.body.appendChild(savedNavs[id]);
    });
    glyphDivs.forEach(function(el) {
        document.body.appendChild(el);
    });
    
    // Create horizontal strips
    for (var row = 0; row < GRID_SIZE; row++) {
        var strip = document.createElement('div');
        strip.style.position = 'absolute';
        strip.style.display = 'flex';
        strip.style.flexDirection = 'row';
        strip.style.height = STRIP_SIZE + 'vh';
        strip.style.top = (row * STRIP_SIZE) + 'vh';
        strip.style.left = '0';
        strip.style.zIndex = selectedPattern.h(row);
        
        var colorIdx = Math.floor(Math.random() * mycolors.length);
        
        var glyphCount = GRID_SIZE + 10;
        for (var col = 0; col < glyphCount; col++) {
            var cell = document.createElement('div');
            cell.style.flexShrink = '0';
            cell.style.width = STRIP_SIZE + 'vw';
            cell.style.height = STRIP_SIZE + 'vh';
            cell.style.display = 'flex';
            cell.style.alignItems = 'center';
            cell.style.justifyContent = 'center';
            cell.style.fontSize = FONT_SIZE + 'vmin';
            cell.style.backgroundColor = mycolors2[colorIdx];
            cell.style.color = mycolors[colorIdx];
            
            var glyph = getRandomGlyph();
            cell.style.fontFamily = glyph.font;
            cell.style.fontVariantEmoji = 'text';
            cell.innerHTML = glyph.char;
            
            strip.appendChild(cell);
        }
        
        document.body.appendChild(strip);
        hStrips.push(strip);
    }
    
    // Create vertical strips
    for (var col = 0; col < GRID_SIZE; col++) {
        var strip = document.createElement('div');
        strip.style.position = 'absolute';
        strip.style.display = 'flex';
        strip.style.flexDirection = 'column';
        strip.style.width = STRIP_SIZE + 'vw';
        strip.style.left = (col * STRIP_SIZE) + 'vw';
        strip.style.top = '0';
        strip.style.zIndex = selectedPattern.v(col);
        
        var colorIdx = Math.floor(Math.random() * mycolors.length);
        
        var glyphCount = GRID_SIZE + 10;
        for (var row = 0; row < glyphCount; row++) {
            var cell = document.createElement('div');
            cell.style.flexShrink = '0';
            cell.style.width = STRIP_SIZE + 'vw';
            cell.style.height = STRIP_SIZE + 'vh';
            cell.style.display = 'flex';
            cell.style.alignItems = 'center';
            cell.style.justifyContent = 'center';
            cell.style.fontSize = FONT_SIZE + 'vmin';
            cell.style.backgroundColor = mycolors2[colorIdx];
            cell.style.color = mycolors[colorIdx];
            
            var glyph = getRandomGlyph();
            cell.style.fontFamily = glyph.font;
            cell.style.fontVariantEmoji = 'text';
            cell.innerHTML = glyph.char;
            
            strip.appendChild(cell);
        }
        
        document.body.appendChild(strip);
        vStrips.push(strip);
    }
    console.log('initBraid COMPLETE, total strips:', hStrips.length);
}

function startAnimation() {
    hStrips.forEach(function(strip) {
        animateHorizontal(strip);
    });
    
    vStrips.forEach(function(strip) {
        animateVertical(strip);
    });
}

function animateHorizontal(strip) {
    var offset = -STRIP_SIZE;
    var speed = BASE_SPEED * (0.8 + Math.random() * 0.4);
    
    function step() {
        offset += speed;
        
        if (offset >= 0) {
            offset = -STRIP_SIZE;
            var lastCell = strip.children[strip.children.length - 1];
            var glyph = getRandomGlyph();
            lastCell.style.fontFamily = glyph.font;
            lastCell.innerHTML = glyph.char;
            strip.insertBefore(lastCell, strip.children[0]);
        }
        
        strip.style.transform = 'translateX(' + offset + 'vw)';
        requestAnimationFrame(step);
    }
    
    step();
}

function animateVertical(strip) {
    var offset = -STRIP_SIZE;
    var speed = BASE_SPEED * (0.8 + Math.random() * 0.4);
    
    function step() {
        offset += speed;
        
        if (offset >= 0) {
            offset = -STRIP_SIZE;
            var lastCell = strip.children[strip.children.length - 1];
            var glyph = getRandomGlyph();
            lastCell.style.fontFamily = glyph.font;
            lastCell.innerHTML = glyph.char;
            strip.insertBefore(lastCell, strip.children[0]);
        }
        
        strip.style.transform = 'translateY(' + offset + 'vh)';
        requestAnimationFrame(step);
    }
    
    step();
}

// Nav button compatibility
function changeHtmlDisplayInline() {
    // Regenerate with new pattern
    hStrips = [];
    vStrips = [];
    selectedPattern = zPatterns[Math.floor(Math.random() * zPatterns.length)];
    initBraid();
    startAnimation();

}

console.log('insert13.js loaded');
jsWait();