console.log('standardQuad.js starting');
window.divCounter = 4;

var cssStandardQuad = document.createElement('style');
document.getElementsByTagName('body')[0].appendChild(cssStandardQuad);

var cssStyle = document.styleSheets[document.styleSheets.length - 1];

// Keyframe animations
cssStyle.insertRule('@keyframes fadeOut{0%{opacity:.71;}100%{opacity:0;}}', cssStyle.cssRules.length);
cssStyle.insertRule('@keyframes fadeIn{0%{opacity:0;}100%{opacity:.71;}}', cssStyle.cssRules.length);

// Base div styling
cssStyle.insertRule('DIV {padding:0%;margin:0%;top:0%;left:0%;width:100%;height:100%;font-size:10px;vertical-align:middle;z-index:21;}', cssStyle.cssRules.length);

// Quadrant positions
var quadPosArray = [];
quadPosArray[1] = [0, 0];
quadPosArray[2] = [0, 50];
quadPosArray[3] = [50, 0];
quadPosArray[4] = [50, 50];

// Create CSS rules for each quadrant
for (var i = 1; i <= window.divCounter; i++) {
	cssStyle.insertRule('#myid' + i + ' {transition-property:background,color,text-shadow;transition-duration:3s;top:' + quadPosArray[i][0] + '%;left:' + quadPosArray[i][1] + '%;background:transparent;overflow:hidden;box-sizing:border-box;padding-top:clamp(80px, 12vh, 150px);font-size:clamp(2rem, 8vw, 15rem);text-align:center;letter-spacing:2vw;word-wrap:break-word;line-height:clamp(1.2, 5vw, 2.5);height:50%;width:50%;position:absolute;z-index:1;}', cssStyle.cssRules.length);
	cssStyle.insertRule('#myid' + i + '.display {animation:fadeIn 1s ease-in-out both;}', cssStyle.cssRules.length);
    
    cssStyle.insertRule('#myid' + i + '.noDisplay{animation:fadeOut 1s ease-in-out both;}', cssStyle.cssRules.length);
}

var signalArray = [];
console.log('standardQuad.js completed, signalArray set');