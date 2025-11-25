divCounter=4;
var mycolors=[];
var mycolors2=[];

var scriptCSS = document.createElement('script');
scriptCSS.src = "../js_layout/standardQuad.js";
document.getElementsByTagName('body')[0].appendChild(scriptCSS);

function jsWait() {
    if (typeof signalArray == "undefined" || typeof utfArraySignal == "undefined") {
        window.setTimeout(jsWait, 100);
    } else {
        initDiv();
        initStyle();
        initDisplayState();
        changeHtmlDisplay();
        changeHtmlDisplay();
        changeColor();
        changeColor();
    }
}

function initDiv() {
    container = [];
    
    dropShadowCountB = Math.round(Math.random() * (divCounter - 1) + 1);
    dropShadowCountH = Math.round(Math.random() * (divCounter - 1) + 1);
    dropShadowCountV = Math.round(Math.random() * (divCounter - 1) + 1);
    inHtmlCount = Math.round(Math.random() * (divCounter - 1) + 1);
    
    for (i = 1; i <= divCounter; i++) {
        container[i] = document.createElement("div");
        document.body.appendChild(container[i]);
        elementName = 'myid' + i;
        container[i].id = elementName;
    }
}

function initStyle() {
    bgColChangeRate = 100000;
    animationPlayState = 100000;
    
    var colNum = 30;
    
    function setColor(hue, sat, light, opa) {
        for (colorCounter = 1; colorCounter <= colNum; colorCounter++) {
            var toSpliceColor = 'hsla(' +
                Math.round(hue) + ',' +
                Math.round(Math.random() * sat + 1) + '%,' +
                Math.round(Math.random() * 10 + light) + '%,' +
                (Math.random(opa) + .7) +
                ')';
            mycolors.splice(1, 0, toSpliceColor);
        }
    }
    
    setColor(Math.round(Math.random() * 360), Math.round(Math.random() * 800), Math.round(Math.random() * 70 + 10), 1);
    setColor(Math.round(Math.random() * 360), Math.round(Math.random() * 100), Math.round(Math.random() * 50 + 10), 1);
    
    var mycolors2 = [];
    var colNum = 50
    
    function setColor2(hue, sat, light, opa) {
        for (colorCounter = 1; colorCounter <= colNum; colorCounter++) {
            var toSpliceColor = 'hsla(' +
                Math.round(hue + Math.random() * 40 - 20) + ',' +
                Math.round(Math.random() * sat + 1) + '%,' +
                Math.round(Math.random() * 10 + light) + '%,' +
                (Math.random(opa) + .1) +
                ')';
            mycolors2.push(toSpliceColor);
        }
    }
    
    setColor2(Math.round(Math.random() * 360), Math.round(Math.random() * 800), Math.round(Math.random() * 100), 1);
    
    for (i = 1; i <= divCounter; i++) {
        container[i].style.backgroundColor = mycolors2[Math.round((mycolors2.length - 1) * Math.random())];
        container[i].style.textShadow = Math.round(Math.random() * -5 - 2) + 'px ' +
            Math.round(Math.random() * 5 + 2) + 'px ' +
            mycolors[Math.round((mycolors.length - 1) * Math.random())];
        container[i].style.webkitTextFillColor = mycolors2[Math.round((mycolors.length - 1) * Math.random())];
        container[i].style.webkitTextStrokeWidth = Math.random() * 1 + 1 + "px";
        container[i].style.webkitTextStrokeColor = mycolors[Math.round((mycolors.length - 1) * Math.random())];
    }
}

function initDisplayState() {
    originalViewState = "display";
    changeViewState = "noDisplay";
    
    for (i = 1; i <= divCounter; i++) {
        for (sp = 1; sp <= 20; sp++) {
            var result = getGlyph();
            span_sp = document.createElement("span");
            container[i].appendChild(span_sp);
            span_sp.id = 'span' + i + '_' + sp;
            span_sp.style.fontFamily = result.fontFamily;
            span_sp.innerHTML = result.glyphString;
            span_sp.className = "font-effect-canvas-effect";
            
            // Extract all hex codes and join with space or comma
            var hexCodes = result.glyphString.match(/[0-9A-F]{4,5}/gi);
            span_sp.title = hexCodes ? hexCodes.join(' + ') : '';
        }
        
        container[i].dataset.fonts = result.fontFamily;
        container[i].className = originalViewState;
    }
}

function changeHtmlDisplay() {
    window.setInterval(function() {
        var rndContainer = Math.round(Math.random() * (divCounter - 1) + 1);
        var containerFonts = [];
        
        for (rndSp = 1; rndSp <= 20; rndSp++) {
            var result = getGlyph();
            span_rnd = 'span' + rndContainer + '_' + rndSp;
            span_rnd_id = document.getElementById(span_rnd);
            span_rnd_id.style.fontFamily = result.fontFamily;
            span_rnd_id.innerHTML = result.glyphString;
            
            // Extract all hex codes and join with space or comma
            var hexCodes = result.glyphString.match(/[0-9A-F]{4,5}/gi);
            span_rnd_id.title = hexCodes ? hexCodes.join(' + ') : '';
            
            if (containerFonts.indexOf(result.fontFamily) === -1) {
                containerFonts.push(result.fontFamily);
            }
        }
        
        container[rndContainer].dataset.fonts = containerFonts.join(', ');
    }, Math.random() * 5000 + 5000);
}

function changeHtmlDisplayInline() {
    var rndContainer = Math.round(Math.random() * (divCounter - 1) + 1);
    var containerFonts = [];
    
    for (rndSp = 1; rndSp <= 20; rndSp++) {
        var result = getGlyph();
        span_rnd = 'span' + rndContainer + '_' + rndSp;
        span_rnd_id = document.getElementById(span_rnd);
        span_rnd_id.style.fontFamily = result.fontFamily;
        span_rnd_id.innerHTML = result.glyphString;
        
        // Extract all hex codes and join with space or comma
        var hexCodes = result.glyphString.match(/[0-9A-F]{4,5}/gi);
        span_rnd_id.title = hexCodes ? hexCodes.join(' + ') : '';
        
        if (containerFonts.indexOf(result.fontFamily) === -1) {
            containerFonts.push(result.fontFamily);
        }
    }
    
    container[rndContainer].dataset.fonts = containerFonts.join(', ');
}

function changeColor() {
    bg_color_chg = Math.random() * bgColChangeRate + 5000;
    
    window.setInterval(function() {
        bg_color = mycolors2[Math.round((mycolors2.length - 1) * Math.random())];
        rndDiv = Math.round(Math.random() * (divCounter - 1) + 1);
        rndDiv2 = Math.round(Math.random() * (divCounter - 1) + 1);
        container[rndDiv].style.backgroundColor = bg_color;
        container[rndDiv2].style.color = bg_color;
    }, bg_color_chg);
}

jsWait();