divCounter=8;
//even only for crossfader

var scriptCSS = document.createElement('script');
scriptCSS.src = "./css_js/standard8_mandala.js";
document.getElementsByTagName('body')[0].appendChild(scriptCSS);

// Combine all glyph collections into a single array for selection
var allGlyphSources = [
    geometricShapes,
    miscSymbols,
    latinExtended,
    cyrillic,
    arabic,
    nkoOthers,
    punctuationSymbols,
    devanagari,
    myanmar,
    georgian,
    ethiopic,
    khmer,
    teluguKannada,
    additionalSymbols
];

function jsWait() {
    if (typeof signalArray == "undefined") {
        window.setTimeout(jsWait, 100);
    } else {
        initDiv();
        initStyle();
        initDisplayState();
        changeHtmlDisplay();
        changeColor();
    }
}

function initDiv(){
    container=[];
    
    dropShadowCountB=Math.round(Math.random()*(divCounter-1)+1);
    dropShadowCountH=Math.round(Math.random()*(divCounter-1)+1);
    dropShadowCountV=Math.round(Math.random()*(divCounter-1)+1);
    inHtmlCount=Math.round(Math.random()*(divCounter-1)+1);
    
    for (i=1;i<=divCounter;i++){
        container[i]= document.createElement("div");
        document.body.appendChild(container[i]);
        
        if (i==2){
            bck_container=document.createElement("div");
            document.body.appendChild(bck_container);
            elementName='myid'+i+'_bck';
            bck_container.id=elementName;
            bck_container.style.zIndex=-10;
        }
        
        elementName='myid'+i;
        container[i].id=elementName;
    }
    
    elem2_bg = document.getElementById("myid2_bck");
}

function initStyle(){
    bgColChangeRate=50000;
    animationPlayState=50000;
    
    var mycolors=[];
    var colNum=10;
    
    function setColor(hue,sat,light,opa){
        for (colorCounter=1;colorCounter<=colNum;colorCounter++){
            var toSpliceColor='hsla('
            +  Math.round(40*Math.random()+hue-20) + ','
            +  Math.round(40*Math.random()+sat-20)+ '%,'
            + (Math.round(Math.random()*20)+light) + '%,'
            + (Math.random(opa)+.6)
            + ')';
            mycolors.splice(1,0,toSpliceColor);
        }
    }
    
    mycolors.length=0;
    setColor(Math.round(Math.random()*340),Math.round(Math.random()*800),Math.round(Math.random()*80),.3);
    setColor(Math.round(Math.random()*340),Math.round(Math.random()*800),Math.round(Math.random()*80),.3);
    
    for (i=1;i<=divCounter;i++){
        container[i].style.opacity=.71;
        container[i].style.color=mycolors[Math.round((mycolors.length-1)*Math.random())];
        container[i].style.textShadow=Math.round( Math.random()*3 ) + 'px '
                                    +Math.round( Math.random()*400-280 ) + 'px '
                                    + mycolors[Math.round((mycolors.length-1)*Math.random())];
        container[i].style.webkitTextFillColor=mycolors[Math.round((mycolors.length-1)*Math.random())];
        container[i].style.webkitTextStrokeWidth=Math.round(Math.random()*50+5) +"px";
        container[i].style.webkitTextStrokeColor=mycolors[Math.round((mycolors.length-1)*Math.random())];
        container[i].style.border='1px';
        container[i].style.borderRadius='400px';
        container[i].style.borderColor=mycolors[Math.round((mycolors.length-1)*Math.random())];
        container[i].style.overflow='hidden';
    }
    
    elem2_bg = document.getElementById("myid2_bck");
    elem2_bg.style.backgroundColor= mycolors[Math.round((mycolors.length-1)*Math.random())];
}


function initDisplayState(){
    originalViewState="display";
    changeViewState = "noDisplay";
    
    for (i=1;i<=divCounter;i++){
        var item = myArray[Math.floor(Math.random() * myArray.length)];
        var randomFont = item.fonts[Math.floor(Math.random() * item.fonts.length)];
        
        container[i].innerHTML = '&#x' + item.glyph.toString(16) + ';';
        container[i].style.fontFamily = randomFont;
        
        if (i <= divCounter/2) {
            container[i].className = originalViewState;
        } else {
            container[i].className = changeViewState;
        }
    }
}

function changeHtmlDisplay(){
    window.setInterval(function (){
        var inHtmlCount=Math.round(Math.random()*(divCounter/2-1)+1);
        
        if (container[inHtmlCount].className==originalViewState) {
            container[inHtmlCount].className =changeViewState;
            
            var item = myArray[Math.floor(Math.random() * myArray.length)];
            var randomFont = item.fonts[Math.floor(Math.random() * item.fonts.length)];
            
            container[inHtmlCount+(divCounter/2)].innerHTML= '&#x' + item.glyph.toString(16) + ';';
            container[inHtmlCount+(divCounter/2)].style.fontFamily = randomFont;
            container[inHtmlCount+(divCounter/2)].style.textShadow=Math.round( Math.random()*0 )+ 'px '
                            +Math.round( Math.random()*400-280 ) + 'px '
                            +mycolors[Math.round((mycolors.length-1)*Math.random())];
            container[inHtmlCount+(divCounter/2)].className =originalViewState;
        }
        else {
            var item = myArray[Math.floor(Math.random() * myArray.length)];
            var randomFont = item.fonts[Math.floor(Math.random() * item.fonts.length)];
            
            container[inHtmlCount].innerHTML= '&#x' + item.glyph.toString(16) + ';';
            container[inHtmlCount].style.fontFamily = randomFont;
            container[inHtmlCount].className =originalViewState;
            container[inHtmlCount+(divCounter/2)].className =changeViewState;
        }
    },7000 );
}

function changeColor(){
    elem2_bg_color_chg=Math.random()*bgColChangeRate+30000;
    elem2_bg_color=mycolors[Math.round((mycolors.length-1)*Math.random())];
    
    window.setInterval(function(){
        elem2_bg_color=mycolors[Math.round((mycolors.length-1)*Math.random())];
        for (i=1;i<=divCounter;i++){
            container[i].style.background= 'transparent';
            elem2_bg.style.background= mycolors[Math.round((mycolors.length-1)*Math.random())];
            container[i].style.color= mycolors[Math.round((mycolors.length-1)*Math.random())];
        }
    },elem2_bg_color_chg);
}

jsWait();