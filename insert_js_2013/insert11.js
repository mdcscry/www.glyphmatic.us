divCounter=4;
var mycolors=[];
var mycolors2=[];

var eleWidth;
var counter=0;
var hexTest='';
var utfExpString;
var rndLang

var scriptCSS = document.createElement('script');
scriptCSS.src = "../js_layout/standardQuad_pk.js";
document.getElementsByTagName('body')[0].appendChild(scriptCSS);

function jsWait() {
    // Only check for the signals we actually define
    if (typeof glyphBlocks == "undefined" || typeof utfArraySignal == "undefined") {
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

function initDiv(){
    container=[];

    dropShadowCountB=Math.round(Math.random()*(divCounter-1)+1);
    dropShadowCountH=Math.round(Math.random()*(divCounter-1)+1);
    dropShadowCountV=Math.round(Math.random()*(divCounter-1)+1);
    inHtmlCount=Math.round(Math.random()*(divCounter-1)+1);

    for (i=1;i<=divCounter;i++){
        container[i]= document.createElement("div");
        document.body.appendChild(container[i]);
        elementName='myid'+i;
        container[i].id=elementName;
    }

    spanWt= document.createElement("span");
    document.body.appendChild(spanWt);
    spanWt.id='widthTester';
    spanWt.style.position='absolute';
    spanWt.style.left='-15%';
    spanWt.style.fontSize='50px';
}

function initStyle(){
    bgColChangeRate=10000;
    animationPlayState=10000;

    var colNum=2;

    function setColor(hue,sat,light,opa){
        for (colorCounter=1;colorCounter<=colNum;colorCounter++){
            var toSpliceColor='hsla('
            +  Math.round(hue) + ','
            +  Math.round(Math.random()*sat+1)+ '%,'
            + Math.round(Math.random()*10+light) + '%,'
            + (Math.random(1)-.3)
            + ')';
            mycolors.splice(1,0,toSpliceColor);
        }
    }

    setColor(Math.round(Math.random()*360),Math.round(Math.random()*800),Math.round(Math.random()*100+20),1);

    var mycolors2=[];
    var colNum=50

    function setColor2(hue,sat,light,opa){
        for (colorCounter=1;colorCounter<=colNum;colorCounter++){
            var toSpliceColor='hsla('
            +  Math.round(hue+Math.random()*40-20) + ','
            +  Math.round(Math.random()*sat+1)+ '%,'
            + Math.round(Math.random()*10+light) + '%,'
            + (Math.random(1)-.3)
            + ')';
            mycolors2.push(toSpliceColor);
        }
    }

    setColor2(Math.round(Math.random()*360),Math.round(Math.random()*800),Math.round(Math.random()*100),1);

    for (i=1;i<=divCounter;i++){
        container[i].style.backgroundColor=mycolors2[Math.round((mycolors2.length-1)*Math.random())];
        container[i].style.color=mycolors[Math.round((mycolors.length-1)*Math.random())];
        container[i].style.textShadow=Math.round( Math.random()*3+1 ) + 'px '
                                    +Math.round( Math.random()*3+1) + 'px '
                                    + mycolors2[Math.round((mycolors.length-1)*Math.random())];
        container[i].style.webkitTextFillColor=mycolors[Math.round((mycolors.length-1)*Math.random())];
        container[i].style.webkitTextStrokeWidth=Math.round(Math.random()*3) +"px";
        container[i].style.webkitTextStrokeColor=mycolors[Math.round((mycolors.length-1)*Math.random())];
    }
}

function initDisplayState(){
    originalViewState="display";
    changeViewState = "noDisplay";

    for (i=1;i<=divCounter;i++){
        for (sp=1;sp<=3;sp++){
            var result = generateGlyphs(1);
            span_sp= document.createElement("span");
            container[i].appendChild(span_sp);
            span_sp.id='span'+i+'_'+sp;
            span_sp.style.fontFamily=result.fontFamily;
            span_sp.innerHTML=result.glyphString;
            span_sp.className = "font-effect-canvas-effect";
            
            // Extract hex codes for title
            var hexCodes = result.glyphString.match(/[0-9A-F]{4,5}/gi);
            span_sp.title = hexCodes ? hexCodes.join(' + ') : '';
        }
        container[i].className = originalViewState;
    }
}

function changeHtmlDisplay(){
    window.setInterval(function (){
        var rndContainer=Math.round(Math.random()*(divCounter-1)+1);
        var containerFonts = [];
        
        for (rndSp=1;rndSp<=3;rndSp++){
            var result = generateGlyphs(1);
            span_rnd='span'+rndContainer+'_'+rndSp;
            span_rnd_id=document.getElementById(span_rnd);
            span_rnd_id.style.fontFamily=result.fontFamily;
            span_rnd_id.innerHTML=result.glyphString;
            
            // Extract hex codes for title
            var hexCodes = result.glyphString.match(/[0-9A-F]{4,5}/gi);
            span_rnd_id.title = hexCodes ? hexCodes.join(' + ') : '';
            
            if (containerFonts.indexOf(result.fontFamily) === -1) {
                containerFonts.push(result.fontFamily);
            }
        }
        
        container[rndContainer].dataset.fonts = containerFonts.join(', ');
    },Math.random()*1);
}

function changeColor(){
    bg_color_chg=Math.random()*bgColChangeRate+5000;

    window.setInterval(function(){
        bg_color=mycolors2[Math.round((mycolors2.length-1)*Math.random())];
        rndDiv=Math.round(Math.random()*(divCounter-1)+1);
        rndDiv2=Math.round(Math.random()*(divCounter-1)+1);
        container[rndDiv].style.backgroundColor= bg_color;
        container[rndDiv2].style.color= bg_color;
    },bg_color_chg);
}

function changeDropShadowSimpleB(){
    window.setInterval(function(){
        if(window.dropShadowCountB==divCounter){window.dropShadowCountB=1} else {window.dropShadowCountB=window.dropShadowCountB+1};
        container[window.dropShadowCountB].style.textShadow=Math.round( Math.random()*10-5 )+ 'px '
                                    +Math.round( Math.random()*10-5 ) + 'px '
                                    +mycolors2[Math.round((mycolors.length-1)*Math.random())];
    },Math.random()*5000+5000);
}

function changeDropShadowSimpleH(){
    window.setInterval(function(){
        if(window.dropShadowCountH==divCounter){window.dropShadowCountH=1} else {window.dropShadowCountH=window.dropShadowCountH+1};
        container[window.dropShadowCountH].style.textShadow=Math.round( 0 ) + 'px '
                                    +Math.round( Math.random()*10-5 ) + 'px '
                                    +mycolors2[Math.round((mycolors.length-1)*Math.random())];
    },Math.random()*5000+5000);
}

function changeDropShadowSimpleV(){
    window.setInterval(function(){
        if(window.dropShadowCountV==divCounter){window.dropShadowCountV=1} else {window.dropShadowCountV=window.dropShadowCountV+1};
        container[window.dropShadowCountV].style.textShadow=Math.round( Math.random()*10-5 )+ 'px '
                                    + Math.round( 0 ) + 'px '
                                    +mycolors2[Math.round((mycolors.length-1)*Math.random())];
    },Math.random()*5000+5000);
}

jsWait();