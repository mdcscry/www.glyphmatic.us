divCounter=6;



var scriptCSS = document.createElement('script');
scriptCSS.src = "../js_layout/standard8_mandala.js";
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
        if (typeof signalArray =="undefined")
        {

            window.setTimeout(jsWait, 100);

        }
        else
        {
            initDiv();
			initStyle();
			initDisplayState();

        // Stagger the interval starts
		
			//changeHtmlDisplay();
			changeHtmlDisplay();
			//changeGlyphColors();
			changeBackgrounds();
			//changeDropShadowSimpleB();
			changeDropShadowSimpleV();
			//changeDropShadowSimpleH();


        }
    }


function initDiv(){
container=[];

//used to track which div is getting the changes  not random
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
}

 elem2_bg = document.getElementById("myid2_bck");
 elem2_bg.style.transition = 'background-color 10s ease-in-out';


}

function initStyle(){

	bgColChangeRate=100000;
	animationPlayState=50000;

var mycolors=[];
var colNum=6;

setColor(Math.round(Math.random()*340),Math.round(Math.random()*800),Math.round(Math.random()*80),.3);
setColor(Math.round(Math.random()*340),Math.round(Math.random()*800),Math.round(Math.random()*80),.3);
setColor(Math.round(Math.random()*340),Math.round(Math.random()*800),Math.round(Math.random()*80),.3);
setColor(Math.round(Math.random()*340),Math.round(Math.random()*800),Math.round(Math.random()*80),.3);

function setColor(hue,sat,light,opa){

for (colorCounter=1;colorCounter<=colNum;colorCounter++){
var toSpliceColor='hsla('
+  Math.round(40*Math.random()+hue-20) + ','
+  Math.round(40*Math.random()+sat-20)+ '%,'
+ (Math.round(Math.random()*20)+light) + '%,'
+ (Math.random(opa)+.6	)
+ ')';
//alert (toSpliceColor);

mycolors.splice(1,0,toSpliceColor);
}
}

mycolors2=['#080808','#101010','#181818','#202020','#282828','#303030','#383838','#404040','#484848'
,'#505050','#585858','#606060','#686868','#707070','#787878','#808080','#888888','#909090','#989898','#A0A0A0','#A8A8A8','#B0B0B0',
'#B8B8B8','#C0C0C0','#C8C8C8','#D0D0D0','#D8D8D8','#E0E0E0','#E8E8E8','#F0F0F0','#F8F8F8','#FFFFFF' ];

mycolors1=['#FF0000','#00FF00','#0000FF','#FFFF00','#00FFFF','#FF00FF '];

elem2_bg.style.backgroundColor= mycolors[Math.round((mycolors.length-1)*Math.random())];

	for (i=1;i<=divCounter;i++){
		container[i].style.position='fixed';
		container[i].style.top='-500px';
		container[i].style.zIndex=1;
		container[i].style.opacity=.71;
		container[i].style.color=mycolors[Math.round((mycolors.length-1)*Math.random())];

		container[i].style.textShadow=Math.round( 0 ) + 'px '
									+Math.round( Math.random()*10-5 ) + 'px '
									+ mycolors[Math.round((mycolors.length-1)*Math.random())];

	}


}


function initDisplayState(){
    originalViewState="display";
    changeViewState = "noDisplay";

    for (i=1;i<=divCounter;i++){
        var item = myArray[Math.floor(Math.random() * myArray.length)];
        var randomFont = item.fonts[Math.floor(Math.random() * item.fonts.length)];
        
        container[i].innerHTML = '&#x' + item.glyph.toString(16) + ';';
        container[i].style.fontFamily = randomFont;
        container[i].className = originalViewState;
    }
}

function changeHtmlDisplay(){
    window.setInterval(function (){
        var inHtmlCount=Math.round(Math.random()*(divCounter-1)+1);

        if(window.inHtmlCount==divCounter){window.inHtmlCount=1} else {window.inHtmlCount=window.inHtmlCount+1};
        
        if (container[inHtmlCount].className==originalViewState) {
            container[inHtmlCount].className = changeViewState;
        }
        else {
            var item = myArray[Math.floor(Math.random() * myArray.length)];
            var randomFont = item.fonts[Math.floor(Math.random() * item.fonts.length)];
            
            container[inHtmlCount].innerHTML = '&#x' + item.glyph.toString(16) + ';';
            container[inHtmlCount].style.fontFamily = randomFont;
            container[inHtmlCount].style.color = mycolors[Math.floor(Math.random() * mycolors.length)]; // Change color while hidden
            container[inHtmlCount].className = originalViewState;
        }

    },Math.random()*15000+15000 );
}

function changeGlyphColors(){
    window.setInterval(function(){
        for (i=1;i<=divCounter;i++){
            if(container[i].className === originalViewState) {
                container[i].style.color = mycolors[Math.floor(Math.random() * mycolors.length)];
            }
        }
    }, Math.random()*10000+10000); // Random between 10-20 seconds
}

function changeBackgrounds(){
    window.setInterval(function(){
        var bgColor = mycolors[Math.floor(Math.random() * mycolors.length)];
        elem2_bg.style.backgroundColor = bgColor;
        
        // Optional: sync container backgrounds with main bg
        // for (i=1;i<=divCounter;i++){
        //     container[i].style.backgroundColor = bgColor;
        // }
    }, Math.random()*15000+15000); // Random between 15-30 seconds
}

function changeDropShadowSimpleB(){

		window.setInterval(function(){
			if(window.dropShadowCountB==divCounter){window.dropShadowCountB=1} else {window.dropShadowCountB=window.dropShadowCountB+1};
			container[window.dropShadowCountB].style.textShadow=Math.round( Math.random()*10-5 )+ 'px '
										+Math.round( Math.random()*10-5 ) + 'px '
										+mycolors[Math.round((mycolors.length-1)*Math.random())];}
		,Math.random()*5000+5000);
	}

function changeDropShadowSimpleH(){

		window.setInterval(function(){
			if(window.dropShadowCountH==divCounter){window.dropShadowCountH=1} else {window.dropShadowCountH=window.dropShadowCountH+1};
			container[window.dropShadowCountH].style.textShadow=Math.round( 0 ) + 'px '
										+Math.round( Math.random()*10-5 ) + 'px '
										+mycolors[Math.round((mycolors.length-1)*Math.random())];


										}

			//container[inHtmlCount].style.webkitTransform= 'skew('+ Math.round(Math.random()*180) +'deg,'+ Math.round(Math.random()*0) +'deg)';
		,Math.random()*5000+5000);
	}

function changeDropShadowSimpleV(){

		window.setInterval(function(){
			if(window.dropShadowCountV==divCounter){window.dropShadowCountV=1} else {window.dropShadowCountV=window.dropShadowCountV+1};
			container[window.dropShadowCountV].style.textShadow=Math.round( Math.random()*10-5 )+ 'px '
										+ Math.round( 0 ) + 'px '
										+mycolors[Math.round((mycolors.length-1)*Math.random())];}
			//container[inHtmlCount].style.webkitTransform= 'skew('+ Math.round(Math.random()*180) +'deg,'+ Math.round(Math.random()*0) +'deg)';
		,Math.random()*5000+5000);

	}

jsWait();








