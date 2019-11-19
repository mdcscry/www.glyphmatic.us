divCounter=4;
var mycolors=[];
var mycolors2=[];

var eleWidth;
var counter=0;
var hexTest='';
var utfExpString;
var rndLang


var scriptCSS = document.createElement('script');
scriptCSS.src = "./css_js/standardQuad_pk.js";
document.getElementsByTagName('body')[0].appendChild(scriptCSS);


 function jsWait() {
        if (typeof signalArray =="undefined" || typeof utfArraySignal=="undefined" || typeof msucdArraySignal=="undefined")
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
			changeColor();
			changeColor();
			//changeDropShadowSimpleB();
			//changeDropShadowSimpleV();
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
elementName='myid'+i;
container[i].id=elementName;
}

//font tester span  if a font is 50px wide in webkit and 22 in mozilla we exclude
spanWt= document.createElement("span");
document.body.appendChild(spanWt);
spanWt.id='widthTester';
spanWt.style.postition='absolute';
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
+ (Math.random(1)-.3	)
+ ')';
//alert (toSpliceColor);
mycolors.splice(1,0,toSpliceColor);
//	mycolors.push(toSpliceColor);
	}
}

setColor(Math.round(Math.random()*360),Math.round(Math.random()*800),Math.round(Math.random()*100+20),1);
//setColor(Math.round(Math.random()*360),Math.round(Math.random()*100),Math.round(Math.random()*100+20),1);
//setColor(Math.round(Math.random()*360),Math.round(Math.random()*100),Math.round(Math.random()*100+20),1);
//setColor(Math.round(Math.random()*360),Math.round(Math.random()*100),Math.round(Math.random()*70),1);


var mycolors2=[];
var colNum=50

function setColor2(hue,sat,light,opa){

for (colorCounter=1;colorCounter<=colNum;colorCounter++){
var toSpliceColor='hsla('
+  Math.round(hue+Math.random()*40-20) + ','
+  Math.round(Math.random()*sat+1)+ '%,'
+ Math.round(Math.random()*10+light) + '%,'
+ (Math.random(1)-.3	)
+ ')';


	mycolors2.push(toSpliceColor);
	//	alert(toSpliceColor);
	}

}

setColor2(Math.round(Math.random()*360),Math.round(Math.random()*800),Math.round(Math.random()*100),1);
//setColor2(Math.round(Math.random()*360),Math.round(Math.random()*800),Math.round(Math.random()*100),1);
//setColor2(Math.round(Math.random()*360),Math.round(Math.random()*800),Math.round(Math.random()*100),1);
//setColor2(Math.round(Math.random()*360),Math.round(Math.random()*800),Math.round(Math.random()*70),1);



//mycolors1=['#FF0000','#00FF00','#0000FF','#FFFF00','#00FFFF','#FF00FF '];

	for (i=1;i<=divCounter;i++){
		//container[i].style.zIndex=-1*i;
		//container[i].style.opacity=.71;
		//container[i].style.webkitTransform= 'skew('+ Math.round(Math.random()*0) +'deg,'+ Math.round(Math.random()*180) +'deg)';
		container[i].style.backgroundColor=mycolors2[Math.round((mycolors2.length-1)*Math.random())];
		//container[i].style.fontFamily='sans';
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	 originalViewState="display";
	 changeViewState = "noDisplay";

	for (i=1;i<=divCounter;i++){
			container[i].title='';
		for (sp=1;sp<=3;sp++){
			rtrnVal=hexTesterInterface();
			span_sp= document.createElement("span");
			container[i].appendChild(span_sp);
			span_sp.id='span'+i+'_'+sp;
			span_sp.style.fontFamily=fontArray[rndLang];
			span_sp.innerHTML=rtrnVal;
			container[i].title+= rtrnVal;
		}


		container[i].className = originalViewState;

}
}


function changeHtmlDisplay(){
	window.setInterval(function (){

		var rndContainer=Math.round(Math.random()*(divCounter-1)+1);
		for (rndSp=1;rndSp<=3;rndSp++){
				rtrnVal=hexTesterInterface();
				span_rnd='span'+rndContainer+'_'+rndSp;
		 span_rnd_id=document.getElementById(span_rnd);
				span_rnd_id.style.fontFamily=fontArray[rndLang];
				span_rnd_id.innerHTML=rtrnVal;
				container[rndContainer].title+= rtrnVal;
		}
			//container[inHtmlCount].innerHTML= hexTesterInterface();


	},Math.random()*1 );
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
										+mycolors2[Math.round((mycolors.length-1)*Math.random())];}
			//container[inHtmlCount].style.webkitTransform= 'skew('+ Math.round(Math.random()*180) +'deg,'+ Math.round(Math.random()*0) +'deg)';
		,Math.random()*5000+5000);
	}

function changeDropShadowSimpleH(){

		window.setInterval(function(){
			if(window.dropShadowCountH==divCounter){window.dropShadowCountH=1} else {window.dropShadowCountH=window.dropShadowCountH+1};
			container[window.dropShadowCountH].style.textShadow=Math.round( 0 ) + 'px '
										+Math.round( Math.random()*10-5 ) + 'px '
										+mycolors2[Math.round((mycolors.length-1)*Math.random())];}
			//container[inHtmlCount].style.webkitTransform= 'skew('+ Math.round(Math.random()*180) +'deg,'+ Math.round(Math.random()*0) +'deg)';
		,Math.random()*5000+5000);
	}

function changeDropShadowSimpleV(){

		window.setInterval(function(){
			if(window.dropShadowCountV==divCounter){window.dropShadowCountV=1} else {window.dropShadowCountV=window.dropShadowCountV+1};
			container[window.dropShadowCountV].style.textShadow=Math.round( Math.random()*10-5 )+ 'px '
										+ Math.round( 0 ) + 'px '
										+mycolors2[Math.round((mycolors.length-1)*Math.random())];}
			//container[inHtmlCount].style.webkitTransform= 'skew('+ Math.round(Math.random()*180) +'deg,'+ Math.round(Math.random()*0) +'deg)';
		,Math.random()*5000+5000);

	}

function hexTester(){

	 rndLang=Math.round(Math.random()*(myValidationArray.length-1));
	 //rndLang=10;
	hexTest=myValidationArray[rndLang][Math.round(Math.random() *(myValidationArray[rndLang].length-1))];
		//alert(hexTest);
	if ( myComboValidationArray.indexOf(hexTest) < 0 ) {
		 testWidth=document.getElementById("widthTester");
		 testWidth.innerHTML="&#x" + hexTest + ";";
		 eleWidth=testWidth.offsetWidth;
		 widthTester.innerHTML='';
		if(eleWidth>5 ) { return true ;}
	} else {return false;}
}

function hexTesterInterface(){
	utfExpString='';
	counter=0;
		do {

		if (hexTester()==true){
		 utfExpString+="&#x" + hexTest +";";
		 counter++;

		}

}while( counter ==0);
return utfExpString;
}


jsWait();








