// insert19.js
// Waits for emojiSequenceArraySignal && msucdArraySignal before initializing emoji grid
var allEmojis = [];
var remainingEmojis = []; // Pool of unused emojis

// ---- Font switcher utilities ----
const emojiFonts = [
  '"Apple Color Emoji"',
  '"Noto Color Emoji"',
  '"Noto Emoji"',
  '"Open Moji 0"',
  '"Segoe Emoji"',
  '"Twitter Color Emoji"', //b%w except on firefox and some other funky browsers
  '"Open Moji Black"',
  '"Emoji Two"',
  '"Fluent Emoji Color"',
  '"Fluent Emoji Flat"',
  '"Fluent Emoji HC"',
  '"Fluent Emoji INV HC"',
  '"Blobmoji"',
  '"TossfaceOTF"',  
  '"WhatsApp Emoji"'//,
  //'Symbola'  
  //'"Pixel"','"Facebook"','"OneUI"'
];

// ---- Convert emoji to hex sequence (for exclusion matching) ----
function emojiToHexSequence(emoji) {
  const codePoints = [];
  for (const char of emoji) {
    const cp = char.codePointAt(0);
    if (cp !== undefined) {
      codePoints.push(cp.toString(16).toUpperCase());
    }
  }
  return codePoints.join('-');
}

