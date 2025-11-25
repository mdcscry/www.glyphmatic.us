divCounter=12;



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

var scriptCSS = document.createElement('script');
scriptCSS.src = "../js_layout/standard8_mandala.js";
document.getElementsByTagName('body')[0].appendChild(scriptCSS);

console.log('should be adding the body style')
document.body.style.fontFamily = 
    "'Noto Sans', 'Noto Sans Arabic', 'Noto Sans Symbols', 'Noto Sans Symbols 2', 'Noto Sans Thai', 'Noto Sans Syriac', 'Noto Sans Nko', sans-serif";
console.log(document.body.style.fontFamily)

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
			changeHtmlDisplay();
			changeHtmlDisplay();
			//changeColor();
			smoothColorChange();
			//changeColor();
			//changeDropShadowSimpleB();
			//changeDropShadowSimpleV();
			changeDropShadowSimpleH();


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
 bck_container.style.zIndex=-100*(divCounter+1);
}

elementName='myid'+i;
container[i].id=elementName;
}

 elem2_bg = document.getElementById("myid2_bck");

}

function initStyle(){


	elem2_bg.style.transition = 'background-color 5s ease';


	bgColChangeRate=50000;
	animationPlayState=50000;

var mycolors=[];
var colNum=100;



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

setColor(Math.round(Math.random()*340),Math.round(Math.random()*800),Math.round(Math.random()*80),.3);
//setColor(Math.round(Math.random()*340),Math.round(Math.random()*800),Math.round(Math.random()*80),.3);
//setColor(Math.round(Math.random()*340),Math.round(Math.random()*800),Math.round(Math.random()*80),.3);
setColor(Math.round(Math.random()*340),Math.round(Math.random()*800),Math.round(Math.random()*80),.3);


mycolors2=['#080808','#101010','#181818','#202020','#282828','#303030','#383838','#404040','#484848'
,'#505050','#585858','#606060','#686868','#707070','#787878','#808080','#888888','#909090','#989898','#A0A0A0','#A8A8A8','#B0B0B0',
'#B8B8B8','#C0C0C0','#C8C8C8','#D0D0D0','#D8D8D8','#E0E0E0','#E8E8E8','#F0F0F0','#F8F8F8','#FFFFFF' ];




	for (i=1;i<=divCounter;i++){
		container[i].style.zIndex=1;
		container[i].style.opacity=.41;
		container[i].style.color=mycolors[Math.round((mycolors.length-1)*Math.random())];
		container[i].style.transition = 'color 5s ease, background-color 5s ease';

		if (Math.round(Math.random()*1)==0){
		container[i].style.webkitTransform= 'rotate(' + Math.round(Math.random()*2)-2*180 + 'deg)';}
		else{

		container[i].style.webkitTransform= 'rotate(' + Math.round(Math.random()*2)-2*180 + 'deg)';

	}
		container[i].style.textShadow=Math.round( Math.random()*50-25 ) + 'px '
									+Math.round( Math.random()*50-25 ) + 'px '
									+ mycolors[Math.round((mycolors.length-1)*Math.random())];
		  container[i].style.webkitTextFillColor=mycolors[Math.round((mycolors.length-1)*Math.random())];
		  container[i].style.webkitTextStrokeWidth=Math.round(Math.random()*5-10+40) +"px";
		  container[i].style.webkitTextStrokeWidth=Math.round(Math.random()*20+5) +"px";
  		  container[i].style.webkitTextStrokeColor=mycolors[Math.round((mycolors.length-1)*Math.random())];
	}

	elem2_bg.style.transition = 'background-color 5s ease';
	elem2_bg = document.getElementById("myid2_bck");
	elem2_bg.style.backgroundColor= mycolors[Math.round((mycolors.length-1)*Math.random())];

}

function smoothColorChange() {
    // Change colors here
    elem2_bg.style.backgroundColor = mycolors[Math.round((mycolors.length-1)*Math.random())];
   let randomInterval = Math.random() * 30000 + 5000; // 5-35 seconds
    // Schedule next frame
    setTimeout(() => {
        requestAnimationFrame(smoothColorChange);
    }, randomInterval); // Wait 5 seconds between changes
}

