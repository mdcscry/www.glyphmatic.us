
var cssStandardQuad = document.createElement('style');
document.getElementsByTagName('head')[0].appendChild(cssStandardQuad);

var cssStyle = document.styleSheets[0];
var cssRules=cssStyle.cssRules;


var cssImportRule = document.createElement('style');
document.getElementsByTagName('body')[0].appendChild(cssImportRule);

var cssImportStyle = document.styleSheets[1];
var cssImportRules=cssImportStyle.cssRules;

var newRule='@import url(http://fonts.googleapis.com/earlyaccess/notosanstelugu.css);';
cssImportStyle.insertRule(newRule,cssImportRules.length);
var newRule='@import url(http://fonts.googleapis.com/earlyaccess/gurajada.css);';//telugu
cssImportStyle.insertRule(newRule,cssImportRules.length);
var newRule='@import url(http://fonts.googleapis.com/earlyaccess/nanumbrushscript.css)';
cssImportStyle.insertRule(newRule,cssImportRules.length);
var newRule='@import url(http://fonts.googleapis.com/earlyaccess/tharlon.css);';
cssImportStyle.insertRule(newRule,cssImportRules.length);
var newRule='@import url(http://fonts.googleapis.com/earlyaccess/amiri.css);';
cssImportStyle.insertRule(newRule,cssImportRules.length);
var newRule='@import url(http://fonts.googleapis.com/earlyaccess/droidsanstamil.css);';
cssImportStyle.insertRule(newRule,cssImportRules.length);
var newRule='@import url(http://fonts.googleapis.com/earlyaccess/notosanscherokee.css);';
cssImportStyle.insertRule(newRule,cssImportRules.length);
var newRule='@import url(http://fonts.googleapis.com/earlyaccess/droidsansethiopic.css);';
cssImportStyle.insertRule(newRule,cssImportRules.length);
var newRule='@import url(http://fonts.googleapis.com/earlyaccess/droidsansthai.css);';
cssImportStyle.insertRule(newRule,cssImportRules.length);
var newRule='@import url(http://fonts.googleapis.com/earlyaccess/notosansgeorgian.css);';
cssImportStyle.insertRule(newRule,cssImportRules.length);
var newRule='@import url(http://fonts.googleapis.com/earlyaccess/notosansarmenian.css);';
cssImportStyle.insertRule(newRule,cssImportRules.length);
var newRule='@import url(http://fonts.googleapis.com/earlyaccess/notosanskannada.css);';
cssImportStyle.insertRule(newRule,cssImportRules.length);
var newRule='@import url(http://fonts.googleapis.com/earlyaccess/notosansosmanya.css);';
cssImportStyle.insertRule(newRule,cssImportRules.length);
var newRule='@import url(http://fonts.googleapis.com/earlyaccess/notosansmalayalam.css);';
cssImportStyle.insertRule(newRule,cssImportRules.length);
var newRule='@import url(http://fonts.googleapis.com/earlyaccess/laomuangdon.css);';
cssImportStyle.insertRule(newRule,cssImportRules.length);
var newRule='@import url(http://fonts.googleapis.com/css?family=Noto+Sans);';
cssImportStyle.insertRule(newRule,cssImportRules.length);
var newRule='@import url(http://fonts.googleapis.com/css?family=Odor+Mean+Chey);';
cssImportStyle.insertRule(newRule,cssImportRules.length);
var newRule='@import url(http://fonts.googleapis.com/earlyaccess/notonastaliqurdudraft.css);';//new
cssImportStyle.insertRule(newRule,cssImportRules.length);
var newRule='@import url(http://fonts.googleapis.com/earlyaccess/notosansbengali.css);'; //new
cssImportStyle.insertRule(newRule,cssImportRules.length);
var newRule='@import url(http://fonts.googleapis.com/earlyaccess/notosansdevanagari.css);';//new
cssImportStyle.insertRule(newRule,cssImportRules.length);
var newRule='@import url(http://fonts.googleapis.com/earlyaccess/notosansgujarati.css);';//new
cssImportStyle.insertRule(newRule,cssImportRules.length);
var newRule='@import url(http://fonts.googleapis.com/earlyaccess/notosansgurmukhi.css);';//new
cssImportStyle.insertRule(newRule,cssImportRules.length);
var newRule='@import url(http://fonts.googleapis.com/earlyaccess/notosansjapanese.css);';//new
cssImportStyle.insertRule(newRule,cssImportRules.length);
var newRule='@import url(http://fonts.googleapis.com/earlyaccess/notosanskhmer.css);';//new
cssImportStyle.insertRule(newRule,cssImportRules.length);
var newRule='@import url(http://fonts.googleapis.com/earlyaccess/notosansmyanmar.css);';//new tharlon
cssImportStyle.insertRule(newRule,cssImportRules.length);
var newRule='@import url(http://fonts.googleapis.com/earlyaccess/notosanstamil.css);';//new
cssImportStyle.insertRule(newRule,cssImportRules.length);
var newRule='@import url(http://fonts.googleapis.com/earlyaccess/notosanssinhala.css);';//new
cssImportStyle.insertRule(newRule,cssImportRules.length);
var newRule='@import url(http://fonts.googleapis.com/earlyaccess/notoserifarmenian.css);';//new
cssImportStyle.insertRule(newRule,cssImportRules.length);
var newRule='@import url(http://fonts.googleapis.com/earlyaccess/notoserifgeorgian.css);';//new
cssImportStyle.insertRule(newRule,cssImportRules.length);
var newRule='@import url(http://fonts.googleapis.com/earlyaccess/notoserifthai.css);';//new
cssImportStyle.insertRule(newRule,cssImportRules.length);

