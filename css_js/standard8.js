
var cssStandard8 = document.createElement('style');
document.getElementsByTagName('head')[0].appendChild(cssStandard8);

var cssStyle = document.styleSheets[0];
var cssRules=cssStyle.cssRules;

var newRule='@-webkit-keyframes fadeOut{0%{-webkit-filter:opacity(.71);}100%{-webkit-filter:opacity(0);}} ';
cssStyle.insertRule(newRule,cssRules.length);
var newRule='@-webkit-keyframes fadeIn{0%{-webkit-filter:opacity(0);}100%{-webkit-filter:opacity(.71);}}';
cssStyle.insertRule(newRule,cssRules.length);

var newRule='DIV {padding:0%;margin:0%;top:-70%;left:-2.5%;width:100%;height:100%;font-size:1400px;text-align:center;vertical-align:middle;z-index=-1;}';
cssStyle.insertRule(newRule,cssRules.length);

var newRule='#myid2_bck{-webkit-transition-property:background-color,color,textShadow,skew;-webkit-transition-duration:3s,3s,3s,3s;position:absolute;padding-top:0%;left:0%;top:0%;width:100%;height:100%;font-size:700px;color:#FFFFFF;text-align:center;vertical-align:middle;opacity:1;z-index=-1;}';
cssStyle.insertRule(newRule,cssRules.length);
for (i=1;i<=window.divCounter;i++){
var newRule='#myid'+i+' {-webkit-transition-property:background-color,color,textShadow,skew;-webkit-transition-duration:3s,3s,3s,3s;background:transparent;padding:0px;margin:0px; text-align:center;height:100%;width:100%;position:absolute;z-index=-1;}';
cssStyle.insertRule(newRule,cssRules.length);
var newRule='#myid'+i+'.display {-webkit-transition-property:background-color,color,textShadow,skew;-webkit-transition-duration:3s,3s,3s,3s;-webkit-animation-name:fadeIn; -webkit-animation-duration:1s;-webkit-animation-timing-function:ease-in-out;-webkit-animation-delay:0s;-webkit-animation-iteration-count:1; -webkit-animation-direction:normal;-webkit-animation-play-state:running;-webkit-animation-fill-mode:both;position:absolute;z-index=-1;}';
cssStyle.insertRule(newRule,cssRules.length);
var newRule='#myid'+i+'.noDisplay{-webkit-transition-property:background-color,color,textShadow,skew;-webkit-transition-duration:3s,3s,3s,3s;-webkit-animation-name:fadeOut; -webkit-animation-duration:1s;-webkit-animation-timing-function:ease-in-out;-webkit-animation-delay:0s;-webkit-animation-iteration-count:1; -webkit-animation-direction:normal;-webkit-animation-play-state:running;-webkit-animation-fill-mode:both;position:absolute;z-index=-1;}';
cssStyle.insertRule(newRule,cssRules.length);
}

var signalArray=[];