function initDisplayState(){
    originalViewState="display";
    changeViewState = "noDisplay";

    for (i=1;i<=divCounter;i++){
        var item1 = myArray[Math.floor(Math.random() * myArray.length)];
        var item2 = myArray[Math.floor(Math.random() * myArray.length)];
        var item3 = myArray[Math.floor(Math.random() * myArray.length)];
        var item4 = myArray[Math.floor(Math.random() * myArray.length)];
        var item5 = myArray[Math.floor(Math.random() * myArray.length)];
        var item6 = myArray[Math.floor(Math.random() * myArray.length)];
        var item7 = myArray[Math.floor(Math.random() * myArray.length)];
        
        var font1 = item1.fonts[Math.floor(Math.random() * item1.fonts.length)];
        var font2 = item2.fonts[Math.floor(Math.random() * item2.fonts.length)];
        var font3 = item3.fonts[Math.floor(Math.random() * item3.fonts.length)];
        var font4 = item4.fonts[Math.floor(Math.random() * item4.fonts.length)];
        var font5 = item5.fonts[Math.floor(Math.random() * item5.fonts.length)];
        var font6 = item6.fonts[Math.floor(Math.random() * item6.fonts.length)];
        var font7 = item7.fonts[Math.floor(Math.random() * item7.fonts.length)];
        
        container[i].innerHTML = 
            '<span style="font-family:' + font1 + '">&#x' + item1.glyph.toString(16) + ';</span>' +
            '<span style="font-family:' + font2 + '">&#x' + item2.glyph.toString(16) + ';</span>' +
            '<span style="font-family:' + font3 + '">&#x' + item3.glyph.toString(16) + ';</span>' +
            '<span style="font-family:' + font4 + '">&#x' + item4.glyph.toString(16) + ';</span>' +
            '<span style="font-family:' + font5 + '">&#x' + item5.glyph.toString(16) + ';</span>' +
            '<span style="font-family:' + font6 + '">&#x' + item6.glyph.toString(16) + ';</span>' +
            '<span style="font-family:' + font7 + '">&#x' + item7.glyph.toString(16) + ';</span>';
        
        container[i].className = originalViewState;
    }
}

function changeHtmlDisplay(){
    window.setInterval(function (){

        var inHtmlCount=Math.round(Math.random()*(divCounter-1)+1);

        if(window.inHtmlCount==divCounter){window.inHtmlCount=1} else {window.inHtmlCount=window.inHtmlCount+1};
        
        if (container[inHtmlCount].className==originalViewState) {
            container[inHtmlCount].className = originalViewState;
        }
        else {
            var item1 = myArray[Math.floor(Math.random() * myArray.length)];
            var item2 = myArray[Math.floor(Math.random() * myArray.length)];
            var item3 = myArray[Math.floor(Math.random() * myArray.length)];
            var item4 = myArray[Math.floor(Math.random() * myArray.length)];
            var item5 = myArray[Math.floor(Math.random() * myArray.length)];
            var item6 = myArray[Math.floor(Math.random() * myArray.length)];
            var item7 = myArray[Math.floor(Math.random() * myArray.length)];
            
            var font1 = item1.fonts[Math.floor(Math.random() * item1.fonts.length)];
            var font2 = item2.fonts[Math.floor(Math.random() * item2.fonts.length)];
            var font3 = item3.fonts[Math.floor(Math.random() * item3.fonts.length)];
            var font4 = item4.fonts[Math.floor(Math.random() * item4.fonts.length)];
            var font5 = item5.fonts[Math.floor(Math.random() * item5.fonts.length)];
            var font6 = item6.fonts[Math.floor(Math.random() * item6.fonts.length)];
            var font7 = item7.fonts[Math.floor(Math.random() * item7.fonts.length)];
            
            container[inHtmlCount].innerHTML = 
                '<span style="font-family:' + font1 + '">&#x' + item1.glyph.toString(16) + ';</span>' +
                '<span style="font-family:' + font2 + '">&#x' + item2.glyph.toString(16) + ';</span>' +
                '<span style="font-family:' + font3 + '">&#x' + item3.glyph.toString(16) + ';</span>' +
                '<span style="font-family:' + font4 + '">&#x' + item4.glyph.toString(16) + ';</span>' +
                '<span style="font-family:' + font5 + '">&#x' + item5.glyph.toString(16) + ';</span>' +
                '<span style="font-family:' + font6 + '">&#x' + item6.glyph.toString(16) + ';</span>' +
                '<span style="font-family:' + font7 + '">&#x' + item7.glyph.toString(16) + ';</span>';

            if (Math.round(Math.random()*1)==0){
                container[inHtmlCount].style.transform = 'rotate(' + Math.round(Math.random()*2)-2*90 + 'deg)';
            }
            
            container[inHtmlCount].className = originalViewState;
        }

    },Math.random()*30000+15000 );
}