var newRule='@font-face {font-family: Noto Sans Symbols; src: url(http://glyphmatic.us/tff/NotoSansSymbols-Regular.woff) format("woff");}';
//var newRule='@font-face {font-family: Noto Sans Symbols; src: url(file:///C:/Users/mcryer/flasher/tff/NotoSansSymbols-Regular.woff) format("woff");}';
cssImportStyle.insertRule(newRule,cssImportRules.length);

var newRule='@font-face {font-family: Noto Sans Yi; src: url(http://glyphmatic.us/tff/NotoSansYi-Regular.woff) format("woff");}';
//var newRule='@font-face {font-family: Noto Sans Yi; src: url(file:///C:/Users/mcryer/flasher/tff/NotoSansYi-Regular.woff) format("woff");}';
cssImportStyle.insertRule(newRule,cssImportRules.length);

var newRule='@font-face {font-family: AdobeBlank; src: url(http://glyphmatic.us/tff/AdobeBlank.ttf.woff) format("woff");}';
//var newRule='@font-face {font-family: AdobeBlank; src: url(file:///C:/Users/mcryer/flasher/tff/AdobeBlank.ttf.woff) format("woff");}';
cssImportStyle.insertRule(newRule,cssImportRules.length);

var newRule='@font-face {font-family: Noto Sans Avestan; src: url(http://glyphmatic.us/tff/NotoSansAvestan-Regular.woff) format("woff");}';
//var newRule='@font-face {font-family: Noto Sans Avestan; src: url(file:///C:/Users/mcryer/flasher/tff/NotoSansAvestan-Regular.woff) format("woff");}';
cssImportStyle.insertRule(newRule,cssImportRules.length);


var newRule='@font-face {font-family: Noto Sans Vai; src: url(http://glyphmatic.us/tff/NotoSansVai-Regular.woff) format("woff");}';
//var newRule='@font-face {font-family: Noto Sans Vai; src: url(file:///C:/Users/mcryer/flasher/tff/NotoSansVai-Regular.woff) format("woff");}';
cssImportStyle.insertRule(newRule,cssImportRules.length);









if(browserPrefix != 'msie'){
var newRule='@-' + browserPrefix +'-keyframes fadeOut{0%{opacity:.71;}100%{opacity:0;}}';
cssStyle.insertRule(newRule,cssRules.length);
var newRule='@-' + browserPrefix +'-keyframes fadeIn{0%{opacity:0;}100%{opacity:.71;}}';
cssStyle.insertRule(newRule,cssRules.length);
}


var newRule='DIV {padding:0%;margin:0%;top:-0%;left:-0%;width:100%;height:100%;font-size:10px;text-align:center;vertical-align:middle;z-index:-1;}';

if(browserPrefix != 'msie'){
cssStyle.insertRule(newRule,cssRules.length);}
else {cssStyle.insertRule("DIV","padding:0%;",cssRules.length);}

quadPosArray=[];
quadPosArray[1]=[0,0];
quadPosArray[2]=[0,0];
quadPosArray[3]=[0,0];
quadPosArray[4]=[0,0];

for (i=1;i<=window.divCounter;i++){
var newRule='#myid'+i+' {-' + browserPrefix +'-transition-property:background,color,textShadow;-' + browserPrefix +'-transition-duration:3s,3s,3s,3s;top:'+quadPosArray[i][0]+'%;left:'+quadPosArray[i][1]+'%;top:0%;left:0%;background:transparent;overflow:hidden;font-size:900px;text-align:center;letter-spacing:.25em; word-wrap:normal;line-height:1.0em;vertical-align:middle;height:100%;width:100%;position:relative;z-index:-1;}';
cssStyle.insertRule(newRule,cssRules.length);

var newRule='#myid'+i+'.display {-' + browserPrefix +'-transition-property:background,color,textShadow;-' + browserPrefix +'-transition-duration:3s,3s,3s,3s;-' + browserPrefix +'-animation-name:fadeIn; -' + browserPrefix +'-animation-duration:1s;-' + browserPrefix +'-animation-timing-function:ease-in-out;-' + browserPrefix +'-animation-delay:0s;-' + browserPrefix +'-animation-iteration-count:1; -' + browserPrefix +'-animation-direction:normal;-' + browserPrefix +'-animation-play-state:running;-' + browserPrefix +'-animation-fill-mode:both;position:absolute;z-index:-1;}';
cssStyle.insertRule(newRule,cssRules.length);

var newRule='#myid'+i+'.noDisplay{-' + browserPrefix +'-transition-property:background,color,textShadow;-' + browserPrefix +'-transition-duration:3s,3s,3s,3s;-' + browserPrefix +'-animation-name:fadeOut; -' + browserPrefix +'-animation-duration:1s;-' + browserPrefix +'-animation-timing-function:ease-in-out;-' + browserPrefix +'-animation-delay:0s;-' + browserPrefix +'-animation-iteration-count:1; -' + browserPrefix +'-animation-direction:normal;-' + browserPrefix +'-animation-play-state:running;-' + browserPrefix +'-animation-fill-mode:both;position:absolute;z-index:-1;}';
cssStyle.insertRule(newRule,cssRules.length);

}

var signalArray=[];


