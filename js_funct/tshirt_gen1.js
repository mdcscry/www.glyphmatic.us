

var linkFont=[];
var outString='';
var navGlyph=[];
var json_fonts;
var current_glyph_index = 1;
var main_color, background_color, text_color;
var current_theme = 'dark'; // Track current theme

// Tagline array
const taglines = [
    ' for nerds who nerds think are nerds',
    ' for geeks who geeks think are geeks',
    " for geeks who think nerds don't market well",
    " for nerds who think like geeks",
    " for geeks who wish they were nerds",
    " for nerds who want to be geeks",
    " for nerds who geeks think are nerds",
    " for geeks who nerds think are geeks",
    " for nerds who need better marketing"
];

// Command arrays
const html = ['&lt;style&gt;','&lt;b&gt;', '&lt;a&gt;', '&lt;strong&gt;', '&lt;em&gt;', '&lt;br&gt;', '&lt;head&gt;', '&lt;h1&gt;', '&lt;body&gt;', '&lt;select&gt;', '&lt;details&gt;', '&lt;search&gt;', '&lt;main&gt;'];
const css = ['rotate()', 'scale()', 'position', 'float', 'z-index', 'transform', 'animate', 'overflow', 'justify', 'right', 'center', 'static', 'relative', 'absolute', 'fixed', 'sticky', 'flex', 'cell', 'grid', 'color', 'align-self', 'gap', 'isolation', '!important', 'justify-self', 'mask', 'clip', 'offset', 'order', 'overscroll-behavior', 'place-self', 'rotate', 'scroll-behavior', 'white-space', '&amp;nbsp;', 'zoom'];
const javascript = ['===', '!=', 'return', 'hello world!', 'setTimeout', 'await', 'while', 'switch', 'try', 'if', 'get', 'random()', 'onClick', 'onChange', 'break', 'promise', 'pending', 'rejected', 'fulfilled', 'await promise', 'dom'];
const crypto = ['sha-1', 'sha-256', 'sha-384', 'sha-512', 'md5', 'sha-1-gen', 'sha-256-gen', 'sha-384-gen', 'sha-512-gen', 'md5-gen'];
const sql_commands = ['TRUNCATE','DELETE ALL','UNION','UNION ALL','OUTER JOIN','COALESCE','CONCAT','REPLACE','MIN','MAX','DROP TABLE','MERGE','ALTER TABLE','INSERT','UNION','FULL OUTER JOIN'];
const sysadmin_commands = ['#!','finger',
'#!', '/dev/null', 'rm -rf', 'kill -9', 'cat', 'man', 'cd', 'pwd', 'find/-', 'grep', '||', '&&',
'awk', 'chmod 777', 'tail -f', 'uptime', 'head', 'mount', 'sftp', 'scp', 'cron', 
'whoami', 'history',
'.*', '[a-zA-Z]', "perl -pe 's/perl/perl/g'", '!-1', '~/',
'touch'
,'touch touch','more','ping','less','Sudo','Exit 1',
'clear','alias','sleep','who','chown','curl','shutdown','reboot','halt','ctrl-z','ctrl-c','* * * * *','|', '`whoami`'
];
const git = ["rebase","commit","push -u","pull","add","init","clone","status","diff","restore","reset","checkout","merge","stash","fetch","remote","apply","cherry-pick","blame","commit-sha",
"commit-sha"];
const python = ['unique','factorize','get dummies','cut','pivot','melt','class','yield', 'await', 'self', 'none', 'true', 'false', 'pass', 'global', 'async', 'return', 'try', 'except', 'raise', 'del'];
const ml = ['random forest','nearest neighbors','perceptron','P(A|B)','decision tree',
    'Semi-Supervised','unsupervised','supervised','bagging','lasso','ensemble model','kernal','boost','gradient descent','regression','boosted'];
const adm = [
   'Bitrot','Fuck it, Ship it!','Onboarding','POC','High Priority',"Can't Fail",'Please Fix.',
   'meta','Quick Question','Action Item','Bug Fix','Life is Hard.','Stochastic','Random()','Vapor Ware','Age of Evals',
   'Temporally Ironic Glitch', "I'm late for a meeting!","NaN"
   //'Sonnet > Haiku'
];
const ai = [
    'LLM', 'foundation model', 'transformer', 'multimodal', 'RLHF', 'self-alignment',
    'Prompt Engineer', 'CoT', 'hallucination', 'token', 'zero-shot', 'deepfake', 'guardrails',
    'emergent behavior', 'jailbreak', 'human-in-the-loop', 'agent', 'RAG', 'vector', 'embedding', 'evals',
    'back propagation', 'neural net', 'agentic','hallucination','confabulation','emergent','context window',
    'deep research'
];

const datatypes = [
   'BIGINT','STRING','BOOL','FLOAT', 'INT64', 'NUMERIC', 'BIGNUMERIC', 'FLOAT64', 'BYTES',
    `<div style="white-space: pre;">[
          {   
                   JSON 
        }
]</div>`
    ,'DATE','DATETIME','TIMESTAMP','ARRAY','STRUCT','SMALLINT','DECIMAL','CHAR','VARCHAR','ENUM','BLOB'
];

