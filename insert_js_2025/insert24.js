/**
 * Insert 24: DeGenerator Legacy 1
 * Based on degenerator1_legacy_1.htm
 */

function createDegenerator1() {
    // Inject the required CSS for this insert
    const style = document.createElement('style');
    style.textContent = `
        @font-face {
            font-family: 'Symbols2';
            src: url('../tff/NotoSansSymbols2-Regular.ttf');
        }
        
        body {
            font-family: 'Symbols2';
        }

        #degen1-wrapper {
            position: absolute;
            top: 12%;
            left: 0%;
            width: 100%;
            height: 83%;
            overflow: hidden;
            z-index: -1; /* Places the entire animation behind other content */
            pointer-events: none; /* Allows clicks to pass through to elements behind it */
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-content: center; /* Vertically center the wrapped lines */
        }

        .degen1-container {
            -webkit-transition-property: background-color, color;
            -webkit-transition-duration: 10s, 5s;
            padding: 0;
            margin: 0;
            background: #FFFFFF;
            font-size: 500px;
            color: #000000;
            left: 0%;
            text-align: center;
            position: relative;
            opacity: 0.5;
            width: 125px;
            line-height: 1;
        }

        .degen1-child {
            position: absolute;
            float: none;
            opacity: 0.65;
            line-height: 1;
            font-size: 125px;
            top: 0;
            width: 125px;
            background-color: transparent;
        }
    `;
    document.head.appendChild(style);

    // --- Logic from degenerator1_legacy_1.htm ---

    const fontChangeRate = 400;

    // Note: The 'mycolors' array is inherited from g.us3.htm for a more varied palette.

    const myarray = ['1FB00', '1FB01', '1FB02', '1FB03', '1FB04', '1FB05', '1FB06', '1FB07', '1FB08', '1FB09', '1FB0A', '1FB0B', '1FB0C', '1FB0D', '1FB0E', '1FB0F', '1FB10', '1FB11', '1FB12', '1FB13', '1FB14', '1FB15', '1FB16', '1FB17', '1FB18', '1FB19', '1FB1A', '1FB1B', '1FB1C', '1FB1D', '1FB1E', '1FB1F', '1FB20', '1FB21', '1FB22', '1FB23', '1FB24', '1FB25', '1FB26', '1FB27', '1FB28', '1FB29', '1FB2A', '1FB2B', '1FB2C', '1FB2D', '1FB2E', '1FB2F', '1FB30', '1FB31', '1FB32', '1FB33', '1FB34', '1FB35', '1FB36', '1FB37', '1FB38', '1FB39', '1FB3A', '1FB3B', '1FB3C', '1FB3D', '1FB3E', '1FB3F', '1FB40', '1FB41', '1FB42', '1FB43', '1FB44', '1FB45', '1FB46', '1FB47', '1FB48', '1FB49', '1FB4A', '1FB4B', '1FB4C', '1FB4D', '1FB4E', '1FB4F', '1FB50', '1FB51', '1FB52', '1FB53', '1FB54', '1FB55', '1FB56', '1FB57', '1FB58', '1FB59', '1FB5A', '1FB5B', '1FB5C', '1FB5D', '1FB5E', '1FB5F', '1FB60', '1FB61', '1FB62', '1FB63', '1FB64', '1FB65', '1FB66', '1FB67', '1FB68', '1FB69', '1FB6A', '1FB6B', '1FB6C', '1FB6D', '1FB6E', '1FB6F', '1FB70', '1FB71', '1FB72', '1FB73', '1FB74', '1FB75', '1FB76', '1FB77', '1FB78', '1FB79', '1FB7A', '1FB7B', '1FB7C', '1FB7D', '1FB7E', '1FB7F', '1FB80', '1FB81', '1FB82', '1FB83', '1FB84', '1FB85', '1FB86', '1FB87', '1FB88', '1FB89', '1FB8A', '1FB8B', '1FB8C', '1FB8D', '1FB8E', '1FB8F', '1FB90', '1FB91', '1FB92', '1FB93', '1FB94', '1FB95', '1FB96', '1FB97', '1FB98', '1FB99', '1FB9A', '1FB9B', '1FB9C', '1FB9D', '1FB9E', '1FB9F', '1FBA0', '1FBA1', '1FBA2', '1FBA3', '1FBA4', '1FBA5', '1FBA6', '1FBA7', '1FBA8', '1FBA9', '1FBAA', '1FBAB', '1FBAC', '1FBAD', '1FBAE', '1FBAF', '1FBB0', '1FBB1', '1FBB2', '1FBB3', '1FBB4', '1FBB5', '1FBB6', '1FBB7', '1FBB8', '1FBB9', '1FBBA', '1FBBB', '1FBBC', '1FBBD', '1FBBE', '1FBBF', '1FBC0', '1FBC1', '1FBC2', '1FBC3', '1FBC4', '1FBC5', '1FBC6', '1FBC7', '1FBC8', '1FBC9', '1FBCA', '1FBF0', '1FBF1', '1FBF2', '1FBF3', '1FBF4', '1FBF5', '1FBF6', '1FBF7', '1FBF8', '1FBF9'];

    document.body.style.backgroundColor = mycolors[Math.round((mycolors.length - 1) * Math.random())];

    // Create a single, full-screen wrapper for the animation
    const wrapper = document.createElement('div');
    wrapper.id = 'degen1-wrapper';
    document.body.appendChild(wrapper);

    const containerCount = 1000;

    for (let containerCounter = 1; containerCounter <= containerCount; containerCounter++) {
        const containerName = 'container' + containerCounter;
        const container = document.createElement("div");
        
        // Append containers to the wrapper, not the body
        wrapper.appendChild(container);
        
        container.id = containerName + '-div0';
        container.className = 'degen1-container';
        container.innerHTML = '&#x' + myarray[Math.round((myarray.length - 1) * Math.random())] + ';';
        container.style.fontSize = '125px';
        container.style.color = mycolors[Math.round((mycolors.length - 1) * Math.random())];

        for (let divCounter = 1; divCounter <= 8; divCounter++) {
            const elementName = containerName + '-div' + divCounter;
            const childDiv = document.createElement("div");
            childDiv.innerHTML = '&#x' + myarray[Math.round((myarray.length - 1) * Math.random())] + ';';
            container.appendChild(childDiv);
            childDiv.id = elementName;
            childDiv.className = 'degen1-child';
            childDiv.style.color = mycolors[Math.round((mycolors.length - 1) * Math.random())];
        }
    }

    window.setInterval(function() {
        const rndDivContainer = Math.round(Math.random() * (containerCount - 1) + 1);
        const rndDivChild = Math.round(Math.random() * 7 + 1);
        const elementName = 'container' + rndDivContainer + '-div' + rndDivChild;
        const node = document.getElementById(elementName);
        try {
            node.style.color = mycolors[Math.round((mycolors.length - 1) * Math.random())];
            node.innerHTML = '&#x' + myarray[Math.round((myarray.length - 1) * Math.random())] + ';';
        } catch (e) {
            // console.log("Error: " + e.description + ' Value: ' + elementName);
        }
    }, Math.random() * fontChangeRate);
}

// Run the main function
createDegenerator1();