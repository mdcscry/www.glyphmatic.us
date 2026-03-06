// insert33.js - T H E   G E N E R A T O R
console.log('insert33.js loaded');

// ===== DEPENDENCY LOADING =====
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// ===== REQUIRED STUB =====
function changeHtmlDisplayInline() {
    // Required by g.us3.htm - not used by this insert
}

// ===== STYLES =====
function injectStyles() {
    // Override body margin/overflow for full-screen layout.
    // Also set default CSS variable values (dark theme) so themed-element
    // UI renders correctly before the Google Fonts API call returns.
    const style = document.createElement('style');
    style.textContent = `
        body { margin: 0 !important; overflow: hidden !important; position: relative !important; height: 100vh !important; }
        :root {
            --main-color: #00ffff;
            --background-color: rgba(0, 0, 0, 0.9);
            --text-color: #00ffff;
        }
    `;
    document.head.appendChild(style);

    // Load the generator's CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '../css/tshirt_gen1.css';
    document.head.appendChild(link);
}

// ===== DOM =====
function createDOM() {
    // Control Panel
    const controls = document.createElement('div');
    controls.id = 'controls';
    controls.className = 'themed-element';
    controls.innerHTML = `
        <div class="text-center">
            <button id="toggleMenu">+</button>
        </div>
        <div id="menuContent">
            <button id="refreshBtn">Refresh<br>T H E G E N E R A T O R</button>
            <div class="button-row-double">
                <button id="changeCmd">Change<br>Command</button>
                <button id="browseCmdBtn">Browse<br>Commands</button>
            </div>
            <div class="button-row-triple">
                <button id="changeFontBtn">Change<br>Google<br>Font</button>
                <button id="changeFontStyleBtn">Change<br>Font<br>Style</button>
                <button id="changeFontRenderBtn">Change<br>Font<br>Render</button>
            </div>
            <div class="button-row-double">
                <button id="biggerFontBtn">Bigger Font</button>
                <button id="smallerFontBtn">Smaller Font</button>
            </div>
            <div class="checkbox-wrapper">
                <div>
                    <input type="checkbox" id="borderCheck">
                    <label for="borderCheck">Add a Border</label>
                </div>
            </div>
            <div class="border-grid">
                <button id="changeBorderBtn">Border<br>Color</button>
                <button id="changeBorderStyleBtn">Border<br>Style</button>
                <button id="biggerBorderBtn">Bigger<br>Box</button>
                <button id="morePaddingBtn">More<br>Padding</button>
                <button id="smallerBorderBtn">Smaller<br>Box</button>
                <button id="lessPaddingBtn">Less<br>Padding</button>
            </div>
            <div class="form-group">
                <label for="commandSelect">Command Type:</label>
                <select id="commandSelect">
                    <option value="all">All</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="javascript">JavaScript</option>
                    <option value="crypto">Crypto</option>
                    <option value="sql">SQL</option>
                    <option value="sysadmin">Unix/Sysadmin</option>
                    <option value="git">Git</option>
                    <option value="python">Python</option>
                    <option value="ml">Machine Learning</option>
                    <option value="ai">A.I.</option>
                    <option value="datatype">Datatypes</option>
                    <option value="adm">Admonitions</option>
                    <option value="custom">Custom Text</option>
                </select>
                <div id="customTextWrapper" style="display: none; margin-top: 10px; margin-bottom: 15px;">
                    <label for="customTextInput">Enter your text:</label>
                    <input type="text" id="customTextInput" placeholder="Type your text here...">
                </div>
                <div id="commandBrowserWrapper" style="display: none; margin-top: 10px; margin-bottom: 15px;">
                    <label for="commandBrowser">Select Command:</label>
                    <select id="commandBrowser" size="8"></select>
                </div>
                <div class="checkbox-wrapper">
                    <div>
                        <input type="checkbox" id="breakCheck">
                        <label for="breakCheck">Add Break</label>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="bgSelect">Background:</label>
                <select id="bgSelect">
                    <option value="black">Black</option>
                    <option value="white">White</option>
                    <option value="gray">Gray</option>
                    <option value="random">Random</option>
                </select>
            </div>
            <button id="downloadBtn">Download as PNG</button>
            <button id="shareBtn">Share This Design</button>
        </div>
    `;
    document.body.appendChild(controls);

    // Tagline
    const tagline = document.createElement('div');
    tagline.id = 'tagline';
    tagline.className = 'themed-element';
    tagline.innerHTML = `
        T H E &nbsp; G E N E R A T O R<br><br>
        Fashion design <span id="taglineText"></span>.<br>
        <a id="manLink" href="#"><br>man the_generator</a>
    `;
    document.body.appendChild(tagline);

    // Man Page
    const manPage = document.createElement('div');
    manPage.id = 'manPage';
    manPage.className = 'themed-element';
    manPage.innerHTML = `
        <button id="closeMan">CLOSE</button>
        <pre>
NAME
     T H E  G E N E R A T O R - cryptographically valid command typography generator

SYNOPSIS
     T H E  G E N E R A T O R [--command-type TYPE] [--border] [--break] [--backgroundColor]

DESCRIPTION
     T H E  G E N E R A T O R produces unique typographic renderings of technical commands,
     SQL statements, cryptographic hashes, and corporate admonitions using random
     Google Fonts with randomized webkit styling properties.

     All generated SHA hashes (256, 384, 512) and MD5 hashes are cryptographically
     valid outputs of their respective algorithms applied to pseudorandom input data.

     Git commit hashes display the first 7 hexadecimal characters of SHA-256 output,
     conforming to standard Git short hash format.

OPTIONS
     --command-type TYPE
             Select command category: all, html, css, javascript, crypto, sql,
             sysadmin, git, python, ml, adm, custom

     --border
             Apply random border (width: 1-50px, style: varies, color: contrasting)

     --break
             Insert line break at first space character

     --background-color
             Change the background color of the design (black, white, gray, random)

COMMANDS
     Change Command
             Generate new command from selected category

     Browse Commands
             Toggle command browser mode. Displays scrollable list of all available
             commands for the selected category. Click any command to render it.
             Command list updates dynamically when category changes.

     Change Google Font
             Apply random font from filtered Google Fonts API (excludes: barcode,
             material icons, wavefont, yarndings, guides, redacted, charted)

     Change Font Style
             Randomize webkit-text-fill-color, webkit-text-stroke-width,
             webkit-text-stroke-color, and text-shadow (full spectrum: 0-360\u00b0)

     Change Font Render
             Modify font-weight, font-style, text-transform

     Bigger Font / Smaller Font
             Adjust font-size in 20px increments (range: 20-1200px)

     Border Color
             Regenerate border color (maintains width and style)

     Border Style
             Randomize border style and width (maintains color)

     Bigger Box / Smaller Box
             Adjust border padding in 10px increments (range: 0-500px)

     More Padding / Less Padding
             Adjust internal padding in 10px increments (range: 0-500px)

     Download as PNG
             Export current rendering via dom-to-image library

     Share This Design
             Generate state-encoded URL, copy to clipboard

MAN PAGE
     Access this documentation by clicking "man the_generator" below the main
     heading. The man page follows standard Unix manual conventions with
     intentional disregard for the fact that this is a GUI web application.

     Press CLOSE to exit the man page and return to generating typography.

     man(1) would be proud, or horrified. Possibly both.

BACKGROUND
     Background selector supports: black, white, gray, random

     The "random" option generates HSL colors with unpredictable results.
     Clicking the background selector repeatedly when set to "random" will
     continue generating new random colors until the heat death of the universe.

ARRAYS
     html          HTML5 element tags (encoded: &lt; &gt;)
     css           CSS properties and values
     javascript    JS operators, keywords, promises
     crypto        sha-256, sha-384, sha-512, md5 (appended with -gen for generation)
     sql           SQL commands (TRUNCATE, DROP TABLE, COALESCE, etc.)
     sysadmin      Unix/Linux commands (chmod 777, rm -rf, whoami, etc.)
     git           Git commands plus commit-sha (generates valid short hash)
     python        Python keywords and pandas methods
     ml            Machine learning terminology
     ai            Terms associated with AI
     datatypes     Database data types
     adm           Corporate admonitions (Fuck it Ship it, Quick Question, etc.)
     custom        User-provided text input (enter text, press Enter or Change Command)

FILES
     Google Fonts API (filtered latin subset, monospace for UI)
     js-sha256, js-sha512, js-md5 (cryptographic hash libraries)
     dom-to-image (PNG export)

NOTES
     All webkit properties may render differently across browsers.

     Hash generation uses Math.random() + Date.now() as input, ensuring
     cryptographic validity without deterministic reproducibility.

     URL state encoding uses base64 JSON. Maximum practical length: ~2000 characters.

     This is a GUI application masquerading as a command-line utility.
     No actual command-line interface exists. The irony is intentional.

EXIT STATUS
     T H E  G E N E R A T O R does not exit. It is a web application. Closing
     the browser tab is the closest approximation to an exit status of 0.

BUGS
     Selecting "random" background repeatedly may cause decision paralysis.

     Some Google Fonts are objectively terrible for technical typography.
     This is considered a feature.

     The multiverse will prevent you from finding the exact command you want
     unless you use Browse Commands mode.

     Border controls become addictive. Use responsibly.

AUTHOR
     Matthew Cryer, with Claude (Anthropic), with chatGPT (openAI)

TAGLINE(S)
     Randomly selected on page load. Various.

SEE ALSO
     git(1), sha256sum(1), chmod(1), perl(1), CSS specifications,
     Google Fonts API documentation, dom-to-image(npm), corporate nonsense
        </pre>
    `;
    document.body.appendChild(manPage);
}

// ===== INIT =====
async function tryLoadScript(src) {
    try {
        await loadScript(src);
    } catch (e) {
        console.warn('insert33: failed to load', src, e);
    }
}

async function init() {
    injectStyles();
    createDOM();

    // jQuery is critical - must succeed for tshirt_gen1.js to work
    if (typeof jQuery === 'undefined') {
        await loadScript('https://code.jquery.com/jquery-1.11.0.js');
    }

    // dom-to-image is required for PNG download
    await loadScript('https://cdn.jsdelivr.net/npm/dom-to-image@2.6.0/dist/dom-to-image.min.js');
    await tryLoadScript('https://cdnjs.cloudflare.com/ajax/libs/js-sha256/0.9.0/sha256.min.js');
    await tryLoadScript('https://cdnjs.cloudflare.com/ajax/libs/js-sha512/0.8.0/sha512.min.js');
    await tryLoadScript('https://cdn.jsdelivr.net/npm/js-md5@0.7.3/build/md5.min.js');

    // font_utility.js is already loaded by g.us3.htm - skip to avoid double-load errors
    // Load the generator logic last (DOM and deps must be ready)
    await loadScript('../js_funct/tshirt_gen1.js');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init().catch(console.error));
} else {
    init().catch(console.error);
}
