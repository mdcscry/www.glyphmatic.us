/**
 * Insert 26: DaGenerator Singlefast
 * Based on a single-interval version of dagenerator2-doublefast.htm
 */

function createDegeneratorSinglefast() {
    // Inject the required CSS for this insert
    const style = document.createElement('style');
    style.textContent = `
        body {
            font-family: 'Code2000', 'Quivira', 'Akshar Unicode', 'Symbola', 'AegyptusR', 'Arial Unicode MS', 'Code2002', 'Code2001', sans-serif;
            font-weight: 900;
        }

        #degen2-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
            z-index: -1; /* Position behind the watermark */
            pointer-events: none; /* Allow clicks to pass through */
        }

        .degen2-char {
            -webkit-transition-property: color;
            -webkit-transition-duration: 3s;
            position: relative;
            float: left;
            font-size: 60px;
            color: #FFFFFF; /* Start color, will be changed by JS */
        }
    `;
    document.head.appendChild(style);

    const fontChangeRate = 1000;

    // --- Global 3-Color Palette ---
    let palette = [];

    function setPalette() {
        if (typeof mycolors !== 'undefined' && mycolors.length >= 3) {
            // Shuffle mycolors array to get random colors
            const shuffled = [...mycolors].sort(() => 0.5 - Math.random());
            palette = shuffled.slice(0, 3);
        } else {
            // Fallback palette if mycolors is not available
            palette = ['#FF0000', '#00FF00', '#0000FF'];
            console.warn('insert26: `mycolors` array not found or too small. Using fallback palette.');
        }
    }

    function getRandomPaletteColor() {
        if (palette.length === 0) setPalette();
        return palette[Math.floor(Math.random() * palette.length)];
    }

    // Double line box drawing elements
    const myarray = [
        "2550", "2551", "2554", "2557", "255A", "255D", "2560", "2563",
        "2566", "2569", "256C", "2552", "2553", "2555", "2556", "2558",
        "2559", "255B", "255C", "255E", "255F", "2561", "2562", "2564",
        "2565", "2567", "2568", "256A", "256B"
    ];

    const wrapper = document.createElement('div');
    wrapper.id = 'degen2-wrapper';
    document.body.appendChild(wrapper);

    const divId = [];

    // Initialize the color palette
    setPalette();

    for (let divCounter = 0; divCounter < 15000; divCounter++) {
        divId[divCounter] = document.createElement("div");
        divId[divCounter].className = 'degen2-char';
        divId[divCounter].innerHTML = '&#x' + myarray[Math.round((myarray.length - 1) * Math.random())] + ';';
        wrapper.appendChild(divId[divCounter]);
    }

    // Single interval for changing colors and characters
    window.setInterval(function() {
        for (let i = 0; i < 100; i++) {
            const rndDiv = Math.floor(Math.random() * divId.length);
            if (divId[rndDiv]) {
                divId[rndDiv].style.color = getRandomPaletteColor();
                divId[rndDiv].innerHTML = '&#x' + myarray[Math.round((myarray.length - 1) * Math.random())] + ';';
            }
        }
    }, Math.random() * fontChangeRate + 15);

    // Add an interval to periodically refresh the 3-color palette
    window.setInterval(setPalette, 15000); // Refresh every 15 seconds
}

// Run the main function
createDegeneratorSinglefast();