function changeColor(){
	 elem2_bg_color_chg=Math.random()*bgColChangeRate+5000;
	 elem2_bg_color=mycolors[Math.round((mycolors.length-1)*Math.random())];

	window.setInterval(function(){
	   	 elem2_bg_color=mycolors[Math.round((mycolors.length-1)*Math.random())];
	   	for (i=1;i<=divCounter;i++){

	    	container[i].style.background= 'transparent';

	    	elem2_bg.style.backgroundColor= mycolors[Math.round((mycolors.length-1)*Math.random())];
	   		container[i].style.color= mycolors[Math.round((mycolors.length-1)*Math.random())];
		}
	   },elem2_bg_color_chg);
}

function changeDropShadowSimpleB(){

		window.setInterval(function(){
			if(window.dropShadowCountB==divCounter){window.dropShadowCountB=1} else {window.dropShadowCountB=window.dropShadowCountB+1};
			container[window.dropShadowCountB].style.textShadow=Math.round( Math.random()*100-50 )+ 'px '
										+Math.round( Math.random()*100-50 ) + 'px '
										+mycolors[Math.round((mycolors.length-1)*Math.random())];}
			//container[inHtmlCount].style.webkitTransform= 'skew('+ Math.round(Math.random()*180) +'deg,'+ Math.round(Math.random()*0) +'deg)';
		,Math.random()*5000+5000);
	}

function changeDropShadowSimpleH(){

		window.setInterval(function(){
			if(window.dropShadowCountH==divCounter){window.dropShadowCountH=1} else {window.dropShadowCountH=window.dropShadowCountH+1};
			container[window.dropShadowCountH].style.textShadow=Math.round( 0 ) + 'px '
										+Math.round( Math.random()*100-50 ) + 'px '
										+mycolors[Math.round((mycolors.length-1)*Math.random())];
			container[window.dropShadowCountH].style.webkitTextFillColor=mycolors[Math.round((mycolors.length-1)*Math.random())];
			container[window.dropShadowCountH].style.webkitTextStrokeWidth=Math.round(Math.random()*20+5) +"px";
  		    container[window.dropShadowCountH].style.webkitTextStrokeColor=mycolors[Math.round((mycolors.length-1)*Math.random())];

										}

			//container[inHtmlCount].style.webkitTransform= 'skew('+ Math.round(Math.random()*180) +'deg,'+ Math.round(Math.random()*0) +'deg)';
		,Math.random()*5000+5000);
	}

function changeDropShadowSimpleV(){

		window.setInterval(function(){
			if(window.dropShadowCountV==divCounter){window.dropShadowCountV=1} else {window.dropShadowCountV=window.dropShadowCountV+1};
			container[window.dropShadowCountV].style.textShadow=Math.round( Math.random()*100-50 )+ 'px '
										+ Math.round( 0 ) + 'px '
										+mycolors[Math.round((mycolors.length-1)*Math.random())];}
			//container[inHtmlCount].style.webkitTransform= 'skew('+ Math.round(Math.random()*180) +'deg,'+ Math.round(Math.random()*0) +'deg)';
		,Math.random()*5000+5000);

	}





jsWait();