const all_commands = html.concat(css, javascript, crypto, python, git, sysadmin_commands, sql_commands, ml, ai, datatypes);

$(function(){
    loadGenerator();
});

function loadGenerator() {
    $.getJSON('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBPEC-k91wzgVIMm9CZSJIINd-WKmR2Wmo', function(json) {
        // Filter out barcode, icon fonts, and other non-text fonts
        const excludeKeywords = ['barcode', 
            'material icons', 'material symbols', 
            'jacqard', 'wavefont',
            'flow','yarndings','guides','redacted','charted'
        ];
        
        // Filter out bad mono fonts
        const excludeSpecificFonts = [
            'Sixtyfour', 'Workbench', 'Monofett', 'Martian Mono SemiExpanded','Sixtyfour Convergence'
        ];    
        
        var filtered_items = json.items.filter(function(font) {
            var fontName = font.family.toLowerCase();
            
            // Check keyword exclusions
            var isKeywordExcluded = excludeKeywords.some(function(keyword) {
                return fontName.includes(keyword);
            });
            
            // NEW: Check specific font name exclusions
            var isSpecificFontExcluded = excludeSpecificFonts.includes(font.family);
            
            return !isKeywordExcluded && !isSpecificFontExcluded; // Only return fonts that are NOT excluded
        });
        
        // Replace original items with filtered list
        json.items = filtered_items;
        json_fonts = json;
        
        // Load Google Fonts dynamically
        for (i=1;i<=json.items.length-1;i++){
            for (subsetCnt=0;subsetCnt<=json.items[i].subsets.length-1;subsetCnt++){
                if (JSON.stringify(json.items[i].subsets[subsetCnt]) == '"latin"'){
                    linkFont[i] = document.createElement('link');
                    document.getElementsByTagName('head')[0].appendChild(linkFont[i]);
                    linkFont[i].id=JSON.stringify(json.items[i].family).replace(/"/g,"")
                    linkFont[i].rel = 'stylesheet';
                    linkFont[i].type = 'text/css';
                    linkFont[i].href = 'https://fonts.googleapis.com/css?family=' + JSON.stringify(json.items[i].family).replace(/"/g,"") ;
                }
            }
        }

        // Load monospace fonts for menu using FontUtility
        FontUtility.loadMonospaceFonts();

        createGlyph();
        bindEvents();
        loadStateFromURL();
        applyTheme();

        // Set random tagline (only once per session)
        var taglineText = document.getElementById('taglineText');
        if (taglineText) {
            taglineText.textContent = taglines[Math.floor(Math.random() * taglines.length)];
        }
    });
}

function createGlyph() {
    // Clear existing glyph
    if (navGlyph[current_glyph_index]) {
        navGlyph[current_glyph_index].remove();
    }

    // Set background
    setBackground();

    // Get command array based on checkboxes
    var command_array = getActiveCommandArray();
    
    var font=JSON.stringify(json_fonts.items[Math.round((json_fonts.items.length-1)*Math.random())].family);
    var elementName='glyphmatic' + current_glyph_index;
    navGlyph[current_glyph_index] = document.createElement("div");
    navGlyph[current_glyph_index].className = "generated-glyph";
    document.body.appendChild(navGlyph[current_glyph_index]);
    
    var command_text = command_array[Math.round((command_array.length-1)*Math.random())];
    
    // Check if it's a crypto hash generation command
    if (command_text.endsWith('-gen')) {
        (async function() {
            var hash = await generateHash(command_text);
            if (document.getElementById('breakCheck').checked) {
                hash = hash.replace(' ', '<br>');
                navGlyph[current_glyph_index].classList.add('has-break');
            }
            navGlyph[current_glyph_index].innerHTML = hash;
        })();
        command_text = 'generating...';
    }
    
    // Add break if checkbox is checked
    if (document.getElementById('breakCheck').checked && !command_text.endsWith('-gen')) {
        command_text = command_text.replace(' ', '<br>');
        navGlyph[current_glyph_index].classList.add('has-break');
    }
    
    navGlyph[current_glyph_index].innerHTML = command_text;
    navGlyph[current_glyph_index].id = elementName;
    
    // Apply random font
    navGlyph[current_glyph_index].style.fontFamily = font;
    
    // Dynamic font size based on string length
    var text_length = command_text.replace('<br>', '').length;
    var font_size = 200;
    if (text_length > 15) {
        font_size = 120;
    } else if (text_length > 10) {
        font_size = 150;
    } else if (text_length > 6) {
        font_size = 180;
    }
    navGlyph[current_glyph_index].style.fontSize = font_size + 'px';
    
    // Random padding
    var padding = 3 + Math.round(Math.random() * 15);
    if (document.getElementById('breakCheck').checked) {
        padding += 20;
    }
    navGlyph[current_glyph_index].style.padding = padding + 'px';
    
    // Apply random styling
    applyRandomStyling();
    
    // Add border if checkbox is checked
    if (document.getElementById('borderCheck').checked) {
        addRandomBorder();
    }
}

function applyRandomStyling() {
    var mycolors = generateRandomColors();

    // Apply colors and effects
    navGlyph[current_glyph_index].style.color = mycolors[Math.round((mycolors.length-1)*Math.random())];

    // Create a distinct shadow - either much darker or much lighter
    var shadowStyle = Math.random() < 0.7 ? 'dark' : 'light';
    var shadowColor;
    if (shadowStyle === 'dark') {
        // Dark shadow (traditional)
        var shadowHue = Math.round(Math.random() * 360);
        shadowColor = 'hsla(' + shadowHue + ',' + (20 + Math.round(Math.random() * 40)) + '%,' + (5 + Math.round(Math.random() * 20)) + '%,0.8)';
    } else {
        // Light glow/highlight
        var shadowHue = Math.round(Math.random() * 360);
        shadowColor = 'hsla(' + shadowHue + ',' + (50 + Math.round(Math.random() * 50)) + '%,' + (75 + Math.round(Math.random() * 20)) + '%,0.9)';
    }

    // Ensure shadow has both horizontal and vertical offset (no purely vertical/horizontal shadows)
    var shadowX = Math.random() < 0.5 ?
                  Math.round(Math.random() * 3 + 1) :  // 1 to 4px
                  Math.round(Math.random() * 3 + 1) * -1; // -1 to -4px
    var shadowY = Math.random() < 0.5 ?
                  Math.round(Math.random() * 3 + 1) :
                  Math.round(Math.random() * 3 + 1) * -1;

    navGlyph[current_glyph_index].style.textShadow = shadowX + 'px ' + shadowY + 'px ' + shadowColor;
    navGlyph[current_glyph_index].style.webkitTextFillColor = mycolors[Math.round((mycolors.length-1)*Math.random())];
    navGlyph[current_glyph_index].style.webkitTextStrokeWidth = Math.round(Math.random()*3-1) + "px";
    navGlyph[current_glyph_index].style.webkitTextStrokeColor = mycolors[Math.round((mycolors.length-1)*Math.random())];
}

function generateRandomColors() {
    var mycolors = [];

    // Pure color palette - high saturation, vibrant
    var pureColors = ['#00ffff','#FF0000','#FFA500','#ffff00','#00ff00',
                      '#FF66FF','#1E90FF','#FF1493','#00FF7F','#FF4500'];

    // Decide on palette style
    var styleRoll = Math.random();

    if (styleRoll < 0.3) {
        // 30% chance: Pure colors only (1-2 pure colors + harmonious support colors)
        var pureCount = 1 + Math.floor(Math.random() * 2); // 1 or 2 pure colors
        for (var i = 0; i < pureCount; i++) {
            mycolors.push(pureColors[Math.floor(Math.random() * pureColors.length)]);
        }

        // Fill the rest with harmonious support colors (desaturated or lighter/darker)
        var baseHue = Math.round(Math.random() * 360);
        while (mycolors.length < 5) {
            var sat = 30 + Math.round(Math.random() * 40); // 30-70% saturation
            var light = 30 + Math.round(Math.random() * 50); // 30-80% lightness
            mycolors.push('hsla(' + baseHue + ',' + sat + '%,' + light + '%,1)');
            baseHue = (baseHue + 30) % 360; // shift hue slightly
        }

    } else if (styleRoll < 0.6) {
        // 30% chance: Harmonious scheme (analogous, complementary, triadic)
        var baseHue = Math.round(Math.random() * 360);
        var schemes = ['analogous', 'complementary', 'triadic'];
        var scheme = schemes[Math.floor(Math.random() * schemes.length)];

        if (scheme === 'analogous') {
            // Colors close on the wheel
            for (var i = 0; i < 5; i++) {
                var hue = (baseHue + (i * 25 - 50) + 360) % 360;
                var sat = 60 + Math.round(Math.random() * 35);
                var light = 40 + Math.round(Math.random() * 40);
                mycolors.push('hsla(' + hue + ',' + sat + '%,' + light + '%,1)');
            }
        } else if (scheme === 'complementary') {
            var hues = [baseHue, (baseHue + 180) % 360];
            for (var i = 0; i < 5; i++) {
                var hue = hues[i % 2];
                var sat = 55 + Math.round(Math.random() * 40);
                var light = 35 + Math.round(Math.random() * 45);
                mycolors.push('hsla(' + hue + ',' + sat + '%,' + light + '%,1)');
            }
        } else { // triadic
            var hues = [baseHue, (baseHue + 120) % 360, (baseHue + 240) % 360];
            for (var i = 0; i < 5; i++) {
                var hue = hues[i % 3];
                var sat = 60 + Math.round(Math.random() * 35);
                var light = 40 + Math.round(Math.random() * 40);
                mycolors.push('hsla(' + hue + ',' + sat + '%,' + light + '%,1)');
            }
        }

    } else {
        // 40% chance: Monochromatic with varying saturation/lightness
        var baseHue = Math.round(Math.random() * 360);

        // Sometimes include one pure color as accent
        if (Math.random() < 0.4) {
            mycolors.push(pureColors[Math.floor(Math.random() * pureColors.length)]);
        }

        while (mycolors.length < 5) {
            var sat = 40 + Math.round(Math.random() * 60);
            var light = 25 + Math.round(Math.random() * 60);
            mycolors.push('hsla(' + baseHue + ',' + sat + '%,' + light + '%,1)');
        }
    }

    return mycolors;
}

function getActiveCommandArray() {
    var command_type = document.getElementById('commandSelect').value;
    var browser_wrapper = document.getElementById('commandBrowserWrapper');
    var command_browser = document.getElementById('commandBrowser');

    // If browse mode is active and a command is selected, return just that command
    if (browser_wrapper.style.display !== 'none' && command_browser.value) {
        return [command_browser.value];
    }

    switch(command_type) {
        case 'html': return html;
        case 'css': return css;
        case 'javascript': return javascript;
        case 'crypto': return crypto;
        case 'sql': return sql_commands;
        case 'sysadmin': return sysadmin_commands;
        case 'git': return git;
        case 'python': return python;
        case 'ml': return ml;
        case 'ai': return ai;
        case 'datatype': return datatypes;
        case 'adm': return adm;
        case 'custom':
            var custom_text = document.getElementById('customTextInput').value.trim();
            return custom_text ? [custom_text] : ['Enter text above'];
        case 'all':
        default: return all_commands;
    }
}

function populateCommandBrowser() {
    var command_type = document.getElementById('commandSelect').value;
    var command_browser = document.getElementById('commandBrowser');
    var command_array = [];

    // Get the appropriate command array based on type
    switch(command_type) {
        case 'html': command_array = html; break;
        case 'css': command_array = css; break;
        case 'javascript': command_array = javascript; break;
        case 'crypto': command_array = crypto; break;
        case 'sql': command_array = sql_commands; break;
        case 'sysadmin': command_array = sysadmin_commands; break;
        case 'git': command_array = git; break;
        case 'python': command_array = python; break;
        case 'ml': command_array = ml; break;
        case 'ai': command_array = ai; break;
        case 'datatype': command_array = datatypes; break;
        case 'adm': command_array = adm; break;
        case 'all': command_array = all_commands; break;
        default: command_array = all_commands; break;
    }

    // Clear and populate dropdown
    command_browser.innerHTML = '';
    command_array.forEach(function(cmd) {
        var option = document.createElement('option');
        option.value = cmd;
        option.textContent = cmd;
        command_browser.appendChild(option);
    });

    // Select first item by default
    if (command_array.length > 0) {
        command_browser.selectedIndex = 0;
    }
}

function addRandomBorder() {
    var border_styles = ['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset'];
    var border_style = border_styles[Math.floor(Math.random() * border_styles.length)];
    var border_width = Math.floor(Math.random() * 50) + 1;
    var border_color = getContrastingBorderColor();
    
    navGlyph[current_glyph_index].style.border = border_width + 'px ' + border_style + ' ' + border_color;
}

function getContrastingBorderColor() {
    var bg_color = getComputedStyle(document.body).backgroundColor;
    
    if (bg_color === 'rgb(255, 255, 255)' || bg_color === 'white') {
        // White background - use dark/saturated colors
        var dark_hues = [0, 210, 270];
        var hue = dark_hues[Math.floor(Math.random() * dark_hues.length)];
        return 'hsl(' + hue + ', ' + (60 + Math.floor(Math.random() * 40)) + '%, ' + (20 + Math.floor(Math.random() * 30)) + '%)';
    } else if (bg_color === 'rgb(128, 128, 128)' || bg_color === 'gray' || bg_color === 'grey') {
        // Gray background - use bright or dark saturated colors
        var contrast_hues = [0, 120, 240];
        var hue = contrast_hues[Math.floor(Math.random() * contrast_hues.length)];
        var lightness = Math.random() < 0.5 ? (10 + Math.floor(Math.random() * 30)) : (70 + Math.floor(Math.random() * 30));
        return 'hsl(' + hue + ', ' + (70 + Math.floor(Math.random() * 30)) + '%, ' + lightness + '%)';
    } else {
        // Black or random dark background - use bright colors
        return 'hsl(' + Math.floor(Math.random() * 360) + ', ' + (70 + Math.floor(Math.random() * 30)) + '%, ' + (60 + Math.floor(Math.random() * 35)) + '%)';
    }
}

function setBackground() {
    var bg_select = document.getElementById('bgSelect').value;
    
    switch(bg_select) {
        case 'black':
            document.body.style.backgroundColor = 'black';
            current_theme = 'dark';
            break;
        case 'white':
            document.body.style.backgroundColor = 'white';
            current_theme = 'white';
            break;
        case 'gray':
            document.body.style.backgroundColor = 'gray';
            current_theme = 'gray';
            break;
        case 'random':
            var random_color = 'hsl(' + Math.floor(Math.random() * 360) + ', ' + 
                             Math.floor(Math.random() * 100) + '%, ' + 
                             Math.floor(Math.random() * 50) + '%)';
            document.body.style.backgroundColor = random_color;
            current_theme = 'dark';
            break;
    }
    console.log("setBackground(): current_theme set to:", current_theme); // <-- ADD THIS LOG
}

function applyTheme() {
    // ... [theme class application code] ...

    // Use current_theme to determine which color array to use
    var colorsToUse;
    
    if (current_theme === 'white') {
        console.log("applyTheme(): Entering WHITE theme logic."); // <-- ADD THIS LOG
        colorsToUse = ['#00ffff','#FF0000','#FFA500','#ffff00'
            ,'#00ff00','#FF66FF','#FA8072','#FF6347','#1E90FF'
            ,'#98FB98','#BA55D3'];
        background_color = 'rgba(255, 255, 255, 0.9)';
    } else if (current_theme === 'gray') {
        console.log("applyTheme(): Entering GRAY theme logic."); // <-- ADD THIS LOG
        colorsToUse = ['#00ffff','#FF0000','#ffff00'
            ,'#00ff00','#FF66FF','#FA8072','#FF6347','#1E90FF'
            ,'#98FB98','#BA55D3'];
        background_color = 'rgba(140, 140, 140, 0.9)'; 
    } else { // This is the expected 'dark' or 'random' path
        console.log("applyTheme(): Entering DARK/RANDOM theme logic."); // <-- ADD THIS LOG 
     
        colorsToUse = ['#00ffff','#FF0000','#FFA500','#ffff00'
            ,'#00ff00','#FF66FF','#FA8072','#FF6347','#1E90FF'
            ,'#98FB98','#BA55D3']; 
         
        background_color = 'rgba(0, 0, 0, 0.9)';
    }
    
    // Perform randomization once the array is chosen
    main_color = colorsToUse[Math.floor(Math.random() * colorsToUse.length)];
    text_color = main_color;
    
    console.log("applyTheme(): Colors array size:", colorsToUse.length); // <-- ADD THIS LOG
    console.log("applyTheme(): Final main_color chosen:", main_color); // <-- ADD THIS LOG

    


    // Apply CSS variables
    document.documentElement.style.setProperty('--main-color', main_color);
    document.documentElement.style.setProperty('--background-color', background_color);
    document.documentElement.style.setProperty('--text-color', text_color);
    
    // FINAL FIX: Directly set the color on the main containers
    var themedElements = document.querySelectorAll('#controls, #tagline, #manPage');
    themedElements.forEach(function(el) {
        // This overrides the CSS Variable inheritance entirely and forces the color
        el.style.color = text_color; 
        el.style.borderColor = main_color; // For the border-color consistency
    });


    // Apply random font to controls
    applyRandomMenuFont();
}

function applyRandomMenuFont() {
    // Use FontUtility to get a random monospace font (no filtering needed!)
    var selectedFontFamily = FontUtility.getRandomMonospaceFont();
    
    // 2. Format the string for CSS: wrap in quotes if it contains spaces.
    // This is the clean replacement for the incorrect JSON.stringify()
    var menu_font;
    if (selectedFontFamily.includes(' ')) {
        // e.g., "Courier New"
        menu_font = `"${selectedFontFamily}"`; 
    } else {
        // e.g., Inconsolata
        menu_font = selectedFontFamily;         
    }
    
    // Apply font to themed elements
    var themedElements = document.querySelectorAll('#controls, #tagline, #manPage');
    themedElements.forEach(function(el) {
        // Now applying a correctly formatted CSS value
        el.style.fontFamily = menu_font;
    });
}

async function changeCommand() {
    var command_array = getActiveCommandArray();
    var command_text = command_array[Math.round((command_array.length-1)*Math.random())];
    
    if (command_text.endsWith('-gen')) {
        command_text = await generateHash(command_text);
    }
    else if (command_text === 'commit-sha') {
        var randomData = Math.random().toString() + Date.now().toString();
        var fullHash = sha256(randomData);
        command_text = 'commit: ' + fullHash.substring(0, 7);
    }
    
    if (document.getElementById('breakCheck').checked) {
        command_text = command_text.replace(' ', '<br>');
        navGlyph[current_glyph_index].classList.add('has-break');
    } else {
        navGlyph[current_glyph_index].classList.remove('has-break');
    }
    
    navGlyph[current_glyph_index].innerHTML = command_text;
}

async function generateHash(hashType) {
    var algorithm = hashType.replace('-gen', '');
    var randomData = Math.random().toString() + Date.now().toString() + Math.random().toString();
    var hashHex;
    
    switch(algorithm) {
        case 'sha-1':
            hashHex = sha1(randomData);
            break;
        case 'sha-256':
            hashHex = sha256(randomData);
            break;
        case 'sha-384':
            hashHex = sha384(randomData);
            break;
        case 'sha-512':
            hashHex = sha512(randomData);
            break;
        case 'md5':
            if (typeof md5 === 'function') {
                hashHex = md5(randomData);
            } else {
                console.error('md5 library not loaded');
                hashHex = sha256(randomData); // Fallback to sha256
            }
            break;
        default:
            hashHex = sha256(randomData);
    }
    
    var formattedHash = algorithm + ':<br>';
    for (var i = 0; i < hashHex.length; i += 64) {
        formattedHash += hashHex.substring(i, i + 64);
        if (i + 64 < hashHex.length) {
            formattedHash += '<br>';
        }
    }
    
    return formattedHash;
}

function changeFont() {
        console.log('current_glyph_index:', current_glyph_index);
    console.log('navGlyph:', navGlyph);
    console.log('navGlyph[current_glyph_index]:', navGlyph[current_glyph_index]);
    var font = json_fonts.items[Math.round((json_fonts.items.length-1)*Math.random())].family;
      console.log('Selected font:', font);
    navGlyph[current_glyph_index].style.fontFamily = font;
}

function changeFontStyle() {
    var stroke_color = 'hsl(' + Math.floor(Math.random() * 360) + ', ' +
                      (60 + Math.floor(Math.random() * 40)) + '%, ' +
                      (30 + Math.floor(Math.random() * 50)) + '%)';
    var fill_color = 'hsl(' + Math.floor(Math.random() * 360) + ', ' +
                    (60 + Math.floor(Math.random() * 40)) + '%, ' +
                    (30 + Math.floor(Math.random() * 50)) + '%)';
    var shadow_color = 'hsl(' + Math.floor(Math.random() * 360) + ', ' +
                      (60 + Math.floor(Math.random() * 40)) + '%, ' +
                      (30 + Math.floor(Math.random() * 50)) + '%)';
    
    var offset_x = Math.floor(Math.random() * 20) - 10;
    var offset_y = Math.floor(Math.random() * 20) - 10;
    var blur = Math.floor(Math.random() * 20);

    navGlyph[current_glyph_index].style.webkitTextStrokeWidth = Math.floor(Math.random() * 6) + 'px';
    navGlyph[current_glyph_index].style.webkitTextStrokeColor = stroke_color;
    navGlyph[current_glyph_index].style.webkitTextFillColor = fill_color;
    navGlyph[current_glyph_index].style.textShadow = offset_x + 'px ' + offset_y + 'px ' + blur + 'px ' + shadow_color;
}

function changeFontRender() {
    var weights = ['normal', 'bold', '100', '300', '500', '700', '900'];
    var styles = ['normal', 'italic', 'oblique'];
    var transforms = ['none', 'uppercase', 'lowercase', 'capitalize'];
    
    navGlyph[current_glyph_index].style.fontWeight = weights[Math.floor(Math.random() * weights.length)];
    navGlyph[current_glyph_index].style.fontStyle = styles[Math.floor(Math.random() * styles.length)];
    navGlyph[current_glyph_index].style.textTransform = transforms[Math.floor(Math.random() * transforms.length)];
}

function changeBorderColor() {
    if (navGlyph[current_glyph_index] && navGlyph[current_glyph_index].style.border && navGlyph[current_glyph_index].style.border !== 'none') {
        var border_color = getContrastingBorderColor();
        var current_border = navGlyph[current_glyph_index].style.border;
        var width_match = current_border.match(/(\d+)px/);
        var style_match = current_border.match(/\s(solid|dashed|dotted|double|groove|ridge|inset|outset)\s/);
        
        var width = width_match ? width_match[1] + 'px' : '2px';
        var style = style_match ? style_match[1] : 'solid';
        
        navGlyph[current_glyph_index].style.border = width + ' ' + style + ' ' + border_color;
    }
}

function changeBorderStyle() {
    if (navGlyph[current_glyph_index] && navGlyph[current_glyph_index].style.border && navGlyph[current_glyph_index].style.border !== 'none') {
        var border_styles = ['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset'];
        var new_style = border_styles[Math.floor(Math.random() * border_styles.length)];
        var new_width = (Math.floor(Math.random() * 50) + 1) + 'px';

        // Extract current border color
        var current_border = navGlyph[current_glyph_index].style.border;
        var color_match = current_border.match(/rgb\([^)]+\)|#[0-9a-f]{6}|#[0-9a-f]{3}|[a-z]+$/i);
        var current_color = color_match ? color_match[0] : 'black';

        navGlyph[current_glyph_index].style.border = new_width + ' ' + new_style + ' ' + current_color;
    }
}

function biggerBorder() {
    if (navGlyph[current_glyph_index]) {
        var current_padding = parseInt(navGlyph[current_glyph_index].style.padding) || 10;
        var new_padding = Math.min(current_padding + 10, 500);
        navGlyph[current_glyph_index].style.padding = new_padding + 'px';
    }
}

function smallerBorder() {
    if (navGlyph[current_glyph_index]) {
        var current_padding = parseInt(navGlyph[current_glyph_index].style.padding) || 10;
        var new_padding = Math.max(current_padding - 10, 0);
        navGlyph[current_glyph_index].style.padding = new_padding + 'px';
    }
}

function moreTopPadding() {
    if (navGlyph[current_glyph_index]) {
        var current_padding = parseInt(navGlyph[current_glyph_index].style.paddingTop) || 0;
        var new_padding = Math.min(current_padding + 10);
        navGlyph[current_glyph_index].style.paddingTop = new_padding + 'px';
    }
}

function lessTopPadding() {
    if (navGlyph[current_glyph_index]) {
        var current_padding = parseInt(navGlyph[current_glyph_index].style.paddingTop) || 0;
        var new_padding = Math.max(current_padding - 10, 0);
        navGlyph[current_glyph_index].style.paddingTop = new_padding + 'px';
    }
}

function biggerFont() {
    var current_size = parseInt(navGlyph[current_glyph_index].style.fontSize) || 200;
    var new_size = Math.min(current_size + 20, 1200);
    navGlyph[current_glyph_index].style.fontSize = new_size + 'px';
}

function smallerFont() {
    var current_size = parseInt(navGlyph[current_glyph_index].style.fontSize) || 200;
    var new_size = Math.max(current_size - 20, 20);
    navGlyph[current_glyph_index].style.fontSize = new_size + 'px';
}

async function downloadPNG() {
    try {
        const glyphElement = navGlyph[current_glyph_index];
        
        const tempContainer = document.createElement('div');
        tempContainer.style.backgroundColor = getComputedStyle(document.body).backgroundColor;
        tempContainer.style.display = 'inline-block';
        tempContainer.style.padding = '50px';
        
        const clone = glyphElement.cloneNode(true);
        clone.style.position = 'relative';
        clone.style.transform = 'none';
        clone.style.top = 'auto';
        clone.style.left = 'auto';
        
        tempContainer.appendChild(clone);
        document.body.appendChild(tempContainer);
        
        const dataUrl = await domtoimage.toPng(tempContainer);
        document.body.removeChild(tempContainer);
        
        const link = document.createElement('a');
        link.download = 'the-generator-' + Date.now() + '.png';
        link.href = dataUrl;
        link.click();
        
    } catch (error) {
        console.error('Download failed:', error);
        console.log('Download failed - check console for details');
    }
}

function bindEvents() {
    document.getElementById('refreshBtn').addEventListener('click', function() {
        location.reload();
    });
    
    document.getElementById('changeCmd').addEventListener('click', function() {
        changeCommand();
    });
    
    document.getElementById('changeFontBtn').addEventListener('click', function() {
        changeFont();
    });
    
    document.getElementById('changeFontStyleBtn').addEventListener('click', function() {
        changeFontStyle();
    });
    
    document.getElementById('changeFontRenderBtn').addEventListener('click', function() {
        changeFontRender();
    });
    
    document.getElementById('biggerFontBtn').addEventListener('click', function() {
        biggerFont();
    });
    
    document.getElementById('smallerFontBtn').addEventListener('click', function() {
        smallerFont();
    });
    
    document.getElementById('changeBorderBtn').addEventListener('click', function() {
        changeBorderColor();
    });
    
    document.getElementById('changeBorderStyleBtn').addEventListener('click', function() {
        changeBorderStyle();
    });
    
    document.getElementById('biggerBorderBtn').addEventListener('click', function() {
        biggerBorder();
    });
    
    document.getElementById('smallerBorderBtn').addEventListener('click', function() {
         smallerBorder();
    });

    document.getElementById('morePaddingBtn').addEventListener('click', function() {
         moreTopPadding();
    });

    document.getElementById('lessPaddingBtn').addEventListener('click', function() {
        lessTopPadding();
    });
    
    document.getElementById('toggleMenu').addEventListener('click', function() {
        var menuContent = document.getElementById('menuContent');
        var toggleBtn = document.getElementById('toggleMenu');
        if (menuContent.style.display === 'none') {
            menuContent.style.display = 'block';
            toggleBtn.innerHTML = '−';
        } else {
            menuContent.style.display = 'none';
            toggleBtn.innerHTML = '+';
        }
    });
    
    document.getElementById('bgSelect').addEventListener('change', function() {
        setBackground();
        applyTheme();
    });
    
    document.getElementById('bgSelect').addEventListener('click', function() {
        if (this.value === 'random') {
            var random_color = 'hsl(' + Math.floor(Math.random() * 360) + ', ' + 
                             Math.floor(Math.random() * 100) + '%, ' + 
                             Math.floor(Math.random() * 50) + '%)';
            document.body.style.backgroundColor = random_color;
        }
    });
    
    document.getElementById('borderCheck').addEventListener('change', function() {
        if (this.checked) {
            addRandomBorder();
        } else {
            navGlyph[current_glyph_index].style.border = 'none';
        }
    });
    
    document.getElementById('commandSelect').addEventListener('change', function() {
        // Show/hide custom text input based on selection
        var custom_wrapper = document.getElementById('customTextWrapper');
        var browser_wrapper = document.getElementById('commandBrowserWrapper');

        if (this.value === 'custom') {
            custom_wrapper.style.display = 'block';
        } else {
            custom_wrapper.style.display = 'none';
        }

        // If browse mode is active, update the dropdown with new command type
        if (browser_wrapper.style.display !== 'none') {
            populateCommandBrowser();
        }

        changeCommand();
    });

    // Browse Commands button
    document.getElementById('browseCmdBtn').addEventListener('click', function() {
        var browser_wrapper = document.getElementById('commandBrowserWrapper');
        var custom_wrapper = document.getElementById('customTextWrapper');

        // Toggle browse mode
        if (browser_wrapper.style.display === 'none') {
            // Show browser, hide custom text if visible
            browser_wrapper.style.display = 'block';
            if (document.getElementById('commandSelect').value !== 'custom') {
                custom_wrapper.style.display = 'none';
            }
            populateCommandBrowser();
            changeCommand(); // Generate with first command
        } else {
            // Hide browser
            browser_wrapper.style.display = 'none';
        }
    });

    // Command browser selection change
    document.getElementById('commandBrowser').addEventListener('change', function() {
        changeCommand();
    });

    // Double-click on command browser to apply
    document.getElementById('commandBrowser').addEventListener('dblclick', function() {
        changeCommand();
    });
    
    document.getElementById('breakCheck').addEventListener('change', function() {
        var current_text = navGlyph[current_glyph_index].innerHTML;
        if (this.checked) {
            current_text = current_text.replace(' ', '<br>');
            navGlyph[current_glyph_index].classList.add('has-break');
            var current_padding = parseInt(navGlyph[current_glyph_index].style.padding) || 10;
            navGlyph[current_glyph_index].style.padding = (current_padding + 20) + 'px';
        } else {
            current_text = current_text.replace('<br>', ' ');
            navGlyph[current_glyph_index].classList.remove('has-break');
            var current_padding = parseInt(navGlyph[current_glyph_index].style.padding) || 30;
            navGlyph[current_glyph_index].style.padding = Math.max(current_padding - 20, 3) + 'px';
        }
        navGlyph[current_glyph_index].innerHTML = current_text;
    });

    // Custom text input event listener - refresh on Enter key
    document.getElementById('customTextInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && document.getElementById('commandSelect').value === 'custom') {
            changeCommand();
        }
    });

    document.getElementById('downloadBtn').addEventListener('click', function() {
        downloadPNG();
    });

    document.getElementById('shareBtn').addEventListener('click', function() {
        saveStateToURL();
        var fullURL = window.location.origin + window.location.pathname + window.location.hash;
        navigator.clipboard.writeText(fullURL).then(function() {
            var msg = document.createElement('div');
            msg.textContent = 'Link copied!';
            msg.className = 'copy-message';
            msg.style.background = text_color;
            msg.style.color = 'black';
            document.body.appendChild(msg);
            
            setTimeout(function() {
                msg.classList.add('fade-out');
                setTimeout(function() {
                    document.body.removeChild(msg);
                }, 500);
            }, 1000);
        });
    });

    document.getElementById('manLink').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('manPage').style.display = 'block';
    });

    document.getElementById('closeMan').addEventListener('click', function() {
        document.getElementById('manPage').style.display = 'none';
    });
}

