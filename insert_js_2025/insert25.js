/**
 * Insert 25: DaGenerator Doublefast
 * Based on 2025_exp/dagenerator2-doublefast.htm
 */

function createDegenerator2() {
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
            font-size: 150px;
            color: #FFFFFF; /* Start color, will be changed by JS */
        }
    `;
    document.head.appendChild(style);

    // --- Logic from dagenerator2-doublefast.htm ---

    const fontChangeRate = 200;

    // Note: The 'mycolors' array is inherited from g.us3.htm for palette flexibility.

    // Double line box drawing elements
    const myarray = [
   "250C", "2510", "2514", "2518", "251C", "2524", "252C", "2534", "253C", // corners and crosses
    "2500", "2502", // horizontal and vertical lines
    "2506", "2508", "250A", "2507", "2509", "250B", // dashed lines
    "254C", "254D", "254E", "254F", // various dashed
    "2574", "2575", "2576", "2577", "2578", "2579", "257A", "257B", // light lines
    "257C", "257D", "257E", "257F", // light diagonals
    "250D", "250E", "250F", "2511", "2512", "2513", "2515", "2516", "2517", "2519", "251A", "251B", // various singles
    "251D", "251E", "251F", "2520", "2521", "2522", "2523", "2525", "2526", "2527", "2528", "2529", "252A", "252B",
    "252D", "252E", "252F", "2530", "2531", "2532", "2533", "2535", "2536", "2537", "2538", "2539", "253A", "253B",
    "253D", "253E", "253F", "2540", "2541", "2542", "2543", "2544", "2545", "2546", "2547", "2548", "2549", "254A", "254B"

     ];

    // Create a full-screen wrapper for the animation
    const wrapper = document.createElement('div');
    wrapper.id = 'degen2-wrapper';
    document.body.appendChild(wrapper);

    const divId = [];

    for (let divCounter = 0; divCounter < 15000; divCounter++) {
        divId[divCounter] = document.createElement("div");
        divId[divCounter].className = 'degen2-char';
        divId[divCounter].innerHTML = '&#x' + myarray[Math.round((myarray.length - 1) * Math.random())] + ';';
        wrapper.appendChild(divId[divCounter]);
    }

    // Interval for changing colors
    window.setInterval(function() {
        for (let i = 0; i < 100; i++) {
            const rndDiv = Math.floor(Math.random() * divId.length);
            if (divId[rndDiv]) {
                divId[rndDiv].style.color = mycolors[Math.round((mycolors.length - 1) * Math.random())];
            }
        }
    }, Math.random() * fontChangeRate + 15);

    // Interval for changing characters
    window.setInterval(function() {
        for (let i = 0; i < 100; i++) {
            const rndDiv = Math.floor(Math.random() * divId.length);
            if (divId[rndDiv]) {
                divId[rndDiv].innerHTML = '&#x' + myarray[Math.round((myarray.length - 1) * Math.random())] + ';';
            }
        }
    }, Math.random() * fontChangeRate + 200);
}

// Run the main function
createDegenerator2();