var cssStandard8 = document.createElement('style');
document.getElementsByTagName('head')[0].appendChild(cssStandard8);

var cssStyle = document.styleSheets[0];
var cssRules=cssStyle.cssRules;


    /* general background style */

		// Background container - full viewport coverage
		var backgroundRule = '#myid2_bck {' +
			'position: absolute !important;' +
			'top: 0% !important;' +
			'left: 0% !important;' +
			'width: 105% !important;' +
			'height: 200%' +
		'}';
		cssStyle.insertRule(backgroundRule, cssRules.length);

	/* This is the Animation Keyframe Section */

	if (insertArrayRnd==10){
		var newRule='@-' +  browserPrefix + '-keyframes fadeOut{0%{opacity:.31;}100%{opacity:0;}} ';
		cssStyle.insertRule(newRule,cssRules.length);

		var newRule='@-' +  browserPrefix + '-keyframes fadeIn{0%{opacity:0;}100%{opacity:.31;}}';
		cssStyle.insertRule(newRule,cssRules.length);
	} else {
		var newRule='@-' +  browserPrefix + '-keyframes fadeOut{0% {opacity:.71;}100%{opacity:0;}} ';
		cssStyle.insertRule(newRule,cssRules.length);

		var newRule='@-' +  browserPrefix + '-keyframes fadeIn{0%{opacity:0;}100%{opacity:.71;}}';
		cssStyle.insertRule(newRule,cssRules.length);
	}

	/* This styles Divs generally */

	if(insertArrayRnd==9){
			var newRule='DIV {position:absolute; top:0%; width:100%;height:100%; background:transparent; font-size: 150vmin; color:  blue; text-align:center; }';
			cssStyle.insertRule(newRule,cssRules.length);
	} else if (insertArrayRnd==10){
			var newRule='DIV {position:absolute; top:0%; left:0%; width:100%;height:100%;overflow:hidden;background:transparent; font-size: 20vmin; color:  blue; text-align:center; vertical-align: middle; }';
			cssStyle.insertRule(newRule,cssRules.length);
	} else if (insertArrayRnd==8){
			// Base DIV styles - common to all divs
			var newRule = 'DIV {' +
				'position: absolute;' +
				'top: 0%;' +
				'left: 0%;' +
				'width: auto' +
				'height: 200vh' +
				'overflow: visible;' +
				'background: transparent;' +
				'text-align: center;' +
				'vertical-align: middle;' +
			'}';
			cssStyle.insertRule(newRule, cssRules.length);
	} else {
		/* why do we even have this */
		var newRule='DIV {position:absolute;  top:0%;left:-10%; width:100%;height:100%; overflow:visible;background:transparent; font-size: 500px; color:  blue; text-align:center; vertical-align: middle; }';
		cssStyle.insertRule(newRule,cssRules.length);
	}

/* Style the individual Divs */

for (i=1;i<=window.divCounter;i++){

    if(insertArrayRnd==9){

        var newRule='#myid'+i+' {-' +  browserPrefix + '-transition-property: all,background,color; -' +  browserPrefix + '-transition-duration:3s, 3s,3s;background:transparent;margin:1%; text-align: center; height:100%; width:100%;left:-0%;top:-10%; font-size: 150vmin;}';
        cssStyle.insertRule(newRule,cssRules.length);

	} else if (insertArrayRnd==8){

		// Individual mandala containers
		var newRule = '#myid' + i + ' {' +
			'-' + browserPrefix + '-transition-property: all, background, color;' +
			'-' + browserPrefix + '-transition-duration: 3s, 3s, 3s;' +
			'overflow: visible !important;' +
			'background: transparent;' +
			'font-size: 75vmin;' +
			'left: 0%;' +
			'top: 5%;' +
			'text-align: center;' +
			'height:200vh;width:100vw;' +
		'}';
		cssStyle.insertRule(newRule, cssRules.length);

	} else { /* This would cover insert10? */

        var newRule='#myid'+i+' {-' +  browserPrefix + '-transition-property: all,background,color; -' +  browserPrefix + '-transition-duration: 3s,3s,3s;  margin:15%; text-align: center; height:100%; width:100%;left:-17%;}';
        cssStyle.insertRule(newRule,cssRules.length);
    }

	/* This adds the display and no display rules for all mandala inserts */

    var newRule='#myid'+i+'.display { -' +  browserPrefix + '-transition-property:all, background,color; -' +  browserPrefix + '-transition-duration: 21s,3s,3s; -' +  browserPrefix + '-animation-name: fadeIn; -' +  browserPrefix + '-animation-duration: 7s; -' +  browserPrefix + '-animation-timing-function: ease-out; -' +  browserPrefix + '-animation-delay: 0s; -' +  browserPrefix + '-animation-iteration-count: 1; -' +  browserPrefix + '-animation-direction: normal; -' +  browserPrefix + '-animation-play-state: running; -' +  browserPrefix + '-animation-fill-mode: both;}';
    cssStyle.insertRule(newRule,cssRules.length);
    
    var newRule='#myid'+i+'.noDisplay{-' +  browserPrefix + '-transition-property:all, background,color; -' +  browserPrefix + '-transition-duration: 21s,3s,3s; -' +  browserPrefix + '-animation-name: fadeOut; -' +  browserPrefix + '-animation-duration: 7s; -' +  browserPrefix + '-animation-timing-function: ease-in; -' +  browserPrefix + '-animation-delay: 0s; -' +  browserPrefix + '-animation-iteration-count: 1; -' +  browserPrefix + '-animation-direction: normal; -' +  browserPrefix + '-animation-play-state: running; -' +  browserPrefix + '-animation-fill-mode: both;}';
    cssStyle.insertRule(newRule,cssRules.length);
}

var signalArray=[];