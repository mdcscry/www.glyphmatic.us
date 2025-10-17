// insert17.js
// Waits for emojiSequenceArraySignal && msucdArraySignal before initializing emoji grid
var allEmojis = []
var remainingEmojis = []; // Pool of unused emojis

// ---- Create emoji grid ----
function initContent() {

  // ✅ Explicitly reference the named emoji arrays here:
  const emojiArrays = [
    emoji_zwj_v2_0,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    emoji_zwj_v3_0,
=======
    emoji_zwj_v3_0,    
>>>>>>> Stashed changes
=======
    emoji_zwj_v3_0,    
>>>>>>> Stashed changes
    emoji_zwj_v4_0,
    emoji_zwj_v5_0, 
    emoji_zwj_v12_0,
    emoji_zwj_v12_1,
    emoji_zwj_v13_0,
    emoji_zwj_v13_1,
    emoji_zwj_v15_0,
    emoji_zwj_v15_1,
    emoji_zwj_v16_0,
   emoji_zwj_v17_0
  ];

  emojiArrays.forEach(arr => {
    if (Array.isArray(arr)) allEmojis = allEmojis.concat(arr);
  });
  console.log(allEmojis)
  if (allEmojis.length === 0) {
    grid.textContent = "No emoji data found.";
    return;
  }
  
  // Initialize the pool
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
  width: 20%; height: 20%;
  display: flex; justify-content: center; align-items: center;
  line-height: 1.5; border: 3px solid;
  background-color: transparent; perspective: 1000px; border-radius: 8px;
}
.emoji-content {
        display: block; /* Allows block-level styling and transforms */
        font-size: min(16vh, 10rem); /* Emoji font size, scales with viewport. '5rem' cap prevents it from becoming too huge on extra-large screens. */
        opacity: 1;
        transform: rotateY(0deg) scale(1); /* Initial state */
        transform-style: preserve-3d; /* Allows for 3D transforms */
        backface-visibility: hidden; /* Prevents backface issues during rotation */
        transition: none; /* No default transitions, animations will handle state changes */
    
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
  const saturation = Math.floor(Math.random() * 50) + 50;
  const lightness = Math.floor(Math.random() * 10) + 90;
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

    // Pick random index from remaining pool and REMOVE it
    const poolIndex = Math.floor(Math.random() * remainingEmojis.length);
    const newEmoji = remainingEmojis.splice(poolIndex, 1)[0];
    span.textContent = newEmoji;

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
      setTimeout(() => flipCell(span), Math.random() * 40000 + 8000);
    };
    span.addEventListener('animationend', handleIn);
  };
  span.addEventListener('animationend', handleOut);
}

function initGrid() {

    const grid = document.createElement('div');
    grid.id = 'emojiGrid';
    document.body.appendChild(grid);
 // Select the grid container
    const emojiGrid = document.getElementById('emojiGrid');
    const bodyElement = document.body; // Reference to the body for background color
   

    console.log(allEmojis.length)

if (allEmojis.length === 0) {
    emojiGrid.textContent = "No ZWJ emojis found in the provided data for the target versions.";
    emojiGrid.style.justifyContent = 'center';
    emojiGrid.style.alignItems = 'center';
    emojiGrid.style.fontSize = '1.5em';
} else {


    // 1. Set the random background color for the <body>
    globalBodyBgColor = getRandomMainColor(); // Store it globally
    bodyElement.style.backgroundColor = globalBodyBgColor;

    // 2. Set the random border color for the overall #emojiGrid container
    emojiGrid.style.borderColor = getRandomMainColor();
    emojiGrid.style.zIndex = 100;
    emojiGrid.style.position = 'absolute';
    const gridSize = 5; // For a 5x5 grid
    const totalCells = gridSize * gridSize;

    for (let i = 0; i < totalCells; i++) {

        const cell = document.createElement('div');
        cell.classList.add('grid-cell');

        const emojiContentSpan = document.createElement('span');
        emojiContentSpan.classList.add('emoji-content');

        // Pick an initial random emoji from the pool and remove it
        if (remainingEmojis.length === 0) {
          remainingEmojis = [...allEmojis];
        }
        const poolIndex = Math.floor(Math.random() * remainingEmojis.length);
        emojiContentSpan.textContent = remainingEmojis.splice(poolIndex, 1)[0];

        // Assign a random pastel background color to the cell
        cell.style.backgroundColor = getRandomPastelColor();
        
        // Assign the cell's border color to match the body's background color
        cell.style.borderColor = globalBodyBgColor;

        cell.appendChild(emojiContentSpan); // Add the span to the cell
        emojiGrid.appendChild(cell);

        // Schedule the first animation for each cell with a staggered initial delay
        // Random initial delay between 0 to 10 seconds
        const initialAnimationDelay = Math.random() * 30000+7000;
        setTimeout(() => flipCell(emojiContentSpan), initialAnimationDelay);
    }
}
}



// ---- Wait for signal variables ----
function jsWait() {
  const signalsReady =
    typeof emojiSequenceArraySignal !== 'undefined' &&
    typeof msucdArraySignal !== 'undefined';

  if (!signalsReady) {
    setTimeout(jsWait, 100);
  } else {
    console.log("✅ Signals ready → initializing emoji grid");
    injectStyle(embeddedCss);
    initContent();
    initGrid()
  }
}

console.log("insert17.js loaded — waiting for emojiSequenceArraySignal + msucdArraySignal");
jsWait();