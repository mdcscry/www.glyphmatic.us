/**
 * Insert 25: DaGenerator - Multi-Flavor Edition
 * Consolidates 4 variants into one file with random flavor selection
 * Randomly selects one of 4 flavor configurations on page load
 */

function createDegenerator2() {
    // === FLAVOR SELECTION ===
    const FLAVOR = Math.floor(Math.random() * 4);

    // Flavor configurations:
    // 0: Doublefast Large (was insert25) - random 40-200px, normal bg, single-line chars, 2 intervals, mycolors
    // 1: Singlefast Medium (was insert26) - random 40-200px, normal bg, double-line chars, 1 interval, 3-color palette
    // 2: Doublefast Small (was insert29) - 15px, white bg, single-line chars, 2 intervals, mycolors
    // 3: Singlefast Small (was insert30) - 15px, white bg, double-line chars, 1 interval, mycolors

    // Random font size for flavors 0 and 1
    const randomFontSize = Math.floor(Math.random() * (200 - 40 + 1)) + 40;

    const flavorConfig = {
        fontSize: (FLAVOR === 0 || FLAVOR === 1) ? randomFontSize : 15,
        background: (FLAVOR === 2 || FLAVOR === 3) ? '#FFFFFF' : null,
        speed: (FLAVOR === 0 || FLAVOR === 2) ? 'doublefast' : 'singlefast',
        charArray: (FLAVOR === 0 || FLAVOR === 2) ? 'single-line' : 'double-line',
        colorMode: (FLAVOR === 1) ? 'palette' : 'mycolors'
    };

    console.log(`DaGenerator: Selected FLAVOR ${FLAVOR}`);
    console.log('Config:', flavorConfig);

    // --- CSS Injection ---
    const style = document.createElement('style');
    let styleContent = `
        body {
            font-family: 'Code2000', 'Quivira', 'Akshar Unicode', 'Symbola', 'AegyptusR', 'Arial Unicode MS', 'Code2002', 'Code2001', sans-serif;
            font-weight: 900;
    `;

    if (flavorConfig.background) {
        styleContent += `
            background-color: ${flavorConfig.background} !important;
        `;
    }

    styleContent += `
        }

        #dagen-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
            z-index: -1;
            pointer-events: none;
        }

        .dagen-char {
            -webkit-transition-property: color;
            -webkit-transition-duration: 3s;
            position: relative;
            float: left;
            font-size: ${flavorConfig.fontSize}px;
            color: ${flavorConfig.background ? '#FFFFFF' : '#FFFFFF'};
        }
    `;

    style.textContent = styleContent;
    document.head.appendChild(style);

    // --- Main Logic ---
    const fontChangeRate = 200;

    // Character arrays
    const singleLineArray = [
        "250C", "2510", "2514", "2518", "251C", "2524", "252C", "2534", "253C",
        "2500", "2502",
        "2506", "2508", "250A", "2507", "2509", "250B",
        "254C", "254D", "254E", "254F",
        "2574", "2575", "2576", "2577", "2578", "2579", "257A", "257B",
        "257C", "257D", "257E", "257F",
        "250D", "250E", "250F", "2511", "2512", "2513", "2515", "2516", "2517", "2519", "251A", "251B",
        "251D", "251E", "251F", "2520", "2521", "2522", "2523", "2525", "2526", "2527", "2528", "2529", "252A", "252B",
        "252D", "252E", "252F", "2530", "2531", "2532", "2533", "2535", "2536", "2537", "2538", "2539", "253A", "253B",
        "253D", "253E", "253F", "2540", "2541", "2542", "2543", "2544", "2545", "2546", "2547", "2548", "2549", "254A", "254B"
    ];

    const doubleLineArray = [
        "2550", "2551", "2554", "2557", "255A", "255D", "2560", "2563",
        "2566", "2569", "256C", "2552", "2553", "2555", "2556", "2558",
        "2559", "255B", "255C", "255E", "255F", "2561", "2562", "2564",
        "2565", "2567", "2568", "256A", "256B"
    ];

    const myarray = (flavorConfig.charArray === 'single-line') ? singleLineArray : doubleLineArray;

    // 3-Color Palette System (only for flavor 1)
    let palette = [];

    function setPalette() {
        if (typeof mycolors !== 'undefined' && mycolors.length >= 3) {
            const shuffled = [...mycolors].sort(() => 0.5 - Math.random());
            palette = shuffled.slice(0, 3);
        } else {
            palette = ['#FF0000', '#00FF00', '#0000FF'];
            console.warn('DaGenerator: `mycolors` array not found or too small. Using fallback palette.');
        }
    }

    function getRandomPaletteColor() {
        if (palette.length === 0) setPalette();
        return palette[Math.floor(Math.random() * palette.length)];
    }

    function getRandomColor() {
        if (flavorConfig.colorMode === 'palette') {
            return getRandomPaletteColor();
        } else {
            return mycolors[Math.round((mycolors.length - 1) * Math.random())];
        }
    }

    // Initialize palette if needed
    if (flavorConfig.colorMode === 'palette') {
        setPalette();
    }

    // Create wrapper and characters
    const wrapper = document.createElement('div');
    wrapper.id = 'dagen-wrapper';
    document.body.appendChild(wrapper);

    const divId = [];

    for (let divCounter = 0; divCounter < 15000; divCounter++) {
        divId[divCounter] = document.createElement("div");
        divId[divCounter].className = 'dagen-char';
        divId[divCounter].innerHTML = '&#x' + myarray[Math.round((myarray.length - 1) * Math.random())] + ';';
        wrapper.appendChild(divId[divCounter]);
    }

    // Animation intervals based on speed
    if (flavorConfig.speed === 'doublefast') {
        // Two separate intervals for colors and characters
        window.setInterval(function() {
            for (let i = 0; i < 100; i++) {
                const rndDiv = Math.floor(Math.random() * divId.length);
                if (divId[rndDiv]) {
                    divId[rndDiv].style.color = getRandomColor();
                }
            }
        }, Math.random() * fontChangeRate + 15);

        window.setInterval(function() {
            for (let i = 0; i < 100; i++) {
                const rndDiv = Math.floor(Math.random() * divId.length);
                if (divId[rndDiv]) {
                    divId[rndDiv].innerHTML = '&#x' + myarray[Math.round((myarray.length - 1) * Math.random())] + ';';
                }
            }
        }, Math.random() * fontChangeRate + 200);

    } else {
        // Single interval for both colors and characters
        window.setInterval(function() {
            for (let i = 0; i < 100; i++) {
                const rndDiv = Math.floor(Math.random() * divId.length);
                if (divId[rndDiv]) {
                    divId[rndDiv].style.color = getRandomColor();
                    divId[rndDiv].innerHTML = '&#x' + myarray[Math.round((myarray.length - 1) * Math.random())] + ';';
                }
            }
        }, Math.random() * fontChangeRate + 15);
    }

    // Palette refresh interval (only for flavor 1)
    if (flavorConfig.colorMode === 'palette') {
        window.setInterval(setPalette, 15000);
    }
}

createDegenerator2();
