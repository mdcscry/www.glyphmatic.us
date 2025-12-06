divCounter=20;



var scriptCSS = document.createElement('script');
scriptCSS.src = "../js_layout/standard8_mandala.js";
document.getElementsByTagName('body')[0].appendChild(scriptCSS);


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

        // Stagger the interval starts
		
			// Start the two independent, offset timers for odd and even glyphs
			changeOddGlyphs();
			setTimeout(changeEvenGlyphs, 2000); // Offset the start of the even timer by 2 seconds
			changeBackgrounds();
        }
    }


function initDiv(){
container=[];

//used to track which div is getting the changes  not random
dropShadowCountB=Math.round(Math.random()*(divCounter-1)+1);
dropShadowCountH=Math.round(Math.random()*(divCounter-1)+1);
dropShadowCountV=Math.round(Math.random()*(divCounter-1)+1);
oddGlyphCount = divCounter % 2 === 0 ? divCounter - 1 : divCounter; // Start at highest odd number
evenGlyphCount = divCounter % 2 === 0 ? divCounter : divCounter - 1; // Start at highest even number



for (i=1;i<=divCounter;i++){
container[i]= document.createElement("div");
document.body.appendChild(container[i]);


if (i==2){
 bck_container=document.createElement("div");
 document.body.appendChild(bck_container);
 elementName='myid'+i+'_bck';
 bck_container.id=elementName;
 bck_container.style.zIndex=-1*(divCounter+1);
}

elementName='myid'+i;
container[i].id=elementName;
}

 elem2_bg = document.getElementById("myid2_bck");
 elem2_bg.style.transition = 'background-color 10s ease-in-out';


}

function initStyle(){

	// bgColChangeRate=100000;
	// animationPlayState=50000;

    bgColChangeRate=1000;
	animationPlayState=5000;
var mycolors=[];
var colNum=6;

setColor(Math.round(Math.random()*340),Math.round(Math.random()*800),Math.round(Math.random()*80),.3);
setColor(Math.round(Math.random()*340),Math.round(Math.random()*800),Math.round(Math.random()*80),.3);
setColor(Math.round(Math.random()*340),Math.round(Math.random()*800),Math.round(Math.random()*80),.3);
setColor(Math.round(Math.random()*340),Math.round(Math.random()*800),Math.round(Math.random()*80),.3);

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

mycolors2=['#080808','#101010','#181818','#202020','#282828','#303030','#383838','#404040','#484848'
,'#505050','#585858','#606060','#686868','#707070','#787878','#808080','#888888','#909090','#989898','#A0A0A0','#A8A8A8','#B0B0B0',
'#B8B8B8','#C0C0C0','#C8C8C8','#D0D0D0','#D8D8D8','#E0E0E0','#E8E8E8','#F0F0F0','#F8F8F8','#FFFFFF' ];

mycolors1=['#FF0000','#00FF00','#0000FF','#FFFF00','#00FFFF','#FF00FF '];

elem2_bg.style.backgroundColor= mycolors[Math.round((mycolors.length-1)*Math.random())];

	for (i=1;i<=divCounter;i++){
		container[i].style.position='fixed';
		container[i].style.top='-500px';
		// container[i].style.zIndex=i; // We will now use translateZ instead of z-index for layering
		container[i].style.opacity=.71;
		container[i].style.color=mycolors[Math.round((mycolors.length-1)*Math.random())];

	}


}


function initDisplayState(){
    originalViewState="display";
    changeViewState = "noDisplay";
    const shadowClasses = ['shadow-bi', 'shadow-h', 'shadow-v', 'shadow-none'];

    // Initialize each container with a starting depth (translateZ)
    for (i=1;i<=divCounter;i++){
        var item = myArray[Math.floor(Math.random() * myArray.length)];
        var randomFont = item.fonts[Math.floor(Math.random() * item.fonts.length)];
        // Assign a random shadow class on initialization
        const randomShadowClass = shadowClasses[Math.floor(Math.random() * shadowClasses.length)];
        
        container[i].innerHTML = '&#x' + item.glyph.toString(16) + ';';
        container[i].style.fontFamily = randomFont;
        // Combine the view state class with a shadow class
        container[i].className = `${originalViewState} ${randomShadowClass}`;
    }
}

function changeOddGlyphs(){
    window.setInterval(function (){
        // Decrement the odd counter by 2
        if(oddGlyphCount < 1){
            oddGlyphCount = divCounter % 2 === 0 ? divCounter - 1 : divCounter; // Reset to highest odd
        } else {
            oddGlyphCount -= 2;
        }
        
        // Ensure we don't go to index 0 or less
        if (oddGlyphCount > 0) {
            updateGlyph(container[oddGlyphCount]);
        }

    }, Math.random() * 4000 + 4000);
}

function changeEvenGlyphs(){
    window.setInterval(function (){
        // Decrement the even counter by 2
        if(evenGlyphCount < 2){
            evenGlyphCount = divCounter % 2 === 0 ? divCounter : divCounter - 1; // Reset to highest even
        } else {
            evenGlyphCount -= 2;
        }

        // Ensure we don't go to index 0 or less
        if (evenGlyphCount > 0) {
            updateGlyph(container[evenGlyphCount]);
        }

    }, Math.random() * 4000 + 4000);
}

function updateGlyph(currentElement) {
    const shadowClasses = ['shadow-bi', 'shadow-h', 'shadow-v', 'shadow-none'];
    const randomShadowClass = shadowClasses[Math.floor(Math.random() * shadowClasses.length)];

    // Check if the element is currently visible by looking for the originalViewState class
    if (currentElement.classList.contains(originalViewState)) {
        // Hide the element by replacing its classes
        currentElement.className = `${changeViewState} ${randomShadowClass}`;
    } else {
        // If hidden, update its content and prepare it to be shown
        var item = myArray[Math.floor(Math.random() * myArray.length)];
        var randomFont = item.fonts[Math.floor(Math.random() * item.fonts.length)];
        
        currentElement.innerHTML = '&#x' + item.glyph.toString(16) + ';';
        currentElement.style.fontFamily = randomFont;
        currentElement.style.color = mycolors[Math.floor(Math.random() * mycolors.length)]; // Change color while hidden
        // Show the element with its new shadow class
        currentElement.className = `${originalViewState} ${randomShadowClass}`;
    }
}

function changeBackgrounds(){
    window.setInterval(function(){
        var bgColor = mycolors[Math.floor(Math.random() * mycolors.length)];
        elem2_bg.style.backgroundColor = bgColor;
        
        // Optional: sync container backgrounds with main bg
        // for (i=1;i<=divCounter;i++){
        //     container[i].style.backgroundColor = bgColor;
        // }
    }, Math.random()*15000+15000); // Random between 15-30 seconds
}

jsWait();
