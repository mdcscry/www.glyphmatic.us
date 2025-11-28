
// --- IMPORTANT ---
// This assumes 'emoji_versions_data.js' has been created and edited as described.
// The variables like emoji_zwj_v2_0, emoji_zwj_v4_0, etc., should be globally accessible
// after 'emoji_versions_data.js' is loaded.

// Collect all emoji arrays into a single array for easy random selection
const allEmojiArrays = [
    emoji_zwj_v2_0,
    emoji_zwj_v4_0,
    emoji_zwj_v5_0,    
    emoji_zwj_v12_0,
    emoji_zwj_v12_1,
    emoji_zwj_v13_0,
    emoji_zwj_v13_1,
    emoji_zwj_v15_0,
    emoji_zwj_v15_1,
    emoji_zwj_v16_0,
    // If you have emoji_zwj_v17_0 and it's populated, uncomment the line below:
    // emoji_zwj_v17_0,
];

// Flatten all emojis into a single list
let allEmojis = [];
allEmojiArrays.forEach(arr => {
    if (Array.isArray(arr) && arr.length > 0) {
        allEmojis = allEmojis.concat(arr);
    }
});

// Select the grid container
const emojiGrid = document.getElementById('emojiGrid');
const bodyElement = document.body; // Reference to the body for background color

// Function to generate a random HSL color for cell backgrounds (lighter, pastel range)
function getRandomPastelColor() {
    const hue = Math.floor(Math.random() * 360); // 0-360 for hue
    const saturation = Math.floor(Math.random() * 50) + 50; // 50-80% for saturation
    const lightness = Math.floor(Math.random() * 10) + 90; // 70-90% for lightness
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// Function to generate a random HSL color (generally vibrant, good for body/outer grid border)
function getRandomMainColor() {
    const hue = Math.floor(Math.random() * 360); // 0-360 for hue
    const saturation = Math.floor(Math.random() * 40) + 60; // 60-100% for saturation
    const lightness = Math.floor(Math.random() * 30) + 60; // 40-70% for lightness
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// Global variable to store the body's background color so cell borders can reference it
let globalBodyBgColor = '';


// --- Animation Logic ---
// We now pass the inner emojiContentSpan to the flip function
function flipCell(emojiContentSpan) {
    // Ensure the span is in its normal, fully visible state before starting 'out' animation
    emojiContentSpan.classList.remove('is-fading-in', 'is-fading-out');
    // Using style.removeProperty is cleaner than setting to ''
    emojiContentSpan.style.removeProperty('transform');
    emojiContentSpan.style.removeProperty('opacity');

    // Phase 1: Old emoji dissolves out and twists
    emojiContentSpan.classList.add('is-fading-out');

    const handleOutAnimationEnd = (event) => {
        if (event.animationName !== 'fade-out-twist') return;
        
        emojiContentSpan.removeEventListener('animationend', handleOutAnimationEnd);
        emojiContentSpan.classList.remove('is-fading-out');

        // Immediately after fade-out, replace glyph, set new emoji to 'flipped away' (invisible, rotated) state
        const newEmoji = allEmojis[Math.floor(Math.random() * allEmojis.length)];
        emojiContentSpan.textContent = newEmoji;

        // Apply initial state for fade-in animation
        emojiContentSpan.style.transform = 'rotateY(180deg) scale(0.7)';
        emojiContentSpan.style.opacity = '0';
        
        // Force reflow/repaint to ensure CSS is applied before next animation starts.
        // This is important to ensure the browser registers the immediate state change
        // before applying the 'fade-in' animation.
        void emojiContentSpan.offsetWidth; 

        // Phase 2: New emoji appears twisting in
        emojiContentSpan.classList.add('is-fading-in');

        const handleInAnimationEnd = (event) => {
            if (event.animationName !== 'fade-in-twist') return;
            
            emojiContentSpan.removeEventListener('animationend', handleInAnimationEnd);
            emojiContentSpan.classList.remove('is-fading-in');
            
            // Clean up inline styles to ensure CSS classes fully control state upon completion
            emojiContentSpan.style.removeProperty('transform');
            emojiContentSpan.style.removeProperty('opacity');

            // Phase 3: Schedule next flip for this cell
            // Randomized delay between 20 to 60 seconds
            const nextDelay = Math.random() * (750000 - 20000) + 20000; // 20 to 60 seconds
            setTimeout(() => flipCell(emojiContentSpan), nextDelay);
        };
        emojiContentSpan.addEventListener('animationend', handleInAnimationEnd);
    };
    emojiContentSpan.addEventListener('animationend', handleOutAnimationEnd);
}


// --- Initial Grid Setup ---
// Check if we have any emojis to display
function initGrid(allEmojis) {
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

    const gridSize = 10; // For a 10x10 grid
    const totalCells = gridSize * gridSize;

    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');

        const emojiContentSpan = document.createElement('span');
        emojiContentSpan.classList.add('emoji-content');

        // Pick an initial random emoji
        const randomIndex = Math.floor(Math.random() * allEmojis.length);
        emojiContentSpan.textContent = allEmojis[randomIndex];

        // Assign a random pastel background color to the cell
        cell.style.backgroundColor = getRandomPastelColor();
        
        // Assign the cell's border color to match the body's background color
        cell.style.borderColor = globalBodyBgColor;

        cell.appendChild(emojiContentSpan); // Add the span to the cell
        emojiGrid.appendChild(cell);

        // Schedule the first animation for each cell with a staggered initial delay
        // Random initial delay between 0 to 10 seconds
        const initialAnimationDelay = Math.random() * 750000;
        setTimeout(() => flipCell(emojiContentSpan), initialAnimationDelay);
    }
}
}

initGrid(allEmojis);