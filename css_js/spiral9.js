
var cssSpiral8 = document.createElement('style');
document.getElementsByTagName('head')[0].appendChild(cssSpiral8);

cssSpiral8.title='cssSpiral8';

//alert (document.styleSheets[0].title);
var cssAnimation = document.styleSheets[0];
var cssRules=cssAnimation.cssRules;
//alert (cssRules);
var newRule='@-webkit-keyframes fadeOut{0%{-webkit-filter:opacity(.75);}100%{-webkit-filter:opacity(0);}} ';
cssAnimation.insertRule(newRule,cssRules.length);
var newRule='@-webkit-keyframes fadeIn{0%{-webkit-filter:opacity(0);}100%{-webkit-filter:opacity(.75);}}';
cssAnimation.insertRule(newRule,cssRules.length);

var newRule='DIV { position:absolute; padding:0%; margin:0%; left:-35%;top:-10%; background-color:#4000FF; font-size: 200px; color:  #4000FF; }';
cssAnimation.insertRule(newRule,cssRules.length);

var newRule='#myid2_bck{ -webkit-transition-property: background-color,color; -webkit-transition-duration: 3s,1.5s; position:absolute; padding-top:0%; left:0%;top:0%; width:100%;height:100%; background:#4000FF; font-size: 500px; color:  #4000FF; text-align:center; vertical-align: middle; opacity: 1; }';
cssAnimation.insertRule(newRule,cssRules.length);

for (i=1;i<=8;i++){
var newRule='#myid'+i+' { -webkit-transition-property: background-color,color;-webkit-transition-duration: 3s,1.5s; padding:0px; margin:0px; height:1px; width:1px; }';
cssAnimation.insertRule(newRule,cssRules.length);
var newRule='#myid'+i+'.display { -webkit-transition-property: background-color,color; -webkit-transition-duration: 3s,1.5s; -webkit-animation-name: fadeIn; -webkit-animation-duration: 20s; -webkit-animation-timing-function: ease-in-out; -webkit-animation-delay: 0s; -webkit-animation-iteration-count: 1; -webkit-animation-direction: normal; -webkit-animation-play-state: running; -webkit-animation-fill-mode: both; }';
cssAnimation.insertRule(newRule,cssRules.length);
var newRule='#myid'+i+'.noDisplay{ -webkit-transition-property: background-color,color; -webkit-transition-duration: 3s,1.5s; -webkit-animation-name: spiral'+i+'; -webkit-animation-duration: 20s; -webkit-animation-timing-function: ease-in-out; -webkit-animation-delay:' +Math.round(Math.random()*20+1)+'s; -webkit-animation-iteration-count: infinite; -webkit-animation-direction: alternate; -webkit-animation-fill-mode: both; }';
cssAnimation.insertRule(newRule,cssRules.length);
}


//spiral function



var newRuleSuffix = '}';
var innerRule='';
var animationPercentArr = [];
var populateCounter=720;
for (populatePercentArray=1;populatePercentArray<=1000;populatePercentArray++){
    animationPercentArr[populatePercentArray]=populateCounter/10;
populateCounter=populateCounter-1;
}


for (cssAnimationCounter=1;cssAnimationCounter <=8;cssAnimationCounter++){
var constant=Math.random(2)+.3;
var fermatPower=Math.random(1)+.45;
var newRulePrefix = '@-webkit-keyframes spiral'+ cssAnimationCounter + ' {';

for (i = 720; i >= 1; i--) {

    angle = i/10 ;

   	 var x = 45 - (Math.pow(angle,fermatPower)*constant * Math.cos(angle)); //fermats
   	 var y = 15 - (Math.pow(angle,fermatPower)*constant * Math.sin(angle)); //fermats

var innerRule=innerRule + animationPercentArr[i] +'% { left:' + x +'%; top:' + y + '%;}';
}
var newRule=newRulePrefix + innerRule + newRuleSuffix;
cssAnimation.insertRule(newRule,length);

}

var signalArray=[];
