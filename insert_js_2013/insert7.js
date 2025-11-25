divCounter=2;

var scriptCSS = document.createElement('script');
scriptCSS.src = "../js_layout/standard8_blur.js";
document.getElementsByTagName('body')[0].appendChild(scriptCSS);

function jsWait() {
    if (typeof signalArray == "undefined") {
        window.setTimeout(jsWait, 100);
    } else {
        initDiv();
        initStyle();
        initDisplayState();
        changeHtmlDisplay();
        changeHtmlDisplay();
        changeColor();
        changeColor();
        changeDropShadowSimpleB();
        changeDropShadowSimpleV();
        changeDropShadowSimpleH();
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
            bck_container.style.zIndex=-1*(divCounter+1);
        }
        
        elementName='myid'+i;
        container[i].id=elementName;
        
        // Random positioning
        container[i].style.position = 'fixed';
        container[i].style.top = Math.random() * 100 + '%';
        container[i].style.left = Math.random() * 100 + '%';
        container[i].style.transform = 'translate(-50%, -50%)';
        container[i].style.width = '100%';
        container[i].style.height = '100%';
        container[i].style.display = 'flex';
        container[i].style.alignItems = 'center';
        container[i].style.justifyContent = 'center';
    }
    
    elem2_bg = document.getElementById("myid2_bck");
    elem2_bg.style.background = 'transparent';
    elem2_bg.style.position = 'fixed';
    elem2_bg.style.top = '0';
    elem2_bg.style.left = '0';
    elem2_bg.style.width = '100%';
    elem2_bg.style.height = '100%';
}

function generateOklchPalette(colNum) {
    const mycolors = [];
    
    // Pick one random base hue and chroma for the entire palette
    const baseHue = Math.floor(Math.random() * 360);
    const baseChroma = 0.15 + Math.random() * 0.15;  // Range: 0.15-0.30 for more vibrant colors
    
    console.log('Generating palette with hue:', baseHue, 'chroma:', baseChroma);
    
    // Generate enough random lightness values to match colNum
    for (let i = 0; i < colNum; i++) {
        const lightness = Math.floor(Math.random() * 90) + 10;
        const opacity = Math.random() * 0.3 + 0.6;
        const color = `oklch(${lightness}% ${baseChroma.toFixed(2)} ${baseHue} / ${opacity.toFixed(2)})`;
        mycolors.push(color);
    }
    
    console.log('Generated', mycolors.length, 'colors:', mycolors);
    
    return mycolors;
}

function initStyle(){
    bgColChangeRate=100000;
    animationPlayState=50000;
    
    var colNum=20; // Generate more colors so there's enough variety in lightness
    var mycolors = generateOklchPalette(colNum);
    
    // Store mycolors globally first
    window.mycolors = mycolors;
    
    document.body.style.background=window.mycolors[Math.round((window.mycolors.length-1)*Math.random())];
    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';
    
    for (i=1;i<=divCounter;i++){
        container[i].style.zIndex=-1*i;
        container[i].style.color=window.mycolors[Math.round((window.mycolors.length-1)*Math.random())];
        container[i].style.opacity=.71;
        container[i].style.wordSpacing='-5.5em';
        container[i].style.fontSize=Math.floor(Math.random() * 800 + 1100) + 'px';
        container[i].style.textShadow=Math.round( Math.random()*100-50 ) + 'px '
                                    +Math.round( Math.random()*100-50 ) + 'px '
                                    + window.mycolors[Math.round((window.mycolors.length-1)*Math.random())];
        container[i].style.webkitTextFillColor=window.mycolors[Math.round((window.mycolors.length-1)*Math.random())];
        container[i].style.webkitTextStrokeWidth=Math.random()*50+1 +"px";
        container[i].style.webkitTextStrokeColor=window.mycolors[Math.round((window.mycolors.length-1)*Math.random())];
    }
}

function initDisplayState(){
    originalViewState="display";
    changeViewState = "noDisplay";
    
    for (i=1;i<=divCounter;i++){
        container[i].innerHTML= '&#'+myarray[Math.round((myarray.length-1)*Math.random())]+';'+'&#'+myarray[Math.round((myarray.length-1)*Math.random())]+';';
        container[i].className = originalViewState;
    }
}

function changeHtmlDisplay(){
    window.setInterval(function (){
        var inHtmlCount=Math.round(Math.random()*(divCounter-1)+1);
        
        if(window.inHtmlCount==divCounter){window.inHtmlCount=1} else {window.inHtmlCount=window.inHtmlCount+1};
        if (container[inHtmlCount].className==originalViewState) {
            container[inHtmlCount].className =changeViewState;
        } else {
            container[inHtmlCount].innerHTML= '&#'+myarray[Math.round((myarray.length-1)*Math.random())]+';'+'&#'+myarray[Math.round((myarray.length-1)*Math.random())]+';';
            container[inHtmlCount].className =originalViewState;
        }
    },Math.random()*20000+5000 );
}

function changeColor(){
    elem2_bg_color_chg=Math.random()*bgColChangeRate+5000;
    elem2_bg_color=window.mycolors[Math.round((window.mycolors.length-1)*Math.random())];
    
    window.setInterval(function(){
        elem2_bg_color=window.mycolors[Math.round((window.mycolors.length-1)*Math.random())];
        for (i=1;i<=divCounter;i++){
            container[i].style.background= 'transparent';
            elem2_bg.style.background= 'transparent';
            container[i].style.color= window.mycolors[Math.round((window.mycolors.length-1)*Math.random())];
        }
    },elem2_bg_color_chg);
}

function changeDropShadowSimpleB(){
    window.setInterval(function(){
        if(window.dropShadowCountB==divCounter){window.dropShadowCountB=1} else {window.dropShadowCountB=window.dropShadowCountB+1};
        container[window.dropShadowCountB].style.textShadow=Math.round( Math.random()*100-50 )+ 'px '
                                    +Math.round( Math.random()*100-50 ) + 'px '
                                    +window.mycolors[Math.round((window.mycolors.length-1)*Math.random())];}
    ,Math.random()*20000+5000);
}

function changeDropShadowSimpleH(){
    window.setInterval(function(){
        if(window.dropShadowCountH==divCounter){window.dropShadowCountH=1} else {window.dropShadowCountH=window.dropShadowCountH+1};
        container[window.dropShadowCountH].style.textShadow=Math.round( 0 ) + 'px '
                                    +Math.round( Math.random()*100-50 ) + 'px '
                                    +window.mycolors[Math.round((window.mycolors.length-1)*Math.random())];}
    ,Math.random()*20000+10000);
}

function changeDropShadowSimpleV(){
    window.setInterval(function(){
        if(window.dropShadowCountV==divCounter){window.dropShadowCountV=1} else {window.dropShadowCountV=window.dropShadowCountV+1};
        container[window.dropShadowCountV].style.textShadow=Math.round( Math.random()*100-50 )+ 'px '
                                    + Math.round( 0 ) + 'px '
                                    +window.mycolors[Math.round((window.mycolors.length-1)*Math.random())];}
    ,Math.random()*20000+10000);
}

jsWait();