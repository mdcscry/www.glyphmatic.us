
var cssStandardQuad = document.createElement('style');
document.getElementsByTagName('head')[0].appendChild(cssStandardQuad);

var cssStyle = document.styleSheets[0];
var cssRules=cssStyle.cssRules;

var newRule='@-' + browserPrefix +'-keyframes fadeOut{0%{-' + browserPrefix +'-filter:opacity(.71);}100%{-' + browserPrefix +'-filter:opacity(0);}} ';
cssStyle.insertRule(newRule,cssRules.length);
var newRule='@-' + browserPrefix +'-keyframes fadeIn{0%{-' + browserPrefix +'-filter:opacity(0);}100%{-' + browserPrefix +'-filter:opacity(.71);}}';
cssStyle.insertRule(newRule,cssRules.length);

var newRule='DIV {padding:0%;top:0%;left:0%;z-index=-1;}';
cssStyle.insertRule(newRule,cssRules.length);

quadPosArray=[];
quadPosArray[1]=[0,0];
quadPosArray[2]=[0,50];
quadPosArray[3]=[50,0];
quadPosArray[4]=[50,50];

for (i=1;i<=window.divCounter;i++){
var newRule='#myid'+i+' {-' + browserPrefix +'-transition-property:background-color,color;-' + browserPrefix +'-transition-duration:3s;';
newRule+= 'top:'+quadPosArray[i][0]+'%;left:'+quadPosArray[i][1]+'%;';

if (i==1){

newRule+='background:transparent;overflow:hidden;border:1px outset;top-padding:8vw;line-height:28vw;font-size:11vw;  text-align:center;';
}else if  (i==2){
newRule+='background:transparent;overflow:hidden;border:1px inset;top-padding:8vw;line-height:28vw;font-size:11vw; text-align:center;';
}else if  (i==3){
newRule+='background:transparent;overflow:hidden;border:1px outset;top-padding:8vw;line-height:28vw;font-size:11vw;  text-align:center;';
}else if  (i==4){
newRule+='background:transparent;overflow:hidden;border:1px inset;top-padding:8vw;line-height:28vw;font-size:11vw;  text-align:center;';
}



newRule+='height:50%;width:50%;';
newRule+='position:absolute;letter-spacing:0em;}';
cssStyle.insertRule(newRule,cssRules.length);

var newRule='#myid'+i+'.display {-' + browserPrefix +'-transition-property:background-color,color;-' + browserPrefix +'-transition-duration:3s,3s;-' + browserPrefix +'-animation-name:fadeIn; -' + browserPrefix +'-animation-duration:1s;-' + browserPrefix +'-animation-timing-function:ease-in-out;-' + browserPrefix +'-animation-delay:0s;-' + browserPrefix +'-animation-iteration-count:1; -' + browserPrefix +'-animation-direction:normal;-' + browserPrefix +'-animation-play-state:running;-' + browserPrefix +'-animation-fill-mode:both;position:absolute;z-index=-1;}';
cssStyle.insertRule(newRule,cssRules.length);
var newRule='#myid'+i+'.noDisplay{-' + browserPrefix +'-transition-property:background-color,color;-' + browserPrefix +'-transition-duration:3s,3s;-' + browserPrefix +'-animation-name:fadeOut; -' + browserPrefix +'-animation-duration:1s;-' + browserPrefix +'-animation-timing-function:ease-in-out;-' + browserPrefix +'-animation-delay:0s;-' + browserPrefix +'-animation-iteration-count:1; -' + browserPrefix +'-animation-direction:normal;-' + browserPrefix +'-animation-play-state:running;-' + browserPrefix +'-animation-fill-mode:both;position:absolute;z-index=-1;}';
cssStyle.insertRule(newRule,cssRules.length);
}

var signalArray=[];


