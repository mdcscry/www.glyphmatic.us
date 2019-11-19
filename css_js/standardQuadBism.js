
var cssStandardQuad = document.createElement('style');
document.getElementsByTagName('head')[0].appendChild(cssStandardQuad);

var cssStyle = document.styleSheets[0];
var cssRules=cssStyle.cssRules;

var newRule='@-' + browserPrefix +'-keyframes fadeOut{0%{-' + browserPrefix +'-filter:opacity(.71);}100%{-' + browserPrefix +'-filter:opacity(0);}} ';
cssStyle.insertRule(newRule,cssRules.length);
var newRule='@-' + browserPrefix +'-keyframes fadeIn{0%{-' + browserPrefix +'-filter:opacity(0);}100%{-' + browserPrefix +'-filter:opacity(.71);}}';
cssStyle.insertRule(newRule,cssRules.length);

var newRule='DIV {padding:0%;top:0%;left:0%;width:100%;height:100%;font-size:10em;line-height:1.1em;text-align:center;vertical-align:middle;z-index=-1;}';
cssStyle.insertRule(newRule,cssRules.length);

quadPosArray=[];
quadPosArray[1]=[0,0];
quadPosArray[2]=[0,50];
quadPosArray[3]=[50,0];
quadPosArray[4]=[50,50];

for (i=1;i<=window.divCounter;i++){
var newRule='#myid'+i+' {-' + browserPrefix +'-transition-property:all;-' + browserPrefix +'-transition-duration:3s;';
newRule+= 'top:'+quadPosArray[i][0]+'%;left:'+quadPosArray[i][1]+'%;';

if (i==1){

newRule+='background:transparent;overflow:hidden;Padding-top: 5vw;line-height:28vw;font-size:11vw; text-align:center;font-family:"jameel noori nastaleeq",aparajita,maya,sun-exta,"aksara bali","tuladha jejeg",aegyptus,aegean,anatolian,symbola,siddhanta,code2000;';
}else if  (i==2){
newRule+='background:transparent;overflow:hidden;Padding-top: 5vw;line-height:28vw;font-size:11vw; text-align:center;font-family:"Paktype Tehreer",kokila,code2000,"quivira",maya,"tibetan machine uni","aksara bali","tuladha jejeg",symbola,aegyptus,anatolian,aegean,siddhanta,code2000;';
}else if  (i==3){
newRule+='background:transparent;overflow:hidden;Padding-top: 5vw;line-height:28vw;font-size:11vw; text-align:center;font-family:"Pak nastaleeq",mangal,quivira,maya,jomolhari,"tuladha jejeg","aksara bali",symbola,aegyptus,anatolian,aegean,siddhanta,code2000;';
}else if  (i==4){
newRule+='background:transparent;overflow:hidden;Padding-top: 5vw;line-height:28vw;font-size:11vw; text-align:center;font-family:"fajer noori nastalique",utsaah,maya,"tibetan machine uni","microsoft himalaya",aharoni,"aksara bali","tuladha jejeg","paktype naqsh",aegyptus,symbola,anatolian,aegean,siddhanta,code2000;';
}



newRule+='vertical-align:middle;height:50%;width:50%;';
newRule+='position:relative;z-index=-1;letter-spacing:0em;}';
cssStyle.insertRule(newRule,cssRules.length);

var newRule='#myid'+i+'.display {-' + browserPrefix +'-transition-property:background-color,color,textShadow,lineHeight;-' + browserPrefix +'-transition-duration:3s,3s,3s,6s;-' + browserPrefix +'-animation-name:fadeIn; -' + browserPrefix +'-animation-duration:1s;-' + browserPrefix +'-animation-timing-function:ease-in-out;-' + browserPrefix +'-animation-delay:0s;-' + browserPrefix +'-animation-iteration-count:1; -' + browserPrefix +'-animation-direction:normal;-' + browserPrefix +'-animation-play-state:running;-' + browserPrefix +'-animation-fill-mode:both;position:absolute;z-index=-1;}';
cssStyle.insertRule(newRule,cssRules.length);
var newRule='#myid'+i+'.noDisplay{-' + browserPrefix +'-transition-property:background-color,color,textShadow,lineHeight;-' + browserPrefix +'-transition-duration:3s,3s,3s,6s;-' + browserPrefix +'-animation-name:fadeOut; -' + browserPrefix +'-animation-duration:1s;-' + browserPrefix +'-animation-timing-function:ease-in-out;-' + browserPrefix +'-animation-delay:0s;-' + browserPrefix +'-animation-iteration-count:1; -' + browserPrefix +'-animation-direction:normal;-' + browserPrefix +'-animation-play-state:running;-' + browserPrefix +'-animation-fill-mode:both;position:absolute;z-index=-1;}';
cssStyle.insertRule(newRule,cssRules.length);
}

var signalArray=[];


