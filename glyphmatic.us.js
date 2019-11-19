
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<TITLE>glyphmatic</TITLE>

</head>


<STYLE type="text/css">
BODY { -webkit-transition-property: background-color;
	      -webkit-transition-duration: 1s;
	 }
DIV   {
	      -webkit-transition-property: background-color,color;
	      -webkit-transition-duration: 1s,1s;

    padding:0%;
    margin:0%;
    background:#FFFFFF;
    font-size: 15px;
    color:  #000000;
    left: 0%;
    top:10%;
    overflow: hidden;
}

</STYLE>


<body style="font-weight:900;font-family:'Arial Unicode MS'">





var fontChangeRate=10000;

var mycolors=['#FFFF00','#FF0000','#6600FF','#336600'];

document.body.style.backgroundColor= mycolors[Math.round((mycolors.length-1)*Math.random())];

 elementName='glyphmatic;
 divGlyph = document.createElement("div");

 divGlyph.innerHTML= '&#'+ langArray[1][2] + ';';

document.body.appendChild(divGlyph);

divGlyph.id=elementName;
divGlyph.style.position='absolute';
divGlyph.style.cssFloat='none';
divGlyph.style.backgroundColor= mycolors[Math.round((mycolors.length-1)*Math.random())];
divGlyph.style.color= 'White';

//divGlyph.style.opacity=Math.random()+.3;
divGlyph.style.top='0%';
divGlyph.style.left=0 + '%';
//divGlyph.style.width=140+'px';
//divGlyph.style.height=140+'px';
//divGlyph.style.borderRadius=100+'px';
//divGlyph.style.verticalAlign='bottom';
//divGlyph.style.padding='0px';
divGlyph.style.fontSize='15px';
divGlyph.style.textAlign='left';

}











</script>
</body></html>