/**
 * Insert 25: DeGenerator Legacy 2 (Doublefast)
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
            font-size: 15px;
            color: #FFFFFF; /* Start color, will be changed by JS */
        }
    `;
    document.head.appendChild(style);

    // --- Logic from dagenerator2-doublefast.htm ---

    const fontChangeRate = 200;

    // Note: The 'mycolors' array is inherited from g.us3.htm for palette flexibility.

    // Double line box drawing elements
    const myarray = [
        "2550", "2551", "2554", "2557", "255A", "255D", "2560", "2563",
        "2566", "2569", "256C", "2552", "2553", "2555", "2556", "2558",
        "2559", "255B", "255C", "255E", "255F", "2561", "2562", "2564",
        "2565", "2567", "2568", "256A", "256B"
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