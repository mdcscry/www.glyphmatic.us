divCounter=350;



var cssStandard8 = document.createElement('style');
document.getElementsByTagName('head')[0].appendChild(cssStandard8);

var cssStyle = document.styleSheets[0];
var cssRules=cssStyle.cssRules;

var newRule='DIV {-webkit-transition-property: all;-webkit-transition-duration: 4s;padding:0%;margin:0%;font-size: 10px;left: 0%;top:0%;}';
cssStyle.insertRule(newRule,cssRules.length);


 function jsWait() {
        if (typeof signalArray =="undefined")
        {

            window.setTimeout(jsWait, 100);

        }
        else
        {
            initDiv();
			initStyle();

			changeHtmlDisplay();

			changeColor();
			changeColor();
			changeDropShadowSimple();
			changeRotate();
			changeRotate();
			changeRotate();
			changeRotate();
			//changeRotate();
			//changeRotate();
			changeDropShadowSimpleH()
			changeDropShadowSimpleV()

        }
    }


function initDiv(){
container=[];


for (i=0;i<=divCounter;i++){



//container[i].style.opacity=.61;
if (i==0){
//	container[i].style.background='transparent';
container[i]= document.createElement("div");
	document.body.appendChild(container[i]);
}
else {
	container[i]= document.createElement("div");
 container[0].appendChild(container[i]);
}

container[i].style.zIndex=0;
elementName='myid'+i;
container[i].id=elementName;
}
}

function initStyle(){

bgColChangeRate=200000;



var mycolors=['#000000','#000080','#00008B','#0000CD','#0000FF','#006400','#008000','#008080','#008B8B','#00BFFF','#00CED1'
,'#00FA9A','#00FF00','#00FF7F','#00FFFF','#00FFFF','#191970','#1E90FF','#20B2AA','#228B22','#2E8B57','#2F4F4F'
,'#2F4F4F','#32CD32','#3CB371','#40E0D0','#4169E1','#4682B4','#483D8B','#48D1CC','#4B0082','#556B2F','#5F9EA0'
,'#6495ED','#66CDAA','#696969','#696969','#6A5ACD','#6B8E23','#708090','#708090','#778899','#778899','#7B68EE'
,'#7CFC00','#7FFF00','#7FFFD4','#800000','#800080','#808000','#808080','#808080','#87CEEB','#87CEFA','#8A2BE2'
,'#8B0000','#8B008B','#8B4513','#8FBC8F','#90EE90','#9370DB','#9400D3','#98FB98','#9932CC','#9ACD32','#A0522D'
,'#A52A2A','#A9A9A9','#A9A9A9','#ADD8E6','#ADFF2F','#AFEEEE','#B0C4DE','#B0E0E6','#B22222','#B8860B','#BA55D3'
,'#BC8F8F','#BDB76B','#C0C0C0','#C71585','#CD5C5C','#CD853F','#D2691E','#D2B48C','#D3D3D3','#D3D3D3','#D8BFD8'
,'#DA70D6','#DAA520','#DB7093','#DC143C','#DCDCDC','#DDA0DD','#DEB887','#E0FFFF','#E6E6FA','#E9967A','#EE82EE'
,'#EEE8AA','#F08080','#F0E68C','#F0F8FF','#F0FFF0','#F0FFFF','#F4A460','#F5DEB3','#F5F5DC','#F5F5F5','#F5FFFA'
,'#F8F8FF','#FA8072','#FAEBD7','#FAF0E6','#FAFAD2','#FDF5E6','#FF0000','#FF00FF','#FF00FF','#FF1493','#FF4500'
,'#FF6347','#FF69B4','#FF7F50','#FF8C00','#FFA07A','#FFA500','#FFB6C1','#FFC0CB','#FFD700','#FFDAB9','#FFDEAD'
,'#FFE4B5','#FFE4C4','#FFE4E1','#FFEBCD','#FFEFD5','#FFF0F5','#FFF5EE','#FFF8DC','#FFFACD','#FFFAF0','#FFFAFA'
,'#FFFF00','#FFFFE0','#FFFFF0','#FFFFFF'];

container[0].style.position='fixed';
//container[0].style.height='1px';
//container[0].style.width='1px';
container[0].style.top=0;
container[0].style.left='0%';

	for (i=1;i<=divCounter;i++){
		container[i].style.textShadow=Math.round( Math.random()*10-5 ) + 'px '
									+Math.round( Math.random()*10-5 ) + 'px '
									+ mycolors[Math.round((mycolors.length-1)*Math.random())];
			container[i].innerHTML= '&#65792;';
			container[i].style.position='relative';
			container[i].style.cssFloat='left';
			container[i].style.fontSize= '90px';
								container[i].style.textShadow=Math.round( Math.random()*10-5 ) + 'px '
															+Math.round( Math.random()*10-5 ) + 'px '
									+ mycolors[Math.round((mycolors.length-1)*Math.random())];
			//container[i].style.width=Math.round(Math.random()*10) +'%)';
			//alert (container[i].id);
			//container[i].style.height=Math.round(Math.random()*5+1) +'%)';
			container[i].style.textAlign='center';
			container[i].style.verticalAlign='middle';
			container[i].style.borderRadius='5px';
			container[i].style.display='inline-block';
			container[i].style.lineHeight='3.5em';
			container[i].style.borderColor= mycolors[Math.round((mycolors.length-1)*Math.random())];
			container[i].style.backgroundColor= mycolors[Math.round((mycolors.length-1)*Math.random())];
			container[i].style.width=Math.round(Math.random()*5+1) +'%)';
			container[i].style.height=Math.round(Math.random()*5+100) +'%)';
			container[i].style.color= mycolors[Math.round((mycolors.length-1)*Math.random())];
			//container[i].style.webkitFilter= 'sepia('+ Math.round(Math.random()*500) +'%)';
			//container[i].style.webkitFilter= 'grayscale('+ Math.round(Math.random()*500) +'%)';
			//container[i].style.webkitFilter= 'saturate('+ Math.round(Math.random()*2000) +'%)';
			container[i].style.webkitTransform = 'rotate(' + Math.round(Math.random()*180) + 'deg)';

	}
}