// ---- Check if emoji is excluded for a given font ----
function isEmojiExcluded(emoji, fontName, version) {
  const cleanFont = fontName.replace(/['"]/g, '');
  const exclusions = exclude_emoji_font[cleanFont];
  
  if (!exclusions) return false;
  
  // Check block exclusion
  if (exclusions.blocks?.includes(version)) {
    console.log(`🚫 BLOCK excluded: ${emoji} [${version}] from ${cleanFont}`);
    return true;
  }
  
  // Check sequence exclusion
  const emojiHex = emojiToHexSequence(emoji);
  if (exclusions.sequences?.includes(emojiHex)) {
    console.log(`🚫 SEQUENCE excluded: ${emoji} (${emojiHex}) from ${cleanFont}`);
    return true;
  }
  
  return false;
}

// ---- Pick a valid random emoji-font combination ----
function getRandomValidCombo() {
  let attempts = 0;
  const maxAttempts = 50000;
  
  while (attempts < maxAttempts) {
    const poolIndex = Math.floor(Math.random() * remainingEmojis.length);
    const emojiObj = remainingEmojis[poolIndex]; // {emoji: '👰', version: 'v14_0'}
    const font = emojiFonts[Math.floor(Math.random() * emojiFonts.length)];
    
  if (!isEmojiExcluded(emojiObj.emoji, font, emojiObj.version)) {
      remainingEmojis.splice(poolIndex, 1);
      console.log(`✅ ${emojiObj.emoji} (${emojiToHexSequence(emojiObj.emoji)}) [${emojiObj.version}] in ${font}`);
      return {emoji: emojiObj.emoji, font, version: emojiObj.version};
    }
    
    console.log(`❌ Rejected: ${emojiObj.emoji} (${emojiToHexSequence(emojiObj.emoji)}) [${emojiObj.version}] in ${font}`);
    attempts++;
  }
  
  const emojiObj = remainingEmojis.splice(0, 1)[0] || {emoji: '❓', version: 'unknown'};
  return {emoji: emojiObj.emoji, font: '"Apple Color Emoji"', version: emojiObj.version};
}

function getRandomFont() {
  return emojiFonts[Math.floor(Math.random() * emojiFonts.length)];
}

function setEmojiFont(fontName) {
  const allEmojiSpans = document.querySelectorAll('.emoji-content');
  allEmojiSpans.forEach(span => {
    span.style.fontFamily = fontName;
  });
}

function setRandomFonts() {
  const allEmojiSpans = document.querySelectorAll('.emoji-content');
  allEmojiSpans.forEach(span => {
    span.style.fontFamily = getRandomFont();
  });
}

// ---- Convert emoji string to hex sequence (for tooltip display) ----
function emojiToHex(emoji) {
  const codePoints = [];
  for (const char of emoji) {
    codePoints.push(char.codePointAt(0).toString(16).toUpperCase().padStart(4, '0'));
  }
  return codePoints.map(cp => `U+${cp}`).join(' ');
}

// ---- Create emoji pool with simple flattening ----
var allEmojis = []; // Now stores {emoji: '👰🏾‍♀️', version: 'v14_0'}

function initContent() {
  const emojiVersions = {
    'v1_0': emoji_zwj_v1_0,
    'v2_0': emoji_zwj_v2_0,
    'v3_0': emoji_zwj_v3_0,
    'v4_0': emoji_zwj_v4_0,
    'v5_0': emoji_zwj_v5_0, 
    'v11_0': emoji_zwj_v11_0,
    'v12_0': emoji_zwj_v12_0,
    'v12_1': emoji_zwj_v12_1,
    'v13_0': emoji_zwj_v13_0,
    'v13_1': emoji_zwj_v13_1,
    'v14_0': emoji_zwj_v14_0,    
    'v15_0': emoji_zwj_v15_0,
    'v15_1': emoji_zwj_v15_1,
    'v16_0': emoji_zwj_v16_0,
  };

  for (const [version, emojiArray] of Object.entries(emojiVersions)) {
    if (Array.isArray(emojiArray)) {
      emojiArray.forEach(emoji => {
        allEmojis.push({emoji, version});
      });
    }
  }
  
  console.log(`✅ Loaded ${allEmojis.length} total emojis with version tags`);
  remainingEmojis = [...allEmojis];
}

// ---- Embedded CSS ----
var embeddedCss = `
*, *::before, *::after { box-sizing: border-box; }
html, body {
  height: 100%; width: 100%; margin: 0; padding: 0; overflow: hidden;
}
body {
  font-family: Arial, sans-serif;
  display: flex; justify-content: center; align-items: center;
}
#emojiGrid {
  display: flex; flex-wrap: wrap; width: 100%; height: 100%;
  border: 25px solid; box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
.grid-cell {
  width: 10%; height: 10%;
  display: flex; justify-content: center; align-items: center;
  line-height: 1.75; border: 3px solid;
  background-color: transparent; perspective: 1000px; border-radius: 8px;
  position: relative;
}
.emoji-content {
  display: block;
  font-size: min(7vh, 5rem);
  line-height: 1 !important
  opacity: 1;
  transform: rotateY(0deg) scale(1);
  transform-style: preserve-3d;
  backface-visibility: hidden;
  transition: none;
  cursor: pointer;
  position: relative;
}

.emoji-content::after {
  content: attr(data-tooltip);  /* ✅ Use data-tooltip instead of data-hex */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.95);
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 12px;  /* ✅ Slightly bigger since it's shorter */
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  z-index: 8;
  font-family: Noto Sans, sans-serif;  /* ✅ Regular font, not monospace */
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
  text-align: center;
}

.emoji-content:hover::after {
  opacity: 1;
}

.emoji-content:hover {
  z-index: 9;  /* ✅ Make the hovered emoji itself highest */
}
  
@keyframes fade-out-twist {
  0% { opacity: 1; transform: rotateY(0deg) scale(1); }
  100% { opacity: 0; transform: rotateY(180deg) scale(0.7); }
}
@keyframes fade-in-twist {
  0% { opacity: 0; transform: rotateY(180deg) scale(0.7); }
  100% { opacity: 1; transform: rotateY(360deg) scale(1); }
}
.emoji-content.is-fading-out { animation: fade-out-twist 4s ease-in-out forwards; }
.emoji-content.is-fading-in  { animation: fade-in-twist 2s ease-in-out forwards; }
`;

// ---- Inject style ----
function injectStyle(css) {
  const s = document.createElement('style');
  s.textContent = css;
  document.head.appendChild(s);
}

// ---- Utility ----
function getRandomPastelColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 10) + 90;
  const lightness = Math.floor(Math.random() * 10) + 50;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
function getRandomMainColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 40) + 60;
  const lightness = Math.floor(Math.random() * 30) + 60;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

let globalBodyBgColor = '';