function saveStateToURL() {
    var state = {
        f: navGlyph[current_glyph_index].style.fontFamily.replace(/"/g, ''),
        fs: navGlyph[current_glyph_index].style.fontSize,
        c: navGlyph[current_glyph_index].innerHTML,
        ct: document.getElementById('commandSelect').value,
        bg: getComputedStyle(document.body).backgroundColor,
        col: navGlyph[current_glyph_index].style.color,
        ts: navGlyph[current_glyph_index].style.textShadow,
        sw: navGlyph[current_glyph_index].style.webkitTextStrokeWidth,
        sc: navGlyph[current_glyph_index].style.webkitTextStrokeColor,
        fc: navGlyph[current_glyph_index].style.webkitTextFillColor,
        b: navGlyph[current_glyph_index].style.border,
        p: navGlyph[current_glyph_index].style.padding,
        bc: document.getElementById('borderCheck').checked ? 1 : 0,
        br: document.getElementById('breakCheck').checked ? 1 : 0,
        fw: navGlyph[current_glyph_index].style.fontWeight,
        fst: navGlyph[current_glyph_index].style.fontStyle,
        tt: navGlyph[current_glyph_index].style.textTransform,
        lh: navGlyph[current_glyph_index].style.lineHeight
    };
    
    window.location.hash = btoa(encodeURIComponent(JSON.stringify(state))).replace(/=/g, '');
}

function loadStateFromURL() {
    if (window.location.hash) {
        try {
            var hash = window.location.hash.substring(1);
            var state = JSON.parse(decodeURIComponent(atob(hash)));
            
            navGlyph[current_glyph_index].style.fontFamily = '"' + state.f + '"';
            navGlyph[current_glyph_index].style.fontSize = state.fs;
            navGlyph[current_glyph_index].innerHTML = state.c;
            document.getElementById('commandSelect').value = state.ct;
            document.body.style.backgroundColor = state.bg;
            navGlyph[current_glyph_index].style.color = state.col;
            navGlyph[current_glyph_index].style.textShadow = state.ts;
            navGlyph[current_glyph_index].style.webkitTextStrokeWidth = state.sw;
            navGlyph[current_glyph_index].style.webkitTextStrokeColor = state.sc;
            navGlyph[current_glyph_index].style.webkitTextFillColor = state.fc;
            navGlyph[current_glyph_index].style.border = state.b;
            navGlyph[current_glyph_index].style.padding = state.p;
            document.getElementById('borderCheck').checked = state.bc === 1;
            document.getElementById('breakCheck').checked = state.br === 1;
            navGlyph[current_glyph_index].style.fontWeight = state.fw;
            navGlyph[current_glyph_index].style.fontStyle = state.fst;
            navGlyph[current_glyph_index].style.textTransform = state.tt;
            if (state.br === 1) {
                navGlyph[current_glyph_index].classList.add('has-break');
            }
        } catch (e) {
            console.error('Failed to load state:', e);
        }
    }
}
