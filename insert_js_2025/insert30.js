/**
 * Insert 30: DaGenerator Singlefast (Corrected)
 * Correctly implements the slow-appearance timer on a white background.
 */

function createDaGeneratorSinglefastCorrected() {
    // --- CSS Injection ---
    const style = document.createElement('style');
    style.textContent = `
        body {
            background-color: #FFFFFF !important; /* Force white background */
            font-family: 'Code2000', 'Quivira', 'Akshar Unicode', 'Symbola', 'AegyptusR', 'Arial Unicode MS', 'Code2002', 'Code2001', sans-serif;
            font-weight: 900;
        }

        #dagen-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
            z-index: -1;
        }

        .dagen-char {
            -webkit-transition-property: color;
            -webkit-transition-duration: 3s;
            position: relative;
            float: left;
            font-size: 15px;
            color: #FFFFFF; /* Start as white to be invisible on white background */
        }
    `;
    document.head.appendChild(style);

    // --- Main Logic ---
    const fontChangeRate = 200;

    const myarray = [
        "2550", "2551", "2554", "2557", "255A", "255D", "2560", "2563",
        "2566", "2569", "256C", "2552", "2553", "2555", "2556", "2558",
        "2559", "255B", "255C", "255E", "255F", "2561", "2562", "2564",
        "2565", "2567", "2568", "256A", "256B"
    ];

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

    // Single interval for changing colors (making them appear) and characters
    window.setInterval(function() {
        for (let i = 0; i < 100; i++) {
            const rndDiv = Math.floor(Math.random() * divId.length);
            if (divId[rndDiv]) {
                divId[rndDiv].style.color = mycolors[Math.round((mycolors.length - 1) * Math.random())];
                divId[rndDiv].innerHTML = '&#x' + myarray[Math.round((myarray.length - 1) * Math.random())] + ';';
            }
        }
    }, Math.random() * fontChangeRate + 15);
}

createDaGeneratorSinglefastCorrected();