// ---- Flip animation ----
function flipCell(span) {
  console.log("We're flipping");
  span.classList.remove('is-fading-in', 'is-fading-out');
  span.style.removeProperty('transform');
  span.style.removeProperty('opacity');

  span.classList.add('is-fading-out');

  const handleOut = (e) => {
    if (e.animationName !== 'fade-out-twist') return;
    span.removeEventListener('animationend', handleOut);
    span.classList.remove('is-fading-out');

    // Check if pool is empty, reset if needed
    if (remainingEmojis.length === 0) {
      remainingEmojis = [...allEmojis];
      console.log("🔄 Pool exhausted - resetting with all emojis");
    }

    // ✅ Get random valid emoji-font combo
    // In both flipCell and initGrid, change how you set the data attributes:
    const combo = getRandomValidCombo();
    span.textContent = combo.emoji;
    span.setAttribute('data-tooltip', `${combo.font.replace(/['"]/g, '')} [${combo.version}]`); // ✅ New simple tooltip
    span.setAttribute('data-hex', emojiToHex(combo.emoji)); // ✅ Keep for console logging
    span.style.fontFamily = combo.font;


    span.style.transform = 'rotateY(180deg) scale(0.7)';
    span.style.opacity = '0';
    void span.offsetWidth;
    span.classList.add('is-fading-in');

    const handleIn = (e2) => {
      if (e2.animationName !== 'fade-in-twist') return;
      span.removeEventListener('animationend', handleIn);
      span.classList.remove('is-fading-in');
      span.style.removeProperty('transform');
      span.style.removeProperty('opacity');
      setTimeout(() => flipCell(span), Math.random() * (45000) + 5000);
    };
    span.addEventListener('animationend', handleIn);
  };
  span.addEventListener('animationend', handleOut);
}

function initGrid() {
  const grid = document.createElement('div');
  grid.id = 'emojiGrid';
  document.body.appendChild(grid);
  const emojiGrid = document.getElementById('emojiGrid');
  const bodyElement = document.body;

  console.log(`Total emojis in pool: ${allEmojis.length}`);

  if (allEmojis.length === 0) {
    emojiGrid.textContent = "No ZWJ emojis found in the provided data for the target versions.";
    emojiGrid.style.justifyContent = 'center';
    emojiGrid.style.alignItems = 'center';
    emojiGrid.style.fontSize = '1.5em';
  } else {
    globalBodyBgColor = getRandomMainColor();
    bodyElement.style.backgroundColor = globalBodyBgColor;

    emojiGrid.style.borderColor = getRandomMainColor();
    emojiGrid.style.zIndex = 100;
    emojiGrid.style.position = 'absolute';
    const gridSize = 10;
    const totalCells = gridSize * gridSize;

    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement('div');
      cell.classList.add('grid-cell');

      const emojiContentSpan = document.createElement('span');
      emojiContentSpan.classList.add('emoji-content');

      // Check if pool is empty, reset if needed
      if (remainingEmojis.length === 0) {
        remainingEmojis = [...allEmojis];
      }

      // ✅ Get random valid emoji-font combo
      const combo = getRandomValidCombo();
      emojiContentSpan.textContent = combo.emoji;
      emojiContentSpan.setAttribute('data-tooltip', `${combo.font.replace(/['"]/g, '')} [${combo.version}]`);      
      emojiContentSpan.setAttribute('data-hex', `${emojiToHex(combo.emoji)} [${combo.version}]`);
      emojiContentSpan.style.fontFamily = combo.font;

      cell.style.backgroundColor = getRandomPastelColor();
      cell.style.borderColor = globalBodyBgColor;

      cell.appendChild(emojiContentSpan);
      emojiGrid.appendChild(cell);

      const initialAnimationDelay = (Math.random() * 80000) + 5000;
      setTimeout(() => flipCell(emojiContentSpan), initialAnimationDelay);
    }
  }
}

// ---- Keyboard shortcuts to switch fonts ----
window.addEventListener('keydown', (e) => {
  if (e.key === '1') setEmojiFont('"Apple Color Emoji"');
  if (e.key === '2') setEmojiFont('"Noto Color Emoji"');
  if (e.key === '3') setEmojiFont('"OpenMoji"');
  if (e.key === '4') setEmojiFont('"Segoe UI Emoji"');
  if (e.key === 'r' || e.key === 'R') setRandomFonts();
});

// ---- Wait for signal variables ----
function jsWait() {
  const signalsReady =
    typeof emojiSequenceArraySignal !== 'undefined' &&
    typeof msucdArraySignal !== 'undefined';

  if (!signalsReady) {
    setTimeout(jsWait, 100);
  } else {
    console.log("✅ Signals ready → initializing emoji grid");
    console.log("🎨 Font controls: Press 1-4 to switch fonts, R for random");
    injectStyle(embeddedCss);
    initContent();
    initGrid();
  }
}

console.log("insert19.js loaded — waiting for emojiSequenceArraySignal + msucdArraySignal");
jsWait();