function changeHtmlDisplay(){
	window.setInterval(function (){

		var inHtmlCount=Math.round(Math.random()*(divCounter-1)+1);
		//container[inHtmlCount].style.webkitTransform= 'skew('+ Math.round(Math.random()*180) +'deg,'+ Math.round(Math.random()*0) +'deg)';
		container[inHtmlCount].style.webkitTransform = 'rotate(' + Math.round(Math.random()*180) + 'deg)';
	},Math.random()*15000+15000 );
}

function changeColor(){
	var elem0_bg_color_chg=Math.random()*bgColChangeRate+40000;
	var elem0_bg_color=mycolors[Math.round((mycolors.length-1)*Math.random())];

	window.setInterval(function(){
	   	for (i=1;i<=divCounter;i++){
	    	container[i].style.backgroundColor= mycolors[Math.round((mycolors.length-1)*Math.random())];
	    	container[0].style.backgroundColor= mycolors[Math.round((mycolors.length-1)*Math.random())];
	   		container[i].style.color= mycolors[Math.round((mycolors.length-1)*Math.random())];
		}
	   },elem0_bg_color_chg);
}




function changeDropShadowSimple(){

		window.setInterval(function(){
			dropShadowCount=Math.round(Math.random()*(divCounter-1)+1);
			container[dropShadowCount].style.textShadow=Math.round( 0 ) + 'px '
										+Math.round( Math.random()*400-200 ) + 'px '
										+mycolors[Math.round((mycolors.length-1)*Math.random())];}
		,Math.random()*5000+1);
	}


function changeDropShadowSimpleV(){

		window.setInterval(function(){
			dropShadowCount=Math.round(Math.random()*(divCounter-1)+1);
			container[window.dropShadowCount].style.textShadow=Math.round( Math.random()*10-5 )+ 'px '
										+ Math.round( 0 ) + 'px '
										+mycolors[Math.round((mycolors.length-1)*Math.random())];}

		,Math.random()*5000+5000);

	}


function changeDropShadowSimpleH(){

		window.setInterval(function(){
			dropShadowCount=Math.round(Math.random()*(divCounter-1)+1);
			container[window.dropShadowCount].style.textShadow=Math.round( 0 )+ 'px '
										+ Math.round( Math.random()*10-5 ) + 'px '
										+mycolors[Math.round((mycolors.length-1)*Math.random())];}

		,Math.random()*5000+5000);

	}


function changeRotate(){

		window.setInterval(function(){
		var inHtmlCount=Math.round(Math.random()*(divCounter-1)+1);
		container[inHtmlCount].style.webkitTransform = 'rotate(' + Math.round(Math.random()*180) + 'deg)';

		},Math.random()*2500+1);
	}

jsWait();


signalArray=[];






